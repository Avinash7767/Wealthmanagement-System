import { motion } from 'framer-motion';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, AreaChart, Area } from 'recharts';
import { TrendingUp, Briefcase, Plus, ArrowUpRight, ArrowDownRight, BarChart3 } from 'lucide-react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { Button } from '@/components/ui/button';
import { accountsSummary } from '@/lib/mock-data';
import { formatINR, formatINRCompact } from '@/lib/currency';

const investments = accountsSummary.assets.investments;
const totalInvestments = Object.values(investments).reduce((a, b) => a + b, 0);

const portfolioData = [
  { name: 'Stocks', value: investments.stocks, color: 'hsl(var(--chart-1))', change: 15.2 },
  { name: 'Mutual Funds', value: investments.mutualFunds, color: 'hsl(var(--chart-2))', change: 12.8 },
  { name: 'Fixed Deposits', value: investments.fixedDeposits, color: 'hsl(var(--chart-3))', change: 7.0 },
  { name: 'PPF', value: investments.ppf, color: 'hsl(var(--chart-4))', change: 7.1 },
];

const performanceData = [
  { month: 'Jul', value: 2650000 },
  { month: 'Aug', value: 2720000 },
  { month: 'Sep', value: 2850000 },
  { month: 'Oct', value: 2780000 },
  { month: 'Nov', value: 2920000 },
  { month: 'Dec', value: 2970000 },
];

const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="rounded-lg border border-border bg-card p-3 shadow-lg">
        {payload.map((entry: any, index: number) => (
          <div key={index} className="flex items-center gap-2">
            <span className="text-xs text-muted-foreground">Value:</span>
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

const Investing = () => {
  const overallChange = 12.4;

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
              <TrendingUp className="h-6 w-6 text-primary" />
              Investments
            </h1>
            <p className="mt-1 text-muted-foreground">
              Track and manage your investment portfolio
            </p>
          </motion.div>

          <Button className="gap-2 gradient-wealth text-white">
            <Plus className="h-4 w-4" />
            Add Investment
          </Button>
        </div>

        {/* Portfolio Summary */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="rounded-xl gradient-wealth p-6 text-white"
        >
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <p className="text-sm opacity-80">Total Portfolio Value</p>
              <p className="font-display text-3xl font-bold mt-1">
                {formatINRCompact(totalInvestments)}
              </p>
              <p className="text-sm opacity-80 mt-1">{formatINR(totalInvestments)}</p>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-right">
                <p className="text-sm opacity-80">Overall Return</p>
                <div className="flex items-center gap-1 justify-end">
                  <ArrowUpRight className="h-4 w-4" />
                  <span className="font-display text-xl font-bold">+{overallChange}%</span>
                </div>
              </div>
              <div className="text-right">
                <p className="text-sm opacity-80">This Month</p>
                <div className="flex items-center gap-1 justify-end">
                  <ArrowUpRight className="h-4 w-4" />
                  <span className="font-display text-xl font-bold">+{formatINRCompact(50000)}</span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Charts Row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Portfolio Performance */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="rounded-xl border border-border bg-card p-6"
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-display font-semibold text-foreground">Portfolio Performance</h3>
              <div className="flex items-center gap-1 text-sm text-success">
                <ArrowUpRight className="h-4 w-4" />
                +12.1% YTD
              </div>
            </div>
            
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={performanceData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                  <defs>
                    <linearGradient id="performanceGradient" x1="0" y1="0" x2="0" y2="1">
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
                    dataKey="value"
                    stroke="hsl(var(--primary))"
                    strokeWidth={2}
                    fill="url(#performanceGradient)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </motion.div>

          {/* Asset Allocation */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25 }}
            className="rounded-xl border border-border bg-card p-6"
          >
            <h3 className="font-display font-semibold text-foreground mb-4">Asset Allocation</h3>
            
            <div className="h-52">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={portfolioData}
                    cx="50%"
                    cy="50%"
                    innerRadius={50}
                    outerRadius={80}
                    paddingAngle={3}
                    dataKey="value"
                  >
                    {portfolioData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
            </div>

            <div className="grid grid-cols-2 gap-2 mt-2">
              {portfolioData.map((item) => (
                <div key={item.name} className="flex items-center justify-between p-2 rounded-lg bg-muted/50">
                  <div className="flex items-center gap-2">
                    <div className="h-3 w-3 rounded-full" style={{ backgroundColor: item.color }} />
                    <span className="text-xs text-muted-foreground">{item.name}</span>
                  </div>
                  <span className="text-xs font-medium text-foreground">
                    {((item.value / totalInvestments) * 100).toFixed(0)}%
                  </span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Holdings List */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="rounded-xl border border-border bg-card p-6"
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-display font-semibold text-foreground flex items-center gap-2">
              <Briefcase className="h-5 w-5 text-primary" />
              Your Holdings
            </h3>
            <Button variant="ghost" size="sm" className="gap-1">
              <BarChart3 className="h-4 w-4" />
              View Details
            </Button>
          </div>
          
          <div className="space-y-3">
            {portfolioData.map((holding, index) => (
              <motion.div
                key={holding.name}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.35 + index * 0.05 }}
                className="flex items-center justify-between p-4 rounded-lg bg-muted/50 hover:bg-muted transition-colors"
              >
                <div className="flex items-center gap-4">
                  <div
                    className="h-10 w-10 rounded-lg flex items-center justify-center text-white font-bold"
                    style={{ backgroundColor: holding.color }}
                  >
                    {holding.name.charAt(0)}
                  </div>
                  <div>
                    <p className="font-medium text-foreground">{holding.name}</p>
                    <p className="text-sm text-muted-foreground">
                      {((holding.value / totalInvestments) * 100).toFixed(1)}% of portfolio
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-medium text-foreground">{formatINRCompact(holding.value)}</p>
                  <div className={`flex items-center gap-1 text-sm ${
                    holding.change >= 0 ? 'text-success' : 'text-destructive'
                  }`}>
                    {holding.change >= 0 ? (
                      <ArrowUpRight className="h-3 w-3" />
                    ) : (
                      <ArrowDownRight className="h-3 w-3" />
                    )}
                    {holding.change >= 0 ? '+' : ''}{holding.change}%
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </DashboardLayout>
  );
};

export default Investing;
