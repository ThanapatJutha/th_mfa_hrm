import { ChevronRight, User, Settings, LogOut, Bell, Check } from "lucide-react";
import { Button } from "@/components/common";
import {
    DropdownMenu,
    DropdownMenuTrigger,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuLabel,
    DropdownMenuCheckboxItem,
} from "@figma/components/dropdown-menu";
import { Section, Row, PageHeader } from "./helpers";

export function DropdownShowcase() {
    return (
        <div className="space-y-8">
            <PageHeader title="Dropdown Menu" description="Context menus and action menus triggered by a button." />

            <Section title="Basic menu">
                <Row label="with label + separator">
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="secondary">
                                Actions <ChevronRight size={14} />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                            <DropdownMenuLabel>จัดการ</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem><User size={14} /> โปรไฟล์</DropdownMenuItem>
                            <DropdownMenuItem><Settings size={14} /> ตั้งค่า</DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem className="text-destructive focus:text-destructive">
                                <LogOut size={14} /> ออกจากระบบ
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </Row>
            </Section>

            <Section title="Checkbox items">
                <Row label="multi-select">
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="outline">
                                <Bell size={14} /> การแจ้งเตือน
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                            <DropdownMenuLabel>เลือกรายการ</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuCheckboxItem checked>อีเมล</DropdownMenuCheckboxItem>
                            <DropdownMenuCheckboxItem>SMS</DropdownMenuCheckboxItem>
                            <DropdownMenuCheckboxItem checked>แอปพลิเคชัน</DropdownMenuCheckboxItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </Row>
            </Section>

            <Section title="Destructive item">
                <Row label="danger action">
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="outline">
                                <Check size={14} /> ตัวเลือก
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                            <DropdownMenuItem>แก้ไข</DropdownMenuItem>
                            <DropdownMenuItem>ทำสำเนา</DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem className="text-destructive focus:text-destructive">
                                ลบ
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </Row>
            </Section>
        </div>
    );
}
