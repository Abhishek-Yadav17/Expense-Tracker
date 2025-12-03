import React from 'react'
import '../../../../styles/CategoryBox.scss'

const CategoryBox = ({ totals }) => {
  return (
    <div className='category-box'>
      <h2>Category Breakdown</h2>

      {totals.length === 0 ? (
        <p>No category data.</p>
      ) : (
        <div className='category-list'>
          {totals.map((c) => (
            <div className='category-row' key={c.name}>
              <span>{c.name}</span>
              <span>₹{c.value}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default CategoryBox
