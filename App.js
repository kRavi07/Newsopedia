import React, { useEffect, useState } from "react";
import { StyleSheet, View, StatusBar } from "react-native";
import TopNavigationBar from "./components/TopNavigationBar";

import { SafeAreaView } from "react-native-safe-area-context";
import { NativeBaseProvider } from "native-base";
import Context from "./API/Context";
import { GestureHandlerRootView } from "react-native-gesture-handler";

export default function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Context>
        <SafeAreaView
          style={{
            flex: 1,
            backgroundColor: "#9edfe8",
          }}
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
