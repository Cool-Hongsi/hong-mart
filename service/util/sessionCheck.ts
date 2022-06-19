import { SESSION_STATUS } from '../const/generalConst';

const { LOADING, UNAUTHENTICATED, AUTHENTICATED, LOADING_RESULT, UNAUTHENTICATED_RESULT, AUTHENTICATED_RESULT } = SESSION_STATUS;

export const sessionCheck = (session: object | null | undefined, status: string): string => {
  if (!session && status === LOADING) {
    return LOADING_RESULT;
  } else if (!session && status === UNAUTHENTICATED) {
    return UNAUTHENTICATED_RESULT;
  } else if (session && status === AUTHENTICATED) {
    return AUTHENTICATED_RESULT;
  } else {
    return "";
  }
};