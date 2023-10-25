import { all, put, call, take, takeEvery, takeLeading } from 'redux-saga/effects';
import { actions, Types } from './index';
import { callApi } from '../../common/util/api';
// import { makeFetchSaga } from '../../common/util/fetch';


// saga의 effects
// put: redux 액션을 발생시킨다.
// call(함수, 파라미터 여러개): 함수 실행
// take / takeLeadeing: 액션 감지 후 처리?
// debouce: 짧은 시간에 같은 이벤트가 여러번 들어올 때 첫번째나 마지막 이벤트만 처리하기 위해 사용

// api를 통해 입력한 키워드에 대한 자동완성 가능한 값들을 반환한다.
type AnyAction = { type: string, [key: string]: any }
function* fetchAutoComplete({ keyword }: AnyAction) {
  const { isSuccess, data } = yield call(callApi, {
    url: '/user/search',
    params: { keyword },
  });

  if (isSuccess && data) {
    // actions.setValue 액션을 발생시킴
    yield put(actions.setValue('autoCompletes', data));
  }
}

function* fetchAllHistory() {
  const { isSuccess, data } = yield call(callApi, {
    url: '/history',
  });

  if (isSuccess && data) {
    yield put(actions.setValue('history', data));
  }
}

export default function* () {
  yield all([
    takeEvery(
      Types.FetchAutoComplete,
      fetchAutoComplete,
    ),
    takeLeading(
      Types.FetchAllHistory,
      fetchAllHistory,
    ),
  ]);
}