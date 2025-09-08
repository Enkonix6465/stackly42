import React, { useEffect, useState } from "react";
import {
  FaUsers,
  FaUserPlus,
  FaChartBar,
  FaSignOutAlt,
  FaPlus,
  FaTrash,
  FaTable,
  FaRegCalendarAlt,
  FaClipboardList,
  FaDoorOpen,
  FaUserCircle,
  FaCalendarAlt,
  FaCheckCircle,
  FaEnvelopeOpenText,
  FaTicketAlt,
  FaEdit,
} from "react-icons/fa";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";
import { useNavigate } from "react-router-dom";

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#A020F0"];

const LANG_OPTIONS = [
  { value: "en", label: "English" },
  { value: "ar", label: "العربية" },
  { value: "he", label: "עברית" },
];

const translations = {
  en: {
    adminDashboard: "Admin Dashboard",
    operationsPanel: "IT Services Operations Panel",
    newUser: "New User",
    users: "Users",
    dashboard: "Dashboard",
    registrations: "Registrations",
    tickets: "Tickets",
    sessions: "Active Sessions",
    audit: "Audit Log",
    logout: "Logout",
    totalUsers: "Total Users",
    registeredToday: "Registered Today",
    thisMonth: "This Month",
    openTickets: "Open Tickets",
    userFName: "First Name",
    userLName: "Last Name",
    userEmail: "Email",
    userSignupDate: "Signup Date",
    userSignupTime: "Signup Time",
    actions: "Actions",
    deleteUser: "Delete User",
    noUsers: "No users found.",
    registrationAnalytics: "Registration Analytics",
    today: "Today",
    last7: "Last 7 Days",
    month: "This Month",
    allTime: "All-Time",
    regChartTitle: "User Registrations by Day",
    regStats: "Registration Stats",
    createUserTitle: "Register New User",
    createTicketTitle: "Create Support Ticket",
    newTicket: "New Ticket",
    supportTickets: "Support Tickets",
    ticketId: "ID",
    ticketTitle: "Title",
    ticketStatus: "Status",
    ticketAssigned: "Assigned To",
    ticketDue: "Due Date",
    ticketSubmitter: "Submitted By",
    ticketCreated: "Created",
    resolve: "Resolve",
    delete: "Delete",
    noTickets: "No tickets found.",
    registrationByDay: "Registrations by Day (last {d}d)",
    activeSessions: "Active Sessions",
    user: "User",
    email: "Email",
    loginTime: "Login Time",
    date: "Date",
    auditLog: "Audit Log",
    dateTime: "Date Time",
    action: "Action",
    by: "By",
    detail: "Details",
    noActions: "No recent actions.",
    submit: "Submit",
    cancel: "Cancel",
    register: "Register",
    firstName: "First Name",
    lastName: "Last Name",
    password: "Password",
    allFieldsReq: "All required fields must be filled.",
    emailInUse: "Email already in use.",
    langLabel: "Language",
  },
  ar: {
    adminDashboard: "لوحة المشرف",
    operationsPanel: "لوحة عمليات خدمات تكنولوجيا المعلومات",
    newUser: "مستخدم جديد",
    users: "المستخدمون",
    dashboard: "الرئيسية",
    registrations: "التسجيلات",
    tickets: "التذاكر",
    sessions: "الجلسات النشطة",
    audit: "سجل التدقيق",
    logout: "تسجيل الخروج",
    totalUsers: "إجمالي المستخدمين",
    registeredToday: "تم التسجيل اليوم",
    thisMonth: "هذا الشهر",
    openTickets: "تذاكر مفتوحة",
    userFName: "الاسم الأول",
    userLName: "اسم العائلة",
    userEmail: "البريد الإلكتروني",
    userSignupDate: "تاريخ التسجيل",
    userSignupTime: "وقت التسجيل",
    actions: "الإجراءات",
    deleteUser: "حذف المستخدم",
    noUsers: "لا يوجد مستخدمون.",
    registrationAnalytics: "تحليلات التسجيل",
    today: "اليوم",
    last7: "آخر ٧ أيام",
    month: "هذا الشهر",
    allTime: "كل الوقت",
    regChartTitle: "تسجيلات المستخدمين حسب اليوم",
    regStats: "إحصائيات التسجيل",
    createUserTitle: "تسجيل مستخدم جديد",
    createTicketTitle: "إنشاء تذكرة دعم",
    newTicket: "تذكرة جديدة",
    supportTickets: "تذاكر الدعم",
    ticketId: "المعرف",
    ticketTitle: "العنوان",
    ticketStatus: "الحالة",
    ticketAssigned: "تم إسنادها إلى",
    ticketDue: "تاريخ الاستحقاق",
    ticketSubmitter: "أرسل بواسطة",
    ticketCreated: "تم الإنشاء",
    resolve: "حل",
    delete: "حذف",
    noTickets: "لا توجد تذاكر.",
    registrationByDay: "تسجيلات حسب اليوم (آخر {d} أيام)",
    activeSessions: "الجلسات النشطة",
    user: "المستخدم",
    email: "البريد الإلكتروني",
    loginTime: "وقت تسجيل الدخول",
    date: "التاريخ",
    auditLog: "سجل التدقيق",
    dateTime: "التاريخ والوقت",
    action: "الإجراء",
    by: "بواسطة",
    detail: "تفاصيل",
    noActions: "لا توجد إجراءات حديثة.",
    submit: "إرسال",
    cancel: "إلغاء",
    register: "تسجيل",
    firstName: "الاسم الأول",
    lastName: "اسم العائلة",
    password: "كلمة المرور",
    allFieldsReq: "يجب تعبئة جميع الحقول المطلوبة.",
    emailInUse: "البريد الإلكتروني مستخدم بالفعل.",
    langLabel: "اللغة",
  },
  he: {
    adminDashboard: "לוח ניהול",
    operationsPanel: "פאנל תפעול שירותי IT",
    newUser: "משתמש חדש",
    users: "משתמשים",
    dashboard: "ראשי",
    registrations: "הרשמות",
    tickets: "קריאות תמיכה",
    sessions: "הפעלות פעילות",
    audit: "יומן ביקורת",
    logout: "יציאה מהמערכת",
    totalUsers: "סה\"כ משתמשים",
    registeredToday: "נרשמו היום",
    thisMonth: "החודש",
    openTickets: "קריאות פתוחות",
    userFName: "שם פרטי",
    userLName: "שם משפחה",
    userEmail: "דואר אלקטרוני",
    userSignupDate: "תאריך הרשמה",
    userSignupTime: "שעת הרשמה",
    actions: "פעולות",
    deleteUser: "מחק משתמש",
    noUsers: "לא נמצאו משתמשים.",
    registrationAnalytics: "אנליטיקת הרשמות",
    today: "היום",
    last7: "7 הימים האחרונים",
    month: "החודש",
    allTime: "כל הזמנים",
    regChartTitle: "הרשמות משתמשים לפי יום",
    regStats: "סטטיסטיקות הרשמה",
    createUserTitle: "רישום משתמש חדש",
    createTicketTitle: "צור קריאת תמיכה",
    newTicket: "קריאה חדשה",
    supportTickets: "קריאות תמיכה",
    ticketId: "מזהה",
    ticketTitle: "כותרת",
    ticketStatus: "סטטוס",
    ticketAssigned: "הוקצה ל",
    ticketDue: "תאריך יעד",
    ticketSubmitter: "הוגש ע\"י",
    ticketCreated: "נוצר",
    resolve: "סיים",
    delete: "מחק",
    noTickets: "לא נמצאו קריאות.",
    registrationByDay: "הרשמות לפי יום ({d} ימים)",
    activeSessions: "הפעלות פעילות",
    user: "משתמש",
    email: "דואר אלקטרוני",
    loginTime: "שעת כניסה",
    date: "תאריך",
    auditLog: "יומן ביקורת",
    dateTime: "תאריך ושעה",
    action: "פעולה",
    by: "ע\"י",
    detail: "פירוט",
    noActions: "אין פעולות אחרונות.",
    submit: "שלח",
    cancel: "בטל",
    register: "הרשם",
    firstName: "שם פרטי",
    lastName: "שם משפחה",
    password: "סיסמה",
    allFieldsReq: "יש למלא את כל השדות הדרושים.",
    emailInUse: "האימייל כבר בשימוש.",
    langLabel: "שפה",
  },
};

