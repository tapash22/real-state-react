type PartnerProps = {
  image: string;
  name?: string;
};

export function Partner({ image, name }: PartnerProps) {
  return (
    <div className="p-2 flex justify-center">
      <div className="border-2 rounded-full w-32 h-32 flex items-center justify-center overflow-hidden">
        <img
          src={image}
          alt={name || "partner logo"}
          className="w-full h-full object-cover rounded-full"
        />
      </div>
    </div>
  );
}
