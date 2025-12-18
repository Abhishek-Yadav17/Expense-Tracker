import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { account } from '../../appwriteConfig'
import { ID } from 'appwrite'

export const checkUserStatus = createAsyncThunk(
  'auth/checkUserStatus',
  async () => await account.get()
)

export const loginUser = createAsyncThunk(
  'auth/loginUser',
  async ({ email, password }) => {
    await account.createEmailPasswordSession(email, password)
    return await account.get()
  }
)

export const registerUser = createAsyncThunk(
  'auth/registerUser',
  async ({ name, email, password1 }) => {
    await account.create(ID.unique(), email, password1, name)
    await account.createEmailPasswordSession(email, password1)
    return await account.get()
  }
)

export const logoutUser = createAsyncThunk(
  'auth/logoutUser',
  async () => {
    await account.deleteSession('current')
    return null
  }
)

const authSlice = createSlice({
  name: 'auth',
  initialState: { user: null, loading: true },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(checkUserStatus.fulfilled, (s, a) => {
        s.user = a.payload; s.loading = false
      })
      .addCase(checkUserStatus.rejected, (s) => {
        s.user = null; s.loading = false
      })
      .addCase(loginUser.fulfilled, (s, a) => {
        s.user = a.payload; s.loading = false
      })
      .addCase(registerUser.fulfilled, (s, a) => {
        s.user = a.payload; s.loading = false
      })
      .addCase(logoutUser.fulfilled, (s) => {
        s.user = null
      })
  }
})

export default authSlice.reducer