const getToday = () => {
  const d = new Date();
  d.setHours(0, 0, 0, 0);
  return d;
};
const dateString = (d) => (d ? d.toISOString().slice(0, 10) : "");

function saveAudit(message, performer = "System") {
  const logs = JSON.parse(localStorage.getItem("auditlog") || "[]");
  logs.unshift({ ts: new Date().toLocaleString(), msg: message, by: performer });
  localStorage.setItem("auditlog", JSON.stringify(logs));
}

function getRegistrationCounts(users, { range = "all", days = 0 } = {}) {
  const today = getToday();
  let within = (dt) => true;
  if (range === "today") within = (dt) => dt.getTime() === today.getTime();
  else if (range === "week")
    within = (dt) =>
      dt >= new Date(today.getFullYear(), today.getMonth(), today.getDate() - 6);
  else if (range === "month")
    within = (dt) => dt >= new Date(today.getFullYear(), today.getMonth(), 1);
  else if (range === "custom" && days > 0)
    within = (dt) =>
      dt >= new Date(today.getFullYear(), today.getMonth(), today.getDate() - days + 1);
  return Array.isArray(users)
    ? users.filter(
        (u) => !!u.signupDate && within(new Date(u.signupDate + "T00:00:00"))
      ).length
    : 0;
}

function getRegistrationsByDay(users, days = 30) {
  let result = {};
  if (!Array.isArray(users)) users = [];
  users.forEach((u) => {
    if (u.signupDate) result[u.signupDate] = (result[u.signupDate] || 0) + 1;
  });
  const ret = [];
  for (let i = days - 1; i >= 0; i--) {
    let d = new Date();
    d.setDate(d.getDate() - i);
    const id = dateString(d);
    ret.push({ date: id, count: result[id] || 0 });
  }
  return ret;
}

