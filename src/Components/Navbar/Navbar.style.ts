import styled from 'styled-components';

export const Header = styled.header`
position: fixed;
top: 0;
left: 0;
right: 0;
z-index: 999; 
  display: flex;
  justify-content: center;
  align-items: center;
  // background-color: lightblue;
  color: #000000;
  width: 100%;
  height: 50px;
  border-bottom: 1px solid black;
  
`;

export const Nav = styled.nav`
  display: flex;
  align-items: center;
  width:100%;
  justify-content: space-between;
  max-width:1440px;
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
  font-size:16px;
display:flex;
align-items:center;
gap:10px;
  &:hover {
    background-color: #e3edf0;
  }
`;
