import styled from "styled-components";

export const Header = styled.div<{ isOpen: boolean }>`
  position: fixed;
  bottom: ${({ isOpen }) => (isOpen ? "520px" : "520px")};
  right: 20px;
  border-radius: 8px 8px 0 0;
  width: 402px;
  height: 40px;
  background-color: #4f734c;
  color: white;
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 18px;
  font-weight: bold;
  z-index: 999;
  transition: opacity 0.3s ease, bottom 0.3s ease; /* Transition for bottom position */
  opacity: ${({ isOpen }) => (isOpen ? "1" : "0")};
  pointer-events: ${({ isOpen }) => (isOpen ? "auto" : "none")};
  @media (max-width: 750px) {
    width: 100%;
    top: 0;
    right: 0;
  }
`;

export const Header2 = styled.div<{ isOpen: boolean }>`
  position: fixed;
  bottom: ${({ isOpen }) => (isOpen ? "480px" : "420px")};
  left: 50%;
  transform: translateX(-50%); /* Center horizontally */
  border-radius: 8px 8px 0 0;
  width: 402px;
  height: 40px;
  background-color: #4f734c;
  color: white;
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 18px;
  font-weight: bold;
  z-index: 999;
  transition: opacity 0.3s ease, bottom 0.3s ease; /* Transition for bottom position */
  opacity: ${({ isOpen }) => (isOpen ? "1" : "0")};
  pointer-events: ${({ isOpen }) => (isOpen ? "auto" : "none")};
  @media (max-width: 750px) {
    width: 100%;
    top: 0;
    border-radius: 0 0 0 0;
  }
`;

export const ChatContainer = styled.div<{ isOpen: boolean }>`
  position: fixed;
  bottom: 20px;
  right: 20px;
  width: 400px;
  background-color: white;
  height: ${({ isOpen }) => (isOpen ? "500px" : "0")};
  //   border: 1px solid #ccc;
  border: ${({ isOpen }) => (isOpen ? "1px solid #ccc" : "0")};
  overflow: hidden;
  transition: height 0.1s;
  z-index: 999;
  @media (max-width: 768px) {
    top: 40px;
    z-index: ${({ isOpen }) => (isOpen ? "999" : "999")};
    height: 80%;
    width: 100%;
    right: 0;
    height: ${({ isOpen }) =>
      isOpen
        ? "calc(100% - 40px)"
        : "0"}; /* Set height to 100% if open for mobile devices */
  }
`;

// export const ChatContainer2 = styled.div<{
//   isOpen: boolean;
//   keyboardOpen: boolean;
// }>`
//   position: fixed;
//   bottom: 20px;
//   right: 50%;

//   width: 400px;
//   background-color: white;
//   height: ${({ isOpen }) => (isOpen ? "460px" : "0")};

//   border: ${({ isOpen }) => (isOpen ? "1px solid #ccc" : "0")};
//   overflow: hidden;
//   transition: height 0.1s;
//   z-index: 999;
//   @media (max-width: 768px) {
//     top: 40px;
//     z-index: ${({ isOpen }) => (isOpen ? "1" : "999")};
//     height: 80%;
//     width: 100%;

//     height: ${({ isOpen }) =>
//       isOpen
//         ? "calc(100% - 40px)"
//         : "0"}; /* Set height to 100% if open for mobile devices */
//   }
// `;
export const ChatContainer2 = styled.div<{
  isOpen: boolean;
  keyboardOpen: boolean;
}>`
  position: fixed;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%); /* Center horizontally */

  width: 400px;
  background-color: white;
  height: ${({ isOpen }) => (isOpen ? "460px" : "0")};

  border: ${({ isOpen }) => (isOpen ? "1px solid #ccc" : "0")};
  overflow: hidden;
  transition: height 0.1s;
  z-index: 999;
  @media (max-width: 768px) {
    top: 40px;
    left: 0;
    right: 0;
    margin-left: auto;
    margin-right: auto;
    z-index: ${({ isOpen }) => (isOpen ? "1" : "999")};
    height: 80%;

    height: ${({ isOpen }) =>
      isOpen
        ? "calc(100% - 40px)"
        : "0"}; /* Set height to 100% if open for mobile devices */
  }
`;
export const UserMessageBubble = styled.div`
  background-color: #007bff;
  color: white;
  padding: 8px;
  border-radius: 8px;
  margin-bottom: 5px;
  align-self: flex-end;
  width: fit-content;
  min-width: 10%;
  max-width: 70%;
  text-align: left;
  margin-left: auto;
  word-break: break-word;
`;

export const BotMessageBubble = styled.div`
  background-color: #d3d3d3;
  padding: 8px;
  border-radius: 8px;
  margin-bottom: 5px;
  color: black;
  width: fit-content;
  min-width: 10%;
  max-width: 70%;
  align-self: flex-start;
  margin-right: auto;
  word-break: break-word;
  white-space: pre-line;
`;

export const ChatToggle = styled.div<{ isOpen: boolean }>`
  position: fixed;
  bottom: 15px;
  right: 15px;
  width: 80px;
  height: 50px;
  background-color: #4f734c;
  color: white;
  border-radius: 8px;
  display: ${({ isOpen }) => (isOpen ? "none" : "flex")};
  justify-content: center;
  align-items: center;
  cursor: pointer;
  transition: width 0.3s, height 0.3s;
  z-index: 999;
  &:hover {
    background-color: #e3edf0;
  }
`;

export const ChatToggle2 = styled.div<{ isOpen: boolean }>`
  width: 250px;
  height: 150px;
  background-color: white;
  color: #333;
  border-radius: 6px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  transition: background-color 0.3s ease;
  &:hover {
    background-color: #e3edf0;
  }
  @media (max-width: 750px) {
    width: 100px;
    height: 65px;
  }
`;

export const ChatText = styled.div`
  font-family: "Poppins", sans-serif;
  font-weight: 500;
  font-size: 16px;
  line-height: 24px;
`;

export const ChatIconn = styled.div`
  margin-top: 8px;
  font-size: 25px;
`;

export const ChatIcon = styled.span`
  font-size: 24px;
`;

export const MessageContainer = styled.div`
  overflow-y: scroll;
  height: 88%;
  padding: 10px;
`;

export const InputContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 2px;
  margin-top: -3px;
`;

export const MessageBubble = styled.div`
  background-color: #f0f0f0;
  padding: 8px;
  border-radius: 8px;
  margin-bottom: 5px;
`;

export const Input = styled.textarea`
  flex: 1;
  margin-right: 2px;
  border: 1px solid #ccc;
  border-radius: 4px;
  padding: 5px;
  height: 23px;
  font-size: 16px;
  font-family: ui-sans-serif;
`;

export const SendButton = styled.button`
  background-color: #4f734c;
  color: white;
  border: none;
  border-radius: 4px;
  padding: 6px 12px;
  cursor: pointer;
`;
