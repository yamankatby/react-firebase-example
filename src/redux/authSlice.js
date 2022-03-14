import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  createUserWithEmailAndPassword,
  updateCurrentUser,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { auth } from "../config/firebase";

const initialState = {
  name: "",
  email: "",
  password: "",

  isLoading: false,
  error: null,
};

export const register = createAsyncThunk(
  "auth/register",
  async ({ name, email, password }, { rejectWithValue }) => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      await updateCurrentUser(auth, { displayName: name });
    } catch (e) {
      return rejectWithValue(e.code);
    }
  }
);

export const logIn = createAsyncThunk(
  "auth/login",
  async ({ email, password }, { rejectWithValue }) => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (e) {
      return rejectWithValue(e.code);
    }
  }
);

export const logOut = createAsyncThunk("auth/logout", async () => {
  await signOut(auth);
});

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    changeName: (state, action) => {
      state.name = action.payload;
    },
    changeEmail: (state, action) => {
      state.email = action.payload;
    },
    changePassword: (state, action) => {
      state.password = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(register.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(register.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(register.rejected, (state, action) => {
        state.error = action.payload;
        state.isLoading = false;
      })
      .addCase(logIn.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(logIn.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(logIn.rejected, (state, action) => {
        state.error = action.payload;
        state.isLoading = false;
      });
  },
});

export const { changeName, changeEmail, changePassword } = authSlice.actions;

export default authSlice.reducer;
