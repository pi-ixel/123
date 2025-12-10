export interface Dimension {
  id: string;
  name: string;
  description?: string;
}

export interface Software {
  id: string;
  name: string;
  color: string;
  // Map of dimension ID to score (0-10)
  scores: Record<string, number>;
  // Map of dimension ID to description text
  descriptions: Record<string, string>;
}

export interface ComparisonData {
  dimensions: Dimension[];
  softwares: Software[];
}

// Chart data format expected by Recharts RadarChart
export interface RadarChartPoint {
  dimension: string;
  fullMark: number;
  [key: string]: string | number;
}