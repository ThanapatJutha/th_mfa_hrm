import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { mockEvaluations } from "@/mock/performance";
import type { Evaluation, PerformanceState } from "@/features/performance/types/performance.types";

const initialState: PerformanceState = {
    evaluations: mockEvaluations,
};

const performanceSlice = createSlice({
    name: "performance",
    initialState,
    reducers: {
        addEvaluation(state, action: PayloadAction<Evaluation>) {
            state.evaluations.push(action.payload);
        },
        updateEvaluation(state, action: PayloadAction<Evaluation>) {
            const idx = state.evaluations.findIndex((e) => e.id === action.payload.id);
            if (idx !== -1) {
                state.evaluations[idx] = action.payload;
            }
        },
    },
});

export const { addEvaluation, updateEvaluation } = performanceSlice.actions;
export default performanceSlice.reducer;
