"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Plus, Edit, Globe, Cog } from "lucide-react"

export function GlobalConfiguration() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          className="border-slate-600 text-slate-300 hover:bg-slate-800 bg-transparent"
        >
          <Cog className="h-4 w-4 mr-2" />
          Global Config
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center text-xl">
            <Globe className="h-6 w-6 mr-2 text-blue-600" />
            Global Configuration Management
          </DialogTitle>
          <DialogDescription>
            Manage system-wide settings, standards, and configurations across all factories
          </DialogDescription>
        </DialogHeader>

        <Tabs defaultValue="factories" className="space-y-6">
          <TabsList className="grid w-full grid-cols-6">
            <TabsTrigger value="factories">Factories</TabsTrigger>
            <TabsTrigger value="standards">Standards</TabsTrigger>
            <TabsTrigger value="users">Users & Roles</TabsTrigger>
            <TabsTrigger value="targets">Targets</TabsTrigger>
            <TabsTrigger value="system">System</TabsTrigger>
            <TabsTrigger value="integration">Integration</TabsTrigger>
          </TabsList>

          <TabsContent value="factories">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <div className="flex justify-between items-center">
                    <div>
                      <CardTitle>Factory Management</CardTitle>
                      <CardDescription>Manage all factory locations and hierarchies</CardDescription>
                    </div>
                    <Button>
                      <Plus className="h-4 w-4 mr-2" />
                      Add Factory
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="border rounded-lg p-4">
                      <div className="flex justify-between items-start mb-3">
                        <div>
                          <h4 className="font-medium">IndusFlow Mumbai</h4>
                          <p className="text-sm text-slate-600">Mumbai, Maharashtra • Asia/Kolkata</p>
                          <p className="text-xs text-slate-500 mt-1">3 Lines • 16 Equipment • 24 Operators</p>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge variant="outline" className="bg-green-50 text-green-700">
                            Active
                          </Badge>
                          <Button variant="outline" size="sm">
                            <Edit className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                    <div className="border rounded-lg p-4">
                      <div className="flex justify-between items-start mb-3">
                        <div>
                          <h4 className="font-medium">IndusFlow Chennai</h4>
                          <p className="text-sm text-slate-600">Chennai, Tamil Nadu • Asia/Kolkata</p>
                          <p className="text-xs text-slate-500 mt-1">2 Lines • 12 Equipment • 18 Operators</p>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge variant="outline" className="bg-green-50 text-green-700">
                            Active
                          </Badge>
                          <Button variant="outline" size="sm">
                            <Edit className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Equipment Hierarchy</CardTitle>
                  <CardDescription>Global equipment classification and standards</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="p-3 bg-blue-50 rounded-lg border border-blue-200">
                      <h5 className="font-medium text-blue-800">Production Equipment</h5>
                      <p className="text-sm text-blue-700">Fillers, Packers, Cappers, Labellers</p>
                      <p className="text-xs text-blue-600">28 units across all factories</p>
                    </div>
                    <div className="p-3 bg-green-50 rounded-lg border border-green-200">
                      <h5 className="font-medium text-green-800">Utility Equipment</h5>
                      <p className="text-sm text-green-700">Compressors, Boilers, Generators, WTP</p>
                      <p className="text-xs text-green-600">9 units across all factories</p>
                    </div>
                    <div className="p-3 bg-purple-50 rounded-lg border border-purple-200">
                      <h5 className="font-medium text-purple-800">Quality Equipment</h5>
                      <p className="text-sm text-purple-700">Inspection stations, Testing equipment</p>
                      <p className="text-xs text-purple-600">6 units across all factories</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="standards">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <div className="flex justify-between items-center">
                    <div>
                      <CardTitle>Global Standards</CardTitle>
                      <CardDescription>Company-wide standards and benchmarks</CardDescription>
                    </div>
                    <Button>
                      <Plus className="h-4 w-4 mr-2" />
                      Add Standard
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="border rounded-lg p-4">
                      <div className="flex justify-between items-start mb-2">
                        <h4 className="font-medium">OEE Targets</h4>
                        <Button variant="outline" size="sm">
                          <Edit className="h-4 w-4" />
                        </Button>
                      </div>
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <p className="text-slate-600">
                            World Class: <span className="font-medium">85%</span>
                          </p>
                          <p className="text-slate-600">
                            Good: <span className="font-medium">75%</span>
                          </p>
                        </div>
                        <div>
                          <p className="text-slate-600">
                            Acceptable: <span className="font-medium">65%</span>
                          </p>
                          <p className="text-slate-600">
                            Poor: <span className="font-medium">50%</span>
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="border rounded-lg p-4">
                      <div className="flex justify-between items-start mb-2">
                        <h4 className="font-medium">Cost Standards</h4>
                        <Button variant="outline" size="sm">
                          <Edit className="h-4 w-4" />
                        </Button>
                      </div>
                      <div className="text-sm space-y-1">
                        <p className="text-slate-600">Electricity: ₹8.50/kWh</p>
                        <p className="text-slate-600">Labor (Skilled): ₹250/hour</p>
                        <p className="text-slate-600">Maintenance: ₹300/hour</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Product Standards</CardTitle>
                  <CardDescription>Global product specifications and quality standards</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="border rounded-lg p-4">
                      <h4 className="font-medium mb-2">Carbonated Drinks</h4>
                      <div className="text-sm text-slate-600 space-y-1">
                        <p>• Fill Volume Tolerance: ±2ml</p>
                        <p>• CO2 Level: 3.8-4.2 volumes</p>
                        <p>• Brix Level: ±0.2°</p>
                        <p>• Target Speed: 600 BPM</p>
                      </div>
                    </div>
                    <div className="border rounded-lg p-4">
                      <h4 className="font-medium mb-2">Juice Products</h4>
                      <div className="text-sm text-slate-600 space-y-1">
                        <p>• Fill Volume Tolerance: ±3ml</p>
                        <p>• Pasteurization: 85°C for 15 sec</p>
                        <p>• Brix Level: ±0.3°</p>
                        <p>• Target Speed: 400 BPM</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="users">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <div className="flex justify-between items-center">
                    <div>
                      <CardTitle>User Roles & Permissions</CardTitle>
                      <CardDescription>Global role-based access control</CardDescription>
                    </div>
                    <Button>
                      <Plus className="h-4 w-4 mr-2" />
                      Add Role
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="border rounded-lg p-4">
                      <div className="flex justify-between items-center mb-2">
                        <h4 className="font-medium">System Administrator</h4>
                        <Badge variant="outline" className="bg-red-50 text-red-700">
                          2 Users
                        </Badge>
                      </div>
                      <ul className="text-sm text-slate-600 space-y-1">
                        <li>✅ Global configuration access</li>
                        <li>✅ User management</li>
                        <li>✅ System settings</li>
                        <li>❌ Production data access</li>
                      </ul>
                    </div>
                    <div className="border rounded-lg p-4">
                      <div className="flex justify-between items-center mb-2">
                        <h4 className="font-medium">Plant Manager</h4>
                        <Badge variant="outline" className="bg-purple-50 text-purple-700">
                          4 Users
                        </Badge>
                      </div>
                      <ul className="text-sm text-slate-600 space-y-1">
                        <li>✅ Cross-factory analytics</li>
                        <li>✅ Advanced reporting</li>
                        <li>✅ Standards management</li>
                        <li>✅ Performance benchmarking</li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Active Users</CardTitle>
                  <CardDescription>Currently active users across all factories</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                      <div>
                        <p className="font-medium text-green-800">42 Active Users</p>
                        <p className="text-sm text-green-700">Across 2 factories</p>
                      </div>
                      <div className="text-right text-sm text-green-600">
                        <p>Mumbai: 28</p>
                        <p>Chennai: 14</p>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-3 text-sm">
                      <div className="p-2 border rounded">
                        <p className="font-medium">Operators: 24</p>
                        <p className="text-slate-600">Data entry access</p>
                      </div>
                      <div className="p-2 border rounded">
                        <p className="font-medium">Supervisors: 8</p>
                        <p className="text-slate-600">Approval rights</p>
                      </div>
                      <div className="p-2 border rounded">
                        <p className="font-medium">Managers: 6</p>
                        <p className="text-slate-600">Analytics access</p>
                      </div>
                      <div className="p-2 border rounded">
                        <p className="font-medium">Admins: 4</p>
                        <p className="text-slate-600">System control</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="targets">
            <Card>
              <CardHeader>
                <CardTitle>Global Performance Targets</CardTitle>
                <CardDescription>Company-wide KPI targets and benchmarks</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="space-y-4">
                    <h4 className="font-medium text-slate-800">OEE Targets</h4>
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <Label>Overall OEE</Label>
                        <div className="flex items-center space-x-2">
                          <Input type="number" defaultValue="85" className="w-16 h-8" />
                          <span className="text-sm text-slate-500">%</span>
                        </div>
                      </div>
                      <div className="flex justify-between items-center">
                        <Label>Availability</Label>
                        <div className="flex items-center space-x-2">
                          <Input type="number" defaultValue="90" className="w-16 h-8" />
                          <span className="text-sm text-slate-500">%</span>
                        </div>
                      </div>
                      <div className="flex justify-between items-center">
                        <Label>Performance</Label>
                        <div className="flex items-center space-x-2">
                          <Input type="number" defaultValue="95" className="w-16 h-8" />
                          <span className="text-sm text-slate-500">%</span>
                        </div>
                      </div>
                      <div className="flex justify-between items-center">
                        <Label>Quality</Label>
                        <div className="flex items-center space-x-2">
                          <Input type="number" defaultValue="98" className="w-16 h-8" />
                          <span className="text-sm text-slate-500">%</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h4 className="font-medium text-slate-800">Production Targets</h4>
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <Label>Daily Output</Label>
                        <div className="flex items-center space-x-2">
                          <Input type="number" defaultValue="50000" className="w-20 h-8" />
                          <span className="text-sm text-slate-500">units</span>
                        </div>
                      </div>
                      <div className="flex justify-between items-center">
                        <Label>Defect Rate</Label>
                        <div className="flex items-center space-x-2">
                          <Input type="number" defaultValue="2" className="w-16 h-8" />
                          <span className="text-sm text-slate-500">%</span>
                        </div>
                      </div>
                      <div className="flex justify-between items-center">
                        <Label>On-time Delivery</Label>
                        <div className="flex items-center space-x-2">
                          <Input type="number" defaultValue="95" className="w-16 h-8" />
                          <span className="text-sm text-slate-500">%</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h4 className="font-medium text-slate-800">Cost Targets</h4>
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <Label>Cost per Unit</Label>
                        <div className="flex items-center space-x-2">
                          <Input type="number" defaultValue="12.50" className="w-20 h-8" />
                          <span className="text-sm text-slate-500">₹</span>
                        </div>
                      </div>
                      <div className="flex justify-between items-center">
                        <Label>Energy Cost</Label>
                        <div className="flex items-center space-x-2">
                          <Input type="number" defaultValue="1.20" className="w-16 h-8" />
                          <span className="text-sm text-slate-500">₹/unit</span>
                        </div>
                      </div>
                      <div className="flex justify-between items-center">
                        <Label>Labor Cost</Label>
                        <div className="flex items-center space-x-2">
                          <Input type="number" defaultValue="2.80" className="w-16 h-8" />
                          <span className="text-sm text-slate-500">₹/unit</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="mt-6 flex justify-end space-x-2">
                  <Button variant="outline">Reset to Defaults</Button>
                  <Button>Save Global Targets</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="system">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>System Settings</CardTitle>
                  <CardDescription>Global system configuration and preferences</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <Label>Default Language</Label>
                      <Select defaultValue="en">
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="en">English</SelectItem>
                          <SelectItem value="hi">हिंदी (Hindi)</SelectItem>
                          <SelectItem value="ta">தமிழ் (Tamil)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label>Default Currency</Label>
                      <Select defaultValue="inr">
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="inr">INR (₹)</SelectItem>
                          <SelectItem value="usd">USD ($)</SelectItem>
                          <SelectItem value="eur">EUR (€)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label>Data Retention Period</Label>
                      <Select defaultValue="2years">
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="1year">1 Year</SelectItem>
                          <SelectItem value="2years">2 Years</SelectItem>
                          <SelectItem value="5years">5 Years</SelectItem>
                          <SelectItem value="unlimited">Unlimited</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Backup & Security</CardTitle>
                  <CardDescription>Data backup and security settings</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="p-3 bg-green-50 rounded-lg border border-green-200">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium text-green-800">Auto Backup</p>
                          <p className="text-sm text-green-700">Daily at 2:00 AM</p>
                        </div>
                        <Badge variant="outline" className="bg-green-100 text-green-700">
                          Active
                        </Badge>
                      </div>
                    </div>
                    <div className="p-3 bg-blue-50 rounded-lg border border-blue-200">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium text-blue-800">Data Encryption</p>
                          <p className="text-sm text-blue-700">AES-256 encryption</p>
                        </div>
                        <Badge variant="outline" className="bg-blue-100 text-blue-700">
                          Enabled
                        </Badge>
                      </div>
                    </div>
                    <div className="p-3 bg-purple-50 rounded-lg border border-purple-200">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium text-purple-800">Audit Logging</p>
                          <p className="text-sm text-purple-700">All user actions logged</p>
                        </div>
                        <Badge variant="outline" className="bg-purple-100 text-purple-700">
                          Active
                        </Badge>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="integration">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>ERP Integration</CardTitle>
                  <CardDescription>SAP and other ERP system connections</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="p-4 border rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-medium">SAP ECC 6.0</h4>
                        <Badge variant="outline" className="bg-green-50 text-green-700">
                          Connected
                        </Badge>
                      </div>
                      <p className="text-sm text-slate-600 mb-2">
                        Production orders, material master, equipment master
                      </p>
                      <div className="text-xs text-slate-500">
                        <p>Last sync: 5 minutes ago</p>
                        <p>Server: sap-prod.indusflow.com</p>
                      </div>
                    </div>
                    <div className="p-4 border rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-medium">Oracle WMS</h4>
                        <Badge variant="outline" className="bg-yellow-50 text-yellow-700">
                          Pending
                        </Badge>
                      </div>
                      <p className="text-sm text-slate-600 mb-2">Warehouse management and inventory data</p>
                      <Button variant="outline" size="sm">
                        Configure Connection
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>IoT & SCADA</CardTitle>
                  <CardDescription>Industrial automation system connections</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="p-4 border rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-medium">Wonderware SCADA</h4>
                        <Badge variant="outline" className="bg-green-50 text-green-700">
                          Active
                        </Badge>
                      </div>
                      <p className="text-sm text-slate-600 mb-2">Real-time equipment data and alarms</p>
                      <div className="text-xs text-slate-500">
                        <p>Data points: 1,247 active</p>
                        <p>Update frequency: 5 seconds</p>
                      </div>
                    </div>
                    <div className="p-4 border rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-medium">OPC UA Gateway</h4>
                        <Badge variant="outline" className="bg-green-50 text-green-700">
                          Connected
                        </Badge>
                      </div>
                      <p className="text-sm text-slate-600 mb-2">Equipment communication protocol</p>
                      <div className="text-xs text-slate-500">
                        <p>Connected devices: 43</p>
                        <p>Protocol version: 1.04</p>
                      </div>
                    </div>
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
