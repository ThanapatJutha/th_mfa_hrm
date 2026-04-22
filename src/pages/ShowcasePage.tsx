import {
  Mail,
  AlertCircle,
  Info,
  Trash2,
  ChevronRight,
  Check,
} from "lucide-react";
import {
  Button,
  Alert,
  AlertIcon,
  AlertContent,
  AlertTitle,
  AlertDescription,
  AlertAction,
  Avatar,
  AvatarImage,
  AvatarFallback,
  AvatarGroup,
} from "@/components/common";

// ── Section wrapper ───────────────────────────────────────────

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="space-y-4">
      <h2 className="text-subheading-5 text-foreground border-b border-border pb-2">
        {title}
      </h2>
      {children}
    </section>
  );
}

function Row({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-wrap items-center gap-3">
      <span className="w-40 shrink-0 text-xs text-muted-foreground">{label}</span>
      {children}
    </div>
  );
}

// ── Page ─────────────────────────────────────────────────────

export function ShowcasePage() {
  return (
    <div className="max-w-3xl mx-auto space-y-12 py-2">
      <div>
        <h1 className="text-heading-6 text-foreground">Component Showcase</h1>
        <p className="text-sm text-muted-foreground mt-1">
          MFA Design System — Button · Alert · Avatar
        </p>
      </div>

      {/* ── BUTTON ─────────────────────────────────────────── */}
      <Section title="Button">
        {/* Variants */}
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

        {/* Sizes */}
        <Row label="sizes">
          <Button size="sm">Small</Button>
          <Button size="default">Default</Button>
          <Button size="lg">Large</Button>
          <Button size="icon" variant="secondary"><Mail size={16} /></Button>
          <Button size="icon" variant="primary"><Check size={16} /></Button>
        </Row>

        {/* With icons */}
        <Row label="with icon">
          <Button variant="primary"><Mail size={16} /> Send</Button>
          <Button variant="secondary"><ChevronRight size={16} /> Continue</Button>
          <Button variant="destructive"><Trash2 size={16} /> Delete</Button>
        </Row>
      </Section>

      {/* ── ALERT ──────────────────────────────────────────── */}
      <Section title="Alert">
        <div className="space-y-3">
          {/* Default */}
          <Alert variant="default">
            <AlertIcon><Info /></AlertIcon>
            <AlertContent>
              <AlertTitle>Heads up!</AlertTitle>
              <AlertDescription>
                You can add components to your app using the CLI.
              </AlertDescription>
            </AlertContent>
            <AlertAction>
              <Button size="sm" variant="secondary">Enable</Button>
            </AlertAction>
          </Alert>

          {/* Default — no action */}
          <Alert variant="default">
            <AlertIcon><Info /></AlertIcon>
            <AlertContent>
              <AlertTitle>Information</AlertTitle>
              <AlertDescription>
                This is a default alert without an action button.
              </AlertDescription>
            </AlertContent>
          </Alert>

          {/* Destructive */}
          <Alert variant="destructive">
            <AlertIcon><AlertCircle /></AlertIcon>
            <AlertContent>
              <AlertTitle>Something went wrong</AlertTitle>
              <AlertDescription>
                Your session has expired. Please log in again.
              </AlertDescription>
            </AlertContent>
            <AlertAction>
              <Button size="sm" variant="destructive-outline">Retry</Button>
            </AlertAction>
          </Alert>

          {/* Destructive — no action */}
          <Alert variant="destructive">
            <AlertIcon><AlertCircle /></AlertIcon>
            <AlertContent>
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>
                Failed to save changes. Please try again later.
              </AlertDescription>
            </AlertContent>
          </Alert>
        </div>
      </Section>

      {/* ── AVATAR ─────────────────────────────────────────── */}
      <Section title="Avatar">
        {/* Sizes — image */}
        <Row label="sizes (image)">
          <Avatar size="sm">
            <AvatarImage src="https://i.pravatar.cc/64?img=1" alt="User" />
            <AvatarFallback size="sm">CN</AvatarFallback>
          </Avatar>
          <Avatar size="default">
            <AvatarImage src="https://i.pravatar.cc/64?img=2" alt="User" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <Avatar size="lg">
            <AvatarImage src="https://i.pravatar.cc/64?img=3" alt="User" />
            <AvatarFallback size="lg">CN</AvatarFallback>
          </Avatar>
        </Row>

        {/* Sizes — fallback initials */}
        <Row label="sizes (fallback)">
          <Avatar size="sm">
            <AvatarFallback size="sm">สช</AvatarFallback>
          </Avatar>
          <Avatar size="default">
            <AvatarFallback>สช</AvatarFallback>
          </Avatar>
          <Avatar size="lg">
            <AvatarFallback size="lg">สช</AvatarFallback>
          </Avatar>
        </Row>

        {/* With badge */}
        <Row label="with badge">
          <Avatar size="sm" badge>
            <AvatarImage src="https://i.pravatar.cc/64?img=4" alt="User" />
            <AvatarFallback size="sm">CN</AvatarFallback>
          </Avatar>
          <Avatar size="default" badge>
            <AvatarImage src="https://i.pravatar.cc/64?img=5" alt="User" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <Avatar size="lg" badge>
            <AvatarFallback size="lg">สช</AvatarFallback>
          </Avatar>
        </Row>

        {/* Image error → fallback */}
        <Row label="broken src → fallback">
          <Avatar size="default">
            <AvatarImage src="/does-not-exist.jpg" alt="User" />
            <AvatarFallback>ER</AvatarFallback>
          </Avatar>
        </Row>

        {/* Group */}
        <Row label="group">
          <AvatarGroup>
            <Avatar size="sm">
              <AvatarImage src="https://i.pravatar.cc/64?img=10" alt="User" />
              <AvatarFallback size="sm">A</AvatarFallback>
            </Avatar>
            <Avatar size="sm">
              <AvatarImage src="https://i.pravatar.cc/64?img=11" alt="User" />
              <AvatarFallback size="sm">B</AvatarFallback>
            </Avatar>
            <Avatar size="sm">
              <AvatarFallback size="sm">+3</AvatarFallback>
            </Avatar>
          </AvatarGroup>
        </Row>
      </Section>
    </div>
  );
}
