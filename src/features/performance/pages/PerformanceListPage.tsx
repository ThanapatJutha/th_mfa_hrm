import { Link } from "react-router-dom";
import { Plus } from "lucide-react";
import { useAppSelector } from "@/store/hooks";
import { ROUTES } from "@/router/routes";
import type { EvaluationGrade } from "@/features/performance/types/performance.types";
import { buttonVariants } from "@/components/common/button";
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@/components/common/table";

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

interface PerformanceListPageProps {
    /** When true, shows only evaluations for the logged-in employee */
    selfView?: boolean;
}

export function PerformanceListPage({ selfView = false }: PerformanceListPageProps) {
    const authUser = useAppSelector((s) => s.auth.user);
    const evaluations = useAppSelector((s) => s.performance.evaluations);
    const employees = useAppSelector((s) => s.employees.employees);

    const filtered = selfView
        ? evaluations.filter((ev) => ev.employeeId === authUser?.employeeId)
        : evaluations;

    const sortedEvals = [...filtered].sort(
        (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );

    function getEmployeeName(employeeId: string) {
        const emp = employees.find((e) => e.id === employeeId);
        return emp ? `${emp.firstName} ${emp.lastName}` : employeeId;
    }

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-xl font-heading font-semibold text-foreground">
                        {selfView ? "ผลการประเมินของฉัน" : "การประเมินผลงาน"}
                    </h1>
                    <p className="text-sm text-muted-foreground mt-0.5">
                        รายการประเมินทั้งหมด {filtered.length} รายการ
                    </p>
                </div>
                {authUser?.role === "admin" && (
                    <Link to={ROUTES.PERFORMANCE_NEW} className={buttonVariants()}>
                        <Plus size={16} />
                        เพิ่มการประเมิน
                    </Link>
                )}
            </div>

            {/* List */}
            <div className="border border-border rounded-radius-lg overflow-hidden">
                <Table>
                    <TableHeader>
                        <TableRow>
                            {!selfView && <TableHead>พนักงาน</TableHead>}
                            <TableHead>ปี</TableHead>
                            <TableHead>รอบประเมิน</TableHead>
                            <TableHead>คะแนน</TableHead>
                            <TableHead>เกรด</TableHead>
                            <TableHead>วันที่บันทึก</TableHead>
                            <TableHead />
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {sortedEvals.length === 0 ? (
                            <TableRow>
                                <TableCell colSpan={selfView ? 6 : 7} className="py-8 text-center text-muted-foreground">
                                    ไม่พบข้อมูลการประเมิน
                                </TableCell>
                            </TableRow>
                        ) : (
                            sortedEvals.map((ev) => (
                                <TableRow key={ev.id}>
                                    {!selfView && (
                                        <TableCell className="font-medium text-foreground">
                                            <Link
                                                to={ROUTES.EMPLOYEE_DETAIL(ev.employeeId)}
                                                className="hover:text-primary transition-colors"
                                            >
                                                {getEmployeeName(ev.employeeId)}
                                            </Link>
                                        </TableCell>
                                    )}
                                    <TableCell className="text-muted-foreground">{ev.year}</TableCell>
                                    <TableCell className="text-muted-foreground">{PERIOD_LABEL[ev.period] ?? ev.period}</TableCell>
                                    <TableCell className="font-medium text-foreground">{ev.score}</TableCell>
                                    <TableCell>
                                        <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-bold ${GRADE_COLOR[ev.grade]}`}>
                                            {ev.grade}
                                        </span>
                                    </TableCell>
                                    <TableCell className="text-muted-foreground">
                                        {new Date(ev.createdAt).toLocaleDateString("th-TH")}
                                    </TableCell>
                                    <TableCell>
                                        <Link
                                            to={ROUTES.PERFORMANCE_DETAIL(ev.id)}
                                            className="text-xs text-primary hover:underline"
                                        >
                                            ดูรายละเอียด
                                        </Link>
                                    </TableCell>
                                </TableRow>
                            ))
                        )}
                    </TableBody>
                </Table>
            </div>
        </div>
    );
}
