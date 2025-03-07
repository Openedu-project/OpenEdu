'use client';
import type { HTTPResponse } from '@oe/api/types/fetch';
import type { IFileResponse } from '@oe/api/types/file';
import { API_ENDPOINT } from '@oe/api/utils/endpoints';
import { getAPIReferrerAndOrigin } from '@oe/api/utils/referrer-origin';
import { getCookie } from '@oe/core/utils/cookie';
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
