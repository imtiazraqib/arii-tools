"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Plus, X } from "lucide-react";
import type { CalculationResult, RenovationOption, SelectedRenovation } from "./page";

const RENOVATION_OPTIONS: RenovationOption[] = [
  { name: "Kitchen Remodel", costPerSqFt: 150, roi: 0.8 },
  { name: "Bathroom Remodel", costPerSqFt: 120, roi: 0.7 },
  { name: "Basement Finishing", costPerSqFt: 100, roi: 0.75 },
  { name: "Roof Replacement", costPerSqFt: 8, roi: 0.6 },
  { name: "Flooring Upgrade", costPerSqFt: 12, roi: 0.55 },
  { name: "Windows Replacement", costPerSqFt: 15, roi: 0.68 },
  { name: "Exterior Siding", costPerSqFt: 10, roi: 0.65 },
  { name: "Deck Addition", costPerSqFt: 35, roi: 0.6 },
];

interface CalculateFormProps {
  onCalculate: (result: CalculationResult) => void;
  initialEmail?: string;
  locationId?: string;
}

export default function CalculateForm({ onCalculate, initialEmail = "", locationId = "" }: CalculateFormProps) {
  const [homeValue, setHomeValue] = useState<number>(500000);
  const [cityAssessedValue, setCityAssessedValue] = useState<number>(500000);
  const [selectedRenovations, setSelectedRenovations] = useState<
    {
      renovationIndex: number;
      area: number;
    }[]
  >([{ renovationIndex: 3, area: 800 }]); // Default to Roof Replacement
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>(initialEmail);
  const [phone, setPhone] = useState<string>("");
  const [message, setMessage] = useState<string>("");

  const handleAddRenovation = () => {
    setSelectedRenovations([...selectedRenovations, { renovationIndex: 0, area: 500 }]);
  };

  const handleRemoveRenovation = (index: number) => {
    const newSelectedRenovations = selectedRenovations.filter((_, i) => i !== index);
    setSelectedRenovations(newSelectedRenovations);
  };

  const handleRenovationChange = (index: number, renovationIndex: number) => {
    const newSelectedRenovations = [...selectedRenovations];
    newSelectedRenovations[index].renovationIndex = renovationIndex;
    setSelectedRenovations(newSelectedRenovations);
  };

  const handleAreaChange = (index: number, area: number) => {
    const newSelectedRenovations = [...selectedRenovations];
    newSelectedRenovations[index].area = area;
    setSelectedRenovations(newSelectedRenovations);
  };

  const handleCalculate = () => {
    const calculatedRenovations: SelectedRenovation[] = selectedRenovations.map((item) => {
      const renovation = RENOVATION_OPTIONS[item.renovationIndex];
      const cost = renovation.costPerSqFt * item.area;
      const valueIncrease = cost * renovation.roi;

      return {
        renovation,
        area: item.area,
        cost,
        valueIncrease,
      };
    });

    const totalCost = calculatedRenovations.reduce((sum, item) => sum + item.cost, 0);
    const totalValueIncrease = calculatedRenovations.reduce((sum, item) => sum + item.valueIncrease, 0);
    const newEstimatedHomeValue = homeValue + totalValueIncrease;

    onCalculate({
      homeValue,
      cityAssessedValue,
      selectedRenovations: calculatedRenovations,
      totalCost,
      totalValueIncrease,
      newEstimatedHomeValue,
      userInfo: {
        name,
        email,
        phone,
        message,
      },
    });
  };

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <div className="grid gap-4">
          <div className="space-y-2">
            <Label htmlFor="homeValue">Home Value ($)</Label>
            <Input
              id="homeValue"
              type="number"
              value={homeValue}
              onChange={(e) => setHomeValue(Number(e.target.value))}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="cityAssessedValue">City Assessed Value ($)</Label>
            <Input
              id="cityAssessedValue"
              type="number"
              value={cityAssessedValue}
              onChange={(e) => setCityAssessedValue(Number(e.target.value))}
            />
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <Label>Select Renovations</Label>
          </div>

          {selectedRenovations.map((item, index) => (
            <div key={index} className="flex items-center space-x-2 flex-wrap md:flex-nowrap">
              <Select
                value={item.renovationIndex.toString()}
                onValueChange={(value) => handleRenovationChange(index, Number.parseInt(value))}>
                <SelectTrigger>
                  <SelectValue placeholder="Select a renovation" />
                </SelectTrigger>
                <SelectContent>
                  {RENOVATION_OPTIONS.map((option, optionIndex) => (
                    <SelectItem key={optionIndex} value={optionIndex.toString()}>
                      {option.name} (${option.costPerSqFt}/sq ft, {(option.roi * 100).toFixed()}% ROI)
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Input
                type="number"
                value={item.area}
                onChange={(e) => handleAreaChange(index, Number(e.target.value))}
                className="w-[100px] md:w-auto"
                placeholder="Area (sq ft)"
              />

              {index > 0 && (
                <Button type="button" variant="ghost" size="icon" onClick={() => handleRemoveRenovation(index)}>
                  <X className="h-4 w-4" />
                </Button>
              )}
            </div>
          ))}
          <Button type="button" variant="outline" onClick={handleAddRenovation} className="w-full">
            <Plus className="h-4 w-4 mr-1" /> Add Renovation
          </Button>
        </div>
      </div>

      <div className="space-y-4 pt-4 border-t">
        <h3 className="text-lg font-medium">Please complete all fields for more information:</h3>

        <div className="grid gap-4">
          <div className="space-y-2">
            <Label htmlFor="name">Full Name</Label>
            <Input id="name" value={name} onChange={(e) => setName(e.target.value)} />
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">E-mail</Label>
            <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
          </div>

          <div className="space-y-2">
            <Label htmlFor="phone">Phone</Label>
            <Input id="phone" value={phone} onChange={(e) => setPhone(e.target.value)} />
          </div>
        </div>
      </div>

      <Button className="w-full" size="lg" onClick={handleCalculate}>
        Calculate ROI
      </Button>
    </div>
  );
}
