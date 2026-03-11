import { Expense } from './AddExpenseForm';
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Legend,
  Tooltip,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
} from 'recharts';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';

interface ExpenseChartProps {
  expenses: Expense[];
}

const COLORS = ['#2383E2', '#0F9D58', '#F4B400', '#DB4437', '#AB47BC', '#00ACC1', '#FF7043', '#43A047'];

export function ExpenseChart({ expenses }: ExpenseChartProps) {
  const categoryData = expenses.reduce((acc, expense) => {
    const existing = acc.find((item) => item.name === expense.category);
    if (existing) {
      existing.value += expense.amount;
    } else {
      acc.push({ name: expense.category, value: expense.amount });
    }
    return acc;
  }, [] as { name: string; value: number }[]);

  const monthlyData = expenses.reduce((acc, expense) => {
    const date = new Date(expense.date);
    const monthYear = date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
    const existing = acc.find((item) => item.month === monthYear);
    if (existing) {
      existing.amount += expense.amount;
    } else {
      acc.push({ month: monthYear, amount: expense.amount });
    }
    return acc;
  }, [] as { month: string; amount: number }[]);

  monthlyData.sort((a, b) => new Date(a.month).getTime() - new Date(b.month).getTime());

  return (
    <div className="border border-border rounded-lg overflow-hidden bg-card">
      <div className="px-4 py-2.5 border-b border-border bg-secondary flex items-center gap-2">
        <span className="text-xs font-medium text-foreground">Analytics</span>
      </div>

      {expenses.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-3xl mb-2">📊</p>
          <p className="text-sm text-muted-foreground">Add expenses to see analytics</p>
        </div>
      ) : (
        <div className="p-4">
          <Tabs defaultValue="category" className="w-full">
            <TabsList className="h-7 bg-secondary mb-4">
              <TabsTrigger value="category" className="text-xs h-5 px-3">
                By Category
              </TabsTrigger>
              <TabsTrigger value="trend" className="text-xs h-5 px-3">
                Monthly Trend
              </TabsTrigger>
            </TabsList>

            <TabsContent value="category">
              <ResponsiveContainer width="100%" height={280}>
                <PieChart>
                  <Pie
                    data={categoryData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                    outerRadius={90}
                    dataKey="value"
                  >
                    {categoryData.map((_, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip
                    formatter={(value: number) => [`$${value.toFixed(2)}`, 'Amount']}
                    contentStyle={{ fontSize: '12px', borderRadius: '6px', border: '1px solid #E8E8E5' }}
                  />
                  <Legend wrapperStyle={{ fontSize: '12px' }} />
                </PieChart>
              </ResponsiveContainer>
            </TabsContent>

            <TabsContent value="trend">
              <ResponsiveContainer width="100%" height={280}>
                <BarChart data={monthlyData} barSize={20}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#E8E8E5" vertical={false} />
                  <XAxis
                    dataKey="month"
                    axisLine={false}
                    tickLine={false}
                    tick={{ fontSize: 11, fill: '#787774' }}
                  />
                  <YAxis
                    axisLine={false}
                    tickLine={false}
                    tick={{ fontSize: 11, fill: '#787774' }}
                  />
                  <Tooltip
                    formatter={(value: number) => [`$${value.toFixed(2)}`, 'Amount']}
                    cursor={{ fill: '#F7F6F3' }}
                    contentStyle={{ fontSize: '12px', borderRadius: '6px', border: '1px solid #E8E8E5' }}
                  />
                  <Bar dataKey="amount" fill="#2383E2" radius={[3, 3, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </TabsContent>
          </Tabs>
        </div>
      )}
    </div>
  );
}
