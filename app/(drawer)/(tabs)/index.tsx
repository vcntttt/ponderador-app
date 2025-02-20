import React, { useEffect } from "react";
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
import { useNavigation } from "expo-router";

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
    finalResult,
    porcentaje,
    partialResult,
    partialPercentage,
    notasValues,
  } = useCalculadoraNotas();

  const navigation = useNavigation();

  useEffect(() => {
    navigation.setOptions({
      headerTitle: fields.length >= 8 ? "Calculadora" : "",
    });
  }, [fields.length]);

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
                  "border-[1px] border-black/30 dark:border-white/50": !isDivided,
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
                  className="p-2 rounded-xl bg-red-700"
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

        {!exam && (
          <CustomButton
            title="Agregar examen"
            onPress={() => {
              if (!exam) {
                setExam({ value: "", percentage: "30" });
              }
            }}
          />
        )}
      </View>

      <View className="absolute bottom-2 w-full gap-y-2">
        {exam && (
          <View>
            <ThemedText type="label">Examen</ThemedText>
            <View className="flex-row items-center gap-x-2">
              <ThemedTextInput
                className="flex-1"
                placeholder="Nota"
                keyboardType="number-pad"
                value={exam.value}
                onChangeText={(text) =>
                  setExam((prev) => (prev ? { ...prev, value: text } : prev))
                }
              />
              <ThemedTextInput
                className="w-1/4"
                placeholder="%"
                keyboardType="number-pad"
                value={exam.percentage}
                onChangeText={(text) =>
                  setExam((prev) =>
                    prev ? { ...prev, percentage: text } : prev
                  )
                }
              />
              <TouchableOpacity
                onPress={() => setExam(null)}
                className="p-2 rounded-xl bg-red-700"
              >
                <Ionicons name="trash-outline" size={24} color="white" />
              </TouchableOpacity>
            </View>
          </View>
        )}
        <View className="flex-row items-center">
          <ThemedCard className="flex-1 flex-row items-center justify-between px-4">
            <ThemedText>{finalResult.toFixed(2)}</ThemedText>
            <ThemedText className="!text-gray-500">
              {porcentaje.toFixed(0)}%
            </ThemedText>
          </ThemedCard>
          {/* <View className="flex-row ml-2 gap-x-2">
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
        </View> */}
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
