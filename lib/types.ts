// TypeScript types for IndusFlow platform

export interface Factory {
  id: string
  name: string
  location: string
  timezone: string
  status: "active" | "inactive"
  created_at: Date
  updated_at: Date
}

export interface ProductionLine {
  id: string
  factory_id: string
  name: string
  type: string
  capacity: number
  status: "active" | "maintenance" | "inactive"
}

export interface Station {
  id: string
  line_id: string
  name: string
  type: string
  sequence: number
}

export interface Equipment {
  id: string
  station_id: string
  name: string
  sap_code: string
  equipment_type: string
  status: "running" | "warning" | "critical" | "maintenance" | "offline"
  efficiency: number
  capacity_per_hour: number
  power_rating_kw: number
}

export interface UtilityEquipment {
  id: string
  factory_id: string
  name: string
  sap_code: string
  type: "compressor" | "boiler" | "generator" | "water_treatment" | "effluent_treatment"
  status: "running" | "standby" | "maintenance" | "offline"
  efficiency: number
}

export interface Product {
  id: string
  code: string
  sap_code: string
  name: string
  category: string
  standard_cycle_time: number
  target_units_per_hour: number
}

export interface Operator {
  id: string
  employee_id: string
  name: string
  skill_level: string
  factory_id: string
  shift_preference: string[]
  status: "active" | "inactive"
}

export interface Shift {
  id: string
  name: string
  start_time: string
  end_time: string
  factory_id: string
  working_days: number[]
}

export interface DowntimeEntry {
  id: string
  equipment_id: string
  operator_id: string
  shift_id: string
  downtime_category: "mechanical" | "electrical" | "setup" | "material" | "administrative"
  loss_type: "breakdown" | "setup_adjustment" | "minor_stoppage" | "reduced_speed"
  duration_minutes: number
  reason: string
  resolution?: string
  status: "pending" | "approved" | "rejected"
  created_at: Date
}

export interface ProductionEntry {
  id: string
  equipment_id: string
  product_id: string
  operator_id: string
  shift_id: string
  hour_of_shift: number
  planned_quantity: number
  actual_quantity: number
  good_quantity: number
  defect_quantity: number
  created_at: Date
}

export interface OEECalculation {
  id: string
  factory_id: string
  line_id?: string
  station_id?: string
  equipment_id?: string
  calculation_date: Date
  shift_id?: string
  planned_production_time: number
  actual_production_time: number
  downtime_minutes: number
  total_units_produced: number
  good_units_produced: number
  availability_percentage: number
  performance_percentage: number
  quality_percentage: number
  oee_percentage: number
  target_oee: number
}

export interface ParetoAnalysis {
  id: string
  analysis_type: "downtime" | "equipment" | "quality" | "cost"
  factory_id: string
  period_start: Date
  period_end: Date
  data_points: ParetoDataPoint[]
  insights: string[]
  recommendations: string[]
}

export interface ParetoDataPoint {
  category: string
  value: number
  percentage: number
  cumulative_percentage: number
  impact_level: "high" | "medium" | "low"
}

export interface UserRole {
  id: string
  name: string
  permissions: Permission[]
  description: string
}

export interface Permission {
  module: string
  actions: string[]
  scope: "factory" | "line" | "station" | "equipment" | "global"
}

export interface Alert {
  id: string
  type: "downtime" | "quality" | "performance" | "maintenance"
  severity: "low" | "medium" | "high" | "critical"
  equipment_id?: string
  message: string
  threshold_value?: number
  actual_value?: number
  status: "active" | "acknowledged" | "resolved"
  created_at: Date
  resolved_at?: Date
}

export interface Report {
  id: string
  name: string
  type: "oee" | "downtime" | "production" | "pareto" | "custom"
  factory_id?: string
  parameters: ReportParameters
  schedule?: ReportSchedule
  recipients: string[]
  format: "pdf" | "excel" | "csv"
  status: "active" | "inactive"
}

export interface ReportParameters {
  date_range: {
    start: Date
    end: Date
  }
  filters: {
    factory_ids?: string[]
    line_ids?: string[]
    equipment_ids?: string[]
    shift_ids?: string[]
  }
  metrics: string[]
}

export interface ReportSchedule {
  frequency: "hourly" | "shift" | "daily" | "weekly" | "monthly"
  time: string
  days_of_week?: number[]
  timezone: string
}
