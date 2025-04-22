import AsyncStorage from '@react-native-async-storage/async-storage';
import { BudgetState } from '@/types/types';
import { STORAGE_KEY } from '@/constants/StorageKeys';

export const saveBudgetState = async (state: BudgetState) => {
    try {
        await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch (error) {
        console.error('Ошибка сохранения бюджета', error);
    }
  };
  
export const loadBudgetState = async (): Promise<BudgetState | null> => {
    try {
        const data = await AsyncStorage.getItem(STORAGE_KEY);
        return data ? JSON.parse(data) : null;
    } catch (error) {
        console.error('Ошибка загрузки бюджета', error);
        return null;
    }
};

