import { Button, Input, message } from "antd";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../common/store";
import { actions } from "../state";

interface IDepartmentProps { }

const Department = (props: IDepartmentProps) => {
  const dispatch = useDispatch();
  const [isEditDepartment, setIsEditDepartment] = useState(false);
  const [tempDepartment, setTempDepartment] = useState("");
  const user = useSelector((state: RootState) => state.user.user);
  if (!user) return <></>;

  const onSaveDepartment = () => {
    if (tempDepartment) {
      dispatch(
        actions.fetchUpdateUser({
          user,
          key: 'department',
          value: tempDepartment,
          fetchKey: 'department',
        }),
      );
      setIsEditDepartment(false);
    } else {
      message.error("소속은 필수 값입니다.");
    }
  };
  const onEditDepartment = () => {
    setIsEditDepartment(true);
    setTempDepartment(user.department);
  };

  return (
    <>
      {isEditDepartment && (
        <Input
          autoFocus
          value={tempDepartment}
          onChange={(e) => setTempDepartment(e.target.value)}
          onPressEnter={onSaveDepartment}
          onBlur={() => setIsEditDepartment(false)}
          style={{ width: "100%" }}
        />
      )}
      {!isEditDepartment && (
        <Button
          type="text"
          block
          onClick={onEditDepartment}
          style={{ textAlign: "left", padding: 0 }}
        >
          {user.department}
        </Button>
      )}
    </>
  );
};

export default Department;