import React from "react";
import { 
  LineChart, Line, XAxis, YAxis, 
  Tooltip, CartesianGrid, ResponsiveContainer 
} from "recharts";

export const PLChart = ({ plCurve = [] }) => {

  
  const data = plCurve.map(item => ({
    trade: item.trade,
    equity: item.equity
  }));

  return (
    <div>
      <h3 className="text-lg font-semibold mb-3">
        Equity Curve (P/L Trend)
      </h3>

      <div className="w-full h-[380px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data} margin={{ top: 10, right: 20, left: 10, bottom: 40 }}>
            
            <CartesianGrid strokeDasharray="3 3" />

            {/* Better X-axis */}
            <XAxis 
              dataKey="trade"
              interval={0}
              angle={-30}
              textAnchor="end"
              height={70}
              label={{ value: "Trade Number", position: "insideBottom", offset: -5 }}
            />

           
            <YAxis 
              domain={[95000, 110000]}
              label={{ value: "Equity", angle: -90, position: "insideLeft" }}
            />

            <Tooltip />

           
            <Line 
              type="linear"
              dataKey="equity"
              dot={{ r: 3 }}
              activeDot={{ r: 6 }}
            />

          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};


