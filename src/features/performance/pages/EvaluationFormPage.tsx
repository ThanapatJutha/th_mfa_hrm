import { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { useAppSelector, useAppDispatch } from "@/store/hooks";
import { addEvaluation, updateEvaluation } from "@/features/performance/store/performanceSlice";
import { ROUTES } from "@/router/routes";
import type {
    Evaluation,
    EvaluationGrade,
    EvaluationPeriod,
} from "@/features/performance/types/performance.types";
import { Button, buttonVariants } from "@/components/common/button";
import { Input } from "@/components/common/input";
import { Textarea } from "@/components/common/textarea";

const PERIODS: EvaluationPeriod[] = ["Q1", "Q2", "Q3", "Q4", "Annual"];
const PERIOD_LABEL: Record<EvaluationPeriod, string> = {
    Q1: "ไตรมาส 1",
    Q2: "ไตรมาส 2",
    Q3: "ไตรมาส 3",
    Q4: "ไตรมาส 4",
    Annual: "ประจำปี",
};

function scoreToGrade(score: number): EvaluationGrade {
    if (score >= 85) return "A";
    if (score >= 70) return "B";
    if (score >= 55) return "C";
    return "D";
}

interface FormData {
    employeeId: string;
    year: number;
    period: EvaluationPeriod;
    score: number;
    comment: string;
}

function generateId() {
    return `eval-${Date.now()}`;
}

export function EvaluationFormPage() {
    const { id } = useParams<{ id: string }>();
    const isEdit = Boolean(id);
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const authUser = useAppSelector((s) => s.auth.user);
    const employees = useAppSelector((s) => s.employees.employees);
    const evaluations = useAppSelector((s) => s.performance.evaluations);

    const existing = isEdit ? evaluations.find((e) => e.id === id) : undefined;

    const [form, setForm] = useState<FormData>({
        employeeId: employees[0]?.id ?? "",
        year: new Date().getFullYear(),
        period: "Annual",
        score: 80,
        comment: "",
    });

    useEffect(() => {
        if (existing) {
            setForm({
                employeeId: existing.employeeId,
                year: existing.year,
                period: existing.period,
                score: existing.score,
                comment: existing.comment,
            });
        }
    }, [existing]);

    function set<K extends keyof FormData>(key: K, value: FormData[K]) {
        setForm((prev) => ({ ...prev, [key]: value }));
    }

    function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        const grade = scoreToGrade(form.score);
        const now = new Date().toISOString();

        if (isEdit && existing) {
            dispatch(
                updateEvaluation({
                    ...existing,
                    ...form,
                    grade,
                    updatedAt: now,
                })
            );
            navigate(ROUTES.PERFORMANCE_DETAIL(existing.id), { replace: true });
        } else {
            const newEval: Evaluation = {
                id: generateId(),
                ...form,
                grade,
                reviewerId: authUser?.employeeId ?? authUser?.id ?? "unknown",
                createdAt: now,
                updatedAt: now,
            };
            dispatch(addEvaluation(newEval));
            navigate(ROUTES.PERFORMANCE, { replace: true });
        }
    }

    const inputClass =
        "w-full text-sm border border-input rounded-radius-md px-3 py-2 bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring";

    const selectClass = inputClass;

    const Label = ({ children }: { children: React.ReactNode }) => (
        <label className="block text-sm font-medium text-foreground mb-1">{children}</label>
    );

    return (
        <div className="space-y-6 max-w-xl">
            {/* Header */}
            <div className="flex items-center gap-3">
                <Link
                    to={isEdit && id ? ROUTES.PERFORMANCE_DETAIL(id) : ROUTES.PERFORMANCE}
                    className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                    <ArrowLeft size={16} />
                    {isEdit ? "รายละเอียดการประเมิน" : "รายการประเมิน"}
                </Link>
            </div>
            <h1 className="text-xl font-heading font-semibold text-foreground">
                {isEdit ? "แก้ไขการประเมิน" : "เพิ่มการประเมิน"}
            </h1>

            <form onSubmit={handleSubmit} className="border border-border rounded-radius-lg p-6 space-y-5">
                {/* Employee */}
                <div>
                    <Label>พนักงาน</Label>
                    <select
                        className={selectClass}
                        value={form.employeeId}
                        onChange={(e) => set("employeeId", e.target.value)}
                        disabled={isEdit}
                    >
                        {employees.map((emp) => (
                            <option key={emp.id} value={emp.id}>
                                {emp.firstName} {emp.lastName} ({emp.code})
                            </option>
                        ))}
                    </select>
                </div>

                {/* Year + Period */}
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <Label>ปีที่ประเมิน (พ.ศ.)</Label>
                        <Input
                            type="number"
                            required
                            min={2560}
                            max={2580}
                            value={form.year}
                            onChange={(e) => set("year", parseInt(e.target.value, 10))}
                        />
                    </div>
                    <div>
                        <Label>รอบประเมิน</Label>
                        <select
                            className={selectClass}
                            value={form.period}
                            onChange={(e) => set("period", e.target.value as EvaluationPeriod)}
                        >
                            {PERIODS.map((p) => (
                                <option key={p} value={p}>{PERIOD_LABEL[p]}</option>
                            ))}
                        </select>
                    </div>
                </div>

                {/* Score */}
                <div>
                    <Label>คะแนน (0–100) — เกรด: {scoreToGrade(form.score)}</Label>
                    <div className="flex items-center gap-4">
                        <input
                            type="range"
                            min={0}
                            max={100}
                            value={form.score}
                            onChange={(e) => set("score", parseInt(e.target.value, 10))}
                            className="flex-1"
                        />
                        <Input
                            type="number"
                            min={0}
                            max={100}
                            required
                            className="w-20"
                            value={form.score}
                            onChange={(e) => set("score", Math.min(100, Math.max(0, parseInt(e.target.value, 10) || 0)))}
                        />
                    </div>
                </div>

                {/* Comment */}
                <div>
                    <Label>ความเห็นผู้ประเมิน</Label>
                    <Textarea
                        rows={4}
                        value={form.comment}
                        onChange={(e) => set("comment", e.target.value)}
                        placeholder="กรอกความเห็นหรือข้อแนะนำ..."
                    />
                </div>

                {/* Actions */}
                <div className="flex justify-end gap-3 pt-2">
                    <Link
                        to={isEdit && id ? ROUTES.PERFORMANCE_DETAIL(id) : ROUTES.PERFORMANCE}
                        className={buttonVariants({ variant: "outline" })}
                    >
                        ยกเลิก
                    </Link>
                    <Button type="submit">
                        {isEdit ? "บันทึกการแก้ไข" : "เพิ่มการประเมิน"}
                    </Button>
                </div>
            </form>
        </div>
    );
}
