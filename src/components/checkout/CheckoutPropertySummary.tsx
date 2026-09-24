import type { CheckoutCosts } from "../../data";

interface CheckoutPropertySummaryProps {
  propertyName: string;
  location: string;
  imageUrl?: string;
  costs: CheckoutCosts;
}

export default function CheckoutPropertySummary({
  propertyName,
  location,
  imageUrl,
  costs,
}: CheckoutPropertySummaryProps) {
  return (
    <aside className="h-fit rounded-3xl border border-[var(--border)] p-5 shadow-sm space-y-3">
      {/* Property Image */}
      <div className="overflow-hidden rounded-2xl">
        {imageUrl ? (
          <img
            src={imageUrl}
            alt={propertyName}
            className="h-36 w-full object-cover"
          />
        ) : (
          <div className="flex h-36 items-center justify-center bg-gradient-to-br from-slate-200 to-slate-100">
            <span className="text-xs font-bold text-[var(--text)] tracking-wider">
              Property Image
            </span>
          </div>
        )}
      </div>

      {/* Property Information */}
      <div className="border-b border-[var(--border)] p-2 ">
        <h2 className="text-base font-black text-[var(--text)]">
          {propertyName}
        </h2>
        <p className="text-xs text-[var(--text)]">{location}</p>
      </div>

      {/* Cost Breakdown */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-xs text-[var(--text)]">Monthly Rent</span>

          <strong className="text-sm text-[var(--text)] tracking-wide">
            ${costs.monthlyRent.toLocaleString()}
          </strong>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-xs text-[var(--text)]">Security Deposit</span>

          <strong className="text-sm text-[var(--text)] tracking-wide">
            ${costs.deposit.toLocaleString()}
          </strong>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-xs text-[var(--text)]">Registration Fee</span>

          <strong className="text-sm text-[var(--text)] tracking-wide">
            ${costs.adminFee.toLocaleString()}
          </strong>
        </div>

        {/* Total */}
        <div className="border-t border-[var(--primary)] p-2">
          <div className="flex items-center justify-between">
            <span className="text-sm font-bold text-[var(--text)] tracking-wide">
              Total Due
            </span>

            <strong className="text-lg font-black text-[var(--info)] tracking-wide">
              ${costs.totalDue.toLocaleString()}
            </strong>
          </div>
        </div>
      </div>

      {/* Payment Note */}
      <div className="rounded-2xl p-4 bg-[var(--map-glow-soft)]">
        <p className="text-[12px] leading-5 text-[var(--muted)]">
          Your initial payment is calculated from the monthly rent, security
          deposit and registration fee.
        </p>
      </div>
    </aside>
  );
}
