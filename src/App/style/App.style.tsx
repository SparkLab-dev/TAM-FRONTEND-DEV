import { styled } from "styled-components";
import { ChangeEvent, RefObject } from "react";

// export const AppBox = styled.div`
//   display: flex;
//   align-items: center;
//   justify-content: center;
//   width: 100vw;
//   height: 100vh;
// `;
interface ButtonProps {
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
export const Button = styled.button<ButtonProps>`
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

    background: #ebeff0;
  }

  &:disabled {
    opacity: 0.6;
    filter: saturate(60%);
  }
`;

interface InputProps {
  label?: string;
  id?: string;
  type?: string;
  name?: string;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  handleFocus?: () => void;
  placeholder?: string;
  value?: string;
  inputRef?: RefObject<HTMLInputElement>;
  pattern?: string;
  readOnly?: boolean;
  required?: boolean;
  disabled?: boolean;
  fontFamily?: string;
  fontWeight?: string;
  bordertoprightradius?: string;
  borderbottomrightradius?: string;
  width?: string;
  height?: string;
  fontSize?: string;
  paddingleft?: string;
  backgroundcolor?: string;
  border?: string;
  borderradius?: string;
  padding?: string;
  margin?: string;
}
export const Input = styled.input<InputProps>`
  font-family: ${(props: any) => props.fontFamily || "Poppins"};
  font-weight: ${(props: any) => props.fontWeight};
  border-top-right-radius: ${(props: any) =>
    props.bordertoprightradius || "20px"};
  border-bottom-right-radius: ${(props: any) =>
    props.borderbottomrightradius || "20px"};
  outline: none;
  box-shadow: 0 0 2em #e6e9f9;
  box-sizing: border-box;
  border: ${(props: any) => props.border};
  width: ${(props: any) => props.width || "100%"};
  height: ${(props: any) => props.height || "100%"};
  background: ${(props: any) => props.backgroundcolor || "#FFFFFF"};
  border-left: "2px solid red";
  border-radius: ${(props: any) => props.borderradius || "20px"};
  font-style: "normal";
  font-size: ${(props: any) => props.fontSize || "12px"};
  padding-left: ${(props: any) => props.paddingleft};
  padding: ${(props: any) => props.padding};
  margin-top: 12px;
  display: block;
  margin: ${(props: any) => props.margin};
`;

interface FormProps {
  height?: string;
  onSubmit?: any;
  //  (e: React.FormEvent<HTMLFormElement>) => void | Promise<void>;
}
export const StyledForm = styled.form<FormProps>`
  height: ${(props: any) => props.height || "300px"};
  width: 60%;
  max-width: 500px;
  background-color: #4f734c;
  position: absolute;
  transform: translate(-50%, -50%);
  top: 50%;
  left: 50%;
  border-radius: 10px;
  backdrop-filter: blur(10px);
  /* border: 2px solid rgba(255, 255, 255, 0.01); */
  box-shadow: 0 0 2em #cbcee3;
  padding: 0px 30px 20px 30px;
  font-family: "Poppins";
  color: #000000;
  letter-spacing: 0.5px;
  outline: none;
  border: none;
  border-radius: 30px;
`;

export const Page = styled.div`
  height: 100vh; /* Use viewport height to make it full screen */
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: "white";
`;

export const Content = styled.div`
  width: 100%;
  text-align: center;
`;
interface dropdownProps {
  label?: string;
  id?: string;
  type?: string;
  name?: string;
  onChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  handleFocus?: () => void;
  handleSelectDropdown?: () => void;
  placeholder?: string;
  value?: string;
  inputRef?: RefObject<HTMLInputElement>;
  pattern?: string;
  readOnly?: boolean;
  required?: boolean;
  disabled?: boolean;
  fontFamily?: string;
  fontWeight?: string;
  bordertoprightradius?: string;
  borderbottomrightradius?: string;
  width?: string;
  height?: string;
  fontSize?: string;
  paddingleft?: string;
  backgroundcolor?: string;
  border?: string;
  borderradius?: string;
  padding?: string;
  margin?: string;
}
export const StyledSelect = styled.select<dropdownProps>`
  font-family: ${(props: any) => props.fontFamily || "Poppins"};
  font-weight: ${(props: any) => props.fontWeight};
  border-top-right-radius: ${(props: any) =>
    props.bordertoprightradius || "20px"};
  border-bottom-right-radius: ${(props: any) =>
    props.borderbottomrightradius || "20px"};
  outline: none;
  box-shadow: 0 0 2em #e6e9f9;
  box-sizing: border-box;
  border: ${(props: any) => props.border};
  width: ${(props: any) => props.width || "100%"};
  height: ${(props: any) => props.height || "100%"};
  background: ${(props: any) => props.backgroundcolor || "#FFFFFF"};
  border-radius: ${(props: any) => props.borderradius || "20px"};
  font-size: ${(props: any) => props.fontSize || "12px"};
  padding-left: ${(props: any) => props.paddingleft};
  padding: ${(props: any) => props.padding};
  margin-top: 12px;
  display: block;
  margin: ${(props: any) => props.margin};
`;

interface PasswordInputProps extends InputProps {
  showPassword: boolean;
  onTogglePassword: () => void;
}
export const PasswordInput = styled.input<PasswordInputProps>`
  font-family: ${(props: any) => props.fontFamily || "Poppins"};
  font-weight: ${(props: any) => props.fontWeight || 700};
  border-top-right-radius: ${(props: any) =>
    props.bordertoprightradius || "20px"};
  border-bottom-right-radius: ${(props: any) =>
    props.borderbottomrightradius || "20px"};
  outline: none;
  box-shadow: 0 0 2em #e6e9f9;
  box-sizing: border-box;
  border: ${(props: any) => props.border};
  width: ${(props: any) => props.width || "100%"};
  height: ${(props: any) => props.height || "100%"};
  background: ${(props: any) => props.backgroundcolor || "#FFFFFF"};
  border-radius: ${(props: any) => props.borderradius || "20px"};
  font-style: "normal";
  font-size: ${(props: any) => props.fontSize || "12px"};
  padding-left: ${(props: any) => props.paddingleft};
  padding: ${(props: any) => props.padding};
  margin-top: 12px;
  display: block;
  margin: ${(props: any) => props.margin};
  position: relative; /* Required for the icon positioning */

  /* Add styles to position the eye icon */
  .eye-icon {
    position: absolute;
    right: 10px; /* Adjust this value to position the icon as needed */
    top: 50%; /* Adjust this value to vertically center the icon */
    transform: translateY(-50%);
    cursor: pointer;
  }
`;
export const InputGroup = styled.div`
  position: relative;
`;
export const ToggleButton = styled.button`
  position: absolute;
  top: 50%;
  right: 10px; // Adjust the positioning as needed
  transform: translateY(-50%);
  border: none;
  background: none;
  cursor: pointer;
  padding: 0;
  outline: none;
  user-select: none;
`;
