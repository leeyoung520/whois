import { Col, Descriptions, Row, Typography } from "antd";
import { PageHeader } from "@ant-design/pro-layout";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import TagList from "./TagList";
import Department from "./Department";
import { RootState } from "../../common/store";
import History from "../../common/component/History";
import { actions } from "../state";
import useNeedLogin from "../../common/hook/useNeedLogin";

interface IUserProps { }

const User = ({ }: IUserProps) => {
  useNeedLogin();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { name } = useParams();
  const user = useSelector((state: RootState) => state.user.user);
  const userHistory = useSelector((state: RootState) => state.user.userHistory);

  useEffect(() => {
    if (name) {
      dispatch(actions.fetchUser(name));
      dispatch(actions.fetchUserHistory(name));
    }
  }, [name]);

  const isFetched = true;

  return (
    <Row justify="center">
      <Col xs={24} md={20} lg={14}>
        <PageHeader onBack={() => navigate(-1)} title="사용자 정보">
          {user && (
            <Descriptions layout="vertical" bordered column={1}>
              <Descriptions.Item label="이름">
                <Typography.Text>{user.name}</Typography.Text>
              </Descriptions.Item>
              <Descriptions.Item label="소속">
                <Department />
              </Descriptions.Item>
              <Descriptions.Item label="태그">
                <TagList />
              </Descriptions.Item>
              <Descriptions.Item label="수정 내역">
              <History items={userHistory} />
              </Descriptions.Item>
            </Descriptions>
          )}
          {!user && isFetched && (
            <Typography.Text>존재하지 않는 사용자입니다.</Typography.Text>
          )}
        </PageHeader>
      </Col>
    </Row>
  );
};

export default User;