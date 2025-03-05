"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { formatCurrency } from "@/lib/utils";
import type { CalculatorData } from "./down-payment-calculator";
import { PiggyBank, TrendingUp, Calendar } from "lucide-react";

interface ResultsDisplayProps {
  data: CalculatorData;
  calculated: boolean;
}

export function ResultsDisplay({ data, calculated }: ResultsDisplayProps) {
  if (!calculated) {
    return (
      <div className="py-12 text-center">
        <h3 className="text-lg font-medium text-gray-500">
          Fill out the calculator form and click Calculate to see your results
        </h3>
      </div>
    );
  }

  // Calculate monthly savings needed
  const monthlyWithoutInterest = data.downPaymentAmount / (data.savingYears * 12);

  // Calculate monthly savings with compound interest
  // Using the formula: PMT = FV * r / ((1 + r)^n - 1)
  // Where FV is future value, r is monthly interest rate, n is number of months
  const monthlyRate = data.interestRate / 100 / 12;
  const months = data.savingYears * 12;

  let monthlyWithInterest = monthlyWithoutInterest;

  if (data.interestRate > 0) {
    monthlyWithInterest = (data.downPaymentAmount * monthlyRate) / (Math.pow(1 + monthlyRate, months) - 1);
  }

  // Calculate total contributions
  const totalContributions = monthlyWithInterest * months;

  // Calculate interest earned
  const interestEarned = data.downPaymentAmount - totalContributions;

  // Calculate percentage breakdown
  const contributionPercent = (totalContributions / data.downPaymentAmount) * 100;
  const interestPercent = (interestEarned / data.downPaymentAmount) * 100;

  return (
    <div className="space-y-6 py-4">
      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Down Payment Goal</CardTitle>
            <CardDescription>
              {data.downPaymentPercent}% of ${data.propertyPrice.toLocaleString()}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{formatCurrency(data.downPaymentAmount)}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Monthly Savings Needed</CardTitle>
            <CardDescription>
              Over {data.savingYears} {data.savingYears === 1 ? "year" : "years"} with {data.interestRate}% return
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{formatCurrency(monthlyWithInterest)}</div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Savings Breakdown</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Your contributions</span>
              <span>{formatCurrency(totalContributions)}</span>
            </div>
            <Progress value={contributionPercent} className="h-2" />
          </div>

          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Interest earned</span>
              <span>{formatCurrency(interestEarned)}</span>
            </div>
            <Progress value={interestPercent} className="h-2" />
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <PiggyBank className="h-5 w-5 text-gray-500" />
              <div>
                <p className="text-sm text-gray-500">Total savings</p>
                <p className="font-medium">{formatCurrency(totalContributions)}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <TrendingUp className="h-5 w-5 text-gray-500" />
              <div>
                <p className="text-sm text-gray-500">Interest earned</p>
                <p className="font-medium">{formatCurrency(interestEarned)}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <Calendar className="h-5 w-5 text-gray-500" />
              <div>
                <p className="text-sm text-gray-500">Time to save</p>
                <p className="font-medium">
                  {data.savingYears} {data.savingYears === 1 ? "year" : "years"}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
