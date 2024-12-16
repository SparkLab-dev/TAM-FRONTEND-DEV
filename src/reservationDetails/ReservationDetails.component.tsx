import React from "react";
import styled from "styled-components";

const TableContainer = styled.div`
  display: flex;
  border: 1px solid #ddd;
`;

const TableHead = styled.div`
  display: flex;
  flex-direction: column;
  background-color: #f7f7f7;
  border-right: 1px solid #ddd;
`;

const TableBody = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
`;

const HeadCell = styled.div`
  padding: 10px;
  font-weight: bold;
  border-bottom: 1px solid #ddd;
`;

const BodyRow = styled.div`
  display: flex;
  border-bottom: 1px solid #ddd;

  &:last-child {
    border-bottom: none;
  }
`;

const BodyCell = styled.div`
  padding: 10px;
  flex: 1;
  border-right: 1px solid #ddd;

  &:last-child {
    border-right: none;
  }
`;

const ReservationDetails = () => {
  const headers = ["Name", "Age", "Location"];
  const data = [
    ["John Doe", "25", "New York"],
    ["Jane Smith", "30", "Los Angeles"],
    ["Sam Brown", "22", "Chicago"],
  ];

  return (
    <TableContainer>
      {/* Table Head */}
      <TableHead>
        {headers.map((header, index) => (
          <HeadCell key={index}>{header}</HeadCell>
        ))}
      </TableHead>

      {/* Table Body */}
      <TableBody>
        {data.map((row, rowIndex) => (
          <BodyRow key={rowIndex}>
            {row.map((cell, cellIndex) => (
              <BodyCell key={cellIndex}>{cell}</BodyCell>
            ))}
          </BodyRow>
        ))}
      </TableBody>
    </TableContainer>
  );
};

export default ReservationDetails;
