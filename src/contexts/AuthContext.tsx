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
    handleLogin: (login: LoginInput) => Promise<void>
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
        await api.post('/authenticate', {
            email: loginInput.email,
            password: loginInput.password,
        }).then(response => {
            const { data } = response;
            if (data) {
                localStorage.setItem('@mgtrafos/token', JSON.stringify(data.token));
                api.defaults.headers.Authorization = `Bearer ${data.token}`;
                setAuthenticated(true);
                history.push('/');
            }
        }).catch(error => {
            const msgError = error.response.data.error;
            alert(msgError);
        });
    }

    return (
        <AuthContext.Provider value={{ authenticated, handleLogin, loading }}>
            {children}
        </AuthContext.Provider>
    )

}

