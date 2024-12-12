import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

export interface Modal {
  startDate: string;
  endDate: string;
  price: number;
  minLength: number;
  userId: number;
  date: string;
}

export type ModalState = {
  modal: Modal | null;
  isAuthenticated: boolean;
  error: string | null;
};

const initialState: ModalState = {
  modal: null,
  isAuthenticated: false,
  error: null,
};

export const openModal = createAsyncThunk(
  "modal/openModal",
  async (
    { userId, userCredentials }: { userId: number; userCredentials: object },
    { rejectWithValue }
  ) => {
    try {
      const response = await axios.post(
        `http://192.168.10.141:8080/TAM/${userId}/apartmentAvailability`,
        userCredentials
      );

      const responseRegData = response.data;
      console.log("", responseRegData);

      if (response.status !== 200) {
        return rejectWithValue(responseRegData.error.message);
      }

      return responseRegData;
    } catch (error: any) {
      console.log("Error in openModal:", error.response);

      return rejectWithValue("Modal register failed");
    }
  }
);

//get api
export const openRentList = createAsyncThunk<
  Modal,
  { userId: number; rentListProperties: object },
  { rejectValue: string }
>(
  "rentList/openRentList",
  async ({ userId, rentListProperties }, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `http://192.168.10.141:8080/TAM/${userId}/apartmentAvailability`,
        { params: rentListProperties }
      );

      const responseRentListData = response.data.data;
      console.log(responseRentListData);

      if (response.status !== 200) {
        return rejectWithValue(responseRentListData.error);
      }

      return responseRentListData;
    } catch (error: any) {
      console.log(error.response);
      return rejectWithValue("Rent list fetch failed");
    }
  }
);
const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    setModal: (state, action: PayloadAction<Modal>) => {
      state.modal = action.payload;
      state.isAuthenticated = true;
    },

    setRentList: (state, action: PayloadAction<Modal>) => {
      console.log(state.modal);
      state.modal = action.payload;
      state.isAuthenticated = true;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(openModal.fulfilled, (state, action) => {
        state.modal = action.payload;
        state.isAuthenticated = true;
      })
      .addCase(openModal.rejected, (state, action) => {
        state.isAuthenticated = false;
        state.modal = null;
        state.error = action.payload as string | null;
      })
      .addCase(openRentList.fulfilled, (state, action) => {
        state.modal = action.payload;
        state.isAuthenticated = true;
      })
      .addCase(openRentList.rejected, (state, action) => {
        state.isAuthenticated = false;
        state.modal = null;
        state.error = action.payload as string | null;
      });
  },
});

export const { setModal, setRentList } = modalSlice.actions;
export default modalSlice.reducer;
