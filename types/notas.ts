export type NotaData = {
  value: string;
  percentage: string;
  subNotas?: SubNota[];
};

export type SubNota = {
  value: string;
  percentage: string;
};
