import React from 'react'
import '../../../../styles/ChartBox.scss'
import {
  BarChart,
  Bar,
  XAxis,
  Tooltip,
  ResponsiveContainer
} from 'recharts'

const ChartBox = ({ chartData }) => {

  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
  const formatted = chartData.map(m => ({
    ...m,
    mlabel: months[Number(m.month.slice(5)) - 1] || m.month
  }))

  return (
    <div className='chart-box'>
      <div className='chart-top'>
        <h2>Money Flow</h2>
      </div>

      {formatted.length === 0 ? (
        <p>No data for chart.</p>
      ) : (
        <ResponsiveContainer width='100%' height={320}>
          <BarChart data={formatted} barGap={4}>
            <XAxis
              dataKey='mlabel'
              tick={{ fontSize: 12 }}
              axisLine={false}
              tickLine={false}
            />

            <Bar dataKey='space' stackId='a' fill='#e8f0ef' radius={[8, 8, 0, 0]} />
            <Bar dataKey='income' stackId='a' fill='#1C6758' radius={[8, 8, 0, 0]} />
            <Bar dataKey='expense' stackId='a' fill='#A3D421' radius={[8, 8, 0, 0]} />

            <Tooltip cursor={{ opacity: 0.2 }} />
          </BarChart>
        </ResponsiveContainer>
      )}
    </div>
  )
}

export default ChartBox
