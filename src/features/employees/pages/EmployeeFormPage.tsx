import { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { useAppSelector, useAppDispatch } from "@/store/hooks";
import { addEmployee, updateEmployee } from "@/features/employees/store/employeesSlice";
import { ROUTES } from "@/router/routes";
import type { Employee, EmployeeStatus } from "@/features/employees/types/employee.types";

const DEPARTMENTS = [
    "สำนักงานเลขานุการกรม",
    "กองการเจ้าหน้าที่",
    "กองยุทธศาสตร์และแผนงาน",
    "กองการเงินและบัญชี",
    "ศูนย์เทคโนโลยีสารสนเทศ",
    "กองสารนิเทศ",
];

function generateId() {
    return `emp-${Date.now()}`;
}

function generateCode(employees: Employee[]) {
    const max = employees.reduce((acc, e) => {
        const n = parseInt(e.code.replace("MFA-", ""), 10);
        return isNaN(n) ? acc : Math.max(acc, n);
    }, 0);
    return `MFA-${String(max + 1).padStart(3, "0")}`;
}

interface FormData {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    department: string;
    position: string;
    startDate: string;
    status: EmployeeStatus;
}

const EMPTY_FORM: FormData = {
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    department: DEPARTMENTS[0],
    position: "",
    startDate: new Date().toISOString().slice(0, 10),
    status: "active",
};

export function EmployeeFormPage() {
    const { id } = useParams<{ id: string }>();
    const isEdit = Boolean(id);
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const employees = useAppSelector((s) => s.employees.employees);
    const existing = isEdit ? employees.find((e) => e.id === id) : undefined;

    const [form, setForm] = useState<FormData>(EMPTY_FORM);

    useEffect(() => {
        if (existing) {
            setForm({
                firstName: existing.firstName,
                lastName: existing.lastName,
                email: existing.email,
                phone: existing.phone,
                department: existing.department,
                position: existing.position,
                startDate: existing.startDate,
                status: existing.status,
            });
        }
    }, [existing]);

    function set<K extends keyof FormData>(key: K, value: FormData[K]) {
        setForm((prev) => ({ ...prev, [key]: value }));
    }

    function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        if (isEdit && existing) {
            dispatch(updateEmployee({ ...existing, ...form }));
            navigate(ROUTES.EMPLOYEE_DETAIL(existing.id), { replace: true });
        } else {
            const newEmp: Employee = {
                id: generateId(),
                code: generateCode(employees),
                ...form,
            };
            dispatch(addEmployee(newEmp));
            navigate(ROUTES.EMPLOYEES, { replace: true });
        }
    }

    const Label = ({ children }: { children: React.ReactNode }) => (
        <label className="block text-sm font-medium text-foreground mb-1">{children}</label>
    );

    const inputClass =
        "w-full text-sm border border-input rounded-radius-md px-3 py-2 bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring";

    return (
        <div className="space-y-6 max-w-xl">
            {/* Header */}
            <div className="flex items-center gap-3">
                <Link
                    to={isEdit && id ? ROUTES.EMPLOYEE_DETAIL(id) : ROUTES.EMPLOYEES}
                    className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                    <ArrowLeft size={16} />
                    {isEdit ? "ข้อมูลพนักงาน" : "รายการพนักงาน"}
                </Link>
            </div>
            <h1 className="text-xl font-heading font-semibold text-foreground">
                {isEdit ? "แก้ไขข้อมูลพนักงาน" : "เพิ่มพนักงานใหม่"}
            </h1>

            <form onSubmit={handleSubmit} className="border border-border rounded-radius-lg p-6 space-y-5">
                {/* Name */}
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <Label>ชื่อ</Label>
                        <input
                            required
                            className={inputClass}
                            value={form.firstName}
                            onChange={(e) => set("firstName", e.target.value)}
                        />
                    </div>
                    <div>
                        <Label>นามสกุล</Label>
                        <input
                            required
                            className={inputClass}
                            value={form.lastName}
                            onChange={(e) => set("lastName", e.target.value)}
                        />
                    </div>
                </div>

                {/* Contact */}
                <div>
                    <Label>อีเมล</Label>
                    <input
                        type="email"
                        required
                        className={inputClass}
                        value={form.email}
                        onChange={(e) => set("email", e.target.value)}
                    />
                </div>
                <div>
                    <Label>เบอร์โทรศัพท์</Label>
                    <input
                        className={inputClass}
                        value={form.phone}
                        onChange={(e) => set("phone", e.target.value)}
                    />
                </div>

                {/* Work info */}
                <div>
                    <Label>หน่วยงาน</Label>
                    <select
                        className={inputClass}
                        value={form.department}
                        onChange={(e) => set("department", e.target.value)}
                    >
                        {DEPARTMENTS.map((d) => (
                            <option key={d} value={d}>{d}</option>
                        ))}
                    </select>
                </div>
                <div>
                    <Label>ตำแหน่ง</Label>
                    <input
                        required
                        className={inputClass}
                        value={form.position}
                        onChange={(e) => set("position", e.target.value)}
                    />
                </div>
                <div>
                    <Label>วันเริ่มงาน</Label>
                    <input
                        type="date"
                        required
                        className={inputClass}
                        value={form.startDate}
                        onChange={(e) => set("startDate", e.target.value)}
                    />
                </div>
                <div>
                    <Label>สถานะ</Label>
                    <select
                        className={inputClass}
                        value={form.status}
                        onChange={(e) => set("status", e.target.value as EmployeeStatus)}
                    >
                        <option value="active">ปฏิบัติงาน</option>
                        <option value="inactive">ไม่ปฏิบัติงาน</option>
                    </select>
                </div>

                {/* Actions */}
                <div className="flex justify-end gap-3 pt-2">
                    <Link
                        to={isEdit && id ? ROUTES.EMPLOYEE_DETAIL(id) : ROUTES.EMPLOYEES}
                        className="text-sm px-4 py-2 border border-border rounded-radius-md hover:bg-accent transition-colors"
                    >
                        ยกเลิก
                    </Link>
                    <button
                        type="submit"
                        className="text-sm px-4 py-2 bg-primary text-primary-foreground rounded-radius-md hover:opacity-90 transition-opacity"
                    >
                        {isEdit ? "บันทึกการแก้ไข" : "เพิ่มพนักงาน"}
                    </button>
                </div>
            </form>
        </div>
    );
}
