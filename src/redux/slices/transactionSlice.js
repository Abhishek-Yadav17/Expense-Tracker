import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { databases, storage } from '../../appwriteConfig'
import { ID, Query } from 'appwrite'

const DB_ID = import.meta.env.VITE_APPWRITE_DB_ID
const TABLE_ID = import.meta.env.VITE_APPWRITE_TABLE_ID
const BUCKET_ID = import.meta.env.VITE_APPWRITE_BUCKET_ID

export const fetchTransactions = createAsyncThunk(
  'transactions/fetch',
  async (userId) => {
    const res = await databases.listDocuments(DB_ID, TABLE_ID, [
      Query.equal('userId', userId),
      Query.orderDesc('$createdAt'),
    ])
    return res.documents
  }
)

export const addTransaction = createAsyncThunk(
  'transactions/add',
  async ({ userId, data, file }) => {
    let fileId = ''
    if (file) {
      const f = await storage.createFile(BUCKET_ID, ID.unique(), file)
      fileId = f.$id
    }

    await databases.createDocument(DB_ID, TABLE_ID, ID.unique(), {
      userId,
      ...data,
      amount: Number(data.amount),
      attachmentId: fileId,
    })
  }
)

export const deleteTransaction = createAsyncThunk(
  'transactions/delete',
  async (id) => {
    await databases.deleteDocument(DB_ID, TABLE_ID, id)
    return id
  }
)

const transactionSlice = createSlice({
  name: 'transactions',
  initialState: { logs: [] },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTransactions.fulfilled, (s, a) => {
        s.logs = a.payload
      })
      .addCase(deleteTransaction.fulfilled, (s, a) => {
        s.logs = s.logs.filter(l => l.$id !== a.payload)
      })
  }
})

export default transactionSlice.reducer
