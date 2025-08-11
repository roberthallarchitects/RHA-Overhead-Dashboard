import React, { useEffect, useMemo, useState } from "react";
import { Download, FileUp, Plus, RefreshCcw, Trash2, Users } from "lucide-react";
import * as XLSX from "xlsx";
import { motion } from "framer-motion";
import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
  Bar,
  BarChart,
} from "recharts";

// ---- Embedded seed from Excel: 6 Employees - Current (parsed) ----
const RHA_SEED = {
  roles: [
    {
      id: "pemployee-1---presid",
      title: "Employee 1 - President",
      count: 1,
      salary: 90000,
      benefitsPct: 0.25,
      utilizationPct: 0.75,
      hourlyRate: 185,
      software: [
        { name: "Autodesk Architecture Collection", yearly: 3465.0, perSeat: true },
        { name: "Sketchup Studio", yearly: 726.0, perSeat: true },
        { name: "Enscape", yearly: 958.8, perSeat: true },
        { name: "Monograph", yearly: 3600.0, perSeat: true },
        { name: "Asana", yearly: 696.0, perSeat: true },
        { name: "Adobe", yearly: 671.88, perSeat: true },
        { name: "Upcodes", yearly: 708.0, perSeat: true },
        { name: "Bluebeam", yearly: 330.0, perSeat: true },
        { name: "Dropbox", yearly: 120.0, perSeat: true },
        { name: "Pandadoc", yearly: 240.0, perSeat: true },
        { name: "Quickbooks Simple Start", yearly: 360.0, perSeat: true },
        { name: "Ring Central", yearly: 372.0, perSeat: true },
        { name: "Canva", yearly: 119.99, perSeat: true },
        { name: "Microsoft One Drive", yearly: 69.99, perSeat: true },
        { name: "Google Workspace", yearly: 0.0, perSeat: true },
        { name: "Calendly", yearly: 120.0, perSeat: true },
        { name: "Schedulicity", yearly: 228.0, perSeat: true },
        { name: "LastPass", yearly: 0.0, perSeat: true },
        { name: "Zapier", yearly: 300.0, perSeat: true },
        { name: "ChatGPT Plus", yearly: 0.0, perSeat: true },
        { name: "Dropbox Sign", yearly: 0.0, perSeat: true },
        { name: "CodeTwo", yearly: 0.0, perSeat: true },
        { name: "QuickBooks Payroll", yearly: 0.0, perSeat: true },
        { name: "HelloFax", yearly: 0.0, perSeat: true },
        { name: "Mailchimp", yearly: 0.0, perSeat: true },
        { name: "Mapsly", yearly: 0.0, perSeat: true },
        { name: "ArcSite/Measure Square", yearly: 0.0, perSeat: true },
        { name: "FreshBooks", yearly: 0.0, perSeat: true },
        { name: "NCH Express Accounts", yearly: 0.0, perSeat: true },
        { name: "Bandicam", yearly: 0.0, perSeat: true },
        { name: "Stable Diffusion", yearly: 0.0, perSeat: true },
        { name: "Autodesk Revit LT", yearly: 0.0, perSeat: true },
        { name: "Twinmotion", yearly: 0.0, perSeat: true },
        { name: "D5 Render", yearly: 0.0, perSeat: true },
        { name: "Adobe Stock", yearly: 0.0, perSeat: true },
        { name: "Frame.io", yearly: 0.0, perSeat: true },
        { name: "BentoBox", yearly: 0.0, perSeat: true },
        { name: "Squarespace", yearly: 0.0, perSeat: true },
        { name: "Wix", yearly: 0.0, perSeat: true },
        { name: "Webflow", yearly: 0.0, perSeat: true },
        { name: "Figma", yearly: 0.0, perSeat: true },
        { name: "Hootsuite", yearly: 0.0, perSeat: true },
        { name: "Buffer", yearly: 0.0, perSeat: true },
        { name: "Later", yearly: 0.0, perSeat: true },
        { name: "Sprout Social", yearly: 0.0, perSeat: true },
        { name: "Trello", yearly: 0.0, perSeat: true },
        { name: "Jira", yearly: 0.0, perSeat: true },
        { name: "Miro", yearly: 0.0, perSeat: true },
        { name: "Notion", yearly: 0.0, perSeat: true },
        { name: "Slack", yearly: 0.0, perSeat: true },
        { name: "Basecamp", yearly: 0.0, perSeat: true },
        { name: "Airtable", yearly: 0.0, perSeat: true },
        { name: "ClickUp", yearly: 0.0, perSeat: true },
        { name: "Zoho Projects", yearly: 0.0, perSeat: true },
        { name: "Monday.com", yearly: 0.0, perSeat: true },
        { name: "Qualtrics", yearly: 0.0, perSeat: true },
        { name: "Typeform", yearly: 0.0, perSeat: true }
      ]
    },
    {
      id: "employee-2---design",
      title: "Employee 2 - Designer - Carolina",
      count: 1,
      salary: 78000,
      benefitsPct: 0.25,
      utilizationPct: 0.75,
      hourlyRate: 165,
      software: [
        { name: "Autodesk Architecture Collection", yearly: 3465.0, perSeat: true },
        { name: "Sketchup Studio", yearly: 726.0, perSeat: true },
        { name: "Enscape", yearly: 959.0, perSeat: true },
        { name: "Monograph", yearly: 900.0, perSeat: true },
        { name: "Asana", yearly: 696.0, perSeat: true },
        { name: "Bluebeam", yearly: 330.0, perSeat: true },
        { name: "LastPass", yearly: 72.0, perSeat: true }
      ]
    },
    {
      id: "employee-3---design",
      title: "Employee 3 - Designer - Demetrio",
      count: 1,
      salary: 70000,
      benefitsPct: 0.25,
      utilizationPct: 0.75,
      hourlyRate: 155,
      software: [
        { name: "Autodesk Architecture Collection", yearly: 3465.0, perSeat: true },
        { name: "Sketchup Studio", yearly: 726.0, perSeat: true },
        { name: "Enscape", yearly: 959.0, perSeat: true },
        { name: "Monograph", yearly: 900.0, perSeat: true },
        { name: "Asana", yearly: 696.0, perSeat: true },
        { name: "Bluebeam", yearly: 330.0, perSeat: true },
        { name: "LastPass", yearly: 72.0, perSeat: true }
      ]
    },
    {
      id: "employee-4---senior",
      title: "Employee 4 - Senior Job Captain (Contractor)",
      count: 1,
      salary: 90000,
      benefitsPct: 0.25,
      utilizationPct: 0.75,
      hourlyRate: 175,
      software: [
        { name: "Autodesk Architecture Collection", yearly: 3465.0, perSeat: true },
        { name: "Sketchup Studio", yearly: 726.0, perSeat: true },
        { name: "Enscape", yearly: 959.0, perSeat: true },
        { name: "Monograph", yearly: 900.0, perSeat: true },
        { name: "Asana", yearly: 696.0, perSeat: true },
        { name: "Bluebeam", yearly: 330.0, perSeat: true },
        { name: "LastPass", yearly: 72.0, perSeat: true }
      ]
    },
    {
      id: "employee-5---admin-",
      title: "Employee 5 - Admin (Contractor)",
      count: 1,
      salary: 65000,
      benefitsPct: 0.25,
      utilizationPct: 0.4,
      hourlyRate: 95,
      software: [
        { name: "Monograph", yearly: 900.0, perSeat: true },
        { name: "Asana", yearly: 696.0, perSeat: true }
      ]
    },
    {
      id: "employee-6---design",
      title: "Employee 6 - Designer - Sophie",
      count: 1,
      salary: 75000,
      benefitsPct: 0.25,
      utilizationPct: 0.7,
      hourlyRate: 160,
      software: [
        { name: "Autodesk Architecture Collection", yearly: 3465.0, perSeat: true },
        { name: "Sketchup Studio", yearly: 726.0, perSeat: true },
        { name: "Enscape", yearly: 959.0, perSeat: true },
        { name: "Monograph", yearly: 900.0, perSeat: true },
        { name: "Asana", yearly: 696.0, perSeat: true }
      ]
    }
  ],
  shared: [
    { name: "Health Insurance Reimbursement", yearly: 3600.0 },
    { name: "Student Loan Assistance", yearly: 5250.0 },
    { name: "Home Office Deduction", yearly: 3000.0 },
    { name: "Vehicle Reimbursement", yearly: 1800.0 },
    { name: "401(k) - Employer", yearly: 3000.0 },
    { name: "PTO (80hrs)", yearly: 4210.53 },
    { name: "Sick Leave (40hrs)", yearly: 2105.26 },
    { name: "Holidays (11 Days = 88hrs)", yearly: 4631.58 },
    { name: "Betterment", yearly: 1260.0 },
    { name: "401(k) - Betterment", yearly: 5250.0 },
    { name: "Bonus", yearly: 5000.0 },
    { name: "Taxes", yearly: 10000.0 },
    { name: "Office & Rent", yearly: 54000.0 },
    { name: "Renters Insurance", yearly: 600.0 },
    { name: "Utilities", yearly: 2400.0 },
    { name: "Internet", yearly: 1200.0 },
    { name: "Water", yearly: 600.0 },
    { name: "Trash", yearly: 420.0 },
    { name: "Marketing", yearly: 6000.0 },
    { name: "Website & Hosting", yearly: 900.0 },
    { name: "Accounting & Legal", yearly: 3000.0 },
    { name: "Travel & Meals", yearly: 3000.0 },
    { name: "Office Supplies", yearly: 1200.0 },
    { name: "Computer & Equipment", yearly: 5000.0 },
    { name: "Training & Education", yearly: 2500.0 }
  ]
};

