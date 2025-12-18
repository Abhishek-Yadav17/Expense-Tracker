import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  fetchTransactions,
  addTransaction,
  deleteTransaction,
} from '../../../redux/slices/transactionSlice'
import {
  openTransactionModal,
  closeTransactionModal,
} from '../../../redux/slices/uiSlice'
import TransactionModal from './elements/TransactionModal'
import LogsList from './elements/LogsList'
import ChartBox from './elements/ChartBox'
import CategoryBox from './elements/CategoryBox'
import '../../../styles/Home.scss'

const BUCKET_ID = import.meta.env.VITE_APPWRITE_BUCKET_ID

const Home = () => {
  const dispatch = useDispatch()
  const { user } = useSelector(state => state.auth)
  const { logs } = useSelector(state => state.transactions)
  const { isTransactionModalOpen } = useSelector(state => state.ui)

  useEffect(() => {
    if (user) dispatch(fetchTransactions(user.$id))
  }, [user])

  const handleAddFromModal = async (data, file) => {
    await dispatch(addTransaction({ userId: user.$id, data, file })).unwrap()
    dispatch(fetchTransactions(user.$id))
    dispatch(closeTransactionModal())
  }

  const handleDelete = async (id) => {
    await dispatch(deleteTransaction(id)).unwrap()
  }

  const monthly = {}
  const totals = {}

  logs.forEach(item => {
    const month = item.date.slice(0, 7)
    if (!monthly[month]) monthly[month] = { month, income: 0, expense: 0 }
    item.type === 'income'
      ? monthly[month].income += item.amount
      : monthly[month].expense += item.amount

    const cat = item.category || 'General'
    totals[cat] = (totals[cat] || 0) + item.amount
  })


  return (
    <div className='home'>
      <div className="home-top">
        <h1>Finance Dashboard</h1>

        <button
          onClick={() => dispatch(openTransactionModal())}
        >
          + Add Transaction
        </button>
      </div>

      <TransactionModal
        open={isTransactionModalOpen}
        onClose={() => dispatch(closeTransactionModal())}
        categories={['General','Salary','Food','Transport','Shopping','Bills']}
        onAdd={handleAddFromModal}
      />

      <div className="content">
        <div className="content-top">
          <ChartBox chartData={Object.values(monthly)} />
          <CategoryBox
            totals={Object.keys(totals).map(k => ({ name: k, value: totals[k] }))}
          />
        </div>
        <div className="content-bottom">
          <LogsList
            logs={logs.slice(0, 5)}
            bucketId={BUCKET_ID}
            onDelete={handleDelete}
          />
        </div>
      </div>
    </div>
  )
}

export default Home
