import { ReactNode } from "react";

interface SectionHeaderProps {
  tagTitle?: string;
  headerTitle?: string;
  subTitle?: string;
  children?: ReactNode;
}

export function SectionHeader({
  tagTitle,
  headerTitle,
  subTitle,
  children,
}: SectionHeaderProps) {
  return (
    <div className="w-full flex flex-col justify-center items-center text-center space-y-2 lg:max-w-6xl z-10 p-5 lg:p-5">
      {tagTitle && (
        <h2
          style={{ color: "var(--text)" }}
          className="text-sm font-semibold lg:font-extrabold uppercase tracking-wider lg:tracking-widest "
        >
          {tagTitle}
        </h2>
      )}
      {headerTitle && (
        <h3
          style={{ color: "var(--text-heading)" }}
          className="text-lg lg:text-3xl font-semibold lg:font-extrabold tracking-wide lg:tracking-wider lg:whitespace-nowrap"
        >
          {headerTitle}
        </h3>
      )}

      {subTitle && (
        <p
          style={{ color: "var(--text-paragraph)" }}
          className="text-sm font-light lg:font-medium tracking-wide lg:tracking-wider leading-normal lg:leading-relaxed"
        >
          {subTitle}
        </p>
      )}

      {children ? children : null}
    </div>
  );
}
