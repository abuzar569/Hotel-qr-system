"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Download } from "lucide-react"
import QRCode from "qrcode.react"

export function QrCodeGenerator() {
  const [tableNumber, setTableNumber] = useState("1")
  const [baseUrl, setBaseUrl] = useState("https://restaurant-qr-menu.vercel.app/table/")

  const qrValue = `${baseUrl}${tableNumber}`

  const downloadQRCode = () => {
    const canvas = document.getElementById("qr-code") as HTMLCanvasElement
    if (!canvas) return

    const url = canvas.toDataURL("image/png")
    const link = document.createElement("a")
    link.href = url
    link.download = `table-${tableNumber}-qrcode.png`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>QR Code Generator</CardTitle>
        <CardDescription>Generate QR codes for your restaurant tables</CardDescription>
      </CardHeader>

      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="baseUrl">Base URL</Label>
              <Input
                id="baseUrl"
                value={baseUrl}
                onChange={(e) => setBaseUrl(e.target.value)}
                placeholder="https://your-domain.com/table/"
              />
              <p className="text-xs text-muted-foreground">This should be the base URL of your deployed application</p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="tableNumber">Table Number</Label>
              <Input
                id="tableNumber"
                type="number"
                min="1"
                value={tableNumber}
                onChange={(e) => setTableNumber(e.target.value)}
              />
            </div>

            <div className="pt-4">
              <p className="text-sm font-medium mb-1">QR Code URL:</p>
              <p className="text-sm break-all bg-muted p-2 rounded">{qrValue}</p>
            </div>
          </div>

          <div className="flex flex-col items-center justify-center">
            <div className="bg-white p-4 rounded-md shadow-sm mb-4">
              <QRCode id="qr-code" value={qrValue} size={200} level="H" includeMargin />
            </div>

            <Button onClick={downloadQRCode}>
              <Download className="mr-2 h-4 w-4" />
              Download QR Code
            </Button>
          </div>
        </div>
      </CardContent>

      <CardFooter className="flex flex-col items-start">
        <h3 className="text-sm font-medium mb-2">Instructions:</h3>
        <ol className="text-sm text-muted-foreground list-decimal pl-4 space-y-1">
          <li>Enter your deployed application URL as the base URL</li>
          <li>Set the table number</li>
          <li>Download the generated QR code</li>
          <li>Print and place the QR code on the corresponding table</li>
          <li>Customers can scan the QR code to access the menu and place orders</li>
        </ol>
      </CardFooter>
    </Card>
  )
}
