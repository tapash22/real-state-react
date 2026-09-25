import type { Feature, FeatureCollection, Geometry } from "geojson";

export interface BangladeshDistrictProperties {
  ID_2?: number | string;
  NAME_2?: string;

  NAME_1?: string;

  id?: number | string;
  name?: string;

  [key: string]: unknown;
}

export type BangladeshDistrictFeature = Feature<
  Geometry,
  BangladeshDistrictProperties
>;

export type BangladeshDistrictGeoJSON = FeatureCollection<
  Geometry,
  BangladeshDistrictProperties
>;
