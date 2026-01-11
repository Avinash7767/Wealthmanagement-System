import { motion } from 'framer-motion';
import { Briefcase, TrendingUp, ArrowUpRight } from 'lucide-react';
import { formatINRCompact, formatINR } from '@/lib/currency';
import { useFinancialData } from '@/hooks/useFinancialData';

export const PortfolioCard = () => {
  const { financialData, loading } = useFinancialData();
  
  interface Investments {
    stocks: number;
    mutualFunds: number;
    fixedDeposits: number;
    ppf: number;
  }
  
  const investments: Investments = financialData?.assets?.investments || {
    stocks: 0,
    mutualFunds: 0,
    fixedDeposits: 0,
    ppf: 0,
  };
  
  const totalInvestments = Object.values(investments).reduce((a, b) => a + b, 0);

  const portfolioItems = [
    { name: 'Stocks', value: investments.stocks, allocation: totalInvestments > 0 ? (investments.stocks / totalInvestments) * 100 : 0, color: 'bg-chart-1' },
    { name: 'Mutual Funds', value: investments.mutualFunds, allocation: totalInvestments > 0 ? (investments.mutualFunds / totalInvestments) * 100 : 0, color: 'bg-chart-2' },
    { name: 'Fixed Deposits', value: investments.fixedDeposits, allocation: totalInvestments > 0 ? (investments.fixedDeposits / totalInvestments) * 100 : 0, color: 'bg-chart-3' },
    { name: 'PPF', value: investments.ppf, allocation: totalInvestments > 0 ? (investments.ppf / totalInvestments) * 100 : 0, color: 'bg-chart-4' },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.35 }}
      className="rounded-xl border border-border bg-card p-5"
    >
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10">
            <Briefcase className="h-4 w-4 text-primary" />
          </div>
          <div>
            <h3 className="font-display text-sm font-semibold text-foreground">Portfolio</h3>
            <p className="text-xs text-muted-foreground">Investment breakdown</p>
          </div>
        </div>
        <div className="flex items-center gap-1 text-xs font-medium text-success">
          <ArrowUpRight className="h-3 w-3" />
          {totalInvestments > 0 ? '+12.4%' : '0%'}
        </div>
      </div>

      <div className="mb-4">
        <p className="font-display text-2xl font-bold text-foreground">
          {formatINRCompact(totalInvestments)}
        </p>
        <p className="text-xs text-muted-foreground">{formatINR(totalInvestments)}</p>
      </div>

      {totalInvestments > 0 ? (
        <>
          {/* Allocation Bar */}
          <div className="flex h-2 rounded-full overflow-hidden mb-4">
            {portfolioItems.map((item, index) => (
              <motion.div
                key={item.name}
                initial={{ width: 0 }}
                animate={{ width: `${item.allocation}%` }}
                transition={{ delay: 0.5 + index * 0.1, duration: 0.5 }}
                className={`${item.color}`}
              />
            ))}
          </div>

          {/* Legend */}
          <div className="grid grid-cols-2 gap-2">
            {portfolioItems.map((item) => (
              <div key={item.name} className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className={`h-2 w-2 rounded-full ${item.color}`} />
                  <span className="text-xs text-muted-foreground">{item.name}</span>
                </div>
                <span className="text-xs font-medium text-foreground">
                  {item.allocation.toFixed(0)}%
                </span>
              </div>
            ))}
          </div>
        </>
      ) : (
        <div className="text-center py-4 text-muted-foreground">
          {loading ? 'Loading investments...' : 'Add your investments to see portfolio breakdown'}
        </div>
      )}
    </motion.div>
  );
};
