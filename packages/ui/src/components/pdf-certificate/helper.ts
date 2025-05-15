'use client';
import { API_ENDPOINT, getSession } from '@oe/api';
import type { IFileResponse } from '@oe/api';
import type { HTTPResponse } from '@oe/api';
import { ERROR_MESSAGES } from './constant';

export const handleBlobUpload = async (file: Blob, fileName: string): Promise<IFileResponse> => {
  const session = await getSession();

  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    const formData = new FormData();
    formData.append('files', file, fileName);

    xhr.open('POST', `${process.env.NEXT_PUBLIC_API_UPLOAD_ORIGIN}${API_ENDPOINT.UPLOADS}`);

    if (session?.accessToken) {
      xhr.setRequestHeader('Authorization', `Bearer ${session.accessToken}`);
    }
    if (session?.referrer) {
      xhr.setRequestHeader('X-referrer', session.referrer);
    }
    if (session?.origin) {
      xhr.setRequestHeader('Origin', session.origin);
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
