import React, { useState } from "react";
import { ScrollView, View } from "react-native";
import { Controller, useForm, useFieldArray } from "react-hook-form";
import { ThemedView } from "@/components/ui/ThemedView";
import CustomButton from "@/components/ui/CustomButton";
import { ThemedText } from "@/components/ui/ThemedText";
import ThemedTextInput from "@/components/ui/ThemedTextInput";
import MyModal from "@/components/calculadora/modal";
import { Nota, usePonderator } from "@/hooks/usePonderator";

// Definimos la estructura de nuestro formulario.
// Cada nota es un objeto con 'value' y 'percentage' como strings.
type FormData = {
  notas: {
    value: string;
    percentage: string;
  }[];
};

const App = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const {
    control,
    watch,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: {
      // Comenzamos con dos notas por defecto.
      notas: [
        { value: "", percentage: "" },
        { value: "", percentage: "" },
      ],
    },
  });

  // useFieldArray nos permite manejar el array de notas.
  const { fields, append } = useFieldArray({
    control,
    name: "notas",
  });

  const { selectedNota, setSelectedNota, notas, setNotas } = usePonderator();

  const closeModal = () => setModalVisible(false);

  const notasValues = watch("notas");

  // Nota final = Σ (nota * (porcentaje/100))
  const resultado = notasValues.reduce((acc, nota) => {
    const value = parseFloat(nota.value) || 0;
    const percentage = parseFloat(nota.percentage) || 0;
    return acc + value * (percentage / 100);
  }, 0);

  return (
    <ThemedView container safe>
      <MyModal visible={modalVisible} onClose={closeModal} />
      <View className="flex-1 items-center justify-center gap-4 w-full px-4">
        <ThemedText type="title" className="mb-10">
          Calculadora
        </ThemedText>

          {fields.map((field, index) => (
            <View key={field.id} className="flex-row gap-x-4">
              <Controller
                control={control}
                name={`notas.${index}.value`}
                rules={{ required: "Este campo es requerido" }}
                render={({ field: { onChange, onBlur, value } }) => (
                  <ThemedTextInput
                    className="w-2/3"
                    placeholder={`Nota`}
                    keyboardType="numeric"
                    onBlur={onBlur}
                    onChangeText={onChange}
                    value={value}
                  />
                )}
              />
              <Controller
                control={control}
                name={`notas.${index}.percentage`}
                rules={{ required: "Este campo es requerido" }}
                render={({ field: { onChange, onBlur, value } }) => (
                  <ThemedTextInput
                    className="w-1/3"
                    placeholder={`%`}
                    keyboardType="numeric"
                    onBlur={onBlur}
                    onChangeText={onChange}
                    value={value}
                  />
                )}
              />
            </View>
          ))}

        <CustomButton
          title="Nueva Nota"
          onPress={() => append({ value: "", percentage: "" })}
        />
      </View>

      <ThemedText type="card" className="absolute bottom-4 mx-4">
        Resultado: {resultado.toFixed(2)}
      </ThemedText>
    </ThemedView>
  );
};

export default App;
