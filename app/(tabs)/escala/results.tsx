import React from "react";
import { SafeAreaView, ScrollView, Text, View } from "react-native";
import { useLocalSearchParams } from "expo-router";

export default function ResultsScreen() {
  const { scale } = useLocalSearchParams<{ scale?: string }>();
  const scaleData = scale ? JSON.parse(scale) : [];

  return (
    <SafeAreaView style={{ flex: 1, padding: 20, backgroundColor: "#fff" }}>
      <ScrollView>
        <View
          style={{
            flexDirection: "row",
            borderBottomWidth: 1,
            paddingBottom: 8,
            marginBottom: 8,
          }}
        >
          <Text style={{ flex: 1, fontWeight: "bold" }}>Puntaje</Text>
          <Text style={{ flex: 1, fontWeight: "bold" }}>Nota</Text>
        </View>

        {scaleData.map((item: { grade: number; score: string }, index: number) => (
          <View
            key={index}
            style={{
              flexDirection: "row",
              paddingVertical: 8,
              borderBottomWidth: 0.5,
              borderColor: "#ccc",
            }}
          >
            <Text style={{ flex: 1 }}>{item.score}</Text>
            <Text style={{ flex: 1 }}>{item.grade}</Text>
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}
