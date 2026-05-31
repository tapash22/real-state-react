import Agencies from "./Agencies";

type ProjectType = {
  id: number;
  name: string;
};

type AgencyType = {
  id: number;
  name: string;
  image: string;
  address: string;
  place: string[];
  project: ProjectType[];
};

type SingleAgenciesProps = {
  agen: AgencyType[];
};

export default function SingleAgencies({
  agen,
}: SingleAgenciesProps): JSX.Element {
  return (
    <div className="w-full grid grid-cols-3 gap-4 h-[400px]">
      {agen.map((single) => (
        <Agencies key={single.id} ar={single} />
      ))}
    </div>
  );
}