// --- shadcn/ui minimal stand-ins ---
const Button = ({ className = "", children, ...props }) => (
  <button className={`px-4 py-2 rounded-2xl shadow-sm font-medium transition hover:shadow-md active:scale-[.99] ${className}`} {...props}>
    {children}
  </button>
);
const Card = ({ className = "", children, ...props }) => (
  <div className={`rounded-3xl shadow-md bg-white/90 backdrop-blur p-5 ${className}`} {...props}>{children}</div>
);
const Input = ({ className = "", ...props }) => (
  <input className={`w-full px-3 py-2 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-fuchsia-400 ${className}`} {...props} />
);
const Label = ({ className = "", children }) => (
  <label className={`text-sm font-semibold text-slate-700 ${className}`}>{children}</label>
);
const Small = ({ children }) => <div className="text-xs text-slate-500">{children}</div>;
const Switch = ({ checked, onChange }) => (
  <button onClick={() => onChange(!checked)} className={`w-12 h-7 rounded-full relative transition ${checked ? "bg-emerald-500" : "bg-slate-300"}`}>
    <span className={`absolute top-1 left-1 w-5 h-5 rounded-full bg-white transition ${checked ? "translate-x-5" : "translate-x-0"}`} />
  </button>
);

// ---- Types ----
// (inline JSDoc for clarity)
/** @typedef {{ name:string; yearly:number; monthly?:number|null; perSeat:boolean }} SoftwareItem */
/** @typedef {{ id:string; title:string; count:number; salary:number; benefitsPct:number; utilizationPct:number; hourlyRate:number; software:SoftwareItem[] }} RoleConfig */
/** @typedef {{ id:string; name:string; yearly:number }} SharedCost */

