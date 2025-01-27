import React, { useEffect, useState } from "react";
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
  
  interface Language {
    id: number;
    idLanguage: number;
    language: string;
    languageCode: string;
  }
  
  interface Country {
    countryId: number;
    currencyCode: string;
    id: number;
    location: string;
    locationId: number;
    locationTimeZone: string;
    locationTypeId: number;
    parentLocationId: number;
  }
  
  interface Status {
    id: number;
    idReservationStatus: number;
    statusName: string;
  }
  

const FormWrapper = styled.form`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
  margin: 20px;
  
  padding-bottom:50px;

   @media (max-width: 768px) {
    display:flex;
    flex-direction:column;
    
  }
  
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
  background-color: #4f734c;
  color: #fff;
  font-size: 1.2rem;
  border: none;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    background-color: #0056b3;
  }
      @media (max-width: 768px) {
   width:180px;
   height:40px;
   font-size:1rem;
   padding:0
  }
    
`;
const ButtonHandler=styled.div`
 width:100%;
 margin: 20px;
 padding-bottom:50px;
 display: flex;
 justify-content: center;
 align-items: center;
  
`
const Page = styled.div`
  
  
  gap: 25px;
  padding-top: 200px;
  max-width: 1400px;
  width: calc(100% - 400px);
  margin-top: -100px;
  height: 100%;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    width: calc(100% - 100px);
  }
`;
const Label = styled.text`
  font-weight: 500;
  color: black;
`;

