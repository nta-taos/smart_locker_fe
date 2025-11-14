import { message } from 'antd';
import { AxiosError } from 'axios';

export const is4xxError = (error: unknown): error is AxiosError => {
  return !!(
    error instanceof AxiosError &&
    error.response &&
    error.response.status >= 400 &&
    error.response.status < 500
  );
};

export const extractErrorMessage = (error: unknown, msg?: string): void => {
  if (is4xxError(error)) {
    if (msg) message.error(msg);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const data = error.response?.data as any;

    if (data?.errors && typeof data.errors === 'object') {
      const keys = Object.keys(data.errors);
      if (keys.length > 0) {
        const firstKey = keys[0];
        const messages = data.errors[firstKey];
        if (Array.isArray(messages) && messages.length > 0) {
          message.error(messages[0]);
          return;
        }
      }
    }

    if (data?.message) {
      message.error(data?.message);
      return;
    }
  }
};
