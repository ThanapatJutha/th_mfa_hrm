import { Search } from "lucide-react";
import { Input } from "@figma/components/input";
import { Section, Row, PageHeader } from "./helpers";

export function InputShowcase() {
    return (
        <div className="space-y-8">
            <PageHeader title="Input" description="Text input field variants and states." />

            <Section title="States">
                <Row label="default">
                    <Input className="w-64" placeholder="กรอกข้อความ..." />
                </Row>
                <Row label="with icon">
                    <div className="relative w-64">
                        <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none" />
                        <Input className="pl-9" placeholder="ค้นหา..." />
                    </div>
                </Row>
                <Row label="disabled">
                    <Input className="w-64" placeholder="Disabled" disabled />
                </Row>
                <Row label="invalid">
                    <Input className="w-64" placeholder="Invalid" aria-invalid="true" />
                </Row>
            </Section>
        </div>
    );
}
