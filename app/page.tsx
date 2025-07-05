"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Line,
  ComposedChart,
  Area,
  AreaChart,
} from "recharts"
import {
  Factory,
  TrendingUp,
  Clock,
  Download,
  Filter,
  Database,
  FileText,
  BarChart3,
  AlertTriangle,
  CheckCircle,
  Zap,
  Settings,
  QrCode,
  RefreshCw,
  Target,
  TrendingDown,
  Activity,
  Wrench,
} from "lucide-react"
import { GlobalConfiguration } from "@/components/global-configuration"
import { GlobalReports } from "@/components/global-reports"
import { EquipmentFlowDiagram } from "@/components/equipment-flow-diagram"

// Enhanced mock data with realistic beverage plant structure
const factories = [
  { id: "all", name: "All Factories", location: "", timezone: "Asia/Kolkata" },
  { id: "f1", name: "IndusFlow Mumbai", location: "Mumbai, Maharashtra", timezone: "Asia/Kolkata" },
  { id: "f2", name: "IndusFlow Chennai", location: "Chennai, Tamil Nadu", timezone: "Asia/Kolkata" },
]

const productionLines = {
  f1: [
    { id: "fl01", name: "FL01 - Carbonated Drinks", type: "carbonated", capacity: 12000 },
    { id: "fl02", name: "FL02 - Juice Processing", type: "juice", capacity: 8000 },
    { id: "fl03", name: "FL03 - Water Bottling", type: "water", capacity: 15000 },
  ],
  f2: [
    { id: "fl04", name: "FL04 - Energy Drinks", type: "energy", capacity: 6000 },
    { id: "fl05", name: "FL05 - Dairy Products", type: "dairy", capacity: 10000 },
  ],
}

const stations = {
  fl01: [
    { id: "st01", name: "Preparation Station", type: "preparation" },
    { id: "st02", name: "Filling Station", type: "filling" },
    { id: "st03", name: "Packaging Station", type: "packaging" },
    { id: "st04", name: "Palletizing Station", type: "palletizing" },
  ],
  fl02: [
    { id: "st05", name: "Mixing Station", type: "mixing" },
    { id: "st06", name: "Pasteurization Station", type: "pasteurization" },
    { id: "st07", name: "Filling Station", type: "filling" },
    { id: "st08", name: "Packaging Station", type: "packaging" },
  ],
  fl03: [
    { id: "st09", name: "Treatment Station", type: "treatment" },
    { id: "st10", name: "Filling Station", type: "filling" },
    { id: "st11", name: "Capping Station", type: "capping" },
    { id: "st12", name: "Labeling Station", type: "labeling" },
  ],
  fl04: [
    { id: "st13", name: "Mixing Station", type: "mixing" },
    { id: "st14", name: "Carbonation Station", type: "carbonation" },
    { id: "st15", name: "Filling Station", type: "filling" },
    { id: "st16", name: "Packaging Station", type: "packaging" },
  ],
  fl05: [
    { id: "st17", name: "Pasteurization Station", type: "pasteurization" },
    { id: "st18", name: "Homogenization Station", type: "homogenization" },
    { id: "st19", name: "Filling Station", type: "filling" },
    { id: "st20", name: "Sealing Station", type: "sealing" },
  ],
}

const equipment = {
  st01: [
    { id: "eq001", name: "FL01-BLOWER", sapCode: "EQ001001", status: "running", efficiency: 92 },
    { id: "eq002", name: "FL01-MIXER", sapCode: "EQ001002", status: "running", efficiency: 88 },
  ],
  st02: [
    { id: "eq003", name: "FL01-FILLER", sapCode: "EQ001003", status: "warning", efficiency: 75 },
    { id: "eq004", name: "FL01-CAPPER", sapCode: "EQ001004", status: "running", efficiency: 95 },
  ],
  st03: [
    { id: "eq005", name: "FL01-LABELLER", sapCode: "EQ001005", status: "running", efficiency: 90 },
    { id: "eq006", name: "FL01-PACKER", sapCode: "EQ001006", status: "critical", efficiency: 45 },
  ],
  st04: [
    { id: "eq007", name: "FL01-PALLETIZER", sapCode: "EQ001007", status: "running", efficiency: 87 },
    { id: "eq008", name: "FL01-WRAPPER", sapCode: "EQ001008", status: "running", efficiency: 93 },
  ],
}