// ---- Helpers ----
const currency = (n) => n.toLocaleString(undefined, { style: "currency", currency: "USD", maximumFractionDigits: 0 });
const currency0 = (n) => currency(isFinite(n) ? n : 0);
const num = (v) => (typeof v === "number" && !isNaN(v) ? v : 0);
const uid = () => Math.random().toString(36).slice(2, 9);

// Parse workbook heuristically: find column triplets [Product, Yearly Cost, Monthly Cost]
function parseWorkbook(wb) {
  const roles = [];
  const shared = [];
  const firstSheet = wb.Sheets[wb.SheetNames[0]];
  const json = XLSX.utils.sheet_to_json(firstSheet, { header: 1, raw: true });
  if (!json.length) return { roles, shared };

  const headerRowIdx = json.findIndex((row) => row.some((c, i) => String(c || "").toLowerCase() === "product" && String(row[i + 1] || "").toLowerCase().includes("yearly")));
  const header = json[headerRowIdx] || [];
  const groups = [];
  for (let i = 0; i < header.length; i++) {
    const p = String(header[i] || "").toLowerCase();
    const y = String(header[i + 1] || "").toLowerCase();
    const m = String(header[i + 2] || "").toLowerCase();
    if (p === "product" && y.includes("yearly") && m.includes("monthly")) {
      const labelCell = json[headerRowIdx - 1]?.[i] ?? json[0]?.[i] ?? `Role ${groups.length + 1}`;
      groups.push({ start: i, label: String(labelCell || `Role ${groups.length + 1}`) });
    }
  }

  for (const g of groups) {
    const softIdx = json.findIndex((row) => String(row[g.start] || "").toLowerCase() === "software");
    const items = [];
    if (softIdx !== -1) {
      for (let r = softIdx + 1; r < json.length; r++) {
        const name = json[r][g.start];
        if (!name or String(name).trim() === "" or String(name).toLowerCase().includes("overhead costs")) break;
        const yearly = Number(json[r][g.start + 1]) || 0;
        const monthly = Number(json[r][g.start + 2]) || undefined;
        items.push({ name: String(name), yearly, monthly, perSeat: true });
      }
    }

    const title = String(g.label).replace(/^P?Employee \d+\s*-\s*/i, "").replace(/\(Contractor\)/i, "Contractor").replace(/-\s*/g, " ").trim() || `Role ${roles.length + 1}`;

    roles.push({ id: uid(), title, count: 1, salary: 90000, benefitsPct: 0.25, utilizationPct: 0.75, hourlyRate: 165, software: items });
  }

  const ocRow = json.find((row) => row.some((c) => String(c || "").toLowerCase().includes("overhead costs")));
  if (ocRow) {
    const guess = ocRow.find((c) => typeof c === "number" && isFinite(c) && c > 1000);
    if (guess) shared.push({ id: uid(), name: "Other Shared Overhead (seed)", yearly: Number(guess) });
  }

  return { roles, shared };
}

