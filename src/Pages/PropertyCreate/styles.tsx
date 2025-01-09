import styled from "styled-components";

export const PageContainer = styled.div`
  width: calc(100% - 183px);
  margin-left: auto;
  padding: 20px;
  box-sizing: border-box;
  height: 100%;
  margin-top: 50px;
  overflow-y: auto;
  form {
    display: flex;
    flex-flow: column;
    align-items: center;
    justify-content: center;
    box-sizing: border-box;
  }
`;

export const StepWrapper = styled.div`
  display: flex;
  flex-flow: row wrap;
  gap: 20px;
  margin: auto;
  min-height: 460px;
  align-content: start;
  justify-content: center;
  width: 100%;
  > div {
    width: calc(50% - 40px);
  }
  .textfield > div {
    width: 24%;
  }
  .deleteButton {
    color: #4f734c;
  }
  .licenceNumberBox {
    width: 100%;
  }
  p {
    color: #808080;
  }
`;
export const AttractionsWrapper = styled.div`
  display: flex;
  flex-flow: column;
  width: 100% !important;
  flex-shrink: 0;
  > button {
    width: 220px;
    color: #fff;
    background-color: #4f734c;
    &:hover {
      color: #fff;
      background-color: #4f734c;
      border: 1px solid #4f734c;
    }
  }
`;
export const AttractionsTable = styled.div`
  display: flex;
  flex-flow: column;
  margin-top: 20px;
  border: 2px solid #eee;
  border-radius: 10px;
  padding: 20px;
  .infoRow {
    padding-top: 20px;
    background-color: #fcfcfc;
    color: #4f734c;
    font-weight: bold;
  }
  .headers,
  .row {
    display: flex;
    border-bottom: 2px solid #eee;
    > div {
      display: flex;
      width: calc(100% / 4);
      padding: 10px;
    }
    > div:last-child {
      justify-content: flex-end;
    }
  }
`;
