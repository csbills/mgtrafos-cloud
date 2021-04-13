import { ReactNode, createContext, useEffect, useState } from 'react';
import api from '../services/api';
import history from '../history';

interface LoginInput {
    email: string,
    password: string,
}

interface AuthProviderProps {
    children: ReactNode,
}

interface AuthContextData {
    authenticated: boolean,
    loading: boolean,
    handleLogin: (login: LoginInput) => Promise<void>,
    handleLogout: () => void,
}

export const AuthContext = createContext<AuthContextData>(
    {} as AuthContextData
);

export function AuthProvider({ children }: AuthProviderProps) {
    const [authenticated, setAuthenticated] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const token = sessionStorage.getItem('@mgtrafos/token');

        if (token) {
            api.defaults.headers.Authorization = `Bearer ${JSON.parse(token)}`;
            setAuthenticated(true);
        }

        setLoading(false);
    }, []);

    async function handleLogin(loginInput: LoginInput) {
        await api.post('/authenticate', {
            email: loginInput.email,
            password: loginInput.password,
        }).then(response => {
            const { data } = response;
            if (data) {
                sessionStorage.setItem('@mgtrafos/token', JSON.stringify(data.token));
                sessionStorage.setItem('@mgtrafos/user_name', JSON.stringify(data.user.name));
                sessionStorage.setItem('@mgtrafos/user_id', JSON.stringify(data.user._id));
                sessionStorage.setItem('@mgtrafos/user_email', JSON.stringify(data.user.email));
                api.defaults.headers.Authorization = `Bearer ${data.token}`;  
                setAuthenticated(true);
                history.push('/');
                window.location.reload();
            }         
        }).catch(error => {
            const msgError = error.response.data.error;
            alert(msgError);
        });

        console.log(authenticated);
    }

    function handleLogout() {
        setAuthenticated(false);
        sessionStorage.removeItem('@mgtrafos/token');
        api.defaults.headers.Authorization = undefined;
        history.push('/login');
    }

    return (
        <AuthContext.Provider value={{ authenticated, handleLogin, handleLogout, loading }}>
            {children}
        </AuthContext.Provider>
    )

}