const ReservationForm: React.FC = () => {
    const [languages, setLanguages] = useState<Language[]>([]);
    const [selectedLanguage, setSelectedLanguage] = useState<number | null>(null);
    const [countries, setCountries] = useState<Country[]>([]);
    const [selectedCountries, setSelectedCountries] = useState<number | null>(null);
    const [status, setStatus] = useState<Status[]>([]);
    const [selectedStatus, setSelectedStatus] = useState<number | null>(null);
  
    useEffect(() => {
        const fetchLanguages = async () => {
          try {
            const response = await axios.get<Language[]>(
              "http://192.168.10.210:8081/TAM/dictionary/allLanguages"
            );
            setLanguages(response.data); // Update state with API response
          } catch (error) {
            console.error("Error fetching languages:", error);
          }
        };
    
        fetchLanguages();
      }, []);


      const handleLanguageChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        
        setSelectedLanguage(Number(event.target.value)); // Convert value to number
        console.log(selectedLanguage);
      };

      useEffect(() => {
        const fetchCountries = async () => {
          try {
            const response = await axios.get<Country[]>(
              "http://192.168.10.210:8081/TAM/dictionary/getLocationsCountry"
            );
            setCountries(response.data);
            console.log(countries);
          } catch (error) {
            console.error("Error fetching countries:", error);
          }
        };
    
        fetchCountries();
      }, []);

      const handleCountryChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedCountries(Number(event.target.value)); // Convert value to number
        console.log(selectedCountries);
      };


      useEffect(() => {
        const fetchStatuses = async () => {
          try {
            const response = await axios.get<Status[]>(
              "http://192.168.10.210:8081/TAM/dictionary/allReservationStatus"
            );
            setStatus(response.data); 
            console.log(response.data);
          } catch (error) {
            console.error("Error fetching statuses:", error);
          }
        };
    
        fetchStatuses();
      }, []);
      const handleStatusChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedStatus(Number(event.target.value)); // Convert value to number
        console.log(selectedStatus);
      };


      
      const filteredStatuses = status.filter(
        (s) => s.statusName === "Approved" || s.statusName === "Request"
      );

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
            statusID: selectedStatus??6,
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
          languageID: selectedLanguage ?? 0,
          countryID: selectedCountries ?? 0,
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
          // Choose the API endpoint based on the status
          const apiEndpoint =
            selectedStatus === 6
              ? "https://app.hostai.it/TAM/reservation/sendConfirmedReservation"
              : "http://192.168.10.210:8081/TAM/reservation/sendReservationRequest";
      
          
          const response = await axios.post(apiEndpoint, formData);
      
          console.log(
            `Reservation ${
              selectedStatus === 6 ? "confirmed" : "requested"
            } successfully:`,
            response.data
          );
        } catch (error) {
          console.error("Error creating reservation:", error);
        }
      };
      
    

  return (
    <Page>
    <FormWrapper onSubmit={handleSubmit}>
      
      <SectionTitle>Stay Info</SectionTitle>
      <FieldWrapper>
        <Label>Property ID</Label>
        <Input
          type="number"
          value={formData.stayInfos[0].propertyID}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            handleChange(e, "stayInfos.0.propertyID")
          }
        />
      </FieldWrapper>
      <FieldWrapper>
        <Label>Date From</Label>
        <Input
          type="date"
          value={formData.stayInfos[0].dateFrom}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            handleChange(e, "stayInfos.0.dateFrom")
          }
        />
      </FieldWrapper>
      <FieldWrapper>
        <Label>Date To</Label>
        <Input
          type="date"
          value={formData.stayInfos[0].dateTo}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            handleChange(e, "stayInfos.0.dateTo")
          }
        />
      </FieldWrapper>
      <FieldWrapper>
        <Label>Number of Guests</Label>
        <Input
          type="number"
          value={formData.stayInfos[0].numberOfGuests}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            handleChange(e, "stayInfos.0.numberOfGuests")
          }
        />
      </FieldWrapper>
      <FieldWrapper>
        <Label>RU Price</Label>
        <Input
          type="number"
          value={formData.stayInfos[0].ruPrice}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            handleChange(e, "stayInfos.0.ruPrice")
          }
        />
      </FieldWrapper>
      <FieldWrapper>
        <Label>Client Price</Label>
        <Input
          type="number"
          value={formData.stayInfos[0].clientPrice}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            handleChange(e, "stayInfos.0.clientPrice")
          }
        />
      </FieldWrapper>
      <FieldWrapper>
        <Label>Already Paid</Label>
        <Input
          type="number"
          value={formData.stayInfos[0].alreadyPaid}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            handleChange(e, "stayInfos.0.alreadyPaid")
          }
        />
      </FieldWrapper>
      <FieldWrapper>
        <Label>Channel Commission</Label>
        <Input
          type="number"
          value={formData.stayInfos[0].channelCommission}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            handleChange(e, "stayInfos.0.channelCommission")
          }
        />
      </FieldWrapper>
      <FieldWrapper>
        <Label>Status</Label>
        <select id="status-select" onChange={handleStatusChange} style={{height:"40px"}}>
        <option value="" disabled>
          --Choose a status--
        </option>
        {filteredStatuses.map((status) => (
          <option key={status.id} value={status.idReservationStatus}>
            {status.statusName}
          </option>
        ))}
      </select>
      </FieldWrapper>

      
      <SectionTitle>Customer Info</SectionTitle>
      <FieldWrapper>
        <Label>Name</Label>
        <Input
          type="text"
          value={formData.customerInfo.name}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            handleChange(e, "customerInfo.name")
          }
        />
      </FieldWrapper>
      <FieldWrapper>
        <Label>Surname</Label>
        <Input
          type="text"
          value={formData.customerInfo.surName}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            handleChange(e, "customerInfo.surName")
          }
        />
      </FieldWrapper>
      <FieldWrapper>
        <Label>Email</Label>
        <Input
          type="email"
          value={formData.customerInfo.email}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            handleChange(e, "customerInfo.email")
          }
        />
      </FieldWrapper>
      <FieldWrapper>
        <Label>Phone</Label>
        <Input
          type="text"
          value={formData.customerInfo.phone}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            handleChange(e, "customerInfo.phone")
          }
        />
      </FieldWrapper>
      <FieldWrapper>
        <Label>Skype ID</Label>
        <Input
          type="text"
          value={formData.customerInfo.skypeID}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            handleChange(e, "customerInfo.skypeID")
          }
        />
      </FieldWrapper>
      <FieldWrapper>
        <Label>Address</Label>
        <Input
          type="text"
          value={formData.customerInfo.address}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            handleChange(e, "customerInfo.address")
          }
        />
      </FieldWrapper>
      <FieldWrapper>
        <Label>Zip Code</Label>
        <Input
          type="text"
          value={formData.customerInfo.zipCode}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            handleChange(e, "customerInfo.zipCode")
          }
        />
      </FieldWrapper>
      <FieldWrapper>
        <Label>Language</Label>
          <select id="language-select" onChange={handleLanguageChange} style={{height:"40px"}}>
        <option value="" disabled>
          --Choose a language--
        </option>
        {languages.map((language) => (
          <option key={language.id} value={language.idLanguage}>
            {language.language}
          </option>
        ))}
      </select>
      </FieldWrapper>
      <FieldWrapper>
        <Label>Country</Label>
        <select id="country-select" onChange={handleCountryChange} style={{height:"40px"}}>
        <option value="" disabled>
          --Choose a country--
        </option>
        {countries.map((country) => (
          <option key={country.id} value={country.locationId}>
            {country.location}
          </option>
        ))}
      </select>
      </FieldWrapper>

    
      <SectionTitle>Guest Details</SectionTitle>
      <FieldWrapper>
        <Label>Number of Adults</Label>
        <Input
          type="number"
          value={formData.guestDetailsInfo.numberOfAdults}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            handleChange(e, "guestDetailsInfo.numberOfAdults")
          }
        />
      </FieldWrapper>
      <FieldWrapper>
        <Label>Number of Children</Label>
        <Input
          type="number"
          value={formData.guestDetailsInfo.numberOfChildren}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            handleChange(e, "guestDetailsInfo.numberOfChildren")
          }
        />
      </FieldWrapper>
      <FieldWrapper>
        <Label>Number of Infants</Label>
        <Input
          type="number"
          value={formData.guestDetailsInfo.numberOfInfants}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            handleChange(e, "guestDetailsInfo.numberOfInfants")
          }
        />
      </FieldWrapper>
      <FieldWrapper>
        <Label>Children Ages</Label>
        <Input
          type="text"
          value={formData.guestDetailsInfo.childrenAges.join(", ")}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            handleChange(e, "guestDetailsInfo.childrenAges")
          }
        />
      </FieldWrapper>
      <FieldWrapper>
        <Label>Number of Pets</Label>
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
        <Label>Comments</Label>
        <TextArea
          rows={3}
          value={formData.comments}
          onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
            handleChange(e, "comments")
          }
        />
      </FieldWrapper>

      {/* Submit Button */}
     
    </FormWrapper>
    <ButtonHandler>
      <SubmitButton type="submit">Submit Reservation</SubmitButton>
      </ButtonHandler>
    </Page>
  );
};

export default ReservationForm;
