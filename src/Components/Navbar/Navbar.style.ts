import styled from "styled-components";

export const Header = styled.header`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 999;
  display: flex;
  justify-content: center;
  align-items: center;
   background-color: white;
  color: #000000;
  width: 100vw;
  height: 50px;
  border-bottom: 1px solid black;
  @media (max-width: 768px) {
    padding-left:50px;
  }
`;

export const Nav = styled.nav`
  display: flex;
  align-items: center;
  width: 60%;
  justify-content: space-between;
  max-width: 1440px;
  justify-content: flex-end;
`;

export const Ul = styled.ul`
  list-style: none;
  display: flex;
  margin: 0;
  padding: 0;
  // margin-left: 20px;
`;

export const Li = styled.li`
  margin-right: 35px;
  cursor: pointer;
  font-size: 20px;
  font-weight: 600;
  &:last-child {
    margin-right: 0;
  }
`;

export const NavLink = styled.a`
  text-decoration: none;
  color: #fff;
  padding: 8px 12px;
  border-radius: 4px;

  &:hover {
    background-color: #555;
  }
`;

export const LogoutButton = styled.button`
  background-color: white;
  color: black;
  border: 0;
  // border-color: #000000;
  padding: 8px 26px;
  margin-right: 20px;
  border-radius: 4px;
  cursor: pointer;
  font-family:poppins;
  font-weight: 400;
  font-size: 16px;
  display: flex;
  align-items: center;
  gap: 10px;
  &:hover {
    background-color: #e3edf0;
  }
`;
export const NewButton = styled.button`
  background-color: #9BDFC4;
  color: black;
  border: 0;
 width:180px;
 height:36px;
  padding: 8px 26px;
  margin-right: 20px;
  border-radius: 4px;
  cursor: pointer;
  font-size: 13px;
  font-family:poppins;
  font-weight: 400;
  display: flex;
  align-items: center;
 
  gap: 10px;
  &:hover {
    background-color: #e3edf0;
  }
  @media (max-width: 768px) {
    font-size: 10px;
    width:100px;
    padding:0;
  }
`;

