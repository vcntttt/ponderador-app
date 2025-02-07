import { View } from "react-native";
import { router } from "expo-router";
import { Controller, useForm } from "react-hook-form";
import { ThemedText } from "@/components/ui/ThemedText";
import ThemedTextInput from "@/components/ui/ThemedTextInput";
import CustomButton from "@/components/ui/CustomButton";

type FormData = {
  maxScore: string;
  minGrade: string;
  maxGrade: string;
  exigencia: string;
  passingScore: string;
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
    },
  });

  const onSubmit = (data: FormData) => {
    const maxScoreNum = parseFloat(data.maxScore);
    const minGradeNum = parseFloat(data.minGrade);
    const maxGradeNum = parseFloat(data.maxGrade);
    const exigenciaPercent = parseFloat(data.exigencia) / 100;
    const requiredScore = exigenciaPercent * maxScoreNum;
    const passingGradeProvided = parseFloat(data.passingScore);

    const scale: { score: number; grade: string; type: string }[] = [];

    for (let score = 0; score <= maxScoreNum; score++) {
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
    <View className="flex-1">
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
      <CustomButton title="Calcular" onPress={handleSubmit(onSubmit)} />
    </View>
  );
};
export default EscalaNotasForm;
