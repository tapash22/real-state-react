import { TabItem } from "../../types/types";
import { Button } from "../ui/Button";

interface TabsProps<T extends string | number> {
  items: TabItem<T>[];
  activeId: T | null;
  onChange: (id: T) => void;
  /** Trigger mode selection on click instead of hover */
  triggerOn?: "click" | "hover";
  /** Optional custom container styles to override default grid layouts */
  containerClassName?: string;
}

export function Tabs<T extends string | number>({
  items,
  activeId,
  onChange,
  triggerOn = "click",
  containerClassName,
}: TabsProps<T>) {
  return (
    <div
      className={
        containerClassName ||
        "flex w-full items-center justify-center p-0 lg:p-4"
      }
    >
      <div
        className={
          containerClassName
            ? "grid w-full grid-cols-2 gap-1"
            : "grid w-full grid-cols-3 gap-1 lg:w-3/4 lg:grid-cols-7 lg:gap-3 xl:w-1/2"
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
              className={`w-full text-xs font-semibold transition-all ${
                isActive
                  ? "border-b-2 border-violet-500 opacity-100"
                  : "border-b-2 border-transparent opacity-70"
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