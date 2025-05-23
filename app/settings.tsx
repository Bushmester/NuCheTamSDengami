import { Text, View, TouchableOpacity } from "react-native";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "expo-router";
import Keyboard from "@/components/Keyboard";
import DatePickModal from "@/components/DatePickModal";
import { setBudget } from "@/slices/slice";
import type { RootState, AppDispatch } from "@/services/storage";

export default function SettingsScreen() {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();

  const { currentBalance, endDate } = useSelector(
    (state: RootState) => state.budget
  );

  const [initialAmount, setInitialAmount] = useState(currentBalance.toString());
  const [selectedDate, setSelectedDate] = useState(new Date(endDate));
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    setInitialAmount(currentBalance.toString());
    setSelectedDate(new Date(endDate));
  }, [currentBalance, endDate]);

  const generateOptions = () => {
    const options = [];
    const today = new Date();
    for (let i = 1; i <= 42; i++) {
      const optionDate = new Date();
      optionDate.setDate(today.getDate() + (i - 1));

      let dayLabel: string;
      if (i === 1) {
        dayLabel = "день";
      } else if (
        (i % 10 >= 2 && i % 10 <= 4) &&
        !(i % 100 >= 12 && i % 100 <= 14)
      ) {
        dayLabel = "дня";
      } else {
        dayLabel = "дней";
      }

      const formattedDate =
        i === 1
          ? "Сегодня"
          : optionDate.toLocaleDateString("ru-RU", {
              day: "numeric",
              month: "long",
            });
      options.push({
        days: i,
        label: `${formattedDate} — ${i} ${dayLabel}`,
        date: optionDate,
      });
    }
    return options;
  };

  const options = generateOptions();

  const handleOptionSelect = (option: { days: number; label: string; date: Date }) => {
    setSelectedDate(option.date);
    setModalVisible(false);
  };

  const handleSubmit = () => {
    const amount = parseFloat(initialAmount);
    if (isNaN(amount) || amount <= 0) {
      alert("Введите корректную сумму бюджета");
      return;
    }

    dispatch(setBudget({ initialAmount: amount, endDate: selectedDate.toISOString() }));
    router.push("/");
  };

  const selectedOptionLabel =
    "по " +
    (options.find((o) => o.date.toDateString() === selectedDate.toDateString())?.label || "");

  return (
    <View className="flex-1 bg-white justify-between">
      <View>
        <View className="p-4">
            <View className="border-b-4 border-lines">
                <TouchableOpacity onPress={() => router.back()} className="items-end mb-4">
                    <Text className="text-accent font-bold text-xl">Назад</Text>
                </TouchableOpacity>
            </View>
        </View>

        <View className="p-4">
          <View className="border-b-4 border-lines">
            <View className="flex-row justify-between mb-14">
              <Text className="text-xl text-primary">Сумма</Text>
              <Text className="text-7xl text-black font-bold">
                {initialAmount || "0"}
              </Text>
            </View>
          </View>
        </View>

        <View className="flex-row justify-between p-4">
          <Text className="text-xl text-primary">Срок</Text>
          <TouchableOpacity onPress={() => setModalVisible(true)}>
            <Text className="text-xl text-accent font-bold">
              {selectedOptionLabel || "Выберите срок"}
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      <View>
        <Keyboard func={handleSubmit} input={initialAmount} setInput={setInitialAmount} />
        <DatePickModal
          modalVisible={modalVisible}
          setModalVisible={setModalVisible}
          options={options}
          handleOptionSelect={handleOptionSelect}
        />
      </View>
    </View>
  );
}
