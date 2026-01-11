import { useState } from 'react';
import { motion } from 'framer-motion';
import { Target, Plus, Check, Calendar, TrendingUp, Pencil, Trash2 } from 'lucide-react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { goals as initialGoals } from '@/lib/mock-data';
import { formatINR, formatINRCompact } from '@/lib/currency';

const priorityColors = {
  high: 'bg-destructive/10 text-destructive border-destructive/20',
  medium: 'bg-warning/10 text-warning border-warning/20',
  low: 'bg-muted text-muted-foreground border-border',
};

const categoryIcons = {
  savings: '💰',
  travel: '✈️',
  property: '🏠',
  vehicle: '🚗',
  education: '🎓',
};

const Goals = () => {
  const [goals, setGoals] = useState(initialGoals);
  const [isOpen, setIsOpen] = useState(false);
  const [newGoal, setNewGoal] = useState({
    name: '',
    targetAmount: '',
    currentAmount: '',
    deadline: '',
    category: 'savings',
    priority: 'medium',
  });

  const handleAddGoal = () => {
    if (!newGoal.name || !newGoal.targetAmount) return;

    const goal = {
      id: Date.now().toString(),
      name: newGoal.name,
      targetAmount: parseFloat(newGoal.targetAmount),
      currentAmount: parseFloat(newGoal.currentAmount) || 0,
      deadline: newGoal.deadline,
      category: newGoal.category,
      priority: newGoal.priority as 'high' | 'medium' | 'low',
    };

    setGoals([...goals, goal]);
    setNewGoal({
      name: '',
      targetAmount: '',
      currentAmount: '',
      deadline: '',
      category: 'savings',
      priority: 'medium',
    });
    setIsOpen(false);
  };

  const totalTarget = goals.reduce((sum, g) => sum + g.targetAmount, 0);
  const totalSaved = goals.reduce((sum, g) => sum + g.currentAmount, 0);
  const overallProgress = (totalSaved / totalTarget) * 100;

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
              <Target className="h-6 w-6 text-primary" />
              Financial Goals
            </h1>
            <p className="mt-1 text-muted-foreground">
              Track and manage your financial objectives
            </p>
          </motion.div>

          <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
              <Button className="gap-2 gradient-wealth text-white">
                <Plus className="h-4 w-4" />
                Add Goal
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add New Goal</DialogTitle>
              </DialogHeader>
              <div className="space-y-4 mt-4">
                <div className="space-y-2">
                  <Label>Goal Name</Label>
                  <Input
                    placeholder="e.g., Emergency Fund"
                    value={newGoal.name}
                    onChange={(e) => setNewGoal({ ...newGoal, name: e.target.value })}
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Target Amount (₹)</Label>
                    <Input
                      type="number"
                      placeholder="500000"
                      value={newGoal.targetAmount}
                      onChange={(e) => setNewGoal({ ...newGoal, targetAmount: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Current Savings (₹)</Label>
                    <Input
                      type="number"
                      placeholder="100000"
                      value={newGoal.currentAmount}
                      onChange={(e) => setNewGoal({ ...newGoal, currentAmount: e.target.value })}
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Category</Label>
                    <Select
                      value={newGoal.category}
                      onValueChange={(value) => setNewGoal({ ...newGoal, category: value })}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="savings">Savings</SelectItem>
                        <SelectItem value="travel">Travel</SelectItem>
                        <SelectItem value="property">Property</SelectItem>
                        <SelectItem value="vehicle">Vehicle</SelectItem>
                        <SelectItem value="education">Education</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>Priority</Label>
                    <Select
                      value={newGoal.priority}
                      onValueChange={(value) => setNewGoal({ ...newGoal, priority: value })}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="high">High</SelectItem>
                        <SelectItem value="medium">Medium</SelectItem>
                        <SelectItem value="low">Low</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>Target Date</Label>
                  <Input
                    type="date"
                    value={newGoal.deadline}
                    onChange={(e) => setNewGoal({ ...newGoal, deadline: e.target.value })}
                  />
                </div>
                <Button onClick={handleAddGoal} className="w-full gradient-wealth text-white">
                  Add Goal
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        {/* Summary Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="rounded-xl gradient-wealth p-6 text-white"
        >
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <p className="text-sm opacity-80">Total Goals Progress</p>
              <p className="font-display text-3xl font-bold mt-1">
                {formatINRCompact(totalSaved)} / {formatINRCompact(totalTarget)}
              </p>
            </div>
            <div className="flex-1 max-w-md">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm opacity-80">{overallProgress.toFixed(1)}% Complete</span>
                <span className="text-sm font-medium">
                  {formatINRCompact(totalTarget - totalSaved)} remaining
                </span>
              </div>
              <div className="h-3 rounded-full bg-white/20 overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${overallProgress}%` }}
                  transition={{ delay: 0.3, duration: 0.8 }}
                  className="h-full bg-white rounded-full"
                />
              </div>
            </div>
          </div>
        </motion.div>

        {/* Goals List */}
        <div className="space-y-4">
          {goals.map((goal, index) => {
            const progress = (goal.currentAmount / goal.targetAmount) * 100;
            const remaining = goal.targetAmount - goal.currentAmount;
            
            return (
              <motion.div
                key={goal.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 + index * 0.05 }}
                className="rounded-xl border border-border bg-card p-5 hover:shadow-md transition-shadow"
              >
                <div className="flex flex-col lg:flex-row lg:items-center gap-4">
                  {/* Goal Info */}
                  <div className="flex items-center gap-4 flex-1">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-2xl">
                      {categoryIcons[goal.category as keyof typeof categoryIcons] || '🎯'}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <h3 className="font-display font-semibold text-foreground truncate">
                          {goal.name}
                        </h3>
                        <span className={`px-2 py-0.5 text-xs rounded-full border ${priorityColors[goal.priority]}`}>
                          {goal.priority}
                        </span>
                      </div>
                      <div className="flex items-center gap-4 mt-1 text-sm text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <Calendar className="h-3 w-3" />
                          {new Date(goal.deadline).toLocaleDateString('en-IN', {
                            month: 'short',
                            year: 'numeric',
                          })}
                        </span>
                        <span className="flex items-center gap-1">
                          <TrendingUp className="h-3 w-3" />
                          {formatINRCompact(remaining)} to go
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Progress */}
                  <div className="flex-1 lg:max-w-md">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-foreground">
                        {formatINR(goal.currentAmount)}
                      </span>
                      <span className="text-sm text-muted-foreground">
                        {formatINR(goal.targetAmount)}
                      </span>
                    </div>
                    <Progress value={progress} className="h-3" />
                    <p className="mt-1 text-xs text-muted-foreground text-right">
                      {progress.toFixed(1)}% achieved
                    </p>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-2">
                    {progress >= 100 ? (
                      <div className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-success/10 text-success text-sm font-medium">
                        <Check className="h-4 w-4" />
                        Completed
                      </div>
                    ) : (
                      <>
                        <Button variant="ghost" size="icon" className="h-9 w-9">
                          <Pencil className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon" className="h-9 w-9 text-destructive">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </>
                    )}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Goals;
