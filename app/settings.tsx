import { Text, View, TouchableOpacity } from "react-native";
import { useState } from "react";
import { useDispatch } from 'react-redux';

import Keyboard from "@/components/Keyboard";
import { setBudget } from "@/slices/slice";


export default function SettingsScreen () {
    const dispatch = useDispatch();

    const [initialAmount, setInitialAmount] = useState('');

    const handleSubmit = () => {
        const amount = parseFloat(initialAmount);
        if (isNaN(amount) || amount <= 0) {
          alert('Введите корректную сумму бюджета');
          return;
        }
    
        dispatch(setBudget({ initialAmount: amount }));
    };

    return (
        <View className="flex-1 bg-white justify-between">
            <View className="p-4 rounded-lg mb-4 bg-gray-800">
                <Text className="text-center text-2xl font-normal text-white">
                    {initialAmount || "0"}
                </Text>
            </View>
            <Keyboard func={handleSubmit} input={initialAmount} setInput={setInitialAmount} />
        </View>
    );
};
