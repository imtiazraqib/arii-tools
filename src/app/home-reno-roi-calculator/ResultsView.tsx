import { Button } from "@/components/ui/button";
import type { CalculationResult } from "./page";
import { ArrowLeft, Download, Share2 } from "lucide-react";

interface ResultsViewProps {
  result: CalculationResult;
}

export default function ResultsView({ result }: ResultsViewProps) {
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("en-CA", {
      style: "currency",
      currency: "CAD",
      maximumFractionDigits: 0,
    }).format(value);
  };

  return (
    <div className="space-y-6">
      <div className="bg-gray-100 p-6 rounded-lg">
        <h2 className="text-xl font-bold mb-4">Estimated ROI</h2>

        <div className="space-y-3">
          <div className="flex justify-between">
            <span className="font-medium">Total Cost:</span>
            <span>{formatCurrency(result.totalCost)}</span>
          </div>

          <div className="flex justify-between">
            <span className="font-medium">Potential Value Increase:</span>
            <span>{formatCurrency(result.totalValueIncrease)}</span>
          </div>

          <div className="flex justify-between border-t pt-2 mt-2">
            <span className="font-medium">New Estimated Home Value:</span>
            <span className="font-bold">{formatCurrency(result.newEstimatedHomeValue)}</span>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-medium">Property Details</h3>

        <div className="grid gap-3">
          <div className="flex justify-between">
            <span>Home Value:</span>
            <span>{formatCurrency(result.homeValue)}</span>
          </div>

          <div className="flex justify-between">
            <span>City Assessed Value:</span>
            <span>{formatCurrency(result.cityAssessedValue)}</span>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-medium">Selected Renovations</h3>

        {result.selectedRenovations.map((item, index) => (
          <div key={index} className="border rounded-md p-4 bg-slate-100">
            <h4 className="font-medium mb-2">{item.renovation.name}</h4>
            <div className="grid gap-2 text-sm">
              <div className="flex justify-between">
                <span>Area:</span>
                <span>{item.area} sq ft</span>
              </div>
              <div className="flex justify-between">
                <span>Cost per Square Foot:</span>
                <span>${item.renovation.costPerSqFt}</span>
              </div>
              <div className="flex justify-between">
                <span>ROI Percentage:</span>
                <span>{item.renovation.roi * 100}%</span>
              </div>
              <div className="flex justify-between font-medium">
                <span>Total Cost:</span>
                <span>{formatCurrency(item.cost)}</span>
              </div>
              <div className="flex justify-between font-medium">
                <span>Value Increase:</span>
                <span>{formatCurrency(item.valueIncrease)}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-medium">Contact Information</h3>

        <div className="grid gap-3">
          <div className="flex space-x-2">
            <span>Name:</span>
            <span>{result.userInfo.name}</span>
          </div>

          <div className="flex space-x-2">
            <span>Email:</span>
            <span>{result.userInfo.email}</span>
          </div>

          <div className="flex space-x-2">
            <span>Phone:</span>
            <span>{result.userInfo.phone}</span>
          </div>
        </div>
      </div>

      {/* <div className="flex flex-col sm:flex-row gap-3 pt-4">
        <Button variant="outline" className="flex-1">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Calculator
        </Button>
        <Button variant="outline" className="flex-1">
          <Download className="mr-2 h-4 w-4" />
          Download Report
        </Button>
        <Button variant="outline" className="flex-1">
          <Share2 className="mr-2 h-4 w-4" />
          Share Results
        </Button>
      </div> */}
    </div>
  );
}
