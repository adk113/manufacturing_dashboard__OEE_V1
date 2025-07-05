"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  ChevronDown,
  ChevronRight,
  Activity,
  AlertTriangle,
  CheckCircle,
  Clock,
  Wrench,
  Zap,
  Settings,
} from "lucide-react"

interface Equipment {
  id: string
  name: string
  sapCode: string
  status: "running" | "warning" | "critical" | "maintenance" | "offline"
  efficiency: number
  type: string
}

interface Station {
  id: string
  name: string
  type: string
  equipment: Equipment[]
  status: "running" | "warning" | "critical" | "maintenance" | "offline"
}

interface ProductionLine {
  id: string
  name: string
  type: string
  capacity: number
  stations: Station[]
  status: "running" | "warning" | "critical" | "maintenance" | "offline"
  flowDirection: "horizontal" | "vertical"
}

// Enhanced equipment data with flow structure
const productionLinesData: ProductionLine[] = [
  {
    id: "fl01",
    name: "FL01 - Carbonated Drinks",
    type: "carbonated",
    capacity: 12000,
    flowDirection: "horizontal",
    status: "warning", // Derived from equipment status
    stations: [
      {
        id: "st01",
        name: "Preparation",
        type: "preparation",
        status: "running",
        equipment: [
          { id: "eq001", name: "BLOWER", sapCode: "EQ001001", status: "running", efficiency: 92, type: "blower" },
          { id: "eq002", name: "MIXER", sapCode: "EQ001002", status: "running", efficiency: 88, type: "mixer" },
        ],
      },
      {
        id: "st02",
        name: "Filling",
        type: "filling",
        status: "warning",
        equipment: [
          { id: "eq003", name: "FILLER", sapCode: "EQ001003", status: "warning", efficiency: 75, type: "filler" },
          { id: "eq004", name: "CAPPER", sapCode: "EQ001004", status: "running", efficiency: 95, type: "capper" },
        ],
      },
      {
        id: "st03",
        name: "Packaging",
        type: "packaging",
        status: "critical",
        equipment: [
          { id: "eq005", name: "LABELLER", sapCode: "EQ001005", status: "running", efficiency: 90, type: "labeller" },
          { id: "eq006", name: "PACKER", sapCode: "EQ001006", status: "critical", efficiency: 45, type: "packer" },
        ],
      },
      {
        id: "st04",
        name: "Palletizing",
        type: "palletizing",
        status: "running",
        equipment: [
          {
            id: "eq007",
            name: "PALLETIZER",
            sapCode: "EQ001007",
            status: "running",
            efficiency: 87,
            type: "palletizer",
          },
          { id: "eq008", name: "WRAPPER", sapCode: "EQ001008", status: "running", efficiency: 93, type: "wrapper" },
        ],
      },
    ],
  },
  {
    id: "fl02",
    name: "FL02 - Juice Processing",
    type: "juice",
    capacity: 8000,
    flowDirection: "horizontal",
    status: "running",
    stations: [
      {
        id: "st05",
        name: "Mixing",
        type: "mixing",
        status: "running",
        equipment: [
          { id: "eq009", name: "MIXER", sapCode: "EQ002001", status: "running", efficiency: 94, type: "mixer" },
          { id: "eq010", name: "HEATER", sapCode: "EQ002002", status: "running", efficiency: 91, type: "heater" },
        ],
      },
      {
        id: "st06",
        name: "Pasteurization",
        type: "pasteurization",
        status: "running",
        equipment: [
          {
            id: "eq011",
            name: "PASTEURIZER",
            sapCode: "EQ002003",
            status: "running",
            efficiency: 89,
            type: "pasteurizer",
          },
        ],
      },
      {
        id: "st07",
        name: "Filling",
        type: "filling",
        status: "running",
        equipment: [
          { id: "eq012", name: "FILLER", sapCode: "EQ002004", status: "running", efficiency: 92, type: "filler" },
          { id: "eq013", name: "SEALER", sapCode: "EQ002005", status: "running", efficiency: 88, type: "sealer" },
        ],
      },
      {
        id: "st08",
        name: "Packaging",
        type: "packaging",
        status: "running",
        equipment: [
          { id: "eq014", name: "PACKER", sapCode: "EQ002006", status: "running", efficiency: 90, type: "packer" },
        ],
      },
    ],
  },
  {
    id: "fl03",
    name: "FL03 - Water Bottling",
    type: "water",
    capacity: 15000,
    flowDirection: "horizontal",
    status: "maintenance",
    stations: [
      {
        id: "st09",
        name: "Treatment",
        type: "treatment",
        status: "running",
        equipment: [
          { id: "eq015", name: "FILTER", sapCode: "EQ003001", status: "running", efficiency: 95, type: "filter" },
          {
            id: "eq016",
            name: "UV-STERILIZER",
            sapCode: "EQ003002",
            status: "running",
            efficiency: 98,
            type: "sterilizer",
          },
        ],
      },
      {
        id: "st10",
        name: "Filling",
        type: "filling",
        status: "maintenance",
        equipment: [
          { id: "eq017", name: "FILLER", sapCode: "EQ003003", status: "maintenance", efficiency: 0, type: "filler" },
          { id: "eq018", name: "CAPPER", sapCode: "EQ003004", status: "offline", efficiency: 0, type: "capper" },
        ],
      },
      {
        id: "st11",
        name: "Labeling",
        type: "labeling",
        status: "offline",
        equipment: [
          { id: "eq019", name: "LABELLER", sapCode: "EQ003005", status: "offline", efficiency: 0, type: "labeller" },
        ],
      },
      {
        id: "st12",
        name: "Packaging",
        type: "packaging",
        status: "offline",
        equipment: [
          { id: "eq020", name: "PACKER", sapCode: "EQ003006", status: "offline", efficiency: 0, type: "packer" },
        ],
      },
    ],
  },
]

