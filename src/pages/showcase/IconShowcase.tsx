import { Bell, Star, Search, Settings, User, Mail, AlertCircle } from "lucide-react";
import { LucideIcon } from "@/components/common/lucide-icon";
import { Section, Row, PageHeader } from "./helpers";
import type { IconColor } from "@/components/common/lucide-icon";

const COLORS: { label: string; color: IconColor }[] = [
    { label: "primary", color: "primary" },
    { label: "secondary", color: "secondary" },
    { label: "tertiary", color: "tertiary" },
    { label: "success", color: "success" },
    { label: "warning", color: "warning" },
    { label: "error", color: "error" },
    { label: "link", color: "link" },
    { label: "disabled", color: "disabled" },
];

export function IconShowcase() {
    return (
        <div className="space-y-8">
            <PageHeader title="LucideIcon" description="Lucide icon wrapper with semantic color tokens and standardised sizes." />

            <Section title="Semantic color tokens">
                <div className="flex flex-wrap gap-6">
                    {COLORS.map(({ label, color }) => (
                        <div key={color} className="flex flex-col items-center gap-1">
                            <LucideIcon icon={Bell} color={color} size={24} />
                            <span className="text-xs text-muted-foreground">{label}</span>
                        </div>
                    ))}
                </div>
            </Section>

            <Section title="Sizes">
                <Row label="16 / 20 / 24 / 32 / 48">
                    <LucideIcon icon={Star} size={16} />
                    <LucideIcon icon={Star} size={20} />
                    <LucideIcon icon={Star} size={24} />
                    <LucideIcon icon={Star} size={32} />
                    <LucideIcon icon={Star} size={48} />
                </Row>
            </Section>

            <Section title="Example icons">
                <div className="flex flex-wrap gap-4">
                    {[Bell, Star, Search, Settings, User, Mail, AlertCircle].map((Icon, i) => (
                        <div key={i} className="flex flex-col items-center gap-1">
                            <LucideIcon icon={Icon} size={24} color="primary" />
                            <span className="text-xs text-muted-foreground">{Icon.displayName ?? Icon.name}</span>
                        </div>
                    ))}
                </div>
            </Section>
        </div>
    );
}
