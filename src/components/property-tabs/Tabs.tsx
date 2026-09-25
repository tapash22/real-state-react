import { TabItem } from "../../types/types";
import { Button } from "../ui/Button";

interface TabsProps<T extends string | number> {
  items: TabItem<T>[];
  activeId: T | null;
  onChange: (id: T | null) => void;
}

export function Tabs<T extends string | number>({
  items,
  activeId,
  onChange,
}: TabsProps<T>) {
  return (
    <div className="flex w-full items-center justify-center p-0 lg:p-4">
      <div
        className="
          grid
          w-full
          grid-cols-3
          gap-1
          lg:w-3/4
          lg:grid-cols-7
          lg:gap-3
          xl:w-1/2
        "
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
              onMouseEnter={() => onChange(item.id)}
              onMouseLeave={() => onChange(null)}
              aria-pressed={isActive}
              className={`
                w-full
                border-b-2
                text-[var(--text)]
                ${
                  isActive
                    ? "border-violet-500 opacity-100"
                    : "border-transparent opacity-70"
                }
              `}
            >
              {item.label}
            </Button>
          );
        })}
      </div>
    </div>
  );
}
