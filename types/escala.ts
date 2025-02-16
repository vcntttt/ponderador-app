export interface EscalaParams {
  maxScore: string;
  minGrade: string;
  maxGrade: string;
  exigencia: string;
  passingScore: string;
  increment: string;
}

export interface Escala {
  score: number
  grade: string
  type: string
}

export interface SavedEscala {
  scale: Escala[]
  requiredScore: string
  passingGrade: string
  maxScoreNum: number
  increment: number
}