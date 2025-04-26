import React from 'react';
import {
  Modal,
  View,
  Text,
  TouchableWithoutFeedback,
  TouchableOpacity,
  FlatList
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';


export default function DatePickModal({
    modalVisible,
    setModalVisible,
    options,
    handleOptionSelect,
  }: {
    modalVisible: boolean;
    setModalVisible: (visible: boolean) => void;
    options: { days: number; label: string;  date: Date }[];
    handleOptionSelect: (option: { days: number; label: string; date: Date }) => void;
  }) {
    return (
        <Modal
        visible={modalVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setModalVisible(false)}
      >
        <SafeAreaView
          className="flex-1 justify-center items-center"
        >
          <View className="bg-whiteSeccondary w-6/12 max-h-3/4 rounded-lg">
            <FlatList
              data={options}
              keyExtractor={(item) => item.days.toString()}
              renderItem={({ item }) => (
                <TouchableOpacity
                  onPress={() => handleOptionSelect(item)}
                  className="border-b border-primary p-4"
                >
                  <Text>{item.label}</Text>
                </TouchableOpacity>
              )}
            />
          </View>
        </SafeAreaView>
      </Modal>
    );
}