import React from "react"
import { Info, AlertCircle } from "lucide-react"

/**
 * Figma component: Alert
 * Figma node: 142:177 (COMPONENT_SET)
 * Figma page: ↪ Alert (142:168)
 *
 * Properties:
 *   - variant: default | destructive
 *
 * Design tokens used:
 *   - --background (surface/primary/default: #ffffff) — default bg
 *   - --input (border/primary: #a5a7ab) — default border
 *   - --foreground (text/primary: #242526) — default title & icon
 *   - --muted-foreground (text/secondary: #525456) — default description
 *   - --destructive-subtle (surface/status/error/subtle/default: #fadcdb) — destructive bg
 *   - --border-destructive (border/status/error: #e6504c) — destructive border
 *   - --destructive (text/status/error: #e6504c) — destructive title, desc & icon
 */

/* ── Inline Alert matching Figma tokens exactly ── */
type AlertVariant = "default" | "destructive";

const alertStyles: Record<AlertVariant, React.CSSProperties> = {
  default: {
    backgroundColor: "var(--color-background)",
    border: "1px solid var(--color-input)",
    color: "var(--color-foreground)",
  },
  destructive: {
    backgroundColor: "var(--color-destructive-subtle)",
    border: "1px solid var(--color-border-destructive)",
    color: "var(--color-destructive)",
  },
};

function Alert({
  variant = "default",
  children,
}: {
  variant?: AlertVariant;
  children: React.ReactNode;
}) {
  return (
    <div
      style={{
        ...alertStyles[variant],
        borderRadius: 8,
        padding: 16,
        display: "flex",
        gap: 16,
        alignItems: "flex-start",
        position: "relative",
      }}
    >
      {children}
    </div>
  );
}

function AlertTitle({ children }: { children: React.ReactNode }) {
  return <div style={{ fontWeight: 600, fontSize: 14 }}>{children}</div>;
}

function AlertDescription({ variant = "default", children }: { variant?: AlertVariant; children: React.ReactNode }) {
  return (
    <div style={{
      fontSize: 14,
      color: variant === "destructive" ? "var(--color-destructive)" : "var(--color-muted-foreground)",
    }}>
      {children}
    </div>
  );
}

function AlertAction({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ position: "absolute", top: 16, right: 16 }}>{children}</div>
  );
}

/* Inline mini-button for alert actions */
function ActionButton({
  variant = "secondary",
  children,
}: {
  variant?: "secondary" | "destructive-outline";
  children: React.ReactNode;
}) {
  const styles: React.CSSProperties = variant === "destructive-outline"
    ? { backgroundColor: "var(--color-destructive-subtle)", color: "var(--color-destructive)", border: "1px solid var(--color-border-destructive)" }
    : { backgroundColor: "var(--color-secondary)", color: "var(--color-foreground)", border: "1px solid var(--color-border)" };
  return (
    <button style={{ ...styles, height: 32, padding: "0 12px", borderRadius: 6, fontSize: 14, fontWeight: 500, cursor: "pointer" }}>
      {children}
    </button>
  );
}

export default function AlertFigma() {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 16, padding: 16 }}>
      {/* variant=default */}
      <Alert>
        <Info size={16} style={{ flexShrink: 0, marginTop: 2 }} />
        <div style={{ flex: 1 }}>
          <AlertTitle>Heads up!</AlertTitle>
          <AlertDescription>You can add components to your app.</AlertDescription>
        </div>
        <AlertAction>
          <ActionButton variant="secondary">Enable</ActionButton>
        </AlertAction>
      </Alert>

      {/* variant=destructive */}
      <Alert variant="destructive">
        <AlertCircle size={16} style={{ flexShrink: 0, marginTop: 2 }} />
        <div style={{ flex: 1 }}>
          <AlertTitle>Something went wrong</AlertTitle>
          <AlertDescription variant="destructive">Your session has expired. Please log in again.</AlertDescription>
        </div>
        <AlertAction>
          <ActionButton variant="destructive-outline">Retry</ActionButton>
        </AlertAction>
      </Alert>
    </div>
  )
}
