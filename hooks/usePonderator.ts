import { useState } from "react";

export interface Nota {
  value: number;
  percentage: number;
}

export const usePonderator = () => {
  const [selectedNota, setSelectedNota] = useState<Nota | null>(null);
  const [notas, setNotas] = useState<Nota[]>([]);
  return {
    selectedNota,
    setSelectedNota,
    notas,
    setNotas,
  };
};
