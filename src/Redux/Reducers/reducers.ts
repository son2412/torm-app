import { combineReducers } from 'redux';
import { CLEAR_NETWORK_FAIL, RETRIEVE_TOKEN, SEND_NETWORK_FAIL, SIGN_OUT } from '../Actions/actions';

export interface State {
  fetching: boolean;
  data: any;
  err: any;
}

export interface Action {
  type: string;
  payload: any;
}

const initialState = { fetching: false, data: null, err: null };

const sendNetworkFail = (state: State = initialState, action: Action) => {
  switch (action.type) {
    case SEND_NETWORK_FAIL:
      return {
        err: action.payload.err
      };
    case CLEAR_NETWORK_FAIL:
      return {
        err: null
      };
    default:
      return state;
  }
};

const initialStateAuth = { fetching: true, token: null };
const isAuth = (state = initialStateAuth, action) => {
  switch (action.type) {
    case RETRIEVE_TOKEN:
      return {
        token: action.payload.token,
        fetching: false
      };
    case SIGN_OUT:
      return {
        token: null,
        fetching: false
      };
    default:
      return state;
  }
};

const rootReducer = combineReducers({ sendNetworkFail, isAuth });
export default rootReducer;
