interface CheckoutStepHeaderProps {
  title: string;
  description: string;
}

export default function CheckoutStepHeader({
  title,
  description,
}: CheckoutStepHeaderProps) {
  return (
    <div className="border-b border-[var(--bprder)] pb-4">
      <h2 className="text-xl font-bold text-[var(--text)]">{title}</h2>

      <p className=" py-2 text-sm text-[var(--muted)]">{description}</p>
    </div>
  );
}
