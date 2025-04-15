import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React, { useState } from "react";

const SettingsScreen = () => {
    const [input, setInput] = useState("");

    const handlePress = (value: string) => {
        if (value === "C") {
            setInput("");
        } else if (value === ">") {
            if (input.length > 0) {
                const amount = parseFloat(input);
                if (!isNaN(amount)) {
                // Здесь можно добавить логику расчета
                setInput("");
                }
            }
        } else if (value === ".") {
            if (input === "") {
                setInput("0.");
            } else if (input.includes(".")) {
                return;
            } else {
                setInput(input + ".");
            }
        } else {
            if (/^\d$/.test(value)) {
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
            }
        }
    };
      

    return (
        <View className="mt-10 bg-white flex-1">
            <View className="p-4 rounded-lg mb-4 bg-gray-800">
                <Text className="text-center text-2xl font-normal text-white">
                    {input || "0"}
                </Text>
            </View>

            <View className="bg-white rounded-2xl p-3">
                <View className="flex-row justify-between mb-2">
                    {["1", "2", "3", "C"].map((value, index) => (
                        <TouchableOpacity
                            key={index}
                            onPress={() => handlePress(value)}
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
        </View>
    );
};

export default SettingsScreen;

const styles = StyleSheet.create({});
