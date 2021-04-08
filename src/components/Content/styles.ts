import styled from "styled-components";

export const Container = styled.div`
    display: flex;
    flex-direction: column;
    padding: 0 2rem;
    overflow:auto;

    .modeDisplay {
        height: 3rem;
        display: flex;
        align-items: center;
        justify-content: space-between;

        margin: 1rem 2rem;

        .active {
            background: var(--shape);
        }

        span {
            font-weight: 700;             
        }

        button {
            border-radius: 50%;
            padding: 0.5rem;
            margin-left: 1rem;
            border: none;
            background:transparent;
        }

        img {
            width: 16px;
            height: 16px;
        }
    }
`;

