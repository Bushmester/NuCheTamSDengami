import React from "react";
import { View, Text, FlatList } from "react-native";
import { useSelector } from "react-redux";
import type { RootState } from "@/services/storage";

export default function ExpenseHistoryScreen() {
  const expenses = useSelector((state: RootState) => state.budget.expenses);

  const sortedExpenses = expenses.slice().sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  const renderExpenseItem = ({ item }: { item: any }) => {
    // Форматирование даты
    const expenseDate = new Date(item.date).toLocaleDateString("ru-RU", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
    return (
      <View className="p-4 border-b border-gray-200">
        <Text className="text-lg font-bold">{item.amount.toFixed(2)}</Text>
        <Text className="text-sm text-gray-600">{expenseDate}</Text>
      </View>
    );
  };

  return (
    <View className="flex-1 bg-white">
      <Text className="text-2xl font-bold text-center p-4">
        История трат
      </Text>
      <FlatList
        data={sortedExpenses}
        keyExtractor={(item) => item.id}
        renderItem={renderExpenseItem}
        ListEmptyComponent={() => (
          <View className="p-4">
            <Text className="text-center text-gray-500">Записей нет</Text>
          </View>
        )}
      />
    </View>
  );
}
