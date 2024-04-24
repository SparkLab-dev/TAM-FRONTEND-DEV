import React, { useState, useEffect } from "react";

import axios from "axios";
import Icon from "./assets/829452_user_512x512.png";
import { Card, Label, UserInfo, Button, Input } from "./Style";
import { RootState } from "redux/store";
import { useSelector } from "react-redux";

interface UserProfileProps {
  firstName: string;
  lastName: string;
  email: string;
  role: string;
}

const UserProfile: React.FC = () => {
  const [userData, setUserData] = useState<UserProfileProps | null>(null);
  const [editable, setEditable] = useState(false);
  const [editedData, setEditedData] = useState<UserProfileProps | null>(null);
  const user = useSelector((state: RootState) => state.auth.user);

  const userId = user?.id;

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    axios
      .get(`http://192.168.10.210:8080/TAM/user/${userId}`)
      .then((response) => {
        setUserData(response.data);
        setEditedData(response.data);
      })
      .catch((error) => {
        console.error("Error fetching user data:", error);
      });
  };

  const handleEditClick = () => {
    setEditable(true);
  };

  const handleSaveClick = () => {
    if (editedData) {
      axios
        .post("http://192.168.10.210:8080/TAM/user/update", editedData)
        .then((response) => {
          setUserData({ ...editedData });
          setEditable(false);
          fetchData();
        })
        .catch((error) => {
          console.error("Error updating user data:", error);
        });
    }
  };

  const handleCancelClick = () => {
    setEditedData(userData);
    setEditable(false);
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    if (editedData) {
      setEditedData({ ...editedData, [name]: value });
    }
  };

  return (
    <div>
      <Card>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <img src={Icon} alt="test" style={{ width: "35%" }} />
        </div>
        <UserInfo>
          <Label>First Name:</Label>
          {editable ? (
            <Input
              type="text"
              name="firstName"
              value={editedData?.firstName}
              onChange={handleInputChange}
            />
          ) : (
            <p>{userData?.firstName}</p>
          )}
        </UserInfo>
        <UserInfo>
          <Label>Last Name:</Label>
          {editable ? (
            <Input
              type="text"
              name="lastName"
              value={editedData?.lastName}
              onChange={handleInputChange}
            />
          ) : (
            <p>{userData?.lastName}</p>
          )}
        </UserInfo>
        <UserInfo>
          <Label>Email:</Label>
          {editable ? (
            <Input
              type="text"
              name="email"
              value={editedData?.email}
              onChange={handleInputChange}
            />
          ) : (
            <p>{userData?.email}</p>
          )}
        </UserInfo>
        <UserInfo>
          <Label>Role:</Label>
          {editable ? (
            <Input
              type="text"
              name="role"
              value={editedData?.role}
              onChange={handleInputChange}
            />
          ) : (
            <p>{userData?.role}</p>
          )}
        </UserInfo>
        {editable ? (
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
              gap: "20px",
            }}
          >
            <Button onClick={handleSaveClick}>Save</Button>
            <Button onClick={handleCancelClick}>Cancel</Button>
          </div>
        ) : (
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
            }}
          >
            <Button onClick={handleEditClick}>Edit</Button>
          </div>
        )}
      </Card>
    </div>
  );
};

export default UserProfile;
