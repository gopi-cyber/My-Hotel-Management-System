'use client';
import React, { useState, useEffect } from 'react';
import { X, TrendingUp, BarChart3, Target, Zap, Activity, ShieldCheck, Info, ArrowUp, ArrowDown } from 'lucide-react';

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
            requestAnimationFrame(() => {
                setAnimateBars(false);
                setSelectedBar(null);
                const timer = setTimeout(() => setAnimateBars(true), 100);
                return () => clearTimeout(timer);
            });
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
        if (activeStat === 'efficiency') return 'bg-amber-500';
        if (activeStat === 'latency') return 'bg-indigo-500';
        return isFinancial ? 'bg-amber-500' : 'bg-indigo-500';
    };

    const getSidebarColor = () => isFinancial ? 'bg-amber-500' : 'bg-indigo-500';

    const statDescription = {
        kpi: isFinancial ? 'Revenue index as % of peak month target (₹1,240 per unit)' : 'Occupancy rate — % of rooms filled each period',
        efficiency: isFinancial ? 'Net profit efficiency after cost deductions' : 'Guest satisfaction contribution to growth score',
        latency: isFinancial ? 'Overhead cost pressure — lower is better' : 'Vacancy rate — percentage of unfilled rooms',
    };

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 animate-in fade-in duration-500">
            <div className="absolute inset-0 bg-slate-950/80 backdrop-blur-2xl" onClick={onClose} />

            <div className="relative w-full max-w-6xl rounded-[4rem] shadow-[0_50px_100px_rgba(0,0,0,0.8)] animate-in fade-in zoom-in-95 duration-500 max-h-[95vh] overflow-y-auto custom-scrollbar border-4 border-white/5 bg-slate-900/40 backdrop-blur-3xl">
                <style jsx>{`
                    .custom-scrollbar::-webkit-scrollbar {
                        width: 10px;
                    }
                    .custom-scrollbar::-webkit-scrollbar-thumb {
                        background: rgba(255, 255, 255, 0.05);
                        border-radius: 20px;
                    }
                `}</style>
                
                {/* Visual Header */}
                <div className="sticky top-0 z-20 bg-slate-950/80 backdrop-blur-3xl p-10 border-b border-white/5 flex items-center justify-between">
                    <div className="flex items-center gap-6">
                        <div className={`h-16 w-16 rounded-[1.5rem] ${getSidebarColor()} flex items-center justify-center text-slate-950 shadow-xl shadow-amber-500/10`}>
                            {isFinancial ? <BarChart3 size={32} /> : <TrendingUp size={32} />}
                        </div>
                        <div>
                            <h2 className="text-4xl font-black text-white tracking-tighter uppercase italic leading-tight">
                                {isFinancial ? 'Financial Analysis' : 'Growth Telemetry'}<span className="text-amber-500">.</span>
                            </h2>
                            <p className="text-[10px] font-black text-white/20 uppercase tracking-[0.4em] mt-1 italic">
                                {isFinancial
                                    ? 'Revenue · Cost · Net Profit · Overhead'
                                    : 'Occupancy · Satisfaction · Vacancy Rate'} Archive — NODE: {viewMode.toUpperCase()}
                            </p>
                        </div>
                    </div>
                    <button onClick={onClose}
                        className="h-14 w-14 rounded-2xl bg-slate-950 border border-white/5 flex items-center justify-center text-white/20 hover:text-red-500 transition-all active:scale-90 shadow-2xl">
                        <X size={28} />
                    </button>
                </div>

                <div className="p-10 space-y-10">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
                        {/* Chart Column */}
                        <div className="lg:col-span-2 space-y-10">

                            {/* Stat description */}
                            <div className="p-6 rounded-3xl bg-slate-950/40 border border-white/5 text-[10px] font-black text-white/20 uppercase tracking-widest italic flex items-center gap-4">
                                <Info size={18} className="text-amber-500/40" />
                                {statDescription[activeStat]}
                            </div>

                            {/* Graph Area */}
                            <div className="bg-slate-950/40 rounded-[3rem] p-10 border-4 border-white/5 shadow-inner">
                                <div className="flex items-center justify-between mb-12">
                                    <h3 className="text-[10px] font-black text-white/10 uppercase tracking-[0.4em] italic leading-none">
                                        {viewMode === 'monthly' ? 'Monthly Performance Matrix' : 'Annual Growth Vector'}
                                    </h3>
                                    <div className="flex bg-slate-950 p-2 rounded-2xl border border-white/5 shadow-xl">
                                        <button
                                            onClick={() => { setViewMode('yearly'); setSelectedBar(null); }}
                                            className={`px-6 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${viewMode === 'yearly' ? 'bg-amber-500 text-slate-950 shadow-inner' : 'text-white/20 hover:text-white'}`}>
                                            Yearly
                                        </button>
                                        <button
                                            onClick={() => { setViewMode('monthly'); setSelectedBar(null); }}
                                            className={`px-6 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${viewMode === 'monthly' ? `${getSidebarColor()} text-slate-950 shadow-inner` : 'text-white/20 hover:text-white'}`}>
                                            Monthly
                                        </button>
                                    </div>
                                </div>

                                {/* Bars */}
                                <div className="h-72 flex items-end gap-3 px-4">
                                    {displayData.map((item, i) => (
                                        <div key={i}
                                            onClick={() => setSelectedBar(selectedBar?.label === item.label ? null : item)}
                                            className={`flex-1 rounded-t-[1rem] min-w-[14px] relative group/bar cursor-pointer transition-all duration-1000 ${getBarColor()} ${
                                                selectedBar?.label === item.label
                                                    ? 'opacity-100 scale-y-[1.05] shadow-[0_0_30px_rgba(245,158,11,0.2)]'
                                                    : 'opacity-20 hover:opacity-100'
                                            }`}
                                            style={{ height: animateBars ? `${item.value}%` : '0%' }}>
                                            <div className="absolute -top-12 left-1/2 -translate-x-1/2 bg-slate-950 text-amber-500 text-[10px] font-black py-2 px-3 rounded-xl opacity-0 group-hover/bar:opacity-100 transition-all border border-amber-500/20 pointer-events-none whitespace-nowrap z-10 shadow-2xl skew-x-[-10deg]">
                                                {item.label}: {item.value}%
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                {/* Labels */}
                                <div className="flex justify-between mt-8 text-[9px] font-black text-white/10 uppercase tracking-[0.3em] italic">
                                    {displayData.map((item, i) => (
                                        <span key={i} className={`min-w-[20px] text-center transition-colors ${selectedBar?.label === item.label ? 'text-amber-500' : ''}`}>
                                            {item.label}
                                        </span>
                                    ))}
                                </div>
                            </div>

                            {/* Selected Bar Detail Panel */}
                            {selectedBar ? (
                                <div className="bg-slate-950/60 backdrop-blur-xl rounded-[3rem] p-10 border border-white/10 shadow-2xl animate-in fade-in slide-in-from-bottom-5 duration-500">
                                    <div className="flex flex-col md:flex-row items-center justify-between gap-10">
                                        <div className="flex items-center gap-8">
                                            <div className={`h-16 w-16 rounded-[1.5rem] ${getBarColor()} flex items-center justify-center text-slate-950 shadow-xl`}>
                                                <Activity size={32} />
                                            </div>
                                            <div>
                                                <p className="text-[10px] font-black text-white/20 uppercase tracking-[0.4em] italic mb-2">
                                                    NODEID: {selectedBar.label}
                                                </p>
                                                <h4 className="text-3xl font-black text-white italic uppercase tracking-tighter">
                                                    Index Status: <span className="text-amber-500 underline decoration-amber-500/20 underline-offset-8 decoration-4">{selectedBar.value}%</span>
                                                </h4>
                                                <p className="text-[10px] text-white/20 font-black uppercase tracking-widest mt-4 italic">{statDescription[activeStat]}</p>
                                            </div>
                                        </div>
                                        <div className="text-right flex flex-col items-center md:items-end">
                                            <p className="text-[10px] font-black text-white/20 uppercase tracking-[0.3em] italic mb-2">Calculated Capital Value</p>
                                            <p className="text-4xl font-black text-white italic leading-none">
                                                ₹{(selectedBar.value * (viewMode === 'monthly' ? 1240 : 14800)).toLocaleString()}
                                            </p>
                                            <p className="text-[9px] text-white/10 font-black uppercase tracking-[0.2em] mt-3 italic">
                                                {viewMode === 'monthly' ? 'Interval contribution' : 'Yearly aggregate'}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            ) : (
                                <div className="bg-slate-950/20 rounded-[2.5rem] p-6 border-4 border-dashed border-white/5 text-center transition-all hover:bg-slate-950/40">
                                    <p className="text-[11px] font-black text-white/10 uppercase tracking-[0.5em] italic leading-relaxed">
                                        Select temporal interval node above for deep telemetry breakdown
                                    </p>
                                </div>
                            )}

                            {/* Optimum / Minimized Buttons */}
                            <div className="grid grid-cols-2 gap-10">
                                <button
                                    onClick={() => { setActiveStat('efficiency'); setSelectedBar(null); }}
                                    className={`p-10 rounded-[3rem] shadow-2xl border-4 transition-all text-left group relative overflow-hidden ${activeStat === 'efficiency' ? 'bg-amber-500/10 border-amber-500/30 -translate-y-2' : 'bg-slate-950/40 border-white/5 hover:border-white/10 hover:bg-slate-950/60'}`}>
                                    <div className="absolute top-[-20%] right-[-20%] h-32 w-32 bg-amber-500/5 blur-[40px] rounded-full pointer-events-none" />
                                    <div className="flex items-center justify-between mb-8">
                                        <div className={`h-14 w-14 rounded-2xl flex items-center justify-center transition-all ${activeStat === 'efficiency' ? 'bg-amber-500 text-slate-950' : 'bg-slate-950 text-white/10 group-hover:scale-110'}`}>
                                            <Activity size={28} />
                                        </div>
                                        <span className="text-[10px] font-black text-amber-500 flex items-center gap-2 uppercase tracking-widest italic leading-none">
                                            <ArrowUp size={16} /> {currentEff.change}
                                        </span>
                                    </div>
                                    <p className="text-[10px] font-black text-white/20 uppercase tracking-[0.4em] mb-3 italic">{currentEff.title}</p>
                                    <p className="text-3xl font-black text-white italic tracking-tighter uppercase leading-none">{currentEff.value}</p>
                                    <p className="text-[10px] text-white/10 font-black italic mt-4 leading-relaxed uppercase tracking-wider">{currentEff.desc}</p>
                                    <div className="mt-8 pt-6 border-t border-white/5">
                                        <p className="text-[9px] text-amber-500 font-black uppercase tracking-[0.3em] italic">
                                            {activeStat === 'efficiency' ? '▶ Telemetry Active' : 'Switch to Optimum Sync'}
                                        </p>
                                    </div>
                                </button>

                                <button
                                    onClick={() => { setActiveStat('latency'); setSelectedBar(null); }}
                                    className={`p-10 rounded-[3rem] shadow-2xl border-4 transition-all text-left group relative overflow-hidden ${activeStat === 'latency' ? 'bg-indigo-500/10 border-indigo-500/30 -translate-y-2' : 'bg-slate-950/40 border-white/5 hover:border-white/10 hover:bg-slate-950/60'}`}>
                                    <div className="absolute bottom-[-20%] left-[-20%] h-32 w-32 bg-indigo-500/5 blur-[40px] rounded-full pointer-events-none" />
                                    <div className="flex items-center justify-between mb-8">
                                        <div className={`h-14 w-14 rounded-2xl flex items-center justify-center transition-all ${activeStat === 'latency' ? 'bg-indigo-500 text-slate-950' : 'bg-slate-950 text-white/10 group-hover:scale-110'}`}>
                                            <ShieldCheck size={28} />
                                        </div>
                                        <span className="text-[10px] font-black text-indigo-400 flex items-center gap-2 uppercase tracking-widest italic leading-none">
                                            <ArrowDown size={16} /> {currentLat.change}
                                        </span>
                                    </div>
                                    <p className="text-[10px] font-black text-white/20 uppercase tracking-[0.4em] mb-3 italic">{currentLat.title}</p>
                                    <p className="text-3xl font-black text-white italic tracking-tighter uppercase leading-none">{currentLat.value}</p>
                                    <p className="text-[10px] text-white/10 font-black italic mt-4 leading-relaxed uppercase tracking-wider">{currentLat.desc}</p>
                                    <div className="mt-8 pt-6 border-t border-white/5">
                                        <p className="text-[9px] text-indigo-400 font-black uppercase tracking-[0.3em] italic">
                                            {activeStat === 'latency' ? '▶ Telemetry Active' : 'Switch to Minimized Sync'}
                                        </p>
                                    </div>
                                </button>
                            </div>
                        </div>

                        {/* Dynamic Sidebar — changes with activeStat */}
                        <div className="h-full">
                            {activeStat === 'kpi' && (
                                <div className="w-full p-10 rounded-[4rem] text-slate-950 shadow-2xl flex flex-col justify-between min-h-full transition-all bg-amber-500 relative overflow-hidden">
                                    <div className="absolute top-[-10%] right-[-10%] h-64 w-64 bg-white/10 blur-[60px] rounded-full pointer-events-none animate-pulse" />
                                    <div className="space-y-6 text-left relative">
                                        <p className="text-[10px] font-black uppercase tracking-[0.4em] italic opacity-40 leading-none">▶ Active Core KPI</p>
                                        <h4 className="text-7xl font-black italic tracking-tighter leading-none text-slate-950 mt-10">{currentKpi.primary}</h4>
                                        <p className="text-lg font-black italic uppercase tracking-tight text-slate-900 leading-tight mt-6">{currentKpi.label}</p>
                                        <div className="flex items-center gap-4 mt-8 py-4 px-6 bg-slate-950 rounded-2xl w-fit">
                                            <ArrowUp size={20} className="text-amber-500" />
                                            <span className="text-sm font-black text-amber-500 uppercase tracking-widest italic">{currentKpi.trend} Period Velocity</span>
                                        </div>
                                    </div>
                                    <div className="pt-10 border-t border-slate-950/10 space-y-8 relative">
                                        {[
                                            { label: 'Forecast Vector', icon: Target, val: currentKpi.forecast },
                                            { label: 'Growth Momentum', icon: Zap, val: currentKpi.momentum },
                                            { label: 'System Stability', icon: Activity, val: currentKpi.stability },
                                        ].map(item => (
                                            <div key={item.label} className="space-y-3">
                                                <div className="flex items-center justify-between">
                                                    <div className="flex items-center gap-3">
                                                        <item.icon size={18} className="text-slate-950/40" />
                                                        <span className="text-[10px] font-black uppercase tracking-widest italic text-slate-950/60">{item.label}</span>
                                                    </div>
                                                    <span className="text-[11px] font-black text-slate-950 italic">{item.val}</span>
                                                </div>
                                                <div className="h-2 w-full bg-slate-950/10 rounded-full overflow-hidden">
                                                    <div className="h-full bg-slate-950 rounded-full transition-all duration-1000" style={{ width: item.val }} />
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                    <div className="mt-12 text-center relative">
                                        <p className="text-[9px] font-black uppercase tracking-[0.4em] italic opacity-30 leading-relaxed">Initialized Neural Synchronization Portal 4.0</p>
                                    </div>
                                </div>
                            )}

                            {activeStat === 'efficiency' && (
                                <div className="w-full p-10 rounded-[4rem] text-white shadow-2xl flex flex-col justify-between min-h-full transition-all bg-indigo-600 relative overflow-hidden">
                                    <div className="absolute bottom-[-10%] left-[-10%] h-64 w-64 bg-white/10 blur-[60px] rounded-full pointer-events-none" />
                                    <div className="space-y-6 text-left relative">
                                        <p className="text-[10px] font-black uppercase tracking-[0.4em] italic opacity-50 leading-none">▶ Optimum Active</p>
                                        <h4 className="text-6xl font-black italic tracking-tighter leading-none text-white mt-10">{currentEff.value}</h4>
                                        <p className="text-lg font-black italic uppercase tracking-tight text-white mt-6">{currentEff.title}</p>
                                        <div className="flex items-center gap-4 mt-8 py-4 px-6 bg-slate-950 rounded-2xl w-fit">
                                            <ArrowUp size={20} className="text-indigo-400" />
                                            <span className="text-sm font-black text-indigo-400 uppercase tracking-widest italic">{currentEff.change} Acceleration</span>
                                        </div>
                                    </div>
                                    <div className="pt-10 border-t border-white/10 space-y-10 relative">
                                        {[
                                            { label: 'Peak Temporal Node', val: viewMode === 'monthly' ? 'DECEMBER' : 'CY2024' },
                                            { label: 'Origin Temporal Node',    val: viewMode === 'monthly' ? 'JANUARY' : 'CY2021' },
                                            { label: 'Efficiency Vector', val: currentEff.change },
                                        ].map(item => (
                                            <div key={item.label} className="flex flex-col gap-2">
                                                <span className="text-[10px] font-black uppercase tracking-[0.3em] italic opacity-40">{item.label}</span>
                                                <span className="text-xl font-black italic tracking-widest text-white">{item.val}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {activeStat === 'latency' && (
                                <div className="w-full p-10 rounded-[4rem] text-slate-950 shadow-2xl flex flex-col justify-between min-h-full transition-all bg-slate-950 relative overflow-hidden border-4 border-white/5">
                                    <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/10 to-transparent" />
                                    <div className="space-y-6 text-left relative">
                                        <p className="text-[10px] font-black uppercase tracking-[0.4em] italic text-white/20 leading-none">▶ Minimized Active</p>
                                        <h4 className="text-6xl font-black italic tracking-tighter leading-none text-white mt-10">{currentLat.value}</h4>
                                        <p className="text-lg font-black italic uppercase tracking-tight text-white/40 mt-6">{currentLat.title}</p>
                                        <div className="flex items-center gap-4 mt-8 py-4 px-6 bg-white/5 rounded-2xl w-fit border border-white/5">
                                            <ArrowDown size={20} className="text-red-500" />
                                            <span className="text-sm font-black text-red-500 uppercase tracking-widest italic">{currentLat.change} Pressure</span>
                                        </div>
                                    </div>
                                    <div className="pt-10 border-t border-white/5 space-y-10 relative">
                                        {[
                                            { label: 'Max Pressure Node',  val: viewMode === 'monthly' ? 'JANUARY' : 'CY2021' },
                                            { label: 'Optimal Node', val: viewMode === 'monthly' ? 'DECEMBER' : 'CY2024' },
                                            { label: 'Reduction Vector',    val: currentLat.change },
                                        ].map(item => (
                                            <div key={item.label} className="flex flex-col gap-2">
                                                <span className="text-[10px] font-black uppercase tracking-[0.3em] italic text-white/10">{item.label}</span>
                                                <span className="text-xl font-black italic tracking-widest text-white/60">{item.val}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Footer */}
                    <div className="pt-10 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-10 bg-slate-950/40 p-10 rounded-[3rem] shadow-inner mb-10">
                        <div className="flex items-center gap-6">
                            <Activity size={24} className="text-amber-500/20" />
                            <p className="text-[10px] font-black text-white/20 uppercase tracking-[0.3em] italic leading-relaxed max-w-xl">
                                {isFinancial
                                    ? 'Financial Summary: System capital is escalating. Operational friction is reducing. Net stability improving at v4.2 velocity.'
                                    : 'Growth Summary: Node occupancy is escalating. Neural satisfaction improving. Vacancy pressure near zero levels.'}
                            </p>
                        </div>
                        <div className="flex gap-6 w-full md:w-auto">
                            <button onClick={onClose} className="flex-1 px-10 py-5 rounded-2xl text-[10px] font-black uppercase tracking-[0.4em] text-white/20 hover:text-white transition-all bg-slate-950 border border-white/5 active:scale-95">
                                Dismiss Sync
                            </button>
                            <button className={`flex-1 px-10 py-5 rounded-2xl text-[10px] font-black uppercase tracking-[0.4em] text-slate-950 shadow-xl transition-all hover:scale-105 active:scale-95 ${getSidebarColor()}`}>
                                Download Archive
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
