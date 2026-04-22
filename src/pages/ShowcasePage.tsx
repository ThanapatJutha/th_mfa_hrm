import { useState } from "react";
import {
  Mail,
  AlertCircle,
  Info,
  Trash2,
  ChevronRight,
  Check,
  Search,
  User,
  Settings,
  LogOut,
  Bell,
  Star,
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

// ── Figma design system components ───────────────────────────
import { Input } from "@figma/components/input";
import { Textarea } from "@figma/components/textarea";
import { Checkbox } from "@figma/components/checkbox";
import { Separator } from "@figma/components/separator";
import { Empty, EmptyMedia, EmptyTitle, EmptyDescription, EmptyActions } from "@figma/components/empty";
import {
  Table, TableHeader, TableBody, TableFooter,
  TableRow, TableHead, TableCell, TableCaption,
} from "@figma/components/table";
import { LucideIcon } from "@figma/components/lucide-icon";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuLabel,
} from "@figma/components/dropdown-menu";

// ── Helpers ───────────────────────────────────────────────────

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="space-y-4">
      <h2 className="text-subheading-5 text-foreground border-b border-border pb-2">{title}</h2>
      {children}
    </section>
  );
}

function Row({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-wrap items-center gap-3">
      <span className="w-44 shrink-0 text-xs text-muted-foreground">{label}</span>
      {children}
    </div>
  );
}

// ── Seed data for Table demo ──────────────────────────────────
const TABLE_DATA = [
  { code: "MFA-001", name: "สมชาย บุญมี", dept: "สำนักงานเลขานุการกรม", status: "ปฏิบัติงาน" },
  { code: "MFA-002", name: "วิชัย ประสิทธิ์", dept: "กองการเจ้าหน้าที่", status: "ปฏิบัติงาน" },
  { code: "MFA-003", name: "สุดา แก้วใส", dept: "กองการเจ้าหน้าที่", status: "ปฏิบัติงาน" },
];

// ── Page ─────────────────────────────────────────────────────

