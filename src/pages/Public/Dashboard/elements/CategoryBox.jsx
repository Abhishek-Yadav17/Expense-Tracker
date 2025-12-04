import React from 'react'
import '../../../../styles/CategoryBox.scss'

const CategoryBox = ({ totals }) => {

  const categoryIcons = {
    General: 'ri-folder-line',
    Salary: 'ri-wallet-3-line',
    Food: 'ri-restaurant-line',
    Transport: 'ri-taxi-line',
    Shopping: 'ri-shopping-bag-3-line',
    Bills: 'ri-receipt-line'
  }

  const colors = [
    '#FFE5EC', '#E8E7FF', '#FFF6C2', '#D7F7FF', '#E4FFD9', '#FFEED1'
  ]

  return (
    <div className='category-box'>
      <h2>Category Breakdown</h2>

      {totals.length === 0 ? (
        <p>No category data.</p>
      ) : (
        <div className='category-list'>
          {totals.map((c, i) => (
            <div className='category-row' key={c.name}>
              <div className='left'>
                <div
                  className='icon-wrap'
                  style={{ background: colors[i % colors.length] }}
                >
                  <i className={categoryIcons[c.name] || 'ri-folder-line'}></i>
                </div>
                <span className='name'>{c.name}</span>
              </div>

              <span className='amount'>₹{c.value}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default CategoryBox
