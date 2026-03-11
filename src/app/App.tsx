import { useState, useEffect } from 'react';
import { AddExpenseForm, Expense, CATEGORIES } from './components/AddExpenseForm';
import { ExpenseList } from './components/ExpenseList';
import { ExpenseSummary } from './components/ExpenseSummary';
import { ExpenseChart } from './components/ExpenseChart';
import { ExpenseFilter } from './components/ExpenseFilter';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from './components/ui/dialog';
import { Plus, ChevronDown, LayoutGrid } from 'lucide-react';

const STORAGE_KEY = 'expense-tracker-data';

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

export default function App() {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [showAddDialog, setShowAddDialog] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        setExpenses(JSON.parse(stored));
      } catch (e) {
        console.error('Failed to parse stored expenses:', e);
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(expenses));
  }, [expenses]);

  const handleAddExpense = (expense: Expense) => {
    setExpenses((prev) => [...prev, expense]);
    setShowAddDialog(false);
  };

  const handleDeleteExpense = (id: string) => {
    setExpenses((prev) => prev.filter((e) => e.id !== id));
  };

  const filteredExpenses =
    selectedCategory === 'all'
      ? expenses
      : expenses.filter((e) => e.category === selectedCategory);

  const totalSpend = expenses.reduce((sum, e) => sum + e.amount, 0);

  const categoryTotals = expenses.reduce((acc, e) => {
    acc[e.category] = (acc[e.category] || 0) + e.amount;
    return acc;
  }, {} as Record<string, number>);

  return (
    <div className="flex h-screen overflow-hidden">
      {/* ── Sidebar ── */}
      <aside
        className="w-60 flex-shrink-0 h-screen flex flex-col overflow-y-auto select-none"
        style={{ background: '#191919', color: '#9B9B9B', fontFamily: 'Inter, sans-serif' }}
      >
        {/* Workspace header */}
        <div className="px-3 pt-5 pb-2">
          <button className="flex items-center gap-2 w-full px-2 py-1.5 rounded hover:bg-white/10 transition-colors text-left">
            <div
              className="w-5 h-5 rounded flex items-center justify-center text-white text-xs font-bold flex-shrink-0"
              style={{ background: '#2383E2' }}
            >
              E
            </div>
            <span className="text-white font-semibold text-sm truncate">Expense Tracker</span>
            <ChevronDown className="ml-auto h-3.5 w-3.5 flex-shrink-0 opacity-50" />
          </button>
        </div>

        {/* New expense */}
        <div className="px-3 pb-2">
          <button
            onClick={() => setShowAddDialog(true)}
            className="flex items-center gap-1.5 w-full px-2 py-1.5 rounded hover:bg-white/10 transition-colors text-sm"
          >
            <Plus className="h-3.5 w-3.5" />
            New expense
          </button>
        </div>

        {/* All expenses */}
        <div className="px-3">
          <button
            onClick={() => setSelectedCategory('all')}
            className={`flex items-center gap-2 w-full px-2 py-1.5 rounded transition-colors text-sm ${
              selectedCategory === 'all' ? 'text-white' : 'hover:bg-white/10'
            }`}
            style={selectedCategory === 'all' ? { background: 'rgba(255,255,255,0.12)' } : undefined}
          >
            <LayoutGrid className="h-3.5 w-3.5 flex-shrink-0" />
            <span>All Expenses</span>
            <span className="ml-auto text-xs opacity-50">{expenses.length}</span>
          </button>
        </div>

        {/* Divider */}
        <div className="mx-3 my-3 h-px" style={{ background: 'rgba(255,255,255,0.08)' }} />

        {/* Categories */}
        <div className="px-3 flex-1 overflow-y-auto">
          <p
            className="px-2 py-1 text-[10px] font-semibold uppercase tracking-widest mb-0.5"
            style={{ color: '#4A4A4A' }}
          >
            Categories
          </p>
          {CATEGORIES.map((cat) => {
            const amount = categoryTotals[cat] || 0;
            const isActive = selectedCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`flex items-center gap-2 w-full px-2 py-1.5 rounded transition-colors text-sm ${
                  isActive ? 'text-white' : 'hover:bg-white/10'
                }`}
                style={isActive ? { background: 'rgba(255,255,255,0.12)' } : undefined}
              >
                <span className="text-sm leading-none flex-shrink-0">{CATEGORY_ICONS[cat]}</span>
                <span className="truncate">{cat}</span>
                {amount > 0 && (
                  <span className="ml-auto text-xs opacity-40">
                    ${amount >= 1000 ? `${(amount / 1000).toFixed(1)}k` : amount.toFixed(0)}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Total spend footer */}
        <div className="px-3 py-4" style={{ borderTop: '1px solid rgba(255,255,255,0.08)' }}>
          <div className="px-2">
            <p className="text-[11px] mb-0.5" style={{ color: '#4A4A4A' }}>
              Total Spent
            </p>
            <p className="text-white font-bold text-xl">${totalSpend.toFixed(2)}</p>
          </div>
        </div>
      </aside>

      {/* ── Main content ── */}
      <main className="flex-1 overflow-y-auto bg-background">
        <div className="max-w-4xl mx-auto px-12 py-10">
          {/* Page header */}
          <div className="flex items-start justify-between mb-8">
            <div>
              <div className="flex items-center gap-3 mb-1">
                <span className="text-5xl leading-none">💰</span>
                <h1 className="text-4xl font-bold text-foreground tracking-tight">My Expenses</h1>
              </div>
              <p className="text-muted-foreground text-sm" style={{ paddingLeft: '68px' }}>
                Personal finance tracker
              </p>
            </div>
            <button
              onClick={() => setShowAddDialog(true)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded text-sm font-medium bg-foreground text-background hover:opacity-90 transition-opacity mt-1"
            >
              <Plus className="h-3.5 w-3.5" />
              New
            </button>
          </div>

          {/* Stats */}
          <div className="mb-8">
            <ExpenseSummary expenses={expenses} />
          </div>

          {/* Chart */}
          <div className="mb-8">
            <ExpenseChart expenses={expenses} />
          </div>

          {/* Filter */}
          <div className="mb-3">
            <ExpenseFilter
              selectedCategory={selectedCategory}
              onCategoryChange={setSelectedCategory}
            />
          </div>

          {/* Expense list */}
          <ExpenseList expenses={filteredExpenses} onDeleteExpense={handleDeleteExpense} />
        </div>
      </main>

      {/* Add Expense Dialog */}
      <Dialog open={showAddDialog} onOpenChange={setShowAddDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-base font-semibold">New Expense</DialogTitle>
          </DialogHeader>
          <AddExpenseForm onAddExpense={handleAddExpense} />
        </DialogContent>
      </Dialog>
    </div>
  );
}
