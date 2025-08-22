import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';
import Icon from '../../../components/AppIcon';

const PerformanceChart = ({ 
  type = 'bar', 
  title, 
  data = [], 
  dataKey, 
  xAxisKey = 'name',
  color = '#2563EB',
  className = '' 
}) => {
  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload?.length) {
      return (
        <div className="bg-popover border border-border rounded-lg p-3 elevation-2">
          <p className="font-medium text-popover-foreground">{label}</p>
          <p className="text-sm text-muted-foreground">
            {`${payload?.[0]?.name}: ${payload?.[0]?.value}`}
          </p>
        </div>
      );
    }
    return null;
  };

  if (data?.length === 0) {
    return (
      <div className={`bg-card border border-border rounded-lg ${className}`}>
        <div className="p-6 border-b border-border">
          <h3 className="text-lg font-semibold text-foreground">{title}</h3>
        </div>
        <div className="p-6">
          <div className="h-64 flex items-center justify-center">
            <div className="text-center">
              <Icon name="BarChart3" size={32} className="text-muted-foreground mx-auto mb-2" />
              <p className="text-muted-foreground">No data available</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`bg-card border border-border rounded-lg ${className}`}>
      <div className="p-6 border-b border-border">
        <h3 className="text-lg font-semibold text-foreground">{title}</h3>
      </div>
      
      <div className="p-6">
        <div className="h-64" aria-label={`${title} Chart`}>
          <ResponsiveContainer width="100%" height="100%">
            {type === 'bar' ? (
              <BarChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
                <XAxis 
                  dataKey={xAxisKey} 
                  stroke="var(--color-muted-foreground)"
                  fontSize={12}
                />
                <YAxis 
                  stroke="var(--color-muted-foreground)"
                  fontSize={12}
                />
                <Tooltip content={<CustomTooltip />} />
                <Bar dataKey={dataKey} fill={color} radius={[4, 4, 0, 0]} />
              </BarChart>
            ) : (
              <LineChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
                <XAxis 
                  dataKey={xAxisKey} 
                  stroke="var(--color-muted-foreground)"
                  fontSize={12}
                />
                <YAxis 
                  stroke="var(--color-muted-foreground)"
                  fontSize={12}
                />
                <Tooltip content={<CustomTooltip />} />
                <Line 
                  type="monotone" 
                  dataKey={dataKey} 
                  stroke={color} 
                  strokeWidth={2}
                  dot={{ fill: color, strokeWidth: 2, r: 4 }}
                  activeDot={{ r: 6, stroke: color, strokeWidth: 2 }}
                />
              </LineChart>
            )}
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default PerformanceChart;