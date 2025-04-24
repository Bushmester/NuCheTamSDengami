import React from 'react';
import { Provider } from 'react-redux';
import store from '@/services/storage';
import { Stack } from "expo-router";
import './globals.css';

export default function RootLayout() {
  return (
    <Provider store={store}>
      <Stack />
    </Provider>
  )
}