export default function App() {
  const [roles, setRoles] = useState([]);
  const [shared, setShared] = useState([]);
  const [targetProfitPct, setTargetProfitPct] = useState(0.2);
  const [firmUtilizationPct, setFirmUtilizationPct] = useState(0.75);
  const [expectedBillableHoursPerFTE, setExpectedBillableHoursPerFTE] = useState(1500);
  const [themeHue, setThemeHue] = useState(280);

  useEffect(() => {
    const cached = localStorage.getItem("rha-oh-config");
    if (cached) {
      const parsed = JSON.parse(cached);
      setRoles(parsed.roles || []);
      setShared(parsed.shared || []);
      setTargetProfitPct(parsed.targetProfitPct ?? 0.2);
      setFirmUtilizationPct(parsed.firmUtilizationPct ?? 0.75);
      setExpectedBillableHoursPerFTE(parsed.expectedBillableHoursPerFTE ?? 1500);
      setThemeHue(parsed.themeHue ?? 280);
    } else {
      if (RHA_SEED?.roles?.length) setRoles(RHA_SEED.roles);
      if (RHA_SEED?.shared?.length) setShared(RHA_SEED.shared);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(
      "rha-oh-config",
      JSON.stringify({ roles, shared, targetProfitPct, firmUtilizationPct, expectedBillableHoursPerFTE, themeHue })
    );
  }, [roles, shared, targetProfitPct, firmUtilizationPct, expectedBillableHoursPerFTE, themeHue]);

  const perSeatSoftwareAnnual = (r) => r.software.reduce((sum, s) => sum + (s.perSeat ? (Number(s.yearly) || 0) : 0), 0);
  const payrollAnnual = (r) => r.count * r.salary * (1 + r.benefitsPct);
  const softwareAnnual = (r) => r.count * perSeatSoftwareAnnual(r);
  const rolesAnnualCost = roles.reduce((sum, r) => sum + payrollAnnual(r) + softwareAnnual(r), 0);
  const sharedAnnualCost = shared.reduce((sum, c) => sum + (Number(c.yearly) || 0), 0);
  const totalAnnualOverhead = rolesAnnualCost + sharedAnnualCost;
  const monthlyOverhead = totalAnnualOverhead / 12;

  const revenueCapacity = roles.reduce(
    (sum, r) => sum + r.count * r.hourlyRate * expectedBillableHoursPerFTE * Math.min(1, Math.max(0, firmUtilizationPct * r.utilizationPct)),
    0
  );

  const profitAtCapacity = revenueCapacity - totalAnnualOverhead;
  const marginAtCapacity = revenueCapacity > 0 ? profitAtCapacity / revenueCapacity : 0;

  const breakEvenRevenue = totalAnnualOverhead;
  const breakEvenMultiplierForProfit = 1 / (1 - targetProfitPct);
  const revenueNeededForTargetProfit = breakEvenRevenue * breakEvenMultiplierForProfit;

  const perFTECost = roles.length
    ? roles.reduce((sum, r) => sum + (payrollAnnual(r) + softwareAnnual(r)) / (r.count || 1), 0) / roles.length
    : 0;

  const costBreakdownData = [
    { name: "Payroll", value: Math.round(roles.reduce((s, r) => s + payrollAnnual(r), 0)) },
    { name: "Per-seat Software", value: Math.round(roles.reduce((s, r) => s + softwareAnnual(r), 0)) },
    { name: "Shared Overhead", value: Math.round(sharedAnnualCost) },
  ];

  const headcountRange = useMemo(() => {
    const totalHeads = roles.reduce((s, r) => s + r.count, 0) || 6;
    return Array.from({ length: 11 }, (_, i) => Math.max(1, totalHeads - 5 + i));
  }, [roles]);

  const profitVsHeadcount = headcountRange.map((h) => {
    const avgRole = roles[0] || { salary: 90000, benefitsPct: 0.25, software: [], hourlyRate: 165, utilizationPct: 0.75 };
    const perHeadSoftware = roles.length ? roles.reduce((s, r) => s + perSeatSoftwareAnnual(r), 0) / roles.length : 0;
    const perHeadPayroll = roles.length ? roles.reduce((s, r) => s + r.salary * (1 + r.benefitsPct), 0) / roles.length : avgRole.salary * (1 + avgRole.benefitsPct);
    const annualCost = sharedAnnualCost + h * (perHeadPayroll + perHeadSoftware);
    const annualRevenue = h * avgRole.hourlyRate * expectedBillableHoursPerFTE * firmUtilizationPct;
    return { headcount: h, revenue: Math.round(annualRevenue), costs: Math.round(annualCost), profit: Math.round(annualRevenue - annualCost) };
  });

  const onFile = async (file) => {
    const data = await file.arrayBuffer();
    const wb = XLSX.read(data);
    const parsed = parseWorkbook(wb);
    if (parsed.roles.length) setRoles(parsed.roles);
    if (parsed.shared.length) setShared(parsed.shared);
  };

  const downloadJSON = () => {
    const blob = new Blob([
      JSON.stringify({ roles, shared, targetProfitPct, firmUtilizationPct, expectedBillableHoursPerFTE, themeHue }, null, 2),
    ]);
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "rha_overhead_scenario.json";
    a.click();
    URL.revokeObjectURL(url);
  };

  const resetAll = () => {
    localStorage.removeItem("rha-oh-config");
    setRoles([]);
    setShared([]);
    setTargetProfitPct(0.2);
    setFirmUtilizationPct(0.75);
    setExpectedBillableHoursPerFTE(1500);
  };

  return (
    <div className="min-h-screen" style={{ background: `linear-gradient(135deg, hsl(${themeHue}, 85%, 94%), hsl(${(themeHue + 60) % 360}, 90%, 96%))` }}>
      <div className="mx-auto max-w-7xl px-4 py-8">
        <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <div className="flex items-center justify_between gap-4">
            <div>
              <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-fuchsia-600 to-violet-600">
                RHA Overhead & Hiring Planner
              </h1>
              <p className="text-slate-600 mt-1">Model cash flow, overhead, and hiring scenarios. Upload your Excel or use your current snapshot.</p>
            </div>
            <div className="flex items-center gap-2">
              <input type="range" min={0} max={359} value={themeHue} onChange={(e) => setThemeHue(parseInt(e.target.value))} className="w-28" title="Theme" />
              <Button className="bg-white/70 border border-slate-200" onClick={downloadJSON}><Download className="w-4 h-4 mr-2" /> Export</Button>
              <Button className="bg-white/70 border border-slate-200" onClick={resetAll}><RefreshCcw className="w-4 h-4 mr-2" /> Reset</Button>
            </div>
          </div>
        </motion_div>

        <div className="grid md:grid-cols-3 gap-5 mt-6">
          <Card className="md:col-span-1">
            <div className="flex items-center justify-between">
              <h2 className="font-semibold text-slate-800">1) Load data</h2>
            </div>
            <Small>Drop in your Excel (the current workbook layout is supported). We'll seed per-seat software and shared overhead. Or just preload your current snapshot below.</Small>
            <div className="mt-4">
              <label className="flex flex-col items-center justify-center gap-3 border-2 border-dashed border-fuchsia-300/80 rounded-2xl py-8 cursor-pointer bg-fuchsia-50/50 hover:bg-fuchsia-50">
                <FileUp className="w-6 h-6 text-fuchsia-500" />
                <span className="text-sm text-slate-600">Upload Excel (.xlsx)</span>
                <input type="file" accept=".xlsx,.xls" className="hidden" onChange={(e) => { const f = e.target.files?.[0]; if (f) onFile(f); }} />
              </label>
              <div className="flex items-center gap-2 mt-3">
                <Button className="bg-fuchsia-600 text-white" onClick={() => { setRoles(RHA_SEED.roles || []); setShared(RHA_SEED.shared || []); }}>
                  <Users className="w-4 h-4 mr-2" /> Load “6 Employees - Current”
                </Button>
                <Small>Pre-fills roles + shared costs</Small>
              </div>
            </div>

            <div className="mt-6 space-y-3">
              <div>
                <Label>Firm utilization (avg)</Label>
                <Input type="number" step="0.01" value={firmUtilizationPct} onChange={(e) => setFirmUtilizationPct(Math.max(0, Math.min(1, Number(e.target.value) || 0)))} />
                <Small>Proportion of time billable after meetings, admin, QA/QC.</Small>
              </div>
              <div>
                <Label>Billable hours per FTE (annual)</Label>
                <Input type="number" value={expectedBillableHoursPerFTE} onChange={(e) => setExpectedBillableHoursPerFTE(Math.max(0, Number(e.target.value) || 0))} />
                <Small>e.g., 1,400–1,600 depending on PTO and holidays.</Small>
              </div>
              <div>
                <Label>Target profit margin</Label>
                <Input type="number" step="0.01" value={targetProfitPct} onChange={(e) => setTargetProfitPct(Math.max(0, Math.min(0.9, Number(e.target.value) || 0)))} />
                <Small>Use 0.25–0.35 for strong profitability.</Small>
              </div>
            </div>
          </Card>

          <div className="md:col-span-2 grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            <Card className="bg-gradient-to-br from-fuchsia-50 to-white border border-fuchsia-200/60">
              <div className="text-slate-700 text-sm">Annual Overhead</div>
              <div className="text-2xl font-extrabold mt-1">{currency0(totalAnnualOverhead)}</div>
              <Small>Includes payroll, per-seat software, and shared costs.</Small>
            </Card>
            <Card className="bg-gradient-to-br from-violet-50 to-white border border-violet-200/60">
              <div className="text-slate-700 text-sm">Monthly Overhead</div>
              <div className="text-2xl font-extrabold mt-1">{currency0(monthlyOverhead)}</div>
              <Small>Quick view of monthly burn.</Small>
            </Card>
            <Card className="bg-gradient-to-br from-rose-50 to-white border border-rose-200/60">
              <div className="text-slate-700 text-sm">Revenue @ Capacity</div>
              <div className="text-2xl font-extrabold mt-1">{currency0(revenueCapacity)}</div>
              <Small>Based on role rates, billable hours, and utilization.</Small>
            </Card>
            <Card className="bg-gradient-to-br from-emerald-50 to-white border border-emerald-200/60">
              <div className="text-slate-700 text-sm">Margin @ Capacity</div>
              <div className={`text-2xl font-extrabold mt-1 ${marginAtCapacity >= 0.2 ? "text-emerald-600" : "text-rose-600"}`}>{(marginAtCapacity * 100).toFixed(1)}%</div>
              <Small>{profitAtCapacity >= 0 ? "Profitable at capacity" : "Not profitable at capacity yet"}</Small>
            </Card>

            <Card className="sm:col-span-2 bg-gradient-to-br from-sky-50 to-white border border-sky-200/60">
              <div className="text-slate-700 text-sm">Revenue Needed for Target Profit</div>
              <div className="text-2xl font-extrabold mt-1">{currency0(revenueNeededForTargetProfit)}</div>
              <Small>Break-even × {breakEvenMultiplierForProfit.toFixed(2)} to hit {(targetProfitPct * 100).toFixed(0)}% margin.</Small>
            </Card>
            <Card className="sm:col-span-2 bg-gradient-to-br from-orange-50 to-white border border-orange-200/60">
              <div className="text-slate-700 text-sm">Avg Cost per FTE (annual)</div>
              <div className="text-2xl font-extrabold mt-1">{currency0(perFTECost)}</div>
              <Small>Avg fully-loaded payroll + per-seat software.</Small>
            </Card>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-5 mt-6">
          <Card className="lg:col-span-2">
            <div className="flex items-center justify-between">
              <h2 className="font-semibold text-slate-800">2) Roles & Headcount</h2>
              <Button className="bg-fuchsia-600 text-white" onClick={() => setRoles((rs) => [...rs, { id: uid(), title: "New Role", count: 1, salary: 90000, benefitsPct: 0.25, utilizationPct: 0.75, hourlyRate: 165, software: [] }])}>
                <Plus className="w-4 h-4 mr-1" /> Add role
              </Button>
            </div>
            <div className="overflow-auto mt-4">
              <table className="min-w-full text-sm">
                <thead>
                  <tr className="text-left text-slate-600">
                    <th className="pb-2 pr-3">Role</th>
                    <th className="pb-2 pr-3">Headcount</th>
                    <th className="pb-2 pr-3">Salary</th>
                    <th className="pb-2 pr-3">Benefits %</th>
                    <th className="pb-2 pr-3">Utilization %</th>
                    <th className="pb-2 pr-3">Rate ($/hr)</th>
                    <th className="pb-2">Per-seat Software (annual)</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {roles.map((r) => (
                    <tr key={r.id} className="align-top border-t border-slate-100">
                      <td className="py-2 pr-3"><Input value={r.title} onChange={(e) => setRoles((rs) => rs.map((x) => (x.id === r.id ? { ...x, title: e.target.value } : x)))} /></td>
                      <td className="py-2 pr-3 w-24"><Input type="number" value={r.count} onChange={(e) => setRoles((rs) => rs.map((x) => (x.id === r.id ? { ...x, count: Math.max(0, Number(e.target.value) || 0) } : x)))} /></td>
                      <td className="py-2 pr-3 w-32"><Input type="number" value={r.salary} onChange={(e) => setRoles((rs) => rs.map((x) => (x.id === r.id ? { ...x, salary: Math.max(0, Number(e.target.value) || 0) } : x)))} /></td>
                      <td className="py-2 pr-3 w-28"><Input type="number" step="0.01" value={r.benefitsPct} onChange={(e) => setRoles((rs) => rs.map((x) => (x.id === r.id ? { ...x, benefitsPct: Math.max(0, Math.min(1, Number(e.target.value) || 0)) } : x)))} /></td>
                      <td className="py-2 pr-3 w-28"><Input type="number" step="0.01" value={r.utilizationPct} onChange={(e) => setRoles((rs) => rs.map((x) => (x.id === r.id ? { ...x, utilizationPct: Math.max(0, Math.min(1, Number(e.target.value) || 0)) } : x)))} /></td>
                      <td className="py-2 pr-3 w-28"><Input type="number" value={r.hourlyRate} onChange={(e) => setRoles((rs) => rs.map((x) => (x.id === r.id ? { ...x, hourlyRate: Math.max(0, Number(e.target.value) || 0) } : x)))} /></td>
                      <td className="py-2 pr-3">
                        <div className="space-y-2">
                          {r.software.map((s, i) => (
                            <div key={i} className="flex items-center gap-2">
                              <Input className="w-48" value={s.name} onChange={(e) => setRoles((rs) => rs.map((x) => (x.id === r.id ? { ...x, software: x.software.map((y, j) => (j === i ? { ...y, name: e.target.value } : y)) } : x)))} />
                              <Input className="w-28" type="number" value={s.yearly || 0} onChange={(e) => setRoles((rs) => rs.map((x) => (x.id === r.id ? { ...x, software: x.software.map((y, j) => (j === i ? { ...y, yearly: Math.max(0, Number(e.target.value) || 0) } : y)) } : x)))} />
                              <div className="flex items-center gap-2 text-xs text-slate-600">
                                <span>Per seat</span>
                                <Switch checked={s.perSeat} onChange={(v) => setRoles((rs) => rs.map((x) => (x.id === r.id ? { ...x, software: x.software.map((y, j) => (j === i ? { ...y, perSeat: v } : y)) } : x)))} />
                              </div>
                              <Button className="bg-white text-rose-600 border border-rose-200" onClick={() => setRoles((rs) => rs.map((x) => (x.id === r.id ? { ...x, software: x.software.filter((_, j) => j !== i) } : x)))}>
                                <Trash2 className="w-4 h-4" />
                              </Button>
                            </div>
                          ))}
                          <Button className="bg-white border border-slate-200" onClick={() => setRoles((rs) => rs.map((x) => (x.id === r.id ? { ...x, software: [...x.software, { name: "New Software", yearly: 0, perSeat: true }] } : x)))}>
                            <Plus className="w-4 h-4 mr-1" /> Add software
                          </Button>
                        </div>
                      </td>
                      <td className="py-2">
                        <Button className="bg-white text-rose-600 border border-rose-200" onClick={() => setRoles((rs) => rs.filter((x) => x.id !== r.id))}>
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>

          <Card className="lg:col-span-1">
            <div className="flex items-center justify-between">
              <h2 className="font-semibold text-slate-800">3) Shared Overhead</h2>
              <Button className="bg-violet-600 text-white" onClick={() => setShared((s) => [...s, { id: uid(), name: "New Shared Cost", yearly: 0 }])}>
                <Plus className="w-4 h-4 mr-1" /> Add
              </Button>
            </div>
            <Small>Firm-wide costs: rent, insurance, marketing, admin software, etc.</Small>
            <div className="space-y-3 mt-4">
              {shared.map((c) => (
                <div key={c.id || c.name} className="grid grid-cols-12 gap-2 items-center">
                  <div className="col-span-7"><Input value={c.name} onChange={(e) => setShared((ss) => ss.map((x) => (x.id === c.id ? { ...x, name: e.target.value } : x)))} /></div>
                  <div className="col-span-4"><Input type="number" value={c.yearly} onChange={(e) => setShared((ss) => ss.map((x) => (x.id === c.id ? { ...x, yearly: Math.max(0, Number(e.target.value) || 0) } : x)))} /></div>
                  <div className="col-span-1 flex justify-end"><Button className="bg-white text-rose-600 border border-rose-200" onClick={() => setShared((ss) => ss.filter((x) => x.id !== c.id))}><Trash2 className="w-4 h-4" /></Button></div>
                </div>
              ))}
            </div>
          </Card>
        </div>

        <div className="grid lg:grid-cols-2 gap-5 mt-6">
          <Card>
            <h2 className="font-semibold text-slate-800 mb-3">Cost Breakdown</h2>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={costBreakdownData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip formatter={(v) => currency0(Number(v))} />
                  <Legend />
                  <Bar dataKey="value" name="Annual $" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </Card>

          <Card>
            <h2 className="font-semibold text-slate-800 mb-3">Profit vs Headcount (what-if)</h2>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={profitVsHeadcount}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="headcount" />
                  <YAxis />
                  <Tooltip formatter={(v) => currency0(Number(v))} />
                  <Legend />
                  <Line type="monotone" dataKey="revenue" name="Revenue" dot={false} />
                  <Line type="monotone" dataKey="costs" name="Costs" dot={false} />
                  <Line type="monotone" dataKey="profit" name="Profit" dot={false} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </Card>
        </div>

        <div className="mt-8 grid md:grid-cols-3 gap-5">
          <Card className="bg-white/70 border border-slate-100">
            <h3 className="font-semibold text-slate-800">Tips</h3>
            <ul className="mt-2 text-sm text-slate-600 list-disc list-inside space-y-1">
              <li>Upload your current Excel to auto-seed roles and per-seat software.</li>
              <li>Use the <em>Per seat</em> toggle to treat licenses as per-FTE or shared.</li>
              <li>Enter shared overhead like rent, insurance, marketing, and admin tools in <strong>Shared Overhead</strong>.</li>
              <li>Adjust utilization, rates, and hours to see revenue capacity and margins.</li>
            </ul>
          </Card>
          <Card className="bg-white/70 border border-slate-100">
            <h3 className="font-semibold text-slate-800">Hiring Scenarios</h3>
            <p className="text-sm text-slate-600 mt-2">Increase a role's headcount to see overhead shift and how many dollars are needed to stay profitable. The right panel shows a what-if curve.</p>
          </Card>
          <Card className="bg-white/70 border border-slate-100">
            <h3 className="font-semibold text-slate-800">Colors & Export</h3>
            <p className="text-sm text-slate-600 mt-2">Tweak the hue slider in the header for a colorful theme. Export your scenario to JSON and reload later.</p>
          </Card>
        </div>

        <div className="h-12" />
      </div>
    </div>
  );
}
