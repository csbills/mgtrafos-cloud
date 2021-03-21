import styled from "styled-components";

export const Container = styled.div`
    height: 100vh;
    background-image: radial-gradient(circle, #ff7a00, #ff812c, #ff8945, #ff915b, #fe9a6f, #fd9871, #fc9574, #fb9376, #fc846a, #fe745f, #fe6356, #ff4e4e);
    display:flex;
    justify-content:center;
    align-items:center;
    flex-direction:column;
`;

export const Form = styled.form`
    width: 650px;
    height: 650px;
    background: rgba(255,255,255,0.3);

    padding: 0 1.25rem;
    border-radius: 0.25rem;

    display: flex;
    flex-direction:column;
    align-items:center;
    justify-content:center;

    img {
        margin-bottom: 3rem;
    }

    input {
        width: 550px;
        height: 4rem;
        border: 2px solid rgba(0,0,0,0.2);
        border-radius: 0.25rem;
        font-size: 1.25rem; 
        color: #969CB3;
        padding: 0 3rem;
        margin-bottom: 2rem;
    }

    input::placeholder {
        opacity: 70%;
    }

    input:focus {
        border: 0;
    }

    button {
        height: 4rem;
        width: 550px;
        background: #009D52;
        border: 0;
        border-radius: 0.25rem;
        font-size: 1.5rem;
        color: #ffff;

        transition: filter 0.2s;

        &:hover {
            filter: brightness(0.9);
        }
    }
`;