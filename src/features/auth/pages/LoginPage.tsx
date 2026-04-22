import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "@/store/hooks";
import { login } from "@/features/auth/store/authSlice";
import { mockUsers } from "@/mock/users";
import { ROUTES } from "@/router/routes";

export function LoginPage() {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    function handleLogin(userId: string) {
        const user = mockUsers.find((u) => u.id === userId);
        if (!user) return;
        dispatch(login(user));
        if (user.role === "admin") {
            navigate(ROUTES.EMPLOYEES, { replace: true });
        } else {
            navigate(ROUTES.MY_PROFILE, { replace: true });
        }
    }

    return (
        <div className="min-h-svh bg-background flex items-center justify-center p-6">
            <div className="w-full max-w-sm">
                {/* Logo */}
                <div className="mb-10 text-center">
                    <h1 className="text-2xl font-heading font-semibold text-foreground mb-1">
                        MFA HRM
                    </h1>
                    <p className="text-sm text-muted-foreground">ระบบบริหารทรัพยากรบุคคล</p>
                    <p className="text-xs text-muted-foreground mt-0.5">กระทรวงการต่างประเทศ</p>
                </div>

                {/* Role picker */}
                <div className="bg-card border border-border rounded-radius-lg p-6 space-y-4">
                    <p className="text-sm font-medium text-foreground text-center mb-2">
                        เลือกเข้าสู่ระบบในฐานะ
                    </p>

                    <button
                        onClick={() => handleLogin("user-001")}
                        className="w-full flex flex-col items-start gap-0.5 border border-border rounded-radius-md px-4 py-3 hover:bg-accent hover:border-primary transition-colors text-left"
                    >
                        <span className="text-sm font-medium text-foreground">ผู้ดูแลระบบ (Admin)</span>
                        <span className="text-xs text-muted-foreground">สมชาย บุญมี — จัดการข้อมูลพนักงานและการประเมิน</span>
                    </button>

                    <button
                        onClick={() => handleLogin("user-002")}
                        className="w-full flex flex-col items-start gap-0.5 border border-border rounded-radius-md px-4 py-3 hover:bg-accent hover:border-primary transition-colors text-left"
                    >
                        <span className="text-sm font-medium text-foreground">พนักงาน (Employee)</span>
                        <span className="text-xs text-muted-foreground">สุดา แก้วใส — ดูข้อมูลส่วนตัวและผลประเมิน</span>
                    </button>
                </div>

                <p className="text-xs text-muted-foreground text-center mt-4">
                    ระบบจำลอง • ข้อมูลจะถูกรีเซ็ตทุกครั้งที่รีเฟรชหน้า
                </p>
            </div>
        </div>
    );
}