export function ShowcasePage() {
  const [checked, setChecked] = useState(false);
  const [indeterminate, setIndeterminate] = useState(false);

  return (
    <div className="max-w-3xl mx-auto space-y-12 py-2">
      <div>
        <h1 className="text-heading-6 text-foreground">Component Showcase</h1>
        <p className="text-sm text-muted-foreground mt-1">
          MFA Design System — all available components
        </p>
      </div>

      {/* ── BUTTON ─────────────────────────────────────────── */}
      <Section title="Button">
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
        <Row label="sizes">
          <Button size="sm">Small</Button>
          <Button size="default">Default</Button>
          <Button size="lg">Large</Button>
          <Button size="icon" variant="secondary"><Mail size={16} /></Button>
          <Button size="icon" variant="primary"><Check size={16} /></Button>
        </Row>
        <Row label="with icon">
          <Button variant="primary"><Mail size={16} /> Send</Button>
          <Button variant="secondary"><ChevronRight size={16} /> Continue</Button>
          <Button variant="destructive"><Trash2 size={16} /> Delete</Button>
        </Row>
      </Section>

      <Separator />

      {/* ── INPUT ──────────────────────────────────────────── */}
      <Section title="Input">
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

      <Separator />

      {/* ── TEXTAREA ───────────────────────────────────────── */}
      <Section title="Textarea">
        <Row label="default">
          <Textarea className="w-64" placeholder="กรอกรายละเอียด..." />
        </Row>
        <Row label="disabled">
          <Textarea className="w-64" placeholder="Disabled" disabled />
        </Row>
      </Section>

      <Separator />

      {/* ── CHECKBOX ───────────────────────────────────────── */}
      <Section title="Checkbox">
        <Row label="unchecked">
          <Checkbox />
        </Row>
        <Row label="checked (interactive)">
          <Checkbox checked={checked} onCheckedChange={(v) => setChecked(v === true)} />
        </Row>
        <Row label="indeterminate">
          <Checkbox indeterminate checked={indeterminate} onCheckedChange={(v) => setIndeterminate(v === true)} />
        </Row>
        <Row label="disabled">
          <Checkbox disabled />
          <Checkbox disabled checked />
        </Row>
      </Section>

      <Separator />

      {/* ── ALERT ──────────────────────────────────────────── */}
      <Section title="Alert">
        <div className="space-y-3">
          <Alert variant="default">
            <AlertIcon><Info /></AlertIcon>
            <AlertContent>
              <AlertTitle>Heads up!</AlertTitle>
              <AlertDescription>You can add components to your app using the CLI.</AlertDescription>
            </AlertContent>
            <AlertAction>
              <Button size="sm" variant="secondary">Enable</Button>
            </AlertAction>
          </Alert>

          <Alert variant="destructive">
            <AlertIcon><AlertCircle /></AlertIcon>
            <AlertContent>
              <AlertTitle>Something went wrong</AlertTitle>
              <AlertDescription>Your session has expired. Please log in again.</AlertDescription>
            </AlertContent>
            <AlertAction>
              <Button size="sm" variant="destructive-outline">Retry</Button>
            </AlertAction>
          </Alert>
        </div>
      </Section>

      <Separator />

      {/* ── AVATAR ─────────────────────────────────────────── */}
      <Section title="Avatar">
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
        <Row label="sizes (fallback)">
          <Avatar size="sm"><AvatarFallback size="sm">สช</AvatarFallback></Avatar>
          <Avatar size="default"><AvatarFallback>สช</AvatarFallback></Avatar>
          <Avatar size="lg"><AvatarFallback size="lg">สช</AvatarFallback></Avatar>
        </Row>
        <Row label="with badge">
          <Avatar size="sm" badge>
            <AvatarImage src="https://i.pravatar.cc/64?img=4" alt="User" />
            <AvatarFallback size="sm">CN</AvatarFallback>
          </Avatar>
          <Avatar size="default" badge>
            <AvatarFallback>สด</AvatarFallback>
          </Avatar>
          <Avatar size="lg" badge>
            <AvatarFallback size="lg">สช</AvatarFallback>
          </Avatar>
        </Row>
        <Row label="group">
          <AvatarGroup>
            <Avatar size="sm"><AvatarImage src="https://i.pravatar.cc/64?img=10" alt="A" /><AvatarFallback size="sm">A</AvatarFallback></Avatar>
            <Avatar size="sm"><AvatarImage src="https://i.pravatar.cc/64?img=11" alt="B" /><AvatarFallback size="sm">B</AvatarFallback></Avatar>
            <Avatar size="sm"><AvatarFallback size="sm">+3</AvatarFallback></Avatar>
          </AvatarGroup>
        </Row>
      </Section>

      <Separator />

      {/* ── EMPTY STATE ────────────────────────────────────── */}
      <Section title="Empty State">
        <Row label="default">
          <Empty className="w-64">
            <EmptyMedia><Bell size={20} className="text-muted-foreground" /></EmptyMedia>
            <EmptyTitle>ไม่มีการแจ้งเตือน</EmptyTitle>
            <EmptyDescription>คุณยังไม่มีการแจ้งเตือนใดๆ ในขณะนี้</EmptyDescription>
          </Empty>
        </Row>
        <Row label="with action">
          <Empty variant="outline" className="w-72">
            <EmptyMedia><Star size={20} className="text-muted-foreground" /></EmptyMedia>
            <EmptyTitle>ไม่พบข้อมูล</EmptyTitle>
            <EmptyDescription>ลองค้นหาด้วยคำอื่น หรือเพิ่มข้อมูลใหม่</EmptyDescription>
            <EmptyActions>
              <Button size="sm" variant="primary">เพิ่มใหม่</Button>
            </EmptyActions>
          </Empty>
        </Row>
        <Row label="background variant">
          <Empty variant="background" className="w-72">
            <EmptyMedia><User size={20} className="text-muted-foreground" /></EmptyMedia>
            <EmptyTitle>ไม่พบพนักงาน</EmptyTitle>
            <EmptyDescription>ยังไม่มีพนักงานในระบบ</EmptyDescription>
          </Empty>
        </Row>
      </Section>

      <Separator />

      {/* ── TABLE ──────────────────────────────────────────── */}
      <Section title="Table">
        <Table>
          <TableCaption>รายการพนักงานตัวอย่าง</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>รหัส</TableHead>
              <TableHead>ชื่อ-สกุล</TableHead>
              <TableHead>หน่วยงาน</TableHead>
              <TableHead>สถานะ</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {TABLE_DATA.map((row) => (
              <TableRow key={row.code}>
                <TableCell className="font-mono text-xs">{row.code}</TableCell>
                <TableCell className="font-medium">{row.name}</TableCell>
                <TableCell className="text-muted-foreground">{row.dept}</TableCell>
                <TableCell>
                  <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-700">
                    {row.status}
                  </span>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Section>

      <Separator />

      {/* ── DROPDOWN MENU ──────────────────────────────────── */}
      <Section title="Dropdown Menu">
        <Row label="basic">
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

      <Separator />

      {/* ── LUCIDE ICON ────────────────────────────────────── */}
      <Section title="LucideIcon (semantic colors)">
        <Row label="color tokens">
          <LucideIcon icon={Bell} color="primary" size={24} />
          <LucideIcon icon={Bell} color="secondary" size={24} />
          <LucideIcon icon={Bell} color="tertiary" size={24} />
          <LucideIcon icon={Bell} color="success" size={24} />
          <LucideIcon icon={Bell} color="warning" size={24} />
          <LucideIcon icon={Bell} color="error" size={24} />
          <LucideIcon icon={Bell} color="disabled" size={24} />
        </Row>
        <Row label="sizes">
          <LucideIcon icon={Star} size={16} />
          <LucideIcon icon={Star} size={20} />
          <LucideIcon icon={Star} size={24} />
          <LucideIcon icon={Star} size={32} />
          <LucideIcon icon={Star} size={48} />
        </Row>
      </Section>
    </div>
  );
}

