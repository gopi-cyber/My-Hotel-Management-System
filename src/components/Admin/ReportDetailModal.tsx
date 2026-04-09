'use client';
import React, { useState, useEffect } from 'react';
import { X, TrendingUp, BarChart3, Target, Zap, Activity, PieChart, ShieldCheck, Info, ArrowUp, ArrowDown } from 'lucide-react';

interface ReportDetailModalProps {
    isOpen: boolean;
    onClose: () => void;
    type: 'financial' | 'growth';
}

export default function ReportDetailModal({ isOpen, onClose, type }: ReportDetailModalProps) {
    const [viewMode, setViewMode] = useState<'yearly' | 'monthly'>('yearly');
    const [activeStat, setActiveStat] = useState<'kpi' | 'efficiency' | 'latency'>('kpi');
    const [animateBars, setAnimateBars] = useState(false);
    const [selectedBar, setSelectedBar] = useState<{ label: string; value: number } | null>(null);

    useEffect(() => {
        if (isOpen) {
            setAnimateBars(false);
            setSelectedBar(null);
            const timer = setTimeout(() => setAnimateBars(true), 100);
            return () => clearTimeout(timer);
        }
    }, [isOpen, activeStat, viewMode]);

    if (!isOpen) return null;

    const isFinancial = type === 'financial';

    // ── Data for Financial Analysis ──
    const financialData = {
        monthly: {
            kpi:        [62, 70, 65, 78, 74, 88, 91, 85, 94, 97, 90, 100], // Revenue index
            efficiency: [50, 58, 54, 63, 60, 72, 75, 70, 80, 84, 78, 88], // Cost efficiency
            latency:    [30, 28, 32, 25, 27, 20, 18, 22, 15, 12, 17, 10], // Overhead cost
        },
        yearly: {
            kpi:        [52, 67, 81, 100], // Revenue growth
            efficiency: [45, 60, 74, 88],  // Efficiency improvement
            latency:    [55, 45, 32, 18],  // Overhead reduction
        },
    };

    // ── Data for Growth Telemetry ──
    const growthData = {
        monthly: {
            kpi:        [55, 60, 58, 68, 72, 76, 80, 77, 85, 88, 84, 92], // Occupancy rate
            efficiency: [40, 48, 44, 55, 58, 64, 70, 68, 75, 80, 76, 85], // Guest satisfaction
            latency:    [25, 22, 28, 20, 18, 15, 12, 14, 10, 8, 11, 6],   // Vacancy rate
        },
        yearly: {
            kpi:        [45, 62, 76, 92],  // Overall occupancy growth
            efficiency: [38, 54, 68, 85],  // Guest satisfaction growth
            latency:    [50, 40, 28, 14],  // Vacancy decline
        },
    };

    const data = isFinancial ? financialData : growthData;
    const monthLabels = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const yearLabels = ['2021', '2022', '2023', '2024'];

    const rawData = viewMode === 'monthly' ? data.monthly[activeStat] : data.yearly[activeStat];
    const labels = viewMode === 'monthly' ? monthLabels : yearLabels;
    const displayData = rawData.map((val, i) => ({ label: labels[i], value: val }));

    // ── Dynamic KPI values based on viewMode ──
    const kpiValues = isFinancial ? {
        yearly:  { primary: '₹142.8k', label: 'Total Gross Revenue YTD',   forecast: '88%', momentum: '92%', stability: '75%', trend: '+18.4%', positive: true },
        monthly: { primary: '₹11.9k',  label: 'Avg Monthly Revenue',        forecast: '82%', momentum: '87%', stability: '71%', trend: '+8.2%',  positive: true },
    } : {
        yearly:  { primary: '94.2%',   label: 'Avg Annual Occupancy Rate',   forecast: '91%', momentum: '88%', stability: '79%', trend: '+14.1%', positive: true },
        monthly: { primary: '89.7%',   label: 'Avg Monthly Occupancy Rate',  forecast: '85%', momentum: '83%', stability: '72%', trend: '+5.3%',  positive: true },
    };

    const currentKpi = kpiValues[viewMode];

    const efficiencyValues = isFinancial ? {
        yearly:  { title: 'Cost Efficiency', value: '₹71.4k Net', change: '+12.4%', desc: 'Net profit after all operational costs' },
        monthly: { title: 'Cost Efficiency', value: '₹5.9k Net',  change: '+9.1%',  desc: 'Average monthly net profit this year' },
    } : {
        yearly:  { title: 'Guest Satisfaction', value: '4.7 / 5.0', change: '+0.3',    desc: 'Average guest review score (YoY improvement)' },
        monthly: { title: 'Guest Satisfaction', value: '4.6 / 5.0', change: '+0.2',    desc: 'Average review score this month vs last' },
    };

    const latencyValues = isFinancial ? {
        yearly:  { title: 'Overhead Cost',  value: '₹12.8k', change: '-2.1%', desc: 'Annual operational overhead — decreasing' },
        monthly: { title: 'Overhead Cost',  value: '₹1.1k',  change: '-3.4%', desc: 'Monthly overhead — trending down' },
    } : {
        yearly:  { title: 'Vacancy Rate',   value: '5.8%',   change: '-8.3%', desc: 'Rooms going unfilled — dramatically reduced' },
        monthly: { title: 'Vacancy Rate',   value: '4.2%',   change: '-6.1%', desc: 'Current month vacancy — near zero' },
    };

    const currentEff = efficiencyValues[viewMode];
    const currentLat = latencyValues[viewMode];

    const getBarColor = () => {
        if (activeStat === 'efficiency') return 'bg-emerald-500';
        if (activeStat === 'latency') return 'bg-orange-500';
        return isFinancial ? 'bg-indigo-600' : 'bg-cyan-600';
    };

    const getSidebarColor = () => isFinancial ? 'bg-indigo-600' : 'bg-cyan-600';

    const statDescription = {
        kpi: isFinancial ? 'Revenue index as % of peak month target (₹1,240 per unit)' : 'Occupancy rate — % of rooms filled each period',
        efficiency: isFinancial ? 'Net profit efficiency after cost deductions' : 'Guest satisfaction contribution to growth score',
        latency: isFinancial ? 'Overhead cost pressure — lower is better' : 'Vacancy rate — percentage of unfilled rooms',
    };

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-md" onClick={onClose} />

            <div className="relative w-full max-w-5xl rounded-[2.5rem] shadow-2xl animate-in fade-in zoom-in duration-300 max-h-[95vh] overflow-y-auto"
                style={{ background: 'rgba(255,255,255,0.97)', border: '1px solid rgba(255,255,255,1)' }}>
                
                {/* Sticky Header */}
                <div className="sticky top-0 z-20 bg-white/90 backdrop-blur-xl p-8 border-b border-slate-100 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <div className={`h-12 w-12 rounded-2xl ${getSidebarColor()} flex items-center justify-center text-white shadow-lg`}>
                            {isFinancial ? <BarChart3 size={24} /> : <TrendingUp size={24} />}
                        </div>
                        <div>
                            <h2 className="text-3xl font-black text-slate-900 tracking-tighter uppercase italic">
                                {isFinancial ? 'Financial Analysis' : 'Growth Telemetry'}
                            </h2>
                            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">
                                {isFinancial
                                    ? 'Revenue · Cost · Net Profit · Overhead'
                                    : 'Occupancy · Satisfaction · Vacancy Rate'} — View: {viewMode.toUpperCase()} · Stat: {activeStat.toUpperCase()}
                            </p>
                        </div>
                    </div>
                    <button onClick={onClose}
                        className="h-12 w-12 rounded-2xl bg-white shadow-[10px_10px_20px_#d1d9e6] border border-white flex items-center justify-center text-slate-400 hover:text-red-500 hover:bg-red-50 transition-all active:scale-90">
                        <X size={24} />
                    </button>
                </div>

                <div className="p-8 space-y-8">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {/* Chart Column */}
                        <div className="lg:col-span-2 space-y-6">

                            {/* Stat description */}
                            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 text-xs font-semibold text-slate-500 italic">
                                <Info size={14} className="inline mr-2 text-indigo-400" />
                                {statDescription[activeStat]}
                            </div>

                            {/* Graph Area */}
                            <div className="bg-slate-50/50 rounded-[2rem] p-8 border border-slate-100">
                                <div className="flex items-center justify-between mb-8">
                                    <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest">
                                        {viewMode === 'monthly' ? 'Monthly Performance Breakdown' : 'Annual Growth Trend'}
                                    </h3>
                                    <div className="flex bg-white p-1 rounded-xl shadow-sm border border-slate-100">
                                        <button
                                            onClick={() => { setViewMode('yearly'); setSelectedBar(null); }}
                                            className={`px-4 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-widest transition-all ${viewMode === 'yearly' ? 'bg-indigo-600 text-white shadow-md' : 'text-slate-400 hover:text-slate-600'}`}>
                                            Yearly
                                        </button>
                                        <button
                                            onClick={() => { setViewMode('monthly'); setSelectedBar(null); }}
                                            className={`px-4 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-widest transition-all ${viewMode === 'monthly' ? `${getSidebarColor()} text-white shadow-md` : 'text-slate-400 hover:text-slate-600'}`}>
                                            Monthly
                                        </button>
                                    </div>
                                </div>

                                {/* Bars */}
                                <div className="h-64 flex items-end gap-2 px-2">
                                    {displayData.map((item, i) => (
                                        <div key={i}
                                            onClick={() => setSelectedBar(selectedBar?.label === item.label ? null : item)}
                                            title={`${item.label}: ${item.value}%`}
                                            className={`flex-1 rounded-t-xl min-w-[12px] relative group/bar cursor-pointer transition-all duration-700 ${getBarColor()} ${
                                                selectedBar?.label === item.label
                                                    ? 'opacity-100 ring-2 ring-white ring-offset-2 scale-y-[1.03]'
                                                    : 'opacity-60 hover:opacity-90'
                                            }`}
                                            style={{ height: animateBars ? `${item.value}%` : '0%' }}>
                                            <div className="absolute -top-9 left-1/2 -translate-x-1/2 bg-slate-900 text-white text-[9px] py-1 px-2 rounded opacity-0 group-hover/bar:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-10">
                                                {item.label}: {item.value}%
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                {/* Labels */}
                                <div className="flex justify-between mt-3 text-[9px] font-bold text-slate-400 uppercase tracking-widest">
                                    {displayData.map((item, i) => (
                                        <span key={i} className={`min-w-[20px] text-center transition-colors ${selectedBar?.label === item.label ? 'text-indigo-600' : ''}`}>
                                            {item.label}
                                        </span>
                                    ))}
                                </div>
                            </div>

                            {/* Selected Bar Detail Panel */}
                            {selectedBar ? (
                                <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-sm animate-in fade-in slide-in-from-bottom-2 duration-300">
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-4">
                                            <div className={`h-12 w-12 rounded-2xl ${getBarColor()} flex items-center justify-center text-white`}>
                                                <Info size={20} />
                                            </div>
                                            <div>
                                                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
                                                    {viewMode === 'monthly' ? 'Month' : 'Year'}: {selectedBar.label}
                                                </p>
                                                <h4 className="text-lg font-black text-slate-900">
                                                    Performance Index: <span className="text-indigo-600 italic">{selectedBar.value}%</span>
                                                </h4>
                                                <p className="text-xs text-slate-400 font-medium mt-0.5">{statDescription[activeStat]}</p>
                                            </div>
                                        </div>
                                        <div className="text-right">
                                            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Calculated Revenue</p>
                                            <p className="text-2xl font-black text-indigo-600 italic">
                                                ₹{(selectedBar.value * (viewMode === 'monthly' ? 1240 : 14800)).toLocaleString()}
                                            </p>
                                            <p className="text-[9px] text-slate-300 font-bold uppercase">
                                                {viewMode === 'monthly' ? 'Monthly contribution' : 'Annual contribution'}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            ) : (
                                <div className="bg-slate-50 rounded-3xl p-4 border border-dashed border-slate-200 text-center">
                                    <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">
                                        Click any bar above to see detailed breakdown
                                    </p>
                                </div>
                            )}

                            {/* Optimum / Minimized Buttons */}
                            <div className="grid grid-cols-2 gap-6">
                                <button
                                    onClick={() => { setActiveStat('efficiency'); setSelectedBar(null); }}
                                    className={`p-6 rounded-[2rem] shadow-sm border transition-all text-left group ${activeStat === 'efficiency' ? 'bg-emerald-50 border-emerald-200 scale-[1.02]' : 'bg-white border-slate-100 hover:bg-slate-50'}`}>
                                    <div className="flex items-center justify-between mb-3">
                                        <div className={`h-10 w-10 rounded-xl flex items-center justify-center transition-all ${activeStat === 'efficiency' ? 'bg-emerald-600 text-white' : 'bg-emerald-50 text-emerald-600 group-hover:scale-110'}`}>
                                            <Activity size={20} />
                                        </div>
                                        <span className="text-xs font-bold text-emerald-500 flex items-center gap-1">
                                            <ArrowUp size={12} /> {currentEff.change}
                                        </span>
                                    </div>
                                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{currentEff.title}</p>
                                    <p className="text-xl font-black text-slate-900 italic">{currentEff.value}</p>
                                    <p className="text-[9px] text-slate-400 font-medium mt-1">{currentEff.desc}</p>
                                    <p className="text-[9px] text-emerald-600 font-black uppercase tracking-widest mt-2">
                                        {activeStat === 'efficiency' ? '▶ Graph Active' : 'OPTIMUM — Click to graph'}
                                    </p>
                                </button>

                                <button
                                    onClick={() => { setActiveStat('latency'); setSelectedBar(null); }}
                                    className={`p-6 rounded-[2rem] shadow-sm border transition-all text-left group ${activeStat === 'latency' ? 'bg-orange-50 border-orange-200 scale-[1.02]' : 'bg-white border-slate-100 hover:bg-slate-50'}`}>
                                    <div className="flex items-center justify-between mb-3">
                                        <div className={`h-10 w-10 rounded-xl flex items-center justify-center transition-all ${activeStat === 'latency' ? 'bg-orange-600 text-white' : 'bg-orange-50 text-orange-600 group-hover:scale-110'}`}>
                                            <ShieldCheck size={20} />
                                        </div>
                                        <span className="text-xs font-bold text-orange-500 flex items-center gap-1">
                                            <ArrowDown size={12} /> {currentLat.change}
                                        </span>
                                    </div>
                                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{currentLat.title}</p>
                                    <p className="text-xl font-black text-slate-900 italic">{currentLat.value}</p>
                                    <p className="text-[9px] text-slate-400 font-medium mt-1">{currentLat.desc}</p>
                                    <p className="text-[9px] text-orange-600 font-black uppercase tracking-widest mt-2">
                                        {activeStat === 'latency' ? '▶ Graph Active' : 'MINIMIZED — Click to graph'}
                                    </p>
                                </button>
                            </div>
                        </div>

                        {/* Dynamic Sidebar — changes with activeStat */}
                        <div>
                            {activeStat === 'kpi' && (
                                <button
                                    onClick={() => { setActiveStat('kpi'); setSelectedBar(null); }}
                                    className={`w-full p-8 rounded-[2.5rem] text-white shadow-xl flex flex-col justify-between min-h-[420px] transition-all ${getSidebarColor()} scale-[1.02] ring-8 ring-indigo-100`}>
                                    <div className="space-y-2 text-left">
                                        <p className="text-xs font-bold uppercase tracking-[0.2em] opacity-80">▶ Primary KPI — Active</p>
                                        <h4 className="text-5xl font-black italic leading-none">{currentKpi.primary}</h4>
                                        <p className="text-sm font-medium opacity-90 leading-snug mt-2">{currentKpi.label}</p>
                                        <p className="text-xs font-black opacity-60 uppercase tracking-widest flex items-center gap-1">
                                            <ArrowUp size={12} /> {currentKpi.trend} vs prior period
                                        </p>
                                        <p className="text-[9px] font-bold opacity-50 uppercase tracking-widest">
                                            {viewMode === 'monthly' ? '12-month rolling average' : '4-year consolidated view'}
                                        </p>
                                    </div>
                                    <div className="pt-6 border-t border-white/20 space-y-5">
                                        {[
                                            { label: 'Forecast', icon: Target, val: currentKpi.forecast },
                                            { label: 'Momentum', icon: Zap, val: currentKpi.momentum },
                                            { label: 'Stability', icon: Activity, val: currentKpi.stability },
                                        ].map(item => (
                                            <div key={item.label} className="flex items-center justify-between">
                                                <div className="flex items-center gap-3">
                                                    <item.icon size={15} className="opacity-60" />
                                                    <span className="text-[10px] font-bold uppercase tracking-widest">{item.label}</span>
                                                </div>
                                                <div className="flex items-center gap-2">
                                                    <span className="text-[10px] font-black">{item.val}</span>
                                                    <div className="h-1 w-14 bg-white/20 rounded-full overflow-hidden">
                                                        <div className="h-full bg-white rounded-full transition-all duration-700" style={{ width: item.val }} />
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                    <p className="text-[9px] opacity-40 font-bold uppercase mt-4">Click Optimum or Minimized to switch view</p>
                                </button>
                            )}

                            {activeStat === 'efficiency' && (
                                <div className="w-full p-8 rounded-[2.5rem] text-white shadow-xl flex flex-col justify-between min-h-[420px] bg-emerald-600 scale-[1.02] ring-8 ring-emerald-100">
                                    <div className="space-y-2 text-left">
                                        <p className="text-xs font-bold uppercase tracking-[0.2em] opacity-80">▶ OPTIMUM — Active</p>
                                        <h4 className="text-4xl font-black italic leading-none">{currentEff.value}</h4>
                                        <p className="text-sm font-medium opacity-90 leading-snug mt-2">{currentEff.title}</p>
                                        <p className="text-xs font-black opacity-70 uppercase tracking-widest flex items-center gap-1">
                                            <ArrowUp size={12} /> {currentEff.change} improvement
                                        </p>
                                        <p className="text-[10px] font-medium opacity-80 mt-2 leading-relaxed">{currentEff.desc}</p>
                                        <p className="text-[9px] font-bold opacity-50 uppercase tracking-widest">
                                            {viewMode === 'monthly' ? 'Monthly view active' : 'Yearly view active'}
                                        </p>
                                    </div>
                                    <div className="pt-6 border-t border-white/20 space-y-5">
                                        {[
                                            { label: 'Peak Period', val: viewMode === 'monthly' ? 'December' : '2024' },
                                            { label: 'Baseline',    val: viewMode === 'monthly' ? 'January' : '2021' },
                                            { label: 'Growth Rate', val: currentEff.change },
                                        ].map(item => (
                                            <div key={item.label} className="flex items-center justify-between">
                                                <span className="text-[10px] font-bold uppercase tracking-widest opacity-80">{item.label}</span>
                                                <span className="text-[10px] font-black">{item.val}</span>
                                            </div>
                                        ))}
                                    </div>
                                    <p className="text-[9px] opacity-40 font-bold uppercase mt-4">Click Primary KPI or Minimized to switch view</p>
                                </div>
                            )}

                            {activeStat === 'latency' && (
                                <div className="w-full p-8 rounded-[2.5rem] text-white shadow-xl flex flex-col justify-between min-h-[420px] bg-orange-500 scale-[1.02] ring-8 ring-orange-100">
                                    <div className="space-y-2 text-left">
                                        <p className="text-xs font-bold uppercase tracking-[0.2em] opacity-80">▶ MINIMIZED — Active</p>
                                        <h4 className="text-4xl font-black italic leading-none">{currentLat.value}</h4>
                                        <p className="text-sm font-medium opacity-90 leading-snug mt-2">{currentLat.title}</p>
                                        <p className="text-xs font-black opacity-70 uppercase tracking-widest flex items-center gap-1">
                                            <ArrowDown size={12} /> {currentLat.change} reduction
                                        </p>
                                        <p className="text-[10px] font-medium opacity-80 mt-2 leading-relaxed">{currentLat.desc}</p>
                                        <p className="text-[9px] font-bold opacity-50 uppercase tracking-widest">
                                            {viewMode === 'monthly' ? 'Monthly view active' : 'Yearly view active'}
                                        </p>
                                    </div>
                                    <div className="pt-6 border-t border-white/20 space-y-5">
                                        {[
                                            { label: 'Peak (Worst)',  val: viewMode === 'monthly' ? 'January' : '2021' },
                                            { label: 'Current Best', val: viewMode === 'monthly' ? 'December' : '2024' },
                                            { label: 'Reduction',    val: currentLat.change },
                                        ].map(item => (
                                            <div key={item.label} className="flex items-center justify-between">
                                                <span className="text-[10px] font-bold uppercase tracking-widest opacity-80">{item.label}</span>
                                                <span className="text-[10px] font-black">{item.val}</span>
                                            </div>
                                        ))}
                                    </div>
                                    <p className="text-[9px] opacity-40 font-bold uppercase mt-4">Click Primary KPI or Optimum to switch view</p>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Footer */}
                    <div className="pt-6 border-t border-slate-100 flex items-center justify-between">
                        <p className="text-[10px] font-bold text-slate-300 uppercase tracking-widest">
                            {isFinancial
                                ? 'Financial Summary: Revenue is growing. Costs are reducing. Net profit improving every period.'
                                : 'Growth Summary: Occupancy is rising. Guest satisfaction improving. Vacancy near zero.'}
                        </p>
                        <div className="flex gap-4">
                            <button onClick={onClose} className="px-7 py-3 rounded-2xl text-sm font-bold text-slate-400 hover:text-slate-600 hover:bg-slate-50 transition-all">
                                Dismiss
                            </button>
                            <button className={`px-7 py-3 rounded-2xl text-sm font-bold text-white shadow-lg transition-all hover:scale-105 active:scale-95 ${getSidebarColor()}`}>
                                Download Report
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
