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
    height: calc(100% - 90px);
    overflow-y: scroll;
    padding-bottom: 60px;
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
`;
export const AttractionsWrapper = styled.div`
  display: flex;
  flex-flow: column;
  width: 100% !important;
  flex-shrink: 0;
  > button {
    width: 220px;
  }
`;
export const AttractionsTable = styled.div`
  display: flex;
  flex-flow: column;
  margin-top: 20px;
  .infoRow {
    padding: 20px;
    background-color: #fcfcfc;
  }
  .headers,
  .row {
    display: flex;
    border-bottom: 2px solid #eee;
    > div {
      display: flex;
      width: calc(100% / 4);
      padding: 5px;
    }
  }
`;
