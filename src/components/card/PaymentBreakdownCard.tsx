import React, { useState } from "react";
import {
  FiArrowRight,
  FiCheck,
  FiChevronDown,
  FiChevronUp,
  FiInfo,
  FiShield,
} from "react-icons/fi";

// --- Types ---
export interface UtilityItem {
  name: string;
  isIncluded: boolean;
}

export interface PaymentBreakdownProps {
  platformName?: string;
  tenantProtectionFee?: number | string;
  landlordName: string;
  landlordAvatarUrl?: string;
  securityDeposit: number;
  utilities?: UtilityItem[];
  paymentLogos?: string[];
  onSelectDates?: () => void;
}

// --- Component ---
export const PaymentBreakdownCard: React.FC<PaymentBreakdownProps> = ({
  platformName = "HousingAnywhere",
  tenantProtectionFee = "Select dates",
  landlordName = "Ivetta",
  landlordAvatarUrl = "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&q=80",
  securityDeposit = 900,
  utilities = [
    { name: "Electricity", isIncluded: true },
    { name: "Gas", isIncluded: true },
    { name: "Internet", isIncluded: true },
    { name: "Water", isIncluded: true },
  ],
  onSelectDates,
}) => {
  const [isProtectionOpen, setIsProtectionOpen] = useState(false);

  return (
    <div className="w-full max-w-2xl bg-white p-6 rounded-2xl shadow-sm text-slate-800 font-sans space-y-6">
      <p className="text-sm text-slate-600 font-medium">
        A breakdown of all costs for your stay.
      </p>

      {/* --- SECTION 1: PAY NOW (PLATFORM) --- */}
      <div className="space-y-4">
        {/* Header */}
        <div className="flex items-center gap-2 text-base font-bold text-slate-900">
          <span>You</span>
          <FiArrowRight className="text-slate-400" />
          <span className="text-[#0c2340]">{platformName}</span>
        </div>

        <p className="text-xs text-slate-500 font-medium">
          Pay this now to secure your place.
        </p>

        {/* Cost Rows */}
        <div className="space-y-3 pt-2 text-sm">
          {/* Protection Fee */}
          <div className="flex items-baseline justify-between">
            <div className="flex items-center gap-1.5 text-slate-700 font-medium">
              <span>Tenant Protection fee</span>
              <FiInfo className="text-slate-400 cursor-pointer" size={15} />
            </div>
            <div className="grow border-b border-dotted border-slate-300 mx-2" />
            <button
              onClick={onSelectDates}
              className="text-xs font-semibold text-slate-900 hover:underline border-b border-slate-900 border-dashed"
            >
              {typeof tenantProtectionFee === "number"
                ? `€${tenantProtectionFee}`
                : tenantProtectionFee}
            </button>
          </div>
        </div>

        {/* Accordion Banner */}
        <div className="bg-[#f0f5ff] rounded-xl overflow-hidden border border-[#e0ebff]">
          <button
            onClick={() => setIsProtectionOpen(!isProtectionOpen)}
            className="w-full px-4 py-3 flex items-center justify-between text-[#1d4ed8] text-sm font-semibold hover:bg-blue-100/50 transition-colors"
          >
            <div className="flex items-center gap-2">
              <FiShield className="shrink-0" size={16} />
              <span>Secured by Tenant Protection</span>
            </div>
            {isProtectionOpen ? (
              <FiChevronUp size={18} />
            ) : (
              <FiChevronDown size={18} />
            )}
          </button>
          {isProtectionOpen && (
            <div className="px-4 pb-3 text-xs text-slate-600 space-y-1 border-t border-blue-100 pt-2">
              <p>
                Your money is safe with us until 48 hours after you move in.
              </p>
            </div>
          )}
        </div>

        {/* Payment Methods */}
        <div className="pt-2 space-y-2">
          <p className="text-xs font-semibold text-slate-600">Pay with</p>
          <div className="flex flex-wrap items-center gap-3 pt-1 grayscale opacity-75">
            <span className="px-2 py-1 bg-slate-100 rounded text-[10px] font-bold tracking-wider">
              VISA
            </span>
            <span className="px-2 py-1 bg-slate-100 rounded text-[10px] font-bold tracking-wider">
              MC
            </span>
            <span className="px-2 py-1 bg-slate-100 rounded text-[10px] font-bold tracking-wider">
              AMEX
            </span>
            <span className="px-2 py-1 bg-slate-100 rounded text-[10px] font-bold tracking-wider">
              Sofort.
            </span>
            <span className="px-2 py-1 bg-slate-100 rounded text-[10px] font-bold tracking-wider">
              iDEAL
            </span>
            <span className="px-2 py-1 bg-slate-100 rounded text-[10px] font-bold tracking-wider">
              giropay
            </span>
          </div>
        </div>
      </div>

      <hr className="border-slate-200" />

      {/* --- SECTION 2: FUTURE COSTS (LANDLORD) --- */}
      <div className="space-y-4">
        {/* Header */}
        <div className="flex items-center gap-2 text-base font-bold text-slate-900">
          <span>You</span>
          <FiArrowRight className="text-slate-400" />
          <div className="flex items-center gap-2">
            <img
              src={landlordAvatarUrl}
              alt={landlordName}
              className="w-7 h-7 rounded-full object-cover"
            />
            <span>{landlordName}</span>
          </div>
        </div>

        <p className="text-xs text-slate-500 font-medium">
          Future rental costs to the landlord. You’ll pay these directly, per
          your contract.
        </p>

        {/* Security Deposit */}
        <div className="space-y-3 pt-2 text-sm">
          <div className="flex items-baseline justify-between">
            <div className="flex items-center gap-1.5 text-slate-700 font-medium">
              <span>
                Security deposit{" "}
                <span className="text-slate-400 font-normal">
                  before move-in
                </span>
              </span>
              <FiInfo className="text-slate-400 cursor-pointer" size={15} />
            </div>
            <div className="grow border-b border-dotted border-slate-300 mx-2" />
            <span className="font-semibold text-slate-900">
              €{securityDeposit.toFixed(2)}
            </span>
          </div>
        </div>

        {/* Utilities List */}
        <div className="space-y-2.5 pt-1">
          <p className="text-xs font-semibold text-slate-700">Utilities</p>
          {utilities.map((util, index) => (
            <div
              key={index}
              className="flex items-baseline justify-between text-sm"
            >
              <span className="text-slate-600 pl-4 font-medium">
                {util.name}
              </span>
              <div className="grow border-b border-dotted border-slate-300 mx-2" />
              <div className="flex items-center gap-1 text-emerald-600 font-medium text-xs">
                {util.isIncluded && <FiCheck size={14} />}
                <span>{util.isIncluded ? "Included" : "Not included"}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
