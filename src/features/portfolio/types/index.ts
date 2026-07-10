export interface ProfileData {
  name: string;
  bio: string;
  avatar: string;
}

export interface StatData {
  id: string | number;
  value: string;
  label: string;
}

export type CardLayout = "profile" | "stats";
export type CardGeometricShape =
  | "rectangle"
  | "circle"
  | "triangle"
  | "hexagonal";

export interface FlexibleCardProps {
  layout?: CardLayout;
  shape?: CardGeometricShape;
  data?: ProfileData | StatData[];
}
