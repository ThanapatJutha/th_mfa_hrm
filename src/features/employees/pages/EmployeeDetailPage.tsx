import { useParams, Link, useNavigate } from "react-router-dom";
import { ArrowLeft, Pencil, Trash2 } from "lucide-react";
import { useAppSelector, useAppDispatch } from "@/store/hooks";
import { deleteEmployee } from "@/features/employees/store/employeesSlice";
import { ROUTES } from "@/router/routes";
import type { Employee } from "@/features/employees/types/employee.types";

const STATUS_LABEL: Record<Employee["status"], string> = {
    active: "ปฏิบัติงาน",
    inactive: "ไม่ปฏิบัติงาน",
};

interface EmployeeDetailPageProps {
    /** When true, automatically loads the logged-in user's own employee record */
    selfView?: boolean;
}

export function EmployeeDetailPage({ selfView = false }: EmployeeDetailPageProps) {
    const { id } = useParams<{ id: string }>();
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const authUser = useAppSelector((s) => s.auth.user);
    const employees = useAppSelector((s) => s.employees.employees);

    const employeeId = selfView ? authUser?.employeeId : id;
    const employee = employees.find((e) => e.id === employeeId);
    const userRole = authUser?.role;

    if (!employee) {
        return (
            <div className="flex flex-col items-center justify-center py-24 text-muted-foreground">
                <p className="text-sm">ไม่พบข้อมูลพนักงาน</p>
                <Link to={ROUTES.EMPLOYEES} className="text-sm text-primary mt-2 hover:underline">
                    กลับไปรายการพนักงาน
                </Link>
            </div>
        );
    }

    function handleDelete() {
        if (!confirm(`ต้องการลบข้อมูลของ ${employee!.firstName} ${employee!.lastName} ใช่หรือไม่?`)) return;
        dispatch(deleteEmployee(employee!.id));
        navigate(ROUTES.EMPLOYEES, { replace: true });
    }

    const Field = ({ label, value }: { label: string; value: string }) => (
        <div>
            <dt className="text-xs text-muted-foreground mb-0.5">{label}</dt>
            <dd className="text-sm text-foreground">{value}</dd>
        </div>
    );

    return (
        <div className="space-y-6 max-w-2xl">
            {/* Back + actions */}
            <div className="flex items-center justify-between">
                {selfView ? (
                    <h1 className="text-xl font-heading font-semibold text-foreground">โปรไฟล์ของฉัน</h1>
                ) : (
                    <Link
                        to={ROUTES.EMPLOYEES}
                        className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
                    >
                        <ArrowLeft size={16} />
                        รายการพนักงาน
                    </Link>
                )}

                {userRole === "admin" && !selfView && (
                    <div className="flex gap-2">
                        <Link
                            to={ROUTES.EMPLOYEE_EDIT(employee.id)}
                            className="inline-flex items-center gap-1.5 border border-border text-sm px-3 py-1.5 rounded-radius-md hover:bg-accent transition-colors"
                        >
                            <Pencil size={14} />
                            แก้ไข
                        </Link>
                        <button
                            onClick={handleDelete}
                            className="inline-flex items-center gap-1.5 border border-destructive text-destructive text-sm px-3 py-1.5 rounded-radius-md hover:bg-destructive/10 transition-colors"
                        >
                            <Trash2 size={14} />
                            ลบ
                        </button>
                    </div>
                )}
            </div>

            {/* Card */}
            <div className="border border-border rounded-radius-lg p-6 space-y-6">
                {/* Name + code */}
                <div className="flex items-start justify-between">
                    <div>
                        <h2 className="text-lg font-heading font-semibold text-foreground">
                            {employee.firstName} {employee.lastName}
                        </h2>
                        <p className="text-sm text-muted-foreground">{employee.position}</p>
                    </div>
                    <span className="font-mono text-xs text-muted-foreground bg-muted px-2 py-1 rounded">
                        {employee.code}
                    </span>
                </div>

                {/* Details grid */}
                <dl className="grid grid-cols-2 gap-x-8 gap-y-4">
                    <Field label="หน่วยงาน" value={employee.department} />
                    <Field label="อีเมล" value={employee.email} />
                    <Field label="เบอร์โทรศัพท์" value={employee.phone} />
                    <Field
                        label="วันเริ่มงาน"
                        value={new Date(employee.startDate).toLocaleDateString("th-TH", {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                        })}
                    />
                    <div>
                        <dt className="text-xs text-muted-foreground mb-0.5">สถานะ</dt>
                        <dd>
                            <span
                                className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${employee.status === "active"
                                        ? "bg-green-100 text-green-700"
                                        : "bg-muted text-muted-foreground"
                                    }`}
                            >
                                {STATUS_LABEL[employee.status]}
                            </span>
                        </dd>
                    </div>
                </dl>
            </div>
        </div>
    );
}
