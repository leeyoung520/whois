import {
    createReducer,
    setValueReducer,
  } from '../../common/redux-helper';
  import { AuthStatus } from '../../common/constant';
  
  export const Types = {
    SetValue: 'auth/SetValue',
    FetchLogin: 'auth/FetchLogin',
    SetUser: 'auth/SetUser',
    FetchSignup: 'auth/FetchSignup',
    FetchUser: 'auth/FetchUser',
    FetchLogout: 'auth/FetchLogout',
  };
  
  export const actions = {
    setValue: (key: string, value: any) => ({ type: Types.SetValue, key, value }),
    fetchLogin: (name: string, password: string) => ({
      type: Types.FetchLogin,
      name,
      password,
    }),
    setUser: (name: string) => ({
      type: Types.SetUser,
      name,
    }),
    fetchSignup: (email: string) => ({
      type: Types.FetchSignup,
      email,
    }),
    fetchUser: () => ({
      type: Types.FetchUser,
    }),
    fetchLogout: () => ({ type: Types.FetchLogout }),
  };
  
  const INITIAL_STATE = {
    name: '',
    status: AuthStatus.NotLogin ,
  };
  const reducer = createReducer(INITIAL_STATE, {
    [Types.SetValue]: setValueReducer,
    [Types.SetUser]: (state: any, action: any) => {
      state.name = action.name;
      state.status = action.name ? AuthStatus.Login : AuthStatus.NotLogin;
    },
  });
  export default reducer;
  