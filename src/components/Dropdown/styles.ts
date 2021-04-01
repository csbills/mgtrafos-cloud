import styled from "styled-components";

export const Container = styled.div`
    position: absolute;
    width: 200px;
    top: 20rem;
    transform: translateX(650%);
    background: var(--background);  
    padding: 1rem 0;
    overflow: hidden;
    border: 1px solid #000;
    border-radius: 0.5rem;
`;

export const MenuItem = styled.button`
    width: 100%;
    height: 50px;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    padding: 1rem;
    background: transparent;
    border: 0;

    transition: filter 0.2s;

    img {
        width: 1.25rem;
        height: 1.25rem;
    }

    span {
        font-weight: 500;
    }

    :hover {
        background: var(--shape);
    }
`;