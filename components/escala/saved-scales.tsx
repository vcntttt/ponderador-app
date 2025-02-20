import React, { useCallback, useEffect, useState } from "react";
import { View, TouchableOpacity } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router, useFocusEffect } from "expo-router";
import { ThemedText } from "@/components/ui/ThemedText";
import { ESCALA_HISTORY_STORAGE_KEY } from "@/constants/storage";
import { Ionicons } from "@expo/vector-icons";
import { useThemeContext } from "@/context/ThemeContext";
import { ThemedCard } from "../ui/ThemedCard";

export default function SavedScalesList() {
  const [scales, setScales] = useState<any[]>([]);
  const [isExpanded, setIsExpanded] = useState(false);
  const { currentTheme } = useThemeContext();

  const loadScales = useCallback(async () => {
    try {
      const dataString = await AsyncStorage.getItem(ESCALA_HISTORY_STORAGE_KEY);
      if (dataString) {
        setScales(JSON.parse(dataString));
      }
    } catch (error) {
      console.log("Error leyendo historial:", error);
    }
  }, []);

  useFocusEffect(
    useCallback(() => {
      loadScales();
    }, [loadScales])
  );

  function handleNavigateTo(scaleItem: any) {
    router.push({
      pathname: "/escala/results",
      params: {
        scale: JSON.stringify(scaleItem.scale),
        requiredScore: scaleItem.requiredScore,
        passingGrade: scaleItem.passingGrade,
        maxScoreNum: scaleItem.maxScoreNum,
        increment: scaleItem.increment,
      },
    });
  }

  if (!scales.length) {
    return (
      <View>
        <ThemedText>No hay escalas guardadas todavía</ThemedText>
      </View>
    );
  }
  return (
    <View>
      <TouchableOpacity
        className="my-4 flex-row items-center"
        onPress={() => setIsExpanded(!isExpanded)}
      >
        <ThemedText className="font-semibold flex-1">
          Últimas escalas generadas (3)
        </ThemedText>
        <Ionicons
          name={isExpanded ? "chevron-up" : "chevron-down"}
          size={16}
          color={currentTheme === "dark" ? "white" : "black"}
        />
      </TouchableOpacity>
      {isExpanded &&
        (scales.length ? (
          scales.map((item, index) => (
            <TouchableOpacity
              key={index}
              className="mb-3"
              onPress={() => handleNavigateTo(item)}
            >
              <ThemedCard className="p-3">
              <ThemedText>
                {item.maxScoreNum} puntos | Incremento: {item.increment}
              </ThemedText>
              </ThemedCard>
            </TouchableOpacity>
          ))
        ) : (
          <ThemedText>No hay escalas guardadas todavía</ThemedText>
        ))}
    </View>
  );
}
