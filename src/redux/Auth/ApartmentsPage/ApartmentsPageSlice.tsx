//redux
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

//axios
import axios from "axios";
import { useId } from "react";
import { privApi } from "utils/api";

export interface ApartmentProps {
  // name: string;
  // id: number;
  propertyName: string;
  ownerID: number;
  ownerName: string;
  detailLocationId: number;
  location: string;
  lastModified: string;
  nla: boolean;
  createdDate: string;
  active: boolean;
  id: { value: number };
}

export type AuthApartmentProps = {
  user: ApartmentProps[] | null;
  isAuthenticated: boolean;
  error: string | null;
};

const initialState: AuthApartmentProps = {
  user: null,
  isAuthenticated: false,
  error: null,
};

export const fetchApartmentIds = createAsyncThunk<ApartmentProps[], number>(
  "apartments/fetchUserApartmentIds",
  async (userId: number) => {
    try {
      const response = await privApi.get(`property/getUserProperties/${userId}`);
      return response.data?.properties || [];
    } catch (error) {
      console.error(error);
      throw error;
    }
  },
);
const apartmentsSlice = createSlice({
  name: "apartments",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchApartmentIds.fulfilled, (state, action) => {
        state.user = action.payload;
        state.isAuthenticated = true;
      })
      .addCase(fetchApartmentIds.rejected, (state, action) => {
        state.isAuthenticated = false;
        state.user = null;
        state.error = action.payload as string | null;
      });
  },
});

export default apartmentsSlice.reducer;
