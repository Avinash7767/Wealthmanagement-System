// Mock data for the wealth management dashboard

export const netWorthHistory = [
  { month: 'Jul', netWorth: 2850000, assets: 3200000, liabilities: 350000 },
  { month: 'Aug', netWorth: 2920000, assets: 3280000, liabilities: 360000 },
  { month: 'Sep', netWorth: 3050000, assets: 3420000, liabilities: 370000 },
  { month: 'Oct', netWorth: 3180000, assets: 3560000, liabilities: 380000 },
  { month: 'Nov', netWorth: 3350000, assets: 3740000, liabilities: 390000 },
  { month: 'Dec', netWorth: 3520000, assets: 3920000, liabilities: 400000 },
];

export const budgetData = [
  { category: 'Housing', amount: 35000, color: 'hsl(var(--chart-1))' },
  { category: 'Food', amount: 15000, color: 'hsl(var(--chart-2))' },
  { category: 'Transport', amount: 8000, color: 'hsl(var(--chart-3))' },
  { category: 'Entertainment', amount: 5000, color: 'hsl(var(--chart-4))' },
  { category: 'Savings', amount: 37000, color: 'hsl(var(--chart-5))' },
];

export const wealthForecast = [
  { year: '2024', projected: 3520000, conservative: 3200000 },
  { year: '2025', projected: 4200000, conservative: 3700000 },
  { year: '2026', projected: 5100000, conservative: 4300000 },
  { year: '2027', projected: 6200000, conservative: 5000000 },
  { year: '2028', projected: 7500000, conservative: 5800000 },
];

export const accountsSummary = {
  assets: {
    cash: 125000,
    bankAccounts: 850000,
    investments: {
      stocks: 1200000,
      mutualFunds: 950000,
      fixedDeposits: 500000,
      ppf: 320000,
    },
    property: 0,
    gold: 275000,
  },
  liabilities: {
    homeLoan: 0,
    carLoan: 250000,
    personalLoan: 0,
    creditCards: 35000,
    otherLoans: 115000,
  },
};

export const goals = [
  {
    id: '1',
    name: 'Emergency Fund',
    targetAmount: 600000,
    currentAmount: 450000,
    deadline: '2024-06-30',
    category: 'savings',
    priority: 'high',
  },
  {
    id: '2',
    name: 'Dream Vacation',
    targetAmount: 200000,
    currentAmount: 85000,
    deadline: '2025-03-15',
    category: 'travel',
    priority: 'medium',
  },
  {
    id: '3',
    name: 'Home Down Payment',
    targetAmount: 3000000,
    currentAmount: 1250000,
    deadline: '2027-12-31',
    category: 'property',
    priority: 'high',
  },
  {
    id: '4',
    name: 'New Car',
    targetAmount: 1500000,
    currentAmount: 350000,
    deadline: '2026-06-30',
    category: 'vehicle',
    priority: 'low',
  },
  {
    id: '5',
    name: 'Child Education Fund',
    targetAmount: 5000000,
    currentAmount: 750000,
    deadline: '2035-04-01',
    category: 'education',
    priority: 'high',
  },
];

export const transactions = [
  { id: '1', date: '2024-01-08', category: 'Salary', type: 'income', amount: 150000, description: 'Monthly Salary' },
  { id: '2', date: '2024-01-07', category: 'Groceries', type: 'expense', amount: 4500, description: 'Weekly groceries' },
  { id: '3', date: '2024-01-06', category: 'Investment', type: 'expense', amount: 25000, description: 'SIP - Mutual Fund' },
  { id: '4', date: '2024-01-05', category: 'Rent', type: 'expense', amount: 35000, description: 'Monthly rent' },
  { id: '5', date: '2024-01-04', category: 'Freelance', type: 'income', amount: 30000, description: 'Freelance project' },
  { id: '6', date: '2024-01-03', category: 'Utilities', type: 'expense', amount: 3500, description: 'Electricity bill' },
  { id: '7', date: '2024-01-02', category: 'Entertainment', type: 'expense', amount: 2000, description: 'Movie & dinner' },
  { id: '8', date: '2024-01-01', category: 'Transport', type: 'expense', amount: 5000, description: 'Fuel & maintenance' },
  { id: '9', date: '2023-12-31', category: 'Dividend', type: 'income', amount: 8500, description: 'Stock dividend' },
  { id: '10', date: '2023-12-30', category: 'Shopping', type: 'expense', amount: 12000, description: 'Clothing' },
];

export const recommendations = [
  {
    id: '1',
    title: 'Increase SIP Amount',
    description: 'Based on your income growth, consider increasing your monthly SIP by ₹5,000 to accelerate wealth building.',
    impact: 'high',
    category: 'investment',
  },
  {
    id: '2',
    title: 'Emergency Fund Alert',
    description: 'Your emergency fund is 75% complete. Add ₹1.5L more to reach your 6-month expense goal.',
    impact: 'medium',
    category: 'savings',
  },
  {
    id: '3',
    title: 'Tax Saving Opportunity',
    description: 'You can save up to ₹46,800 in taxes by investing in ELSS funds under Section 80C.',
    impact: 'high',
    category: 'tax',
  },
];

export const userProfile = {
  name: 'Rajesh Kumar',
  email: 'rajesh.kumar@email.com',
  phone: '+91 98765 43210',
  riskLevel: 'medium' as const,
  joinedDate: '2023-06-15',
  avatar: '',
};

export const monthlyStats = {
  income: 180000,
  expenses: 98000,
  savings: 82000,
  savingsRate: 45.5,
};
