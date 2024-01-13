import React, { useEffect, useState, useCallback } from "react";
import { StyleSheet, View, StatusBar } from "react-native";
import TopNavigationBar from "./components/TopNavigationBar";

import { SafeAreaView } from "react-native-safe-area-context";
import { NativeBaseProvider } from "native-base";
import Context from "./API/Context";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { saveKey } from "./API/util";
import * as SplashScreen from "expo-splash-screen";

SplashScreen.preventAutoHideAsync();

export default function App() {
  const [appIsReady, setAppIsReady] = useState(false);

  useEffect(() => {
    async function prepare() {
      try {
        saveKey();
      } catch (e) {
        console.warn(e);
      } finally {
        setAppIsReady(true);
      }
    }

    prepare();
  }, []);

  const onLayoutRootView = useCallback(async () => {
    if (appIsReady) {
      await SplashScreen.hideAsync();
    }
  }, [appIsReady]);

  if (!appIsReady) {
    return null;
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Context>
        <SafeAreaView
          style={{
            flex: 1,
            backgroundColor: "#9edfe8",
          }}
          onLayout={onLayoutRootView}
        >
          <NativeBaseProvider>
            <StatusBar barStyle="dark-content" backgroundColor="#9edfe8" />
            <View
              style={{
                ...styles.container,
              }}
            >
              <TopNavigationBar />
            </View>
          </NativeBaseProvider>
        </SafeAreaView>
      </Context>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
