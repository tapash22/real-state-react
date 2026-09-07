export interface TabItem<T extends string | number> {
  id: T;
  label: string;
}

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
            <button
              key={item.id}
              type="button"
              onMouseEnter={() => onChange(item.id)}
              onMouseLeave={() => onChange(null)}
              className={`
                flex
                w-full
                cursor-pointer
                items-center
                justify-center
                whitespace-nowrap
                rounded-xs
                border-b-2
                py-1
                text-center
                text-sm
                font-semibold
                text-[var(--text)]
                transition-all
                duration-200
                md:text-base
                ${
                  isActive
                    ? "border-violet-500 opacity-100"
                    : "border-transparent opacity-70"
                }
              `}
            >
              {item.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}
