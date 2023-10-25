import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import { AuthStatus } from '../../common/constant';
import { RootState } from '../../common/store';

export default function useBlockLoginUser() {
    const navigate = useNavigate();
    const status = useSelector((state: RootState) => state.auth.status);
    useEffect(() => {
        if (status === AuthStatus.Login) {
            navigate('/', { replace: true })

        }
    }, [status, navigate]);
}
