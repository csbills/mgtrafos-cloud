import React, { FormEvent, useContext, useState } from 'react';

import { Form, Container } from '../styles/login';

import logo from '../assets/logo.png';

import { AuthContext } from '../contexts/AuthContext';

export default function Login() {
    const { handleLogin } = useContext(AuthContext);
    
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    async function handleSubmit(event: FormEvent) {
        event.preventDefault();
        
        await handleLogin({
            email: email,
            password: password,
        });
    }

    return (
        <Container>
            <Form onSubmit={handleSubmit}>
                <img src={logo} alt="Logo" />

                <input
                    type="text"
                    placeholder="Login"
                    value={email}
                    onChange={event => setEmail(event.target.value)}
                />
                <input
                    type="password"
                    placeholder="Senha"
                    value={password}
                    onChange={event => setPassword(event.target.value)}
                />
                <button type="submit">Entrar</button>
            </Form>
        </Container>

    )
}