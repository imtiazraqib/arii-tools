"use client";

import { useEffect, useRef } from "react";

interface PieChartProps {
  data: {
    name: string;
    value: number;
    color: string;
  }[];
}

export function PieChart({ data }: PieChartProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!canvasRef.current) return;

    const ctx = canvasRef.current.getContext("2d");
    if (!ctx) return;

    const total = data.reduce((sum, item) => sum + item.value, 0);
    let currentAngle = 0;

    // Clear canvas
    ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);

    // Draw pie chart
    const centerX = canvasRef.current.width / 2;
    const centerY = canvasRef.current.height / 2;
    const radius = Math.min(centerX, centerY) - 10;

    data.forEach((item, index) => {
      const sliceAngle = (item.value / total) * 2 * Math.PI;

      ctx.beginPath();
      ctx.moveTo(centerX, centerY);
      ctx.arc(centerX, centerY, radius, currentAngle, currentAngle + sliceAngle);
      ctx.closePath();

      ctx.fillStyle = item.color;
      ctx.fill();

      // Add white stroke between slices
      ctx.strokeStyle = "white";
      ctx.lineWidth = 2;
      ctx.stroke();

      currentAngle += sliceAngle;
    });

    // Draw legend
    const legendY = canvasRef.current.height - 80;
    data.forEach((item, index) => {
      const x = 20;
      const y = legendY + index * 20;

      // Draw color box
      ctx.fillStyle = item.color;
      ctx.fillRect(x, y, 12, 12);

      // Draw text
      ctx.fillStyle = "#000";
      ctx.font = "12px Montserrat, sans-serif";
      ctx.fillText(`${item.name} (${Math.round((item.value / total) * 100)}%)`, x + 20, y + 10);
    });
  }, [data]);

  return <canvas ref={canvasRef} width={400} height={400} className="w-full h-auto" />;
}
