import React, { useEffect } from 'react';
import { Provider } from 'react-redux';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Stack } from "expo-router";
import { PersistGate } from 'redux-persist/integration/react';
import { persistor } from '@/services/storage';
import './globals.css';
import { useDispatch } from 'react-redux';
import { recalcDailyBudget } from '@/slices/slice';

import store from '@/services/storage';

function AppWrapper({ children }: { children: React.ReactNode }) {
  const dispatch = useDispatch();

  useEffect(() => {
    const scheduleMidnightUpdate = () => {
      const now = new Date();
      const nextMidnight = new Date(now);
      nextMidnight.setHours(24, 0, 0, 0);
      const delay = nextMidnight.getTime() - now.getTime();

      const timeoutId = setTimeout(() => {
        dispatch(recalcDailyBudget());
        scheduleMidnightUpdate();
      }, delay);

      return timeoutId;
    };

    const timeoutId = scheduleMidnightUpdate();

    return () => clearTimeout(timeoutId);
  }, [dispatch]);

  return <>{children}</>;
}

export default function RootLayout() {
  return (
    <SafeAreaView className="flex-1 bg-white">
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <AppWrapper>
            <Stack screenOptions={{ headerShown: false }} />
          </AppWrapper>
        </PersistGate>
      </Provider>
    </SafeAreaView>
  )
}
