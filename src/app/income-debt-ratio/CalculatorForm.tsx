"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { HelpCircle, X } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

interface Entry {
  id: string;
  type: string;
  amount: string;
}

interface CalculatorFormProps {
  onCalculate: (income: number, debt: number) => void;
}

export default function CalculatorForm({ onCalculate }: CalculatorFormProps) {
  const [incomeEntries, setIncomeEntries] = useState<Entry[]>([{ id: "1", type: "", amount: "" }]);
  const [debtEntries, setDebtEntries] = useState<Entry[]>([{ id: "1", type: "", amount: "" }]);

  const addIncomeEntry = () => {
    setIncomeEntries([...incomeEntries, { id: Math.random().toString(), type: "", amount: "" }]);
  };

  const addDebtEntry = () => {
    setDebtEntries([...debtEntries, { id: Math.random().toString(), type: "", amount: "" }]);
  };

  const removeIncomeEntry = (id: string) => {
    if (incomeEntries.length > 1) {
      setIncomeEntries(incomeEntries.filter((entry) => entry.id !== id));
    }
  };

  const removeDebtEntry = (id: string) => {
    if (debtEntries.length > 1) {
      setDebtEntries(debtEntries.filter((entry) => entry.id !== id));
    }
  };

  const updateIncomeEntry = (id: string, field: "type" | "amount", value: string) => {
    setIncomeEntries(incomeEntries.map((entry) => (entry.id === id ? { ...entry, [field]: value } : entry)));
  };

  const updateDebtEntry = (id: string, field: "type" | "amount", value: string) => {
    setDebtEntries(debtEntries.map((entry) => (entry.id === id ? { ...entry, [field]: value } : entry)));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const totalIncome = incomeEntries.reduce((sum, entry) => sum + (Number(entry.amount) || 0), 0);
    const totalDebt = debtEntries.reduce((sum, entry) => sum + (Number(entry.amount) || 0), 0);
    onCalculate(totalIncome, totalDebt);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <Label className="text-lg font-semibold">Monthly Income</Label>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <HelpCircle className="h-4 w-4 text-muted-foreground cursor-help" />
              </TooltipTrigger>
              <TooltipContent>
                <p>Enter all sources of monthly income, such as salary, wages, investments, etc.</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>

        {incomeEntries.map((entry) => (
          <div key={entry.id} className="grid grid-cols-[1fr,1fr,auto] gap-4 items-center">
            <Select value={entry.type} onValueChange={(value) => updateIncomeEntry(entry.id, "type", value)}>
              <SelectTrigger>
                <SelectValue placeholder="Your Monthly Income" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="salary">Salary</SelectItem>
                <SelectItem value="wages">Wages</SelectItem>
                <SelectItem value="business">Business Income</SelectItem>
                <SelectItem value="investments">Investment Income</SelectItem>
                <SelectItem value="other">Other Income</SelectItem>
              </SelectContent>
            </Select>
            <Input
              type="number"
              value={entry.amount}
              onChange={(e) => updateIncomeEntry(entry.id, "amount", e.target.value)}
              placeholder="0.00"
              className="text-right"
            />
            {incomeEntries.length > 1 && (
              <Button type="button" variant="ghost" size="icon" onClick={() => removeIncomeEntry(entry.id)}>
                <X className="h-4 w-4" />
              </Button>
            )}
          </div>
        ))}

        <Button type="button" variant="outline" onClick={addIncomeEntry} className="w-full">
          + Add Monthly Income
        </Button>
      </div>

      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <Label className="text-lg font-semibold">Monthly Debt Payments</Label>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <HelpCircle className="h-4 w-4 text-muted-foreground cursor-help" />
              </TooltipTrigger>
              <TooltipContent>
                <p>Include all monthly debt payments like rent, mortgage, car loans, credit cards, etc.</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>

        {debtEntries.map((entry) => (
          <div key={entry.id} className="grid grid-cols-[1fr,1fr,auto] gap-4 items-center">
            <Select value={entry.type} onValueChange={(value) => updateDebtEntry(entry.id, "type", value)}>
              <SelectTrigger>
                <SelectValue placeholder="Rent / Mortgage" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="rent">Rent</SelectItem>
                <SelectItem value="mortgage">Mortgage</SelectItem>
                <SelectItem value="carLoan">Car Loan</SelectItem>
                <SelectItem value="creditCard">Credit Card</SelectItem>
                <SelectItem value="studentLoan">Student Loan</SelectItem>
                <SelectItem value="personalLoan">Personal Loan</SelectItem>
                <SelectItem value="other">Other Debt</SelectItem>
              </SelectContent>
            </Select>
            <Input
              type="number"
              value={entry.amount}
              onChange={(e) => updateDebtEntry(entry.id, "amount", e.target.value)}
              placeholder="0.00"
              className="text-right"
            />
            {debtEntries.length > 1 && (
              <Button type="button" variant="ghost" size="icon" onClick={() => removeDebtEntry(entry.id)}>
                <X className="h-4 w-4" />
              </Button>
            )}
          </div>
        ))}

        <Button type="button" variant="outline" onClick={addDebtEntry} className="w-full">
          + Add Monthly Debt Payments
        </Button>
      </div>

      <Button type="submit" className="w-full">
        Calculate
      </Button>
    </form>
  );
}
