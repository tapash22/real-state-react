export interface BioContent {
  title?: string;
  subtitle?: string;
  paragraphsLeft: string[]; // Changed to match layout columns
  paragraphsRight: string[]; // Changed to match layout columns
}

export interface ModelLayoutProps {
  imageSrc: string;
  content?: BioContent;
  clipShapePolygon?: string;
}
