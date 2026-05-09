export default function ProfileInfoNotice() {
  return (
    <div className="flex items-start gap-3 p-4 rounded-xl bg-[#1E293B] mt-4">
      <span className="bg-[#7C3AED] text-white rounded-full flex items-center justify-center flex-shrink-0 font-bold text-xs w-5 h-5 pt-0.5">
        i
      </span>
      <p className="mb-0 text-[#A1A1AA] text-sm leading-relaxed">
        Your CV helps our AI generate personalized interview questions based on your actual experience.
        We don't share your data with third parties.
      </p>
    </div>
  );
}
