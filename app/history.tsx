import React from "react";
import { View, Text, FlatList, TouchableOpacity } from "react-native";
import { useSelector } from "react-redux";
import type { RootState } from "@/services/storage";
import { useRouter } from "expo-router";


export default function ExpenseHistoryScreen() {
    const router = useRouter();
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
            <View className="p-4">
                <View className="border-b-4 border-lines">
                    <Text className="text-7xl text-black font-bold">{item.amount.toFixed(2)}</Text>
                    <Text className="text-lg text-secondary mb-4">{expenseDate}</Text>
                </View>
            </View>
        );
    };

  return (
    <View className="flex-1 bg-white justify-between">
        <View className="p-4">
            <View className="border-b-4 border-lines">
                <TouchableOpacity onPress={() => router.back()} className="items-end mb-4">
                    <Text className="text-accent font-bold text-xl">Назад</Text>
                </TouchableOpacity>
            </View>
        </View>
        <FlatList
            data={sortedExpenses}
            keyExtractor={(item) => item.id}
            renderItem={renderExpenseItem}
            ListEmptyComponent={() => (
            <View className="p-4">
                <Text className="text-center text-secondary">Записей нет</Text>
            </View>
            )}
        />
    </View>
  );
}
