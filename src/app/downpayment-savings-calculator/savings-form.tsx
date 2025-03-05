"use client";

import type React from "react";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import type { CalculatorData } from "./down-payment-calculator";

interface SavingsFormProps {
  data: CalculatorData;
  onSubmit: (data: Partial<CalculatorData>) => void;
  onClear?: () => void;
}

export function SavingsForm({ data, onSubmit, onClear }: SavingsFormProps) {
  const [savingYears, setSavingYears] = useState(data.savingYears.toString());
  const [interestRate, setInterestRate] = useState(data.interestRate.toString());
  const [accountType, setAccountType] = useState(data.accountType);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      savingYears: Number.parseFloat(savingYears) || 0,
      interestRate: Number.parseFloat(interestRate) || 0,
      accountType,
    });
  };

  const handleClear = () => {
    setSavingYears("5");
    setInterestRate("3");
    setAccountType("HISA");
    if (onClear) {
      onClear();
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <Separator />

      <div className="space-y-4">
        <h3 className="text-lg font-medium">Savings Plan</h3>

        <div>
          <Label htmlFor="savingYears" className="text-base">
            How many years do you want to save?
          </Label>
          <Input
            id="savingYears"
            type="number"
            min="1"
            max="30"
            value={savingYears}
            onChange={(e) => setSavingYears(e.target.value)}
            className="mt-1"
          />
        </div>

        <div>
          <Label htmlFor="accountType" className="text-base">
            Where will you save your money?
          </Label>
          <Select value={accountType} onValueChange={setAccountType}>
            <SelectTrigger id="accountType" className="mt-1">
              <SelectValue placeholder="Select account type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="HISA">High Interest Savings Account</SelectItem>
              <SelectItem value="TFSA">Tax-Free Savings Account (TFSA)</SelectItem>
              <SelectItem value="RRSP">Registered Retirement Savings Plan (RRSP)</SelectItem>
              <SelectItem value="FHSA">First Home Savings Account (FHSA)</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label htmlFor="interestRate" className="text-base">
            Expected annual return (%)
          </Label>
          <div className="flex items-center mt-1">
            <Input
              id="interestRate"
              type="number"
              min="0"
              max="20"
              step="0.1"
              value={interestRate}
              onChange={(e) => setInterestRate(e.target.value)}
            />
            <span className="ml-2">%</span>
          </div>
        </div>
      </div>

      <div className="flex justify-between gap-4">
        <Button type="submit" className="flex-1">
          Calculate
        </Button>
        <Button type="button" variant="outline" className="flex-1" onClick={handleClear}>
          Clear
        </Button>
      </div>
    </form>
  );
}
