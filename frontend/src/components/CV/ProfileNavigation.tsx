interface ProfileNavigationProps {
  onNext?: () => void;
  disabled?: boolean;
  label?: string;
}

export default function ProfileNavigation({
  onNext,
  disabled = false,
  label = "Save and Continue",
}: ProfileNavigationProps) {
  return (
    <div className="flex justify-between items-center py-4">
      <button
        type="button"
        className={`px-6 py-2.5 font-semibold text-sm flex items-center gap-2 rounded-lg transition-all ${
          disabled
            ? "bg-[#27272A] text-[#71717A] cursor-not-allowed"
            : "bg-[#7C3AED] text-white hover:bg-[#6D28D9]"
        }`}
        onClick={onNext}
        disabled={disabled}
      >
        {label}
        <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
          <path d="M5 12h14M13 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>
    </div>
  );
}
