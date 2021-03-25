import styled from "styled-components";

export const Container = styled.div`
    height: 6rem;
    display: grid;
    align-items: center;
    grid-template-columns: 5fr 1fr;
    padding: 0 2rem; 

`;

export const ProfileContainer = styled.div`
    height: 6rem;
    padding: 1rem 0;

    display: flex;
    align-items: center;
    flex-direction: row;


    button {
        padding: 0.5rem 2rem;
        border: 1px solid black;
        background: transparent;
        border-radius: 0.25rem;
        margin-right: 2rem;
        width: 175px;

        transition: transform 0.2s;

        &:hover {
            transform: scale(1.01); 
        }
    }

    button:last-child {
        width: auto;
        font-size: 1px;
        padding: 0;
        border: none;
    }

`;

export const ProfileImage = styled.div`
    img {
        border-radius: 1.5rem;
        width: 50px;
        height: 50px;
        margin-left: 3rem;
        margin-right: 1rem;
    }

`;

export const InputContainer = styled.div`
    width: 90%;
    height: 3rem;
    
    padding: 0 2rem;
    display: flex;
    align-items: center;
    justify-content: flex-start;

    background: var(--shape);
    border-radius: 0.5rem;
    border: 0;

    

    input {
        width: 100%;
        height: 100%;
        letter-spacing: 0.5px;
        border: 0;
        background: transparent;
        margin-left: 2rem;
    }

    input:focus {
        outline: none;
    }

    input::placeholder {
        opacity: 60%;
    }

    img {
        width: 16px;
        height: 16px;
    }
`;