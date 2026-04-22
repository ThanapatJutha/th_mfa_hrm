export type EvaluationPeriod = "Q1" | "Q2" | "Q3" | "Q4" | "Annual";
export type EvaluationGrade = "A" | "B" | "C" | "D";

export interface Evaluation {
    id: string;
    employeeId: string;
    year: number;
    period: EvaluationPeriod;
    score: number; // 0–100
    grade: EvaluationGrade;
    comment: string;
    reviewerId: string;
    createdAt: string; // ISO date string
    updatedAt: string; // ISO date string
}

export interface PerformanceState {
    evaluations: Evaluation[];
}
