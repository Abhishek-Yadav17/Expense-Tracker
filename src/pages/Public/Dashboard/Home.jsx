import React, { useState, useEffect } from 'react'
import { databases, storage } from '../../../appwriteConfig'
import { ID, Query } from 'appwrite'
import { useAuth } from '../../../context/authContext'
import TransactionModal from './elements/TransactionModal'
import LogsList from './elements/LogsList'
import ChartBox from './elements/ChartBox'
import CategoryBox from './elements/CategoryBox'
import '../../../styles/Home.scss'

const DB_ID = import.meta.env.VITE_APPWRITE_DB_ID
const TABLE_ID = import.meta.env.VITE_APPWRITE_TABLE_ID
const BUCKET_ID = import.meta.env.VITE_APPWRITE_BUCKET_ID

const Home = () => {
  const { user } = useAuth()

  const [logs, setLogs] = useState([])
  const [chartData, setChartData] = useState([])
  const [categoryTotals, setCategoryTotals] = useState([])
  const [categories, setCategories] = useState([
    'General',
    'Salary',
    'Food',
    'Transport',
    'Shopping',
    'Bills'
  ])

  const [isModalOpen, setIsModalOpen] = useState(false)

  const getLogs = async () => {
    if (!user) return

    try {
      const res = await databases.listDocuments(DB_ID, TABLE_ID, [
        Query.equal('userId', user.$id),
        Query.orderDesc('$createdAt')
      ])

      setLogs(res.documents)
      generateChartData(res.documents)
      generateCategoryTotals(res.documents)
    } catch (err) {
      console.error(err)
    }
  }

  useEffect(() => {
    getLogs()
  }, [user])

  const handleAddFromModal = async (formData, file) => {
    if (!user) return

    try {
      if (formData.newCategory?.trim() && !categories.includes(formData.newCategory.trim())) {
        setCategories((prev) => [formData.newCategory.trim(), ...prev])
        formData.category = formData.newCategory.trim()
      }

      let uploadedFile = null
      if (file) {
        uploadedFile = await storage.createFile(BUCKET_ID, ID.unique(), file)
      }

      const fileId =
        uploadedFile?.$id ??
        uploadedFile?.fileId ??
        uploadedFile?.$fileId ??
        ''

      await databases.createDocument(DB_ID, TABLE_ID, ID.unique(), {
        userId: user.$id,
        type: formData.type,
        amount: Number(formData.amount),
        date: formData.date,
        note: formData.note,
        category: formData.category,
        attachmentId: fileId
      })

      await getLogs()
      setIsModalOpen(false)
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

  const generateCategoryTotals = (docs) => {
    const totals = {}


    docs.forEach((item) => {
      const cat = item.category || 'General'
      if (!totals[cat]) totals[cat] = 0
      totals[cat] += item.type === 'income' ? item.amount : item.amount
    })


    const arr = Object.keys(totals).map((k) => ({ name: k, value: totals[k] }))
    setCategoryTotals(arr)
  }

  return (
    <div className='home'>
      <div className="home-top">
        <h1>Finance Dashboard</h1>

        <button
          onClick={() => setIsModalOpen(true)}
        >
          + Add Transaction
        </button>
      </div>

      <TransactionModal
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        categories={categories}
        onAdd={handleAddFromModal}
      />

      <div className="content">
        <div className="content-top">
          <ChartBox chartData={chartData} />
          <CategoryBox totals={categoryTotals} />
        </div>
        <div className="content-bottom">
          <LogsList logs={logs} bucketId={BUCKET_ID} />
        </div>

      </div>
    </div>
  )
}

export default Home
