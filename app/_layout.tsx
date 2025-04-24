import React from 'react';
import { Provider } from 'react-redux';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Stack } from "expo-router";
import './globals.css';

import store from '@/services/storage';

export default function RootLayout() {
  return (
    <SafeAreaView className="flex-1 bg-white">
      <Provider store={store}>
        <Stack screenOptions={{ headerShown: false }} />
      </Provider>
    </SafeAreaView>
  )
}
