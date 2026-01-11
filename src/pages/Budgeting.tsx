import { motion } from 'framer-motion';
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { PiggyBank, TrendingUp, Plus, Edit2 } from 'lucide-react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { budgetData, monthlyStats } from '@/lib/mock-data';
import { formatINR, formatINRCompact } from '@/lib/currency';

const COLORS = [
  'hsl(var(--chart-1))',
  'hsl(var(--chart-2))',
  'hsl(var(--chart-3))',
  'hsl(var(--chart-4))',
  'hsl(var(--chart-5))',
];

const monthlyTrend = [
  { month: 'Jul', income: 165000, expenses: 85000 },
  { month: 'Aug', income: 170000, expenses: 92000 },
  { month: 'Sep', income: 175000, expenses: 88000 },
  { month: 'Oct', income: 172000, expenses: 95000 },
  { month: 'Nov', income: 180000, expenses: 90000 },
  { month: 'Dec', income: 180000, expenses: 98000 },
];

const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="rounded-lg border border-border bg-card p-3 shadow-lg">
        {payload.map((entry: any, index: number) => (
          <div key={index} className="flex items-center gap-2">
            <div
              className="h-2 w-2 rounded-full"
              style={{ backgroundColor: entry.fill || entry.color }}
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

const Budgeting = () => {
  const totalBudget = budgetData.reduce((sum, item) => sum + item.amount, 0);
  const savingsAmount = budgetData.find(b => b.category === 'Savings')?.amount || 0;
  const savingsPercentage = (savingsAmount / totalBudget) * 100;

  return (
    <DashboardLayout showSidebar={false}>
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h1 className="font-display text-2xl font-bold text-foreground flex items-center gap-2">
              <PiggyBank className="h-6 w-6 text-primary" />
              Budgeting
            </h1>
            <p className="mt-1 text-muted-foreground">
              Track your spending and manage your budget
            </p>
          </motion.div>

          <Button className="gap-2 gradient-wealth text-white">
            <Plus className="h-4 w-4" />
            Set Budget
          </Button>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="rounded-xl border border-border bg-card p-5"
          >
            <p className="text-sm text-muted-foreground">Monthly Income</p>
            <p className="mt-1 font-display text-2xl font-bold text-success">
              {formatINRCompact(monthlyStats.income)}
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            className="rounded-xl border border-border bg-card p-5"
          >
            <p className="text-sm text-muted-foreground">Monthly Expenses</p>
            <p className="mt-1 font-display text-2xl font-bold text-destructive">
              {formatINRCompact(monthlyStats.expenses)}
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="rounded-xl border border-border bg-card p-5"
          >
            <p className="text-sm text-muted-foreground">Monthly Savings</p>
            <p className="mt-1 font-display text-2xl font-bold text-primary">
              {formatINRCompact(monthlyStats.savings)}
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25 }}
            className="rounded-xl gradient-wealth p-5 text-white"
          >
            <p className="text-sm opacity-80">Savings Rate</p>
            <p className="mt-1 font-display text-2xl font-bold">
              {monthlyStats.savingsRate}%
            </p>
          </motion.div>
        </div>

        {/* Charts Row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Budget Breakdown */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="rounded-xl border border-border bg-card p-6"
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-display font-semibold text-foreground">Budget Allocation</h3>
              <Button variant="ghost" size="sm" className="gap-1">
                <Edit2 className="h-3 w-3" />
                Edit
              </Button>
            </div>
            
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={budgetData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={90}
                    paddingAngle={3}
                    dataKey="amount"
                    nameKey="category"
                  >
                    {budgetData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip content={<CustomTooltip />} />
                </PieChart>
              </ResponsiveContainer>
            </div>

            {/* Legend */}
            <div className="grid grid-cols-2 gap-3 mt-4">
              {budgetData.map((item, index) => (
                <div key={item.category} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div
                      className="h-3 w-3 rounded-full"
                      style={{ backgroundColor: COLORS[index] }}
                    />
                    <span className="text-sm text-muted-foreground">{item.category}</span>
                  </div>
                  <span className="text-sm font-medium text-foreground">
                    {formatINRCompact(item.amount)}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Income vs Expenses Trend */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35 }}
            className="rounded-xl border border-border bg-card p-6"
          >
            <h3 className="font-display font-semibold text-foreground mb-4">
              Income vs Expenses
            </h3>
            
            <div className="h-72">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={monthlyTrend} margin={{ top: 5, right: 10, left: 0, bottom: 5 }}>
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
                  <Legend 
                    wrapperStyle={{ paddingTop: '20px' }}
                    formatter={(value) => <span className="text-xs text-muted-foreground capitalize">{value}</span>}
                  />
                  <Bar dataKey="income" name="income" fill="hsl(var(--success))" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="expenses" name="expenses" fill="hsl(var(--destructive))" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </motion.div>
        </div>

        {/* Category Budgets */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="rounded-xl border border-border bg-card p-6"
        >
          <h3 className="font-display font-semibold text-foreground mb-4">
            Budget Progress
          </h3>
          
          <div className="space-y-4">
            {budgetData.map((item, index) => {
              const spent = item.amount * (0.5 + Math.random() * 0.4); // Simulated spent amount
              const percentage = (spent / item.amount) * 100;
              const isOverBudget = percentage > 90;
              
              return (
                <div key={item.category} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div
                        className="h-3 w-3 rounded-full"
                        style={{ backgroundColor: COLORS[index] }}
                      />
                      <span className="text-sm font-medium text-foreground">{item.category}</span>
                    </div>
                    <div className="text-right">
                      <span className={`text-sm font-medium ${isOverBudget ? 'text-destructive' : 'text-foreground'}`}>
                        {formatINRCompact(spent)}
                      </span>
                      <span className="text-sm text-muted-foreground"> / {formatINRCompact(item.amount)}</span>
                    </div>
                  </div>
                  <Progress 
                    value={Math.min(percentage, 100)} 
                    className={`h-2 ${isOverBudget ? '[&>div]:bg-destructive' : ''}`}
                  />
                </div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </DashboardLayout>
  );
};

export default Budgeting;
