import React, { useState } from "react";
import styled from "styled-components";
import axios from "axios";

// Types for form data
interface StayInfo {
    propertyID: number;
    dateFrom: string;
    dateTo: string;
    numberOfGuests: number;
    ruPrice: number;
    clientPrice: number;
    alreadyPaid: number;
    channelCommission: number;
    statusID: number;
  }
  
  interface CancellationPolicy {
    validFrom: number;
    validTo: number;
    percentage: number;
  }
  
  interface CancellationPolicyInfo {
    policyText: string;
    cancellationPolicies: {
      cancellationPolicies: CancellationPolicy[]; // Nested object structure
    };
  }
  
  interface CustomerInfo {
    name: string;
    surName: string;
    email: string;
    phone: string;
    skypeID: string;
    address: string;
    zipCode: string;
    languageID: number;
    countryID: number;
  }
  
  interface GuestDetailsInfo {
    numberOfAdults: number;
    numberOfChildren: number;
    numberOfInfants: number;
    childrenAges: number[];
    numberOfPets: number;
  }
  
  interface Reservation {
    stayInfos: StayInfo[];
    cancellationPolicyInfo: CancellationPolicyInfo;
    customerInfo: CustomerInfo;
    guestDetailsInfo: GuestDetailsInfo;
    comments: string;
  }
  

const FormWrapper = styled.form`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
  margin: 20px;
  margin-top: 350px;
  padding-bottom:50px;
`;

const FieldWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;


const SectionTitle = styled.h2`
  grid-column: span 3;
  margin-top: 20px;
  font-size: 1.2rem;
`;

const TextArea = styled.textarea`
  resize: none;
  padding: 8px;
  font-size: 1rem;
`;

const Input = styled.input`
  padding: 8px;
  font-size: 1rem;
`;

const SubmitButton = styled.button`
  grid-column: span 3;
  padding: 12px;
  background-color: #007bff;
  color: #fff;
  font-size: 1.2rem;
  border: none;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    background-color: #0056b3;
  }
`;

