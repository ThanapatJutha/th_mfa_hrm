import { NavLink, Outlet } from "react-router-dom";
import { cn } from "@/lib/utils";
import { ROUTES } from "@/router/routes";

const NAV_ITEMS = [
  { label: "Button", to: ROUTES.SHOWCASE_BUTTON },
  { label: "Input", to: ROUTES.SHOWCASE_INPUT },
  { label: "Textarea", to: ROUTES.SHOWCASE_TEXTAREA },
  { label: "Checkbox", to: ROUTES.SHOWCASE_CHECKBOX },
  { label: "Alert", to: ROUTES.SHOWCASE_ALERT },
  { label: "Avatar", to: ROUTES.SHOWCASE_AVATAR },
  { label: "Empty State", to: ROUTES.SHOWCASE_EMPTY },
  { label: "Table", to: ROUTES.SHOWCASE_TABLE },
  { label: "Dropdown Menu", to: ROUTES.SHOWCASE_DROPDOWN },
  { label: "Icon", to: ROUTES.SHOWCASE_ICON },
];

export function ShowcaseLayout() {
  return (
    <div className="flex gap-8">
      {/* Sidebar nav */}
      <aside className="w-44 shrink-0">
        <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide mb-3">
          Components
        </p>
        <nav className="space-y-0.5">
          {NAV_ITEMS.map(({ label, to }) => (
            <NavLink
              key={to}
              to={to}
              className={({ isActive }) =>
                cn(
                  "block rounded-radius-md px-3 py-1.5 text-sm transition-colors",
                  isActive
                    ? "bg-sidebar-primary text-sidebar-primary-foreground font-medium"
                    : "text-muted-foreground hover:bg-accent hover:text-foreground"
                )
              }
            >
              {label}
            </NavLink>
          ))}
        </nav>
      </aside>

      {/* Component detail */}
      <div className="flex-1 min-w-0">
        <Outlet />
      </div>
    </div>
  );
}
