import { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Textarea } from './ui/textarea';
import { Plus } from 'lucide-react';

export interface Expense {
  id: string;
  amount: number;
  category: string;
  date: string;
  description: string;
}

interface AddExpenseFormProps {
  onAddExpense: (expense: Expense) => void;
}

const CATEGORIES = [
  'Food & Dining',
  'Transportation',
  'Shopping',
  'Entertainment',
  'Bills & Utilities',
  'Healthcare',
  'Education',
  'Travel',
  'Other',
];

export function AddExpenseForm({ onAddExpense }: AddExpenseFormProps) {
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [description, setDescription] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!amount || !category || !date) return;

    onAddExpense({
      id: Date.now().toString(),
      amount: parseFloat(amount),
      category,
      date,
      description,
    });

    setAmount('');
    setCategory('');
    setDate(new Date().toISOString().split('T')[0]);
    setDescription('');
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 pt-1">
      <div className="grid grid-cols-2 gap-3">
        <div className="space-y-1.5">
          <Label htmlFor="amount" className="text-xs text-muted-foreground uppercase tracking-wider">
            Amount ($)
          </Label>
          <Input
            id="amount"
            type="number"
            step="0.01"
            placeholder="0.00"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            required
          />
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="category" className="text-xs text-muted-foreground uppercase tracking-wider">
            Category
          </Label>
          <Select value={category} onValueChange={setCategory} required>
            <SelectTrigger id="category">
              <SelectValue placeholder="Select..." />
            </SelectTrigger>
            <SelectContent>
              {CATEGORIES.map((cat) => (
                <SelectItem key={cat} value={cat}>
                  {cat}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="space-y-1.5">
        <Label htmlFor="date" className="text-xs text-muted-foreground uppercase tracking-wider">
          Date
        </Label>
        <Input
          id="date"
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          required
        />
      </div>

      <div className="space-y-1.5">
        <Label htmlFor="description" className="text-xs text-muted-foreground uppercase tracking-wider">
          Note
        </Label>
        <Textarea
          id="description"
          placeholder="Optional note..."
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows={2}
        />
      </div>

      <Button type="submit" className="w-full">
        <Plus className="mr-1.5 h-4 w-4" />
        Add Expense
      </Button>
    </form>
  );
}

export { CATEGORIES };
