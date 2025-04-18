import { Text, View, TouchableOpacity } from "react-native";
import React, { useRef } from "react";

type KeyboardProps = {
    calculationFunc?: () => void;
    input: string;
    setInput: React.Dispatch<React.SetStateAction<string>>;
};


export default function Keyboard({ calculationFunc, input, setInput }: KeyboardProps) {
    const deletionTimeoutRef = useRef<NodeJS.Timeout | null>(null);
    const deletionIntervalRef = useRef<NodeJS.Timeout | null>(null);

    // При зажатии кнопки "C" подождём 300 мс и запустим интервал удаления
    const startDeleteTimer = () => {
        deletionTimeoutRef.current = setTimeout(() => {
        deletionIntervalRef.current = setInterval(() => {
            setInput((prev) => (prev.length > 0 ? prev.slice(0, -1) : ""));
        }, 100); // интервал удаления (каждые 100 мс)
        }, 300); // задержка перед началом повторного удаления
    };

    const stopDeleteTimer = () => {
        if (deletionTimeoutRef.current) {
        clearTimeout(deletionTimeoutRef.current);
        deletionTimeoutRef.current = null;
        }
        if (deletionIntervalRef.current) {
        clearInterval(deletionIntervalRef.current);
        deletionIntervalRef.current = null;
        }
    };
    const handlePress = (value: string) => {
        if (value === "C") {
            if (input.length > 0) {
                setInput(input.slice(0, -1));
            } else {
                setInput("");
            }
        } else if (value === ".") {
            if (input === "") {
                setInput("0.");
            } else if (input.includes(".")) {
                return;
            } else {
                setInput(input + ".");
            }
        } else if (/^\d$/.test(value)) {
            if (input === "0") {
                if (value === "0") {
                    return;
                } else {
                    setInput(value);
                    return;
                }
            } else {
                setInput(input + value);
            }
        } else if (value === ">") {
            const amount = parseFloat(input);
            if (amount > 0) {
                if (!isNaN(amount)) {
                    calculationFunc && calculationFunc();
                    setInput("");
                }
            }
        } else {
            return;
        }
    };

    return (
        <View className="bg-white rounded-2xl p-3">
            <View className="flex-row justify-between mb-2">
                {["1", "2", "3", "C"].map((value, index) => (
                    <TouchableOpacity
                        key={index}
                        onPress={() => handlePress(value)}
                        onPressIn={value === "C" ? startDeleteTimer : undefined}
                        onPressOut={value === "C" ? stopDeleteTimer : undefined}
                        disabled={!value}
                        className={`rounded-2xl w-[90px] h-[90px] mx-1 items-center justify-center ${
                            value === "C" ? "bg-secondary" : "bg-primary"
                        }`}
                    >
                        <Text className="text-white text-center font-bold text-5xl">
                            {value}
                        </Text>
                    </TouchableOpacity>
                ))}
            </View>

            <View className="flex-row">
                <View className="flex-1">
                    <View className="flex-row justify-between mb-2">
                        {["4", "5", "6"].map((value, index) => (
                            <TouchableOpacity
                                key={index}
                                onPress={() => handlePress(value)}
                                disabled={!value}
                                className="bg-primary rounded-2xl w-[90px] h-[90px] mx-1 items-center justify-center"
                            >
                                <Text className="text-white text-center font-bold text-5xl">
                                    {value}
                                </Text>
                            </TouchableOpacity>
                        ))}
                    </View>
                    <View className="flex-row justify-between mb-2">
                        {["7", "8", "9"].map((value, index) => (
                            <TouchableOpacity
                                key={index}
                                onPress={() => handlePress(value)}
                                disabled={!value}
                                className="bg-primary rounded-2xl w-[90px] h-[90px] mx-1 items-center justify-center"
                            >
                                <Text className="text-white text-center font-bold text-5xl">
                                    {value}
                                </Text>
                            </TouchableOpacity>
                        ))}
                    </View>
                    <View className="flex-row justify-between">
                        <TouchableOpacity
                            onPress={() => handlePress("0")}
                            className="bg-primary rounded-2xl w-[190px] h-[90px] mx-1"
                        >
                            <View className="w-[90px] h-full items-center justify-center">
                                <Text className="text-white text-center font-bold text-5xl">
                                    0
                                </Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => handlePress(".")}
                            className="bg-primary rounded-2xl w-[90px] h-[90px] mx-1 items-center justify-center"
                        >
                            <Text className="text-white text-center font-bold text-5xl">
                            .
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <TouchableOpacity
                    onPress={() => handlePress(">")}
                    className="bg-accent rounded-2xl items-center justify-center mx-1 w-[90px] h-[285px]"
                >
                        <Text className="text-white text-center font-bold text-5xl">
                        &gt;
                        </Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};
