import { FC, useState, useEffect } from "react";

//styled-components
import {
  ExistingChatHolder,
  InboxMessages,
  MessagesParagraph,
  Span,
  UserImage,
  UserNameParagraph,
  UserProfileContainer,
} from "./style/ExistingChat.style";

//import photo from assets
import AdminLogo from "../ExistingChat/assets/adminlogo.png";

//redux
import { useSelector } from "react-redux";
import { RootState } from "redux/store";
import styled from "styled-components";

interface Conversation {
  id: number;
  guestName: string;
  apartmentName: string;
  lastChecked: string;
}

const ConversationItem = styled.div`
  display: flex;
  align-items: center;
  padding: 12px;
  border-bottom: 1px solid #eee;
  cursor: pointer;
  list-style: none;
  &:hover {
    background-color: #f5f5f5;
  }
`;

const GuestName = styled.div`
  font-weight: bold;
`;

const ExistingChat: FC<{}> = () => {
  const email = useSelector((state: RootState) => state.auth.user?.email);
  const messages = useSelector(
    (state: RootState) => state.messages.messages?.total_items
  );
  console.log(messages);
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [selectedGuest, setSelectedGuest] = useState<string | null>(null);

  const handleGuestClick = (conversation: any) => {
    // Save selected conversation information in local storage
    localStorage.setItem("selectedGuest", conversation.guestName);
    localStorage.setItem("selectedReservationId", conversation.reservationId);

    setSelectedGuest(conversation.guestName);

    window.location.reload();
  };

  useEffect(() => {
    fetch("http://192.168.10.210:8080/TAM/conversation/3")
      .then((response) => response.json())
      .then((data: Conversation[]) => {
        setConversations(data);
        console.log(data);
      })
      .catch((error) => {
        console.error("Error fetching conversations:", error);
      });
  }, []);

  return (
    <ExistingChatHolder>
      <UserProfileContainer>
        <UserNameParagraph>{email}</UserNameParagraph>
      </UserProfileContainer>
      <InboxMessages>
        <div style={{ display: "flex" }}>
          <div>
            <h3 style={{ display: "flex", alignItems: "baseline" }}>
              Conversation List
            </h3>
            <ul>
              {conversations.map((conversation) => (
                <li key={conversation.id}>
                  <ConversationItem
                    onClick={() => handleGuestClick(conversation)}
                  >
                    <GuestName>{conversation.guestName}</GuestName>
                  </ConversationItem>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </InboxMessages>
    </ExistingChatHolder>
  );
};

export default ExistingChat;
