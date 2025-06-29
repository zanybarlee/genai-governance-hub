
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart3, ChevronLeft, ChevronRight } from "lucide-react";

interface RiskHeatmapProps {
  engagementId: string;
  clientName: string;
}

interface RiskCell {
  value: number;
  highlighted?: boolean;
}

const riskData: RiskCell[][] = [
  [{ value: 7 }, { value: 5, highlighted: true }, { value: 7 }, { value: 2 }, { value: 2 }],
  [{ value: 7 }, { value: 9 }, { value: 14, highlighted: true }, { value: 4 }, { value: 4 }],
  [{ value: 8 }, { value: 6 }, { value: 9, highlighted: true }, { value: 3, highlighted: true }, { value: 3 }],
  [{ value: 15 }, { value: 6, highlighted: true }, { value: 8 }, { value: 6, highlighted: true }, { value: 2 }],
  [{ value: 11 }, { value: 6 }, { value: 5 }, { value: 7, highlighted: true }, { value: 1 }]
];

const impactLabels = ["1", "2", "3", "4", "5"];
const probabilityLabels = ["(81%-100%)", "(61%-80%)", "(41%-60%)", "(21%-40%)", "(1%-20%)"];
const impactDescriptions = ["Negligible", "Minor", "Moderate", "Significant", "Severe"];
const probabilityDescriptions = ["Very High", "High", "Medium", "Low", "Very Low"];

const getCellColor = (rowIndex: number, colIndex: number, isHighlighted: boolean) => {
  const baseColors = [
    ["bg-green-400", "bg-yellow-300", "bg-yellow-400", "bg-red-500", "bg-red-600"],
    ["bg-green-400", "bg-green-300", "bg-yellow-300", "bg-yellow-400", "bg-red-500"],
    ["bg-green-500", "bg-green-300", "bg-green-200", "bg-yellow-300", "bg-yellow-400"],
    ["bg-green-500", "bg-green-400", "bg-green-300", "bg-green-200", "bg-yellow-300"],
    ["bg-green-600", "bg-green-500", "bg-green-400", "bg-green-300", "bg-yellow-300"]
  ];
  
  const baseColor = baseColors[rowIndex][colIndex];
  return isHighlighted ? `${baseColor} ring-2 ring-blue-600 ring-offset-1` : baseColor;
};

export const RiskHeatmap = ({ engagementId, clientName }: RiskHeatmapProps) => {
  return (
    <Card className="border-purple-200">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-purple-900">
          <BarChart3 className="h-5 w-5" />
          Risk Heat Map
        </CardTitle>
        <CardDescription>
          Visual representation of risk probability vs impact for {clientName}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {/* Header with navigation */}
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-bold text-gray-900">RISK HEAT MAP</h3>
            <div className="flex items-center gap-2">
              <button className="p-1 rounded-full hover:bg-gray-100">
                <ChevronLeft className="h-4 w-4 text-gray-600" />
              </button>
              <button className="p-1 rounded-full hover:bg-gray-100">
                <ChevronRight className="h-4 w-4 text-gray-600" />
              </button>
            </div>
          </div>
          
          <p className="text-sm text-gray-600 mb-4">Risk Assessment Matrix - IT Controls Audit</p>

          {/* Risk Matrix */}
          <div className="overflow-x-auto">
            <div className="inline-block min-w-full">
              {/* Header row with Impact labels */}
              <div className="flex mb-2">
                <div className="w-24 flex items-center justify-center">
                  <div className="text-sm font-medium text-gray-700 transform -rotate-90 whitespace-nowrap">
                    Impact
                  </div>
                </div>
                <div className="flex-1 grid grid-cols-5 gap-1">
                  {impactLabels.map((label, index) => (
                    <div key={index} className="bg-gray-600 text-white text-center py-2 px-4 text-sm font-medium">
                      {label}
                    </div>
                  ))}
                </div>
              </div>

              {/* Impact description row */}
              <div className="flex mb-2">
                <div className="w-24"></div>
                <div className="flex-1 grid grid-cols-5 gap-1">
                  {impactDescriptions.map((desc, index) => (
                    <div key={index} className="bg-gray-500 text-white text-center py-1 px-2 text-xs">
                      {desc}
                    </div>
                  ))}
                </div>
              </div>

              {/* Probability header */}
              <div className="flex mb-2">
                <div className="w-24 bg-gray-600 text-white flex items-center justify-center text-sm font-medium">
                  Probability
                </div>
                <div className="flex-1"></div>
              </div>

              {/* Data rows */}
              {riskData.map((row, rowIndex) => (
                <div key={rowIndex} className="flex mb-1">
                  <div className="w-24 flex items-center">
                    <div className="text-xs text-gray-700 text-center w-full">
                      {probabilityLabels[rowIndex]}
                    </div>
                  </div>
                  <div className="flex-1 grid grid-cols-5 gap-1">
                    {row.map((cell, colIndex) => (
                      <div
                        key={colIndex}
                        className={`
                          ${getCellColor(rowIndex, colIndex, cell.highlighted || false)}
                          text-center py-4 px-4 text-sm font-medium text-gray-900
                          flex items-center justify-center h-12
                          transition-all duration-200 hover:scale-105 cursor-pointer
                        `}
                      >
                        {cell.value}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Legend */}
          <div className="mt-6 p-4 bg-gray-50 rounded-lg">
            <h4 className="font-medium text-gray-900 mb-3">Risk Level Legend</h4>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-green-500 rounded"></div>
                <span>Low Risk (1-5)</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-yellow-400 rounded"></div>
                <span>Medium Risk (6-10)</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-yellow-500 rounded"></div>
                <span>High Risk (11-15)</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-red-500 rounded"></div>
                <span>Critical Risk (16+)</span>
              </div>
            </div>
            <p className="text-xs text-gray-600 mt-2">
              * Highlighted cells indicate areas requiring immediate attention
            </p>
          </div>

          {/* Summary Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
            <div className="text-center p-3 bg-white border rounded-lg">
              <div className="text-lg font-bold text-green-600">68</div>
              <div className="text-xs text-gray-600">Low Risk Items</div>
            </div>
            <div className="text-center p-3 bg-white border rounded-lg">
              <div className="text-lg font-bold text-yellow-600">32</div>
              <div className="text-xs text-gray-600">Medium Risk Items</div>
            </div>
            <div className="text-center p-3 bg-white border rounded-lg">
              <div className="text-lg font-bold text-orange-600">12</div>
              <div className="text-xs text-gray-600">High Risk Items</div>
            </div>
            <div className="text-center p-3 bg-white border rounded-lg">
              <div className="text-lg font-bold text-red-600">3</div>
              <div className="text-xs text-gray-600">Critical Risk Items</div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
