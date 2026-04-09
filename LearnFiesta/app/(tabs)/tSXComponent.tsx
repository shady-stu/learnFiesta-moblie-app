import React from "react";
import { View, Button } from "react-native";
import{ testFirebase } from "@/components/testFirebase";


const TestScreen: React.FC = () => {
  return (
    <View>
      <Button title="Test Firebase" onPress={testFirebase} />
    </View>
  );
};

export default TestScreen;