import {useEffect} from "react";
import {useNavigate} from "react-router-dom";
import {useSelector} from "react-redux";

export function useCheckLogin() {
  const userLogin = useSelector(state => state.userLogin);
    const navigate = useNavigate();

    useEffect(() => {
        const usernameLocalStorage = localStorage.getItem('username');
        const passwordLocalStorage = localStorage.getItem('password');
         
        if (!userLogin?.username && !usernameLocalStorage && !passwordLocalStorage) {
            navigate('/login')
        }
    }, [userLogin?.username]);
}