const generateTicketId = () => {
  return (
    "TCKT-" +
    Date.now().toString(36) +
    "-" +
    Math.random()
      .toString(36)
      .substr(2, 5)
      .toUpperCase()
  );
};

const STATUS_OPTIONS = [
  { value: "Pending", label: "Pending" },
  { value: "In Progress", label: "In Progress" },
  { value: "Completed", label: "Completed" },
];

const LangDropdownFixed = ({ language, setLanguage, label, dir }) => (
  <div
    style={{
      position: "fixed",
      top: 24,
      right: dir === "rtl" ? "unset" : 32,
      left: dir === "rtl" ? 32 : "unset",
      zIndex: 999,
      display: "flex",
      alignItems: "center",
      gap: 6,
      flexDirection: dir === "rtl" ? "row-reverse" : "row",
    }}
  >
    <label className="font-bold text-blue-900 mr-1" htmlFor="lang-sel">
      {label}:
    </label>
    <select
      id="lang-sel"
      className="px-2 py-1 border rounded bg-white text-blue-900 font-semibold"
      style={{ minWidth: 92, outline: 0 }}
      value={language}
      onChange={(e) => setLanguage(e.target.value)}
      title={label}
    >
      {LANG_OPTIONS.map((opt) => (
        <option key={opt.value} value={opt.value}>
          {opt.label}
        </option>
      ))}
    </select>
  </div>
);

const StatCard = ({ title, value, icon, color }) => (
  <div
    className={`flex flex-col items-center justify-center p-6 rounded-xl shadow-lg text-white ${color} transform hover:scale-105 transition-transform duration-300 ease-in-out`}
  >
    <div className="mb-3">{icon}</div>
    <h3 className="text-lg font-medium mb-1">{title}</h3>
    <p className="text-2xl font-bold">{value}</p>
  </div>
);

const StatBlock = ({ label, value, color }) => (
  <div className={`bg-white shadow p-6 rounded-lg flex-1 min-w-[220px]`}>
    <h3 className={`font-bold text-lg mb-2 ${color}`}>{label}</h3>
    <p className="text-2xl font-mono">{value}</p>
  </div>
);

