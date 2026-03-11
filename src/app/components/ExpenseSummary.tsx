import { Expense } from './AddExpenseForm';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { DollarSign, TrendingUp, Calendar, PieChart } from 'lucide-react';

interface ExpenseSummaryProps {
  expenses: Expense[];
}

export function ExpenseSummary({ expenses }: ExpenseSummaryProps) {
  const totalExpenses = expenses.reduce((sum, expense) => sum + expense.amount, 0);

  const currentMonth = new Date().getMonth();
  const currentYear = new Date().getFullYear();
  const monthlyExpenses = expenses.filter((expense) => {
    const expenseDate = new Date(expense.date);
    return expenseDate.getMonth() === currentMonth && expenseDate.getFullYear() === currentYear;
  });
  const monthlyTotal = monthlyExpenses.reduce((sum, expense) => sum + expense.amount, 0);

  const categoryTotals = expenses.reduce((acc, expense) => {
    acc[expense.category] = (acc[expense.category] || 0) + expense.amount;
    return acc;
  }, {} as Record<string, number>);

  const topCategory = Object.entries(categoryTotals).sort(([, a], [, b]) => b - a)[0];

  const stats = [
    {
      title: 'Total Expenses',
      value: `$${totalExpenses.toFixed(2)}`,
      icon: DollarSign,
      description: 'All time',
    },
    {
      title: 'This Month',
      value: `$${monthlyTotal.toFixed(2)}`,
      icon: Calendar,
      description: new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' }),
    },
    {
      title: 'Top Category',
      value: topCategory ? topCategory[0] : 'N/A',
      icon: PieChart,
      description: topCategory ? `$${topCategory[1].toFixed(2)}` : 'No expenses yet',
    },
    {
      title: 'Average Expense',
      value: expenses.length > 0 ? `$${(totalExpenses / expenses.length).toFixed(2)}` : '$0.00',
      icon: TrendingUp,
      description: `${expenses.length} transaction${expenses.length !== 1 ? 's' : ''}`,
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((stat, index) => {
        const Icon = stat.icon;
        return (
          <Card key={index}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm">{stat.title}</CardTitle>
              <Icon className="h-4 w-4 text-gray-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl">{stat.value}</div>
              <p className="text-xs text-gray-500 mt-1">{stat.description}</p>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
