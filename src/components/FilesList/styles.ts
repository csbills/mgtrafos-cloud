import styled from "styled-components";

export const Container = styled.div`
    margin: 1rem 2rem;

    table {
        width: 100%;
        border-spacing: 0;
        text-align: center;
    }

    tbody {
        overflow: auto;
        max-width:auto;
    }

    th {
            color: rgba(0,0,0,0.40);            
            font-weight: 400;
            line-height: 1.5rem;
            padding: 2rem 0;

            &:first-child {
                text-align: left;
            }
        }

        td {
            border-bottom: 1px solid var(--shape);
            border-top: 1px solid var(--shape);
            color: var(--text-body);

            &:first-child {
                text-align: left;
                padding: 1rem 0rem;
            }
        } 

        img {
            width: 2rem;
            height: 2rem;
            margin-right: 1rem;
        }  

        a { 
            text-decoration: none;
            color: rgba(0,0,0,0.75);
        }
`;