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

  const { currentBalance } = useSelector((state: RootState) => state.budget);
        
  const calculationFunc = () => {
      const amount = parseFloat(input);
      if (!isNaN(amount) && amount > 0) {
          const newExpense = {
              id: Date.now().toString(),
              amount,
              // date: new Date(),
          };
          dispatch(addExpense(newExpense));
          setInput("");
      }
  };

  return (
    <View className="flex-1 items-center justify-center bg-white">
      <Text className="text-5xl text-accent font-bold">
        Остатокк бюджета: {currentBalance.toFixed(2)}
      </Text>
      <Link href={"/settings"} className="text-accent">Settings</Link>
      <View className="mt-10 bg-white flex-1">
        <View className="p-4 rounded-lg mb-4 bg-gray-800">
          <Text className="text-center text-2xl font-normal text-white">
            {input || "0"}
          </Text>
        </View>
      
        <Keyboard calculationFunc={calculationFunc} input={input} setInput={setInput} />
      </View>
    </View>
  );
}
