"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  FileText,
  Download,
  BarChart3,
  TrendingUp,
  Users,
  Globe,
  Plus,
  Edit,
  Play,
  Pause,
  Settings,
} from "lucide-react"

export function GlobalReports() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          className="border-slate-600 text-slate-300 hover:bg-slate-800 bg-transparent"
        >
          <FileText className="h-4 w-4 mr-2" />
          Reports
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center text-xl">
            <Globe className="h-6 w-6 mr-2 text-green-600" />
            Global Reports Management
          </DialogTitle>
          <DialogDescription>Generate, schedule, and manage reports across all factories and modules</DialogDescription>
        </DialogHeader>

        <Tabs defaultValue="standard" className="space-y-6">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="standard">Standard Reports</TabsTrigger>
            <TabsTrigger value="cross-factory">Cross-Factory</TabsTrigger>
            <TabsTrigger value="scheduled">Scheduled</TabsTrigger>
            <TabsTrigger value="custom">Custom Builder</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
          </TabsList>

          <TabsContent value="standard">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">OEE Reports</CardTitle>
                  <CardDescription>Overall Equipment Effectiveness analysis</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <Button
                      variant="outline"
                      className="w-full h-16 flex flex-col items-center justify-center bg-transparent border-blue-200 hover:bg-blue-50"
                    >
                      <BarChart3 className="h-6 w-6 mb-1 text-blue-600" />
                      <span className="font-medium">Daily OEE Summary</span>
                      <span className="text-xs text-slate-500">All factories • PDF, Excel</span>
                    </Button>
                    <Button
                      variant="outline"
                      className="w-full h-16 flex flex-col items-center justify-center bg-transparent border-orange-200 hover:bg-orange-50"
                    >
                      <TrendingUp className="h-6 w-6 mb-1 text-orange-600" />
                      <span className="font-medium">OEE Trend Analysis</span>
                      <span className="text-xs text-slate-500">Weekly/Monthly • PDF</span>
                    </Button>
                    <Button
                      variant="outline"
                      className="w-full h-16 flex flex-col items-center justify-center bg-transparent border-red-200 hover:bg-red-50"
                    >
                      <Download className="h-6 w-6 mb-1 text-red-600" />
                      <span className="font-medium">Downtime Analysis</span>
                      <span className="text-xs text-slate-500">Pareto • Excel, CSV</span>
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Production Reports</CardTitle>
                  <CardDescription>Production performance and output analysis</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <Button
                      variant="outline"
                      className="w-full h-16 flex flex-col items-center justify-center bg-transparent border-green-200 hover:bg-green-50"
                    >
                      <BarChart3 className="h-6 w-6 mb-1 text-green-600" />
                      <span className="font-medium">Production Summary</span>
                      <span className="text-xs text-slate-500">Shift/Daily • Excel</span>
                    </Button>
                    <Button
                      variant="outline"
                      className="w-full h-16 flex flex-col items-center justify-center bg-transparent border-purple-200 hover:bg-purple-50"
                    >
                      <TrendingUp className="h-6 w-6 mb-1 text-purple-600" />
                      <span className="font-medium">Efficiency Report</span>
                      <span className="text-xs text-slate-500">Equipment wise • PDF</span>
                    </Button>
                    <Button
                      variant="outline"
                      className="w-full h-16 flex flex-col items-center justify-center bg-transparent border-yellow-200 hover:bg-yellow-50"
                    >
                      <Users className="h-6 w-6 mb-1 text-yellow-600" />
                      <span className="font-medium">Operator Performance</span>
                      <span className="text-xs text-slate-500">Individual • Excel</span>
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Management Reports</CardTitle>
                  <CardDescription>Executive dashboards and KPI summaries</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <Button
                      variant="outline"
                      className="w-full h-16 flex flex-col items-center justify-center bg-transparent border-indigo-200 hover:bg-indigo-50"
                    >
                      <Globe className="h-6 w-6 mb-1 text-indigo-600" />
                      <span className="font-medium">Executive Dashboard</span>
                      <span className="text-xs text-slate-500">All KPIs • PDF</span>
                    </Button>
                    <Button
                      variant="outline"
                      className="w-full h-16 flex flex-col items-center justify-center bg-transparent border-teal-200 hover:bg-teal-50"
                    >
                      <BarChart3 className="h-6 w-6 mb-1 text-teal-600" />
                      <span className="font-medium">Factory Comparison</span>
                      <span className="text-xs text-slate-500">Benchmarking • Excel</span>
                    </Button>
                    <Button
                      variant="outline"
                      className="w-full h-16 flex flex-col items-center justify-center bg-transparent border-pink-200 hover:bg-pink-50"
                    >
                      <TrendingUp className="h-6 w-6 mb-1 text-pink-600" />
                      <span className="font-medium">Monthly Review</span>
                      <span className="text-xs text-slate-500">Comprehensive • PDF</span>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="cross-factory">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Cross-Factory Benchmarking</CardTitle>
                  <CardDescription>Compare performance across all factory locations</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="p-4 border rounded-lg">
                      <div className="flex items-center justify-between mb-3">
                        <h4 className="font-medium">OEE Benchmarking Report</h4>
                        <Button size="sm">
                          <Download className="h-4 w-4 mr-2" />
                          Generate
                        </Button>
                      </div>
                      <p className="text-sm text-slate-600 mb-2">
                        Compare OEE performance across Mumbai and Chennai factories
                      </p>
                      <div className="flex items-center space-x-4 text-xs text-slate-500">
                        <span>📊 Includes: OEE, Availability, Performance, Quality</span>
                        <span>📅 Period: Last 30 days</span>
                      </div>
                    </div>

                    <div className="p-4 border rounded-lg">
                      <div className="flex items-center justify-between mb-3">
                        <h4 className="font-medium">Best Practices Report</h4>
                        <Button size="sm">
                          <Download className="h-4 w-4 mr-2" />
                          Generate
                        </Button>
                      </div>
                      <p className="text-sm text-slate-600 mb-2">
                        Identify and share best practices from top-performing lines
                      </p>
                      <div className="flex items-center space-x-4 text-xs text-slate-500">
                        <span>🏆 Top performers by category</span>
                        <span>📋 Actionable insights</span>
                      </div>
                    </div>

                    <div className="p-4 border rounded-lg">
                      <div className="flex items-center justify-between mb-3">
                        <h4 className="font-medium">Cost Comparison</h4>
                        <Button size="sm">
                          <Download className="h-4 w-4 mr-2" />
                          Generate
                        </Button>
                      </div>
                      <p className="text-sm text-slate-600 mb-2">Cost per unit analysis across factories</p>
                      <div className="flex items-center space-x-4 text-xs text-slate-500">
                        <span>💰 Material, Labor, Energy costs</span>
                        <span>📈 Variance analysis</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Global KPI Dashboard</CardTitle>
                  <CardDescription>Company-wide performance metrics</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="p-3 bg-blue-50 rounded-lg text-center">
                        <div className="text-2xl font-bold text-blue-600">72.6%</div>
                        <div className="text-sm text-blue-700">Global OEE</div>
                      </div>
                      <div className="p-3 bg-green-50 rounded-lg text-center">
                        <div className="text-2xl font-bold text-green-600">94.2%</div>
                        <div className="text-sm text-green-700">Quality Rate</div>
                      </div>
                      <div className="p-3 bg-orange-50 rounded-lg text-center">
                        <div className="text-2xl font-bold text-orange-600">₹12.45</div>
                        <div className="text-sm text-orange-700">Cost/Unit</div>
                      </div>
                      <div className="p-3 bg-purple-50 rounded-lg text-center">
                        <div className="text-2xl font-bold text-purple-600">96.8%</div>
                        <div className="text-sm text-purple-700">On-time Delivery</div>
                      </div>
                    </div>

                    <div className="p-4 border rounded-lg">
                      <h4 className="font-medium mb-2">Factory Performance Ranking</h4>
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-sm">1. Mumbai FL01</span>
                          <span className="text-sm font-medium text-green-600">76.8% OEE</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm">2. Chennai FL04</span>
                          <span className="text-sm font-medium text-blue-600">76.0% OEE</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm">3. Mumbai FL03</span>
                          <span className="text-sm font-medium text-yellow-600">75.9% OEE</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm">4. Chennai FL05</span>
                          <span className="text-sm font-medium text-orange-600">67.1% OEE</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm">5. Mumbai FL02</span>
                          <span className="text-sm font-medium text-red-600">65.2% OEE</span>
                        </div>
                      </div>
                    </div>

                    <Button className="w-full">
                      <Download className="h-4 w-4 mr-2" />
                      Export Global Dashboard
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="scheduled">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <div className="flex justify-between items-center">
                    <div>
                      <CardTitle>Active Scheduled Reports</CardTitle>
                      <CardDescription>Automated report generation and distribution</CardDescription>
                    </div>
                    <Button>
                      <Plus className="h-4 w-4 mr-2" />
                      New Schedule
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="border rounded-lg p-4">
                      <div className="flex justify-between items-start mb-3">
                        <div>
                          <h4 className="font-medium">Daily OEE Summary</h4>
                          <p className="text-sm text-slate-600">Every day at 8:00 AM</p>
                          <p className="text-xs text-slate-500">Recipients: All Plant Managers (4)</p>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge variant="outline" className="bg-green-50 text-green-700">
                            Active
                          </Badge>
                          <Button variant="outline" size="sm">
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button variant="outline" size="sm">
                            <Pause className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                      <div className="text-xs text-slate-500">
                        <p>Last sent: Today 8:00 AM • Next: Tomorrow 8:00 AM</p>
                        <p>Format: PDF • Size: ~2.5 MB</p>
                      </div>
                    </div>

                    <div className="border rounded-lg p-4">
                      <div className="flex justify-between items-start mb-3">
                        <div>
                          <h4 className="font-medium">Weekly Performance Review</h4>
                          <p className="text-sm text-slate-600">Every Monday at 9:00 AM</p>
                          <p className="text-xs text-slate-500">Recipients: Executive Team (6)</p>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge variant="outline" className="bg-green-50 text-green-700">
                            Active
                          </Badge>
                          <Button variant="outline" size="sm">
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button variant="outline" size="sm">
                            <Pause className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                      <div className="text-xs text-slate-500">
                        <p>Last sent: Monday 9:00 AM • Next: Next Monday 9:00 AM</p>
                        <p>Format: PDF + Excel • Size: ~5.2 MB</p>
                      </div>
                    </div>

                    <div className="border rounded-lg p-4">
                      <div className="flex justify-between items-start mb-3">
                        <div>
                          <h4 className="font-medium">Monthly Executive Dashboard</h4>
                          <p className="text-sm text-slate-600">1st of every month at 10:00 AM</p>
                          <p className="text-xs text-slate-500">Recipients: Board Members (3)</p>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge variant="outline" className="bg-green-50 text-green-700">
                            Active
                          </Badge>
                          <Button variant="outline" size="sm">
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button variant="outline" size="sm">
                            <Pause className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                      <div className="text-xs text-slate-500">
                        <p>Last sent: 1st Dec 10:00 AM • Next: 1st Jan 10:00 AM</p>
                        <p>Format: PDF • Size: ~8.1 MB</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Schedule New Report</CardTitle>
                  <CardDescription>Create automated report distribution</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <Label>Report Type</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select report type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="oee-daily">Daily OEE Summary</SelectItem>
                          <SelectItem value="production-shift">Shift Production Report</SelectItem>
                          <SelectItem value="downtime-analysis">Downtime Analysis</SelectItem>
                          <SelectItem value="cross-factory">Cross-Factory Comparison</SelectItem>
                          <SelectItem value="custom">Custom Report</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label>Frequency</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select frequency" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="hourly">Every Hour</SelectItem>
                          <SelectItem value="shift">Every Shift</SelectItem>
                          <SelectItem value="daily">Daily</SelectItem>
                          <SelectItem value="weekly">Weekly</SelectItem>
                          <SelectItem value="monthly">Monthly</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label>Time</Label>
                        <Input type="time" defaultValue="08:00" />
                      </div>
                      <div>
                        <Label>Format</Label>
                        <Select defaultValue="pdf">
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="pdf">PDF</SelectItem>
                            <SelectItem value="excel">Excel</SelectItem>
                            <SelectItem value="csv">CSV</SelectItem>
                            <SelectItem value="both">PDF + Excel</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div>
                      <Label>Recipients (Email addresses)</Label>
                      <Textarea placeholder="manager1@indusflow.com, supervisor@indusflow.com" rows={3} />
                    </div>

                    <div className="flex space-x-2">
                      <Button variant="outline" className="flex-1 bg-transparent">
                        Preview Report
                      </Button>
                      <Button className="flex-1">Schedule Report</Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="custom">
            <Card>
              <CardHeader>
                <CardTitle>Custom Report Builder</CardTitle>
                <CardDescription>Build custom reports with specific metrics and filters</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div>
                      <Label>Report Name</Label>
                      <Input placeholder="Enter custom report name" />
                    </div>

                    <div>
                      <Label>Factories</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select factories" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">All Factories</SelectItem>
                          <SelectItem value="mumbai">Mumbai Only</SelectItem>
                          <SelectItem value="chennai">Chennai Only</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label>Production Lines</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select production lines" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">All Lines</SelectItem>
                          <SelectItem value="carbonated">Carbonated Drinks Lines</SelectItem>
                          <SelectItem value="juice">Juice Processing Lines</SelectItem>
                          <SelectItem value="water">Water Bottling Lines</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label>Time Period</Label>
                      <div className="grid grid-cols-2 gap-2">
                        <Input type="date" />
                        <Input type="date" />
                      </div>
                    </div>

                    <div>
                      <Label>Metrics to Include</Label>
                      <div className="space-y-2 mt-2">
                        <div className="flex items-center space-x-2">
                          <input type="checkbox" id="oee" defaultChecked />
                          <label htmlFor="oee" className="text-sm">
                            Overall OEE
                          </label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <input type="checkbox" id="availability" defaultChecked />
                          <label htmlFor="availability" className="text-sm">
                            Availability
                          </label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <input type="checkbox" id="performance" defaultChecked />
                          <label htmlFor="performance" className="text-sm">
                            Performance
                          </label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <input type="checkbox" id="quality" defaultChecked />
                          <label htmlFor="quality" className="text-sm">
                            Quality
                          </label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <input type="checkbox" id="downtime" />
                          <label htmlFor="downtime" className="text-sm">
                            Downtime Analysis
                          </label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <input type="checkbox" id="production" />
                          <label htmlFor="production" className="text-sm">
                            Production Quantities
                          </label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <input type="checkbox" id="pareto" />
                          <label htmlFor="pareto" className="text-sm">
                            Pareto Analysis
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <Label>Chart Types</Label>
                      <div className="space-y-2 mt-2">
                        <div className="flex items-center space-x-2">
                          <input type="checkbox" id="bar-chart" defaultChecked />
                          <label htmlFor="bar-chart" className="text-sm">
                            Bar Charts
                          </label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <input type="checkbox" id="line-chart" defaultChecked />
                          <label htmlFor="line-chart" className="text-sm">
                            Line Charts
                          </label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <input type="checkbox" id="pie-chart" />
                          <label htmlFor="pie-chart" className="text-sm">
                            Pie Charts
                          </label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <input type="checkbox" id="pareto-chart" />
                          <label htmlFor="pareto-chart" className="text-sm">
                            Pareto Charts
                          </label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <input type="checkbox" id="tables" defaultChecked />
                          <label htmlFor="tables" className="text-sm">
                            Data Tables
                          </label>
                        </div>
                      </div>
                    </div>

                    <div>
                      <Label>Grouping</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Group data by" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="factory">By Factory</SelectItem>
                          <SelectItem value="line">By Production Line</SelectItem>
                          <SelectItem value="equipment">By Equipment</SelectItem>
                          <SelectItem value="shift">By Shift</SelectItem>
                          <SelectItem value="operator">By Operator</SelectItem>
                          <SelectItem value="product">By Product</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label>Output Format</Label>
                      <Select defaultValue="pdf">
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="pdf">PDF Report</SelectItem>
                          <SelectItem value="excel">Excel Workbook</SelectItem>
                          <SelectItem value="csv">CSV Data</SelectItem>
                          <SelectItem value="powerpoint">PowerPoint Presentation</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label>Additional Options</Label>
                      <div className="space-y-2 mt-2">
                        <div className="flex items-center space-x-2">
                          <input type="checkbox" id="summary" defaultChecked />
                          <label htmlFor="summary" className="text-sm">
                            Include Executive Summary
                          </label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <input type="checkbox" id="recommendations" />
                          <label htmlFor="recommendations" className="text-sm">
                            Include Recommendations
                          </label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <input type="checkbox" id="benchmarks" />
                          <label htmlFor="benchmarks" className="text-sm">
                            Include Industry Benchmarks
                          </label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <input type="checkbox" id="trends" />
                          <label htmlFor="trends" className="text-sm">
                            Include Trend Analysis
                          </label>
                        </div>
                      </div>
                    </div>

                    <div className="flex space-x-2 pt-4">
                      <Button variant="outline" className="flex-1 bg-transparent">
                        <Play className="h-4 w-4 mr-2" />
                        Preview
                      </Button>
                      <Button className="flex-1">
                        <Download className="h-4 w-4 mr-2" />
                        Generate Report
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="analytics">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Report Usage Analytics</CardTitle>
                  <CardDescription>Track report generation and usage patterns</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="p-3 bg-blue-50 rounded-lg text-center">
                        <div className="text-2xl font-bold text-blue-600">1,247</div>
                        <div className="text-sm text-blue-700">Reports Generated</div>
                        <div className="text-xs text-blue-600">This Month</div>
                      </div>
                      <div className="p-3 bg-green-50 rounded-lg text-center">
                        <div className="text-2xl font-bold text-green-600">89%</div>
                        <div className="text-sm text-green-700">Delivery Success</div>
                        <div className="text-xs text-green-600">Email Reports</div>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <h4 className="font-medium">Most Popular Reports</h4>
                      <div className="space-y-2">
                        <div className="flex justify-between items-center">
                          <span className="text-sm">Daily OEE Summary</span>
                          <span className="text-sm font-medium">342 generated</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm">Production Summary</span>
                          <span className="text-sm font-medium">198 generated</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm">Downtime Analysis</span>
                          <span className="text-sm font-medium">156 generated</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm">Cross-Factory Comparison</span>
                          <span className="text-sm font-medium">89 generated</span>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <h4 className="font-medium">Peak Usage Times</h4>
                      <div className="space-y-2">
                        <div className="flex justify-between items-center">
                          <span className="text-sm">8:00 AM - 9:00 AM</span>
                          <span className="text-sm font-medium">23% of reports</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm">5:00 PM - 6:00 PM</span>
                          <span className="text-sm font-medium">18% of reports</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm">12:00 PM - 1:00 PM</span>
                          <span className="text-sm font-medium">15% of reports</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Performance Metrics</CardTitle>
                  <CardDescription>Report generation performance and optimization</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="p-3 bg-orange-50 rounded-lg text-center">
                        <div className="text-2xl font-bold text-orange-600">8.2s</div>
                        <div className="text-sm text-orange-700">Avg Generation Time</div>
                        <div className="text-xs text-orange-600">Standard Reports</div>
                      </div>
                      <div className="p-3 bg-purple-50 rounded-lg text-center">
                        <div className="text-2xl font-bold text-purple-600">2.1MB</div>
                        <div className="text-sm text-purple-700">Avg File Size</div>
                        <div className="text-xs text-purple-600">PDF Reports</div>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <h4 className="font-medium">System Performance</h4>
                      <div className="space-y-2">
                        <div className="flex justify-between items-center">
                          <span className="text-sm">Database Query Time</span>
                          <span className="text-sm font-medium text-green-600">1.2s avg</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm">Report Rendering</span>
                          <span className="text-sm font-medium text-green-600">3.8s avg</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm">Email Delivery</span>
                          <span className="text-sm font-medium text-green-600">2.1s avg</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm">Storage Usage</span>
                          <span className="text-sm font-medium text-yellow-600">68% capacity</span>
                        </div>
                      </div>
                    </div>

                    <div className="p-3 bg-yellow-50 rounded-lg border border-yellow-200">
                      <h4 className="font-medium text-yellow-800 mb-2">Optimization Recommendations</h4>
                      <ul className="text-sm text-yellow-700 space-y-1">
                        <li>• Archive reports older than 6 months</li>
                        <li>• Optimize database indexes for faster queries</li>
                        <li>• Consider report caching for frequently accessed data</li>
                      </ul>
                    </div>

                    <Button variant="outline" className="w-full bg-transparent">
                      <Settings className="h-4 w-4 mr-2" />
                      Optimize Performance
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  )
}
