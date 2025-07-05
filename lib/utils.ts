import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// OEE Calculation utilities
export function calculateOEE(availability: number, performance: number, quality: number): number {
  return Math.round(((availability * performance * quality) / 10000) * 100) / 100
}

export function calculateAvailability(plannedProductionTime: number, downtime: number): number {
  if (plannedProductionTime <= 0) return 0
  return Math.round(((plannedProductionTime - downtime) / plannedProductionTime) * 100 * 100) / 100
}

export function calculatePerformance(actualOutput: number, theoreticalOutput: number): number {
  if (theoreticalOutput <= 0) return 0
  return Math.round((actualOutput / theoreticalOutput) * 100 * 100) / 100
}

export function calculateQuality(goodUnits: number, totalUnits: number): number {
  if (totalUnits <= 0) return 0
  return Math.round((goodUnits / totalUnits) * 100 * 100) / 100
}

// Pareto Analysis utilities
export function calculateParetoData(data: Array<{ category: string; value: number }>) {
  const total = data.reduce((sum, item) => sum + item.value, 0)
  let cumulative = 0

  return data
    .sort((a, b) => b.value - a.value)
    .map((item) => {
      const percentage = Math.round((item.value / total) * 100 * 100) / 100
      cumulative += percentage
      return {
        ...item,
        percentage,
        cumulative: Math.round(cumulative * 100) / 100,
      }
    })
}

export function getParetoInsights(paretoData: Array<{ category: string; percentage: number; cumulative: number }>) {
  const vital80 = paretoData.filter((item) => item.cumulative <= 80)
  const vital80Categories = vital80.map((item) => item.category)
  const vital80Impact = vital80.reduce((sum, item) => sum + item.percentage, 0)

  return {
    vitalFew: vital80Categories,
    vitalFewCount: vital80Categories.length,
    vitalFewImpact: Math.round(vital80Impact * 100) / 100,
    trivialMany: paretoData.length - vital80Categories.length,
    recommendation: `Focus on ${vital80Categories.slice(0, 2).join(" and ")} for ${Math.round(vital80Impact)}% improvement`,
  }
}

// Status color utilities
export function getStatusColor(status: string): string {
  switch (status.toLowerCase()) {
    case "running":
      return "text-green-600 bg-green-50 border-green-200"
    case "warning":
      return "text-yellow-600 bg-yellow-50 border-yellow-200"
    case "critical":
      return "text-red-600 bg-red-50 border-red-200"
    case "maintenance":
      return "text-blue-600 bg-blue-50 border-blue-200"
    case "offline":
      return "text-gray-600 bg-gray-50 border-gray-200"
    default:
      return "text-gray-600 bg-gray-50 border-gray-200"
  }
}

export function getPerformanceColor(value: number, target: number): string {
  const ratio = value / target
  if (ratio >= 1.0) return "text-green-600"
  if (ratio >= 0.9) return "text-yellow-600"
  if (ratio >= 0.8) return "text-orange-600"
  return "text-red-600"
}

// Time utilities
export function formatDuration(minutes: number): string {
  if (minutes < 60) return `${minutes}m`
  const hours = Math.floor(minutes / 60)
  const remainingMinutes = minutes % 60
  return remainingMinutes > 0 ? `${hours}h ${remainingMinutes}m` : `${hours}h`
}

export function getCurrentShift(): string {
  const now = new Date()
  const hour = now.getHours()

  if (hour >= 6 && hour < 14) return "morning"
  if (hour >= 14 && hour < 22) return "afternoon"
  return "night"
}

export function getShiftHours(shift: string): { start: string; end: string } {
  switch (shift) {
    case "morning":
      return { start: "06:00", end: "14:00" }
    case "afternoon":
      return { start: "14:00", end: "22:00" }
    case "night":
      return { start: "22:00", end: "06:00" }
    default:
      return { start: "06:00", end: "14:00" }
  }
}

// Number formatting utilities
export function formatNumber(num: number, decimals = 1): string {
  return new Intl.NumberFormat("en-IN", {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  }).format(num)
}

