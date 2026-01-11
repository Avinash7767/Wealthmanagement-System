import { motion } from 'framer-motion';
import { User, Shield, LogOut, Moon, Sun, Mail, Phone, Calendar } from 'lucide-react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Separator } from '@/components/ui/separator';
import { useAuth } from '@/contexts/AuthContext';
import { useTheme } from '@/contexts/ThemeContext';
import { userProfile } from '@/lib/mock-data';

const Profile = () => {
  const { user, logout, updateRiskLevel } = useAuth();
  const { theme, toggleTheme } = useTheme();

  const riskLevels = [
    { value: 'low', label: 'Low Risk', description: 'Preserve capital, stable returns' },
    { value: 'medium', label: 'Medium Risk', description: 'Balanced growth and stability' },
    { value: 'high', label: 'High Risk', description: 'Maximize growth, higher volatility' },
  ];

  return (
    <DashboardLayout showSidebar={false}>
      <div className="max-w-3xl mx-auto space-y-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="font-display text-2xl font-bold text-foreground flex items-center gap-2">
            <User className="h-6 w-6 text-primary" />
            Profile Settings
          </h1>
          <p className="mt-1 text-muted-foreground">
            Manage your account and preferences
          </p>
        </motion.div>

        {/* Profile Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="rounded-xl border border-border bg-card p-6"
        >
          <div className="flex items-center gap-4">
            <div className="flex h-20 w-20 items-center justify-center rounded-full gradient-wealth text-2xl font-bold text-white">
              {user?.name?.charAt(0) || 'U'}
            </div>
            <div>
              <h2 className="font-display text-xl font-bold text-foreground">
                {user?.name || userProfile.name}
              </h2>
              <div className="mt-2 space-y-1">
                <p className="text-sm text-muted-foreground flex items-center gap-2">
                  <Mail className="h-4 w-4" />
                  {user?.email || userProfile.email}
                </p>
                <p className="text-sm text-muted-foreground flex items-center gap-2">
                  <Phone className="h-4 w-4" />
                  {userProfile.phone}
                </p>
                <p className="text-sm text-muted-foreground flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  Member since {new Date(userProfile.joinedDate).toLocaleDateString('en-IN', {
                    month: 'long',
                    year: 'numeric',
                  })}
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Risk Level */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="rounded-xl border border-border bg-card p-6"
        >
          <div className="flex items-center gap-2 mb-4">
            <Shield className="h-5 w-5 text-primary" />
            <h3 className="font-display text-lg font-semibold text-foreground">
              Risk Tolerance
            </h3>
          </div>
          <p className="text-sm text-muted-foreground mb-4">
            Select your investment risk preference to get personalized recommendations.
          </p>
          
          <RadioGroup
            value={user?.riskLevel || 'medium'}
            onValueChange={(value) => updateRiskLevel(value as 'low' | 'medium' | 'high')}
            className="space-y-3"
          >
            {riskLevels.map((level) => (
              <div key={level.value}>
                <Label
                  htmlFor={level.value}
                  className={`flex items-center justify-between p-4 rounded-lg border cursor-pointer transition-colors ${
                    (user?.riskLevel || 'medium') === level.value
                      ? 'border-primary bg-primary/5'
                      : 'border-border hover:bg-muted'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <RadioGroupItem value={level.value} id={level.value} />
                    <div>
                      <span className="font-medium text-foreground">{level.label}</span>
                      <p className="text-xs text-muted-foreground">{level.description}</p>
                    </div>
                  </div>
                  <div className={`h-3 w-3 rounded-full ${
                    level.value === 'low' ? 'bg-success' :
                    level.value === 'medium' ? 'bg-warning' :
                    'bg-destructive'
                  }`} />
                </Label>
              </div>
            ))}
          </RadioGroup>
        </motion.div>

        {/* Appearance */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="rounded-xl border border-border bg-card p-6"
        >
          <h3 className="font-display text-lg font-semibold text-foreground mb-4">
            Appearance
          </h3>
          
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium text-foreground">Theme</p>
              <p className="text-sm text-muted-foreground">
                Choose between light and dark mode
              </p>
            </div>
            <Button
              variant="outline"
              size="lg"
              onClick={toggleTheme}
              className="gap-2"
            >
              {theme === 'light' ? (
                <>
                  <Moon className="h-4 w-4" />
                  Dark Mode
                </>
              ) : (
                <>
                  <Sun className="h-4 w-4" />
                  Light Mode
                </>
              )}
            </Button>
          </div>
        </motion.div>

        {/* Logout */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <Separator className="my-6" />
          
          <Button
            variant="destructive"
            size="lg"
            onClick={logout}
            className="w-full gap-2"
          >
            <LogOut className="h-4 w-4" />
            Sign Out
          </Button>
        </motion.div>
      </div>
    </DashboardLayout>
  );
};

export default Profile;
