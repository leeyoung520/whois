import React, { useEffect } from 'react';
import { Row, Col, Typography } from 'antd';
import Settings from '../component/Settings';
import SearchInput from './SearchInput';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../common/store';
import { actions } from '../state';
import History from '../../common/component/History';
import useNeedLogin from '../../common/hook/useNeedLogin';
import { actions as authActions } from '../../auth/state';

export default function Search() {
  useNeedLogin();
  const history = useSelector((state: RootState) => state.search.history);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(actions.fetchAllHistory());
  }, [dispatch]);

  function logout() {
    dispatch(authActions.fetchLogout());
  }


  return <>
    <Row justify="end" style={{ padding: 20 }}>
      <Col><Settings logout={logout} /></Col>
    </Row>
    <Row justify="center" style={{ marginTop: 50 }}>
      <Col><Typography.Title>찾아야한다</Typography.Title></Col>
    </Row>
    <Row justify="center" style={{ marginTop: 50 }}>
      <Col span={12}><SearchInput /></Col>
    </Row>
    <Row justify="center" style={{ marginTop: 50 }}>
      <Col xs={20} md={16} lg={12}>
        <History items={history} />
      </Col>
    </Row>
  </>;
}
