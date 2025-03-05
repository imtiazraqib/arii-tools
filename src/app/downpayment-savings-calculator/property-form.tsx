"use client";

import { useState, forwardRef, useImperativeHandle } from "react";
import { HelpCircle } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { formatCurrency } from "@/lib/utils";
import type { CalculatorData } from "./down-payment-calculator";

interface PropertyFormProps {
  data: CalculatorData;
  onSubmit: (data: Partial<CalculatorData>) => void;
}

export const PropertyForm = forwardRef<{ clear: () => void }, PropertyFormProps>(({ data, onSubmit }, ref) => {
  const [price, setPrice] = useState(data.propertyPrice.toString());
  const [downPaymentPercent, setDownPaymentPercent] = useState(data.downPaymentPercent.toString());

  const handlePriceChange = (value: string) => {
    setPrice(value);
    const numValue = Number.parseFloat(value.replace(/,/g, "")) || 0;
    onSubmit({ propertyPrice: numValue });
  };

  const handlePercentChange = (value: string) => {
    setDownPaymentPercent(value);
    const numValue = Number.parseFloat(value) || 0;
    onSubmit({ downPaymentPercent: numValue });
  };

  const clear = () => {
    setPrice("400000");
    setDownPaymentPercent("20");
  };

  useImperativeHandle(ref, () => ({
    clear,
  }));

  const downPaymentOptions = [5, 10, 15, 20];

  return (
    <div className="space-y-6">
      <div>
        <div className="flex items-center justify-between mb-2">
          <Label htmlFor="price" className="text-base font-medium">
            Asking price
          </Label>
        </div>
        <Input
          id="price"
          type="text"
          value={price}
          onChange={(e) => handlePriceChange(e.target.value)}
          className="text-lg"
        />
      </div>

      <Separator />

      <div>
        <div className="flex items-center gap-2 mb-4">
          <Label htmlFor="downPayment" className="text-base font-medium">
            Down payment
          </Label>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" size="icon" className="h-6 w-6">
                  <HelpCircle className="h-4 w-4" />
                  <span className="sr-only">Down payment info</span>
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p className="max-w-xs">
                  In Canada, the minimum down payment is 5% for homes under $500,000, and 10% for the portion above
                  $500,000. For homes over $1 million, the minimum is 20%.
                </p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {downPaymentOptions.map((percent) => (
            <div key={percent} className="space-y-2">
              <Button
                variant={downPaymentPercent === percent.toString() ? "default" : "outline"}
                className="w-full"
                onClick={() => handlePercentChange(percent.toString())}>
                {percent}%
              </Button>
              <div className="text-center">{formatCurrency((data.propertyPrice * percent) / 100)}</div>
            </div>
          ))}
        </div>

        <div className="mt-4 grid grid-cols-2 gap-4 items-center">
          <div>
            <Label htmlFor="customPercent" className="text-sm">
              Custom percentage
            </Label>
            <div className="flex items-center">
              <Input
                id="customPercent"
                type="number"
                min="1"
                max="100"
                value={downPaymentPercent}
                onChange={(e) => handlePercentChange(e.target.value)}
                className="text-right"
              />
              <span className="ml-2">%</span>
            </div>
          </div>
          <div>
            <Label htmlFor="downPaymentAmount" className="text-sm">
              Amount
            </Label>
            <div className="text-lg font-medium">{formatCurrency(data.downPaymentAmount)}</div>
          </div>
        </div>
      </div>
    </div>
  );
});

PropertyForm.displayName = "PropertyForm";
