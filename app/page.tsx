'use client';

import React, { useState, useEffect } from 'react';
import {
  BookOpen, Calendar, Calculator, Users, Bell,
  Star, FileText, Zap, ChevronRight, Award,
  Menu, X, Lock, Download, MessageSquare, Clock, DollarSign, Eye, Play, Sparkles, TrendingUp, Shield, Plus, CheckCircle, Key, ExternalLink, RefreshCw, Search, Briefcase, Compass, CheckSquare, ShoppingCart, Send, Info
} from 'lucide-react';

// --- INTERFACES ---
interface StudentProfile {
  username: string;
  fullName: string;
  school: string;
  grade: string;
  isPremium: boolean;
}

interface PaperItem {
  id: number;
  title: string;
  board: string;
  type: string;
  year: number;
  url: string;
  content: string;
}

interface ScholarshipItem {
  id: number;
  title: string;
  amount: string;
  deadline: string;
  eligibility: string;
  description: string;
  url: string;
}

interface StudyPlanItem {
  id: number;
  task: string;
  completed: boolean;
}

interface AffiliateItem {
  id: number;
  category: string;
  title: string;
  desc: string;
  link: string;
  rating: string;
  price: string;
}

interface MockTest {
  id: string;
  title: string;
  questions: Array<{
    q: string;
    options: string[];
    correct: string;
  }>;
  price: number;
}

// Helper to download files
const triggerDownload = (filename: string, content: string) => {
  const element = document.createElement('a');
  element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(content));
  element.setAttribute('download', filename);
  element.style.display = 'none';
  document.body.appendChild(element);
  element.click();
  document.body.removeChild(element);
};

