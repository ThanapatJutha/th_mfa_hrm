import { Mail, Trash2, ChevronRight, Check } from "lucide-react";
import { Button } from "@/components/common";
import { Section, Row, PageHeader } from "./helpers";

export function ButtonShowcase() {
  return (
    <div className="space-y-8">
      <PageHeader title="Button" description="All variants, sizes, and states." />

      <Section title="Variants">
        <Row label="primary">
          <Button variant="primary">Primary</Button>
          <Button variant="primary" disabled>Disabled</Button>
        </Row>
        <Row label="secondary">
          <Button variant="secondary">Secondary</Button>
          <Button variant="secondary" disabled>Disabled</Button>
        </Row>
        <Row label="tertiary">
          <Button variant="tertiary">Tertiary</Button>
          <Button variant="tertiary" disabled>Disabled</Button>
        </Row>
        <Row label="destructive">
          <Button variant="destructive">Destructive</Button>
          <Button variant="destructive" disabled>Disabled</Button>
        </Row>
        <Row label="destructive-outline">
          <Button variant="destructive-outline">Destructive Outline</Button>
          <Button variant="destructive-outline" disabled>Disabled</Button>
        </Row>
        <Row label="link">
          <Button variant="link">Link</Button>
          <Button variant="link" disabled>Disabled</Button>
        </Row>
        <Row label="destructive-link">
          <Button variant="destructive-link">Destructive Link</Button>
          <Button variant="destructive-link" disabled>Disabled</Button>
        </Row>
      </Section>

      <Section title="Sizes">
        <Row label="sizes">
          <Button size="sm">Small</Button>
          <Button size="default">Default</Button>
          <Button size="lg">Large</Button>
        </Row>
        <Row label="icon sizes">
          <Button size="icon-xs" variant="secondary"><Check size={12} /></Button>
          <Button size="icon-sm" variant="secondary"><Check size={14} /></Button>
          <Button size="icon" variant="secondary"><Check size={16} /></Button>
          <Button size="icon-lg" variant="secondary"><Check size={18} /></Button>
        </Row>
      </Section>

      <Section title="With icons">
        <Row label="icon + label">
          <Button variant="primary"><Mail size={16} /> Send</Button>
          <Button variant="secondary"><ChevronRight size={16} /> Continue</Button>
          <Button variant="destructive"><Trash2 size={16} /> Delete</Button>
        </Row>
      </Section>
    </div>
  );
}
