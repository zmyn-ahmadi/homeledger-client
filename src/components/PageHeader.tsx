import React from "react";

type PageHeaderProps = {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  children?: React.ReactNode;
};

export const PageHeader = ({
  eyebrow,
  title,
  subtitle,
  children,
}: PageHeaderProps) => {
  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
      <div className="flex flex-col gap-1.5">
        {eyebrow && (
          <span className="font-label text-[11px] uppercase tracking-[0.2em] text-(--primary)/70">
            {eyebrow}
          </span>
        )}
        <h1 className="text-2xl md:text-3xl font-semibold tracking-tight text-white">
          {title}
        </h1>
        {subtitle && <p className="text-sm text-white/45">{subtitle}</p>}
      </div>
      {children && (
        <div className="flex items-center gap-3 shrink-0">{children}</div>
      )}
    </div>
  );
};
