import { BASE_URL } from '..';

const hasBaseUrl = (url?: string) => {
  if (url && url.startsWith(BASE_URL)) {
    return true;
  } else {
    return false;
  }
};

export default hasBaseUrl;
