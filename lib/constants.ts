// Constants and configuration for IndusFlow platform

export const EQUIPMENT_STATUS = {
  RUNNING: "running",
  WARNING: "warning",
  CRITICAL: "critical",
  MAINTENANCE: "maintenance",
  OFFLINE: "offline",
} as const

export const DOWNTIME_CATEGORIES = {
  MECHANICAL: "mechanical",
  ELECTRICAL: "electrical",
  SETUP: "setup",
  MATERIAL: "material",
  ADMINISTRATIVE: "administrative",
} as const

export const TPM_LOSS_TYPES = {
  BREAKDOWN: "breakdown",
  SETUP_ADJUSTMENT: "setup_adjustment",
  MINOR_STOPPAGE: "minor_stoppage",
  REDUCED_SPEED: "reduced_speed",
  STARTUP_LOSSES: "startup_losses",
  QUALITY_LOSSES: "quality_losses",
} as const

export const USER_ROLES = {
  OPERATOR: "operator",
  SUPERVISOR: "supervisor",
  MANAGER: "manager",
  FACTORY_ADMIN: "factory_admin",
  SYSTEM_ADMIN: "system_admin",
} as const

export const SHIFTS = {
  MORNING: { name: "Morning", start: "06:00", end: "14:00" },
  AFTERNOON: { name: "Afternoon", start: "14:00", end: "22:00" },
  NIGHT: { name: "Night", start: "22:00", end: "06:00" },
} as const

export const OEE_TARGETS = {
  WORLD_CLASS: 85,
  GOOD: 75,
  ACCEPTABLE: 65,
  POOR: 50,
} as const

export const PARETO_THRESHOLD = 80 // 80/20 rule

export const REFRESH_INTERVALS = {
  DASHBOARD: 30 * 60 * 1000, // 30 minutes
  ALERTS: 5 * 60 * 1000, // 5 minutes
  REPORTS: 60 * 60 * 1000, // 1 hour
} as const

export const COLORS = {
  STATUS: {
    RUNNING: "#16a34a",
    WARNING: "#eab308",
    CRITICAL: "#dc2626",
    MAINTENANCE: "#3b82f6",
    OFFLINE: "#6b7280",
  },
  PERFORMANCE: {
    EXCELLENT: "#16a34a",
    GOOD: "#84cc16",
    FAIR: "#eab308",
    POOR: "#f97316",
    CRITICAL: "#dc2626",
  },
  MODULES: {
    OEE: "#2563eb",
    QUALITY: "#7c3aed",
    COST: "#ea580c",
    DELIVERY: "#059669",
    SAFETY: "#dc2626",
    ENVIRONMENT: "#0d9488",
    MORALE: "#8b5cf6",
  },
} as const

export const BEVERAGE_EQUIPMENT_TYPES = {
  BLOWER: "blower",
  MIXER: "mixer",
  FILLER: "filler",
  CAPPER: "capper",
  LABELLER: "labeller",
  PACKER: "packer",
  PALLETIZER: "palletizer",
  WRAPPER: "wrapper",
  PASTEURIZER: "pasteurizer",
  HOMOGENIZER: "homogenizer",
} as const

export const UTILITY_EQUIPMENT_TYPES = {
  COMPRESSOR: "compressor",
  BOILER: "boiler",
  GENERATOR: "generator",
  WATER_TREATMENT: "water_treatment",
  EFFLUENT_TREATMENT: "effluent_treatment",
  CHILLER: "chiller",
  COOLING_TOWER: "cooling_tower",
} as const

export const PRODUCT_CATEGORIES = {
  CARBONATED: "carbonated",
  JUICE: "juice",
  WATER: "water",
  ENERGY: "energy",
  DAIRY: "dairy",
  TEA_COFFEE: "tea_coffee",
} as const

export const ALERT_THRESHOLDS = {
  OEE_LOW: 70,
  AVAILABILITY_LOW: 80,
  PERFORMANCE_LOW: 85,
  QUALITY_LOW: 95,
  DOWNTIME_HIGH: 60, // minutes per shift
  EFFICIENCY_LOW: 75,
} as const

export const REPORT_FORMATS = {
  PDF: "pdf",
  EXCEL: "excel",
  CSV: "csv",
  JSON: "json",
} as const

export const LANGUAGES = {
  EN: "en",
  HI: "hi",
  TA: "ta",
  TE: "te",
  MR: "mr",
  GU: "gu",
} as const

export const CURRENCIES = {
  INR: "INR",
  USD: "USD",
  EUR: "EUR",
} as const

export const TIMEZONES = {
  MUMBAI: "Asia/Kolkata",
  CHENNAI: "Asia/Kolkata",
  BANGALORE: "Asia/Kolkata",
  DELHI: "Asia/Kolkata",
} as const
