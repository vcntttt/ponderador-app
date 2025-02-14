import React, { useState } from "react";
import { View } from "react-native";
import Slider from "@react-native-community/slider";
import { router } from "expo-router";
import { Controller, useForm } from "react-hook-form";
import { ThemedText } from "@/components/ui/ThemedText";
import ThemedTextInput from "@/components/ui/ThemedTextInput";
import { CustomButton } from "@/components/ui/CustomButton";
import { ThemedCard } from "@/components/ui/ThemedCard";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ESCALA_HISTORY_STORAGE_KEY } from "@/constants/storage";

async function saveNewScale(scale: any) {
  try {
    const dataString = await AsyncStorage.getItem(ESCALA_HISTORY_STORAGE_KEY);
    let lastScales = dataString ? JSON.parse(dataString) : [];

    lastScales.unshift(scale);

    lastScales = lastScales.slice(0, 3);

    await AsyncStorage.setItem(ESCALA_HISTORY_STORAGE_KEY, JSON.stringify(lastScales));
  } catch (error) {
    console.log("Error guardando la escala:", error);
  }
}

type FormData = {
  maxScore: string;
  minGrade: string;
  maxGrade: string;
  exigencia: string;
  passingScore: string;
  increment: string;
};

const EscalaNotasForm = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
    getValues,
  } = useForm<FormData>({
    defaultValues: {
      maxScore: "40",
      minGrade: "1.0",
      maxGrade: "7.0",
      exigencia: "60",
      passingScore: "4.0",
      increment: "1",
    },
  });

  const onSubmit = (data: FormData) => {
    const maxScoreNum = parseFloat(data.maxScore);
    const minGradeNum = parseFloat(data.minGrade);
    const maxGradeNum = parseFloat(data.maxGrade);
    const exigenciaPercent = parseFloat(data.exigencia) / 100;
    const requiredScore = exigenciaPercent * maxScoreNum;
    const passingGradeProvided = parseFloat(data.passingScore);
    const incrementNum = parseFloat(data.increment);

    const scale: { score: number; grade: string; type: string }[] = [];
    const steps = Math.round(maxScoreNum / incrementNum);

    for (let i = 0; i <= steps; i++) {
      const score = parseFloat((i * incrementNum).toFixed(1));
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
      scale.push({
        score,
        grade: calculatedGrade.toFixed(1),
        type: score <= requiredScore ? "reprobado" : "aprobado",
      });
    }
    
    
    console.log("🚀 ~ onSubmit ~ scale:", scale)

    saveNewScale({
      scale,
      requiredScore: requiredScore.toFixed(2),
      passingGrade: passingGradeProvided.toFixed(2),
      maxScoreNum,
      increment: incrementNum,
    });

    router.push({
      pathname: "/escala/results",
      params: {
        scale: JSON.stringify(scale),
        requiredScore: requiredScore.toFixed(2),
        passingGrade: passingGradeProvided.toFixed(2),
        maxScoreNum,
        increment: incrementNum,
      },
    });
  };

  return (
    <View>
      <View className="mb-5">
        <ThemedText className="mb-1">Puntaje total</ThemedText>
        <Controller
          control={control}
          name="maxScore"
          rules={{
            required: "Este campo es requerido",
            validate: (value) =>
              parseFloat(value) > 0 || "El puntaje total debe ser mayor a 0",
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <ThemedTextInput
              autoFocus
              placeholder="Puntaje máximo"
              keyboardType="number-pad"
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
            />
          )}
        />
        {errors.maxScore && (
          <ThemedText className="!text-red-500 mt-1">
            {errors.maxScore.message}
          </ThemedText>
        )}
      </View>
      <View className="flex-row justify-between mb-5">
        <View className="flex-1 mr-2">
          <ThemedText className="mb-1">Nota mínima</ThemedText>
          <Controller
            control={control}
            name="minGrade"
            rules={{
              required: "Este campo es requerido",
              validate: (value) => {
                const num = parseFloat(value);
                const maxGrade = parseFloat(getValues("maxGrade"));
                const passing = parseFloat(getValues("passingScore"));
                if (isNaN(num)) return "Debe ser un número";
                if (num >= passing)
                  return "La nota mínima debe ser menor que la nota aprobatoria";
                if (num >= maxGrade)
                  return "La nota mínima debe ser menor que la nota máxima";
                return true;
              },
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <ThemedTextInput
                placeholder="Nota mínima"
                keyboardType="number-pad"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
              />
            )}
          />
          {errors.minGrade && (
            <ThemedText className="!text-red-500 mt-1">
              {errors.minGrade.message}
            </ThemedText>
          )}
        </View>
        <View className="flex-1 ml-2">
          <ThemedText className="mb-1">Nota máxima</ThemedText>
          <Controller
            control={control}
            name="maxGrade"
            rules={{
              required: "Este campo es requerido",
              validate: (value) => {
                const num = parseFloat(value);
                const minGrade = parseFloat(getValues("minGrade"));
                const passing = parseFloat(getValues("passingScore"));
                if (isNaN(num)) return "Debe ser un número";
                if (num <= passing)
                  return "La nota máxima debe ser mayor que la nota aprobatoria";
                if (num <= minGrade)
                  return "La nota máxima debe ser mayor que la nota mínima";
                return true;
              },
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <ThemedTextInput
                placeholder="Nota máxima"
                keyboardType="number-pad"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
              />
            )}
          />
          {errors.maxGrade && (
            <ThemedText className="!text-red-500 mt-1">
              {errors.maxGrade.message}
            </ThemedText>
          )}
        </View>
      </View>
      <View className="flex-row justify-between mb-5">
        <View className="flex-1 mr-2">
          <ThemedText className="mb-1">Nota Aprobatoria</ThemedText>
          <Controller
            control={control}
            name="passingScore"
            rules={{
              required: "Este campo es requerido",
              validate: (value) => {
                const num = parseFloat(value);
                const minGrade = parseFloat(getValues("minGrade"));
                const maxGrade = parseFloat(getValues("maxGrade"));
                if (isNaN(num)) return "Debe ser un número";
                if (num <= minGrade)
                  return "La nota aprobatoria debe ser mayor que la nota mínima";
                if (num >= maxGrade)
                  return "La nota aprobatoria debe ser menor que la nota máxima";
                return true;
              },
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <ThemedTextInput
                placeholder="Nota aprobatoria"
                keyboardType="number-pad"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
              />
            )}
          />
          {errors.passingScore && (
            <ThemedText className="!text-red-500 mt-1">
              {errors.passingScore.message}
            </ThemedText>
          )}
        </View>
        <View className="flex-1 ml-2">
          <ThemedText className="mb-1">Exigencia (%)</ThemedText>
          <Controller
            control={control}
            name="exigencia"
            rules={{
              required: "Este campo es requerido",
              validate: (value) => {
                const num = parseFloat(value);
                if (isNaN(num)) return "Debe ser un número";
                if (num < 0 || num > 100)
                  return "La exigencia debe estar entre 0 y 100";
                return true;
              },
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <ThemedTextInput
                placeholder="Exigencia"
                keyboardType="number-pad"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
              />
            )}
          />
          {errors.exigencia && (
            <ThemedText className="!text-red-500 mt-1">
              {errors.exigencia.message}
            </ThemedText>
          )}
        </View>
      </View>
      <View className="mb-5">
        <ThemedText className="mb-1">
          Incremento
          {/* : {increment.toFixed(1)} */}
        </ThemedText>
        {/* <ThemedCard className="py-3 px-0"> */}
        <Controller
          control={control}
          name="increment"
          rules={{
            required: "Este campo es requerido",
            validate: (value) => {
              const num = parseFloat(value);
              if (isNaN(num)) return "Debe ser un número";
              if (num < 0 || num > 1)
                return "El increment debe estar entre 0 y 1";
              return true;
            },
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <ThemedTextInput
              placeholder="Incremento"
              keyboardType="number-pad"
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
            />
          )}
        />
        {errors.increment && (
          <ThemedText className="!text-red-500 mt-1">
            {errors.increment.message}
          </ThemedText>
        )}

        {/*
           // todo: Rueditas de bici
           <Slider
            minimumValue={0.1}
            maximumValue={1}
            step={0.1}
            value={increment}
            onValueChange={(val) => setIncrement(val)}
            minimumTrackTintColor="#1EB1FC"
            maximumTrackTintColor="#1EB1FC"
            thumbTintColor="#1EB1FC"
          /> 
          */}
        {/* </ThemedCard> */}
      </View>
      <CustomButton title="Calcular" onPress={handleSubmit(onSubmit)} />
    </View>
  );
};

export default EscalaNotasForm;
