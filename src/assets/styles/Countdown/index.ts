import styled from 'styled-components';

export const SCountdown = styled.div`
    padding: 20px;
    border-radius: 5px;
    background-color: #a3b18a;
    display: flex;
    flex-direction: column;
    gap: 10px;
    margin-top: 50px;
`;

export const STimeInputsWrapper = styled.div`
    display: flex;
    gap: 10px;
`;

export const SInput = styled.input`
    font-family: 'Orbitron', sans-serif;
    display: inline-block;
    color: #344e41;
    font-size: 20px;
    border: none;
    background-color: #dad7cd;
    border-radius: 5px;
    outline: none;
    max-width: 150px;
    padding: 10px;
`;

export const SInputContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 10px;
    text-align: left;
    color: #344e41;
    font-size: 20px
`;

export const SProgress = styled.div`
    margin-left: 20px;
    justify-self: end ;
`;
