import { getSession } from '../actions/session';
import type { HTTPResponse } from '../types/fetch';
import type { IFileResponse } from '../types/file';
import { API_ENDPOINT } from './endpoints';
import { getAPIReferrerAndOrigin } from './referrer-origin';

export interface ErrorStatus {
  type: 'timeout' | 'server_error' | 'xhr_error';
  errorCode?: string | number;
}

interface Options {
  name: string;
  timeout?: number;
  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  data?: Record<string, any>;
  withCredentials?: boolean;
  disableMultipart?: boolean;
  headers?: Record<string, string>;
  file: File;
  url?: string;
  method?: string;
  onError?: (status: ErrorStatus, event: ProgressEvent, xhr: XMLHttpRequest) => void;
  onSuccess?: (response: IFileResponse, event: ProgressEvent, xhr: XMLHttpRequest) => void;
  onProgress?: (percent: number, event: ProgressEvent, xhr: XMLHttpRequest) => void;
}

function getResponse(xhr: XMLHttpRequest) {
  const text = xhr.responseText;
  if (!text) {
    return text;
  }

  try {
    const response = JSON.parse(text) as HTTPResponse<IFileResponse[]>;
    return response.data[0] as IFileResponse;
  } catch {
    return text;
  }
}

function getErrorCode(xhr: XMLHttpRequest) {
  const text = xhr.responseText;
  if (!text) {
    return text;
  }

  try {
    const response = JSON.parse(text) as HTTPResponse<IFileResponse[]>;
    return response.code;
  } catch {
    return text;
  }
}

export async function ajaxUpload(options: Options) {
  const {
    name,
    timeout,
    headers = {},
    data = {},
    method = 'POST',
    onError,
    onSuccess,
    onProgress,
    file,
    url = API_ENDPOINT.UPLOADS,
    withCredentials,
    disableMultipart,
  } = options;
  const urlAPI = url.startsWith('https://') ? url : `${process.env.NEXT_PUBLIC_API_UPLOAD_ORIGIN}${url}`;
  const xhr = new XMLHttpRequest();
  let sendableData: FormData | File;

  xhr.open(method, urlAPI, true);

  if (disableMultipart) {
    sendableData = file;
  } else {
    sendableData = new FormData();
    sendableData.append(name, file, file.name);
    for (const key in data) {
      sendableData.append(key, data[key]);
    }
  }

  const [session, { referrer, origin }] = await Promise.all([getSession(), getAPIReferrerAndOrigin()]);

  if (session?.accessToken) {
    xhr.setRequestHeader('Authorization', `Bearer ${session.accessToken}`);
  }

  if (referrer) {
    xhr.setRequestHeader('X-referrer', referrer);
  }

  if (origin) {
    xhr.setRequestHeader('Origin', origin);
  }

  for (const key of Object.keys(headers)) {
    if (headers[key] !== null) {
      xhr.setRequestHeader(key, headers[key] as string);
    }
  }

  if (timeout) {
    xhr.timeout = timeout;
    xhr.ontimeout = event => {
      onError?.({ type: 'timeout' }, event, xhr);
    };
  }

  if (withCredentials && 'withCredentials' in xhr) {
    xhr.withCredentials = true;
  }

  xhr.onload = event => {
    if (xhr.status < 200 || xhr.status >= 300) {
      const errorCode = getErrorCode(xhr);
      onError?.({ type: 'server_error', errorCode }, event, xhr);
      return;
    }
    const resp = getResponse(xhr);
    onSuccess?.(resp as IFileResponse, event, xhr);
  };

  if (xhr.upload) {
    xhr.upload.onprogress = event => {
      let percent = 0;
      if (event.lengthComputable) {
        percent = (event.loaded / event.total) * 100;
      }
      onProgress?.(percent, event, xhr);
    };
  }

  xhr.onerror = event => {
    onError?.({ type: 'xhr_error' }, event, xhr);
  };

  xhr.send(sendableData);

  return { xhr, data: sendableData };
}
