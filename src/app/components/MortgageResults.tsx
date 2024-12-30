"use client";

import { CardContent } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { PieChart } from "./PieChart";

interface MortgageResultsProps {
  results: {
    monthlyPayment: number;
    propertyTax: number;
    homeInsurance: number;
    otherCosts: number;
    totalMonthly: number;
    loanAmount: number;
    downPayment: number;
    totalPayments: number;
    totalInterest: number;
    payoffDate: string;
  };
  homePrice: number;
}

export function MortgageResults({ results, homePrice }: MortgageResultsProps) {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const chartData = [
    {
      name: "Principal & Interest",
      value: results.monthlyPayment,
      color: "hsl(307, 50%, 40%)",
    },
    {
      name: "Property Taxes",
      value: results.propertyTax,
      color: "hsl(252, 74%, 9%)",
    },
    {
      name: "Home Insurance",
      value: results.homeInsurance,
      color: "hsl(17, 95%, 74%)",
    },
    {
      name: "Other Cost",
      value: results.otherCosts,
      color: "hsl(347, 62%, 62%)",
    },
  ];

  return (
    <CardContent className="p-6 space-y-6">
      <div className="text-center space-y-1.5">
        <h2 className="text-2xl font-semibold">Monthly Payment</h2>
        <p className="text-4xl font-bold text-primary">{formatCurrency(results.totalMonthly)}</p>
      </div>

      <div className="space-y-6">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Breakdown</TableHead>
              <TableHead className="text-right">Monthly</TableHead>
              <TableHead className="text-right hidden sm:table-cell">Total</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell>Mortgage Payment</TableCell>
              <TableCell className="text-right">{formatCurrency(results.monthlyPayment)}</TableCell>
              <TableCell className="text-right hidden sm:table-cell">{formatCurrency(results.totalPayments)}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Property Tax</TableCell>
              <TableCell className="text-right">{formatCurrency(results.propertyTax)}</TableCell>
              <TableCell className="text-right hidden sm:table-cell">
                {formatCurrency(results.propertyTax * 360)}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Home Insurance</TableCell>
              <TableCell className="text-right">{formatCurrency(results.homeInsurance)}</TableCell>
              <TableCell className="text-right hidden sm:table-cell">
                {formatCurrency(results.homeInsurance * 360)}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Other Costs</TableCell>
              <TableCell className="text-right">{formatCurrency(results.otherCosts)}</TableCell>
              <TableCell className="text-right hidden sm:table-cell">
                {formatCurrency(results.otherCosts * 360)}
              </TableCell>
            </TableRow>
            <TableRow className="font-medium">
              <TableCell>Total Out-of-Pocket</TableCell>
              <TableCell className="text-right">{formatCurrency(results.totalMonthly)}</TableCell>
              <TableCell className="text-right hidden sm:table-cell">
                {formatCurrency(
                  results.totalPayments + (results.propertyTax + results.homeInsurance + results.otherCosts) * 360
                )}
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="order-2 md:order-1">
            <Table>
              <TableBody>
                <TableRow>
                  <TableCell>House Price</TableCell>
                  <TableCell className="text-right">{formatCurrency(homePrice)}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Loan Amount</TableCell>
                  <TableCell className="text-right">{formatCurrency(results.loanAmount)}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Down Payment</TableCell>
                  <TableCell className="text-right">{formatCurrency(results.downPayment)}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Total Mortgage Payments</TableCell>
                  <TableCell className="text-right">{formatCurrency(results.totalPayments)}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Total Interest</TableCell>
                  <TableCell className="text-right">{formatCurrency(results.totalInterest)}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Payoff Date</TableCell>
                  <TableCell className="text-right">{results.payoffDate}</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>
          <div className="order-1 md:order-2">
            <PieChart data={chartData} />
          </div>
        </div>
      </div>
    </CardContent>
  );
}
