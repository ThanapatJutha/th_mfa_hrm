import {
    Table, TableHeader, TableBody, TableFooter,
    TableRow, TableHead, TableCell, TableCaption,
} from "@/components/common/table";
import { Section, PageHeader } from "./helpers";

const EMPLOYEES = [
    { code: "MFA-001", name: "สมชาย บุญมี", dept: "สำนักงานเลขานุการกรม", position: "ผู้อำนวยการ", status: "ปฏิบัติงาน" },
    { code: "MFA-002", name: "วิชัย ประสิทธิ์", dept: "กองการเจ้าหน้าที่", position: "นักทรัพยากรบุคคลชำนาญการ", status: "ปฏิบัติงาน" },
    { code: "MFA-003", name: "สุดา แก้วใส", dept: "กองการเจ้าหน้าที่", position: "นักทรัพยากรบุคคลปฏิบัติการ", status: "ปฏิบัติงาน" },
    { code: "MFA-004", name: "ประเสริฐ ดีงาม", dept: "กองยุทธศาสตร์และแผนงาน", position: "นักวิเคราะห์นโยบายฯ", status: "ปฏิบัติงาน" },
    { code: "MFA-005", name: "มาลี สุขสวัสดิ์", dept: "กองการเงินและบัญชี", position: "นักวิชาการการเงินฯ", status: "ไม่ปฏิบัติงาน" },
];

export function TableShowcase() {
    return (
        <div className="space-y-8">
            <PageHeader title="Table" description="Data table with header, body, footer, and caption." />

            <Section title="Basic table">
                <Table>
                    <TableCaption>รายการพนักงานตัวอย่าง</TableCaption>
                    <TableHeader>
                        <TableRow>
                            <TableHead>รหัส</TableHead>
                            <TableHead>ชื่อ-สกุล</TableHead>
                            <TableHead>หน่วยงาน</TableHead>
                            <TableHead>ตำแหน่ง</TableHead>
                            <TableHead>สถานะ</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {EMPLOYEES.map((row) => (
                            <TableRow key={row.code}>
                                <TableCell className="font-mono text-xs">{row.code}</TableCell>
                                <TableCell className="font-medium">{row.name}</TableCell>
                                <TableCell className="text-muted-foreground">{row.dept}</TableCell>
                                <TableCell className="text-muted-foreground">{row.position}</TableCell>
                                <TableCell>
                                    <span
                                        className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${row.status === "ปฏิบัติงาน"
                                            ? "bg-green-100 text-green-700"
                                            : "bg-muted text-muted-foreground"
                                            }`}
                                    >
                                        {row.status}
                                    </span>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                    <TableFooter>
                        <TableRow>
                            <TableCell colSpan={4} className="text-right text-muted-foreground">รวม</TableCell>
                            <TableCell>{EMPLOYEES.length} คน</TableCell>
                        </TableRow>
                    </TableFooter>
                </Table>
            </Section>
        </div>
    );
}
