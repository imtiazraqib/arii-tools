"use client";

import { useState, useEffect, useRef } from "react";
import { Calculator, Clock } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PropertyForm } from "./property-form";
import { SavingsForm } from "./savings-form";
import { ResultsDisplay } from "./results-display";

export type CalculatorData = {
  propertyPrice: number;
  downPaymentPercent: number;
  downPaymentAmount: number;
  savingYears: number;
  interestRate: number;
  accountType: string;
};

export function DownPaymentCalculator() {
  const [calculatorData, setCalculatorData] = useState<CalculatorData>({
    propertyPrice: 400000,
    downPaymentPercent: 20,
    downPaymentAmount: 80000,
    savingYears: 5,
    interestRate: 3,
    accountType: "HISA",
  });

  const [calculated, setCalculated] = useState(false);
  const [activeTab, setActiveTab] = useState("calculator");

  const propertyFormRef = useRef<{ clear: () => void }>(null);

  useEffect(() => {
    // Update down payment amount when price or percentage changes
    const amount = (calculatorData.propertyPrice * calculatorData.downPaymentPercent) / 100;
    setCalculatorData((prev) => ({
      ...prev,
      downPaymentAmount: amount,
    }));
  }, [calculatorData.propertyPrice, calculatorData.downPaymentPercent]);

  const handlePropertyFormSubmit = (data: Partial<CalculatorData>) => {
    setCalculatorData((prev) => ({
      ...prev,
      ...data,
    }));
  };

  const handleSavingsFormSubmit = (data: Partial<CalculatorData>) => {
    setCalculatorData((prev) => ({
      ...prev,
      ...data,
    }));
    setCalculated(true);
    setActiveTab("results");
  };

  const handleClear = () => {
    setCalculatorData({
      propertyPrice: 400000,
      downPaymentPercent: 20,
      downPaymentAmount: 80000,
      savingYears: 5,
      interestRate: 3,
      accountType: "HISA",
    });
    setCalculated(false);
    if (propertyFormRef.current) {
      propertyFormRef.current.clear();
    }
  };

  return (
    <Card className="shadow-md">
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="calculator" className="flex items-center gap-2">
            <Calculator className="h-4 w-4" />
            <span>Calculator</span>
          </TabsTrigger>
          <TabsTrigger value="results" className="flex items-center gap-2" disabled={!calculated}>
            <Clock className="h-4 w-4" />
            <span>Results</span>
          </TabsTrigger>
        </TabsList>
        <CardContent className="p-6">
          <TabsContent value="calculator" className="mt-0 space-y-8">
            <PropertyForm ref={propertyFormRef} data={calculatorData} onSubmit={handlePropertyFormSubmit} />
            <SavingsForm data={calculatorData} onSubmit={handleSavingsFormSubmit} onClear={handleClear} />
          </TabsContent>
          <TabsContent value="results" className="mt-0">
            <ResultsDisplay data={calculatorData} calculated={calculated} />
          </TabsContent>
        </CardContent>
      </Tabs>
    </Card>
  );
}
