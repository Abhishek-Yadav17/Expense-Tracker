import React from 'react'
import { useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import '../../../../styles/TransactionModal.scss'

const transactionSchema = z.object({
  type: z.enum(["income", "expense"]),
  category: z.string().min(1),
  amount: z.coerce.number().positive("Amount must be > 0"),
  date: z.string().min(1, "Date required"),
  note: z.string().optional(),
  newCategory: z.string().optional(),
})

const TransactionModal = ({ open, onClose, categories = [], onAdd }) => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    reset,
  } = useForm({
    resolver: zodResolver(transactionSchema),
    defaultValues: {
      type: "income",
      category: categories[0] || "General",
    },
  })

  const attachmentRef = React.useRef(null)

  if (!open) return null

  const onSubmit = async (data) => {
    const file = attachmentRef.current?.files?.[0] || null
    await onAdd(data, file)
    reset()
    onClose()
  }

  return (
    <div className='tm-overlay' onClick={onClose}>
      <div className='tm-modal' onClick={(e) => e.stopPropagation()}>
        <header className='tm-header'>
          <h3>Add Transaction</h3>
          <button className='tm-close' onClick={onClose}>✕</button>
        </header>

        <form className='tm-form' onSubmit={handleSubmit(onSubmit)}>
          <select {...register("type")}>
            <option value='income'>Income</option>
            <option value='expense'>Expense</option>
          </select>

          <select {...register("category")}>
            {categories.map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>

          <input
            type="number"
            placeholder="Amount"
            {...register("amount")}
          />
          <p className="error">{errors.amount?.message}</p>

          <input type="date" {...register("date")} />
          <p className="error">{errors.date?.message}</p>

          <input
            type="text"
            placeholder="Note (optional)"
            {...register("note")}
          />

          <label className="tm-file">
            <input type="file" ref={attachmentRef} />
            <span>Attach bill (optional)</span>
          </label>

          <div className="tm-actions">
            <button type="button" className="tm-cancel" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="tm-submit">
              Add
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default TransactionModal
