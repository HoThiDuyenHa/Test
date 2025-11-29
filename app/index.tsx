// App.tsx
import AppNavigator from "@/navigations/AppNavigator";
import { useEffect, useState } from "react";
import { ActivityIndicator, View } from "react-native";
import { initDatabase } from "../database/database";

export default function App() {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const start = async () => {
      await initDatabase();
      setReady(true);
    };
    start();
  }, []);

  if (!ready)
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" />
      </View>
    );

  return <AppNavigator />;
}
