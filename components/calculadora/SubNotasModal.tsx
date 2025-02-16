import React from "react";
import { View, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { ThemedText } from "@/components/ui/ThemedText";
import ThemedTextInput from "@/components/ui/ThemedTextInput";
import { CustomButton } from "@/components/ui/CustomButton";
import MyModal from "@/components/modal";
import { ThemedCard } from "@/components/ui/ThemedCard";
import { SubNota } from "@/types/notas";

interface SubNotasModalProps {
  visible: boolean;
  subNotes: SubNota[];
  onClose: () => void;
  onChangeSubNote: (
    index: number,
    field: "value" | "percentage",
    text: string
  ) => void;
  onAddSubNote: () => void;
  onRemoveSubNote: (index: number) => void;
  onApplySubNotes: () => void;
  partialResult: number;
  partialPercentage: number;
}

const SubNotasModal = ({
  visible,
  subNotes,
  onClose,
  onChangeSubNote,
  onAddSubNote,
  onRemoveSubNote,
  onApplySubNotes,
  partialResult,
  partialPercentage,
}: SubNotasModalProps) => {
  return (
    <MyModal visible={visible} onClose={onClose}>
      <ThemedText type="subtitle" className="text-center mb-4 text-2xl">
        Dividir Nota
      </ThemedText>
      <ThemedText type="label">Resultado</ThemedText>
      <ThemedCard className="flex-row justify-between items-center p-3 bg-zinc-200">
        <ThemedText>{partialResult.toFixed(2)}</ThemedText>
        <ThemedText className="!text-gray-500">
          {partialPercentage.toFixed(0)}%
        </ThemedText>
      </ThemedCard>
      <ThemedText type="label">SubNotas</ThemedText>
      {subNotes.map((subNote, index) => (
        <View key={index} className="flex-row items-center gap-x-2 mb-2">
          <ThemedTextInput
            className="flex-1 bg-zinc-200"
            placeholder="Nota"
            keyboardType="number-pad"
            value={subNote.value}
            onChangeText={(text) => onChangeSubNote(index, "value", text)}
          />
          <ThemedTextInput
            className="w-1/4 bg-zinc-200"
            placeholder="%"
            keyboardType="number-pad"
            value={subNote.percentage}
            onChangeText={(text) => onChangeSubNote(index, "percentage", text)}
          />
          {index > 1 && (
            <TouchableOpacity
              onPress={() => onRemoveSubNote(index)}
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
        onPress={onAddSubNote}
        className="!bg-zinc-200"
      />
      <CustomButton title="Guardar" onPress={onApplySubNotes} />
    </MyModal>
  );
};

export default SubNotasModal;
