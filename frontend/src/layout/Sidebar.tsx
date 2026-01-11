import { motion } from 'framer-motion';
import { 
  Wallet, 
  Building2, 
  LineChart, 
  Coins, 
  CreditCard, 
  Car,
  TrendingUp,
  TrendingDown
} from 'lucide-react';
import { formatINR, formatINRCompact } from '@/lib/currency';
import { accountsSummary } from '@/lib/mock-data';

const calculateTotals = () => {
  const assets = accountsSummary.assets;
  const liabilities = accountsSummary.liabilities;
  
  const totalAssets = 
    assets.cash + 
    assets.bankAccounts + 
    assets.investments.stocks + 
    assets.investments.mutualFunds + 
    assets.investments.fixedDeposits + 
    assets.investments.ppf +
    assets.gold;
  
  const totalLiabilities = 
    liabilities.homeLoan + 
    liabilities.carLoan + 
    liabilities.personalLoan + 
    liabilities.creditCards +
    liabilities.otherLoans;
  
  const netWorth = totalAssets - totalLiabilities;
  
  return { totalAssets, totalLiabilities, netWorth };
};

const { totalAssets, totalLiabilities, netWorth } = calculateTotals();

const assetItems = [
  { label: 'Cash', value: accountsSummary.assets.cash, icon: Wallet },
  { label: 'Bank Accounts', value: accountsSummary.assets.bankAccounts, icon: Building2 },
  { 
    label: 'Investments', 
    value: Object.values(accountsSummary.assets.investments).reduce((a, b) => a + b, 0), 
    icon: LineChart 
  },
  { label: 'Gold', value: accountsSummary.assets.gold, icon: Coins },
];

const liabilityItems = [
  { label: 'Car Loan', value: accountsSummary.liabilities.carLoan, icon: Car },
  { label: 'Credit Cards', value: accountsSummary.liabilities.creditCards, icon: CreditCard },
  { label: 'Other Loans', value: accountsSummary.liabilities.otherLoans, icon: Wallet },
];

export const Sidebar = () => {
  return (
    <aside className="hidden lg:flex flex-col w-72 border-r border-border bg-card p-4 gap-6">
      {/* Net Worth Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative overflow-hidden rounded-xl gradient-wealth p-5 text-primary-foreground"
      >
        <div className="absolute top-0 right-0 w-32 h-32 rounded-full bg-white/10 -translate-y-1/2 translate-x-1/2" />
        <div className="relative">
          <p className="text-sm font-medium opacity-90">Net Worth</p>
          <h2 className="mt-1 font-display text-2xl font-bold">
            {formatINRCompact(netWorth)}
          </h2>
          <p className="mt-2 text-xs opacity-80">
            {formatINR(netWorth)}
          </p>
          <div className="mt-3 flex items-center gap-1 text-xs">
            <TrendingUp className="h-3 w-3" />
            <span className="font-medium">+5.2%</span>
            <span className="opacity-80">this month</span>
          </div>
        </div>
      </motion.div>

      {/* Assets Section */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-display text-sm font-semibold text-foreground">Assets</h3>
          <span className="text-xs font-medium text-success">
            {formatINRCompact(totalAssets)}
          </span>
        </div>
        <div className="space-y-2">
          {assetItems.map((item, index) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="flex items-center gap-3 p-3 rounded-lg bg-muted/50 hover:bg-muted transition-colors"
            >
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-success/10 text-success">
                <item.icon className="h-4 w-4" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-foreground truncate">{item.label}</p>
                <p className="text-xs text-muted-foreground">
                  {formatINRCompact(item.value)}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Liabilities Section */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-display text-sm font-semibold text-foreground">Liabilities</h3>
          <span className="text-xs font-medium text-destructive">
            {formatINRCompact(totalLiabilities)}
          </span>
        </div>
        <div className="space-y-2">
          {liabilityItems.filter(item => item.value > 0).map((item, index) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 + 0.4 }}
              className="flex items-center gap-3 p-3 rounded-lg bg-muted/50 hover:bg-muted transition-colors"
            >
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-destructive/10 text-destructive">
                <item.icon className="h-4 w-4" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-foreground truncate">{item.label}</p>
                <p className="text-xs text-muted-foreground">
                  {formatINRCompact(item.value)}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Quick Summary */}
      <div className="mt-auto p-4 rounded-xl bg-muted/50 border border-border">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <TrendingUp className="h-4 w-4 text-success" />
            <span className="text-xs text-muted-foreground">Assets</span>
          </div>
          <span className="text-xs font-medium text-success">{formatINRCompact(totalAssets)}</span>
        </div>
        <div className="flex items-center justify-between mt-2">
          <div className="flex items-center gap-2">
            <TrendingDown className="h-4 w-4 text-destructive" />
            <span className="text-xs text-muted-foreground">Liabilities</span>
          </div>
          <span className="text-xs font-medium text-destructive">{formatINRCompact(totalLiabilities)}</span>
        </div>
      </div>
    </aside>
  );
};
