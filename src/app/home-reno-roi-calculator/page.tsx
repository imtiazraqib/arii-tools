"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { Calculator, HomeIcon } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
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
    message: string;
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
    <main className="container mx-auto py-10 px-4">
      <Card className="max-w-4xl mx-auto">
        <CardHeader>
          <CardTitle className="text-2xl font-bold">Renovation ROI Calculator</CardTitle>
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
            <TabsContent value="results">{calculationResult && <ResultsView result={calculationResult} />}</TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </main>
  );
}
