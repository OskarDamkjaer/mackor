import styled from "styled-components";

export const AppContainer = styled.div`
  margin-left: 10vw;
  width: 80vw;
  display: grid;
  grid-template-areas: "header" "empty" "numbers";
  grid-template-rows: 110px ${props => props.emptySize || "20px"} 1fr;
`;

export const NumberDiv = styled.div`
  background-color: #f280a1;
  font-size: 2.2em;
  font-weight: bold;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
`;

export const NumberListContainer = styled.div`
  grid-area: numbers;
  width: 100%;
  display: grid;
  grid-template-rows: auto;
  grid-row-gap: 15px;
  grid-column-gap: 15px;
  grid-template-columns: 1fr;
`;

export const AdminForm = styled.form`
  grid-area: header;
  display: grid;
  width: 96%;
  padding: 2%;
  grid-template-columns 7fr 1fr;
  grid-template-areas: "currentInput send";
`;

export const ColoredButton = styled.button`
  grid-area: ${props => props.area}
  font-size: 2em;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  background-color: ${props => props.color};
  height: 100%;
  width: 100%;
  cursor: pointer;
  border: 0;
  padding: 0.5em 0.75em;
`;

export const FocusInput = styled.input`
  grid-area: currentInput;
  font-size: 3em;
  text-align: right;
  border: none;
  height: 100%;
  width: 100%;
  padding: 0 0.25em;
  box-sizing: border-box;
`;
