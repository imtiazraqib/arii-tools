"use client";

import { useEffect, useRef } from "react";
import type { CalculationResult } from "./DebtCalculator";

interface ResultsViewProps {
  result: CalculationResult | null;
}

export default function ResultsView({ result }: ResultsViewProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!result || !canvasRef.current) return;

    const ctx = canvasRef.current.getContext("2d");
    if (!ctx) return;

    const centerX = 100;
    const centerY = 100;
    const radius = 80;

    // Clear canvas
    ctx.clearRect(0, 0, 200, 200);

    // Draw debt portion (dark gray)
    ctx.beginPath();
    ctx.moveTo(centerX, centerY);
    ctx.arc(centerX, centerY, radius, 0, (Math.PI * 2 * result.ratio) / 100);
    ctx.fillStyle = "#171717";
    ctx.fill();

    // Draw income portion (light gray)
    ctx.beginPath();
    ctx.moveTo(centerX, centerY);
    ctx.arc(centerX, centerY, radius, (Math.PI * 2 * result.ratio) / 100, Math.PI * 2);
    ctx.fillStyle = "#e5e5e5";
    ctx.fill();

    // Draw center circle for donut effect
    ctx.beginPath();
    ctx.arc(centerX, centerY, radius * 0.6, 0, Math.PI * 2);
    ctx.fillStyle = "white";
    ctx.fill();

    // Add ratio text
    ctx.font = "bold 20px Arial";
    ctx.fillStyle = "black";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(`${result.ratio}%`, centerX, centerY);
  }, [result]);

  if (!result) {
    return <div>Please calculate your debt to income ratio first.</div>;
  }

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-bold">Debt To Income Ratio Chart</h2>

      <div className="grid md:grid-cols-2 gap-8 items-center">
        <canvas ref={canvasRef} width="200" height="200" />

        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded-full bg-neutral-200" />
            <span>Total Income</span>
            <span className="ml-auto">${result.totalIncome.toLocaleString()}</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded-full bg-neutral-900" />
            <span>Total Debts</span>
            <span className="ml-auto">${result.totalDebts.toLocaleString()}</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded-full bg-neutral-500" />
            <span>Debt Ratio</span>
            <span className="ml-auto">{result.ratio}%</span>
          </div>
        </div>
      </div>

      <div className="space-y-4 mt-8">
        <div className="space-y-2">
          <h3 className="font-bold">36% or less: Good.</h3>
          <p>Most lenders consider a ratio of 36% or less a healthy debt load.</p>
        </div>

        <div className="space-y-2">
          <h3 className="font-bold">37-42%: Manageable.</h3>
          <p>
            While you may be able to manage with a ratio this high, it is a good idea to start working to reduce your
            debt now and make sure you have adequate savings set aside for emergencies.
          </p>
        </div>

        <div className="space-y-2">
          <h3 className="font-bold">43-49%: Cause for Concern.</h3>
          <p>
            Now would be a good time to make a household debt management plan to start paying down your debts to avoid
            trouble down the road. Talking to an expert is the best way to get tailored advice and get out of debt
            faster.
          </p>
        </div>

        <div className="space-y-2">
          <h3 className="font-bold">50% or more: Dangerous.</h3>
          <p>
            You should make a plan to aggressively pay off your debts. At this level you may want to consider seeking
            professional help to severely reduce your debt.
          </p>
        </div>
      </div>
    </div>
  );
}
