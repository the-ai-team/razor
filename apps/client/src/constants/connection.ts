import { REQUEST_WAITING_TIME } from '@razor/constants';

export const REQUEST_WAITING_TIME_FOR_CLIENT =
  import.meta.env.VITE_REQUEST_WAITING_TIME || REQUEST_WAITING_TIME;
