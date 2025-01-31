import { Link, router } from "expo-router";
import { Button, SafeAreaView, Text, TextInput, View } from "react-native";
import { useForm, Controller } from "react-hook-form";

export default function TabTwoScreen() {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data: any) => {
    console.log(data);
    // router.push("/escala/results");
  };

  return (
    <SafeAreaView className="p-5">
      <View className="grid grid-cols-5 grid-rows-5 gap-4">
        <TextInput
          className="border border-gray-300 rounded-md p-2"
          placeholder="Puntaje máximo"
        />
        <TextInput
          className="border border-gray-300 rounded-md p-2"
          placeholder="Puntaje mínimo"
        />
        <TextInput
          className="border border-gray-300 rounded-md p-2 row-start-2"
          placeholder="Puntaje máximo"
        />
        <TextInput
          className="border border-gray-300 rounded-md p-2 row-start-2"
          placeholder="Puntaje mínimo"
        />
      </View>
        <View className="border-t border-gray-300 my-10" />
      <View className="flex flex-col gap-4">
        <View>
          <Controller
            control={control}
            rules={{
              required: {
                value: true,
                message: "Este campo es requerido",
              },
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                placeholder="Puntaje máximo"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                className="border border-gray-300 rounded-md p-2"
              />
            )}
            name="maxScore"
          />
          {errors.maxScore && (
            <Text className="text-red-500 text-sm">
              {String(errors.maxScore.message)}
            </Text>
          )}
        </View>

        <View>
          <Controller
            control={control}
            rules={{
              required: {
                value: true,
                message: "Este campo es requerido",
              },
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                placeholder="Nota mínima"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                className="border border-gray-300 rounded-md p-2"
              />
            )}
            name="minScore"
          />
          {errors.minScore && (
            <Text className="text-red-500 text-sm">
              {String(errors.minScore.message)}
            </Text>
          )}
        </View>

        <Button title="Calcular" onPress={handleSubmit(onSubmit)} />
      </View>
    </SafeAreaView>
  );
}
