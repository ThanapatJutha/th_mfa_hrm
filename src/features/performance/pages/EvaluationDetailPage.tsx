import { useParams, Link } from "react-router-dom";
import { ArrowLeft, Pencil } from "lucide-react";
import { useAppSelector } from "@/store/hooks";
import { ROUTES } from "@/router/routes";
import type { EvaluationGrade } from "@/features/performance/types/performance.types";
import { buttonVariants } from "@/components/common/button";
import { cn } from "@/lib/utils";

const GRADE_COLOR: Record<EvaluationGrade, string> = {
    A: "bg-green-100 text-green-700",
    B: "bg-blue-100 text-blue-700",
    C: "bg-yellow-100 text-yellow-700",
    D: "bg-red-100 text-red-700",
};

const PERIOD_LABEL: Record<string, string> = {
    Q1: "ไตรมาส 1",
    Q2: "ไตรมาส 2",
    Q3: "ไตรมาส 3",
    Q4: "ไตรมาส 4",
    Annual: "ประจำปี",
};

export function EvaluationDetailPage() {
    const { id } = useParams<{ id: string }>();
    const evaluations = useAppSelector((s) => s.performance.evaluations);
    const employees = useAppSelector((s) => s.employees.employees);
    const userRole = useAppSelector((s) => s.auth.user?.role);

    const evaluation = evaluations.find((e) => e.id === id);

    function getEmployeeName(employeeId: string) {
        const emp = employees.find((e) => e.id === employeeId);
        return emp ? `${emp.firstName} ${emp.lastName}` : employeeId;
    }

    if (!evaluation) {
        return (
            <div className="flex flex-col items-center justify-center py-24 text-muted-foreground">
                <p className="text-sm">ไม่พบข้อมูลการประเมิน</p>
                <Link to={ROUTES.PERFORMANCE} className="text-sm text-primary mt-2 hover:underline">
                    กลับไปรายการประเมิน
                </Link>
            </div>
        );
    }

    const Field = ({ label, value }: { label: string; value: React.ReactNode }) => (
        <div>
            <dt className="text-xs text-muted-foreground mb-0.5">{label}</dt>
            <dd className="text-sm text-foreground">{value}</dd>
        </div>
    );

    return (
        <div className="space-y-6 max-w-xl">
            {/* Back + actions */}
            <div className="flex items-center justify-between">
                <Link
                    to={ROUTES.PERFORMANCE}
                    className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                    <ArrowLeft size={16} />
                    รายการประเมิน
                </Link>
                {userRole === "admin" && (
                    <Link
                        to={ROUTES.PERFORMANCE_EDIT(evaluation.id)}
                        className={cn(buttonVariants({ variant: "outline", size: "sm" }), "gap-1.5")}
                    >
                        <Pencil size={14} />
                        แก้ไข
                    </Link>
                )}
            </div>

            {/* Card */}
            <div className="border border-border rounded-radius-lg p-6 space-y-6">
                {/* Header */}
                <div className="flex items-start justify-between">
                    <div>
                        <h2 className="text-lg font-heading font-semibold text-foreground">
                            {getEmployeeName(evaluation.employeeId)}
                        </h2>
                        <p className="text-sm text-muted-foreground">
                            {PERIOD_LABEL[evaluation.period] ?? evaluation.period} {evaluation.year}
                        </p>
                    </div>
                    <span
                        className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-bold ${GRADE_COLOR[evaluation.grade]}`}
                    >
                        {evaluation.grade}
                    </span>
                </div>

                {/* Score bar */}
                <div>
                    <div className="flex justify-between text-xs text-muted-foreground mb-1">
                        <span>คะแนน</span>
                        <span>{evaluation.score} / 100</span>
                    </div>
                    <div className="h-2 bg-muted rounded-full overflow-hidden">
                        <div
                            className="h-full bg-primary rounded-full transition-all"
                            style={{ width: `${evaluation.score}%` }}
                        />
                    </div>
                </div>

                {/* Details */}
                <dl className="grid grid-cols-2 gap-x-8 gap-y-4">
                    <Field label="ปีที่ประเมิน" value={evaluation.year} />
                    <Field label="รอบประเมิน" value={PERIOD_LABEL[evaluation.period] ?? evaluation.period} />
                    <Field label="ผู้ประเมิน" value={getEmployeeName(evaluation.reviewerId)} />
                    <Field
                        label="วันที่บันทึก"
                        value={new Date(evaluation.createdAt).toLocaleDateString("th-TH", {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                        })}
                    />
                </dl>

                {/* Comment */}
                <div>
                    <dt className="text-xs text-muted-foreground mb-1">ความเห็นผู้ประเมิน</dt>
                    <dd className="text-sm text-foreground bg-muted/40 rounded-radius-md p-3 leading-relaxed">
                        {evaluation.comment || "—"}
                    </dd>
                </div>
            </div>
        </div>
    );
}
