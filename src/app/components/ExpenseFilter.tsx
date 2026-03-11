import { CATEGORIES } from './AddExpenseForm';

interface ExpenseFilterProps {
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
}

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

export function ExpenseFilter({ selectedCategory, onCategoryChange }: ExpenseFilterProps) {
  const allOptions = [
    { value: 'all', label: 'All', icon: null },
    ...CATEGORIES.map((c) => ({ value: c, label: c, icon: CATEGORY_ICONS[c] })),
  ];

  return (
    <div className="flex items-center gap-1.5 flex-wrap">
      {allOptions.map(({ value, label, icon }) => (
        <button
          key={value}
          onClick={() => onCategoryChange(value)}
          className={`inline-flex items-center gap-1 px-2.5 py-1 rounded text-xs font-medium transition-colors ${
            selectedCategory === value
              ? 'bg-foreground text-background'
              : 'bg-secondary text-muted-foreground hover:bg-accent hover:text-foreground'
          }`}
        >
          {icon && <span className="leading-none">{icon}</span>}
          {label}
        </button>
      ))}
    </div>
  );
}
