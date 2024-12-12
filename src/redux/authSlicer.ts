import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

interface User {
  id: number | null;
  accessToken: string | null;
  email: string | null;
  firstName: string | null;
  lastName: string | null;
  role: string | null;
  registredInSmoobu: boolean;
}

export type AuthState = {
  user: User | null;
  isAuthenticated: boolean;
  error: string | null;
};

const initialState: AuthState = {
  user: null,
  isAuthenticated: false,
  error: null,
};

export const loginUser = createAsyncThunk(
  "user/loginUser",
  async (userCredentials: object, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        "http://192.168.10.141:8080/TAM/auth/login",
        userCredentials
      );

      const responseData = response.data.body;

      console.log(responseData);

      localStorage.setItem("user", JSON.stringify(responseData));

      if (response.status !== 200) {
        return rejectWithValue(responseData.error.message);
      }

      localStorage.setItem("user", JSON.stringify(responseData));

      return responseData;
    } catch (error) {
      console.log("Error in loginUser:", error);

      return rejectWithValue("Login failed");
    }
  }
);

export const logoutUser = createAsyncThunk<void, number | null>(
  "user/logoutUser",
  async (incomingUserId: number | null, { rejectWithValue }) => {
    try {
      const user = localStorage.getItem("user");
      console.log(user);
      if (!user) {
        throw new Error("User data not found in localStorage");
      }
      const userData = JSON.parse(user);
      const userIdFromLocalStorage = userData.id;
      console.log(userIdFromLocalStorage);
      if (!userIdFromLocalStorage) {
        throw new Error("User ID not found in user data");
      }
      const response = await axios.post(
        `http://192.168.10.141:8080/TAM/auth/logout/${userIdFromLocalStorage}`
      );

      console.log("Logout response:", response.data);
      localStorage.removeItem("user");
    } catch (error) {
      console.error("Error in logoutUser:", error);

      return rejectWithValue("Logout failed");
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
      state.isAuthenticated = true;
    },
    clearUser: (state) => {
      state.user = null;
      state.isAuthenticated = false;
    },
    updateSmoobuRegistration: (state, action: PayloadAction<boolean>) => {
      if (state.user) {
        state.user.registredInSmoobu = action.payload;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.fulfilled, (state, action) => {
        state.user = action.payload;
        state.isAuthenticated = true;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isAuthenticated = false;
        state.user = null;
        state.error = action.payload as string | null;
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.isAuthenticated = false;
        state.user = null;
      })
      .addCase(logoutUser.rejected, (state, action) => {
        state.error = action.payload as string | null;
      });
  },
});

export const { setUser, clearUser, updateSmoobuRegistration } =
  authSlice.actions;
export default authSlice.reducer;
