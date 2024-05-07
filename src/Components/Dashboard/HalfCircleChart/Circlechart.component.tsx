// File: HalfCircleChart.tsx

import React from 'react';
import { PieChart, Pie, ResponsiveContainer, Cell, Tooltip } from 'recharts';

interface HalfCircleChartProps {
  percentage: number; // Percentage value from 0 to 100
}

const HalfCircleChart: React.FC<HalfCircleChartProps> = ({ percentage }) => {
  const data = [
    { name: 'Percentage', value: percentage },
    { name: 'Remaining', value: 100 - percentage },
  ];

  const COLORS = ['#0088FE', '#e0e0e0']; // You can customize colors

  return (
   
    <ResponsiveContainer width="100%" minHeight="200px">
      <PieChart width={700} height={700}>
        <Pie
          data={data}
          cx="50%"
          cy="60%"
          startAngle={180}
          endAngle={0}
          innerRadius={60}
          outerRadius={80}
          fill="#8884d8"
          dataKey="value"
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index]} />
          ))}
        </Pie>
        <Tooltip formatter={(value) => `${value}%`} />
       
      </PieChart>
     
    </ResponsiveContainer>
 
  );
};

export default HalfCircleChart;