export default function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isPremium, setIsPremium] = useState(false);
  const [showPremiumModal, setShowPremiumModal] = useState(false);
  const [isStudentLoggedIn, setIsStudentLoggedIn] = useState(true);
  const [authMode, setAuthMode] = useState('login');

  const CURRENT_DATE = new Date("2026-06-09");

  const [studentProfile, setStudentProfile] = useState<StudentProfile>({
    username: 'rahul_nair',
    fullName: 'Rahul Nair',
    school: 'Government Model Boys Higher Secondary School, Trivandrum',
    grade: 'Plus Two Science',
    isPremium: false
  });

  const [loginForm, setLoginForm] = useState({ username: '', password: '' });
  const [registerForm, setRegisterForm] = useState({ username: '', fullName: '', school: '', grade: 'Plus Two Science', password: '' });
  const [premiumForm, setPremiumForm] = useState({ parentPhone: '', studentPhone: '', paymentMethod: 'upi', parentConsent: false });

  const [ownerName] = useState("Edunexa Director");
  const [ownerKey] = useState("owner2026");
  const [enteredKey, setEnteredKey] = useState("");
  const [isOwnerAuthenticated, setIsOwnerAuthenticated] = useState(false);
  const [authError, setAuthError] = useState("");
  const [secretClicks, setSecretClicks] = useState(0);

  const [visitorCount, setVisitorCount] = useState(1420);
  const [cpmRate, setCpmRate] = useState(250.00);
  const [premiumPrice] = useState(299);
  const [adsenseId, setAdsenseId] = useState("ca-pub-9876543210987654");

  const [adImpressions, setAdImpressions] = useState(3840);
  const [adEarnings, setAdEarnings] = useState(960.00);
  const [premiumRevenue, setPremiumRevenue] = useState(598.00);
  const [serviceFeeRevenue, setServiceFeeRevenue] = useState(98.00);

  const [toast, setToast] = useState({ show: false, message: '', type: 'success' as 'success' | 'error' | 'info' });
  
  const triggerToast = (message: string, type: 'success' | 'error' | 'info' = 'success') => {
    setToast({ show: true, message, type });
    setTimeout(() => { setToast({ show: false, message: '', type: 'success' }); }, 4000);
  };

  const handleSecretClick = () => {
    setSecretClicks(prev => {
      const nextClicks = prev + 1;
      if (nextClicks >= 5) {
        setActiveTab('operator-login');
        setIsOwnerAuthenticated(false);
        triggerToast("🤫 Secret Operator Access Room Discovered!", "info");
        return 0;
      }
      return nextClicks;
    });
  };

  useEffect(() => {
    if (secretClicks === 0) return;
    const timeout = setTimeout(() => { setSecretClicks(0); }, 3000);
    return () => clearTimeout(timeout);
  }, [secretClicks]);

  useEffect(() => {
    const interval = setInterval(() => {
      if (!isPremium) {
        setAdImpressions(prev => {
          const nextImp = prev + Math.floor(Math.random() * 5) + 1;
          setAdEarnings(Number(((nextImp * cpmRate) / 1000).toFixed(2)));
          return nextImp;
        });
      }
    }, 8000);
    return () => clearInterval(interval);
  }, [cpmRate, isPremium]);

  const [countdownSubject, setCountdownSubject] = useState('physics');
  const [customExamDate, setCustomExamDate] = useState('2027-03-24');
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, mins: 0, secs: 0 });

  const examSchedules = {
    physics: { name: "Plus Two Physics (DHSE Board Exam)", date: "March 10, 2027 09:30:00" },
    math: { name: "SSLC Mathematics (Kerala State Syllabus)", date: "March 15, 2027 09:30:00" },
    chemistry: { name: "Plus One Chemistry (DHSE Model Exam)", date: "March 18, 2027 09:30:00" },
    custom: { name: "My Custom Study Goal Target", date: `${customExamDate} 09:30:00` }
  };

  useEffect(() => {
    const updateCountdown = () => {
      const activeSchedule = examSchedules[countdownSubject as keyof typeof examSchedules] || examSchedules.physics;
      const targetTime = new Date(activeSchedule.date).getTime();
      const now = new Date().getTime();
      const difference = targetTime - now;

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          mins: Math.floor((difference / 1000 / 60) % 60),
          secs: Math.floor((difference / 1000) % 60)
        });
      }
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);
    return () => clearInterval(interval);
  }, [countdownSubject, customExamDate]);

  const [syllabusWikiSearch, setSyllabusWikiSearch] = useState('');
  const syllabusWikiLinks = [
    { name: "Electromagnetic Induction", url: "https://en.wikipedia.org/wiki/Electromagnetic_induction", subject: "Physics" },
    { name: "Bohr Model of the Atom", url: "https://en.wikipedia.org/wiki/Bohr_model", subject: "Physics" },
    { name: "Arithmetic Progression", url: "https://en.wikipedia.org/wiki/Arithmetic_progression", subject: "Mathematics" },
    { name: "Quadratic Equation Concepts", url: "https://en.wikipedia.org/wiki/Quadratic_equation", subject: "Mathematics" },
    { name: "Chemical Thermodynamics", url: "https://en.wikipedia.org/wiki/Chemical_thermodynamics", subject: "Chemistry" },
  ];

  const filteredWikiLinks = syllabusWikiLinks.filter(link =>
    link.name.toLowerCase().includes(syllabusWikiSearch.toLowerCase()) ||
    link.subject.toLowerCase().includes(syllabusWikiSearch.toLowerCase())
  );

  const [papers, setPapers] = useState<PaperItem[]>([
    {
      id: 1,
      title: 'Plus Two Physics Previous Year Exam Paper',
      board: 'HSSLive Kerala / DHSE',
      type: 'Standard',
      year: 2024,
      url: 'https://www.hsslive.in/',
      content: 'DHSE KERALA PLUS TWO PHYSICS PREVIOUS EXAM PAPER (2024)\n\nTime Allowed: 2.5 Hours\nMaximum Marks: 60'
    }
  ]);

  const [scholarships, setScholarships] = useState<ScholarshipItem[]>([
    { id: 1, title: 'National Merit Scholarship Program', amount: '₹50,000', deadline: '2026-08-15', eligibility: 'High School Seniors', description: 'Merit-based scholarship', url: 'https://www.nationalmerit.org/' }
  ]);

  const activeScholarships = scholarships.filter(s => new Date(s.deadline) >= CURRENT_DATE);

  const [chatMessage, setChatMessage] = useState("");
  const [groupChat, setGroupChat] = useState<Array<{ sender: string; text: string; time: string }>>([
    { sender: "Arjun (Plus Two)", text: "Hey! Anyone solved Q7 on Matrices?", time: "10:15 AM" }
  ]);

  const [studyPlans, setStudyPlans] = useState<StudyPlanItem[]>([
    { id: 1, task: "Complete SSLC Math Chapter", completed: false },
    { id: 2, task: "Solve Plus Two Physics Past Paper", completed: false }
  ]);

  const [viewingPaper, setViewingPaper] = useState<PaperItem | null>(null);

  const handleStudentLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!loginForm.username.trim()) {
      triggerToast("Enter username and password!", "error");
      return;
    }
    setIsStudentLoggedIn(true);
    triggerToast(`Welcome back, ${studentProfile.fullName}!`);
  };

  const handleStudentRegisterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!registerForm.username || !registerForm.fullName) {
      triggerToast("Fill all details!", "error");
      return;
    }
    const newProfile = {
      username: registerForm.username.trim().toLowerCase(),
      fullName: registerForm.fullName,
      school: registerForm.school || "Government School, Kerala",
      grade: registerForm.grade,
      isPremium: false
    };
    setStudentProfile(newProfile);
    setIsStudentLoggedIn(true);
    triggerToast(`Account created! Welcome, ${newProfile.fullName}.`);
  };

  const handlePremiumUpgradeSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!premiumForm.parentPhone || !premiumForm.studentPhone) {
      triggerToast("Enter both phone numbers!", "error");
      return;
    }
    if (!premiumForm.parentConsent) {
      triggerToast("Parent consent required!", "error");
      return;
    }
    setIsPremium(true);
    setPremiumRevenue(prev => Number((prev + premiumPrice).toFixed(2)));
    setShowPremiumModal(false);
    triggerToast("🎉 Premium activated!");
  };

  const handleOwnerLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (enteredKey === ownerKey) {
      setIsOwnerAuthenticated(true);
      setAuthError("");
      triggerToast("Access Granted. Welcome Platform Owner.");
      setActiveTab('operator');
    } else {
      setAuthError("Incorrect Secret Key.");
    }
  };

  const handleOwnerLogout = () => {
    setIsOwnerAuthenticated(false);
    setEnteredKey("");
    setActiveTab("dashboard");
    triggerToast("Operator room locked.");
  };

  const handlePlanToggle = (planId: number) => {
    setStudyPlans(studyPlans.map(plan =>
      plan.id === planId ? { ...plan, completed: !plan.completed } : plan
    ));
    triggerToast("Study plan updated!");
  };

  const sendGroupMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatMessage.trim()) return;
    setGroupChat([...groupChat, { sender: "You", text: chatMessage, time: "Now" }]);
    setChatMessage("");
  };

  return (
    <div className="flex h-screen bg-slate-50 font-sans">
      {/* Toast */}
      {toast.show && (
        <div className={`fixed top-4 right-4 px-4 py-3 rounded-lg text-white z-50 ${
          toast.type === 'error' ? 'bg-red-500' : toast.type === 'info' ? 'bg-blue-500' : 'bg-green-500'
        }`}>
          {toast.message}
        </div>
      )}

      {/* Mobile Header */}
      <div className="md:hidden fixed top-0 left-0 right-0 bg-white border-b border-slate-200 p-4 flex justify-between items-center z-40">
        <div className="text-xl font-bold text-indigo-600" onClick={handleSecretClick}>Edunexa</div>
        <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Sidebar */}
      <div className={`${isMobileMenuOpen ? 'block' : 'hidden'} md:block md:w-64 bg-white border-r border-slate-200 p-6 overflow-y-auto mt-16 md:mt-0`}>
        <div className="hidden md:block text-2xl font-bold text-indigo-600 mb-8" onClick={handleSecretClick}>Edunexa</div>
        
        {[
          { id: 'dashboard', icon: BookOpen, label: 'Dashboard' },
          { id: 'papers', icon: FileText, label: 'Question Papers' },
          { id: 'scholarships', icon: Bell, label: 'Scholarships' },
          { id: 'groups', icon: Users, label: 'Study Groups' },
          { id: 'tools', icon: Calculator, label: 'GPA Converter' },
        ].map((item) => {
          const IconComponent = item.icon;
          return (
            <button
              key={item.id}
              onClick={() => { setActiveTab(item.id); setIsMobileMenuOpen(false); }}
              className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg mb-2 transition-colors text-left ${
                activeTab === item.id ? 'bg-indigo-600 text-white' : 'text-slate-600 hover:bg-indigo-50'
              }`}
            >
              <IconComponent size={20} />
              <span className="text-sm font-medium">{item.label}</span>
            </button>
          );
        })}

        {isOwnerAuthenticated && (
          <button
            onClick={() => setActiveTab('operator')}
            className="w-full mt-4 px-4 py-2 bg-red-600 text-white rounded-lg text-xs font-bold"
          >
            🔒 Operator Panel
          </button>
        )}

        {!isPremium && (
          <button
            onClick={() => setShowPremiumModal(true)}
            className="w-full mt-4 px-4 py-2 bg-amber-500 hover:bg-amber-600 text-white rounded-lg text-xs font-bold"
          >
            Go Premium
          </button>
        )}
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-y-auto mt-16 md:mt-0">
        {/* Top Bar */}
        <div className="bg-white border-b border-slate-200 p-4 flex justify-between items-center sticky top-0 z-30">
          <h2 className="text-lg font-bold text-slate-700 capitalize">{activeTab.replace('-', ' ')}</h2>
          <div className="flex items-center gap-3">
            {isPremium && <span className="text-xs bg-amber-100 text-amber-800 px-3 py-1 rounded-full">Premium Active</span>}
            <button
              onClick={() => {
                setIsStudentLoggedIn(false);
                setActiveTab('dashboard');
              }}
              className="text-xs text-slate-500 hover:text-slate-800 font-semibold"
            >
              {isStudentLoggedIn ? "Sign Out" : "Sign In"}
            </button>
            <div className="w-8 h-8 bg-indigo-600 text-white rounded-full flex items-center justify-center text-sm font-bold">
              {isStudentLoggedIn ? studentProfile.fullName.charAt(0).toUpperCase() : "G"}
            </div>
          </div>
        </div>

        {/* Content Area */}
        <div className="p-6">
          {/* DASHBOARD */}
          {activeTab === 'dashboard' && (
            <div className="space-y-6">
              {isOwnerAuthenticated && (
                <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white p-6 rounded-xl">
                  <h3 className="text-xl font-bold mb-4">Live Operator Dashboard</h3>
                  <div className="grid grid-cols-3 gap-4">
                    <div>
                      <div className="text-3xl font-bold">{adImpressions}</div>
                      <div className="text-indigo-200 text-sm">Ad Impressions</div>
                    </div>
                    <div>
                      <div className="text-3xl font-bold">₹{adEarnings.toFixed(2)}</div>
                      <div className="text-indigo-200 text-sm">Ad Earnings</div>
                    </div>
                    <div>
                      <div className="text-3xl font-bold">₹{(adEarnings + premiumRevenue + serviceFeeRevenue).toFixed(2)}</div>
                      <div className="text-indigo-200 text-sm">Total Balance</div>
                    </div>
                  </div>
                </div>
              )}

              <div className="bg-white p-6 rounded-xl border border-slate-200">
                <h3 className="text-lg font-bold mb-4">Exam Countdown</h3>
                <div className="grid grid-cols-4 gap-4">
                  {[
                    { label: 'Days', val: timeLeft.days },
                    { label: 'Hours', val: timeLeft.hours },
                    { label: 'Mins', val: timeLeft.mins },
                    { label: 'Secs', val: timeLeft.secs }
                  ].map((unit, idx) => (
                    <div key={idx} className="text-center p-4 bg-slate-50 rounded-lg">
                      <div className="text-3xl font-bold text-indigo-600">{unit.val}</div>
                      <div className="text-xs text-slate-600">{unit.label}</div>
                    </div>
                  ))}
                </div>
              </div>

              {!isStudentLoggedIn ? (
                <div className="bg-white p-6 rounded-xl border border-slate-200">
                  <h3 className="text-lg font-bold mb-4">Access Study Portal</h3>
                  {authMode === 'login' ? (
                    <form onSubmit={handleStudentLoginSubmit} className="space-y-4">
                      <input
                        type="text"
                        placeholder="Username"
                        value={loginForm.username}
                        onChange={(e) => setLoginForm({ ...loginForm, username: e.target.value })}
                        className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      />
                      <input
                        type="password"
                        placeholder="Password"
                        value={loginForm.password}
                        onChange={(e) => setLoginForm({ ...loginForm, password: e.target.value })}
                        className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      />
                      <button type="submit" className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 rounded-lg">
                        Sign In
                      </button>
                      <button
                        type="button"
                        onClick={() => setAuthMode('register')}
                        className="text-indigo-600 text-sm font-semibold hover:underline"
                      >
                        Don't have an account? Register
                      </button>
                    </form>
                  ) : (
                    <form onSubmit={handleStudentRegisterSubmit} className="space-y-4">
                      <input
                        type="text"
                        placeholder="Full Name"
                        value={registerForm.fullName}
                        onChange={(e) => setRegisterForm({ ...registerForm, fullName: e.target.value })}
                        className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      />
                      <input
                        type="text"
                        placeholder="Username"
                        value={registerForm.username}
                        onChange={(e) => setRegisterForm({ ...registerForm, username: e.target.value })}
                        className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      />
                      <button type="submit" className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 rounded-lg">
                        Create Account
                      </button>
                    </form>
                  )}
                </div>
              ) : (
                <div className="bg-indigo-50 p-6 rounded-xl border border-indigo-200">
                  <h3 className="text-lg font-bold text-indigo-900 mb-2">Welcome back, {studentProfile.fullName}!</h3>
                  <p className="text-slate-600 text-sm">{studentProfile.school}</p>
                  <p className="text-slate-600 text-sm">{studentProfile.grade}</p>
                </div>
              )}
            </div>
          )}

          {/* QUESTION PAPERS */}
          {activeTab === 'papers' && (
            <div className="grid md:grid-cols-3 gap-6">
              {papers.map((p) => (
                <div
                  key={p.id}
                  onClick={() => setViewingPaper(p)}
                  className="bg-white p-4 rounded-xl border border-slate-200 hover:border-indigo-400 cursor-pointer transition-all"
                >
                  <p className="text-xs text-slate-500 mb-2">{p.board}</p>
                  <h4 className="font-bold text-slate-800 mb-2">{p.title}</h4>
                  <p className="text-xs text-slate-600">Year: {p.year}</p>
                </div>
              ))}
            </div>
          )}

          {/* SCHOLARSHIPS */}
          {activeTab === 'scholarships' && (
            <div className="space-y-4">
              {activeScholarships.map((schol) => (
                <div key={schol.id} className="bg-white p-6 rounded-xl border border-slate-200">
                  <h4 className="font-bold text-slate-800 mb-2">{schol.title}</h4>
                  <p className="text-sm text-slate-600 mb-3">{schol.description}</p>
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="text-sm font-semibold text-indigo-600">{schol.amount}</p>
                      <p className="text-xs text-slate-500">Deadline: {schol.deadline}</p>
                    </div>
                    <button
                      onClick={() => window.open(schol.url, '_blank')}
                      className="bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold px-4 py-2 rounded-lg"
                    >
                      Apply Now
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* STUDY GROUPS */}
          {activeTab === 'groups' && (
            <div className="grid md:grid-cols-3 gap-6">
              <div className="md:col-span-2 bg-white p-6 rounded-xl border border-slate-200">
                <h3 className="font-bold mb-4">Study Group Chat</h3>
                <div className="space-y-3 mb-4 max-h-96 overflow-y-auto">
                  {groupChat.map((msg, idx) => (
                    <div key={idx} className="bg-slate-50 p-3 rounded-lg">
                      <p className="text-xs font-bold text-slate-700">{msg.sender}</p>
                      <p className="text-sm text-slate-600">{msg.text}</p>
                      <p className="text-xs text-slate-400 mt-1">{msg.time}</p>
                    </div>
                  ))}
                </div>
                <form onSubmit={sendGroupMessage} className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Type a message..."
                    value={chatMessage}
                    onChange={(e) => setChatMessage(e.target.value)}
                    className="flex-1 px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                  <button type="submit" className="bg-indigo-600 text-white px-4 py-2 rounded-lg">
                    Send
                  </button>
                </form>
              </div>

              <div className="bg-white p-6 rounded-xl border border-slate-200">
                <h3 className="font-bold mb-4">Study Plans</h3>
                <div className="space-y-2">
                  {studyPlans.map((plan) => (
                    <div
                      key={plan.id}
                      onClick={() => handlePlanToggle(plan.id)}
                      className="flex items-center gap-2 p-2 bg-slate-50 rounded-lg cursor-pointer hover:bg-slate-100"
                    >
                      {plan.completed ? (
                        <CheckCircle size={18} className="text-green-600" />
                      ) : (
                        <CheckSquare size={18} className="text-slate-400" />
                      )}
                      <span className={`text-sm ${plan.completed ? 'line-through text-slate-400' : 'text-slate-700'}`}>
                        {plan.task}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* GPA CALCULATOR */}
          {activeTab === 'tools' && (
            <div className="max-w-md bg-white p-6 rounded-xl border border-slate-200">
              <h3 className="font-bold mb-4">GPA Converter</h3>
              <div className="space-y-4">
                <input
                  type="number"
                  placeholder="Marks Obtained"
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg"
                />
                <input
                  type="number"
                  placeholder="Total Marks"
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg"
                />
                <button className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 rounded-lg">
                  Calculate
                </button>
              </div>
            </div>
          )}

          {/* OPERATOR PANEL */}
          {activeTab === 'operator' && isOwnerAuthenticated && (
            <div className="bg-white p-6 rounded-xl border border-slate-200">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-bold">System Admin Panel</h3>
                <button
                  onClick={handleOwnerLogout}
                  className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg text-sm font-bold"
                >
                  Lock Terminal
                </button>
              </div>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold mb-2">CPM Rate (₹)</label>
                  <input
                    type="number"
                    value={cpmRate}
                    onChange={(e) => setCpmRate(parseFloat(e.target.value) || 0)}
                    className="w-full px-4 py-2 border border-slate-300 rounded-lg"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-2">Visitor Count</label>
                  <input
                    type="number"
                    value={visitorCount}
                    onChange={(e) => setVisitorCount(parseInt(e.target.value) || 0)}
                    className="w-full px-4 py-2 border border-slate-300 rounded-lg"
                  />
                </div>
              </div>
            </div>
          )}

          {/* OPERATOR LOGIN */}
          {activeTab === 'operator-login' && (
            <div className="max-w-md mx-auto bg-white p-6 rounded-xl border border-slate-200">
              <h3 className="text-lg font-bold mb-4">Operator Terminal</h3>
              <form onSubmit={handleOwnerLogin} className="space-y-4">
                <input
                  type="password"
                  placeholder="Enter secret key"
                  value={enteredKey}
                  onChange={(e) => setEnteredKey(e.target.value)}
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
                {authError && <p className="text-red-600 text-sm">{authError}</p>}
                <button type="submit" className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 rounded-lg">
                  Unlock
                </button>
              </form>
            </div>
          )}
        </div>
      </div>

      {/* PREMIUM MODAL */}
      {showPremiumModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl p-6 max-w-md w-full">
            <h3 className="text-xl font-bold mb-4">Unlock Edunexa Premium</h3>
            <form onSubmit={handlePremiumUpgradeSubmit} className="space-y-4">
              <p className="text-sm text-slate-600 mb-4">Price: ₹{premiumPrice}/month</p>
              <input
                type="tel"
                placeholder="Student Phone"
                value={premiumForm.studentPhone}
                onChange={(e) => setPremiumForm({ ...premiumForm, studentPhone: e.target.value })}
                className="w-full px-4 py-2 border border-slate-300 rounded-lg"
              />
              <input
                type="tel"
                placeholder="Parent Phone"
                value={premiumForm.parentPhone}
                onChange={(e) => setPremiumForm({ ...premiumForm, parentPhone: e.target.value })}
                className="w-full px-4 py-2 border border-slate-300 rounded-lg"
              />
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={premiumForm.parentConsent}
                  onChange={(e) => setPremiumForm({ ...premiumForm, parentConsent: e.target.checked })}
                  className="w-4 h-4"
                />
                <span className="text-sm">I have parental consent</span>
              </label>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => setShowPremiumModal(false)}
                  className="flex-1 bg-slate-200 hover:bg-slate-300 text-slate-800 font-bold py-2 rounded-lg"
                >
                  Cancel
                </button>
                <button type="submit" className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 rounded-lg">
                  Confirm
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
