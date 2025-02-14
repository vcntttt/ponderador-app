import React, { useCallback, useEffect, useState } from "react";
import { View, TouchableOpacity } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect, useRouter } from "expo-router";
import { ThemedText } from "@/components/ui/ThemedText";
import { ESCALA_HISTORY_STORAGE_KEY } from "@/constants/storage";

export default function SavedScalesList() {
  const [scales, setScales] = useState<any[]>([]);
  const router = useRouter();

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
      <ThemedText className="my-4">Últimas escalas generadas</ThemedText>
      {scales.map((item, index) => (
        <TouchableOpacity
          key={index}
          className="mb-2 p-3 bg-white dark:bg-black/50 rounded-xl"
          onPress={() => handleNavigateTo(item)}
        >
          <ThemedText>
            {item.maxScoreNum} puntos | Incremento: +1
          </ThemedText>
        </TouchableOpacity>
      ))}
    </View>
  );
}
