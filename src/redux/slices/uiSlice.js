import { createSlice } from '@reduxjs/toolkit'

const uiSlice = createSlice({
  name: 'ui',
  initialState: {
    isTransactionModalOpen: false,
  },
  reducers: {
    openTransactionModal: (s) => { s.isTransactionModalOpen = true },
    closeTransactionModal: (s) => { s.isTransactionModalOpen = false },
  },
})

export const {
  openTransactionModal,
  closeTransactionModal
} = uiSlice.actions

export default uiSlice.reducer
