export interface Expense {
    id: string;
    amount: number;
    date: string;
}
  
export interface BudgetState {
    dailyBudgetValue: number;
    currentBalance: number;
    endDate: string;
    expenses: Expense[];
}
