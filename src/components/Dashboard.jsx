import React, { useEffect, useState } from "react";
import { fetchAnalytics } from "../services/analyticsService";
import {MetricCard} from "./MetricCard";
import {PLChart} from "./PLChart";
import {RecentTradesTable} from "./RecentTradesTable";

export const Dashboard = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAnalytics()
      .then(res => {
        setData(res);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-gradient-to-br from-slate-50 to-slate-100">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-slate-300 border-t-blue-600 mb-4"></div>
          <h2 className="text-xl font-semibold text-slate-700">Loading analytics...</h2>
        </div>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="flex justify-center items-center h-screen bg-gradient-to-br from-slate-50 to-slate-100">
        <div className="text-center">
          <h2 className="text-xl font-semibold text-slate-700">No data available</h2>
        </div>
      </div>
    );
  }

  const isProfitable = data.plBreakdown.percentage > 0;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-slate-100">
      <div className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8">
        {/* Header Section */}
        <div className="mb-8 animate-fade-in">
          <h1 className="text-3xl sm:text-4xl font-bold text-slate-800 mb-2">
            Trading Analytics
          </h1>
          <p className="text-slate-600">Track your performance and insights</p>
        </div>

        {/* P/L Summary Card - Featured */}
        <div className="mb-8 animate-slide-up">
          <div className={`
            relative overflow-hidden rounded-2xl shadow-lg p-6 sm:p-8
            ${isProfitable 
              ? 'bg-gradient-to-br from-emerald-500 to-emerald-600' 
              : 'bg-gradient-to-br from-rose-500 to-rose-600'
            }
          `}>
            <div className="absolute top-0 right-0 w-64 h-64 bg-white opacity-5 rounded-full -mr-32 -mt-32"></div>
            <div className="relative">
              <p className="text-emerald-50 text-sm font-medium mb-2">Total P/L</p>
              <div className="flex items-baseline gap-3 mb-1">
                <h2 className="text-4xl sm:text-5xl font-bold text-white">
                  ₹{data.plBreakdown.currency.toLocaleString()}
                </h2>
                <span className={`
                  text-2xl font-semibold px-3 py-1 rounded-lg
                  ${isProfitable ? 'bg-emerald-600/50' : 'bg-rose-600/50'}
                  text-white
                `}>
                  {data.plBreakdown.percentage > 0 ? '+' : ''}{data.plBreakdown.percentage}%
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Key Metrics Grid */}
        <div className="mb-8">
          <h3 className="text-lg font-semibold text-slate-800 mb-4">Key Metrics</h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4">
            <MetricCard 
              title="Win Rate" 
              value={data.winRate} 
              unit="%" 
              isGood={data.winRate > 50} 
            />
            <MetricCard 
              title="Profit Factor" 
              value={data.profitFactor} 
              isGood={data.profitFactor > 1} 
            />
            <MetricCard 
              title="Avg Return" 
              value={data.avgReturn} 
              unit="%" 
              isGood={data.avgReturn > 0} 
            />
            <MetricCard 
              title="Sharpe Ratio" 
              value={data.sharpeRatio} 
              isGood={data.sharpeRatio > 1} 
            />
            <MetricCard 
              title="Max Drawdown" 
              value={data.maxDrawdown} 
              unit="%" 
              isGood={false} 
            />
          </div>
        </div>

      
        <div className="mb-8">
          <h3 className="text-lg font-semibold text-slate-800 mb-4">Trade Statistics</h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4">
            <MetricCard 
              title="Total Trades" 
              value={data.totalTrades} 
              isGood={true} 
            />
            <MetricCard 
              title="Winning Trades" 
              value={data.winningTrades} 
              isGood={true} 
            />
            <MetricCard 
              title="Losing Trades" 
              value={data.losingTrades} 
              isGood={false} 
            />
            <MetricCard 
              title="Win Streak" 
              value={data.longestWinStreak} 
              unit="trades" 
              isGood={true} 
            />
            <MetricCard 
              title="Loss Streak" 
              value={data.longestLossStreak} 
              unit="trades" 
              isGood={false} 
            />
          </div>
        </div>

      
        <div className="mb-8">
          <div className="bg-white rounded-2xl shadow-lg p-6 border border-slate-200">
            <h3 className="text-lg font-semibold text-slate-800 mb-4">Performance Curve</h3>
            <PLChart plCurve={data.plCurve} />
          </div>
        </div>

        
        <div>
          <div className="bg-white rounded-2xl shadow-lg p-6 border border-slate-200">
            <h3 className="text-lg font-semibold text-slate-800 mb-4">Recent Trades</h3>
            <RecentTradesTable trades={data.recentTrades} />
          </div>
        </div>
      </div>

     
    </div>
  );
};

