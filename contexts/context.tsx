// /src/contexts/BudgetContext.tsx

import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { BudgetState, Expense } from '@/types/types';
import { loadBudgetState, saveBudgetState } from '@/services/storage';

type BudgetAction =
    | { type: 'SET_BUDGET'; payload: { initialAmount: number; endDate: Date } }
    | { type: 'ADD_EXPENSE'; payload: Expense }

const initialState: BudgetState = {
    initialAmount: 10000,
    currentBalance: 10000,
    endDate: new Date(new Date().setDate(new Date().getDate() + 30)),
    expenses: [],
};

const BudgetContext = createContext<{
    state: BudgetState;
    dispatch: React.Dispatch<BudgetAction>;
}>(
    { state: initialState, dispatch: () => null }
);

function budgetReducer(state: BudgetState, action: BudgetAction): BudgetState {
    switch (action.type) {
        case 'SET_BUDGET':
            return { 
                ...state, 
                initialAmount: action.payload.initialAmount, 
                currentBalance: action.payload.initialAmount, 
                endDate: action.payload.endDate 
            };
        case 'ADD_EXPENSE':
            return { 
                ...state, 
                expenses: [...state.expenses, action.payload],
                currentBalance: state.currentBalance - action.payload.amount,
            };
        default:
            return state;
    }
}

export const BudgetProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [state, dispatch] = useReducer(budgetReducer, initialState);

    useEffect(() => {
        (async () => {
            const savedState = await loadBudgetState();
            if (savedState) {
                // Можно добавить action, чтобы заполнить initialState
                // Или дополнительный case в reducer для инициализации
                dispatch({ type: 'SET_BUDGET', payload: { initialAmount: savedState.initialAmount, endDate: new Date(savedState.endDate) } });
                // Также можно перезаписать непосредственно expenses
            }
        })();
    }, []);

    useEffect(() => {
        saveBudgetState(state);
    }, [state]);

    return (
        <BudgetContext.Provider value={{ state, dispatch }}>
        {children}
        </BudgetContext.Provider>
    );
};

export const useBudget = () => useContext(BudgetContext);
