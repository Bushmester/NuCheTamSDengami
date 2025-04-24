export interface Expense {
    id: string;
    amount: number;
    // date: Date;
}
  
export interface BudgetState {
    initialAmount: number;
    currentBalance: number;
    // endDate: Date;
    expenses: Expense[];
}