const utilityEquipment = {
  f1: [
    { id: "ut001", name: "COMP-01", sapCode: "UT001001", type: "compressor", status: "running", efficiency: 89 },
    { id: "ut002", name: "BOILER-01", sapCode: "UT001002", type: "boiler", status: "running", efficiency: 92 },
    { id: "ut003", name: "GEN-01", sapCode: "UT001003", type: "generator", status: "standby", efficiency: 0 },
    { id: "ut004", name: "WTP-01", sapCode: "UT001004", type: "water_treatment", status: "running", efficiency: 95 },
    { id: "ut005", name: "ETP-01", sapCode: "UT001005", type: "effluent_treatment", status: "running", efficiency: 88 },
  ],
  f2: [
    { id: "ut006", name: "COMP-02", sapCode: "UT002001", type: "compressor", status: "running", efficiency: 91 },
    { id: "ut007", name: "BOILER-02", sapCode: "UT002002", type: "boiler", status: "maintenance", efficiency: 0 },
    { id: "ut008", name: "GEN-02", sapCode: "UT002003", type: "generator", status: "running", efficiency: 85 },
    { id: "ut009", name: "WTP-02", sapCode: "UT002004", type: "water_treatment", status: "running", efficiency: 93 },
  ],
}

const products = [
  { id: "fg001", code: "COLA-500ML", sapCode: "FG001", name: "Cola 500ML PET", category: "carbonated" },
  { id: "fg002", code: "JUICE-1L", sapCode: "FG002", name: "Orange Juice 1L Tetra", category: "juice" },
  { id: "fg003", code: "WATER-1L", sapCode: "FG003", name: "Mineral Water 1L PET", category: "water" },
  { id: "fg004", code: "ENERGY-250ML", sapCode: "FG004", name: "Energy Drink 250ML Can", category: "energy" },
  { id: "fg005", code: "MILK-500ML", sapCode: "FG005", name: "Fresh Milk 500ML Pouch", category: "dairy" },
]

const operators = [
  { id: "op001", name: "Rajesh Kumar", empId: "EMP001", skill: "Senior Operator", shift: "morning" },
  { id: "op002", name: "Priya Sharma", empId: "EMP002", skill: "Machine Operator", shift: "afternoon" },
  { id: "op003", name: "Amit Singh", empId: "EMP003", skill: "Quality Inspector", shift: "night" },
  { id: "op004", name: "Sunita Patel", empId: "EMP004", skill: "Line Supervisor", shift: "morning" },
]

// Enhanced OEE data with Pareto analysis
const oeeData = [
  { name: "Mumbai FL01", availability: 85, performance: 92, quality: 98, oee: 76.8, target: 85 },
  { name: "Mumbai FL02", availability: 78, performance: 88, quality: 95, oee: 65.2, target: 85 },
  { name: "Mumbai FL03", availability: 92, performance: 85, quality: 97, oee: 75.9, target: 85 },
  { name: "Chennai FL04", availability: 88, performance: 90, quality: 96, oee: 76.0, target: 85 },
  { name: "Chennai FL05", availability: 82, performance: 87, quality: 94, oee: 67.1, target: 85 },
]

// Pareto analysis data for downtime causes
const paretoDowntimeData = [
  { category: "Mechanical Failure", minutes: 450, percentage: 45, cumulative: 45, color: "#dc2626" },
  { category: "Electrical Issues", minutes: 250, percentage: 25, cumulative: 70, color: "#ea580c" },
  { category: "Setup & Changeover", minutes: 150, percentage: 15, cumulative: 85, color: "#d97706" },
  { category: "Material Shortage", minutes: 100, percentage: 10, cumulative: 95, color: "#eab308" },
  { category: "Administrative", minutes: 50, percentage: 5, cumulative: 100, color: "#6b7280" },
]

// Equipment performance Pareto
const paretoEquipmentData = [
  { equipment: "FL01-FILLER", lossMinutes: 180, percentage: 35, cumulative: 35, impact: "High" },
  { equipment: "FL01-PACKER", lossMinutes: 120, percentage: 23, cumulative: 58, impact: "High" },
  { equipment: "FL02-LABELLER", lossMinutes: 90, percentage: 17, cumulative: 75, impact: "Medium" },
  { equipment: "FL03-CAPPER", lossMinutes: 70, percentage: 14, cumulative: 89, impact: "Medium" },
  { equipment: "Others", lossMinutes: 55, percentage: 11, cumulative: 100, impact: "Low" },
]

// Trend data with enhanced metrics
const trendData = [
  { date: "Week 1", oee: 72, availability: 85, performance: 88, quality: 96, target: 85 },
  { date: "Week 2", oee: 75, availability: 87, performance: 90, quality: 95, target: 85 },
  { date: "Week 3", oee: 68, availability: 82, performance: 85, quality: 97, target: 85 },
  { date: "Week 4", oee: 78, availability: 89, performance: 92, quality: 95, target: 85 },
  { date: "Week 5", oee: 76, availability: 88, performance: 89, quality: 97, target: 85 },
  { date: "Week 6", oee: 74, availability: 86, performance: 87, quality: 98, target: 85 },
]

const COLORS = ["#dc2626", "#ea580c", "#d97706", "#eab308", "#16a34a", "#0891b2", "#7c3aed"]

