import { Link } from "react-router-dom";
import { ROUTES } from "@/router/routes";

export function NotFoundPage() {
    return (
        <div className="flex min-h-svh flex-col items-center justify-center gap-4 bg-background text-foreground">
            <p className="text-7xl font-heading font-semibold text-primary">404</p>
            <h1 className="text-heading-6">ไม่พบหน้าที่ต้องการ</h1>
            <p className="text-sm text-muted-foreground">
                URL ที่ระบุไม่มีในระบบ
            </p>
            <Link
                to={ROUTES.SHOWCASE}
                className="mt-2 rounded-radius-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary-hovered transition-colors"
            >
                กลับหน้าหลัก
            </Link>
        </div>
    );
}
