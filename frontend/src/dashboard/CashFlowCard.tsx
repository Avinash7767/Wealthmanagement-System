import { motion } from 'framer-motion';
import { ArrowUpRight, ArrowDownRight, Wallet } from 'lucide-react';
import { formatINR, formatINRCompact } from '@/lib/currency';
import { useFinancialData } from '@/hooks/useFinancialData';

export const CashFlowCard = () => {
  const { financialData, loading } = useFinancialData();
  
  const monthlyStats = financialData?.monthlyStats || {
    income: 0,
    expenses: 0,
    savings: 0,
    savingsRate: 0,
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
      className="rounded-xl border border-border bg-card p-5"
    >
      <h3 className="font-display text-sm font-semibold text-muted-foreground mb-4">
        Monthly Cash Flow
      </h3>
      
      <div className="space-y-4">
        {/* Income */}
        <div className="flex items-center justify-between p-3 rounded-lg bg-success/5 border border-success/20">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-success/10">
              <ArrowUpRight className="h-5 w-5 text-success" />
            </div>
            <div>
              <p className="text-sm font-medium text-foreground">Income</p>
              <p className="text-xs text-muted-foreground">Monthly earnings</p>
            </div>
          </div>
          <p className="font-display text-lg font-bold text-success">
            {formatINRCompact(monthlyStats.income)}
          </p>
        </div>

        {/* Expenses */}
        <div className="flex items-center justify-between p-3 rounded-lg bg-destructive/5 border border-destructive/20">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-destructive/10">
              <ArrowDownRight className="h-5 w-5 text-destructive" />
            </div>
            <div>
              <p className="text-sm font-medium text-foreground">Expenses</p>
              <p className="text-xs text-muted-foreground">Monthly spending</p>
            </div>
          </div>
          <p className="font-display text-lg font-bold text-destructive">
            {formatINRCompact(monthlyStats.expenses)}
          </p>
        </div>

        {/* Savings */}
        <div className="flex items-center justify-between p-3 rounded-lg bg-primary/5 border border-primary/20">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
              <Wallet className="h-5 w-5 text-primary" />
            </div>
            <div>
              <p className="text-sm font-medium text-foreground">Savings</p>
              <p className="text-xs text-muted-foreground">{monthlyStats.savingsRate.toFixed(1)}% savings rate</p>
            </div>
          </div>
          <p className="font-display text-lg font-bold text-primary">
            {formatINRCompact(monthlyStats.savings)}
          </p>
        </div>
      </div>
      
      {loading && (
        <div className="mt-4 text-center text-xs text-muted-foreground">
          Loading financial data...
        </div>
      )}
      {!loading && monthlyStats.income === 0 && monthlyStats.expenses === 0 && (
        <div className="mt-4 text-center text-xs text-muted-foreground">
          Add your income and expenses to see insights
        </div>
      )}
    </motion.div>
  );
};
