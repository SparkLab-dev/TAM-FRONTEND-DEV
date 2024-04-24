import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export interface MesagePageProps {
  page_count: number;
  page_size: number;
  total_items: number;
  page: number;
  messages: {
    id: number;
    subject: string;
    message: string;
    htmlMessage: string;
    type: number;
  }[];
}

export type MessageState = {
  messages: MesagePageProps | null;
  isAuthenticated: boolean;
  selectedGuestId: string | null;
  error: string | null;
};
const initialState: MessageState = {
  messages: null,
  selectedGuestId: null,
  isAuthenticated: false,
  error: null,
};

//post api
export const sendMessage = createAsyncThunk(
  "message/sendMessage",
  async (
    { userId, messageProps }: { userId: number; messageProps: object },
    { rejectWithValue }
  ) => {
    try {
      const response = await axios.post(
        `http://192.168.10.210:8080/TAM/51902732/message/${userId}`,
        messageProps
      );

      const responseData = response.data;
      console.log(responseData);

      if (response.status !== 200) {
        return rejectWithValue(responseData.error.message);
      }

      return responseData;
    } catch (error: any) {
      console.log("Error in sendMessage:", error.response);

      return rejectWithValue("Send Message failed");
    }
  }
);

//get api

const getGuestNameFromLocalStorage = () => {
  return localStorage.getItem("selectedReservationId") || null;
};

const reservationId = getGuestNameFromLocalStorage();
console.log("Guest Name from local storage:", reservationId);

export const fetchMessage = createAsyncThunk<
  MesagePageProps,
  { userId: number },
  {
    rejectValue: string;
  }
>("message/fetchMessages", async ({ userId }, { rejectWithValue }) => {
  try {
    const response = await axios.get(
      `http://192.168.10.210:8080/TAM/${reservationId}/message/${userId}`
    );

    console.log("res", response);
    return response.data as MesagePageProps;
  } catch (error) {
    console.error("err", error);
    return rejectWithValue("Failed to fetch messages.");
  }
});

const messagesSlice = createSlice({
  name: "messages",
  initialState,
  reducers: {
    setMessages: (state, action: PayloadAction<MesagePageProps>) => {
      state.messages = action.payload;
      state.isAuthenticated = true;
    },
    setSelectedGuestId: (state, action: PayloadAction<string | null>) => {
      state.selectedGuestId = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(sendMessage.fulfilled, (state, action) => {
        state.messages = action.payload;
        state.isAuthenticated = true;
      })
      .addCase(sendMessage.rejected, (state, action) => {
        state.isAuthenticated = false;
        state.messages = null;
        state.error = action.payload as string | null;
      })
      .addCase(fetchMessage.fulfilled, (state, action) => {
        state.messages = action.payload;
        state.isAuthenticated = true;
      })
      .addCase(fetchMessage.rejected, (state, action) => {
        state.isAuthenticated = false;
        state.messages = null;
        state.error = action.payload as string | null;
      });
  },
});

export const { setMessages } = messagesSlice.actions;
export default messagesSlice.reducer;
