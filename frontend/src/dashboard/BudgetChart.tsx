import { motion } from 'framer-motion';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';
import { formatINR, formatINRCompact } from '@/lib/currency';
import axios from 'axios';
import { useState, useEffect } from 'react';

const COLORS = [
  'hsl(var(--chart-1))',
  'hsl(var(--chart-2))',
  'hsl(var(--chart-3))',
  'hsl(var(--chart-4))',
  'hsl(var(--chart-5))',
];

interface BudgetItem {
  category: string;
  amount: number;
}

interface BudgetDataResponse {
  budgetData: BudgetItem[];
  totalBudget: number;
}

const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    return (
      <div className="rounded-lg border border-border bg-card p-3 shadow-lg">
        <p className="text-sm font-medium text-foreground">{data.category}</p>
        <p className="text-xs text-muted-foreground mt-1">
          {formatINR(data.amount)}
        </p>
      </div>
    );
  }
  return null;
};

const CustomLegend = ({ payload }: any) => {
  return (
    <div className="flex flex-wrap justify-center gap-3 mt-4">
      {payload.map((entry: any, index: number) => (
        <div key={index} className="flex items-center gap-1.5">
          <div
            className="h-2.5 w-2.5 rounded-full"
            style={{ backgroundColor: entry.color }}
          />
          <span className="text-xs text-muted-foreground">{entry.value}</span>
        </div>
      ))}
    </div>
  );
};

export const BudgetChart = () => {
  const [budgetData, setBudgetData] = useState<BudgetItem[]>([]);
  const [totalBudget, setTotalBudget] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  
  useEffect(() => {
    const fetchBudgetData = async () => {
      try {
        const token = localStorage.getItem('wm_token');
        if (!token) {
          throw new Error('No authentication token found');
        }
        
        const response = await axios.get('http://localhost:5000/api/financial/budget-data', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        
        const data: BudgetDataResponse = response.data;
        setBudgetData(data.budgetData);
        setTotalBudget(data.totalBudget);
        setError(null);
      } catch (err) {
        console.error('Error fetching budget data:', err);
        setError('Failed to load budget data');
        // Set default values
        setBudgetData([]);
        setTotalBudget(0);
      } finally {
        setLoading(false);
      }
    };
    
    fetchBudgetData();
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
      className="rounded-xl border border-border bg-card p-5"
    >
      <div className="mb-4">
        <h3 className="font-display text-sm font-semibold text-muted-foreground">Monthly Budget</h3>
        <p className="mt-1 font-display text-2xl font-bold text-foreground">
          {formatINRCompact(totalBudget)}
        </p>
      </div>
      
      <div className="h-64">
        {loading ? (
          <div className="flex items-center justify-center h-full text-center text-muted-foreground">
            Loading budget data...
          </div>
        ) : error ? (
          <div className="flex items-center justify-center h-full text-center text-muted-foreground">
            {error}
          </div>
        ) : budgetData.length > 0 ? (
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={budgetData}
                cx="50%"
                cy="45%"
                innerRadius={50}
                outerRadius={80}
                paddingAngle={3}
                dataKey="amount"
                nameKey="category"
              >
                {budgetData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
              <Legend content={<CustomLegend />} />
            </PieChart>
          </ResponsiveContainer>
        ) : (
          <div className="flex items-center justify-center h-full text-center text-muted-foreground">
            No budget data available. Add expense transactions to see your budget breakdown.
          </div>
        )}
      </div>
    </motion.div>
  );
};
