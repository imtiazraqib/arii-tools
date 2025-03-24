"use client";

import { Suspense, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { Calculator, HomeIcon } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import CalculateForm from "./CalculatorForm";
import ResultsView from "./ResultsView";

export interface RenovationOption {
  name: string;
  costPerSqFt: number;
  roi: number;
}

export interface SelectedRenovation {
  renovation: RenovationOption;
  area: number;
  cost: number;
  valueIncrease: number;
}

export interface CalculationResult {
  homeValue: number;
  cityAssessedValue: number;
  selectedRenovations: SelectedRenovation[];
  totalCost: number;
  totalValueIncrease: number;
  newEstimatedHomeValue: number;
  userInfo: {
    name: string;
    email: string;
    phone: string;
  };
}

export default function Home() {
  const searchParams = useSearchParams();
  const [activeTab, setActiveTab] = useState("calculate");
  const [email, setEmail] = useState("");
  const [locationId, setLocationId] = useState("");
  const [calculationResult, setCalculationResult] = useState<CalculationResult | null>(null);

  useEffect(() => {
    const emailParam = searchParams.get("email");
    const locationIdParam = searchParams.get("locationID");

    if (emailParam) setEmail(emailParam);
    if (locationIdParam) setLocationId(locationIdParam);
  }, [searchParams]);

  const handleCalculate = (result: CalculationResult) => {
    setCalculationResult(result);
    setActiveTab("results");
  };

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <main className="min-h-screen p-4 md:p-6 lg:p-8">
        <div className="max-w-5xl mx-auto space-y-6">
          <h1 className="text-3xl font-bold text-center">Renovation ROI Calculator</h1>
        </div>

        <Card className="max-w-4xl mx-auto mt-10">
          <CardHeader>
            <CardDescription>Calculate the return on investment for your home renovation projects</CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="grid w-full grid-cols-2 mb-6">
                <TabsTrigger value="calculate">
                  <Calculator className="mr-2 h-4 w-4" />
                  Calculate
                </TabsTrigger>
                <TabsTrigger value="results" disabled={!calculationResult}>
                  <HomeIcon className="mr-2 h-4 w-4" />
                  Results
                </TabsTrigger>
              </TabsList>
              <TabsContent value="calculate">
                <CalculateForm onCalculate={handleCalculate} initialEmail={email} locationId={locationId} />
              </TabsContent>
              <TabsContent value="results">
                {calculationResult && <ResultsView result={calculationResult} />}
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </main>
    </Suspense>
  );
}
