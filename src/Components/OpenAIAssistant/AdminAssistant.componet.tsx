import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import SendIcon from "@mui/icons-material/Send";

import {
  ChatIcon,
  ChatToggle,
  MessageContainer,
  SendButton,
  InputContainer,
  Input,
  UserMessageBubble,
  BotMessageBubble,
  Header2,
  ChatContainer2,
  ChatToggle2,
} from "./Assistant.style";

interface Message {
  id: number;
  text: string;
  sender: "user" | "bot";
}

const ChatComponent2: React.FC = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [keyboardOpen, setKeyboardOpen] = useState<boolean>(false);
  const [messages, setMessages] = useState<Message[]>([
    { id: 1, text: "Hi there!", sender: "bot" },
    {
      id: 2,
      text: "This is TAM Chatbox! How can I help you?",
      sender: "bot",
    },
  ]);

  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    if (chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  useEffect(() => {
    scrollToBottomm();
  }, [isOpen]);

  const scrollToBottomm = () => {
    if (chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: "auto" });
    }
  };

  const [newMessage, setNewMessage] = useState<string>("");
  const [threadId, setThreadId] = useState<string>("");
  const [isTyping, setIsTyping] = useState<boolean>(false);

  const sendMessage = () => {
    const userMessage: Message = {
      id: messages.length + 1,
      text: newMessage,
      sender: "user",
    };
    setMessages((prevMessages) => [...prevMessages, userMessage]);
    setNewMessage("");
    setIsTyping(true);

    const bookingApartmentId = localStorage.getItem("bookingApartmentId");
    const apartmentId = bookingApartmentId
      ? parseInt(bookingApartmentId, 10)
      : null;

    if (!messages.find((msg) => msg.sender === "user")) {
      axios
        .post(
          "http://192.168.10.210:8080/TAM/assistant/thread/client",
          {
            newMessage,
          },
          {
            params: {
              apartmentId: 2042282,
            },
          }
        )
        .then((response) => {
          const id = response.data.id;

          setThreadId(id);
          console.log(response);
          const botResponse: Message = {
            id: messages.length + 2,
            text: "How can I help you?",
            sender: "bot",
          };
          setMessages((prevMessages) => [...prevMessages, botResponse]);
          setIsTyping(false);
        })
        .catch((error) => {
          setIsTyping(false);
          console.log(error);
        });
    } else {
      axios
        .post(
          `http://192.168.10.210:8080/TAM/assistant/chat/${threadId}/client`,
          {
            content: newMessage,
            role: "user",
          }
        )
        .then((response) => {
          const botResponse: Message = {
            id: messages.length + 2,
            text: response.data.content,
            sender: "bot",
          };
          setMessages((prevMessages) => [...prevMessages, botResponse]);
          setIsTyping(false);
        })
        .catch((error) => {
          setIsTyping(false);
        });
    }
  };

  useEffect(() => {
    const handleResize = () => {
      const windowHeight = window.innerHeight;
      const bodyHeight = document.body.clientHeight;

      // If the difference is more than 100 pixels, assume the keyboard is open
      setKeyboardOpen(bodyHeight - windowHeight > 100);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setNewMessage(e.target.value);
  };

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  const handleInputKeyPress = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };
  console.log(threadId);
  return (
    <>
      <Header2 isOpen={isOpen}>
        <span style={{ marginLeft: "15px" }}> Client Chat</span>
        <span onClick={handleToggle} style={{ marginRight: "15px" }}>
          X
        </span>
      </Header2>
      <ChatContainer2 isOpen={isOpen} keyboardOpen={keyboardOpen}>
        {isOpen && (
          <>
            <MessageContainer>
              {messages.map((message) => (
                <div key={message.id} ref={chatEndRef}>
                  {message.sender === "user" ? (
                    <UserMessageBubble>{message.text}</UserMessageBubble>
                  ) : (
                    <BotMessageBubble>{message.text}</BotMessageBubble>
                  )}
                </div>
              ))}
              {isTyping && <BotMessageBubble>Typing...</BotMessageBubble>}{" "}
            </MessageContainer>
            <InputContainer>
              <Input
                rows={4}
                value={newMessage}
                onChange={handleInputChange}
                onKeyDown={handleInputKeyPress}
              />
              <SendButton onClick={sendMessage}>
                <SendIcon fontSize="small" />
              </SendButton>
            </InputContainer>
          </>
        )}
      </ChatContainer2>
      <ChatToggle2 isOpen={isOpen} onClick={handleToggle}>
        <ChatIcon>💬</ChatIcon>
      </ChatToggle2>
    </>
  );
};

export default ChatComponent2;
