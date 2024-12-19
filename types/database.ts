export interface FuelRate {
  id: number;
  petrol: number;
  diesel: number;
  updated_at: string;
}

export interface GoldRate {
  id: number;
  fine_gold: number;
  tejabi_gold: number;
  updated_at: string;
}

export interface NepseData {
  id: number;
  index: number;
  change: number;
  change_percent: number;
  updated_at: string;
}

export interface News {
  id: number;
  title: string;
  content: string;
  created_at: string;
  updated_at: string;
} 