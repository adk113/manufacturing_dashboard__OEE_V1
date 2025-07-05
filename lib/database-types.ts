// TypeScript types for database schema

export interface Factory {
  id: string
  name: string
  location?: string
  timezone?: string
  status: "active" | "inactive"
  created_at: Date
  updated_at: Date
}

export interface Machine {
  id: string
  factory_id: string
  name: string
  machine_type?: string
  capacity_per_hour?: number
  power_rating_kw?: number
  installation_date?: Date
  status: "active" | "maintenance" | "inactive"
  availability_schedule?: any
  created_at: Date
  updated_at: Date
}

export interface DataEntry {
  id: string
  module_name: "oee" | "quality" | "cost" | "delivery" | "safety" | "environment" | "morale"
  entry_type: string
  factory_id: string
  machine_id?: string
  operator_id?: string
  shift_id?: string
  entry_timestamp: Date
  data_payload: any
  created_by?: string
  created_at: Date
}

export interface OEEDowntimeEntry {
  id: string
  data_entry_id: string
  downtime_category_id: string
  duration_minutes: number
  reason?: string
  resolution?: string
  resolved_by?: string
  created_at: Date
}

export interface OEEProductionEntry {
  id: string
  data_entry_id: string
  product_id: string
  planned_quantity?: number
  actual_quantity: number
  good_quantity: number
  defect_quantity: number
  hour_of_shift: number
  created_at: Date
}

export interface OEECalculation {
  id: string
  factory_id: string
  machine_id?: string
  calculation_date: Date
  shift_id?: string
  planned_production_time_minutes: number
  actual_production_time_minutes: number
  downtime_minutes: number
  total_units_produced: number
  good_units_produced: number
  availability_percentage: number
  performance_percentage: number
  quality_percentage: number
  oee_percentage: number
  calculated_at: Date
}

// Future module types
export interface QualityInspection {
  id: string
  data_entry_id: string
  product_id: string
  inspection_type: "incoming" | "in_process" | "final"
  sample_size: number
  defects_found: number
  inspector_id: string
  created_at: Date
}

export interface CostEntry {
  id: string
  data_entry_id: string
  cost_center_id: string
  cost_type: "material" | "labor" | "overhead" | "energy"
  amount: number
  currency: string
  allocation_basis: "per_unit" | "per_hour" | "fixed"
  created_at: Date
}
