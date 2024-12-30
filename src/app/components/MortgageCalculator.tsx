"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Calculator, PieChartIcon as ChartPieIcon } from "lucide-react";
import { MortgageResults } from "./MortgageResults";

export function MortgageCalculator() {
  const [activeTab, setActiveTab] = useState("calculator");
  const [showAdditionalCosts, setShowAdditionalCosts] = useState(true);
  const [formData, setFormData] = useState({
    homePrice: "400000",
    downPayment: "20",
    loanTerm: "30",
    interestRate: "6.908",
    propertyTax: "1.2",
    homeInsurance: "1500",
    pmiInsurance: "0",
    hoaFee: "0",
    otherCosts: "4000",
  });
  const [results, setResults] = useState<any>(null);

  const calculateMortgage = () => {
    const price = parseFloat(formData.homePrice);
    const down = (parseFloat(formData.downPayment) / 100) * price;
    const principal = price - down;
    const rate = parseFloat(formData.interestRate) / 100 / 12;
    const term = parseFloat(formData.loanTerm) * 12;

    const monthlyPayment = (principal * rate * Math.pow(1 + rate, term)) / (Math.pow(1 + rate, term) - 1);
    const propertyTax = (price * (parseFloat(formData.propertyTax) / 100)) / 12;
    const homeInsurance = parseFloat(formData.homeInsurance) / 12;
    const pmi = parseFloat(formData.pmiInsurance) / 12;
    const hoa = parseFloat(formData.hoaFee) / 12;
    const other = parseFloat(formData.otherCosts) / 12;

    const totalMonthly = monthlyPayment + propertyTax + homeInsurance + pmi + hoa + other;
    const totalPayments = monthlyPayment * term;
    const totalInterest = totalPayments - principal;

    setResults({
      monthlyPayment,
      propertyTax,
      homeInsurance,
      otherCosts: pmi + hoa + other,
      totalMonthly,
      loanAmount: principal,
      downPayment: down,
      totalPayments,
      totalInterest,
      payoffDate: new Date(Date.now() + term * 30 * 24 * 60 * 60 * 1000).toLocaleDateString("en-US", {
        month: "short",
        year: "numeric",
      }),
    });
    setActiveTab("results");
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <Card className="max-w-5xl mx-auto">
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="w-full bg-gray-100">
          <TabsTrigger value="calculator" className="w-full data-[state=active]:bg-white">
            <Calculator className="w-4 h-4 mr-2" />
            Calculator
          </TabsTrigger>
          <TabsTrigger value="results" className="w-full data-[state=active]:bg-white" disabled={!results}>
            <ChartPieIcon className="w-4 h-4 mr-2" />
            Results
          </TabsTrigger>
        </TabsList>

        <TabsContent value="calculator" className="m-0">
          <CardContent className="p-6">
            <div className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="homePrice">Home Price</Label>
                <div className="relative">
                  <span className="absolute left-3 top-2.5">$</span>
                  <Input
                    id="homePrice"
                    type="number"
                    value={formData.homePrice}
                    onChange={(e) => handleInputChange("homePrice", e.target.value)}
                    className="pl-6"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="downPayment">Down Payment</Label>
                <div className="flex gap-2">
                  <Input
                    id="downPayment"
                    type="number"
                    value={formData.downPayment}
                    onChange={(e) => handleInputChange("downPayment", e.target.value)}
                  />
                  <Select defaultValue="%">
                    <SelectTrigger className="w-20">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="%">%</SelectItem>
                      <SelectItem value="$">$</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="loanTerm">Loan Term</Label>
                  <div className="flex gap-2">
                    <Input
                      id="loanTerm"
                      type="number"
                      value={formData.loanTerm}
                      onChange={(e) => handleInputChange("loanTerm", e.target.value)}
                    />
                    <span className="flex items-center">years</span>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="interestRate">Interest Rate</Label>
                  <div className="relative">
                    <Input
                      id="interestRate"
                      type="number"
                      value={formData.interestRate}
                      onChange={(e) => handleInputChange("interestRate", e.target.value)}
                      className="pr-6"
                      step="0.001"
                    />
                    <span className="absolute right-3 top-2.5">%</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <Switch checked={showAdditionalCosts} onCheckedChange={setShowAdditionalCosts} />
                <Label>Include Taxes & Costs Below</Label>
              </div>

              {showAdditionalCosts && (
                <div className="space-y-4 pt-4 border-t">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="propertyTax">Property Taxes</Label>
                      <div className="flex gap-2">
                        <Input
                          id="propertyTax"
                          type="number"
                          value={formData.propertyTax}
                          onChange={(e) => handleInputChange("propertyTax", e.target.value)}
                        />
                        <Select defaultValue="%">
                          <SelectTrigger className="w-20">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="%">%</SelectItem>
                            <SelectItem value="$">$</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="homeInsurance">Home Insurance</Label>
                      <div className="relative">
                        <span className="absolute left-3 top-2.5">$</span>
                        <Input
                          id="homeInsurance"
                          type="number"
                          value={formData.homeInsurance}
                          onChange={(e) => handleInputChange("homeInsurance", e.target.value)}
                          className="pl-6"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="pmiInsurance">PMI Insurance</Label>
                      <div className="relative">
                        <span className="absolute left-3 top-2.5">$</span>
                        <Input
                          id="pmiInsurance"
                          type="number"
                          value={formData.pmiInsurance}
                          onChange={(e) => handleInputChange("pmiInsurance", e.target.value)}
                          className="pl-6"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="hoaFee">HOA Fee</Label>
                      <div className="relative">
                        <span className="absolute left-3 top-2.5">$</span>
                        <Input
                          id="hoaFee"
                          type="number"
                          value={formData.hoaFee}
                          onChange={(e) => handleInputChange("hoaFee", e.target.value)}
                          className="pl-6"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="otherCosts">Other Costs</Label>
                    <div className="relative">
                      <span className="absolute left-3 top-2.5">$</span>
                      <Input
                        id="otherCosts"
                        type="number"
                        value={formData.otherCosts}
                        onChange={(e) => handleInputChange("otherCosts", e.target.value)}
                        className="pl-6"
                      />
                    </div>
                  </div>
                </div>
              )}

              <div className="flex gap-2 pt-4">
                <Button onClick={calculateMortgage} className="flex-1 bg-black text-white hover:bg-gray-800">
                  Calculate
                </Button>
                <Button
                  variant="outline"
                  onClick={() => {
                    setResults(null);
                    setActiveTab("calculator");
                  }}
                  className="flex-1 border-black text-black hover:bg-gray-100">
                  Clear
                </Button>
              </div>
            </div>
          </CardContent>
        </TabsContent>

        <TabsContent value="results" className="m-0">
          {results && <MortgageResults results={results} homePrice={parseFloat(formData.homePrice)} />}
        </TabsContent>
      </Tabs>
    </Card>
  );
}
