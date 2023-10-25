import React, { useEffect, useState } from 'react';
import { AutoComplete, Space, Typography } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../common/store';
import { User, actions } from '../state';
import { actions as userAction } from '../../user/state'
import { useNavigate } from 'react-router-dom';


export default function SearchInput() {
    const keyword = useSelector((state: RootState) => state.search.keyword);
    const dispatch = useDispatch();
    function setKeyword(value: string) {
        if (value != keyword) {
            dispatch(actions.setValue('keyword', value));
            dispatch(actions.fetchAutoComplete(value))
        }
    }

    const autoCompletes = useSelector((state: RootState) => state.search.autoCompletes);

    const navigate = useNavigate();
    const goToUser = (value: string) => {
        const user = autoCompletes.find((item: User) => item.name === value);
        if (user) {
            dispatch(userAction.setValue('user', user));
            navigate(`/user/${user.name}`);
        }
    };


    return (
        <AutoComplete
            value={keyword}
            onChange={setKeyword}
            onSelect={goToUser}
            options={autoCompletes.map((item:User) => ({
                value: item.name,
                label: (
                    <Space>
                        <Typography.Text strong>{item.name}</Typography.Text>
                        <Typography.Text type='secondary'>{item.department}</Typography.Text>
                        <Typography.Text>{item.tag}</Typography.Text>
                    </Space>
                ),
            }))}
            style={{ width: '100%' }}
            placeholder="검색어를 입력해주세요."
            autoFocus
        />
    );
}
