import styled from "styled-components";

export const Container = styled.div`
    display: flex;
    flex-direction:row;
    justify-content: flex-start;
    align-items: center;
`;

export const Title = styled.h3`
    margin: 0 2rem;
    margin-bottom: 1rem;
`;

export const FileCard = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;

    margin: 0 2rem;
    border-radius: 0.5rem;

    width: 12rem;
    height: 12rem;

    background: var(--shape);
    cursor: pointer;

    img {
        margin: 2rem 3rem;
        width: 75px;
        height: 75px;
    }
`;

