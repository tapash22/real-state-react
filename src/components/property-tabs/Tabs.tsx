import { TabItem } from "../../types/types";
import { Button } from "../ui/Button";

interface TabsProps<T extends string | number> {
  items: TabItem<T>[];
  activeId: T | null;
  onChange: (id: T) => void;
  /** Trigger mode selection on click instead of hover */
  triggerOn?: "click" | "hover";
  /** Optional custom container styles for the outer wrapper */
  containerClassName?: string;
  /** Optional custom grid layout styles for inner items wrapper */
  gridClassName?: string;
}

export function Tabs<T extends string | number>({
  items,
  activeId,
  onChange,
  triggerOn = "click",
  containerClassName = "flex w-full items-center justify-center p-0 lg:p-4",
  gridClassName,
}: TabsProps<T>) {
  return (
    <div className={containerClassName}>
      <div
        className={
          gridClassName ||
          "grid w-full grid-cols-3 gap-1 lg:w-3/4 lg:grid-cols-7 lg:gap-3 xl:w-1/2"
        }
      >
        {items.map((item) => {
          const isActive = activeId === item.id;

          return (
            <Button
              key={item.id}
              variant="tab"
              color="primary"
              rounded="sm"
              size="sm"
              onClick={
                triggerOn === "click" ? () => onChange(item.id) : undefined
              }
              onMouseEnter={
                triggerOn === "hover" ? () => onChange(item.id) : undefined
              }
              aria-pressed={isActive}
              className={`w-full text-sm font-semibold transition-all tracking-widest outline-none focus:outline-none focus:ring-0 focus:shadow-none active:outline-none active:shadow-none select-none ${
                isActive
                  ? "border-b-2 border-[var(--primary)] opacity-100"
                  : "border-b-0 border-transparent opacity-70"
              }`}
            >
              {item.label}
            </Button>
          );
        })}
      </div>
    </div>
  );
}