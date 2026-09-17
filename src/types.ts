export interface ColorItem {
  id: number;
  name: string;
  hex: string;
  textColor: string; // 'white' or '#222' for accessibility on light colors
}

export interface ColoringRegion {
  id: string;
  number: number;
  path: string;
  labelX: number;
  labelY: number;
  fontSize?: number;
  name?: string;
}

export interface ColoringLevel {
  id: string;
  title: string;
  subtitle: string;
  width: number;
  height: number;
  regions: ColoringRegion[];
  palette: ColorItem[];
  defaultCompleted?: string[];
}