function getStatusColor(status: string): string {
  switch (status) {
    case "running":
      return "bg-green-500 border-green-600 text-white"
    case "warning":
      return "bg-yellow-500 border-yellow-600 text-white"
    case "critical":
      return "bg-red-500 border-red-600 text-white"
    case "maintenance":
      return "bg-blue-500 border-blue-600 text-white"
    case "offline":
      return "bg-gray-500 border-gray-600 text-white"
    default:
      return "bg-gray-400 border-gray-500 text-white"
  }
}

function getStatusIcon(status: string) {
  switch (status) {
    case "running":
      return <CheckCircle className="h-4 w-4" />
    case "warning":
      return <AlertTriangle className="h-4 w-4" />
    case "critical":
      return <AlertTriangle className="h-4 w-4" />
    case "maintenance":
      return <Wrench className="h-4 w-4" />
    case "offline":
      return <Settings className="h-4 w-4" />
    default:
      return <Activity className="h-4 w-4" />
  }
}

function getEquipmentIcon(type: string) {
  switch (type) {
    case "mixer":
    case "blower":
      return <Activity className="h-4 w-4" />
    case "filler":
    case "capper":
      return <Zap className="h-4 w-4" />
    case "packer":
    case "labeller":
      return <Settings className="h-4 w-4" />
    default:
      return <Wrench className="h-4 w-4" />
  }
}

