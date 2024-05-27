import styled from "styled-components";

export const PopupName = styled.p`
  color: #ffff;
  font-size: 25px;
  font-family: "Poppins";
  text-align: center;
`;

export const AccountsTypeNAmeHolder = styled.div`
  display: flex;
  /* margin-top: 35px; */
`;
export const AccountTypeName = styled.p`
  color: black;
  font-size: 30px;
  font-family: "Poppins";
  cursor: pointer;
  margin: 10px;
  &:hover {
    font-weight: bold;
  }
`;
interface PopupButtonProps {
  variant?: "primary" | "secondary" | "third";
  h?: string;
  w?: string;
  borderradius?: string;
  fontFamily?: string;
  fontSize?: string;
  fontWeight?: string;
  marginTop?: string;
  margin?: string;
  onClick?: any;
  // (
  //   e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  // ) => void | Promise<void>;

  disabled?: boolean;
}
export const PopupButton = styled.button<PopupButtonProps>`
  box-sizing: border-box;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  height: ${(props: any) => props.h || "100%"};
  width: ${(props: any) => props.w || "100%"};
  color: black;
  background-color: white;
  border: 2px solid #4f734c;
  border-radius: 5px;
  text-decoration: none;
  font-family: ${(props: any) => props.fontFamily || "Poppins"};
  font-size: ${(props: any) => props.fontSize};
  font-weight: ${(props: any) => props.fontWeight};
  margin-top: ${(props: any) => props.marginTop};
  margin: ${(props: any) => props.margin || "25px 0 0 0"};
  cursor: pointer;

  &:hover:not(:disabled),
  &:active:not(:disabled),
  &:hover {
    outline: 0;
    color: black;
    background: #e3edf0;
  }

  &:disabled {
    opacity: 0.6;
    filter: saturate(60%);
  }
`;
export const TextArea = styled.textarea`
  width: 100%;
  height: 100%;
  min-height: 100px;
  font-family: "Poppins";
  border: none;
  outline: none;
  &:hover:not(:disabled),
  &:active:not(:disabled),
  &:hover {
    border: none !important;
    outline: none;
  }
  &:focus {
    border: none !important;
    outline: none !important;
  }
`;