export default function IndusFlowPlatform() {
  const [selectedFactory, setSelectedFactory] = useState("all")
  const [selectedLine, setSelectedLine] = useState("all")
  const [selectedStation, setSelectedStation] = useState("all")
  const [selectedEquipment, setSelectedEquipment] = useState("all")
  const [selectedShift, setSelectedShift] = useState("current")
  const [lastRefresh, setLastRefresh] = useState(new Date())
  const [currentUser] = useState({ name: "Rajesh Kumar", role: "Supervisor", factory: "Mumbai" })

  // Auto-refresh every 30 minutes
  useEffect(() => {
    const interval = setInterval(
      () => {
        setLastRefresh(new Date())
      },
      30 * 60 * 1000,
    ) // 30 minutes

    return () => clearInterval(interval)
  }, [])

  const currentLines =
    selectedFactory === "all" ? [] : productionLines[selectedFactory as keyof typeof productionLines] || []
  const currentStations = selectedLine === "all" ? [] : stations[selectedLine as keyof typeof stations] || []
  const currentEquipment = selectedStation === "all" ? [] : equipment[selectedStation as keyof typeof equipment] || []

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Enhanced Header with Status Indicators */}
      <header className="bg-slate-900 text-white border-b border-slate-700 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Factory className="h-8 w-8 text-blue-400" />
            <div>
              <h1 className="text-2xl font-bold">IndusFlow</h1>
              <p className="text-sm text-slate-300">Manufacturing Analytics Platform</p>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <div className="text-right text-sm">
              <p className="text-slate-300">Welcome, {currentUser.name}</p>
              <p className="text-xs text-slate-400">
                {currentUser.role} • {currentUser.factory}
              </p>
            </div>
            <div className="flex items-center space-x-2">
              <Badge variant="outline" className="bg-green-900 text-green-300 border-green-600">
                <div className="w-2 h-2 bg-green-400 rounded-full mr-2 animate-pulse"></div>
                Live Data
              </Badge>
              <Badge variant="outline" className="bg-blue-900 text-blue-300 border-blue-600">
                <RefreshCw className="h-3 w-3 mr-1" />
                {lastRefresh.toLocaleTimeString()}
              </Badge>
            </div>
            <GlobalConfiguration />
            <GlobalReports />
          </div>
        </div>
      </header>

      <div className="p-6">
        {/* Enhanced Drill-Down Filters */}
        <Card className="mb-6 border-slate-200 shadow-sm">
          <CardHeader className="pb-4">
            <CardTitle className="flex items-center text-slate-800">
              <Filter className="h-5 w-5 mr-2 text-blue-600" />
              Smart Drill-Down Filters
            </CardTitle>
            <CardDescription className="text-slate-600">
              Navigate from factory level to individual equipment performance
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-6 gap-4">
              <div>
                <Label className="text-sm font-medium mb-2 block text-slate-700">Factory</Label>
                <Select value={selectedFactory} onValueChange={setSelectedFactory}>
                  <SelectTrigger className="border-slate-300">
                    <SelectValue placeholder="Select Factory" />
                  </SelectTrigger>
                  <SelectContent>
                    {factories.map((factory) => (
                      <SelectItem key={factory.id} value={factory.id}>
                        <div className="flex items-center">
                          <Factory className="h-4 w-4 mr-2 text-slate-500" />
                          {factory.name}
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label className="text-sm font-medium mb-2 block text-slate-700">Production Line</Label>
                <Select value={selectedLine} onValueChange={setSelectedLine} disabled={selectedFactory === "all"}>
                  <SelectTrigger className="border-slate-300">
                    <SelectValue placeholder="Select Line" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Lines</SelectItem>
                    {currentLines.map((line) => (
                      <SelectItem key={line.id} value={line.id}>
                        <div className="flex items-center">
                          <Activity className="h-4 w-4 mr-2 text-slate-500" />
                          {line.name}
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label className="text-sm font-medium mb-2 block text-slate-700">Station</Label>
                <Select value={selectedStation} onValueChange={setSelectedStation} disabled={selectedLine === "all"}>
                  <SelectTrigger className="border-slate-300">
                    <SelectValue placeholder="Select Station" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Stations</SelectItem>
                    {currentStations.map((station) => (
                      <SelectItem key={station.id} value={station.id}>
                        <div className="flex items-center">
                          <Settings className="h-4 w-4 mr-2 text-slate-500" />
                          {station.name}
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label className="text-sm font-medium mb-2 block text-slate-700">Equipment</Label>
                <Select
                  value={selectedEquipment}
                  onValueChange={setSelectedEquipment}
                  disabled={selectedStation === "all"}
                >
                  <SelectTrigger className="border-slate-300">
                    <SelectValue placeholder="Select Equipment" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Equipment</SelectItem>
                    {currentEquipment.map((eq) => (
                      <SelectItem key={eq.id} value={eq.id}>
                        <div className="flex items-center">
                          <Wrench className="h-4 w-4 mr-2 text-slate-500" />
                          {eq.name}
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label className="text-sm font-medium mb-2 block text-slate-700">Shift</Label>
                <Select value={selectedShift} onValueChange={setSelectedShift}>
                  <SelectTrigger className="border-slate-300">
                    <SelectValue placeholder="Select Shift" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="current">Current Shift</SelectItem>
                    <SelectItem value="morning">Morning (6AM-2PM)</SelectItem>
                    <SelectItem value="afternoon">Afternoon (2PM-10PM)</SelectItem>
                    <SelectItem value="night">Night (10PM-6AM)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex items-end">
                <Button className="w-full bg-blue-600 hover:bg-blue-700">
                  <Download className="h-4 w-4 mr-2" />
                  Quick Export
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Enhanced KPI Cards with Status Colors */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
          <Card className="border-l-4 border-l-green-500 shadow-sm">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-slate-700">Overall OEE</CardTitle>
              <div className="flex items-center">
                <TrendingUp className="h-4 w-4 text-green-600" />
                <span className="text-xs text-green-600 ml-1">+2.1%</span>
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-green-600">72.6%</div>
              <Progress value={72.6} className="mt-3 h-2" />
              <div className="flex justify-between text-xs text-slate-500 mt-2">
                <span>Current</span>
                <span>Target: 85%</span>
              </div>
            </CardContent>
          </Card>

          <Card className="border-l-4 border-l-blue-500 shadow-sm">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-slate-700">Availability</CardTitle>
              <Clock className="h-4 w-4 text-blue-600" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-blue-600">85.0%</div>
              <Progress value={85} className="mt-3 h-2" />
              <div className="flex justify-between text-xs text-slate-500 mt-2">
                <span>Running Time</span>
                <span>Target: 90%</span>
              </div>
            </CardContent>
          </Card>

          <Card className="border-l-4 border-l-orange-500 shadow-sm">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-slate-700">Performance</CardTitle>
              <Zap className="h-4 w-4 text-orange-600" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-orange-600">88.5%</div>
              <Progress value={88.5} className="mt-3 h-2" />
              <div className="flex justify-between text-xs text-slate-500 mt-2">
                <span>Speed Efficiency</span>
                <span>Target: 95%</span>
              </div>
            </CardContent>
          </Card>

          <Card className="border-l-4 border-l-purple-500 shadow-sm">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-slate-700">Quality</CardTitle>
              <Target className="h-4 w-4 text-purple-600" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-purple-600">96.5%</div>
              <Progress value={96.5} className="mt-3 h-2" />
              <div className="flex justify-between text-xs text-slate-500 mt-2">
                <span>Good Products</span>
                <span>Target: 98%</span>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Tabs */}
        <Tabs defaultValue="dashboard" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3 bg-slate-100">
            <TabsTrigger value="dashboard" className="flex items-center gap-2 data-[state=active]:bg-white">
              <BarChart3 className="h-4 w-4" />
              Dashboard
            </TabsTrigger>
            <TabsTrigger value="quick-entry" className="flex items-center gap-2 data-[state=active]:bg-white">
              <Database className="h-4 w-4" />
              Quick Entry
            </TabsTrigger>
            <TabsTrigger value="pareto-analysis" className="flex items-center gap-2 data-[state=active]:bg-white">
              <TrendingDown className="h-4 w-4" />
              Pareto Analysis
            </TabsTrigger>
          </TabsList>

          <TabsContent value="dashboard" className="space-y-6">
            <div className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* OEE Performance Chart */}
                <Card className="shadow-sm">
                  <CardHeader>
                    <CardTitle className="text-slate-800">OEE Performance by Production Line</CardTitle>
                    <CardDescription className="text-slate-600">
                      OEE components with actual OEE performance vs targets
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ResponsiveContainer width="100%" height={300}>
                      <ComposedChart data={oeeData}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                        <XAxis dataKey="name" tick={{ fontSize: 12 }} />
                        <YAxis tick={{ fontSize: 12 }} />
                        <Tooltip
                          contentStyle={{
                            backgroundColor: "#f8fafc",
                            border: "1px solid #e2e8f0",
                            borderRadius: "6px",
                          }}
                        />
                        <Bar dataKey="availability" fill="#3b82f6" name="Availability %" />
                        <Bar dataKey="performance" fill="#f59e0b" name="Performance %" />
                        <Bar dataKey="quality" fill="#8b5cf6" name="Quality %" />
                        <Line type="monotone" dataKey="oee" stroke="#dc2626" strokeWidth={3} name="OEE %" />
                        <Line
                          type="monotone"
                          dataKey="target"
                          stroke="#16a34a"
                          strokeWidth={2}
                          strokeDasharray="5 5"
                          name="Target %"
                        />
                      </ComposedChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>

                {/* Trend Analysis */}
                <Card className="shadow-sm">
                  <CardHeader>
                    <CardTitle className="text-slate-800">6-Week Performance Trend</CardTitle>
                    <CardDescription className="text-slate-600">
                      Historical performance with target comparison
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ResponsiveContainer width="100%" height={300}>
                      <AreaChart data={trendData}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                        <XAxis dataKey="date" tick={{ fontSize: 12 }} />
                        <YAxis tick={{ fontSize: 12 }} />
                        <Tooltip
                          contentStyle={{
                            backgroundColor: "#f8fafc",
                            border: "1px solid #e2e8f0",
                            borderRadius: "6px",
                          }}
                        />
                        <Area type="monotone" dataKey="oee" stackId="1" stroke="#ef4444" fill="#fecaca" name="OEE %" />
                        <Line
                          type="monotone"
                          dataKey="target"
                          stroke="#dc2626"
                          strokeWidth={3}
                          strokeDasharray="5 5"
                          name="Target %"
                        />
                      </AreaChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>
              </div>

              {/* Equipment Flow Diagram - Full Width */}
              <EquipmentFlowDiagram />
            </div>
          </TabsContent>

          <TabsContent value="quick-entry">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Quick Entry Dashboard */}
              <Card className="lg:col-span-1 shadow-sm border-l-4 border-l-blue-500">
                <CardHeader>
                  <CardTitle className="text-slate-800 flex items-center">
                    <Zap className="h-5 w-5 mr-2 text-blue-600" />
                    Quick Actions
                  </CardTitle>
                  <CardDescription className="text-slate-600">
                    One-click data entry for common operations
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button className="w-full h-16 bg-red-600 hover:bg-red-700 text-white text-lg font-semibold">
                    <AlertTriangle className="h-6 w-6 mr-3" />
                    Emergency Stop
                  </Button>
                  <Button className="w-full h-12 bg-orange-600 hover:bg-orange-700 text-white">
                    <Clock className="h-5 w-5 mr-2" />
                    Quick Downtime
                  </Button>
                  <Button className="w-full h-12 bg-green-600 hover:bg-green-700 text-white">
                    <CheckCircle className="h-5 w-5 mr-2" />
                    Production Entry
                  </Button>
                  <Button className="w-full h-12 bg-blue-600 hover:bg-blue-700 text-white">
                    <QrCode className="h-5 w-5 mr-2" />
                    Scan Equipment
                  </Button>
                </CardContent>
              </Card>

              {/* Downtime Entry Form */}
              <Card className="shadow-sm">
                <CardHeader>
                  <CardTitle className="text-slate-800">Downtime Entry</CardTitle>
                  <CardDescription className="text-slate-600">
                    Record equipment downtime with smart defaults
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label className="text-sm font-medium mb-2 block text-slate-700">Equipment (Auto-detected)</Label>
                    <Select defaultValue="eq003">
                      <SelectTrigger className="border-slate-300">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="eq003">FL01-FILLER (EQ001003)</SelectItem>
                        <SelectItem value="eq006">FL01-PACKER (EQ001006)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label className="text-sm font-medium mb-2 block text-slate-700">Downtime Type</Label>
                    <div className="grid grid-cols-2 gap-2">
                      <Button variant="outline" className="h-12 border-red-200 hover:bg-red-50 bg-transparent">
                        <Wrench className="h-4 w-4 mr-2 text-red-600" />
                        Mechanical
                      </Button>
                      <Button variant="outline" className="h-12 border-orange-200 hover:bg-orange-50 bg-transparent">
                        <Zap className="h-4 w-4 mr-2 text-orange-600" />
                        Electrical
                      </Button>
                      <Button variant="outline" className="h-12 border-yellow-200 hover:bg-yellow-50 bg-transparent">
                        <Settings className="h-4 w-4 mr-2 text-yellow-600" />
                        Setup
                      </Button>
                      <Button variant="outline" className="h-12 border-gray-200 hover:bg-gray-50 bg-transparent">
                        <FileText className="h-4 w-4 mr-2 text-gray-600" />
                        Admin
                      </Button>
                    </div>
                  </div>

                  <div>
                    <Label className="text-sm font-medium mb-2 block text-slate-700">Duration</Label>
                    <div className="flex space-x-2">
                      <Button variant="outline" size="sm">
                        15 min
                      </Button>
                      <Button variant="outline" size="sm">
                        30 min
                      </Button>
                      <Button variant="outline" size="sm">
                        1 hr
                      </Button>
                      <Input type="number" placeholder="Custom" className="flex-1" />
                    </div>
                  </div>

                  <div>
                    <Label className="text-sm font-medium mb-2 block text-slate-700">Reason (Optional)</Label>
                    <Textarea placeholder="Brief description of the issue..." rows={2} />
                  </div>

                  <Button className="w-full bg-blue-600 hover:bg-blue-700">Submit for Approval</Button>
                </CardContent>
              </Card>

              {/* Production Entry Form */}
              <Card className="shadow-sm">
                <CardHeader>
                  <CardTitle className="text-slate-800">Production Entry</CardTitle>
                  <CardDescription className="text-slate-600">Record hourly production quantities</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label className="text-sm font-medium mb-2 block text-slate-700">Product</Label>
                    <Select defaultValue="fg001">
                      <SelectTrigger className="border-slate-300">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {products.map((product) => (
                          <SelectItem key={product.id} value={product.id}>
                            {product.code} - {product.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label className="text-sm font-medium mb-2 block text-slate-700">Operator</Label>
                    <Select defaultValue="op001">
                      <SelectTrigger className="border-slate-300">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {operators.map((operator) => (
                          <SelectItem key={operator.id} value={operator.id}>
                            {operator.name} ({operator.empId})
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label className="text-sm font-medium mb-2 block text-slate-700">Planned Qty</Label>
                      <Input type="number" defaultValue="500" />
                    </div>
                    <div>
                      <Label className="text-sm font-medium mb-2 block text-slate-700">Actual Qty</Label>
                      <Input type="number" placeholder="Enter actual" />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label className="text-sm font-medium mb-2 block text-slate-700">Good Qty</Label>
                      <Input type="number" placeholder="Good units" />
                    </div>
                    <div>
                      <Label className="text-sm font-medium mb-2 block text-slate-700">Reject Qty</Label>
                      <Input type="number" placeholder="Rejected" />
                    </div>
                  </div>

                  <Button className="w-full bg-green-600 hover:bg-green-700">Submit Production Data</Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="pareto-analysis">
            <div className="space-y-6">
              {/* Pareto Analysis Controls */}
              <Card className="shadow-sm border-l-4 border-l-purple-500">
                <CardHeader>
                  <CardTitle className="text-slate-800 flex items-center">
                    <Filter className="h-5 w-5 mr-2 text-purple-600" />
                    Pareto Analysis Controls
                  </CardTitle>
                  <CardDescription className="text-slate-600">
                    Drill down from factory to equipment level for detailed loss analysis
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <div>
                      <Label className="text-sm font-medium mb-2 block text-slate-700">Analysis Level</Label>
                      <Select defaultValue="equipment">
                        <SelectTrigger className="border-slate-300">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="factory">Factory Level</SelectItem>
                          <SelectItem value="line">Production Line Level</SelectItem>
                          <SelectItem value="station">Station Level</SelectItem>
                          <SelectItem value="equipment">Equipment Level</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label className="text-sm font-medium mb-2 block text-slate-700">Analysis Type</Label>
                      <Select defaultValue="losses">
                        <SelectTrigger className="border-slate-300">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="losses">OEE Losses</SelectItem>
                          <SelectItem value="downtime">Downtime Causes</SelectItem>
                          <SelectItem value="quality">Quality Issues</SelectItem>
                          <SelectItem value="performance">Performance Gaps</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label className="text-sm font-medium mb-2 block text-slate-700">Time Period</Label>
                      <Select defaultValue="week">
                        <SelectTrigger className="border-slate-300">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="shift">Current Shift</SelectItem>
                          <SelectItem value="day">Today</SelectItem>
                          <SelectItem value="week">This Week</SelectItem>
                          <SelectItem value="month">This Month</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="flex items-end">
                      <Button className="w-full bg-purple-600 hover:bg-purple-700">
                        <RefreshCw className="h-4 w-4 mr-2" />
                        Analyze
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Equipment-Level OEE Losses */}
                <Card className="shadow-sm">
                  <CardHeader>
                    <CardTitle className="text-slate-800 flex items-center">
                      <TrendingDown className="h-5 w-5 mr-2 text-red-600" />
                      Equipment OEE Losses (80/20 Analysis)
                    </CardTitle>
                    <CardDescription className="text-slate-600">
                      Equipment contributing most to OEE losses
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ResponsiveContainer width="100%" height={300}>
                      <ComposedChart data={paretoEquipmentData}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                        <XAxis dataKey="equipment" tick={{ fontSize: 10 }} angle={-45} textAnchor="end" height={80} />
                        <YAxis yAxisId="left" tick={{ fontSize: 12 }} />
                        <YAxis yAxisId="right" orientation="right" tick={{ fontSize: 12 }} />
                        <Tooltip
                          contentStyle={{
                            backgroundColor: "#f8fafc",
                            border: "1px solid #e2e8f0",
                            borderRadius: "6px",
                          }}
                        />
                        <Bar yAxisId="left" dataKey="lossMinutes" fill="#dc2626" name="OEE Loss Minutes" />
                        <Line
                          yAxisId="right"
                          type="monotone"
                          dataKey="cumulative"
                          stroke="#7c3aed"
                          strokeWidth={3}
                          name="Cumulative %"
                        />
                      </ComposedChart>
                    </ResponsiveContainer>
                    <div className="mt-4 p-3 bg-red-50 rounded-lg border border-red-200">
                      <p className="text-sm font-medium text-red-800">Critical Equipment (80% Impact):</p>
                      <p className="text-sm text-red-700">FL01-FILLER + FL01-PACKER = 58% of total OEE losses</p>
                      <p className="text-xs text-red-600 mt-1">
                        🎯 Focus maintenance on these 2 machines for maximum ROI
                      </p>
                    </div>
                  </CardContent>
                </Card>

                {/* Loss Type Breakdown */}
                <Card className="shadow-sm">
                  <CardHeader>
                    <CardTitle className="text-slate-800 flex items-center">
                      <Target className="h-5 w-5 mr-2 text-orange-600" />
                      OEE Loss Types (TPM Classification)
                    </CardTitle>
                    <CardDescription className="text-slate-600">
                      Six Big Losses breakdown for targeted improvement
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ResponsiveContainer width="100%" height={300}>
                      <ComposedChart
                        data={[
                          {
                            loss: "Breakdown",
                            minutes: 180,
                            percentage: 36,
                            cumulative: 36,
                            tpmCategory: "Availability",
                          },
                          {
                            loss: "Setup/Changeover",
                            minutes: 120,
                            percentage: 24,
                            cumulative: 60,
                            tpmCategory: "Availability",
                          },
                          {
                            loss: "Minor Stoppages",
                            minutes: 90,
                            percentage: 18,
                            cumulative: 78,
                            tpmCategory: "Performance",
                          },
                          {
                            loss: "Reduced Speed",
                            minutes: 60,
                            percentage: 12,
                            cumulative: 90,
                            tpmCategory: "Performance",
                          },
                          {
                            loss: "Process Defects",
                            minutes: 30,
                            percentage: 6,
                            cumulative: 96,
                            tpmCategory: "Quality",
                          },
                          {
                            loss: "Startup Defects",
                            minutes: 20,
                            percentage: 4,
                            cumulative: 100,
                            tpmCategory: "Quality",
                          },
                        ]}
                      >
                        <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                        <XAxis dataKey="loss" tick={{ fontSize: 10 }} angle={-45} textAnchor="end" height={80} />
                        <YAxis yAxisId="left" tick={{ fontSize: 12 }} />
                        <YAxis yAxisId="right" orientation="right" tick={{ fontSize: 12 }} />
                        <Tooltip
                          contentStyle={{
                            backgroundColor: "#f8fafc",
                            border: "1px solid #e2e8f0",
                            borderRadius: "6px",
                          }}
                        />
                        <Bar yAxisId="left" dataKey="minutes" fill="#ea580c" name="Loss Minutes" />
                        <Line
                          yAxisId="right"
                          type="monotone"
                          dataKey="cumulative"
                          stroke="#1d4ed8"
                          strokeWidth={3}
                          name="Cumulative %"
                        />
                      </ComposedChart>
                    </ResponsiveContainer>
                    <div className="mt-4 p-3 bg-orange-50 rounded-lg border border-orange-200">
                      <p className="text-sm font-medium text-orange-800">TPM Focus Areas:</p>
                      <p className="text-sm text-orange-700">Availability Losses = 60% (Breakdown + Setup)</p>
                      <p className="text-xs text-orange-600 mt-1">
                        📊 Implement TPM pillars: Autonomous & Planned Maintenance
                      </p>
                    </div>
                  </CardContent>
                </Card>

                {/* Equipment Drill-Down Table */}
                <Card className="lg:col-span-2 shadow-sm">
                  <CardHeader>
                    <CardTitle className="text-slate-800 flex items-center">
                      <Activity className="h-5 w-5 mr-2 text-blue-600" />
                      Equipment-Level Loss Breakdown
                    </CardTitle>
                    <CardDescription className="text-slate-600">
                      Detailed analysis of losses by equipment with actionable insights
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="overflow-x-auto">
                      <table className="w-full text-sm">
                        <thead>
                          <tr className="border-b border-slate-200">
                            <th className="text-left p-3 font-medium text-slate-700">Equipment</th>
                            <th className="text-left p-3 font-medium text-slate-700">SAP Code</th>
                            <th className="text-right p-3 font-medium text-slate-700">OEE Loss (min)</th>
                            <th className="text-right p-3 font-medium text-slate-700">Impact %</th>
                            <th className="text-right p-3 font-medium text-slate-700">Cumulative %</th>
                            <th className="text-left p-3 font-medium text-slate-700">Primary Loss Type</th>
                            <th className="text-left p-3 font-medium text-slate-700">Action Priority</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr className="border-b border-slate-100 bg-red-50">
                            <td className="p-3 font-medium text-slate-800">FL01-FILLER</td>
                            <td className="p-3 text-slate-600">EQ001003</td>
                            <td className="p-3 text-right font-medium text-red-600">180</td>
                            <td className="p-3 text-right font-medium text-red-600">35%</td>
                            <td className="p-3 text-right text-slate-600">35%</td>
                            <td className="p-3 text-slate-600">Mechanical Breakdown</td>
                            <td className="p-3">
                              <Badge className="bg-red-600 text-white">Critical - This Week</Badge>
                            </td>
                          </tr>
                          <tr className="border-b border-slate-100 bg-orange-50">
                            <td className="p-3 font-medium text-slate-800">FL01-PACKER</td>
                            <td className="p-3 text-slate-600">EQ001006</td>
                            <td className="p-3 text-right font-medium text-orange-600">120</td>
                            <td className="p-3 text-right font-medium text-orange-600">23%</td>
                            <td className="p-3 text-right text-slate-600">58%</td>
                            <td className="p-3 text-slate-600">Minor Stoppages</td>
                            <td className="p-3">
                              <Badge className="bg-orange-600 text-white">High - This Week</Badge>
                            </td>
                          </tr>
                          <tr className="border-b border-slate-100">
                            <td className="p-3 font-medium text-slate-800">FL02-LABELLER</td>
                            <td className="p-3 text-slate-600">EQ002005</td>
                            <td className="p-3 text-right font-medium text-yellow-600">90</td>
                            <td className="p-3 text-right font-medium text-yellow-600">17%</td>
                            <td className="p-3 text-right text-slate-600">75%</td>
                            <td className="p-3 text-slate-600">Setup/Changeover</td>
                            <td className="p-3">
                              <Badge className="bg-yellow-600 text-white">Medium - This Month</Badge>
                            </td>
                          </tr>
                          <tr className="border-b border-slate-100">
                            <td className="p-3 font-medium text-slate-800">FL03-CAPPER</td>
                            <td className="p-3 text-slate-600">EQ003004</td>
                            <td className="p-3 text-right font-medium text-blue-600">70</td>
                            <td className="p-3 text-right font-medium text-blue-600">14%</td>
                            <td className="p-3 text-right text-slate-600">89%</td>
                            <td className="p-3 text-slate-600">Reduced Speed</td>
                            <td className="p-3">
                              <Badge className="bg-blue-600 text-white">Medium - Next Month</Badge>
                            </td>
                          </tr>
                          <tr className="border-b border-slate-100">
                            <td className="p-3 font-medium text-slate-800">Others (12 Equipment)</td>
                            <td className="p-3 text-slate-600">Multiple</td>
                            <td className="p-3 text-right font-medium text-gray-600">55</td>
                            <td className="p-3 text-right font-medium text-gray-600">11%</td>
                            <td className="p-3 text-right text-slate-600">100%</td>
                            <td className="p-3 text-slate-600">Various</td>
                            <td className="p-3">
                              <Badge className="bg-gray-600 text-white">Low - Routine</Badge>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </CardContent>
                </Card>

                {/* Actionable Insights */}
                <Card className="lg:col-span-2 shadow-sm border-l-4 border-l-green-500">
                  <CardHeader>
                    <CardTitle className="text-slate-800 flex items-center">
                      <CheckCircle className="h-5 w-5 mr-2 text-green-600" />
                      Pareto-Based Action Plan & ROI Analysis
                    </CardTitle>
                    <CardDescription className="text-slate-600">
                      Data-driven maintenance strategy with financial impact
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <div className="p-4 bg-red-50 rounded-lg border border-red-200">
                        <h4 className="font-semibold text-red-800 mb-3 flex items-center">
                          <AlertTriangle className="h-4 w-4 mr-2" />
                          Immediate Action (80% Impact)
                        </h4>
                        <ul className="text-sm text-red-700 space-y-2">
                          <li>🔧 FL01-FILLER: Replace worn seals & gaskets</li>
                          <li>⚡ FL01-PACKER: Upgrade pneumatic system</li>
                          <li>📅 Schedule: This week (3 days)</li>
                          <li>💰 Investment: ₹2.5L</li>
                          <li>📈 Expected gain: 58% loss reduction</li>
                        </ul>
                        <div className="mt-3 p-2 bg-red-100 rounded">
                          <p className="text-xs font-medium text-red-800">ROI: 15 days payback</p>
                        </div>
                      </div>

                      <div className="p-4 bg-yellow-50 rounded-lg border border-yellow-200">
                        <h4 className="font-semibold text-yellow-800 mb-3 flex items-center">
                          <Clock className="h-4 w-4 mr-2" />
                          Secondary Actions (15% Impact)
                        </h4>
                        <ul className="text-sm text-yellow-700 space-y-2">
                          <li>🏷️ FL02-LABELLER: SMED implementation</li>
                          <li>⚙️ FL03-CAPPER: Speed optimization</li>
                          <li>📅 Schedule: This month</li>
                          <li>💰 Investment: ₹1.2L</li>
                          <li>📈 Expected gain: 31% loss reduction</li>
                        </ul>
                        <div className="mt-3 p-2 bg-yellow-100 rounded">
                          <p className="text-xs font-medium text-yellow-800">ROI: 45 days payback</p>
                        </div>
                      </div>

                      <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                        <h4 className="font-semibold text-green-800 mb-3 flex items-center">
                          <Target className="h-4 w-4 mr-2" />
                          Total Impact Projection
                        </h4>
                        <ul className="text-sm text-green-700 space-y-2">
                          <li>📊 Total potential improvement: 89%</li>
                          <li>💵 Monthly savings: ₹8.5L</li>
                          <li>🎯 OEE improvement: 72% → 85%</li>
                          <li>⏱️ Payback period: 18 days</li>
                          <li>📈 Annual ROI: 1,850%</li>
                        </ul>
                        <div className="mt-3 p-2 bg-green-100 rounded">
                          <p className="text-xs font-medium text-green-800">World-class OEE achievable</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
