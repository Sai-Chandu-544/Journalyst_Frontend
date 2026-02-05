import React from "react";

export const RecentTradesTable = ({ trades }) => {

  if (!trades || trades.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-sm text-slate-500">No recent trades to display</p>
      </div>
    );
  }

  // Small utility for win/loss colors
  const isWin = (value) => value > 0;

  return (
    <div>

      {/* ---------- MOBILE VIEW ---------- */}
      <div className="block md:hidden space-y-3">
        {trades.map((trade) => (
          <div key={trade.id} 
               className="bg-slate-50 rounded-lg p-4 border hover:shadow-md">

            <div className="flex justify-between mb-3">
              <span className="text-xs text-slate-500">Trade #{trade.id}</span>

              <span className={`
                px-2 py-1 text-xs rounded-full border
                ${trade.result.toLowerCase() === "win"
                  ? "bg-emerald-100 text-emerald-800 border-emerald-200"
                  : "bg-rose-100 text-rose-800 border-rose-200"}
              `}>
                {trade.result}
              </span>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-sm text-slate-600">Type</span>
                <span className="px-2 py-1 text-xs rounded-md border bg-blue-100 text-blue-800">
                  {trade.type}
                </span>
              </div>

              <div className="flex justify-between">
                <span className="text-sm text-slate-600">Return</span>
                <span className={`font-semibold ${isWin(trade.return) ? "text-emerald-600" : "text-rose-600"}`}>
                  {trade.return > 0 ? "+" : ""}{trade.return}%
                </span>
              </div>

              <div className="flex justify-between pt-2 border-t">
                <span className="text-sm font-medium">P/L</span>
                <span className={`text-lg font-bold ${isWin(trade.profit) ? "text-emerald-600" : "text-rose-600"}`}>
                  {trade.profit > 0 ? "+" : ""}₹{Math.abs(trade.profit).toLocaleString()}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* ---------- DESKTOP TABLE ---------- */}
      <div className="hidden md:block overflow-x-auto rounded-lg border">
        <table className="min-w-full divide-y divide-slate-200">
          <thead className="bg-slate-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-semibold">Trade ID</th>
              <th className="px-6 py-3 text-left text-xs font-semibold">Type</th>
              <th className="px-6 py-3 text-left text-xs font-semibold">Result</th>
              <th className="px-6 py-3 text-right text-xs font-semibold">Return %</th>
              <th className="px-6 py-3 text-right text-xs font-semibold">P/L</th>
            </tr>
          </thead>

          <tbody className="bg-white divide-y">
            {trades.map((trade, i) => (
              <tr key={trade.id} className="hover:bg-slate-50">

                <td className="px-6 py-4">#{trade.id}</td>

                <td className="px-6 py-4">
                  <span className="px-2 py-1 text-xs rounded-md border bg-blue-100 text-blue-800">
                    {trade.type}
                  </span>
                </td>

                <td className="px-6 py-4">
                  <span className={`
                    px-2 py-1 text-xs rounded-full border
                    ${trade.result.toLowerCase() === "win"
                      ? "bg-emerald-100 text-emerald-800 border-emerald-200"
                      : "bg-rose-100 text-rose-800 border-rose-200"}
                  `}>
                    {trade.result}
                  </span>
                </td>

                <td className={`px-6 py-4 text-right font-semibold
                    ${isWin(trade.return) ? "text-emerald-600" : "text-rose-600"}`}>
                  {trade.return > 0 ? "+" : ""}{trade.return}%
                </td>

                <td className={`px-6 py-4 text-right font-bold
                    ${isWin(trade.profit) ? "text-emerald-600" : "text-rose-600"}`}>
                  {trade.profit > 0 ? "+" : ""}₹{Math.abs(trade.profit).toLocaleString()}
                </td>

              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
