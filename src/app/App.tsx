import { useState, useEffect } from 'react';
import { AddExpenseForm, Expense } from './components/AddExpenseForm';
import { ExpenseList } from './components/ExpenseList';
import { ExpenseSummary } from './components/ExpenseSummary';
import { ExpenseChart } from './components/ExpenseChart';
import { ExpenseFilter } from './components/ExpenseFilter';
import { Wallet } from 'lucide-react';

const STORAGE_KEY = 'expense-tracker-data';

export default function App() {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [selectedCategory, setSelectedCategory] = useState('all');

  // Load expenses from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        setExpenses(parsed);
      } catch (e) {
        console.error('Failed to parse stored expenses:', e);
      }
    }
  }, []);

  // Save expenses to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(expenses));
  }, [expenses]);

  const handleAddExpense = (expense: Expense) => {
    setExpenses((prev) => [...prev, expense]);
  };

  const handleDeleteExpense = (id: string) => {
    setExpenses((prev) => prev.filter((expense) => expense.id !== id));
  };

  const filteredExpenses =
    selectedCategory === 'all'
      ? expenses
      : expenses.filter((expense) => expense.category === selectedCategory);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <Wallet className="h-8 w-8 text-blue-600" />
            <h1 className="text-3xl">Expense Tracker</h1>
          </div>
          <p className="text-gray-600 dark:text-gray-400">
            Track and manage your expenses with ease
          </p>
        </div>

        {/* Summary Stats */}
        <div className="mb-8">
          <ExpenseSummary expenses={expenses} />
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {/* Add Expense Form */}
          <div className="lg:col-span-1">
            <AddExpenseForm onAddExpense={handleAddExpense} />
          </div>

          {/* Chart */}
          <div className="lg:col-span-2">
            <ExpenseChart expenses={expenses} />
          </div>
        </div>

        {/* Filter */}
        <div className="mb-6">
          <ExpenseFilter
            selectedCategory={selectedCategory}
            onCategoryChange={setSelectedCategory}
          />
        </div>

        {/* Expense List */}
        <ExpenseList expenses={filteredExpenses} onDeleteExpense={handleDeleteExpense} />
      </div>
    </div>
  );
}
