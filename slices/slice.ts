import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { BudgetState, Expense } from '@/types/types';

const initialState: BudgetState = {
    dailyBudgetValue: 0,
    currentBalance: 0,
    endDate: new Date(new Date().setDate(new Date().getDate() + 30)).toISOString(),
    expenses: [],
};

const budgetSlice = createSlice({
    name: 'budget',
    initialState,
    reducers: {
      setBudget(state, action: PayloadAction<{ initialAmount: number; endDate: string }>) {
        const currentBalance = action.payload.initialAmount;
        const endDate = action.payload.endDate
        const now = new Date();
        const finishDate = new Date(endDate);

        const timeDiff = finishDate.getTime() - now.getTime();
        const daysDiff = Math.ceil(timeDiff / (1000 * 3600 * 24)) + 1;

        const dailyBudgetValue = daysDiff > 0 ? currentBalance / daysDiff : 0;

        state.dailyBudgetValue = dailyBudgetValue
        state.currentBalance = currentBalance;
        state.endDate = endDate;
      },
      addExpense(state, action: PayloadAction<Expense>) {
        state.expenses.push(action.payload);
        if (state.currentBalance > 0) {
            state.currentBalance = Math.max(0, state.currentBalance - action.payload.amount);
        }
        if (state.dailyBudgetValue > 0) {
          state.dailyBudgetValue = Math.max(0, state.dailyBudgetValue - action.payload.amount);
        }
      },
    },
  });
  
  export const { setBudget, addExpense } = budgetSlice.actions;
  export default budgetSlice.reducer;
