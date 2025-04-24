import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { BudgetState, Expense } from '@/types/types';

const initialState: BudgetState = {
    initialAmount: 10000,
    currentBalance: 10000,
    endDate: new Date(new Date().setDate(new Date().getDate() + 30)),
    expenses: [],
};

const budgetSlice = createSlice({
    name: 'budget',
    initialState,
    reducers: {
      setBudget(state, action: PayloadAction<{ initialAmount: number; endDate: Date }>) {
        state.initialAmount = action.payload.initialAmount;
        state.currentBalance = action.payload.initialAmount;
        state.endDate = action.payload.endDate;
      },
      addExpense(state, action: PayloadAction<Expense>) {
        state.expenses.push(action.payload);
        state.currentBalance -= action.payload.amount;
      },
    },
  });
  
  export const { setBudget, addExpense } = budgetSlice.actions;
  export default budgetSlice.reducer;
