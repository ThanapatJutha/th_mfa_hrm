import { Outlet, NavLink, useNavigate } from "react-router-dom";
import { Layers, Users, BarChart2, User, TrendingUp, ChevronRight, LogOut } from "lucide-react";
import { cn } from "@/lib/utils";
import { useAppSelector, useAppDispatch } from "@/store/hooks";
import { logout } from "@/features/auth/store/authSlice";
import { ROUTES } from "@/router/routes";
import { Avatar, AvatarFallback } from "@/components/common/avatar";

const adminNavItems = [
    { label: "ข้อมูลพนักงาน", icon: Users, to: ROUTES.EMPLOYEES },
    { label: "การประเมินผลงาน", icon: BarChart2, to: ROUTES.PERFORMANCE },
    { label: "Components", icon: Layers, to: ROUTES.SHOWCASE },
];

const employeeNavItems = [
    { label: "โปรไฟล์ของฉัน", icon: User, to: ROUTES.MY_PROFILE },
    { label: "ผลการประเมินของฉัน", icon: TrendingUp, to: ROUTES.MY_PERFORMANCE },
];

export function AppLayout() {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const user = useAppSelector((s) => s.auth.user);

    const navItems = user?.role === "admin" ? adminNavItems : employeeNavItems;

    function handleLogout() {
        dispatch(logout());
        navigate(ROUTES.LOGIN, { replace: true });
    }

    return (
        <div className="flex min-h-svh bg-background">
            {/* Sidebar */}
            <aside className="w-60 shrink-0 border-r border-sidebar-border bg-sidebar flex flex-col">
                {/* Logo / App name */}
                <div className="h-16 flex items-center gap-2 px-5 border-b border-sidebar-border">
                    <span className="text-primary font-heading font-semibold text-lg leading-tight">
                        MFA HRM
                    </span>
                </div>

                {/* Nav */}
                <nav className="flex-1 px-3 py-4 space-y-1">
                    {navItems.map(({ label, icon: Icon, to }) => (
                        <NavLink
                            key={to}
                            to={to}
                            className={({ isActive }) =>
                                cn(
                                    "group flex items-center gap-3 rounded-radius-md px-3 py-2 text-sm transition-colors",
                                    isActive
                                        ? "bg-sidebar-primary text-sidebar-primary-foreground font-medium"
                                        : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                                )
                            }
                        >
                            <Icon size={16} className="shrink-0" />
                            <span className="flex-1">{label}</span>
                            <ChevronRight
                                size={14}
                                className="invisible group-hover:visible text-current"
                            />
                        </NavLink>
                    ))}
                </nav>

                {/* Footer: user + logout */}
                <div className="px-4 py-4 border-t border-sidebar-border space-y-2">
                    {user && (
                        <div className="flex items-center gap-3 px-1">
                            <Avatar size="sm" badge>
                                <AvatarFallback>
                                    {user.name.slice(0, 2).toUpperCase()}
                                </AvatarFallback>
                            </Avatar>
                            <div className="min-w-0">
                                <p className="text-xs font-medium text-sidebar-foreground truncate">{user.name}</p>
                                <p className="text-xs text-muted-foreground">
                                    {user.role === "admin" ? "ผู้ดูแลระบบ" : "พนักงาน"}
                                </p>
                            </div>
                        </div>
                    )}
                    <button
                        onClick={handleLogout}
                        className="w-full flex items-center gap-2 px-3 py-2 text-sm text-muted-foreground rounded-radius-md hover:bg-sidebar-accent hover:text-sidebar-accent-foreground transition-colors"
                    >
                        <LogOut size={14} />
                        ออกจากระบบ
                    </button>
                    <p className="text-xs text-muted-foreground px-1">กระทรวงการต่างประเทศ</p>
                </div>
            </aside>

            {/* Main */}
            <div className="flex-1 flex flex-col min-w-0">
                {/* Top bar */}
                <header className="h-16 shrink-0 border-b border-border bg-background flex items-center px-6">
                    <h1 className="text-sm font-medium text-muted-foreground">
                        ระบบบริหารทรัพยากรบุคคล — กระทรวงการต่างประเทศ
                    </h1>
                </header>

                {/* Page content */}
                <main className="flex-1 p-6 overflow-auto">
                    <Outlet />
                </main>
            </div>
        </div>
    );
}
