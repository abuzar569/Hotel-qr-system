"use client"

import type React from "react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import type { RestaurantSettings } from "@/lib/types"
import { useToast } from "@/hooks/use-toast"

interface SettingsManagementProps {
  settings: RestaurantSettings
  setSettings: React.Dispatch<React.SetStateAction<RestaurantSettings>>
}

export function SettingsManagement({ settings, setSettings }: SettingsManagementProps) {
  const { toast } = useToast()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setSettings((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSave = () => {
    // In a real app, this would be an API call
    toast({
      title: "Settings saved",
      description: "Your restaurant settings have been updated",
    })
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Restaurant Settings</CardTitle>
        <CardDescription>Customize the appearance of your menu</CardDescription>
      </CardHeader>

      <CardContent className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="menuTitle">Menu Title</Label>
          <Input
            id="menuTitle"
            name="menuTitle"
            value={settings.menuTitle}
            onChange={handleChange}
            placeholder="Our Menu"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="space-y-2">
            <Label htmlFor="backgroundColor">Background Color</Label>
            <div className="flex space-x-2">
              <Input
                id="backgroundColor"
                name="backgroundColor"
                value={settings.backgroundColor}
                onChange={handleChange}
                placeholder="#ffffff"
              />
              <div className="w-10 h-10 rounded border" style={{ backgroundColor: settings.backgroundColor }} />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="titleColor">Title Color</Label>
            <div className="flex space-x-2">
              <Input
                id="titleColor"
                name="titleColor"
                value={settings.titleColor}
                onChange={handleChange}
                placeholder="#000000"
              />
              <div className="w-10 h-10 rounded border" style={{ backgroundColor: settings.titleColor }} />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="fontColor">Font Color</Label>
            <div className="flex space-x-2">
              <Input
                id="fontColor"
                name="fontColor"
                value={settings.fontColor}
                onChange={handleChange}
                placeholder="#333333"
              />
              <div className="w-10 h-10 rounded border" style={{ backgroundColor: settings.fontColor }} />
            </div>
          </div>
        </div>

        <div className="p-4 border rounded-md">
          <h3 className="font-medium mb-2">Preview</h3>
          <div
            className="p-4 rounded-md"
            style={{
              backgroundColor: settings.backgroundColor,
              color: settings.fontColor,
            }}
          >
            <h2 className="text-xl font-bold mb-2" style={{ color: settings.titleColor }}>
              {settings.menuTitle}
            </h2>
            <p>This is how your menu will appear to customers.</p>
          </div>
        </div>
      </CardContent>

      <CardFooter>
        <Button onClick={handleSave}>Save Settings</Button>
      </CardFooter>
    </Card>
  )
}
