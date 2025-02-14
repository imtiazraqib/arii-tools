"use client";

import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card } from "@/components/ui/card";
import CalculatorForm from "./CalculatorForm";
import ResultsView from "./ResultsView";

export interface CalculationResult {
  totalIncome: number;
  totalDebts: number;
  ratio: number;
}

export default function DebtCalculator() {
  const [result, setResult] = useState<CalculationResult | null>(null);
  const [activeTab, setActiveTab] = useState("calculator");

  const handleCalculate = (income: number, debt: number) => {
    const ratio = (debt / income) * 100;
    setResult({
      totalIncome: income,
      totalDebts: debt,
      ratio: Number(ratio.toFixed(2)),
    });
    setActiveTab("results");
  };

  return (
    <Card className="p-6">
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-2 mb-6">
          <TabsTrigger value="calculator">Calculator</TabsTrigger>
          <TabsTrigger value="results">Results</TabsTrigger>
        </TabsList>
        <TabsContent value="calculator">
          <CalculatorForm onCalculate={handleCalculate} />
        </TabsContent>
        <TabsContent value="results">
          <ResultsView result={result} />
        </TabsContent>
      </Tabs>
    </Card>
  );
}