const ReservationForm: React.FC = () => {
    const [formData, setFormData] = useState<Reservation>({
        stayInfos: [
          {
            propertyID: 0,
            dateFrom: "",
            dateTo: "",
            numberOfGuests: 0,
            ruPrice: 0,
            clientPrice: 0,
            alreadyPaid: 0,
            channelCommission: 0,
            statusID: 0,
          },
        ],
        cancellationPolicyInfo: {
          policyText: "test",
          cancellationPolicies: {
            cancellationPolicies: [
              {
                validFrom: 0,
                validTo: 0,
                percentage: 0,
              },
            ],
          },
        },
        customerInfo: {
          name: "",
          surName: "",
          email: "",
          phone: "",
          skypeID: "",
          address: "",
          zipCode: "",
          languageID: 0,
          countryID: 0,
        },
        guestDetailsInfo: {
          numberOfAdults: 0,
          numberOfChildren: 0,
          numberOfInfants: 0,
          childrenAges: [],
          numberOfPets: 0,
        },
        comments: "",
      });
    
      const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
        path: string
      ) => {
        const keys = path.split(".");
        setFormData((prev) => {
          const updated = { ...prev };
          let current: any = updated;
          for (let i = 0; i < keys.length - 1; i++) {
            current = current[keys[i]];
          }
          current[keys[keys.length - 1]] = e.target.value;
          return updated;
        });
      };
    
      const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
          const response = await axios.post(
            "https://109f-95-107-162-162.ngrok-free.app/TAM/reservation/sendConfirmedReservation",
            formData, // Send formData as request body in JSON format
            {
              headers: {
                "Content-Type": "application/json", // Explicitly set the content type to JSON
              },
            }
          );
          console.log("Reservation created successfully:", response.data);
        } catch (error) {
          console.error("Error creating reservation:", error);
        }
      };
    

  return (
    <FormWrapper onSubmit={handleSubmit}>
      
      <SectionTitle>Stay Info</SectionTitle>
      <FieldWrapper>
        <label>Property ID</label>
        <Input
          type="number"
          value={formData.stayInfos[0].propertyID}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            handleChange(e, "stayInfos.0.propertyID")
          }
        />
      </FieldWrapper>
      <FieldWrapper>
        <label>Date From</label>
        <Input
          type="date"
          value={formData.stayInfos[0].dateFrom}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            handleChange(e, "stayInfos.0.dateFrom")
          }
        />
      </FieldWrapper>
      <FieldWrapper>
        <label>Date To</label>
        <Input
          type="date"
          value={formData.stayInfos[0].dateTo}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            handleChange(e, "stayInfos.0.dateTo")
          }
        />
      </FieldWrapper>
      <FieldWrapper>
        <label>Number of Guests</label>
        <Input
          type="number"
          value={formData.stayInfos[0].numberOfGuests}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            handleChange(e, "stayInfos.0.numberOfGuests")
          }
        />
      </FieldWrapper>
      <FieldWrapper>
        <label>RU Price</label>
        <Input
          type="number"
          value={formData.stayInfos[0].ruPrice}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            handleChange(e, "stayInfos.0.ruPrice")
          }
        />
      </FieldWrapper>
      <FieldWrapper>
        <label>Client Price</label>
        <Input
          type="number"
          value={formData.stayInfos[0].clientPrice}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            handleChange(e, "stayInfos.0.clientPrice")
          }
        />
      </FieldWrapper>
      <FieldWrapper>
        <label>Already Paid</label>
        <Input
          type="number"
          value={formData.stayInfos[0].alreadyPaid}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            handleChange(e, "stayInfos.0.alreadyPaid")
          }
        />
      </FieldWrapper>
      <FieldWrapper>
        <label>Channel Commission</label>
        <Input
          type="number"
          value={formData.stayInfos[0].channelCommission}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            handleChange(e, "stayInfos.0.channelCommission")
          }
        />
      </FieldWrapper>
      <FieldWrapper>
        <label>Status ID</label>
        <Input
          type="number"
          value={formData.stayInfos[0].statusID}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            handleChange(e, "stayInfos.0.statusID")
          }
        />
      </FieldWrapper>

      
      <SectionTitle>Customer Info</SectionTitle>
      <FieldWrapper>
        <label>Name</label>
        <Input
          type="text"
          value={formData.customerInfo.name}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            handleChange(e, "customerInfo.name")
          }
        />
      </FieldWrapper>
      <FieldWrapper>
        <label>Surname</label>
        <Input
          type="text"
          value={formData.customerInfo.surName}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            handleChange(e, "customerInfo.surName")
          }
        />
      </FieldWrapper>
      <FieldWrapper>
        <label>Email</label>
        <Input
          type="email"
          value={formData.customerInfo.email}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            handleChange(e, "customerInfo.email")
          }
        />
      </FieldWrapper>
      <FieldWrapper>
        <label>Phone</label>
        <Input
          type="text"
          value={formData.customerInfo.phone}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            handleChange(e, "customerInfo.phone")
          }
        />
      </FieldWrapper>
      <FieldWrapper>
        <label>Skype ID</label>
        <Input
          type="text"
          value={formData.customerInfo.skypeID}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            handleChange(e, "customerInfo.skypeID")
          }
        />
      </FieldWrapper>
      <FieldWrapper>
        <label>Address</label>
        <Input
          type="text"
          value={formData.customerInfo.address}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            handleChange(e, "customerInfo.address")
          }
        />
      </FieldWrapper>
      <FieldWrapper>
        <label>Zip Code</label>
        <Input
          type="text"
          value={formData.customerInfo.zipCode}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            handleChange(e, "customerInfo.zipCode")
          }
        />
      </FieldWrapper>
      <FieldWrapper>
        <label>Language ID</label>
        <Input
          type="number"
          value={formData.customerInfo.languageID}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            handleChange(e, "customerInfo.languageID")
          }
        />
      </FieldWrapper>
      <FieldWrapper>
        <label>Country ID</label>
        <Input
          type="number"
          value={formData.customerInfo.countryID}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            handleChange(e, "customerInfo.countryID")
          }
        />
      </FieldWrapper>

    
      <SectionTitle>Guest Details</SectionTitle>
      <FieldWrapper>
        <label>Number of Adults</label>
        <Input
          type="number"
          value={formData.guestDetailsInfo.numberOfAdults}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            handleChange(e, "guestDetailsInfo.numberOfAdults")
          }
        />
      </FieldWrapper>
      <FieldWrapper>
        <label>Number of Children</label>
        <Input
          type="number"
          value={formData.guestDetailsInfo.numberOfChildren}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            handleChange(e, "guestDetailsInfo.numberOfChildren")
          }
        />
      </FieldWrapper>
      <FieldWrapper>
        <label>Number of Infants</label>
        <Input
          type="number"
          value={formData.guestDetailsInfo.numberOfInfants}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            handleChange(e, "guestDetailsInfo.numberOfInfants")
          }
        />
      </FieldWrapper>
      <FieldWrapper>
        <label>Children Ages</label>
        <Input
          type="text"
          value={formData.guestDetailsInfo.childrenAges.join(", ")}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            handleChange(e, "guestDetailsInfo.childrenAges")
          }
        />
      </FieldWrapper>
      <FieldWrapper>
        <label>Number of Pets</label>
        <Input
          type="number"
          value={formData.guestDetailsInfo.numberOfPets}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            handleChange(e, "guestDetailsInfo.numberOfPets")
          }
        />
      </FieldWrapper>

      {/* Comments Section */}
      <SectionTitle>Comments</SectionTitle>
      <FieldWrapper>
        <label>Comments</label>
        <TextArea
          rows={3}
          value={formData.comments}
          onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
            handleChange(e, "comments")
          }
        />
      </FieldWrapper>

      {/* Submit Button */}
      <SubmitButton type="submit">Submit Reservation</SubmitButton>
    </FormWrapper>
  );
};

export default ReservationForm;
