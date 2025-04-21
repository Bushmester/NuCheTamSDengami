import { Text, View, TouchableOpacity } from "react-native";
import { useState } from "react";

import Keyboard from "@/components/Keyboard";

export default function SettingsScreen () {
    const [input, setInput] = useState("");

    const calculationFunc = () => {
        alert('SETTINGS!!!')
    };

    return (
        <View className="mt-10 bg-white flex-1">
            <View className="p-4 rounded-lg mb-4 bg-gray-800">
                <Text className="text-center text-2xl font-normal text-white">
                    {input || "0"}
                </Text>
            </View>
            <Keyboard calculationFunc={calculationFunc} input={input} setInput={setInput} />
        </View>
    );
};
