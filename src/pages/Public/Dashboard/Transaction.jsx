import React, { useEffect, useState } from 'react'
import LogsList from './elements/LogsList'
import { databases } from '../../../appwriteConfig'
import { Query } from 'appwrite'
import { useAuth } from '../../../context/authContext'

const DB_ID = import.meta.env.VITE_APPWRITE_DB_ID
const TABLE_ID = import.meta.env.VITE_APPWRITE_TABLE_ID
const BUCKET_ID = import.meta.env.VITE_APPWRITE_BUCKET_ID

const Transaction = () => {
  const { user } = useAuth()
  const [logs, setLogs] = useState([])

  const getLogs = async () => {
    if (!user) return

    try {
      const res = await databases.listDocuments(DB_ID, TABLE_ID, [
        Query.equal('userId', user.$id),
        Query.orderDesc('$createdAt')
      ])
      setLogs(res.documents)
    } catch (err) {
      console.error(err)
    }
  }

  useEffect(() => {
    getLogs()
  }, [user])

  const handleDelete = async (id) => {
    try {
      await databases.deleteDocument(DB_ID, TABLE_ID, id)
      getLogs()
    } catch (err) {
      console.error(err)
    }
  }


  return (
    <div className='transactions-page'>
      <LogsList logs={logs} bucketId={BUCKET_ID} onDelete={handleDelete} />
    </div>
  )
}

export default Transaction
