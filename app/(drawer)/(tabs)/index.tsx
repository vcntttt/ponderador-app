import React from "react";
import { TouchableOpacity, View, Pressable } from "react-native";
import { Controller } from "react-hook-form";
import { Ionicons } from "@expo/vector-icons";
import clsx from "clsx";
import { ThemedView } from "@/components/ui/ThemedView";
import { ThemedText } from "@/components/ui/ThemedText";
import ThemedTextInput from "@/components/ui/ThemedTextInput";
import { CustomButton } from "@/components/ui/CustomButton";
import { ThemedCard } from "@/components/ui/ThemedCard";
import SubNotasModal from "@/components/calculadora/SubNotasModal";
import { useCalculadoraNotas } from "@/hooks/useCalculadora";

const App = () => {
  const {
    control,
    errors,
    fields,
    append,
    remove,
    modalVisible,
    setModalVisible,
    openSubNotasModal,
    subNotes,
    handleSubNoteChange,
    addSubNote,
    removeSubNote,
    handleApplySubNotes,
    exam,
    setExam,
    resultado,
    porcentaje,
    partialResult,
    partialPercentage,
    finalResult,
    notasValues,
  } = useCalculadoraNotas();

  return (
    <ThemedView container className="flex-1">
      <SubNotasModal
        visible={modalVisible}
        subNotes={subNotes}
        onClose={() => setModalVisible(false)}
        onChangeSubNote={handleSubNoteChange}
        onAddSubNote={addSubNote}
        onRemoveSubNote={removeSubNote}
        onApplySubNotes={handleApplySubNotes}
        partialResult={partialResult}
        partialPercentage={partialPercentage}
      />

      <View
        className={clsx("flex-1 items-center gap-4 w-full", {
          "mt-32": 4 >= fields.length,
          "mt-24": fields.length === 5,
          "mt-16": fields.length === 6,
          "mt-2": fields.length >= 7,
        })}
      >
        {fields.length < 8 && (
          <ThemedText
            type="title"
            className={clsx({
              "mb-10": fields.length <= 5,
              "mb-2": fields.length > 5,
            })}
          >
            Calculadora
          </ThemedText>
        )}

        {fields.map((field, index) => {
          const note = notasValues[index];
          const isDivided =
            note &&
            note.subNotas &&
            note.subNotas.length > 0 &&
            note.subNotas[0].value !== "";
          return (
            <View key={field.id} className="flex-row items-center gap-x-2">
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
                onPress={() => openSubNotasModal(note?.subNotas, index)}
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
          title={fields.length === 8 ? "No hay espacio" : "Nueva nota"}
          onPress={() => {
            if (fields.length < 8) {
              append({ value: "", percentage: "" });
            }
          }}
          disabled={fields.length === 8}
        />

        <CustomButton
          title="Agregar examen"
          onPress={() => {
            if (!exam) {
              setExam({ value: "", percentage: "30" });
            }
          }}
          disabled={!!exam}
        />

        {exam && (
          <View className="flex-row items-center gap-x-2 mt-4">
            <View className="flex-1">
              <ThemedText type="label">Examen</ThemedText>
              <ThemedTextInput
                placeholder="Nota Examen"
                keyboardType="number-pad"
                value={exam.value}
                onChangeText={(text) =>
                  setExam((prev) => (prev ? { ...prev, value: text } : prev))
                }
              />
            </View>
            <View className="w-1/4">
              <ThemedText type="label">%</ThemedText>
              <ThemedTextInput
                placeholder="%"
                keyboardType="number-pad"
                value={exam.percentage}
                onChangeText={(text) =>
                  setExam((prev) =>
                    prev ? { ...prev, percentage: text } : prev
                  )
                }
              />
            </View>
            <TouchableOpacity
              onPress={() => setExam(null)}
              className="p-2 rounded-xl bg-red-700 ml-2"
            >
              <Ionicons name="trash-outline" size={24} color="white" />
            </TouchableOpacity>
          </View>
        )}
      </View>

      {/* {exam && (
        <ThemedText className="absolute bottom-16">
          Notas: {100 - (exam ? parseFloat(exam.percentage) || 0 : 0)}% -
          Examen: {exam?.percentage}
        </ThemedText>
      )} */}
      <View className="absolute bottom-4 flex-row items-center">
        <ThemedCard className="flex-1 flex-row items-center justify-between px-4">
          <ThemedText>{resultado.toFixed(2)}</ThemedText>
          <ThemedText className="!text-gray-500">
            {porcentaje.toFixed(0)}%
          </ThemedText>
        </ThemedCard>
        <View className="flex-row ml-2 gap-x-2">
          <Pressable
            className="p-2 bg-dark-primary rounded-xl active:bg-dark-secondary transition-colors mx-0"
            onPress={() => {
              append({ value: "", percentage: "" });
            }}
          >
            <Ionicons name="add-outline" size={20} color="white" />
          </Pressable>
          <Pressable
            className="p-2 bg-dark-primary rounded-xl active:bg-dark-secondary transition-colors mx-0"
            onPress={() => {
              if (!exam) {
                setExam({ value: "", percentage: "30" });
              }
            }}
            disabled={!!exam}
          >
            <Ionicons name="school-outline" size={20} color="white" />
          </Pressable>
        </View>
      </View>
      {errors.notas && (
        <ThemedText className="text-red-500 mt-1">
          {errors.notas.message}
        </ThemedText>
      )}
    </ThemedView>
  );
};

export default App;
