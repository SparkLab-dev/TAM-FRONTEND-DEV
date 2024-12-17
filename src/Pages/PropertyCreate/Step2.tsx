import { Button, TextField } from "@mui/material";
import { AttractionsTable, AttractionsWrapper, StepWrapper } from "./styles";
import { Add, Delete, Edit, HdrPlus } from "@mui/icons-material";
import { useFormContext } from "react-hook-form";
import { PropertyCreateInputs } from ".";

type Props = {
  handleAddAttraction: () => void;
  handleDeleteAttraction: (itemIndex: number) => void;
};
export default ({ handleAddAttraction, handleDeleteAttraction }: Props) => {
  const { watch } = useFormContext<PropertyCreateInputs>();
  const attractionsDistances = watch("distances") || [];
  return (
    <StepWrapper>
      <TextField
        sx={{ width: "100% !important" }}
        variant="outlined"
        name="licenceInfo.licenceNumber"
        label="Licence Number"
        placeholder="Tourist Licence Number"
      />
      <AttractionsWrapper>
        <h3>Add distances to attractions</h3>
        <Button onClick={handleAddAttraction} variant="outlined">
          <Add /> Add attraction
        </Button>
        <AttractionsTable>
          <div className="headers">
            <div>Attraction Name</div>
            <div>Distance</div>
            <div>Measurment</div>
            <div></div>
          </div>
          <div className="body">
            {attractionsDistances?.length ? (
              attractionsDistances.map((attraction, index) => (
                <div key={attraction.destinationID} className="row">
                  <div>{attraction.destinationID}</div>
                  <div>{attraction.distanceValue}</div>
                  <div>{attraction.distanceUnitID}</div>
                  <div>
                    <Edit />
                    <Button onClick={() => handleDeleteAttraction(index)}>
                      <Delete />
                    </Button>
                  </div>
                </div>
              ))
            ) : (
              <div className="infoRow">No attractions added</div>
            )}
          </div>
        </AttractionsTable>
      </AttractionsWrapper>
    </StepWrapper>
  );
};

const body = {
  ruPropertyId: 0,
  name: "string",
  ownerID: 0,
  typedetailedLocationId: 0,
  detailedLocationID: 0,
  space: 0,
  standardGuests: 0,
  canSleepMax: 0,
  propertyTypeID: 0,
  noOfUnits: 0,
  floor: 0,
  numberOfFloors: 0,
  street: "string",
  zipCode: "string",
  coordinates: {
    longitude: 0,
    latitude: 0,
  },
  distances: [
    {
      destinationID: 0,
      distanceUnitID: 0,
      distanceValue: 0,
    },
  ],
  amenities: [
    {
      count: 0,
      amenityID: 0,
    },
  ],
  images: [
    {
      imageTypeID: 0,
      imageReferenceID: 0,
      imageUrl: "string",
    },
  ],
  imageCaptions: [
    {
      languageID: 0,
      imageReferenceID: 0,
      caption: "string",
    },
  ],
  imageSecondaryTypes: [
    {
      imageReferenceID: 0,
      imageSecondaryTypeID: 0,
    },
  ],
  arrivalInstructions: {
    landlord: "string",
    email: "string",
    phone: "string",
    daysBeforeArrival: 0,
    howToArrive: [
      {
        languageID: 0,
        text: "string",
      },
    ],
    pickupService: {
      languageID: 0,
      text: "string",
    },
  },
  checkInOut: {
    checkInFrom: "string",
    checkInTo: "string",
    checkOutUntil: "string",
    place: "string",
    lateArrivalFees: [
      {
        from: "string",
        to: "string",
        fee: 0,
      },
    ],
    earlyDepartureFees: [
      {
        from: "string",
        to: "string",
        fee: 0,
      },
    ],
  },
  paymentMethods: [
    {
      id: 0,
      methodName: "string",
      idPaymentMethod: 0,
    },
  ],
  termsAndConditionsLinks: [
    {
      languageID: 0,
      link: "string",
    },
  ],
  deposit: {
    depositTypeID: 0,
    amount: 0,
  },
  cancellationPolicies: [
    {
      validFrom: 0,
      validTo: 0,
      percentage: 0,
    },
  ],
  descriptions: [
    {
      languageID: 0,
      text: "string",
    },
  ],
  compositionRoomAmenitiesList: [
    {
      compositionRoomID: 0,
      amenities: [
        {
          count: 0,
          amenityID: 0,
        },
      ],
    },
  ],
  securityDeposit: {
    depositTypeID: 0,
    amount: 0,
  },
  additionalFees: [
    {
      feeTaxType: 0,
      discriminatorID: 0,
      order: 0,
      value: 0,
    },
  ],
  licenceInfo: {
    licenceNumber: "string",
  },
  active: true,
  archived: true,
};
