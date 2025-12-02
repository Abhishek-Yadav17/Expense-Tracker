import React, { useState, useEffect } from 'react'
import { databases } from '../appwriteConfig'
import { ID, Query } from 'appwrite'
import { useAuth } from '../context/authContext'
import '../styles/Home.scss'

import {
  PieChart,
  Pie,
  Tooltip,
  ResponsiveContainer
} from 'recharts'

const DB_ID = import.meta.env.VITE_APPWRITE_DB_ID
const TABLE_ID = import.meta.env.VITE_APPWRITE_TABLE_ID

const Home = () => {
  const { user } = useAuth()

  const [amount, setAmount] = useState('')
  const [type, setType] = useState('income')
  const [date, setDate] = useState('')
  const [note, setNote] = useState('')
  const [logs, setLogs] = useState([])
  const [chartData, setChartData] = useState([])

  const getLogs = async () => {
    if (!user) return

    try {
      const res = await databases.listDocuments(DB_ID, TABLE_ID, [
        Query.equal('userId', user.$id),
        Query.orderDesc('$createdAt')
      ])

      setLogs(res.documents)
      generateChartData(res.documents)
    } catch (err) {
      console.error(err)
    }
  }

  useEffect(() => {
    getLogs()
  }, [user])

  const addEntry = async (e) => {
    e.preventDefault()
    if (!user) return

    try {
      await databases.createDocument(DB_ID, TABLE_ID, ID.unique(), {
        userId: user.$id,
        type,
        amount: Number(amount),
        date,
        note
      })

      setAmount('')
      setDate('')
      setNote('')

      getLogs()
    } catch (err) {
      console.error(err)
    }
  }

  const generateChartData = (docs) => {
    const monthly = {}

    docs.forEach((item) => {
      const month = item.date.slice(0, 7)

      if (!monthly[month]) {
        monthly[month] = { month, income: 0, expense: 0 }
      }

      if (item.type === 'income') {
        monthly[month].income += item.amount
      } else {
        monthly[month].expense += item.amount
      }
    })

    setChartData(Object.values(monthly))
  }

  return (
    <div className='home'>
      <h1>Finance Dashboard</h1>

      <div className='content'>
        {/* LEFT SIDE */}
        <div className='left'>

          <form className='entry-form' onSubmit={addEntry}>
            <select value={type} onChange={(e) => setType(e.target.value)}>
              <option value='income'>Income</option>
              <option value='expense'>Expense</option>
            </select>

            <input
              type='number'
              placeholder='Amount'
              required
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />

            <input
              type='date'
              required
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />

            <input
              type='text'
              placeholder='Note (optional)'
              value={note}
              onChange={(e) => setNote(e.target.value)}
            />

            <button type='submit'>Add</button>
          </form>

          <div className='logs'>
            <h2>Your Entries</h2>

            {logs.length === 0 && <p>No entries yet.</p>}

            {logs.map((item) => (
              <div className='log-card' key={item.$id}>
                <span className={`tag ${item.type}`}>{item.type}</span>
                <p>₹{item.amount}</p>
                <p>{item.date}</p>
                {item.note && <small>{item.note}</small>}
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT SIDE */}
        <div className='right'>
          <div className='chart-box'>
            <h2>Monthly Chart</h2>

            {chartData.length === 0 ? (
              <p>No data for chart.</p>
            ) : (
              <ResponsiveContainer width='100%' height={300}>
                <PieChart>
                  <Pie
                    data={[
                      { name: 'Income', value: chartData.reduce((a, b) => a + b.income, 0), fill: '#28a745' },
                      { name: 'Expense', value: chartData.reduce((a, b) => a + b.expense, 0), fill: '#dc3545' }
                    ]}
                    dataKey='value'
                    nameKey='name'
                    outerRadius={120}
                    label
                  />
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home
