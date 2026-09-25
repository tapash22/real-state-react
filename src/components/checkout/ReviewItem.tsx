function ReviewItem({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <span className="text-[var(--muted)]">{label}: </span>

      <strong className="text-[var(--text)]">{value}</strong>
    </div>
  );
}
