export const DASHBOARD_STATS = [
    {
        title: "Total Threats Prevented",
        value: "1.2M+",
        change: "+12.5%",
        trend: "up",
        description: "Across all nodes"
    },
    {
        title: "System Health",
        value: "99.98%",
        change: "+0.02%",
        trend: "up",
        description: "Average uptime"
    },
    {
        title: "Active Users",
        value: "45.2K",
        change: "-2.1%",
        trend: "down",
        description: "Global enterprise users"
    },
    {
        title: "Avg Response Time",
        value: "14ms",
        change: "stable",
        trend: "stable",
        description: "Lower is better"
    }
];

export const RECENT_LOGS = [
    {
        id: "LOG-001",
        timestamp: "2024-03-03 10:45:00",
        event: "SQL Injection Attempt",
        source: "203.0.113.42",
        status: "Blocked",
        severity: "High"
    },
    {
        id: "LOG-002",
        timestamp: "2024-03-03 10:42:15",
        event: "Brute Force Attack",
        source: "198.51.100.12",
        status: "Mitigated",
        severity: "Medium"
    },
    {
        id: "LOG-003",
        timestamp: "2024-03-03 10:38:50",
        event: "Unauthorized API Access",
        source: "45.79.123.8",
        status: "Flagged",
        severity: "Critical"
    },
    {
        id: "LOG-004",
        timestamp: "2024-03-03 10:35:12",
        event: "Anomaly in Traffic Patterns",
        source: "Internal-Node-04",
        status: "Investigating",
        severity: "Low"
    }
];

export const CHART_DATA = [
    { name: "00:00", threats: 400, blocked: 240 },
    { name: "04:00", threats: 300, blocked: 139 },
    { name: "08:00", threats: 600, blocked: 980 },
    { name: "12:00", threats: 800, blocked: 390 },
    { name: "16:00", threats: 200, blocked: 480 },
    { name: "20:00", threats: 900, blocked: 380 },
    { name: "23:59", threats: 400, blocked: 430 }
];

export const RISK_LEVELS = [
    { country: "USA", level: 20 },
    { country: "Germany", level: 15 },
    { country: "China", level: 65 },
    { country: "Russia", level: 80 },
    { country: "Brazil", level: 45 }
];

export const SOC_STATS = [
    { label: "Active Threats", value: 142, trend: 12, trendUp: true, icon: "AlertCircle" },
    { label: "High Risk Incidents", value: 18, trend: 5, trendUp: false, icon: "Zap" },
    { label: "Failed Logins", value: 1204, trend: 18, trendUp: true, icon: "UserX" },
    { label: "System Health", value: 98.2, unit: "%", trend: 0, trendUp: true, icon: "Activity" },
    { label: "Compliance Score", value: 94, unit: "%", trend: 2, trendUp: false, icon: "ShieldCheck" },
];

export const SEVERITY_DATA = [
    { name: "Critical", value: 12, color: "#EF4444" },
    { name: "High", value: 28, color: "#F97316" },
    { name: "Medium", value: 45, color: "#3B82F6" },
    { name: "Low", value: 62, color: "#10B981" },
];

export const LIVE_FEED = [
    { id: "T-8901", type: "SQL Injection", asset: "Core Banking API", severity: "Critical", status: "Blocked", time: "14:22:01" },
    { id: "T-8902", type: "Brute Force", asset: "Admin Portal", severity: "High", status: "Investigating", time: "14:21:45" },
    { id: "T-8903", type: "DDoS Attempt", asset: "Public Gateway", severity: "High", status: "Mitigated", time: "14:20:12" },
    { id: "T-8904", type: "Malware Phishing", asset: "Employee Terminal", severity: "Medium", status: "Quarantined", time: "14:18:33" },
    { id: "T-8905", type: "Unauthorized Access", asset: "SWIFT Node 4", severity: "Critical", status: "Alerted", time: "14:15:09" },
];

export const TRANSACTION_ANOMALIES = [
    { time: "11:00", normal: 4200, anomalous: 200 },
    { time: "12:00", normal: 5500, anomalous: 150 },
    { time: "13:00", normal: 4800, anomalous: 800 },
    { time: "14:00", normal: 6100, anomalous: 300 },
    { time: "15:00", normal: 5200, anomalous: 250 },
];

export const RISK_HEATMAP = [
    { sector: "Retail", scores: [56, 85, 44, 52, 67] },
    { sector: "Corporate", scores: [57, 41, 24, 26, 94] },
    { sector: "Wealth", scores: [36, 18, 99, 67, 84] },
    { sector: "Treasury", scores: [13, 34, 18, 63, 51] },
];

export const HEALTH_PULSE = [
    { name: "Core API Gateway", status: "Optimal", health: 100, load: 12 },
    { name: "Database Cluster [EU-WEST]", status: "Degraded", health: 88, load: 88 },
    { name: "Identity Provider (IAM)", status: "Optimal", health: 100, load: 24 },
    { name: "Transaction Engine", status: "Critical", health: 45, load: 94 },
];

