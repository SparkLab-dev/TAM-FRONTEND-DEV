import styled from "styled-components";
export const CancelReservationButtonHolder = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 10px;
`;
export const CancelReservationButton = styled.button`
  background-color: #4f734c;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 13px;
  font-family: "Poppins";
  font-weight: 400;
  width: 104px;
  height: 30px;
`;
export const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding: 20px;
  width: 100%;
  max-width: 600px;
  margin: auto;
  font-family: Arial, sans-serif;
  height: 100%;
  max-height: 800px;
`;

export const Section = styled.div`
  border: 1px solid #ccc;
  padding: 16px;
  border-radius: 8px;
  background-color: #f9f9f9;
`;

export const Title = styled.h3`
  margin: 0 0 12px;
  font-size: 18px;
  color: #333;
`;

export const List = styled.ul`
  margin: 0;
  padding: 0;
  list-style: none;
`;

export const ListItem = styled.li`
  margin-bottom: 8px;
`;

export const DataRow = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 8px;
  font-size: 14px;
`;

export const Label = styled.span`
  font-weight: bold;
`;

export const Value = styled.span`
  text-align: right;
`;
export const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-top: 12px;
`;

export const TableHead = styled.thead`
  background-color: #f1f1f1;
`;

export const TableRow = styled.tr`
  &:nth-child(even) {
    background-color: #f9f9f9;
  }
`;

export const TableCell = styled.td`
  border: 1px solid #ddd;
  padding: 8px;
  text-align: left;
  font-size: 14px;
`;

export const TableHeaderCell = styled.th`
  border: 1px solid #ddd;
  padding: 8px;
  text-align: left;
  font-weight: bold;
  background-color: #eaeaea;
`;
