import { Link } from "react-router-dom";
import styled from "styled-components";

export const TableAndDatepickerHolder = styled.div`
  width: 100%;
  height: calc(100vh - 150px);
  max-width: 1440px;
  @media (max-width: 1500px) {
    width: 85%;
  }
  @media (max-width: 767px) {
    width: 85%;
  }
`;
export const TableContainer = styled.div`
  width: 100%;
  height: calc(100% - 20px);

  overflow-x: auto;
  position: relative;

  /* Hide the scrollbar */
  scrollbar-width: none; /* Firefox */
  -ms-overflow-style: none; /* Internet Explorer/Edge */

  /* WebKit-based browsers like Chrome and Safari */
  &::-webkit-scrollbar {
    display: none;
  }
  @media (max-width: 767px) {
    overflow-x: auto;
    margin-left: 30px;
  }
`;

export const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

export const TableHead = styled.thead`
  background-color: #f0f0f0;
  font-family: "Poppins";
  white-space: nowrap;
  position: sticky;
  top: 0;
  z-index: 1;
`;

export const TableRow = styled.tr`
  &:nth-child(even) {
    background-color: #f2f2f2;
  }
`;

export const TableCell = styled.td`
  border: 1px solid #dddddd;
  text-align: center;
  padding: 6px;
  font-family: "Poppins";
  font-size: 15px;
  overflow: hidden;
  text-overflow: ellipsis;
`;
export const ActionTableCell = styled.td`
  border: 1px solid #dddddd;
  text-align: center;
  padding: 6px;
  font-family: "Poppins";
  font-size: 15px;
  overflow: hidden;
  text-overflow: ellipsis;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  @media (max-width: 767px) {
    flex-direction: column;
  }
`;
export const EditButton = styled.button`
  background-color: #4f734c;
  border-radius: 5px;
  color: white;
  border: none;
  padding: 8px 16px;
  text-align: center;
  text-decoration: none;
  font-family: "Poppins";
  display: inline-block;
  font-size: 15px;
  margin: 4px 2px;
  cursor: pointer;
  &:hover {
    background-color: #50a164;
  }
`;
export const IconLink = styled(Link)`
  text-decoration: none;
  color: black;

  &:hover {
    color: red; // Change the color to red on hover
  }
`;
export const H2 = styled.h2`
  font-size: 25px;
  font-family: "Poppins";
`;