export function EquipmentFlowDiagram() {
  const [expandedLines, setExpandedLines] = useState<Set<string>>(new Set())
  const [expandedStations, setExpandedStations] = useState<Set<string>>(new Set())

  const toggleLineExpansion = (lineId: string) => {
    const newExpanded = new Set(expandedLines)
    if (newExpanded.has(lineId)) {
      newExpanded.delete(lineId)
      // Also collapse all stations in this line
      const newExpandedStations = new Set(expandedStations)
      productionLinesData
        .find((line) => line.id === lineId)
        ?.stations.forEach((station) => {
          newExpandedStations.delete(station.id)
        })
      setExpandedStations(newExpandedStations)
    } else {
      newExpanded.add(lineId)
    }
    setExpandedLines(newExpanded)
  }

  const toggleStationExpansion = (stationId: string) => {
    const newExpanded = new Set(expandedStations)
    if (newExpanded.has(stationId)) {
      newExpanded.delete(stationId)
    } else {
      newExpanded.add(stationId)
    }
    setExpandedStations(newExpanded)
  }

  return (
    <Card className="shadow-sm">
      <CardHeader>
        <CardTitle className="text-slate-800 flex items-center">
          <Activity className="h-5 w-5 mr-2 text-blue-600" />
          Production Flow & Equipment Status
        </CardTitle>
        <CardDescription className="text-slate-600">
          Interactive process flow with real-time equipment status - Click to drill down
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {productionLinesData.map((line) => (
            <div key={line.id} className="border rounded-lg p-4 bg-slate-50">
              {/* Production Line Header */}
              <div
                className="flex items-center justify-between cursor-pointer mb-4"
                onClick={() => toggleLineExpansion(line.id)}
              >
                <div className="flex items-center space-x-3">
                  {expandedLines.has(line.id) ? (
                    <ChevronDown className="h-5 w-5 text-slate-500" />
                  ) : (
                    <ChevronRight className="h-5 w-5 text-slate-500" />
                  )}
                  <div
                    className={`px-4 py-2 rounded-lg border-2 ${getStatusColor(line.status)} flex items-center space-x-2`}
                  >
                    {getStatusIcon(line.status)}
                    <span className="font-medium">{line.name}</span>
                  </div>
                  <Badge variant="outline" className="bg-white">
                    {line.capacity.toLocaleString()} BPH
                  </Badge>
                </div>
                <div className="flex items-center space-x-2">
                  <Badge
                    variant="outline"
                    className={
                      line.status === "running"
                        ? "border-green-500 text-green-700 bg-green-50"
                        : line.status === "warning"
                          ? "border-yellow-500 text-yellow-700 bg-yellow-50"
                          : line.status === "critical"
                            ? "border-red-500 text-red-700 bg-red-50"
                            : line.status === "maintenance"
                              ? "border-blue-500 text-blue-700 bg-blue-50"
                              : "border-gray-500 text-gray-700 bg-gray-50"
                    }
                  >
                    {line.status.toUpperCase()}
                  </Badge>
                  <span className="text-sm text-slate-500">{line.stations.length} stations</span>
                </div>
              </div>

              {/* Production Flow Diagram */}
              {expandedLines.has(line.id) && (
                <div className="ml-8">
                  <div className="flex items-center space-x-2 mb-4">
                    {line.stations.map((station, index) => (
                      <div key={station.id} className="flex items-center">
                        {/* Station Block */}
                        <div className="relative cursor-pointer" onClick={() => toggleStationExpansion(station.id)}>
                          <div
                            className={`px-3 py-2 rounded border-2 ${getStatusColor(station.status)} min-w-[120px] text-center`}
                          >
                            <div className="flex items-center justify-center space-x-1 mb-1">
                              {getStatusIcon(station.status)}
                              <span className="text-xs font-medium">{station.name}</span>
                            </div>
                            <div className="text-xs opacity-90">{station.equipment.length} equipment</div>
                          </div>

                          {/* Expansion indicator */}
                          <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2">
                            {expandedStations.has(station.id) ? (
                              <ChevronDown className="h-4 w-4 text-slate-400 bg-white rounded-full border" />
                            ) : (
                              <ChevronRight className="h-4 w-4 text-slate-400 bg-white rounded-full border" />
                            )}
                          </div>
                        </div>

                        {/* Flow Arrow */}
                        {index < line.stations.length - 1 && (
                          <div className="flex items-center mx-2">
                            <div className="w-8 h-0.5 bg-slate-400"></div>
                            <div className="w-0 h-0 border-l-4 border-l-slate-400 border-t-2 border-b-2 border-t-transparent border-b-transparent"></div>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>

                  {/* Equipment Details */}
                  {line.stations.map(
                    (station) =>
                      expandedStations.has(station.id) && (
                        <div
                          key={`${station.id}-details`}
                          className="mb-4 ml-4 p-4 bg-white rounded-lg border border-slate-200"
                        >
                          <h4 className="font-medium text-slate-800 mb-3 flex items-center">
                            {getStatusIcon(station.status)}
                            <span className="ml-2">{station.name} Station Equipment</span>
                          </h4>
                          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                            {station.equipment.map((equipment) => (
                              <div
                                key={equipment.id}
                                className={`p-3 rounded-lg border-2 ${getStatusColor(equipment.status)} bg-opacity-90`}
                              >
                                <div className="flex items-center justify-between mb-2">
                                  <div className="flex items-center space-x-2">
                                    {getEquipmentIcon(equipment.type)}
                                    <span className="font-medium text-sm">{equipment.name}</span>
                                  </div>
                                  <Badge variant="outline" className="bg-white bg-opacity-20 text-xs">
                                    {equipment.efficiency}%
                                  </Badge>
                                </div>
                                <div className="text-xs opacity-90">
                                  <p>SAP: {equipment.sapCode}</p>
                                  <p>Status: {equipment.status.toUpperCase()}</p>
                                </div>

                                {/* Status-specific actions */}
                                {equipment.status === "critical" && (
                                  <div className="mt-2">
                                    <Button
                                      size="sm"
                                      variant="outline"
                                      className="h-6 text-xs bg-white bg-opacity-20 border-white"
                                    >
                                      <AlertTriangle className="h-3 w-3 mr-1" />
                                      Urgent Action
                                    </Button>
                                  </div>
                                )}
                                {equipment.status === "warning" && (
                                  <div className="mt-2">
                                    <Button
                                      size="sm"
                                      variant="outline"
                                      className="h-6 text-xs bg-white bg-opacity-20 border-white"
                                    >
                                      <Clock className="h-3 w-3 mr-1" />
                                      Schedule Check
                                    </Button>
                                  </div>
                                )}
                                {equipment.status === "maintenance" && (
                                  <div className="mt-2">
                                    <Button
                                      size="sm"
                                      variant="outline"
                                      className="h-6 text-xs bg-white bg-opacity-20 border-white"
                                    >
                                      <Wrench className="h-3 w-3 mr-1" />
                                      In Progress
                                    </Button>
                                  </div>
                                )}
                              </div>
                            ))}
                          </div>
                        </div>
                      ),
                  )}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Legend */}
        <div className="mt-6 p-4 bg-slate-100 rounded-lg">
          <h4 className="font-medium text-slate-800 mb-3">Status Legend</h4>
          <div className="flex flex-wrap gap-4">
            <div className="flex items-center space-x-2">
              <div className="w-4 h-4 bg-green-500 rounded border"></div>
              <span className="text-sm text-slate-600">Running (Normal)</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-4 h-4 bg-yellow-500 rounded border"></div>
              <span className="text-sm text-slate-600">Warning (Attention Needed)</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-4 h-4 bg-red-500 rounded border"></div>
              <span className="text-sm text-slate-600">Critical (Immediate Action)</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-4 h-4 bg-blue-500 rounded border"></div>
              <span className="text-sm text-slate-600">Maintenance (Planned)</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-4 h-4 bg-gray-500 rounded border"></div>
              <span className="text-sm text-slate-600">Offline (Stopped)</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
