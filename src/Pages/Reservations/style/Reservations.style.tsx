import styled from "styled-components";

export const ReservationsButton = styled.button`
  /* padding: 10px 20px; */
  background-color: #4f734c;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 15px;
  font-family: poppins;
  font-weight: 400;
  width: 120px;
  height: 56px;

  /* margin: 10px; */
`;
export const ViewReservationsButton = styled.button`
  background-color: #4f734c;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 13px;
  font-family: poppins;
  font-weight: 400;
  width: 104px;
  height: 30px;
`;
export const ReservationsContentHolder = styled.div`
  display: flex;
  flex: 1;
  @media screen and (max-width: 350px) {
    flex-direction: column;
  }
`;
export const ReservationsDropdown = styled.select`
  margin: 10px !important;
  width: 200px;
  height: 56px; /* Match the DatePicker's height */
  padding: 0 10px; /* Adjust for consistent padding */
  border-radius: 4px; /* Match DatePicker's border-radius */
  font-family: Poppins, sans-serif;
  font-size: 14px;
  color: #333;
  background-color: #fff;
  border: 1px solid #d1d5db; /* Match DatePicker's default border color */
  box-shadow: none; /* Remove any additional shadows */

  &:focus {
    border-color: #3f51b5; /* Match DatePicker's focus border color */
    outline: none;
    box-shadow: 0 0 0 2px rgba(63, 81, 181, 0.2); /* Optional focus outline shadow */
  }

  option {
    font-family: Poppins, sans-serif;
    color: #333;
    padding: 10px;
  }
`;
