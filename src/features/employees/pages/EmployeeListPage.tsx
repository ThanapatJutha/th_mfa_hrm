import { useState } from "react";
import { Link } from "react-router-dom";
import { Plus, Search } from "lucide-react";
import { useAppSelector } from "@/store/hooks";
import { ROUTES } from "@/router/routes";
import type { Employee } from "@/features/employees/types/employee.types";

const STATUS_LABEL: Record<Employee["status"], string> = {
    active: "ปฏิบัติงาน",
    inactive: "ไม่ปฏิบัติงาน",
};

export function EmployeeListPage() {
    const employees = useAppSelector((s) => s.employees.employees);
    const userRole = useAppSelector((s) => s.auth.user?.role);
    const [query, setQuery] = useState("");

    const filtered = employees.filter((e) => {
        const q = query.toLowerCase();
        return (
            e.firstName.includes(q) ||
            e.lastName.includes(q) ||
            e.code.toLowerCase().includes(q) ||
            e.department.includes(q) ||
            e.position.includes(q)
        );
    });

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-xl font-heading font-semibold text-foreground">ข้อมูลพนักงาน</h1>
                    <p className="text-sm text-muted-foreground mt-0.5">
                        พนักงานทั้งหมด {employees.length} คน
                    </p>
                </div>
                {userRole === "admin" && (
                    <Link
                        to={ROUTES.EMPLOYEES_NEW}
                        className="inline-flex items-center gap-2 bg-primary text-primary-foreground text-sm font-medium px-4 py-2 rounded-radius-md hover:opacity-90 transition-opacity"
                    >
                        <Plus size={16} />
                        เพิ่มพนักงาน
                    </Link>
                )}
            </div>

            {/* Search */}
            <div className="relative max-w-sm">
                <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                <input
                    type="text"
                    placeholder="ค้นหาชื่อ รหัส หน่วยงาน..."
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    className="w-full pl-9 pr-3 py-2 text-sm border border-input rounded-radius-md bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                />
            </div>

            {/* Table */}
            <div className="border border-border rounded-radius-lg overflow-hidden">
                <table className="w-full text-sm">
                    <thead className="bg-muted/50 text-muted-foreground">
                        <tr>
                            <th className="px-4 py-3 text-left font-medium">รหัส</th>
                            <th className="px-4 py-3 text-left font-medium">ชื่อ-สกุล</th>
                            <th className="px-4 py-3 text-left font-medium">หน่วยงาน</th>
                            <th className="px-4 py-3 text-left font-medium">ตำแหน่ง</th>
                            <th className="px-4 py-3 text-left font-medium">สถานะ</th>
                            <th className="px-4 py-3 text-left font-medium">วันเริ่มงาน</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-border">
                        {filtered.length === 0 ? (
                            <tr>
                                <td colSpan={6} className="px-4 py-8 text-center text-muted-foreground">
                                    ไม่พบข้อมูลพนักงาน
                                </td>
                            </tr>
                        ) : (
                            filtered.map((emp) => (
                                <tr key={emp.id} className="hover:bg-muted/30 transition-colors">
                                    <td className="px-4 py-3 font-mono text-xs text-muted-foreground">{emp.code}</td>
                                    <td className="px-4 py-3">
                                        <Link
                                            to={ROUTES.EMPLOYEE_DETAIL(emp.id)}
                                            className="font-medium text-foreground hover:text-primary transition-colors"
                                        >
                                            {emp.firstName} {emp.lastName}
                                        </Link>
                                    </td>
                                    <td className="px-4 py-3 text-muted-foreground">{emp.department}</td>
                                    <td className="px-4 py-3 text-muted-foreground">{emp.position}</td>
                                    <td className="px-4 py-3">
                                        <span
                                            className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${emp.status === "active"
                                                    ? "bg-green-100 text-green-700"
                                                    : "bg-muted text-muted-foreground"
                                                }`}
                                        >
                                            {STATUS_LABEL[emp.status]}
                                        </span>
                                    </td>
                                    <td className="px-4 py-3 text-muted-foreground">
                                        {new Date(emp.startDate).toLocaleDateString("th-TH")}
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
