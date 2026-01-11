import { motion } from 'framer-motion';
import { Lightbulb, ArrowRight, TrendingUp, PiggyBank, Receipt } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { recommendations } from '@/lib/mock-data';
import { Link } from 'react-router-dom';

const iconMap = {
  investment: TrendingUp,
  savings: PiggyBank,
  tax: Receipt,
};

const impactColors = {
  high: 'bg-success/10 text-success border-success/20',
  medium: 'bg-warning/10 text-warning border-warning/20',
  low: 'bg-muted text-muted-foreground border-border',
};

export const RecommendationsCard = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5 }}
      className="rounded-xl border border-border bg-card p-5"
    >
      <div className="flex items-center gap-2 mb-4">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-accent/20">
          <Lightbulb className="h-4 w-4 text-accent" />
        </div>
        <h3 className="font-display text-sm font-semibold text-foreground">
          Smart Recommendations
        </h3>
      </div>
      
      <div className="space-y-3">
        {recommendations.slice(0, 3).map((rec, index) => {
          const Icon = iconMap[rec.category as keyof typeof iconMap] || Lightbulb;
          return (
            <motion.div
              key={rec.id}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6 + index * 0.1 }}
              className={`p-3 rounded-lg border ${impactColors[rec.impact as keyof typeof impactColors]}`}
            >
              <div className="flex items-start gap-3">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-card shrink-0">
                  <Icon className="h-4 w-4" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-foreground">{rec.title}</p>
                  <p className="text-xs text-muted-foreground mt-1 line-clamp-2">
                    {rec.description}
                  </p>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      <Link to="/goals">
        <Button className="w-full mt-4 gap-2" variant="outline">
          See All Recommendations
          <ArrowRight className="h-4 w-4" />
        </Button>
      </Link>
    </motion.div>
  );
};
