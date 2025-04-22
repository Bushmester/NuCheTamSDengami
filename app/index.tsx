import { Link } from "expo-router";
import { Text, View } from "react-native";
import { useState } from "react";

import { useBudget } from "@/contexts/context";
import Keyboard from "../components/Keyboard";

export default function Index() {
  const [input, setInput] = useState("");
  const { state, dispatch } = useBudget();
        
  const calculationFunc = () => {
      const amount = parseFloat(input);
      console.log("Новый расход:", amount);
      if (!isNaN(amount) && amount > 0) {
          const newExpense = {
              id: Date.now().toString(),
              amount,
              date: new Date(),
          };
          dispatch({ type: "ADD_EXPENSE", payload: newExpense });
          setInput("");
          console.log("Новый currentBalance:", state.currentBalance);
      }
  };

  return (
    <View className="flex-1 items-center justify-center bg-white">
      <Text className="text-5xl text-accent font-bold">
        Остатокк бюджета: {state.currentBalance.toFixed(2)}
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
    // <View className="bg-blue-500 p-4">
    //   <Text className="text-white text-xl">Test Component</Text>
    // </View>
  );
}