const AdminDashboard = () => {
  const [language, setLanguage] = useState("en");
  const t = translations[language] || translations.en;
  const dir = ["ar", "he", "fa", "ur"].includes(language) ? "rtl" : "ltr";

  const [activeMenu, setActiveMenu] = useState("dashboard");
  const [users, setUsers] = useState([]);
  const [currentUser] = useState({
    name: "Admin",
    email: "admin@itservice.in",
    loginTime: new Date().toLocaleTimeString(),
    loginDate: new Date().toLocaleDateString(),
  });
  const [showUserForm, setShowUserForm] = useState(false);
  const [newUser, setNewUser] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [interval, setIntervalRange] = useState("month");
  const [customDays, setCustomDays] = useState(14);
  const [contactQueries, setContactQueries] = useState(() =>
    JSON.parse(localStorage.getItem("contactMessages") || "[]")
  );
  const [audit, setAudit] = useState(() =>
    JSON.parse(localStorage.getItem("auditlog") || "[]")
  );
  const [expandAudit, setExpandAudit] = useState([]);
  const [regCounts, setRegCounts] = useState({
    day: 0,
    week: 0,
    month: 0,
    all: 0,
    custom: 0,
  });

  const [tickets, setTickets] = useState(() =>
    JSON.parse(localStorage.getItem("tickets") || "[]")
  );
  const [showTicketForm, setShowTicketForm] = useState(false);
  const [ticketForm, setTicketForm] = useState({
    id: "",
    name: "",
    email: "",
    assignTo: "",
    assignDate: dateString(new Date()),
    dueDate: dateString(new Date(new Date().setDate(new Date().getDate() + 7))),
    status: "Pending",
  });
  const [editingTicketIndex, setEditingTicketIndex] = useState(null);
  const [ticketError, setTicketError] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    setUsers(JSON.parse(localStorage.getItem("users") || "[]"));
  }, [showUserForm]);

  useEffect(() => {
    setContactQueries(JSON.parse(localStorage.getItem("contactMessages") || "[]"));
  }, []);

  useEffect(() => {
    setAudit(JSON.parse(localStorage.getItem("auditlog") || "[]"));
  }, [activeMenu, showUserForm, showTicketForm]);

  useEffect(() => {
    setTickets(JSON.parse(localStorage.getItem("tickets") || "[]"));
  }, [showTicketForm]);

  useEffect(() => {
    setRegCounts({
      day: getRegistrationCounts(users, { range: "today" }),
      week: getRegistrationCounts(users, { range: "week" }),
      month: getRegistrationCounts(users, { range: "month" }),
      all: users.length,
      custom: getRegistrationCounts(users, { range: "custom", days: customDays }),
    });
  }, [users, customDays]);

  const regByDay = getRegistrationsByDay(
    users,
    interval === "custom"
      ? customDays
      : interval === "week"
      ? 7
      : interval === "month"
      ? 30
      : 365
  );

  const pieData = [
    { name: t.today, value: regCounts.day },
    { name: t.allTime, value: regCounts.all - regCounts.day },
  ];

  const toggleAuditExpand = (i) =>
    setExpandAudit(
      expandAudit.includes(i)
        ? expandAudit.filter((idx) => idx !== i)
        : [...expandAudit, i]
    );

  const handleAddUser = (e) => {
    e.preventDefault();
    if (!newUser.firstName || !newUser.email || !newUser.password) {
      setError(t.allFieldsReq);
      return;
    }
    if (users.find((u) => u.email === newUser.email)) {
      setError(t.emailInUse);
      return;
    }
    const now = new Date();
    const signupDate = dateString(now);
    const userObj = { ...newUser, signupDate, signupTime: now.toLocaleTimeString() };
    const updated = [...users, userObj];
    setUsers(updated);
    localStorage.setItem("users", JSON.stringify(updated));
    setShowUserForm(false);
    setNewUser({ firstName: "", lastName: "", email: "", password: "" });
    setError("");
    saveAudit(`Registered user ${userObj.firstName} (${userObj.email})`, currentUser.name);
  };

  const handleDeleteUser = (email) => {
    const updated = users.filter((u) => u.email !== email);
    setUsers(updated);
    localStorage.setItem("users", JSON.stringify(updated));
    saveAudit(`Deleted user with email ${email}`, currentUser.name);
    // Remove assigned tickets
    const ticketsUpdated = tickets.filter((t) => t.assignTo !== email);
    setTickets(ticketsUpdated);
    localStorage.setItem("tickets", JSON.stringify(ticketsUpdated));
  };

  const handleDeleteQuery = (index) => {
    const updated = [...contactQueries];
    const deleted = updated.splice(index, 1);
    setContactQueries(updated);
    localStorage.setItem("contactMessages", JSON.stringify(updated));
    saveAudit(`Deleted contact query from ${deleted?.name || "Unknown"}`, currentUser.name);
  };

  const handleTicketFormChange = (field, value) => {
    setTicketForm({ ...ticketForm, [field]: value });
  };

  const handleOpenTicketForm = () => {
    setEditingTicketIndex(null);
    setTicketForm({
      id: generateTicketId(),
      name: "",
      email: "",
      assignTo: users.length ? users[0].email : "",
      assignDate: dateString(new Date()),
      dueDate: dateString(new Date(new Date().setDate(new Date().getDate() + 7))),
      status: "Pending",
    });
    setShowTicketForm(true);
    setTicketError("");
  };

  const assignedUserDetails = (email) => {
    return Array.isArray(users) ? users.find((u) => u.email === email) : null;
  };

  const handleSaveTicket = (e) => {
    e.preventDefault();
    if (
      !ticketForm.name ||
      !ticketForm.email ||
      !ticketForm.assignTo ||
      !ticketForm.assignDate ||
      !ticketForm.dueDate ||
      !ticketForm.status
    ) {
      setTicketError(t.allFieldsReq);
      return;
    }
    if (editingTicketIndex !== null) {
      const updatedTickets = [...tickets];
      updatedTickets[editingTicketIndex] = { ...ticketForm };
      setTickets(updatedTickets);
      localStorage.setItem("tickets", JSON.stringify(updatedTickets));
      setShowTicketForm(false);
      setTicketError("");
      saveAudit(`Edited ticket ${ticketForm.id}`, currentUser.name);
    } else {
      const updatedTickets = [...tickets, ticketForm];
      setTickets(updatedTickets);
      localStorage.setItem("tickets", JSON.stringify(updatedTickets));
      setShowTicketForm(false);
      setTicketError("");
      saveAudit(`Created ticket ${ticketForm.id} assigned to ${ticketForm.assignTo}`, currentUser.name);
    }
  };

  const handleEditTicket = (idx) => {
    if (!tickets[idx]) return;
    setEditingTicketIndex(idx);
    setTicketForm({ ...tickets[idx] });
    setShowTicketForm(true);
    setTicketError("");
  };

  const handleDeleteTicket = (id) => {
    const idx = tickets.findIndex((t) => t.id === id);
    const deleted = tickets[idx];
    const updated = tickets.filter((t) => t.id !== id);
    setTickets(updated);
    localStorage.setItem("tickets", JSON.stringify(updated));
    saveAudit(`Deleted ticket ${deleted?.id || id}`, currentUser.name);
  };

  const sessions = [currentUser];

  const menu = [
    { key: "dashboard", name: t.dashboard, icon: <FaChartBar size={20} /> },
    { key: "users", name: t.users, icon: <FaUsers size={20} /> },
    { key: "registrations", name: t.registrations, icon: <FaUserPlus size={20} /> },
    { key: "contacts", name: t.audit, icon: <FaEnvelopeOpenText size={20} /> },
    { key: "tickets", name: t.tickets, icon: <FaTicketAlt size={20} /> },
    { key: "sessions", name: t.sessions, icon: <FaDoorOpen size={20} /> },
    { key: "audit", name: t.audit, icon: <FaTable size={20} /> },
    { key: "logout", name: t.logout, icon: <FaSignOutAlt size={20} /> },
  ];

  return (
    <div className="min-h-screen flex bg-gradient-to-tr from-blue-900 to-indigo-900 font-inter" dir={dir}>
      <LangDropdownFixed language={language} setLanguage={setLanguage} label={t.langLabel} dir={dir} />

      <aside className="w-64 min-h-screen bg-gradient-to-b from-blue-800 to-indigo-900 shadow-xl flex flex-col py-8 px-5 sticky top-0 z-40">
        <div className="text-3xl font-extrabold text-white mb-10 text-center tracking-wide">Freelancer Admin</div>
        <nav>
          <ul className="space-y-2">
            {menu.map((item) => (
              <li key={item.key}>
                <button
                  className={`flex w-full items-center p-3 rounded-lg font-semibold text-left ${
                    activeMenu === item.key
                      ? "bg-blue-700 text-white shadow"
                      : "text-gray-200 hover:bg-blue-700 hover:text-white"
                  }`}
                  onClick={() => {
                    if (item.key === "logout") {
                      localStorage.clear();
                      navigate("/login");
                      return;
                    }
                    setActiveMenu(item.key);
                  }}
                >
                  <span className="mr-3">{item.icon}</span> {item.name}
                </button>
              </li>
            ))}
          </ul>
        </nav>
      </aside>

      <main className="flex-1 p-7 bg-blue-50 min-h-screen overflow-auto">
        <header className="flex flex-col sm:flex-row justify-between items-start sm:items-center border-b pb-5 mb-5">
          <div>
            <h1 className="text-3xl font-bold text-blue-800 mb-1">{t.adminDashboard}</h1>
            <p className="text-gray-600">{t.operationsPanel}</p>
          </div>
        </header>

        {activeMenu === "dashboard" && (
          <section>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
              <StatCard title={t.totalUsers} value={users.length} icon={<FaUsers size={28} />} color="bg-blue-600" />
              <StatCard
                title={t.registeredToday}
                value={regCounts.day}
                icon={<FaUserPlus size={28} />}
                color="bg-green-600"
              />
              <StatCard title={t.thisMonth} value={regCounts.month} icon={<FaRegCalendarAlt size={28} />} color="bg-yellow-500" />
              <StatCard
                title={t.openTickets}
                value={tickets.filter((ti) => ti.status === "Open").length}
                icon={<FaClipboardList size={28} />}
                color="bg-indigo-600"
              />
            </div>

            <div className="mb-4 flex gap-3 items-center flex-wrap">
              <span className="font-semibold mr-1">{dir === "rtl" ? ":فترة المخطط" : "Chart Interval:"}</span>
              <button
                onClick={() => setIntervalRange("week")}
                className={`px-2 rounded ${interval === "week" ? "bg-blue-700 text-white" : "bg-white"}`}
              >
                {t.last7 || "Week"}
              </button>
              <button
                onClick={() => setIntervalRange("month")}
                className={`px-2 rounded ${interval === "month" ? "bg-blue-700 text-white" : "bg-white"}`}
              >
                {t.month || "Month"}
              </button>
              <button
                onClick={() => setIntervalRange("year")}
                className={`px-2 rounded ${interval === "year" ? "bg-blue-700 text-white" : "bg-white"}`}
              >
                Year
              </button>
              <button
                onClick={() => setIntervalRange("custom")}
                className={`px-2 rounded ${interval === "custom" ? "bg-blue-700 text-white" : "bg-white"}`}
              >
                Custom
              </button>
              {interval === "custom" && (
                <input
                  type="number"
                  min="2"
                  max="365"
                  value={customDays}
                  onChange={(e) => setCustomDays(+e.target.value)}
                  className="w-20 ml-2 p-1 rounded"
                />
              )}
            </div>

            <div className="grid grid-cols-1 xl:grid-cols-2 gap-10">
              <div className="bg-white shadow rounded-xl p-8 flex flex-col items-center">
                <h2 className="text-xl font-bold mb-3 text-gray-800">{t.regStats}</h2>
                <ResponsiveContainer width="100%" height={250}>
                  <PieChart>
                    <Pie
                      data={pieData}
                      dataKey="value"
                      nameKey="name"
                      cx="50%"
                      cy="50%"
                      outerRadius={90}
                      fill="#8884d8"
                      label={({ name, value, percent }) => `${name}: ${value} (${(percent * 100).toFixed(1)}%)`}
                      labelLine={false}
                    >
                      {pieData.map((entry, i) => (
                        <Cell key={i} fill={COLORS[i % COLORS.length]} />
                      ))}
                    </Pie>
                    <Legend />
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>

              <div className="bg-white shadow rounded-xl p-8 flex flex-col items-center">
                <h2 className="text-xl font-bold mb-3 text-gray-800">{t.regChartTitle}</h2>
                <ResponsiveContainer width="100%" height={250}>
                  <LineChart data={regByDay}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#c7d4ef" />
                    <XAxis dataKey="date" stroke="#8884d8" />
                    <YAxis stroke="#8884d8" />
                    <Tooltip />
                    <Line
                      type="monotone"
                      dataKey="count"
                      stroke="#3b82f6"
                      strokeWidth={3}
                      dot={{ r: 6 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
          </section>
        )}

        {activeMenu === "users" && (
          <section>
            <div className={`${dir === "rtl" ? "flex justify-start mb-4" : "flex justify-end mb-4"}`}>
              <button
                className="bg-indigo-600 text-white px-3 py-2 rounded shadow-lg flex items-center gap-2"
                onClick={() => setShowUserForm(true)}
              >
                <FaPlus /> {t.newUser}
              </button>
            </div>
            <h2 className="text-2xl font-bold mb-5 text-blue-900">{t.users}</h2>
            <div className="overflow-x-auto">
              <table className="min-w-full bg-white rounded-lg shadow-xl">
                <thead>
                  <tr>
                    <th className="px-4 py-3 text-left">{t.userFName}</th>
                    <th className="px-4 py-3 text-left">{t.userLName}</th>
                    <th className="px-4 py-3 text-left">{t.userEmail}</th>
                    <th className="px-4 py-3 text-left">{t.userSignupDate}</th>
                    <th className="px-4 py-3 text-left">{t.userSignupTime}</th>
                    <th className="px-4 py-3">{t.actions}</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((u) => (
                    <tr key={u.email} className="border-t hover:bg-blue-50">
                      <td className="px-4 py-2">{u.firstName}</td>
                      <td className="px-4 py-2">{u.lastName}</td>
                      <td className="px-4 py-2">{u.email}</td>
                      <td className="px-4 py-2">{u.signupDate || "—"}</td>
                      <td className="px-4 py-2">{u.signupTime || "—"}</td>
                      <td className="px-4 py-2">
                        <button
                          className="ml-2 text-red-600 hover:text-red-900"
                          onClick={() => handleDeleteUser(u.email)}
                          title={t.deleteUser}
                        >
                          <FaTrash />
                        </button>
                      </td>
                    </tr>
                  ))}
                  {users.length === 0 && (
                    <tr>
                      <td colSpan={6} className="p-4 text-center text-gray-400">
                        {t.noUsers}
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </section>
        )}

        {activeMenu === "contacts" && (
          <section>
            <h2 className="text-2xl font-bold mb-5 text-blue-900">{t.audit}</h2>
            <div className="overflow-x-auto">
              <table className="min-w-full bg-white rounded shadow-md text-sm">
                <thead>
                  <tr>
                    <th className="px-3 py-2 text-left">Name</th>
                    <th className="px-3 py-2 text-left">Email</th>
                    <th className="px-3 py-2 text-left">Subject</th>
                    <th className="px-3 py-2 text-left">Message</th>
                    <th className="px-3 py-2 text-left">Date & Time</th>
                    <th className="px-3 py-2 text-left">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {contactQueries.map((cq, idx) => (
                    <tr key={idx} className="border-t hover:bg-blue-50">
                      <td className="px-3 py-2">{cq.name || "N/A"}</td>
                      <td className="px-3 py-2">{cq.email || "N/A"}</td>
                      <td className="px-3 py-2">{cq.subject || "N/A"}</td>
                      <td className="px-3 py-2 max-w-xs truncate" title={cq.message}>
                        {cq.message || "N/A"}
                      </td>
                      <td className="px-3 py-2">{cq.timestamp || "Unknown"}</td>
                      <td className="px-3 py-2">
                        <button
                          className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-700"
                          onClick={() => handleDeleteQuery(idx)}
                          title="Delete Query"
                        >
                          <FaTrash />
                        </button>
                      </td>
                    </tr>
                  ))}
                  {contactQueries.length === 0 && (
                    <tr>
                      <td colSpan={6} className="text-center text-gray-400 py-4">
                        No contact queries found.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </section>
        )}

        {activeMenu === "registrations" && (
          <section>
            <h2 className="text-2xl font-bold mb-5 text-blue-900">{t.registrationAnalytics}</h2>
            <div className="flex flex-wrap gap-6 mb-7">
              <StatBlock label={t.today} value={regCounts.day} color="text-blue-500" />
              <StatBlock label={t.last7} value={regCounts.week} color="text-green-600" />
              <StatBlock label={t.month} value={regCounts.month} color="text-indigo-600" />
              <StatBlock label={t.allTime} value={regCounts.all} color="text-gray-800" />
            </div>
            <div className="bg-white shadow rounded-lg p-8">
              <h3 className="mb-3 font-semibold text-blue-700">
                {t.registrationByDay.replace(
                  "{d}",
                  interval === "custom" ? customDays : interval === "week" ? 7 : interval === "month" ? 30 : 365
                )}
              </h3>
              <ResponsiveContainer width="100%" height={240}>
                <LineChart data={regByDay}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
                  <XAxis dataKey="date" stroke="#3b82f6" />
                  <YAxis stroke="#3b82f6" />
                  <Tooltip />
                  <Line type="monotone" dataKey="count" stroke="#3b82f6" strokeWidth={3} dot={{ r: 4 }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </section>
        )}

        {activeMenu === "tickets" && (
          <section>
            <div className={`${dir === "rtl" ? "flex justify-start mb-4" : "flex justify-end mb-4"}`}>
              <button
                className="bg-green-600 text-white px-3 py-2 rounded shadow-lg flex items-center gap-2"
                onClick={handleOpenTicketForm}
              >
                <FaPlus /> {t.newTicket}
              </button>
            </div>
            <h2 className="text-2xl font-bold mb-5 text-blue-900">{t.supportTickets}</h2>
            <div className="overflow-x-auto">
              <table className="min-w-full bg-white rounded shadow-md text-sm">
                <thead>
                  <tr>
                    <th className="px-3 py-2 text-left">{t.ticketId}</th>
                    <th className="px-3 py-2 text-left">{t.ticketTitle}</th>
                    <th className="px-3 py-2 text-left">{t.ticketStatus}</th>
                    <th className="px-3 py-2 text-left">{t.ticketAssigned}</th>
                    <th className="px-3 py-2 text-left">{t.ticketDue}</th>
                    <th className="px-3 py-2 text-left">{t.ticketSubmitter}</th>
                    <th className="px-3 py-2 text-left">{t.ticketCreated}</th>
                    <th className="px-3 py-2"></th>
                  </tr>
                </thead>
                <tbody>
                  {tickets.map((ticket, idx) => {
                    const assignee = assignedUserDetails(ticket.assignTo);
                    return (
                      <tr key={ticket.id} className="border-t hover:bg-blue-50">
                        <td className="px-3 py-2 font-mono">{ticket.id || "—"}</td>
                        <td className="px-3 py-2">{ticket.name || "—"}</td>
                        <td className="px-3 py-2">
                          <span
                            className={
                              ticket.status === "Completed"
                                ? "text-green-700 font-semibold"
                                : ticket.status === "In Progress"
                                ? "text-yellow-700 font-semibold"
                                : "text-gray-700 font-semibold"
                            }
                          >
                            {ticket.status}
                          </span>
                        </td>
                        <td className="px-3 py-2">
                          {assignee
                            ? `${assignee.firstName || ""} ${assignee.lastName || ""} (${assignee.email})`
                            : ticket.assignTo || "—"}
                        </td>
                        <td className="px-3 py-2">{ticket.assignDate || "—"}</td>
                        <td className="px-3 py-2">{ticket.dueDate || "—"}</td>
                        <td className="px-3 py-2">{ticket.email || "—"}</td>
                        <td className="px-3 py-2 flex gap-2">
                          <button
                            className="bg-indigo-500 text-white p-1 rounded hover:bg-indigo-700"
                            onClick={() => handleEditTicket(idx)}
                            title="Edit Ticket"
                          >
                            <FaEdit />
                          </button>
                          <button
                            className="bg-red-500 text-white p-1 rounded hover:bg-red-700"
                            onClick={() => handleDeleteTicket(ticket.id)}
                            title="Delete Ticket"
                          >
                            <FaTrash />
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                  {(tickets.length === 0 || !Array.isArray(tickets)) && (
                    <tr>
                      <td colSpan={8} className="text-center text-gray-400 py-4">
                        {t.noTickets}
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </section>
        )}

        {activeMenu === "sessions" && (
          <section>
            <h2 className="text-2xl font-bold mb-5 text-blue-900">{t.activeSessions}</h2>
            <div className="bg-gradient-to-r from-blue-100 to-indigo-200 rounded-2xl shadow-lg p-6 max-w-lg border-l-4 border-blue-500">
              <table className="w-full text-left">
                <thead>
                  <tr>
                    <th></th>
                    <th>{t.user}</th>
                    <th>{t.email}</th>
                    <th>{t.loginTime}</th>
                    <th>{t.date}</th>
                  </tr>
                </thead>
                <tbody>
                  {sessions.map((s) => (
                    <tr key={s.email}>
                      <td className="py-2">
                        <FaCheckCircle className="text-green-500 mr-2" title="Online" />
                      </td>
                      <td className="py-2 flex items-center">
                        <FaUserCircle className="text-gray-500 mr-1 text-xl" /> {s.name}
                      </td>
                      <td className="py-2">{s.email}</td>
                      <td className="py-2">{s.loginTime}</td>
                      <td className="py-2">{s.loginDate}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        )}

        {activeMenu === "audit" && (
          <section>
            <h2 className="text-2xl font-bold mb-5 text-blue-900">{t.auditLog}</h2>
            <div className="bg-white shadow-md rounded-lg p-5 max-w-2xl w-full">
              <table className="w-full text-left text-sm">
                <thead>
                  <tr>
                    <th>{t.dateTime}</th>
                    <th>{t.action}</th>
                    <th>{t.by}</th>
                    <th>+</th>
                  </tr>
                </thead>
                <tbody>
                  {audit.map((a, i) => (
                    <React.Fragment key={i}>
                      <tr>
                        <td className="p-2">{a.ts}</td>
                        <td className="p-2">
                          <span
                            className={`badge ${
                              /deleted|delete/i.test(a.msg)
                                ? "bg-red-200"
                                : /register|new|created/i.test(a.msg)
                                ? "bg-green-200"
                                : "bg-blue-200"
                            } text-gray-900`}
                          >
                            {a.msg.length > 32 ? a.msg.slice(0, 32) + "..." : a.msg}
                          </span>
                        </td>
                        <td className="p-2">{a.by}</td>
                        <td className="p-2">
                          <button className="text-blue-600 font-bold" onClick={() => toggleAuditExpand(i)}>
                            {expandAudit.includes(i) ? "-" : "+"}
                          </button>
                        </td>
                      </tr>
                      {expandAudit.includes(i) && (
                        <tr>
                          <td colSpan={4} className="p-2 bg-blue-50 text-sm">
                            <span className="font-semibold">{t.detail}:</span> {a.msg}
                          </td>
                        </tr>
                      )}
                    </React.Fragment>
                  ))}
                  {audit.length === 0 && (
                    <tr>
                      <td colSpan={4} className="text-center text-gray-400 py-4">
                        {t.noActions}
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </section>
        )}

        {showUserForm && (
          <div className="fixed inset-0 z-50 bg-black bg-opacity-30 flex items-center justify-center">
            <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md mx-3 relative">
              <h2 className="text-2xl font-bold mb-5">{t.createUserTitle}</h2>
              {error && <div className="text-red-600 mb-2">{error}</div>}
              <form onSubmit={handleAddUser} className="space-y-3">
                <input
                  type="text"
                  className="w-full border p-2 rounded"
                  placeholder={t.firstName}
                  value={newUser.firstName}
                  onChange={(e) => setNewUser({ ...newUser, firstName: e.target.value })}
                />
                <input
                  type="text"
                  className="w-full border p-2 rounded"
                  placeholder={t.lastName}
                  value={newUser.lastName}
                  onChange={(e) => setNewUser({ ...newUser, lastName: e.target.value })}
                />
                <input
                  type="email"
                  className="w-full border p-2 rounded"
                  placeholder={t.email}
                  value={newUser.email}
                  onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
                />
                <input
                  type="password"
                  className="w-full border p-2 rounded"
                  placeholder={t.password}
                  value={newUser.password}
                  onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
                />
                <div className="flex gap-3 justify-end mt-4">
                  <button
                    type="submit"
                    className="px-5 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 font-semibold"
                  >
                    {t.register}
                  </button>
                  <button
                    type="button"
                    className="px-5 py-2 bg-red-600 text-white rounded hover:bg-red-700 font-semibold"
                    onClick={() => {
                      setShowUserForm(false);
                      setError("");
                    }}
                  >
                    {t.cancel}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {showTicketForm && (
          <div className="fixed inset-0 z-50 bg-black bg-opacity-30 flex items-center justify-center">
            <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md mx-3 relative">
              <h2 className="text-2xl font-bold mb-5">
                {editingTicketIndex !== null ? "Edit Ticket" : t.createTicketTitle}
              </h2>
              {ticketError && <div className="text-red-600 mb-2">{ticketError}</div>}
              <form onSubmit={handleSaveTicket} className="space-y-3">
                <label className="block mb-1">{t.ticketId}</label>
                <input
                  type="text"
                  className="w-full border p-2 rounded bg-gray-100 font-mono"
                  value={ticketForm.id}
                  readOnly
                />
                <label className="block mb-1">{t.ticketTitle}</label>
                <input
                  type="text"
                  className="w-full border p-2 rounded"
                  placeholder={t.ticketTitle}
                  value={ticketForm.name}
                  onChange={(e) => handleTicketFormChange("name", e.target.value)}
                />
                <label className="block mb-1">{t.email}</label>
                <input
                  type="email"
                  className="w-full border p-2 rounded"
                  placeholder={t.email}
                  value={ticketForm.email}
                  onChange={(e) => handleTicketFormChange("email", e.target.value)}
                />
                <label className="block mb-1">{t.ticketAssigned}</label>
                <select
                  className="w-full border p-2 rounded"
                  value={ticketForm.assignTo}
                  onChange={(e) => handleTicketFormChange("assignTo", e.target.value)}
                >
                  {users.map((u) => (
                    <option key={u.email} value={u.email}>
                      {u.firstName} {u.lastName} ({u.email})
                    </option>
                  ))}
                  {users.length === 0 && <option value="">{t.noUsers}</option>}
                </select>
                <label className="block mb-1">{t.ticketDue}</label>
                <input
                  type="date"
                  className="w-full border p-2 rounded"
                  value={ticketForm.dueDate}
                  onChange={(e) => handleTicketFormChange("dueDate", e.target.value)}
                />
                <label className="block mb-1">{t.ticketStatus}</label>
                <select
                  className="w-full border p-2 rounded"
                  value={ticketForm.status}
                  onChange={(e) => handleTicketFormChange("status", e.target.value)}
                >
                  {STATUS_OPTIONS.map((opt) => (
                    <option key={opt.value} value={opt.value}>
                      {opt.label}
                    </option>
                  ))}
                </select>
                <div className="flex gap-3 justify-end mt-4">
                  <button
                    type="submit"
                    className="px-5 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 font-semibold"
                  >
                    {editingTicketIndex !== null ? "Save Changes" : t.submit}
                  </button>
                  <button
                    type="button"
                    className="px-5 py-2 bg-red-600 text-white rounded hover:bg-red-700 font-semibold"
                    onClick={() => {
                      setShowTicketForm(false);
                      setTicketError("");
                    }}
                  >
                    {t.cancel}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default AdminDashboard;
