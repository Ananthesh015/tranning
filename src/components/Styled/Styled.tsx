import styled from 'styled-components';

export const Input = styled.input`
    margin: .5rem;
    border-radius: .5rem;
`;
export const InputButton = styled(Input)`
    background-color: rgb(12, 12, 231);
    color: white;
    border: none;
    border-radius: 0;
`;
export const Lists = styled.div`
    text-decoration: none;
    display: table;
    color: black;
    margin: 0 auto;
`;
export const List = styled.div`
    width: 15rem;
    list-style: none;
    padding: .5em;
    border: 1px solid #cac8c8cc;
    cursor: pointer;
`;