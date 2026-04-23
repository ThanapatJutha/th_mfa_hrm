import { useState } from "react";
import { Link } from "react-router-dom";
import { Plus, Search } from "lucide-react";
import { useAppSelector } from "@/store/hooks";
import { ROUTES } from "@/router/routes";
import type { Employee } from "@/features/employees/types/employee.types";
import { Button, buttonVariants } from "@/components/common/button";
import { Input } from "@/components/common/input";
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@/components/common/table";

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
                    <Link to={ROUTES.EMPLOYEES_NEW} className={buttonVariants()}>
                        <Plus size={16} />
                        เพิ่มพนักงาน
                    </Link>
                )}
            </div>

            {/* Search */}
            <div className="relative max-w-sm">
                <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none" />
                <Input
                    type="text"
                    placeholder="ค้นหาชื่อ รหัส หน่วยงาน..."
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    className="pl-9"
                />
            </div>

            {/* Table */}
            <div className="border border-border rounded-radius-lg overflow-hidden">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>รหัส</TableHead>
                            <TableHead>ชื่อ-สกุล</TableHead>
                            <TableHead>หน่วยงาน</TableHead>
                            <TableHead>ตำแหน่ง</TableHead>
                            <TableHead>สถานะ</TableHead>
                            <TableHead>วันเริ่มงาน</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {filtered.length === 0 ? (
                            <TableRow>
                                <TableCell colSpan={6} className="py-8 text-center text-muted-foreground">
                                    ไม่พบข้อมูลพนักงาน
                                </TableCell>
                            </TableRow>
                        ) : (
                            filtered.map((emp) => (
                                <TableRow key={emp.id}>
                                    <TableCell className="font-mono text-xs text-muted-foreground">{emp.code}</TableCell>
                                    <TableCell>
                                        <Link
                                            to={ROUTES.EMPLOYEE_DETAIL(emp.id)}
                                            className="font-medium text-foreground hover:text-primary transition-colors"
                                        >
                                            {emp.firstName} {emp.lastName}
                                        </Link>
                                    </TableCell>
                                    <TableCell className="text-muted-foreground">{emp.department}</TableCell>
                                    <TableCell className="text-muted-foreground">{emp.position}</TableCell>
                                    <TableCell>
                                        <span
                                            className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${emp.status === "active"
                                                ? "bg-green-100 text-green-700"
                                                : "bg-muted text-muted-foreground"
                                                }`}
                                        >
                                            {STATUS_LABEL[emp.status]}
                                        </span>
                                    </TableCell>
                                    <TableCell className="text-muted-foreground">
                                        {new Date(emp.startDate).toLocaleDateString("th-TH")}
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
