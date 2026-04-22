import { Textarea } from "@figma/components/textarea";
import { Section, Row, PageHeader } from "./helpers";

export function TextareaShowcase() {
  return (
    <div className="space-y-8">
      <PageHeader title="Textarea" description="Multi-line text input." />

      <Section title="States">
        <Row label="default">
          <Textarea className="w-64" placeholder="กรอกรายละเอียด..." />
        </Row>
        <Row label="with value">
          <Textarea className="w-64" defaultValue="ข้อความตัวอย่างที่มีเนื้อหาอยู่แล้ว" />
        </Row>
        <Row label="disabled">
          <Textarea className="w-64" placeholder="Disabled" disabled />
        </Row>
        <Row label="invalid">
          <Textarea className="w-64" placeholder="Invalid" aria-invalid="true" />
        </Row>
      </Section>
    </div>
  );
}
