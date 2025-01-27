import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import SendIcon from "@mui/icons-material/Send";

import {
  Header,
  ChatContainer,
  ChatIcon,
  ChatToggle,
  MessageContainer,
  SendButton,
  InputContainer,
  Input,
  UserMessageBubble,
  BotMessageBubble,
} from "./Assistant.style";
import { useSelector } from "react-redux";
import { RootState } from "redux/store";

interface Message {
  id: number;
  text: string;
  sender: "user" | "bot";
}

const ChatComponent: React.FC = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [messages, setMessages] = useState<Message[]>([
    { id: 1, text: "Hi there!", sender: "bot" },
    {
      id: 2,
      text: "This is TAM Chatbox! How can I help you?",
      sender: "bot",
    },
  ]);
  const userId = useSelector((state: RootState) => state.auth.user?.id);
  console.log(userId);

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

    if (!messages.find((msg) => msg.sender === "user")) {
      axios
        .post("https://393e-95-107-162-162.ngrok-free.app/TAM/assistant/thread/host", {
          newMessage,
          userId: userId,
        })
        .then((response) => {
          const id = response.data.id;
          console.log(response);
          setThreadId(id);
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
        });
    } else {
      axios
        .post(`https://393e-95-107-162-162.ngrok-free.app/TAM/assistant/chat/${threadId}/host`, {
          content: newMessage,
          role: "user",
        })
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
      <Header isOpen={isOpen} onClick={handleToggle}>
        <span style={{ marginLeft: "10px" }}> Host Chat</span>
        <span onClick={handleToggle} style={{ marginRight: "15px" }}>
          X
        </span>
      </Header>
      <ChatContainer isOpen={isOpen}>
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
              <Input rows={4} value={newMessage} onChange={handleInputChange} onKeyDown={handleInputKeyPress} />
              <SendButton onClick={sendMessage}>
                <SendIcon fontSize="small" />
              </SendButton>
            </InputContainer>
          </>
        )}
        <ChatToggle isOpen={isOpen} onClick={handleToggle}>
          <ChatIcon>💬</ChatIcon>
        </ChatToggle>
      </ChatContainer>
    </>
  );
};

export default ChatComponent;
