import { motion } from 'framer-motion';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { Sparkles } from 'lucide-react';
import { formatINRCompact, formatINR } from '@/lib/currency';
import { useFinancialData } from '@/hooks/useFinancialData';

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="rounded-lg border border-border bg-card p-3 shadow-lg">
        <p className="text-xs font-medium text-muted-foreground mb-2">{label}</p>
        {payload.map((entry: any, index: number) => (
          <div key={index} className="flex items-center gap-2">
            <div
              className="h-2 w-2 rounded-full"
              style={{ backgroundColor: entry.color }}
            />
            <span className="text-xs text-muted-foreground capitalize">{entry.name}:</span>
            <span className="text-xs font-semibold text-foreground">
              {formatINR(entry.value)}
            </span>
          </div>
        ))}
      </div>
    );
  }
  return null;
};

export const ForecastChart = () => {
  const { financialData, loading } = useFinancialData();
  
  const wealthForecast = financialData?.wealthForecast || [];
  const projectedValue = wealthForecast.length > 0 ? wealthForecast[wealthForecast.length - 1].projected : 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.4 }}
      className="rounded-xl border border-border bg-card p-5"
    >
      <div className="flex items-start justify-between mb-4">
        <div>
          <h3 className="font-display text-sm font-semibold text-muted-foreground">
            Wealth Forecast
          </h3>
          <p className="mt-1 font-display text-xl font-bold text-foreground">
            {formatINRCompact(projectedValue)}
          </p>
          <p className="text-xs text-muted-foreground">Projected by 2028</p>
        </div>
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-accent/20">
          <Sparkles className="h-4 w-4 text-accent" />
        </div>
      </div>
      
      <div className="h-48">
        {wealthForecast.length > 0 ? (
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={wealthForecast} margin={{ top: 5, right: 5, left: 0, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis 
                dataKey="year" 
                axisLine={false} 
                tickLine={false}
                tick={{ fontSize: 11, fill: 'hsl(var(--muted-foreground))' }}
              />
              <YAxis 
                axisLine={false} 
                tickLine={false}
                tick={{ fontSize: 11, fill: 'hsl(var(--muted-foreground))' }}
                tickFormatter={(value) => formatINRCompact(value)}
              />
              <Tooltip content={<CustomTooltip />} />
              <Line
                type="monotone"
                dataKey="projected"
                name="Projected"
                stroke="hsl(var(--primary))"
                strokeWidth={2}
                dot={{ fill: 'hsl(var(--primary))', strokeWidth: 0, r: 3 }}
              />
              <Line
                type="monotone"
                dataKey="conservative"
                name="Conservative"
                stroke="hsl(var(--muted-foreground))"
                strokeWidth={2}
                strokeDasharray="5 5"
                dot={{ fill: 'hsl(var(--muted-foreground))', strokeWidth: 0, r: 3 }}
              />
            </LineChart>
          </ResponsiveContainer>
        ) : (
          <div className="flex items-center justify-center h-full text-center text-muted-foreground">
            {loading ? 'Loading forecast...' : 'Add financial data to see projections'}
          </div>
        )}
      </div>
    </motion.div>
  );
};
