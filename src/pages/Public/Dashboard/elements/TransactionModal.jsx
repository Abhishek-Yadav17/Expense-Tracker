import React, { useState } from 'react'
import '../../../../styles/TransactionModal.scss'

const TransactionModal = ({ open, onClose, categories = [], onAdd }) => {
  const [type, setType] = useState('income')
  const [category, setCategory] = useState(categories[0] || 'General')
  const [amount, setAmount] = useState('')
  const [date, setDate] = useState('')
  const [note, setNote] = useState('')
  const [attachment, setAttachment] = useState(null)
  const [newCategory, setNewCategory] = useState('')

  if (!open) return null

  const submit = async (e) => {
    e.preventDefault()
    await onAdd({
      type,
      category,
      amount,
      date,
      note,
      newCategory,
    }, attachment)
  }

  return (
    <div className='tm-overlay' onClick={onClose}>
      <div className='tm-modal' onClick={(e) => e.stopPropagation()}>
        <header className='tm-header'>
          <h3>Add Transaction</h3>
          <button className='tm-close' onClick={onClose}>✕</button>
        </header>

        <form className='tm-form' onSubmit={submit}>
          <select value={type} onChange={(e) => setType(e.target.value)}>
            <option value='income'>Income</option>
            <option value='expense'>Expense</option>
          </select>

          <select value={category} onChange={(e) => setCategory(e.target.value)}>
            {categories.map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>

          <div className='tm-row'>
            <input
              type='text'
              placeholder='Add category (optional)'
              value={newCategory}
              onChange={(e) => setNewCategory(e.target.value)}
            />
            <button type='button' onClick={() => {
              const t = newCategory.trim()
              if (!t) return
              setCategory(t)
              setNewCategory('')
            }}>Use</button>
          </div>

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

          <label className='tm-file'>
            <input
              type='file'
              onChange={(e) => setAttachment(e.target.files?.[0] || null)}
            />
            <span>{attachment ? attachment.name : 'Attach bill (optional)'}</span>
          </label>

          <div className='tm-actions'>
            <button type='button' className='tm-cancel' onClick={onClose}>
              Cancel
            </button>
            <button type='submit' className='tm-submit'>
              Add
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default TransactionModal
