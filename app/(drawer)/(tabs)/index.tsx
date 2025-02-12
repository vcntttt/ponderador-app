import React, { useState } from "react";
import { TouchableOpacity, View } from "react-native";
import { Controller, useForm, useFieldArray } from "react-hook-form";
import { Ionicons } from "@expo/vector-icons";
import { ThemedView } from "@/components/ui/ThemedView";
import { ThemedText } from "@/components/ui/ThemedText";
import ThemedTextInput from "@/components/ui/ThemedTextInput";
import CustomButton from "@/components/ui/CustomButton";
import MyModal from "@/components/calculadora/modal";
import clsx from "clsx";

type SubNota = {
  value: string;
  percentage: string;
};

type NotaData = {
  value: string;
  percentage: string;
  subNotas?: SubNota[];
};

type FormData = {
  notas: NotaData[];
};

const App = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedNoteIndex, setSelectedNoteIndex] = useState<number | null>(
    null
  );
  const [subNotes, setSubNotes] = useState<SubNota[]>([
    { value: "", percentage: "" },
    { value: "", percentage: "" },
  ]);

  const {
    control,
    watch,
    setValue,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: {
      notas: [
        { value: "", percentage: "" },
        { value: "", percentage: "" },
      ],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "notas",
  });

  const notasValues = watch("notas");

  const resultado = notasValues.reduce((acc, nota) => {
    const val = parseFloat(nota.value) || 0;
    const perc = parseFloat(nota.percentage) || 0;
    return acc + val * (perc / 100);
  }, 0);

  const porcentaje = notasValues.reduce((acc, nota) => {
    const perc = parseFloat(nota.percentage) || 0;
    return acc + perc;
  }, 0);

  const partialResult = subNotes.reduce((acc, sub) => {
    const val = parseFloat(sub.value) || 0;
    const perc = parseFloat(sub.percentage) || 0;
    return acc + val * (perc / 100);
  }, 0);
  const partialPercentage = subNotes.reduce((acc, sub) => {
    return acc + (parseFloat(sub.percentage) || 0);
  }, 0);

  const closeModal = () => setModalVisible(false);

  const handleSubNoteChange = (
    index: number,
    field: "value" | "percentage",
    text: string
  ) => {
    setSubNotes((prev) => {
      const newSubNotes = [...prev];
      newSubNotes[index] = { ...newSubNotes[index], [field]: text };
      return newSubNotes;
    });
  };

  const addSubNote = () => {
    setSubNotes((prev) => [...prev, { value: "", percentage: "" }]);
  };

  const removeSubNote = (index: number) => {
    setSubNotes((prev) => prev.filter((_, i) => i !== index));
  };

  const handleApplySubNotes = () => {
    const weightedAverage = subNotes.reduce((acc, sub) => {
      const val = parseFloat(sub.value) || 0;
      const perc = parseFloat(sub.percentage) || 0;
      return acc + val * (perc / 100);
    }, 0);
    if (selectedNoteIndex !== null) {
      setValue(`notas.${selectedNoteIndex}.value`, weightedAverage.toFixed(1));
      setValue(`notas.${selectedNoteIndex}.subNotas`, subNotes);
    }
    setModalVisible(false);
  };

  return (
    <ThemedView container safe className="flex-1">
      <MyModal visible={modalVisible} onClose={closeModal}>
        <ThemedText type="subtitle" className="text-center mb-4 text-2xl">
          Dividir Nota
        </ThemedText>
        <ThemedText type="label">Resultado</ThemedText>
        <ThemedView
          card
          className="flex-row justify-between items-center p-3 bg-zinc-200"
        >
          <ThemedText>{partialResult.toFixed(2)}</ThemedText>
          <ThemedText className="!text-gray-500">
            {partialPercentage.toFixed(0)}%
          </ThemedText>
        </ThemedView>
        <ThemedText type="label">SubNotas</ThemedText>
        {subNotes.map((subNote, index) => (
          <View key={index} className="flex-row items-center gap-x-2 mb-2">
            <ThemedTextInput
              className="flex-1 bg-zinc-200"
              placeholder="Nota"
              keyboardType="number-pad"
              value={subNote.value}
              onChangeText={(text) => handleSubNoteChange(index, "value", text)}
            />
            <ThemedTextInput
              className="w-1/4 bg-zinc-200"
              placeholder="%"
              keyboardType="number-pad"
              value={subNote.percentage}
              onChangeText={(text) =>
                handleSubNoteChange(index, "percentage", text)
              }
            />
            {index > 1 && (
              <TouchableOpacity
                onPress={() => removeSubNote(index)}
                className="p-2 rounded-xl bg-red-700 ml-2"
              >
                <Ionicons name="trash-outline" size={24} color="white" />
              </TouchableOpacity>
            )}
          </View>
        ))}
        <CustomButton
          type="outline"
          title="Agregar Nota"
          onPress={addSubNote}
          className="!bg-zinc-200"
        />
        <CustomButton title="Guardar" onPress={handleApplySubNotes} />
      </MyModal>

      <View className="flex-1 items-center mt-24 gap-4 w-full px-4">
        <ThemedText type="title" className="mb-10">
          Calculadora
        </ThemedText>

        {fields.map((field, index) => {
          const note = notasValues[index];
          const isDivided =
            note &&
            note.subNotas &&
            note.subNotas.length > 0 &&
            note.subNotas[0].value !== "";
          return (
            <View key={field.id} className="flex-row items-center gap-x-2 mb-4">
              <Controller
                control={control}
                name={`notas.${index}.value`}
                rules={{ required: "Este campo es requerido" }}
                render={({ field: { onChange, onBlur, value } }) => (
                  <ThemedTextInput
                    className="flex-1"
                    placeholder="Nota"
                    keyboardType="number-pad"
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
                    className="w-1/4"
                    placeholder="%"
                    keyboardType="number-pad"
                    onBlur={onBlur}
                    onChangeText={onChange}
                    value={value}
                  />
                )}
              />
              <TouchableOpacity
                onPress={() => {
                  setSelectedNoteIndex(index);
                  const noteSubNotas = note?.subNotas;
                  if (noteSubNotas && noteSubNotas.length > 0) {
                    setSubNotes(noteSubNotas);
                  } else {
                    setSubNotes([
                      { value: "", percentage: "" },
                      { value: "", percentage: "" },
                    ]);
                  }
                  setModalVisible(true);
                }}
                className={clsx("p-2 rounded-xl", {
                  "bg-light-primary dark:bg-dark-primary": isDivided,
                  "bg-white dark:bg-black/50": !isDivided,
                })}
              >
                <Ionicons
                  name="layers-outline"
                  size={24}
                  className={clsx("dark:!text-dark-text", {
                    "!text-dark-text": isDivided,
                    "!text-light-text": !isDivided,
                  })}
                />
              </TouchableOpacity>
              {index > 1 && (
                <TouchableOpacity
                  onPress={() => remove(index)}
                  className="p-2 rounded-xl bg-red-700 ml-2"
                >
                  <Ionicons name="trash-outline" size={24} color="white" />
                </TouchableOpacity>
              )}
            </View>
          );
        })}

        <CustomButton
          title="Nueva Nota"
          onPress={() => append({ value: "", percentage: "" })}
        />
      </View>

      <ThemedView
        card
        className="absolute bottom-4 mx-4 flex-row justify-between items-center"
      >
        <ThemedText> {resultado.toFixed(2)}</ThemedText>
        <ThemedText className="!text-gray-500">
          {porcentaje.toFixed(0)}%
        </ThemedText>
      </ThemedView>
      {errors.notas && (
        <ThemedText className="text-red-500 mt-1">
          {errors.notas.message}
        </ThemedText>
      )}
    </ThemedView>
  );
};

export default App;
