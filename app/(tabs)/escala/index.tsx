import React from "react";
import { Button, Text, TextInput, View } from "react-native";
import { useForm, Controller } from "react-hook-form";
import { router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";

type FormData = {
  maxScore: string;
  minGrade: string;
  maxGrade: string;
  exigencia: string;
  passingScore: string;
};

export default function EscalaFormPage() {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: {
      maxScore: "10",
      minGrade: "1.0",
      maxGrade: "7.0",
      exigencia: "60",
      passingScore: "4.0",
    },
  });

  const onSubmit = (data: FormData) => {
    const maxScoreNum = parseFloat(data.maxScore);
    const minGradeNum = parseFloat(data.minGrade);
    const maxGradeNum = parseFloat(data.maxGrade);
    const exigenciaPercent = parseFloat(data.exigencia) / 100;
    const requiredScore = exigenciaPercent * maxScoreNum;
    const passingGradeProvided = parseFloat(data.passingScore);

    const scale: { score: number; grade: string }[] = [];

    for (let score = 1; score <= maxScoreNum; score++) {
      let calculatedGrade;
      if (score <= requiredScore) {
        calculatedGrade =
          minGradeNum +
          ((passingGradeProvided - minGradeNum) * score) / requiredScore;
      } else {
        calculatedGrade =
          passingGradeProvided +
          ((maxGradeNum - passingGradeProvided) * (score - requiredScore)) /
            (maxScoreNum - requiredScore);
      }
      scale.push({ score, grade: calculatedGrade.toFixed(2) });
    }

    router.push({
      pathname: "/escala/results",
      params: {
        scale: JSON.stringify(scale),
        requiredScore: requiredScore.toFixed(2),
        passingGrade: passingGradeProvided.toFixed(2),
      },
    });
  };

  return (
    <View className="flex-1 p-5 my-auto">
      <View className="mb-5">
        <Text className="mb-1">Puntaje total</Text>
        <Controller
          control={control}
          name="maxScore"
          rules={{ required: "Este campo es requerido" }}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              placeholder="Puntaje máximo"
              keyboardType="numeric"
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              className="border border-gray-300 rounded-md p-3 text-base"
            />
          )}
        />
        {errors.maxScore && (
          <Text className="text-red-500 mt-1">{errors.maxScore.message}</Text>
        )}
      </View>
      <View className="flex-row justify-between mb-5">
        <View className="flex-1 mr-2">
          <Text className="mb-1">Nota mínima</Text>
          <Controller
            control={control}
            name="minGrade"
            rules={{ required: "Este campo es requerido" }}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                placeholder="Nota mínima"
                keyboardType="numeric"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                className="border border-gray-300 rounded-md p-3 text-base"
              />
            )}
          />
          {errors.minGrade && (
            <Text className="text-red-500 mt-1">{errors.minGrade.message}</Text>
          )}
        </View>
        <View className="flex-1 ml-2">
          <Text className="mb-1">Nota máxima</Text>
          <Controller
            control={control}
            name="maxGrade"
            rules={{ required: "Este campo es requerido" }}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                placeholder="Nota máxima"
                keyboardType="numeric"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                className="border border-gray-300 rounded-md p-3 text-base"
              />
            )}
          />
          {errors.maxGrade && (
            <Text className="text-red-500 mt-1">{errors.maxGrade.message}</Text>
          )}
        </View>
      </View>
      <View className="flex-row justify-between mb-5">
        <View className="flex-1 mr-2">
          <Text className="mb-1">Nota Aprobatoria</Text>
          <Controller
            control={control}
            name="passingScore"
            rules={{ required: "Este campo es requerido" }}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                placeholder="Nota aprobatoria"
                keyboardType="numeric"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                className="border border-gray-300 rounded-md p-3 text-base"
              />
            )}
          />
          {errors.passingScore && (
            <Text className="text-red-500 mt-1">{errors.passingScore.message}</Text>
          )}
        </View>
        <View className="flex-1 ml-2">
          <Text className="mb-1">Exigencia (%)</Text>
          <Controller
            control={control}
            name="exigencia"
            rules={{ required: "Este campo es requerido" }}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                placeholder="Exigencia"
                keyboardType="numeric"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                className="border border-gray-300 rounded-md p-3 text-base"
              />
            )}
          />
          {errors.exigencia && (
            <Text className="text-red-500 mt-1">{errors.exigencia.message}</Text>
          )}
        </View>
      </View>
      <Button title="Calcular" onPress={handleSubmit(onSubmit)} />
    </View>
  );
}
