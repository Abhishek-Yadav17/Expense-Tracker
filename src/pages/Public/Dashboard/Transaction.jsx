import React, { useEffect, useState } from 'react'
import LogsList from './elements/LogsList'
import { useDispatch, useSelector } from 'react-redux'
import {
  fetchTransactions,
  deleteTransaction,
} from '../../../redux/slices/transactionSlice'

const BUCKET_ID = import.meta.env.VITE_APPWRITE_BUCKET_ID

const Transaction = () => {
  const dispatch = useDispatch()
  const { user } = useSelector(state => state.auth)
  const { logs } = useSelector(state => state.transactions)

  useEffect(() => {
    if (user) dispatch(fetchTransactions(user.$id))
  }, [user])

  const handleDelete = (id) => {
    dispatch(deleteTransaction(id))
  }

  return (
    <div className='transactions-page'>
      <LogsList logs={logs} bucketId={BUCKET_ID} onDelete={handleDelete} />
    </div>
  )
}

export default Transaction
