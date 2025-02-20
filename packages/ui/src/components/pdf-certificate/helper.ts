'use client';
import type { HTTPResponse } from '@oe/api/types/fetch';
import type { IFileResponse } from '@oe/api/types/file';
import { API_ENDPOINT } from '@oe/api/utils/endpoints';
import { getAPIReferrerAndOrigin } from '@oe/api/utils/referrer-origin';
import { getCookie } from '@oe/core/utils/cookie';
import type { Style } from '@react-pdf/types';
import { ERROR_MESSAGES } from './constant';

export const handleBlobUpload = async (file: Blob, fileName: string): Promise<IFileResponse> => {
  const [{ referrer }, accessToken] = await Promise.all([
    getAPIReferrerAndOrigin(),
    getCookie(process.env.NEXT_PUBLIC_COOKIE_ACCESS_TOKEN_KEY),
  ]);

  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    const formData = new FormData();
    formData.append('files', file, fileName);

    xhr.open('POST', `${process.env.NEXT_PUBLIC_API_ORIGIN}${API_ENDPOINT.UPLOADS}`);

    if (accessToken) {
      xhr.setRequestHeader('Authorization', `Bearer ${accessToken}`);
    }
    if (referrer) {
      xhr.setRequestHeader('X-referrer', referrer);
    }

    xhr.addEventListener('readystatechange', () => {
      if (xhr.readyState === XMLHttpRequest.DONE) {
        if (xhr.status === 0 || (xhr.status >= 200 && xhr.status < 400)) {
          try {
            const response = JSON.parse(xhr.responseText) as HTTPResponse<IFileResponse[]>;
            if (!response.data?.[0]) {
              reject(new Error(ERROR_MESSAGES.INVALID_RESPONSE));
              return;
            }
            resolve(response.data[0]);
          } catch {
            reject(new Error(ERROR_MESSAGES.INVALID_RESPONSE));
          }
        } else {
          reject(new Error(ERROR_MESSAGES.UPLOAD_FAILED));
        }
      }
    });
    xhr.addEventListener('error', () => reject(new Error(ERROR_MESSAGES.NETWORK_ERROR)));
    xhr.send(formData);
  });
};

export const convertPdfStyleToCSS = (style?: Style) => {
  if (!style) {
    return {};
  }

  const cssStyle: { [key: string]: string | number } = {};
  const styleMap: Record<string, (value: string | number) => string | number> = {
    position: () => 'absolute',
    top: value => (typeof value === 'number' ? `${value}px` : `calc(${value} - 3%)`),
    bottom: value => (typeof value === 'number' ? `${value}px` : `calc(${value} + 1%)`),
    left: value => (typeof value === 'number' ? `${value}px` : value),
    right: value => (typeof value === 'number' ? `${value}px` : value),
    width: value => (typeof value === 'number' ? `${value}px` : value),
    height: value => (typeof value === 'number' ? `${value}px` : value),
    fontFamily: value => value,
    fontSize: value => (typeof value === 'number' ? `${value}px` : value),
    fontWeight: value => value,
    textAlign: value => value,
    color: value => value,
  };

  for (const [key, value] of Object.entries(style)) {
    if (key in styleMap && styleMap[key]) {
      cssStyle[key] = styleMap[key](value);
    }
  }

  return cssStyle;
};
