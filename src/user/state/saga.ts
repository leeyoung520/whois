import { all, put, call, take, takeEvery, takeLeading } from 'redux-saga/effects';
import { actions, Types, UserState } from './index';
import { callApi } from '../../common/util/api';
import { User } from '../../search/state';


function* fetchUser({ name }: { [key: string]: any }) {
  const { isSuccess, data } = yield call(callApi, {
    url: '/user/search',
    params: { keyword: name },
  });

  if (isSuccess && data) {
    const user = data.find((item: User) => item.name === name);
    if (user) {
      yield put(actions.setValue('user', user));
    }
  }
}

function* fetchUpdateUser({ user, key, value }: { [key: string]: any }) {
  const oldValue = user[key];
  yield put(actions.setValue('user', { ...user, [key]: value }));
  const { isSuccess, data } = yield call(callApi, {
    url: '/user/update',
    method: 'post',
    data: { name: user.name, key, value, oldValue },
  });

  if (isSuccess && data) {
    console.log(data.history);
    yield put(actions.addHistory(data.history));
  } else {
    yield put(actions.setValue('user', user));
  }
}

function* fetchUserHistory({ name }: { [key: string]: any }) {
  const { isSuccess, data } = yield call(callApi, {
    url: '/history',
    params: { name },
  });

  if (isSuccess && data) {
    yield put(actions.setValue('userHistory', data));
  }
}


export default function* () {
  yield all([
    takeLeading(
      Types.FetchUser,
      fetchUser,
    ),
    takeLeading(
      Types.FetchUpdateUser,
      fetchUpdateUser,
    ),
    takeLeading(
      Types.FetchUserHistory,
      fetchUserHistory,
    ),
  ]);
}