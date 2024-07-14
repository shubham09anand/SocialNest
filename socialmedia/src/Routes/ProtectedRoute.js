import { useDispatch } from 'react-redux';

import { setLoginData } from '../Features/Counter/LoginSlice';

const ProtectedRoute = ({ children }) => {

    const dispatch = useDispatch();

    if (localStorage.getItem('userToken')) {

        const userToken = localStorage.getItem('userToken');

        const userId = localStorage.getItem('userId');

        dispatch(setLoginData({ token: userToken, userId: userId }));

        return children;
    }

    else {
        window.location.href = "http://localhost:3000/auth-failed";
    }
}

export default ProtectedRoute;