import { configureStore } from "@reduxjs/toolkit";
import authReducer from "@/features/auth/store/authSlice";
import employeesReducer from "@/features/employees/store/employeesSlice";
import performanceReducer from "@/features/performance/store/performanceSlice";

export const store = configureStore({
    reducer: {
        auth: authReducer,
        employees: employeesReducer,
        performance: performanceReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
