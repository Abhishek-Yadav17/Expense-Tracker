import React from 'react'
import '../../../../styles/LogsList.scss'
import { storage } from '../../../../appwriteConfig'

const LogsList = ({ logs, bucketId, onDelete }) => {
  return (
    <div className='logs-table-wrapper'>
      <h2>Transaction History</h2>

      {logs.length === 0 ? (
        <p>No entries yet.</p>
      ) : (
        <div className='table'>
          <div className='table-header'>
            <p>Name</p>
            <p>Date</p>
            <p>Type</p>
            <p>Category</p>
            <p>Amount</p>
            <p>Bill</p>
            <p>Actions</p>
          </div>

          {logs.map((item) => (
            <div className='table-row' key={item.$id}>
              <p>{item.note || '—'}</p>
              <p>{new Date(item.date).toLocaleDateString('en-GB', {
                day: '2-digit',
                month: 'short',
                year: 'numeric'
              })}</p>
              <p className={`type ${item.type}`}>{item.type}</p>
              <p>{item.category || 'General'}</p>
              <p className='amount'>₹{item.amount}</p>

              <p>
                {item.attachmentId ? (
                  <img
                    className='bill-img'
                    src={storage.getFileView(bucketId, item.attachmentId)}
                    alt='bill'
                  />
                ) : (
                  '—'
                )}
              </p>
              <p className='actions'>
                <i className='ri-delete-bin-line' onClick={() => onDelete(item.$id)}></i>
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default LogsList
