import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

export interface RecoverPass {
  password: string;
  token: string | null;
}
export type AuthRegPass = {
  user: RecoverPass | null;
  isAuthenticated: boolean;
  error: string | null;
};
const initialState: AuthRegPass = {
  user: null,
  isAuthenticated: false,
  error: null,
};

export const resetPassword = createAsyncThunk(
  "reset/resetPassword",
  async (newPassword: object, { rejectWithValue }) => {
    const currentUrl = window.location.href;

    try {
      const url = new URL(currentUrl);

      const pathnameParts = url.pathname.split("/");
      console.log("pathname", pathnameParts);
      const token = pathnameParts[pathnameParts.length - 1];

      const response = await axios.post(
        `http://192.168.10.210:8080/TAM/savepassword/${token}`,

        newPassword
      );

      const responseData = response.data.body;

      if (response.status !== 200) {
        return rejectWithValue(responseData.error.message);
      }

      return responseData;
    } catch (error) {
      // console.log("Error in savepassword:", error);

      return rejectWithValue("savepassword failed");
    }
  }
);
const resetPasswordSlice = createSlice({
  name: "recoverPassword",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<RecoverPass>) => {
      state.user = action.payload;
      state.isAuthenticated = true;
    },
    // clearUser: (state) => {
    //   state.user = null;
    //   state.isAuthenticated = false;
    // },
  },
  extraReducers: (builder) => {
    builder
      .addCase(resetPassword.fulfilled, (state, action) => {
        state.user = action.payload;
        state.isAuthenticated = true;
      })
      .addCase(resetPassword.rejected, (state, action) => {
        state.isAuthenticated = false;
        state.user = null;
        state.error = action.payload as string | null;
      });
  },
});
export const { setUser } = resetPasswordSlice.actions;
export default resetPasswordSlice.reducer;
