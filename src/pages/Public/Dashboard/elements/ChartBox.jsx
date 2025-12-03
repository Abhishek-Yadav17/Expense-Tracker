import React from 'react'
import '../../../../styles/ChartBox.scss'
import { PieChart, Pie, Tooltip, ResponsiveContainer } from 'recharts'

const ChartBox = ({ chartData }) => {
  const income = chartData.reduce((a, b) => a + b.income, 0)
  const expense = chartData.reduce((a, b) => a + b.expense, 0)

  return (
    <div className='chart-box'>
      <h2>Monthly Chart</h2>

      {chartData.length === 0 ? (
        <p>No data for chart.</p>
      ) : (
        <ResponsiveContainer width='100%' height={300}>
          <PieChart>
            <Pie
              data={[
                { name: 'Income', value: income, fill: '#28A745' },
                { name: 'Expense', value: expense, fill: '#DC3545' }
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
  )
}

export default ChartBox
