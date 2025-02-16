import { useState } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { NotaData, SubNota } from "@/types/notas";

type FormData = {
  notas: NotaData[];
};

export const useCalculadoraNotas = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedNoteIndex, setSelectedNoteIndex] = useState<number | null>(null);
  const [subNotes, setSubNotes] = useState<SubNota[]>([
    { value: "", percentage: "" },
    { value: "", percentage: "" },
  ]);
  const [exam, setExam] = useState<{ value: string; percentage: string } | null>(null);

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

  // Cálculo de resultado principal y porcentaje total
  const resultado = notasValues.reduce((acc, nota) => {
    const val = parseFloat(nota.value) || 0;
    const perc = parseFloat(nota.percentage) || 0;
    return acc + val * (perc / 100);
  }, 0);

  const porcentaje = notasValues.reduce((acc, nota) => {
    const perc = parseFloat(nota.percentage) || 0;
    return acc + perc;
  }, 0);

  // Cálculos parciales de subnotas
  const partialResult = subNotes.reduce((acc, sub) => {
    const val = parseFloat(sub.value) || 0;
    const perc = parseFloat(sub.percentage) || 0;
    return acc + val * (perc / 100);
  }, 0);

  const partialPercentage = subNotes.reduce(
    (acc, sub) => acc + (parseFloat(sub.percentage) || 0),
    0
  );

  // Funciones para manejar las subnotas
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

  // Aplica las subnotas al campo correspondiente
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

  // Abre la modal de subnotas, configurando el estado con subnotas existentes o valores por defecto
  const openSubNotasModal = (noteSubNotas: SubNota[] | undefined, index: number) => {
    setSelectedNoteIndex(index);
    if (noteSubNotas && noteSubNotas.length > 0) {
      setSubNotes(noteSubNotas);
    } else {
      setSubNotes([
        { value: "", percentage: "" },
        { value: "", percentage: "" },
      ]);
    }
    setModalVisible(true);
  };

  // Cálculo final considerando el examen (si existe)
  const examValue = exam ? parseFloat(exam.value) || 0 : 0;
  const examPercentage = exam ? parseFloat(exam.percentage) || 0 : 0;
  const finalResult = exam
    ? (resultado * (100 - examPercentage) + examValue * examPercentage) / 100
    : resultado;

  return {
    control,
    errors,
    fields,
    append,
    remove,
    modalVisible,
    setModalVisible,
    selectedNoteIndex,
    setSelectedNoteIndex,
    subNotes,
    handleSubNoteChange,
    addSubNote,
    removeSubNote,
    handleApplySubNotes,
    openSubNotasModal,
    exam,
    setExam,
    resultado,
    porcentaje,
    partialResult,
    partialPercentage,
    finalResult,
    notasValues,
  };
};
