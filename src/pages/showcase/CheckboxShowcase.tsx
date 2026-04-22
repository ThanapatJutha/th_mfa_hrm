import { useState } from "react";
import { Checkbox } from "@figma/components/checkbox";
import { Section, Row, PageHeader } from "./helpers";

export function CheckboxShowcase() {
    const [checked, setChecked] = useState(false);
    const [indeterminate, setIndeterminate] = useState(false);

    return (
        <div className="space-y-8">
            <PageHeader title="Checkbox" description="Selection control with checked, indeterminate, and disabled states." />

            <Section title="States">
                <Row label="unchecked">
                    <Checkbox />
                </Row>
                <Row label="checked (interactive)">
                    <Checkbox checked={checked} onCheckedChange={(v) => setChecked(v === true)} />
                    <span className="text-xs text-muted-foreground">{checked ? "checked" : "unchecked"}</span>
                </Row>
                <Row label="indeterminate">
                    <Checkbox indeterminate checked={indeterminate} onCheckedChange={(v) => setIndeterminate(v === true)} />
                    <span className="text-xs text-muted-foreground">{indeterminate ? "checked" : "indeterminate"}</span>
                </Row>
                <Row label="disabled">
                    <Checkbox disabled />
                    <Checkbox disabled checked />
                    <Checkbox disabled indeterminate />
                </Row>
            </Section>
        </div>
    );
}