export const INCIDENTS_DATA = [
    {
        id: "INC-9482",
        summary: "Unauthorized SQL Injection Attempt",
        category: "Database Security",
        date: "2024-05-20 14:22:01",
        priority: "Critical",
        status: "Under Investigation",
        analyst: "Marcus Chen",
        description: "Multiple failed attempts to inject malicious SQL scripts into the main production customer database detected from IP 192.168.1.105.",
        evidence: {
            sourceIp: "192.168.1.105",
            target: "MSSQL-PROD-01",
            payload: "SELECT * FROM users WHERE '1'='1'"
        }
    },
    {
        id: "INC-9479",
        summary: "Brute Force Attack on Admin Panel",
        category: "Access Control",
        date: "2024-05-20 13:45:12",
        priority: "High",
        status: "Open",
        analyst: "Sarah Jenkins"
    },
    {
        id: "INC-9475",
        summary: "DDoS Mitigation Triggered",
        category: "Network Defense",
        date: "2024-05-20 11:30:45",
        priority: "High",
        status: "Resolved",
        analyst: "David Kim"
    },
    {
        id: "INC-9470",
        summary: "Anomalous Data Egress Detected",
        category: "Data Loss Prevention",
        date: "2024-05-20 10:15:22",
        priority: "Critical",
        status: "Under Investigation",
        analyst: "Marcus Chen"
    },
    {
        id: "INC-9465",
        summary: "Legacy System Vulnerability Ping",
        category: "Vulnerability Scanning",
        date: "2024-05-20 09:05:00",
        priority: "Low",
        status: "Resolved",
        analyst: "Sarah Jenkins"
    }
];

export const VULNERABILITY_MATRIX = [
    { asset: "Central DB Cluster", category: "SQL Injection", score: 9.4, status: "Critical", lastVerified: "2h ago" },
    { asset: "Public API Gateway", category: "DDoS Sensitivity", score: 6.2, status: "In Progress", lastVerified: "4h ago" },
    { asset: "Employee Portal", category: "XSS Vulnerability", score: 4.5, status: "Mitigated", lastVerified: "1d ago" },
    { asset: "Backoffice VPN", category: "Weak Auth", score: 8.1, status: "Critical", lastVerified: "6h ago" },
    { asset: "Customer Mobile App", category: "Data Leaks", score: 3.1, status: "Mitigated", lastVerified: "2d ago" }
];

export const RISK_BREAKDOWN = [
    { name: "Credential Stuffing", probability: 88, recommendedAction: "Enable mandatory hardware-key MFA for all privileged accounts and rotate gateway secrets." },
    { name: "Outdated Encryption Protocols", probability: 45 },
    { name: "Cross-Border Transaction Anomaly", probability: 62 }
];

export const PREDICTIVE_RISK_DATA = [
    { month: "Jan", institutional: 45, sectorAvg: 40 },
    { month: "Feb", institutional: 52, sectorAvg: 42 },
    { month: "Mar", institutional: 48, sectorAvg: 45 },
    { month: "Apr", institutional: 61, sectorAvg: 48 },
    { month: "May", institutional: 55, sectorAvg: 46 },
    { month: "Jun", institutional: 65, sectorAvg: 50 },
];

export const COMPLIANCE_SCORES = [
    { name: "GDPR (GLOBAL PRIVACY)", score: 94, trend: "+1.2%", status: "Certified" },
    { name: "PCI-DSS (PAYMENTS)", score: 100, trend: "Stable", status: "Certified" },
    { name: "SOX (FINANCIAL REPORTING)", score: 82, trend: "-4.5%", status: "Certified" },
    { name: "ISO 27001 (SECURITY)", score: 68, trend: "+0.8%", status: "At Risk" },
];

export const AUDIT_LOGS = [
    { id: "LOG-99210", timestamp: "2024-05-20 14:22:11", user: "admin_jwillliams", event: "RBAC Role Modified", severity: "High", domain: "SOX", integrity: "Verified" },
    { id: "LOG-99209", timestamp: "2024-05-20 14:15:05", user: "svc_gateway_01", event: "API Key Rotation", severity: "Info", domain: "ISO 27001", integrity: "Verified" },
    { id: "LOG-99208", timestamp: "2024-05-20 13:58:44", user: "system_root", event: "Database Policy Update", severity: "Critical", domain: "GDPR", integrity: "Verified" },
    { id: "LOG-99207", timestamp: "2024-05-20 13:42:19", user: "analyst_mchen", event: "Report Exported", severity: "Info", domain: "PCI-DSS", integrity: "Verified" },
    { id: "LOG-99206", timestamp: "2024-05-20 13:30:02", user: "unknown_proxy", event: "Failed Root Auth Attempt", severity: "Critical", domain: "Global", integrity: "Tampered" },
];

export const IAM_USERS = [
    { name: "Robert Fox", email: "rfox@cybershield.io", role: "Global Admin", auth: "Biometric (FaceID)", status: "Safe", avatar: "RF" },
    { name: "Arlene McCoy", email: "amccoy@cybershield.io", role: "Compliance Auditor", auth: "Hardware Key (Yubico)", status: "Safe", avatar: "AM" },
    { name: "Jerome Bell", email: "jbell@cybershield.io", role: "Incident Responder", auth: "TOTP (Auth App)", status: "Caution", avatar: "JB" },
    { name: "Theresa Webb", email: "twebb@cybershield.io", role: "Platform Engineer", auth: "TOTP (Auth App)", status: "Safe", avatar: "TW" },
    { name: "Wade Warren", email: "wwarren@cybershield.io", role: "Security Architect", auth: "FIDO2", status: "Suspicious", avatar: "WW" },
];

export const PERMISSION_MATRIX = [
    {
        group: "THREAT INTELLIGENCE", items: [
            { name: "View Threat Feed", enabled: true, mfa: true },
            { name: "Manage Indicators", enabled: true, mfa: false },
            { name: "Delete Intelligence", enabled: false, mfa: true },
        ]
    },
    {
        group: "FINANCIAL RECORDS", items: [
            { name: "Access Swift Logs", enabled: false, mfa: true },
            { name: "Flag Transactions", enabled: true, mfa: true },
        ]
    }
];
