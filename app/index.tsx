import { Link } from "expo-router";
import { Text, View } from "react-native";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import Keyboard from "@/components/Keyboard";
import type { RootState, AppDispatch } from '@/services/storage';
import { addExpense } from "@/slices/slice";

export default function Index() {
  const [input, setInput] = useState("");
  const dispatch = useDispatch<AppDispatch>();

  const { currentBalance, dailyBudgetValue, endDate, expenses } = useSelector((state: RootState) => state.budget);

  let dailyBudgetDisplay = "Не задан";

  if (dailyBudgetValue >= 0) {
    dailyBudgetDisplay = dailyBudgetValue.toFixed(2)
  }

  const now = new Date();
  const finishDate = new Date(endDate);
  const timeDiff = finishDate.getTime() - now.getTime() + 1;
  const daysDiff = Math.ceil(timeDiff / (1000 * 3600 * 24)) + 1;

  const getDayLabel = (days: number): string => {
    if (days === 1) return "день";
    if ([2, 3, 4].includes(days % 10) && !(days % 100 >= 12 && days % 100 <= 14))
      return "дня";
    return "дней";
  };
        
  const func = () => {
      const amount = parseFloat(input);
      if (!isNaN(amount) && amount > 0) {
          const newExpense = {
              id: Date.now().toString(),
              amount,
              date: new Date().toISOString(),
          };
          dispatch(addExpense(newExpense));
          setInput("");
      }
  };

  return (
    <View className="flex-1 bg-white justify-between">
      <View>
        <View className="p-4">
          <View className="border-b-4 border-lines">
            <View className="flex-row justify-between items-center mb-4">
              <Link href={"/history"} className="text-accent text-xl">
                История
              </Link>
              <Link href={"/settings"} className="text-accent font-bold text-xl">
                {currentBalance.toFixed(2)} на {daysDiff} {getDayLabel(daysDiff)}
              </Link>
              {/* <Link href={"/clear"} className="text-accent font-bold text-xl">
                Clear
              </Link> */}
            </View>
          </View>  
        </View>
        <View className="p-4">
          <View className="border-b-4 border-lines">
            <View className="mb-8">
              <Text className="text-7xl text-black font-bold">
                {dailyBudgetDisplay}
              </Text>
              <Text className="text-lg text-primary">
                На сегодня
              </Text>
            </View>
          </View>
        </View>
      </View>
      <View>
        <View className="bg-white">
            <Text className="text-right text-7xl font-bold p-4 text-primary">{input || '0'}</Text>
        </View>
        <Keyboard func={func} input={input} setInput={setInput} />
      </View>
    </View>
  );
}
