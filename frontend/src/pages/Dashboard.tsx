import { motion } from 'framer-motion';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { NetWorthChart } from '@/components/dashboard/NetWorthChart';
import { BudgetChart } from '@/components/dashboard/BudgetChart';
import { CashFlowCard } from '@/components/dashboard/CashFlowCard';
import { ForecastChart } from '@/components/dashboard/ForecastChart';
import { RecommendationsCard } from '@/components/dashboard/RecommendationsCard';
import { PortfolioCard } from '@/components/dashboard/PortfolioCard';
import { useAuth } from '@/contexts/AuthContext';

const Dashboard = () => {
  const { user } = useAuth();

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="font-display text-2xl font-bold text-foreground">
            Good morning, {user?.name?.split(' ')[0] || 'there'}! 👋
          </h1>
          <p className="mt-1 text-muted-foreground">
            Here's your financial overview for today
          </p>
        </motion.div>

        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Main Charts */}
          <div className="lg:col-span-2 space-y-6">
            <NetWorthChart />
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <BudgetChart />
              <CashFlowCard />
            </div>

            <PortfolioCard />
          </div>

          {/* Right Column - Forecast & Recommendations */}
          <div className="space-y-6">
            <ForecastChart />
            <RecommendationsCard />
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;
