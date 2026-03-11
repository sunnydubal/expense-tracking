import { Expense } from './AddExpenseForm';

interface ExpenseSummaryProps {
  expenses: Expense[];
}

export function ExpenseSummary({ expenses }: ExpenseSummaryProps) {
  const totalExpenses = expenses.reduce((sum, e) => sum + e.amount, 0);

  const currentMonth = new Date().getMonth();
  const currentYear = new Date().getFullYear();
  const monthlyExpenses = expenses.filter((e) => {
    const d = new Date(e.date);
    return d.getMonth() === currentMonth && d.getFullYear() === currentYear;
  });
  const monthlyTotal = monthlyExpenses.reduce((sum, e) => sum + e.amount, 0);

  const categoryTotals = expenses.reduce((acc, e) => {
    acc[e.category] = (acc[e.category] || 0) + e.amount;
    return acc;
  }, {} as Record<string, number>);

  const topCategory = Object.entries(categoryTotals).sort(([, a], [, b]) => b - a)[0];
  const avgExpense = expenses.length > 0 ? totalExpenses / expenses.length : 0;

  const stats = [
    {
      label: 'Total Spent',
      value: `$${totalExpenses.toFixed(2)}`,
      sub: 'All time',
    },
    {
      label: 'This Month',
      value: `$${monthlyTotal.toFixed(2)}`,
      sub: new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' }),
    },
    {
      label: 'Top Category',
      value: topCategory ? topCategory[0] : '—',
      sub: topCategory ? `$${topCategory[1].toFixed(2)}` : 'No data yet',
    },
    {
      label: 'Avg. Expense',
      value: `$${avgExpense.toFixed(2)}`,
      sub: `${expenses.length} transaction${expenses.length !== 1 ? 's' : ''}`,
    },
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 border border-border rounded-lg overflow-hidden">
      {stats.map((stat, i) => (
        <div
          key={i}
          className={`bg-card px-5 py-4 ${i < stats.length - 1 ? 'border-r border-border' : ''}`}
        >
          <p className="text-xs text-muted-foreground mb-1.5">{stat.label}</p>
          <p className="text-xl font-semibold text-foreground tracking-tight leading-none mb-1">
            {stat.value}
          </p>
          <p className="text-xs text-muted-foreground">{stat.sub}</p>
        </div>
      ))}
    </div>
  );
}
