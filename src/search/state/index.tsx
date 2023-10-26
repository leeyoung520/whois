import { EditHistory } from "../../common/component/History";
import { createReducer, setValueReducer } from "../../common/redux-helper";
import { AuthStatus } from '../../common/constant';


// 액션 타입 선언
export const Types = {
    SetValue: 'search/SetValue',
    FetchAutoComplete: 'search/FetchAutoComplete',
    FetchAllHistory: 'search/FetchAllHistory',
};

// 액션 함수 선언
type SearchActions = { type: string, key: string, value: any }
export const actions = {
    setValue: (key: string, value: any): SearchActions => ({ type: Types.SetValue, key, value }),
    fetchAutoComplete: (keyword: string) => ({
        type: Types.FetchAutoComplete,
        keyword: keyword,
    }),
    fetchAllHistory: () => ({ type: Types.FetchAllHistory }),
};

export type User = {
    name: string;
    department: string;
    tag: string;
    status: string,
}

export type SearchState = {
    keyword: string;
    autoCompletes: User[];
    history: EditHistory[];
}

const initialState: SearchState = {
    keyword: "",
    autoCompletes: [],
    history: [],
};

const reducer = createReducer(initialState, {
    [Types.SetValue]: setValueReducer,
});

export default reducer;

