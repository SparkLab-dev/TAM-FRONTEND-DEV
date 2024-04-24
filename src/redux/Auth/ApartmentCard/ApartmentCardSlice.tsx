import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

interface ApartmentDetails {
  id: number;
  name: string;
  location: {
    street: string;
    zip: string;
    city: string;
    country: string;
    latitude: string;
    longitude: string;
  };
  timeZone: string;
  rooms: {
    maxOccupancy: number;
    bedrooms: number;
    bathrooms: number;
    doubleBeds: number;
    singleBeds: number;
    sofaBeds: number | null;
    couches: number | null;
    childBeds: number | null;
    queenSizeBeds: number | null;
    kingSizeBeds: number;
  };
  equipments: string[];
  currency: string;
  price: {
    minimal: string;
    maximal: string;
  };
  type: {
    id: number;
    name: string;
  };
  userId: number;
}

export type ApartmentsState = {
  apartmentDetails: ApartmentDetails | null;
  isAuthenticated: boolean;
  error: string | null;
};
const initialState: ApartmentsState = {
  apartmentDetails: null,
  isAuthenticated: false,
  error: null,
};

export const fetchApartmentCardDetails = createAsyncThunk<
  ApartmentDetails,
  { userId: number; id: number },
  {
    rejectValue: string;
  }
>(
  "apartments/fetchUserApartmentCardDetails",
  async ({ userId, id }, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `http://192.168.10.210:8080/TAM/${userId}/apartments/${id}`
      );
      console.log("userId", userId);
      console.log("id", id);
      console.log("res", response);
      return response.data as ApartmentDetails;
    } catch (error) {
      console.error("err", error);
      return rejectWithValue("Failed to fetch apartment details.");
    }
  }
);

const apartmentsCardSlice = createSlice({
  name: "apartmentCard",
  initialState,
  reducers: {
    setUserId: (state, action: PayloadAction<number>) => {
      if (state.apartmentDetails) {
        console.log(state.apartmentDetails);
        state.apartmentDetails.userId = action.payload;
      }
      state.isAuthenticated = true;
    },
    setApartmentId: (state, action: PayloadAction<number>) => {
      if (state.apartmentDetails) {
        state.apartmentDetails.id = action.payload;
      }
      state.isAuthenticated = true;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchApartmentCardDetails.fulfilled, (state, action) => {
        state.apartmentDetails = action.payload;
        state.isAuthenticated = true;
      })
      .addCase(fetchApartmentCardDetails.rejected, (state, action) => {
        state.isAuthenticated = false;
        state.apartmentDetails = null;
        state.error = action.payload as string | null;
      });
  },
});

export const { setUserId, setApartmentId } = apartmentsCardSlice.actions;
export default apartmentsCardSlice.reducer;
