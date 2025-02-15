
export type VehicleCategory = "bike_motorcycle" | "car" | "van" | "light_truck" | "medium_truck" | "heavy_truck" | "towing" | "refrigerated";

export interface VehicleType {
  id: string;
  name: string;
  category: VehicleCategory;
  description: string;
  dimensions: string;
  max_weight: string;
  base_price: number;
  price_per_km: number;
  minimum_distance: number;
  icon_path?: string;
}

export interface UserProfile {
  id: string;
  name: string | null;
  email: string | null;
  role: string;
  created_at: string;
  last_login: string | null;
}

export interface NewVehicle {
  name: string;
  category: VehicleCategory;
  description: string;
  dimensions: string;
  max_weight: string;
  base_price: number;
  price_per_km: number;
  minimum_distance: number;
}
