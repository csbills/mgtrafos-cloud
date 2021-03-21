import styled from "styled-components";

export const Container = styled.div`
    display: flex;
    flex-direction:column;
    align-items: center;

    background: var(--shape);

    padding: 2rem 1rem;

    span {
        width: 100%;
        font-weight: 600;
    }
`;

export const Folder = styled.div`
    width: 100%;
    height: 2rem;

    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;

    padding: 0;
    margin-top: 1rem;

    span {
        font-weight: 400;
    }

    img {
        margin-right: 1rem;
    }
`;

export const ButtonPlus = styled.button`
    width: auto;
    height: 2.5rem;

    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;

    background: #44BCFF;
    color: #FFF;

    border: 0;
    border-radius: 0.5rem;

    font-weight: 700;

    padding: 0 1.5rem;
    letter-spacing: 1px;

    margin-bottom: 3rem;
    margin-top: 3rem;

    img {
        width: 16px;
        height: 16px;
    }

    span {
        margin-left: 1rem;
    }
`;