export function formatCurrency(amount: number, currency = "INR"): string {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount)
}

export function formatPercentage(value: number, decimals = 1): string {
  return `${formatNumber(value, decimals)}%`
}

// Data validation utilities
export function validateDowntimeEntry(entry: any): { isValid: boolean; errors: string[] } {
  const errors: string[] = []

  if (!entry.equipment_id) errors.push("Equipment is required")
  if (!entry.duration_minutes || entry.duration_minutes <= 0) errors.push("Duration must be greater than 0")
  if (!entry.downtime_category) errors.push("Downtime category is required")
  if (!entry.operator_id) errors.push("Operator is required")

  return {
    isValid: errors.length === 0,
    errors,
  }
}

export function validateProductionEntry(entry: any): { isValid: boolean; errors: string[] } {
  const errors: string[] = []

  if (!entry.equipment_id) errors.push("Equipment is required")
  if (!entry.product_id) errors.push("Product is required")
  if (!entry.actual_quantity || entry.actual_quantity < 0) errors.push("Actual quantity must be 0 or greater")
  if (!entry.good_quantity || entry.good_quantity < 0) errors.push("Good quantity must be 0 or greater")
  if (entry.good_quantity > entry.actual_quantity) errors.push("Good quantity cannot exceed actual quantity")

  return {
    isValid: errors.length === 0,
    errors,
  }
}

// Equipment dependency utilities
export function getUpstreamEquipment(equipmentId: string, stationData: any): string[] {
  // Simplified logic - in real implementation, this would check the actual equipment flow
  const equipmentFlow = {
    eq003: ["eq001", "eq002"], // Filler depends on Blower and Mixer
    eq004: ["eq003"], // Capper depends on Filler
    eq005: ["eq004"], // Labeller depends on Capper
    eq006: ["eq005"], // Packer depends on Labeller
  }

  return equipmentFlow[equipmentId as keyof typeof equipmentFlow] || []
}

export function getDownstreamEquipment(equipmentId: string, stationData: any): string[] {
  // Simplified logic - in real implementation, this would check the actual equipment flow
  const equipmentFlow = {
    eq001: ["eq003"], // Blower affects Filler
    eq002: ["eq003"], // Mixer affects Filler
    eq003: ["eq004"], // Filler affects Capper
    eq004: ["eq005"], // Capper affects Labeller
    eq005: ["eq006"], // Labeller affects Packer
  }

  return equipmentFlow[equipmentId as keyof typeof equipmentFlow] || []
}

// Alert utilities
export function generateAlerts(oeeData: any, thresholds: any): any[] {
  const alerts = []

  if (oeeData.oee < thresholds.OEE_LOW) {
    alerts.push({
      type: "performance",
      severity: "high",
      message: `OEE below threshold: ${oeeData.oee}% (Target: ${thresholds.OEE_LOW}%)`,
      equipment_id: oeeData.equipment_id,
    })
  }

  if (oeeData.availability < thresholds.AVAILABILITY_LOW) {
    alerts.push({
      type: "downtime",
      severity: "medium",
      message: `Low availability: ${oeeData.availability}% (Target: ${thresholds.AVAILABILITY_LOW}%)`,
      equipment_id: oeeData.equipment_id,
    })
  }

  return alerts
}

// Export utilities
export function generateCSV(data: any[], headers: string[]): string {
  const csvHeaders = headers.join(",")
  const csvRows = data.map((row) =>
    headers
      .map((header) => {
        const value = row[header]
        return typeof value === "string" && value.includes(",") ? `"${value}"` : value
      })
      .join(","),
  )

  return [csvHeaders, ...csvRows].join("\n")
}

export function downloadFile(content: string, filename: string, contentType = "text/plain") {
  const blob = new Blob([content], { type: contentType })
  const url = window.URL.createObjectURL(blob)
  const link = document.createElement("a")
  link.href = url
  link.download = filename
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
  window.URL.revokeObjectURL(url)
}
