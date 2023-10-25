export const API_HOST = process.env.REACT_APP_API_HOST;
export const FetchStatus = {
    Request: 'Request',
    Success: 'Success',
    Fail: 'Fail',
}
export const AuthStatus = {
    Login: 'Login',
    NotLogin: 'NotLogin',
  };


export const FETCH_PAGE = Symbol('FETCH_PAGE');
export const FETCH_KEY = Symbol('FETCH_KEY');
export const NOT_IMMUTABLE = Symbol('NOT_IMMUTABLE');