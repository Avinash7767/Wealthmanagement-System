import { motion } from 'framer-motion';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Area, AreaChart } from 'recharts';
import { TrendingUp } from 'lucide-react';
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

export const NetWorthChart = () => {
  const { financialData, loading } = useFinancialData();
  
  // Use empty array as default if no data
  const netWorthHistory = financialData?.netWorthHistory || [];
  
  // Calculate latest and previous net worth
  let latestNetWorth = 0;
  let change = 0;
  
  if (netWorthHistory.length > 0) {
    latestNetWorth = netWorthHistory[netWorthHistory.length - 1].netWorth;
    if (netWorthHistory.length > 1) {
      const previousNetWorth = netWorthHistory[netWorthHistory.length - 2].netWorth;
      change = previousNetWorth !== 0 ? ((latestNetWorth - previousNetWorth) / previousNetWorth) * 100 : 0;
    }
  }
  
  // If no data, use current net worth from financial data
  if (netWorthHistory.length === 0 && financialData) {
    latestNetWorth = financialData.netWorth || 0;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1 }}
      className="rounded-xl border border-border bg-card p-5"
    >
      <div className="flex items-start justify-between mb-4">
        <div>
          <h3 className="font-display text-sm font-semibold text-muted-foreground">Net Worth Trend</h3>
          <p className="mt-1 font-display text-2xl font-bold text-foreground">
            {formatINRCompact(latestNetWorth)}
          </p>
        </div>
        <div className={`flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${
          change >= 0 
            ? 'bg-success/10 text-success' 
            : 'bg-destructive/10 text-destructive'
        }`}>
          <TrendingUp className="h-3 w-3" />
          {change >= 0 ? '+' : ''}{change.toFixed(1)}%
        </div>
      </div>
      
      <div className="h-64">
        {netWorthHistory.length > 0 ? (
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={netWorthHistory} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
              <defs>
                <linearGradient id="netWorthGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis 
                dataKey="month" 
                axisLine={false} 
                tickLine={false}
                tick={{ fontSize: 12, fill: 'hsl(var(--muted-foreground))' }}
              />
              <YAxis 
                axisLine={false} 
                tickLine={false}
                tick={{ fontSize: 12, fill: 'hsl(var(--muted-foreground))' }}
                tickFormatter={(value) => formatINRCompact(value)}
              />
              <Tooltip content={<CustomTooltip />} />
              <Area
                type="monotone"
                dataKey="netWorth"
                name="Net Worth"
                stroke="hsl(var(--primary))"
                strokeWidth={2}
                fill="url(#netWorthGradient)"
              />
            </AreaChart>
          </ResponsiveContainer>
        ) : (
          <div className="flex items-center justify-center h-full text-center text-muted-foreground">
            {loading ? 'Loading data...' : 'Add financial data to see trends'}
          </div>
        )}
      </div>
    </motion.div>
  );
};
