import { View } from 'react-native'
import { ThemedText } from "@/components/ui/ThemedText";
import ThemedTextInput from "@/components/ui/ThemedTextInput";
import CustomButton from "@/components/ui/CustomButton";
import { Controller, useForm } from 'react-hook-form';
import { router } from 'expo-router';

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
    <View className="flex-1"> 
    <View className="mb-5">
      <ThemedText className="mb-1">Puntaje total</ThemedText>
      <Controller
        control={control}
        name="maxScore"
        rules={{ required: "Este campo es requerido" }}
        render={({ field: { onChange, onBlur, value } }) => (
          <ThemedTextInput
            autoFocus
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
        <ThemedText className="text-red-500 mt-1">
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
          rules={{ required: "Este campo es requerido" }}
          render={({ field: { onChange, onBlur, value } }) => (
            <ThemedTextInput
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
          <ThemedText className="text-red-500 mt-1">
            {errors.minGrade.message}
          </ThemedText>
        )}
      </View>
      <View className="flex-1 ml-2">
        <ThemedText className="mb-1">Nota máxima</ThemedText>
        <Controller
          control={control}
          name="maxGrade"
          rules={{ required: "Este campo es requerido" }}
          render={({ field: { onChange, onBlur, value } }) => (
            <ThemedTextInput
              placeholder="Nota máxima"
              keyboardType="numeric"
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              style={{
                color: "red",
              }}
              className="border border-gray-300 rounded-md p-3 text-base"
            />
          )}
        />
        {errors.maxGrade && (
          <ThemedText className="text-red-500 mt-1">
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
          rules={{ required: "Este campo es requerido" }}
          render={({ field: { onChange, onBlur, value } }) => (
            <ThemedTextInput
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
          <ThemedText className="text-red-500 mt-1">
            {errors.passingScore.message}
          </ThemedText>
        )}
      </View>
      <View className="flex-1 ml-2">
        <ThemedText className="mb-1">Exigencia (%)</ThemedText>
        <Controller
          control={control}
          name="exigencia"
          rules={{ required: "Este campo es requerido" }}
          render={({ field: { onChange, onBlur, value } }) => (
            <ThemedTextInput
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
          <ThemedText className="text-red-500 mt-1">
            {errors.exigencia.message}
          </ThemedText>
        )}
      </View>
    </View>
    <CustomButton title="Calcular" onPress={handleSubmit(onSubmit)} />
  </View>
  )
}
export default EscalaNotasForm