import { Expense } from './AddExpenseForm';
import { Trash2 } from 'lucide-react';

interface ExpenseListProps {
  expenses: Expense[];
  onDeleteExpense: (id: string) => void;
}

const CATEGORY_STYLES: Record<string, string> = {
  'Food & Dining': 'bg-orange-50 text-orange-700 border-orange-200',
  'Transportation': 'bg-blue-50 text-blue-700 border-blue-200',
  'Shopping': 'bg-purple-50 text-purple-700 border-purple-200',
  'Entertainment': 'bg-pink-50 text-pink-700 border-pink-200',
  'Bills & Utilities': 'bg-yellow-50 text-yellow-700 border-yellow-200',
  'Healthcare': 'bg-red-50 text-red-700 border-red-200',
  'Education': 'bg-indigo-50 text-indigo-700 border-indigo-200',
  'Travel': 'bg-green-50 text-green-700 border-green-200',
  'Other': 'bg-gray-50 text-gray-600 border-gray-200',
};

const CATEGORY_ICONS: Record<string, string> = {
  'Food & Dining': '🍽️',
  'Transportation': '🚗',
  'Shopping': '🛍️',
  'Entertainment': '🎬',
  'Bills & Utilities': '⚡',
  'Healthcare': '🏥',
  'Education': '📚',
  'Travel': '✈️',
  'Other': '📦',
};

export function ExpenseList({ expenses, onDeleteExpense }: ExpenseListProps) {
  const sortedExpenses = [...expenses].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  return (
    <div className="border border-border rounded-lg overflow-hidden bg-card">
      {/* Database header bar */}
      <div className="px-4 py-2.5 border-b border-border bg-secondary flex items-center gap-2">
        <span className="text-xs font-medium text-foreground">Transactions</span>
        <span className="text-xs text-muted-foreground">
          {expenses.length} {expenses.length === 1 ? 'entry' : 'entries'}
        </span>
      </div>

      {expenses.length === 0 ? (
        <div className="text-center py-16">
          <p className="text-4xl mb-3">🗒️</p>
          <p className="text-sm text-muted-foreground">No expenses yet</p>
          <p className="text-xs text-muted-foreground mt-1 opacity-70">
            Click "New" to add your first expense
          </p>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left px-4 py-2.5 text-xs font-medium text-muted-foreground uppercase tracking-wider w-[130px]">
                  Date
                </th>
                <th className="text-left px-4 py-2.5 text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  Description
                </th>
                <th className="text-left px-4 py-2.5 text-xs font-medium text-muted-foreground uppercase tracking-wider w-[190px]">
                  Category
                </th>
                <th className="text-right px-4 py-2.5 text-xs font-medium text-muted-foreground uppercase tracking-wider w-[110px]">
                  Amount
                </th>
                <th className="w-[44px]" />
              </tr>
            </thead>
            <tbody>
              {sortedExpenses.map((expense) => (
                <tr
                  key={expense.id}
                  className="group border-b border-border last:border-0 hover:bg-secondary transition-colors"
                >
                  <td className="px-4 py-3 text-muted-foreground whitespace-nowrap text-xs">
                    {new Date(expense.date).toLocaleDateString('en-US', {
                      month: 'short',
                      day: 'numeric',
                      year: 'numeric',
                    })}
                  </td>
                  <td className="px-4 py-3 text-foreground">
                    {expense.description || (
                      <span className="text-muted-foreground italic">—</span>
                    )}
                  </td>
                  <td className="px-4 py-3">
                    <span
                      className={`inline-flex items-center gap-1 px-2 py-0.5 rounded text-xs border ${
                        CATEGORY_STYLES[expense.category] || CATEGORY_STYLES['Other']
                      }`}
                    >
                      <span className="leading-none">{CATEGORY_ICONS[expense.category] || '📦'}</span>
                      {expense.category}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-right font-semibold text-foreground tabular-nums">
                    ${expense.amount.toFixed(2)}
                  </td>
                  <td className="px-2 py-3 text-right">
                    <button
                      onClick={() => onDeleteExpense(expense.id)}
                      className="opacity-0 group-hover:opacity-100 p-1 rounded hover:bg-destructive/10 transition-all"
                      aria-label="Delete expense"
                    >
                      <Trash2 className="h-3.5 w-3.5 text-destructive" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
