import React from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

const AnalyticsChart = ({ data }) => {
  // Format data for the chart
  const chartData = data.map((log, index) => ({
    name: `Q${index + 1}`,
    latency: log.latencyMs,
    query: log.userQuery
  }));

  if (chartData.length === 0) {
    return <div className="flex items-center justify-center h-full text-gray-400">No data yet</div>;
  }

  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart data={chartData}>
        <XAxis dataKey="name" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
        <YAxis stroke="#888888" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `${value}ms`} />
        <Tooltip 
            contentStyle={{ background: '#333', border: 'none', borderRadius: '8px', color: '#fff' }}
            cursor={{ fill: 'transparent' }}
        />
        <Bar dataKey="latency" fill="#3b82f6" radius={[4, 4, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default AnalyticsChart;