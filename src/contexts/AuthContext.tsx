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
        const token = localStorage.getItem('@mgtrafos/token');

        if (token) {
            api.defaults.headers.Authorization = `Bearer ${JSON.parse(token)}`;
            setAuthenticated(true);           
        }

        setLoading(false);
    }, []);

    async function handleLogin(loginInput: LoginInput) {
        setLoading(true);
        await api.post('/authenticate', {
            email: loginInput.email,
            password: loginInput.password,
        }).then(response => {
            const { data } = response;
            if (data) {
                localStorage.setItem('@mgtrafos/token', JSON.stringify(data.token));
                localStorage.setItem('@mgtrafos/user_name', JSON.stringify(data.user.name));
                localStorage.setItem('@mgtrafos/user_id', JSON.stringify(data.user._id));
                localStorage.setItem('@mgtrafos/user_email', JSON.stringify(data.user.email));
                api.defaults.headers.Authorization = `Bearer ${data.token}`;                
                setAuthenticated(true);
                setLoading(false);
                history.push('/');
            }
        }).catch(error => {
            const msgError = error.response.data.error;
            setLoading(false);
            alert(msgError);
        });
    }

    function handleLogout() {
        localStorage.removeItem('@mgtrafos/token');
        setAuthenticated(false);
        history.push('/login');
    }

    return (
        <AuthContext.Provider value={{ authenticated, handleLogin, handleLogout, loading }}>
            {children}
        </AuthContext.Provider>
    )

}

