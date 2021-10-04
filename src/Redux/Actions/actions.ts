export const SEND_NETWORK_FAIL = 'SEND_NETWORK_FAIL';
export const sendNetworkFail = (err: any) => {
  return { type: SEND_NETWORK_FAIL, payload: { err } };
};

export const CLEAR_NETWORK_FAIL = 'CLEAR_NETWORK_FAIL';
export const clearNetworkFail = () => {
  return { type: CLEAR_NETWORK_FAIL };
};

export const RETRIEVE_TOKEN = 'RETRIEVE_TOKEN';
export const checkSignIn = (token) => {
  return { type: RETRIEVE_TOKEN, payload: { token } };
};

export const SIGN_OUT = 'SIGN_OUT';
export const signOut = () => {
  return { type: SIGN_OUT };
};
