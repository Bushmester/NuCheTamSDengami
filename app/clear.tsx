import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { persistor } from '@/services/storage';
import { useDispatch } from "react-redux";
import { resetBudget } from "@/slices/slice";

export default function ClearDataButton() {
  const dispatch = useDispatch();

  const handleClearAll = async () => {
    try {
      await AsyncStorage.clear();
      await persistor.purge();
      dispatch(resetBudget());
      console.log("Хранилище и Redux-состояние очищены");
    } catch (error) {
      console.error("Ошибка при полном сбросе данных:", error);
    }
  };

  return (
    <View style={{ padding: 16 }}>
      <TouchableOpacity onPress={handleClearAll} style={{ padding: 12, backgroundColor: 'red', borderRadius: 8 }}>
        <Text style={{ color: 'white', textAlign: 'center' }}>Сбросить данные</Text>
      </TouchableOpacity>
    </View>
  );
}
