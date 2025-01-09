import { schemas } from "Schemas/Property";
import * as yup from "yup";

// interface to create a Property
export interface CreatePropertyInput {
  name: string;
  propertyTypeID: number;
  canSleepMax: number; //Max People
  space: number; // total size
  floor: number; // floor number
  street: string; //street name
  zipCode: string;
  detailedLocationID: number; //location id from dropdown
  coordinates: {
    longitude: number; // from google maps
    latitude: number;
  };
  licenceInfo: {
    licenceNumber: string; //license number
  };
  distances: {
    destinationID: number | null; // attraction distant values
    distanceUnitID: number | null;
    distanceValue: number | null;
  }[];
  amenities: {
    count: number; // amenity and amenity count
    amenityID: number;
  }[];
  compositionRoomAmenitiesList: {
    //room specific amenities
    compositionRoomID: number;
    amenities: {
      id: number;
      amenityID: number;
      amenityDescription: string;
    }[];
  }[];
  descriptions: {
    languageID: number;
    text: string;
  }[];
  images: {
    // image and image caption
    imageTypeID: number;
    imageReferenceID: number; // difference between imageTypeId and imageReferenceID ?
    imageUrl: string;
  }[];
  imageCaptions: {
    languageID: number;
    imageReferenceID: number;
    caption: string;
  }[];
  standardGuests: number; //seasonal prices standard guest
  minStay: number;
  additionalFees: {
    feeTaxType: number;
    discriminatorID: number;
    order: number;
    value: number;
  }[];
  securityDeposit: {
    //tax security deposit
    depositTypeID: number;
    amount: number;
  };
  arrivalInstructions: {
    //arrival informaion and instructions
    landlord: string;
    email: string;
    phone: string;
    daysBeforeArrival: number;
    howToArrive: {
      languageID: number;
      text: string;
    }[];
    pickupService: {
      languageID: number;
      text: string;
    };
  };
  checkInOut: {
    //late check-in checkout
    checkInFrom: string;
    checkInTo: string;
    checkOutUntil: string;
    place: string;
    lateArrivalFees: {
      from: string;
      to: string;
      fee: number;
    }[];
    earlyDepartureFees: {
      from: string;
      to: string;
      fee: number;
    }[];
  };
  paymentMethods: {
    //payment method
    id: number;
    methodName: string;
    idPaymentMethod: number;
  }[];
  cancellationPolicies: {
    validFrom: number;
    validTo: number;
    percentage: number;
  }[];
}

// Helper type to get nested key paths
type NestedKeyOf<T extends object> = {
  [K in keyof T & (string | number)]: T[K] extends object
    ? `${K}${"."}${NestedKeyOf<T[K]>}`
    : `${K}`;
}[keyof T & (string | number)];

// Type-safe way to get all possible paths
export type ValidSchemaKeys = NestedKeyOf<yup.InferType<typeof schemas>>;

export type AmenitiesType = {
  id: number;
  name: string;
  count: number;
  isCountEditable?: boolean;
};

export type AmenityComposition = {
  id: number;
  name: string;
  icon: JSX.Element;
  count: number;
  subTitle: string;
};
