import { EditHistory } from '../../common/component/History';
import { FETCH_KEY, NOT_IMMUTABLE } from '../../common/constant';
import { createReducer, setValueReducer } from '../../common/redux-helper';
import { User } from '../../search/state';


// 액션 타입 선언
export const Types = {
    SetValue: 'user/SetValue',
    FetchUser: 'user/FetchUser',
    FetchUpdateUser: 'user/FetchUpdateUser',
    FetchUserHistory: 'user/FetchUserHistory',
    AddHistory: 'user/AddHistory',
    Initialize: 'user/Initialize',
};

// 액션 함수 선언

// 액션 함수 선언
type SearchActions = { type: string, key: string, value: any }
export const actions = {
    setValue: (key: string, value: any): SearchActions => ({ type: Types.SetValue, key, value }),
    fetchUser: (name: string) => ({ type: Types.FetchUser, name }),
    fetchUpdateUser: ({ user, key, value, fetchKey }: { user: User, key: string, value: any, fetchKey: 'tag' | 'department' }) => ({
        type: Types.FetchUpdateUser,
        user,
        key,
        value,
        [FETCH_KEY]: fetchKey,
    }),
    fetchUserHistory: (name: string) => ({ type: Types.FetchUserHistory, name }),
    addHistory: (history: EditHistory) => ({ type: Types.AddHistory, history }),
    initialize: () => ({ type: Types.Initialize, [NOT_IMMUTABLE]: true }),
};

export type UserState = {
    user?: User;
    userHistory: [];
}

const initialState: UserState = {
    user: undefined,
    userHistory: [],
};

const reducer = createReducer(initialState, {
    [Types.SetValue]: setValueReducer,
    [Types.AddHistory]: (state: any, action: any) =>
        (state.userHistory = [action.history, ...state.userHistory]),
    [Types.Initialize]: () => initialState,
});

export default reducer;