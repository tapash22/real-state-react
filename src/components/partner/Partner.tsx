type PartnerProps = {
  image: string;
};

export function Partner({ image }: PartnerProps) {
  return (
    <div
      style={{ borderColor: "var(--border)" }}
      className="
        flex items-center justify-center p-6 h-24 border rounded-2xl bg-black/[0.02] dark:bg-white/[0.02]
        transition-all duration-300 ease-in-out hover:bg-transparent dark:hover:bg-transparent
        hover:shadow-md group cursor-pointer
      "
    >
      <img
        src={image}
        alt="Partner Logo Company"
        className="
          max-w-full max-h-full object-contain 
          opacity-50 group-hover:opacity-100 
          transition-opacity duration-300
          dark:invert-[0.15] dark:brightness-200
        "
      />
    </div>
  );
}
