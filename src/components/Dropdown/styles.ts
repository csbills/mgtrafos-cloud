import styled from "styled-components";

export const Container = styled.div`
    position: absolute;
    width: 100%;
    max-width:16.875rem;
    z-index: 100;
    left: -100px;
    top: 0;
    right: 0;
    bottom: 0;
    background: #181B23;
    padding: 1rem 0;    
    border-radius: 0.5rem;
    box-shadow: rgba(0, 0, 0, 0.5) 0px 1px 2px 0px;

    margin: 0.1rem 0;

    -webkit-animation: slide-right 0.5s cubic-bezier(0.250, 0.460, 0.450, 0.940) both;
	        animation: slide-right 0.5s cubic-bezier(0.250, 0.460, 0.450, 0.940) both;
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

    transition: background 0.2s;

    img {
        width: 20px;
        height: 20px;
    }

    span {
        font-weight: 500;
        color: #FFF;
    }

    :hover {
        background: #353646;
    }
`;