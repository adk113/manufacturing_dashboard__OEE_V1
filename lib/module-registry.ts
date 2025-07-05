// Module Registry for Dynamic Module Loading

export interface ModuleDefinition {
  name: string
  displayName: string
  version: string
  dependencies: string[]
  dataEntryForms: string[]
  reportTypes: string[]
  kpiMetrics: string[]
  isActive: boolean
}

export const moduleRegistry: Record<string, ModuleDefinition> = {
  oee: {
    name: "oee",
    displayName: "OEE (Overall Equipment Effectiveness)",
    version: "1.0.0",
    dependencies: ["core"],
    dataEntryForms: ["downtime", "production"],
    reportTypes: ["oee_summary", "downtime_analysis", "production_report"],
    kpiMetrics: ["availability", "performance", "quality", "oee"],
    isActive: true,
  },
  quality: {
    name: "quality",
    displayName: "Quality Management",
    version: "1.0.0",
    dependencies: ["core", "oee"],
    dataEntryForms: ["inspection", "defect", "spc_measurement"],
    reportTypes: ["quality_summary", "defect_analysis", "spc_charts"],
    kpiMetrics: ["defect_rate", "first_pass_yield", "customer_complaints"],
    isActive: false, // Will be activated in future release
  },
  cost: {
    name: "cost",
    displayName: "Cost Management",
    version: "1.0.0",
    dependencies: ["core", "oee"],
    dataEntryForms: ["cost_entry", "budget_allocation"],
    reportTypes: ["cost_analysis", "variance_report", "profitability"],
    kpiMetrics: ["cost_per_unit", "budget_variance", "efficiency_ratio"],
    isActive: false, // Will be activated in future release
  },
  delivery: {
    name: "delivery",
    displayName: "Delivery Performance",
    version: "1.0.0",
    dependencies: ["core", "oee"],
    dataEntryForms: ["shipment", "delivery_confirmation"],
    reportTypes: ["delivery_performance", "on_time_delivery"],
    kpiMetrics: ["on_time_delivery_rate", "lead_time", "customer_satisfaction"],
    isActive: false, // Will be activated in future release
  },
  safety: {
    name: "safety",
    displayName: "Safety Management",
    version: "1.0.0",
    dependencies: ["core"],
    dataEntryForms: ["incident_report", "safety_audit", "training_record"],
    reportTypes: ["safety_dashboard", "incident_analysis", "compliance_report"],
    kpiMetrics: ["incident_rate", "near_miss_rate", "training_completion"],
    isActive: false, // Will be activated in future release
  },
  environment: {
    name: "environment",
    displayName: "Environmental Management",
    version: "1.0.0",
    dependencies: ["core"],
    dataEntryForms: ["emission_reading", "waste_tracking", "energy_consumption"],
    reportTypes: ["environmental_dashboard", "emission_report", "sustainability"],
    kpiMetrics: ["carbon_footprint", "waste_reduction", "energy_efficiency"],
    isActive: false, // Will be activated in future release
  },
  morale: {
    name: "morale",
    displayName: "Employee Morale",
    version: "1.0.0",
    dependencies: ["core"],
    dataEntryForms: ["feedback_survey", "suggestion", "recognition"],
    reportTypes: ["morale_dashboard", "engagement_report", "suggestion_analysis"],
    kpiMetrics: ["employee_satisfaction", "suggestion_rate", "retention_rate"],
    isActive: false, // Will be activated in future release
  },
}

export function getActiveModules(): ModuleDefinition[] {
  return Object.values(moduleRegistry).filter((module) => module.isActive)
}

export function getModuleByName(name: string): ModuleDefinition | undefined {
  return moduleRegistry[name]
}

export function activateModule(moduleName: string): boolean {
  if (moduleRegistry[moduleName]) {
    moduleRegistry[moduleName].isActive = true
    return true
  }
  return false
}
