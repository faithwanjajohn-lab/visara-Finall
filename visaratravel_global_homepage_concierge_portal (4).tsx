import React, { useState } from 'react';
import { 
  ShieldCheck, Globe, Award, Lock, FileText, CheckCircle2, 
  ArrowRight, UserCheck, Briefcase, ChevronRight, Sparkles, 
  Clock, PhoneCall, Layers, Check, AlertCircle, Upload, CreditCard, Menu, X, MessageSquare,
  HelpCircle, ChevronDown, Info, Send, Plane, Building2, HelpCircleIcon
} from 'lucide-react';

export default function VisaratravelApp() {
  const [activeTab, setActiveTab] = useState('portal');
  const [selectedDestination, setSelectedDestination] = useState('uk');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [portalTab, setPortalTab] = useState('vault');
  const [uploadedFiles, setUploadedFiles] = useState({});
  const [notification, setNotification] = useState('');

  // Vault Selection States
  const [vaultCountry, setVaultCountry] = useState('uk');
  const [vaultVisaType, setVaultVisaType] = useState('business');
  const [showConsultModal, setShowConsultModal] = useState(false);
  const [consultQuestion, setConsultQuestion] = useState('');

  // Flight & Accommodation interactive choice state ('unanswered', 'yes', 'no')
  const [hasPrebookedItinerary, setHasPrebookedItinerary] = useState('unanswered');

  // Trigger temporary notification
  const notify = (msg) => {
    setNotification(msg);
    setTimeout(() => setNotification(''), 4000);
  };

  const docRequirements = {
    uk: {
      name: "United Kingdom",
      types: {
        business: [
          { id: "uk_b_passport", label: "Valid Passport & Previous Visas (Original Scan)", mandatory: true },
          { id: "uk_b_letter", label: "UK Sponsor / Host Business Invitation Letter", mandatory: true },
          { id: "uk_b_employer", label: "Employer Cover Letter specifying trip purpose & financial guarantee", mandatory: true },
          { id: "uk_b_bank", label: "6-Month Personal / Corporate Bank Statements (Audited)", mandatory: true },
          { id: "uk_b_itinerary", label: "Flight & Accommodation Itinerary with TLScontact Priority Tagging", isItineraryInteractive: true, mandatory: false }
        ],
        tourism: [
          { id: "uk_t_passport", label: "Valid Passport (At least 6 months validity left)", mandatory: true },
          { id: "uk_t_invite", label: "Formal Invitation Letter from Host in UK (if private visit)", mandatory: false },
          { id: "uk_t_itinerary", label: "Flight & Accommodation Itinerary with TLScontact Priority Tagging", isItineraryInteractive: true, mandatory: false },
          { id: "uk_t_bank", label: "6-Month Certified Bank Statements showing sufficient balance", mandatory: true },
          { id: "uk_t_ties", label: "Proof of Economic / Social Ties (Land Registry, Family Proof, Employment)", mandatory: true }
        ],
        official: [
          { id: "uk_o_diplomatic_passport", label: "Diplomatic or Official Service Passport Scan", mandatory: true },
          { id: "uk_o_note_verbale", label: "Official Note Verbale from Ministry of Foreign Affairs (MFA)", mandatory: true },
          { id: "uk_o_mission_letter", label: "Official Mission Assignment Letter & Government Credentials", mandatory: true },
          { id: "uk_o_host_invite", label: "UK Foreign, Commonwealth & Development Office (FCDO) or Host Invitation", mandatory: true },
          { id: "uk_o_itinerary", label: "Flight & Accommodation Itinerary with TLScontact Priority Tagging", isItineraryInteractive: true, mandatory: false },
          { id: "uk_o_contact", label: "Diplomatic Point-of-Contact Info (Email, Direct Line & Official Title)", mandatory: true }
        ],
        student: [
          { id: "uk_s_cas", label: "Confirmation of Acceptance for Studies (CAS) from UK Institution", mandatory: true },
          { id: "uk_s_funds", label: "28-Day Bank Statement meeting UKVI Maintenance funds requirement", mandatory: true },
          { id: "uk_s_academic", label: "Academic Certificates & English Language Proficiency Test (IELTS/PTE)", mandatory: true },
          { id: "uk_s_tb", label: "TB Test Certificate from Approved Clinic", mandatory: true },
          { id: "uk_s_itinerary", label: "Flight & Accommodation Itinerary with TLScontact Priority Tagging", isItineraryInteractive: true, mandatory: false }
        ]
      }
    },
    schengen: {
      name: "Schengen Area (Europe)",
      types: {
        business: [
          { id: "sc_b_passport", label: "Passport with at least 2 blank pages", mandatory: true },
          { id: "sc_b_invite", label: "Official Invitation from EU Host Company on letterhead", mandatory: true },
          { id: "sc_b_employer", label: "Employer Clearance & Guarantee of Expense Coverage", mandatory: true },
          { id: "sc_b_insurance", label: "Schengen Travel Health Insurance (€30,000 minimum coverage)", mandatory: true },
          { id: "sc_b_itinerary", label: "Flight & Accommodation Itinerary with Priority Tagging", isItineraryInteractive: true, mandatory: false },
          { id: "sc_b_bank", label: "3-Month Recent Bank Statements with Stamped Signature", mandatory: true }
        ],
        tourism: [
          { id: "sc_t_passport", label: "Passport valid for 3+ months beyond intended departure", mandatory: true },
          { id: "sc_t_invite", label: "Formal Attestation d'accueil / Host Invitation (if visiting family)", mandatory: false },
          { id: "sc_t_insurance", label: "Schengen Medical Insurance (€30,000 minimum coverage)", mandatory: true },
          { id: "sc_t_bank", label: "3-Month Personal Bank Statements & Pay Slips", mandatory: true },
          { id: "sc_t_itinerary", label: "Flight & Accommodation Itinerary with Priority Tagging", isItineraryInteractive: true, mandatory: false }
        ],
        official: [
          { id: "sc_o_passport", label: "Diplomatic / Service Passport Scan", mandatory: true },
          { id: "sc_o_note_verbale", label: "Note Verbale from Ministry of Foreign Affairs (MFA)", mandatory: true },
          { id: "sc_o_invitation", label: "EU International Organization / Embassy Host Letter", mandatory: true },
          { id: "sc_o_insurance", label: "Official Government International Health Coverage Endorsement", mandatory: true },
          { id: "sc_o_itinerary", label: "Flight & Accommodation Itinerary with Priority Tagging", isItineraryInteractive: true, mandatory: false },
          { id: "sc_o_contacts", label: "Official Protocol Officer Contact Details (Phone, MFA Email)", mandatory: true }
        ],
        student: [
          { id: "sc_s_enrollment", label: "Official EU University Admission Letter / Enrollment Clearance", mandatory: true },
          { id: "sc_s_bank", label: "Proof of Financial Means (Sponsorship Letter or Blocked Account)", mandatory: true },
          { id: "sc_s_insurance", label: "Full Schengen Academic Health Insurance", mandatory: true },
          { id: "sc_s_itinerary", label: "Flight & Accommodation Itinerary with Priority Tagging", isItineraryInteractive: true, mandatory: false }
        ]
      }
    },
    usa: {
      name: "United States of America",
      types: {
        business: [
          { id: "us_b_ds160", label: "DS-160 Confirmation Page with CEAC Barcode", mandatory: true },
          { id: "us_b_invite", label: "US Company Business Invitation / Conference Ticket", mandatory: true },
          { id: "us_b_employer", label: "Executive Sponsor Letter & Proof of Employment/Ownership", mandatory: true },
          { id: "us_b_itinerary", label: "Flight & Accommodation Itinerary Details", isItineraryInteractive: true, mandatory: false },
          { id: "us_b_bank", label: "US Dollar / Local Bank Statements & Asset Valuation Reports", mandatory: true }
        ],
        tourism: [
          { id: "us_t_ds160", label: "DS-160 Application Confirmation Page", mandatory: true },
          { id: "us_t_photo", label: "US Visa Spec Digital Photo (2x2 inches, white background)", mandatory: true },
          { id: "us_t_invite", label: "Letter of Support / Host Invitation from US Resident", mandatory: false },
          { id: "us_t_bank", label: "Personal Bank Statements & Asset Ownership Credentials", mandatory: true },
          { id: "us_t_itinerary", label: "Flight & Accommodation Itinerary Details", isItineraryInteractive: true, mandatory: false }
        ],
        official: [
          { id: "us_o_ds160", label: "DS-160 Confirmation (A1/A2 or G1-G4 Diplomatic Category)", mandatory: true },
          { id: "us_o_diplomatic", label: "Diplomatic / Service Passport Valid for 6+ Months", mandatory: true },
          { id: "us_o_note_verbale", label: "Official MFA / Embassy Diplomatic Note Verbale", mandatory: true },
          { id: "us_o_usG_invite", label: "US State Dept, UN, or International Org Mission Clearance Letter", mandatory: true },
          { id: "us_o_itinerary", label: "Flight & Accommodation Itinerary Details", isItineraryInteractive: true, mandatory: false },
          { id: "us_o_contact", label: "Official Protocol Phone Number & Governmental Email", mandatory: true }
        ],
        student: [
          { id: "us_s_i20", label: "Signed Form I-20 / DS-2019 from US Institution", mandatory: true },
          { id: "us_s_sevis", label: "SEVIS I-901 Fee Payment Receipt", mandatory: true },
          { id: "us_s_bank", label: "Financial Sponsor Statements showing 1st Year Tuition + Living Costs", mandatory: true },
          { id: "us_s_itinerary", label: "Flight & Accommodation Itinerary Details", isItineraryInteractive: true, mandatory: false }
        ]
      }
    },
    uae: {
      name: "United Arab Emirates",
      types: {
        business: [
          { id: "uae_b_passport", label: "Color Passport Copy (At least 6 months validity)", mandatory: true },
          { id: "uae_b_photo", label: "Passport Photo with White Background", mandatory: true },
          { id: "uae_b_company", label: "UAE Host Company Commercial License & Trade Guarantee Letter", mandatory: true },
          { id: "uae_b_itinerary", label: "Flight & Accommodation Itinerary Details", isItineraryInteractive: true, mandatory: false }
        ],
        tourism: [
          { id: "uae_t_passport", label: "Color Passport Copy (6+ months validity)", mandatory: true },
          { id: "uae_t_photo", label: "High-Resolution Passport Photo", mandatory: true },
          { id: "uae_t_itinerary", label: "Flight & Accommodation Itinerary Details", isItineraryInteractive: true, mandatory: false }
        ],
        official: [
          { id: "uae_o_passport", label: "Diplomatic / Official Passport Color Scan", mandatory: true },
          { id: "uae_o_note_verbale", label: "MFA Diplomatic Note Verbale", mandatory: true },
          { id: "uae_o_uae_host", label: "UAE Ministry of Foreign Affairs (MoFAIC) Special Mission Approval", mandatory: true },
          { id: "uae_o_itinerary", label: "Flight & Accommodation Itinerary Details", isItineraryInteractive: true, mandatory: false },
          { id: "uae_o_contacts", label: "Official Protocol Delegation Phone & Direct Email", mandatory: true }
        ],
        student: [
          { id: "uae_s_admission", label: "UAE Accredited University Admission Letter", mandatory: true },
          { id: "uae_s_medical", label: "UAE Student Health Insurance Clearance", mandatory: true },
          { id: "uae_s_itinerary", label: "Flight & Accommodation Itinerary Details", isItineraryInteractive: true, mandatory: false }
        ]
      }
    }
  };

  // Helper to handle file simulation
  const handleUpload = (reqId, reqLabel) => {
    const fileName = `${reqLabel.replace(/[^a-zA-Z0-9]/g, '_').substring(0, 15)}_${Math.floor(Math.random() * 8999 + 1000)}.pdf`;
    setUploadedFiles(prev => ({
      ...prev,
      [reqId]: { name: fileName, timestamp: new Date().toLocaleTimeString() }
    }));
    notify(`Encrypted & Uploaded: ${fileName}`);
  };

  return (
    <div className="min-h-screen bg-[#0F1115] text-[#F8F9FA] font-sans antialiased selection:bg-[#D4AF37] selection:text-[#0F1115]">
      
      {/* Notification Toast */}
      {notification && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#0D3C26] border border-[#D4AF37] text-white px-6 py-4 rounded-xl shadow-2xl flex items-center space-x-3 animate-bounce">
          <Sparkles className="w-5 h-5 text-[#D4AF37]" />
          <span className="text-sm font-medium tracking-wide">{notification}</span>
        </div>
      )}

      {/* Topline Banner */}
      <div className="bg-[#090A0D] text-[#C6C9CB] text-[10px] tracking-[0.19em] uppercase border-b border-white/5 px-6 lg:px-16 py-2 flex items-center justify-between">
        <span>Visara Travel — Private Global Mobility & Concierge Portal</span>
        <span className="text-[#D4AF37]">Global Mobility. Elevated by Discretion.</span>
      </div>

      {/* Navigation Bar */}
      <nav className="sticky top-0 z-40 bg-[#0F1115]/92 backdrop-blur-md border-b border-[#D4AF37]/25 px-6 lg:px-16 py-4 flex items-center justify-between">
        <div className="flex items-center space-x-3 cursor-pointer" onClick={() => setActiveTab('home')}>
          <div className="w-10 h-10 rounded-full border border-[#D4AF37]/80 flex items-center justify-center text-[#D4AF37] font-serif text-lg shadow-lg relative">
            <span className="absolute inset-1 border border-[#D4AF37]/40 rounded-full transform rotate-45 scale-75"></span>
            <span className="z-10 font-serif">V</span>
          </div>
          <div>
            <span className="text-lg font-display font-semibold tracking-[0.22em] text-white">VISARA TRAVEL</span>
            <span className="block text-[8px] tracking-[0.18em] text-[#D4AF37] uppercase font-semibold">Global Mobility & Diplomatic Concierge</span>
          </div>
        </div>

        {/* Desktop Nav Links */}
        <div className="hidden md:flex items-center space-x-8 text-xs font-medium tracking-[0.025em] text-[#D6D8DB]">
          <button onClick={() => setActiveTab('home')} className={`transition-colors hover:text-[#D4AF37] ${activeTab === 'home' ? 'text-[#D4AF37] underline decoration-[#D4AF37] underline-offset-8' : ''}`}>Home</button>
          <button onClick={() => setActiveTab('services')} className={`transition-colors hover:text-[#D4AF37] ${activeTab === 'services' ? 'text-[#D4AF37] underline decoration-[#D4AF37] underline-offset-8' : ''}`}>Global Hub</button>
          <button onClick={() => setActiveTab('concierge')} className={`transition-colors hover:text-[#D4AF37] ${activeTab === 'concierge' ? 'text-[#D4AF37] underline decoration-[#D4AF37] underline-offset-8' : ''}`}>VIP Packages</button>
          <button onClick={() => setActiveTab('corporate')} className={`transition-colors hover:text-[#D4AF37] ${activeTab === 'corporate' ? 'text-[#D4AF37] underline decoration-[#D4AF37] underline-offset-8' : ''}`}>Corporate Mobility</button>
        </div>

        {/* Action Button */}
        <div className="hidden lg:flex items-center space-x-4">
          <button 
            onClick={() => setActiveTab('portal')}
            className="px-5 py-2.5 bg-[#D4AF37] text-[#11130F] font-bold text-[10px] tracking-[0.11em] uppercase shadow-md hover:bg-[#E4C65A] transition-all flex items-center space-x-2"
          >
            <Lock className="w-3.5 h-3.5" />
            <span>Client Portal</span>
          </button>
        </div>

        {/* Mobile Hamburger Toggle */}
        <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="md:hidden text-white border border-white/20 p-2.5">
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </nav>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#0F1115] border-b border-[#D4AF37]/20 px-6 py-6 space-y-4">
          <button onClick={() => { setActiveTab('home'); setMobileMenuOpen(false); }} className="block text-left text-base font-medium text-gray-200 hover:text-[#D4AF37]">Home</button>
          <button onClick={() => { setActiveTab('services'); setMobileMenuOpen(false); }} className="block text-left text-base font-medium text-gray-200 hover:text-[#D4AF37]">Global Hub</button>
          <button onClick={() => { setActiveTab('concierge'); setMobileMenuOpen(false); }} className="block text-left text-base font-medium text-gray-200 hover:text-[#D4AF37]">VIP Packages</button>
          <button onClick={() => { setActiveTab('corporate'); setMobileMenuOpen(false); }} className="block text-left text-base font-medium text-gray-200 hover:text-[#D4AF37]">Corporate Mobility</button>
          <button onClick={() => { setActiveTab('portal'); setMobileMenuOpen(false); }} className="w-full py-3 bg-[#D4AF37] text-[#11130F] font-bold text-center mt-4 uppercase text-xs">Client Portal</button>
        </div>
      )}

      {/* HOME TAB CONTENT */}
      {activeTab === 'home' && (
        <div>
          {/* Hero Section */}
          <section className="relative px-6 lg:px-16 py-24 lg:py-32 overflow-hidden bg-[#0F1115] border-b border-[#D4AF37]/20">
            <div className="absolute inset-0 opacity-15 bg-[radial-gradient(#D4AF37_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none"></div>
            <div className="max-w-6xl mx-auto relative z-10">
              <div className="flex items-center gap-3 text-[#D4AF37] text-[10px] uppercase font-bold tracking-[0.24em] mb-6">
                <span className="w-8 h-[1px] bg-[#D4AF37]"></span>
                <span>PRIVATE GLOBAL MOBILITY & CONCIERGE</span>
              </div>
              <h1 className="text-4xl sm:text-6xl lg:text-7xl font-display font-medium text-white tracking-[-0.055em] leading-[1.06] mb-8">
                Global Mobility, <em className="text-[#D4AF37] font-serif font-normal">Elevated by Discretion.</em>
              </h1>
              <p className="text-base lg:text-lg text-[#D0D3D6] max-w-2xl mb-10 leading-[1.85]">
                Private mobility and executive concierge services for diplomatic representatives, distinguished private clients, and global business leaders requiring absolute confidentiality and zero-friction execution.
              </p>
              <div className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-4">
                <button 
                  onClick={() => setActiveTab('concierge')}
                  className="w-full sm:w-auto px-8 py-4 bg-[#D4AF37] text-[#11130F] font-bold text-[10px] tracking-[0.11em] uppercase hover:bg-[#E4C65A] transition-all flex items-center justify-center space-x-3 shadow-xl"
                >
                  <span>Secure Priority Consultation</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
                <button 
                  onClick={() => setActiveTab('services')}
                  className="w-full sm:w-auto px-8 py-4 bg-[#0F1115]/18 border border-white/35 text-white font-bold text-[10px] tracking-[0.11em] uppercase hover:border-[#D4AF37] hover:text-[#D4AF37] transition-all flex items-center justify-center space-x-3"
                >
                  <Globe className="w-4 h-4 text-[#D4AF37]" />
                  <span>Explore Global Hub</span>
                </button>
              </div>

              {/* Hero Foot Trust Metrics */}
              <div className="mt-16 flex items-center gap-4 text-[#C4C8C9] text-[9px] tracking-[0.18em] uppercase">
                <span>Global Dispatch Network</span>
                <span className="h-[1px] w-12 bg-[#D4AF37]"></span>
                <span>VFS & TLS Priority</span>
                <span className="h-[1px] w-12 bg-[#D4AF37]"></span>
                <span>Zero-Knowledge Vault</span>
              </div>
            </div>
          </section>

          {/* Trustbar Section */}
          <section className="bg-[#12151A] border-b border-white/10">
            <div className="max-w-7xl mx-auto grid md:grid-cols-3">
              <div className="p-8 border-r border-white/10 flex items-center space-x-4">
                <Award className="w-7 h-7 text-[#D4AF37] shrink-0" />
                <div>
                  <strong className="text-xs uppercase tracking-[0.08em] font-semibold text-white">99.8% Approval Success Rate</strong>
                  <small className="text-[#A7ADB4] text-[11px] mt-1 block">Vetted by former consular officers</small>
                </div>
              </div>
              <div className="p-8 border-r border-white/10 flex items-center space-x-4">
                <ShieldCheck className="w-7 h-7 text-[#D4AF37] shrink-0" />
                <div>
                  <strong className="text-xs uppercase tracking-[0.08em] font-semibold text-white">256-Bit Encrypted Vault</strong>
                  <small className="text-[#A7ADB4] text-[11px] mt-1 block">Absolute confidentiality guaranteed</small>
                </div>
              </div>
              <div className="p-8 flex items-center space-x-4">
                <UserCheck className="w-7 h-7 text-[#D4AF37] shrink-0" />
                <div>
                  <strong className="text-xs uppercase tracking-[0.08em] font-semibold text-white">24/7 Dedicated Producer</strong>
                  <small className="text-[#A7ADB4] text-[11px] mt-1 block">Direct liaison across 120+ capitals</small>
                </div>
              </div>
            </div>
          </section>

          {/* Pillars Section */}
          <section className="px-6 lg:px-16 py-24 bg-[#0F1115]">
            <div className="max-w-7xl mx-auto">
              <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
                <div>
                  <span className="text-[9px] uppercase tracking-[0.17em] text-[#D4AF37] font-bold">Uncompromising Standards</span>
                  <h2 className="text-3xl lg:text-5xl font-display font-medium text-white tracking-[-0.045em] mt-3">
                    The Four Pillars of <em className="text-[#D4AF37] font-serif font-normal">Visara Travel</em>
                  </h2>
                </div>
                <p className="text-[#A7ADB4] text-[13px] max-w-xs leading-[1.85]">
                  Engineered specifically for distinguished private clients, executive boards, and diplomatic missions.
                </p>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                {[
                  { title: 'Zero-Knowledge Privacy', sub: 'Absolute Data Sovereignty', desc: 'Military-grade encryption protecting every passport, bank statement, and diplomatic credential in our secure vault.' },
                  { title: 'Priority Consular Access', sub: 'VIP Fast-Track Scheduling', desc: 'Direct liaison channels and fast-tracked appointment management across global VFS, TLS, and diplomatic centers.' },
                  { title: 'Dedicated Travel Producer', sub: 'Senior Concierge Oversight', desc: 'A single, senior concierge assigned to manage your dossier, itineraries, and flight configurations 24/7.' },
                  { title: 'Rejection-Risk Mitigation', sub: 'Pre-Submission Vetting', desc: 'Rigorous pre-submission vetting by former consular compliance officers to guarantee flawless applications.' }
                ].map((pillar, idx) => (
                  <div key={idx} className="bg-[#15191E] border border-white/10 p-8 hover:border-[#D4AF37]/60 transition-all group flex flex-col justify-between">
                    <div>
                      <span className="text-[9px] uppercase tracking-[0.17em] text-[#D4AF37] font-bold">0{idx + 1} — {pillar.sub}</span>
                      <h3 className="text-xl font-display font-medium text-white mt-3 mb-3">{pillar.title}</h3>
                      <p className="text-[12px] text-[#A7ADB4] leading-[1.9] mb-6">{pillar.desc}</p>
                    </div>
                    <button onClick={() => { setActiveTab('portal'); setPortalTab('vault'); }} className="inline-flex items-center gap-2 text-[#D4AF37] text-[10px] font-bold uppercase tracking-[0.12em] hover:text-white transition-colors">
                      <span>Configure Vault</span>
                      <span className="text-base">→</span>
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Philosophy Section */}
          <section className="bg-[#F8F9FA] text-[#171B1D] py-24 px-6 lg:px-16 relative overflow-hidden">
            <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center relative z-10">
              <div>
                <div className="flex items-center gap-3 text-[#0D3C26] text-[10px] uppercase font-bold tracking-[0.24em] mb-6">
                  <span className="w-8 h-[1px] bg-[#0D3C26]"></span>
                  <span>THE VISARA STANDARD</span>
                </div>
                <h2 className="text-3xl lg:text-5xl font-display font-medium tracking-[-0.055em] leading-[1.13]">
                  Excellence is not an option. It is our <em className="text-[#0D3C26] font-serif font-normal">mandate.</em>
                </h2>
              </div>
              <div className="border-l border-[#0D3C26]/25 pl-8 space-y-6">
                <p className="text-[#17211B] font-serif text-xl leading-[1.65]">
                  "Navigating sovereign borders requires more than paperwork—it demands deep diplomatic fluency, rigorous security protocols, and unshakeable discretion."
                </p>
                <p className="text-[#4F5757] text-sm leading-[1.95]">
                  We protect your time, your reputation, and your global mobility. Every application is scrutinized by former consular compliance officers before touching embassy servers.
                </p>
              </div>
            </div>
          </section>
        </div>
      )}

      {/* GLOBAL HUB TAB */}
      {activeTab === 'services' && (
        <div className="px-6 lg:px-16 py-16 max-w-7xl mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-[9px] uppercase tracking-[0.17em] text-[#D4AF37] font-bold">Global Jurisdictions</span>
            <h1 className="text-4xl font-display font-medium text-white mt-3 mb-4">Elite mobility across major world capitals.</h1>
            <p className="text-[#A7ADB4] text-sm">Select your target region below to initiate secure document review and priority consular scheduling.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { title: 'United Kingdom', desc: 'Standard Visitor, Business, Tier-1 Investor, and Student Visas with TLScontact VIP Lounge access.', code: 'uk' },
              { title: 'Schengen Area (Europe)', desc: 'Multi-entry tourist and business visas for France, Germany, Switzerland, Italy, and Spain.', code: 'schengen' },
              { title: 'United States', desc: 'B1/B2 Executive Visas, E-2 Investor clearances, and diplomatic transit documents.', code: 'usa' },
              { title: 'Canada', desc: 'Visitor records, work permits, and express entry advisory services for professionals.', code: 'canada' },
              { title: 'United Arab Emirates', desc: 'Golden Visas, 5-year multi-entry business passes, and executive residency setups.', code: 'uae' },
              { title: 'Diplomatic Passports', desc: 'Specialized protocol management for official government and international organization delegates.', code: 'diplomatic' }
            ].map((service, idx) => (
              <div key={idx} className="bg-[#15191E] border border-white/10 rounded-2xl p-8 hover:border-[#D4AF37] transition-all flex flex-col justify-between">
                <div>
                  <div className="w-10 h-10 rounded-lg bg-[#0D3C26] flex items-center justify-center mb-6">
                    <Globe className="w-5 h-5 text-[#D4AF37]" />
                  </div>
                  <h3 className="text-2xl font-serif font-bold text-white mb-3">{service.title}</h3>
                  <p className="text-[#A7ADB4] text-sm mb-6 leading-relaxed">{service.desc}</p>
                </div>
                <button 
                  onClick={() => {
                    setVaultCountry(service.code === 'diplomatic' ? 'uk' : service.code);
                    setActiveTab('portal');
                    setPortalTab('vault');
                    notify(`Configured ${service.title} requirements in Vault.`);
                  }}
                  className="w-full py-3 rounded-xl bg-[#1c222d] hover:bg-[#D4AF37] hover:text-[#0F1115] text-[#D4AF37] border border-[#D4AF37]/30 font-semibold text-sm transition-all flex items-center justify-center space-x-2"
                >
                  <span>Configure Vault Checklist</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* CONCIERGE PACKAGES TAB */}
      {activeTab === 'concierge' && (
        <div className="px-6 lg:px-16 py-16 max-w-7xl mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-[9px] uppercase tracking-[0.17em] text-[#D4AF37] font-bold">Concierge Tiers</span>
            <h1 className="text-4xl font-display font-medium text-white mt-3 mb-4">Structured Excellence for Every Tier</h1>
            <p className="text-[#A7ADB4] text-sm">Choose your level of engagement. From individual professional guidance to institutional corporate retainers.</p>
          </div>
          <div className="grid lg:grid-cols-3 gap-8">
            <div className="bg-[#15191E] border border-white/10 rounded-3xl p-8 flex flex-col justify-between">
              <div>
                <span className="text-xs uppercase tracking-widest text-[#A7ADB4] font-semibold">Standard</span>
                <h3 className="text-3xl font-serif font-bold text-white mt-2 mb-4">Professional Review</h3>
                <div className="text-3xl font-bold text-[#D4AF37] mb-6">KES 15,000 <span className="text-xs text-[#A7ADB4] font-normal">/ application</span></div>
                <p className="text-[#A7ADB4] text-sm mb-6">For individual travelers requiring professional guidance and accurate form preparation.</p>
                <ul className="space-y-3 mb-8 text-sm text-gray-300">
                  <li className="flex items-center space-x-3"><Check className="w-4 h-4 text-[#D4AF37]" /><span>Document checklist audit</span></li>
                  <li className="flex items-center space-x-3"><Check className="w-4 h-4 text-[#D4AF37]" /><span>Online form assistance</span></li>
                  <li className="flex items-center space-x-3"><Check className="w-4 h-4 text-[#D4AF37]" /><span>Standard email support</span></li>
                </ul>
              </div>
              <button 
                onClick={() => { notify('Selected Standard Package'); setActiveTab('portal'); }}
                className="w-full py-3.5 rounded-xl bg-[#1c222d] text-white font-semibold text-sm hover:bg-[#D4AF37] hover:text-[#0F1115] transition-all"
              >
                Select Standard
              </button>
            </div>

            <div className="bg-[#15191E] border-2 border-[#D4AF37] rounded-3xl p-8 flex flex-col justify-between relative shadow-2xl scale-105">
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-[#D4AF37] text-[#11130F] text-xs font-bold uppercase tracking-wider">
                Most Popular
              </div>
              <div>
                <span className="text-xs uppercase tracking-widest text-[#D4AF37] font-semibold">VIP Concierge</span>
                <h3 className="text-3xl font-serif font-bold text-white mt-2 mb-4">Executive White-Glove</h3>
                <div className="text-3xl font-bold text-[#D4AF37] mb-6">KES 50,000 <span className="text-xs text-[#A7ADB4] font-normal">/ application</span></div>
                <p className="text-gray-300 text-sm mb-6">For executives, founders, and frequent travelers needing priority appointments and dedicated managers.</p>
                <ul className="space-y-3 mb-8 text-sm text-gray-200">
                  <li className="flex items-center space-x-3"><Check className="w-4 h-4 text-[#D4AF37]" /><span>Priority VIP Lounge Booking</span></li>
                  <li className="flex items-center space-x-3"><Check className="w-4 h-4 text-[#D4AF37]" /><span>Dedicated Senior Case Manager</span></li>
                  <li className="flex items-center space-x-3"><Check className="w-4 h-4 text-[#D4AF37]" /><span>Zero-Knowledge Secure Vault</span></li>
                  <li className="flex items-center space-x-3"><Check className="w-4 h-4 text-[#D4AF37]" /><span>24/7 Active Traveler Support</span></li>
                </ul>
              </div>
              <button 
                onClick={() => { notify('Selected VIP Concierge Package'); setActiveTab('portal'); }}
                className="w-full py-3.5 rounded-xl bg-[#D4AF37] text-[#11130F] font-bold text-sm shadow-lg hover:brightness-110 transition-all"
              >
                Secure VIP Dossier
              </button>
            </div>

            <div className="bg-[#15191E] border border-white/10 rounded-3xl p-8 flex flex-col justify-between">
              <div>
                <span className="text-xs uppercase tracking-widest text-[#A7ADB4] font-semibold">Institutional</span>
                <h3 className="text-3xl font-serif font-bold text-white mt-2 mb-4">Diplomatic Retainer</h3>
                <div className="text-3xl font-bold text-[#D4AF37] mb-6">Custom <span className="text-xs text-[#A7ADB4] font-normal">/ month</span></div>
                <p className="text-[#A7ADB4] text-sm mb-6">Comprehensive mobility infrastructure for embassies, NGOs, law firms, and multi-national boards.</p>
                <ul className="space-y-3 mb-8 text-sm text-gray-300">
                  <li className="flex items-center space-x-3"><Check className="w-4 h-4 text-[#D4AF37]" /><span>Multi-delegate dashboard</span></li>
                  <li className="flex items-center space-x-3"><Check className="w-4 h-4 text-[#D4AF37]" /><span>SWIFT/SEPA corporate billing</span></li>
                  <li className="flex items-center space-x-3"><Check className="w-4 h-4 text-[#D4AF37]" /><span>Dedicated diplomatic attaché</span></li>
                </ul>
              </div>
              <button 
                onClick={() => { notify('Requested Corporate Consultation'); setActiveTab('corporate'); }}
                className="w-full py-3.5 rounded-xl bg-[#1c222d] text-white font-semibold text-sm hover:bg-[#D4AF37] hover:text-[#0F1115] transition-all"
              >
                Request Enterprise Quote
              </button>
            </div>
          </div>
        </div>
      )}

      {/* CORPORATE TAB */}
      {activeTab === 'corporate' && (
        <div className="px-6 lg:px-16 py-16 max-w-7xl mx-auto">
          <div className="bg-[#15191E] border border-[#D4AF37]/30 rounded-3xl p-8 lg:p-16 grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="text-[9px] uppercase tracking-[0.17em] text-[#D4AF37] font-bold">Institutional Mobility</span>
              <h1 className="text-4xl font-display font-medium text-white mt-3 mb-6">Corporate Mobility Infrastructure</h1>
              <p className="text-[#A7ADB4] leading-relaxed mb-8">
                Managing international relocations, executive board travel, and diplomatic delegations requires enterprise-grade precision. Our multi-delegate portal and dedicated corporate retainers ensure absolute compliance across all jurisdictions.
              </p>
              <button 
                onClick={() => notify('Corporate consultation request received. Our Director will contact you.')}
                className="px-8 py-4 bg-[#D4AF37] text-[#11130F] font-bold text-[10px] tracking-[0.11em] uppercase shadow-xl hover:bg-[#E4C65A] transition-all"
              >
                Schedule Executive Briefing
              </button>
            </div>
            <div className="bg-[#0F1115] border border-white/10 rounded-2xl p-8 space-y-6">
              <h3 className="text-xl font-serif font-bold text-white">Institutional Inquiry</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-xs uppercase tracking-wider text-[#A7ADB4] mb-2">Organization Name</label>
                  <input type="text" placeholder="Global Advisory Group Ltd" className="w-full bg-[#15191E] border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-[#D4AF37]" />
                </div>
                <div>
                  <label className="block text-xs uppercase tracking-wider text-[#A7ADB4] mb-2">Corporate Email</label>
                  <input type="email" placeholder="executives@globaladvisory.com" className="w-full bg-[#15191E] border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-[#D4AF37]" />
                </div>
                <button 
                  onClick={() => notify('Enterprise inquiry submitted successfully.')}
                  className="w-full py-3.5 bg-[#D4AF37] text-[#11130F] font-bold text-sm uppercase tracking-wider hover:bg-[#E4C65A] transition-all mt-4"
                >
                  Submit Inquiry
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* CLIENT PORTAL TAB */}
      {activeTab === 'portal' && (
        <div className="px-6 lg:px-16 py-16 max-w-7xl mx-auto">
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 pb-6 border-b border-white/10">
            <div>
              <span className="text-xs uppercase tracking-widest text-[#D4AF37] font-semibold">Secure Client Portal</span>
              <h1 className="text-3xl font-serif font-bold text-white mt-1">VIP Dossier #VS-9824</h1>
            </div>
            <div className="mt-4 md:mt-0 flex items-center space-x-3">
              <span className="px-3 py-1 rounded-full bg-[#0D3C26] text-[#D4AF37] text-xs font-semibold border border-[#D4AF37]/30 flex items-center space-x-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                <span>Active Concierge: Senior Producer Assigned</span>
              </span>
            </div>
          </div>

          {/* Portal Nav Subtabs */}
          <div className="flex space-x-4 mb-8">
            {['overview', 'vault', 'tracker'].map((tab) => (
              <button
                key={tab}
                onClick={() => setPortalTab(tab)}
                className={`px-6 py-2.5 rounded-xl font-medium text-sm capitalize transition-all ${portalTab === tab ? 'bg-[#D4AF37] text-[#11130F] font-bold' : 'bg-[#15191E] text-[#A7ADB4] hover:text-white border border-white/10'}`}
              >
                {tab === 'vault' ? 'Encrypted Vault & Requirements' : tab}
              </button>
            ))}
          </div>

          {portalTab === 'overview' && (
            <div className="grid lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 space-y-8">
                <div className="bg-[#15191E] border border-[#D4AF37]/20 rounded-2xl p-8">
                  <h3 className="text-xl font-serif font-bold text-white mb-4">Application Summary</h3>
                  <div className="grid sm:grid-cols-2 gap-6 mb-6">
                    <div>
                      <span className="text-xs text-[#A7ADB4] uppercase tracking-wider">Destination Jurisdiction</span>
                      <div className="text-white font-semibold text-lg mt-1">{docRequirements[vaultCountry]?.name || 'United Kingdom'}</div>
                    </div>
                    <div>
                      <span className="text-xs text-[#A7ADB4] uppercase tracking-wider">Visa Seeking</span>
                      <div className="text-[#D4AF37] font-semibold text-lg mt-1 capitalize">{vaultVisaType} Visa</div>
                    </div>
                  </div>
                  <div className="p-4 rounded-xl bg-[#0F1115] border border-white/10 flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <ShieldCheck className="w-6 h-6 text-[#D4AF37]" />
                      <div>
                        <div className="text-sm font-semibold text-white">Zero-Knowledge Encrypted Vault Status</div>
                        <div className="text-xs text-[#A7ADB4]">All uploaded credentials secured with AES-256 encryption</div>
                      </div>
                    </div>
                    <span className="text-xs text-emerald-400 font-semibold px-3 py-1 rounded bg-emerald-950/50 border border-emerald-800">Secure</span>
                  </div>
                </div>

                <div className="bg-[#15191E] border border-[#D4AF37]/20 rounded-2xl p-8">
                  <h3 className="text-xl font-serif font-bold text-white mb-4">Assigned Concierge Producer</h3>
                  <div className="flex items-center space-x-4">
                    <div className="w-14 h-14 rounded-full bg-[#0D3C26] border border-[#D4AF37] flex items-center justify-center text-lg font-bold text-[#D4AF37]">
                      VC
                    </div>
                    <div>
                      <div className="text-lg font-semibold text-white">Victoria Carrington</div>
                      <div className="text-xs text-[#A7ADB4]">Senior Diplomatic & Executive Mobility Lead</div>
                      <div className="text-xs text-[#D4AF37] mt-1">Direct Secure Line: +254731454685</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Quick Actions Sidebar */}
              <div className="bg-[#15191E] border border-[#D4AF37]/20 rounded-2xl p-8 space-y-6">
                <h3 className="text-lg font-serif font-bold text-white">Secure Actions</h3>
                
                <a 
                  href="https://wa.me/254731454685" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-full py-3 rounded-xl bg-[#0D3C26] border border-[#D4AF37]/40 text-[#D4AF37] font-semibold text-sm hover:bg-[#0D3C26]/80 transition-all flex items-center justify-center space-x-2 shadow-lg group"
                >
                  <MessageSquare className="w-4 h-4 text-[#D4AF37] group-hover:scale-110 transition-transform" />
                  <span>Direct Producer WhatsApp</span>
                </a>

                <button 
                  onClick={() => notify('Invoice receipt downloaded successfully.')}
                  className="w-full py-3 rounded-xl bg-[#1c222d] text-gray-300 font-semibold text-sm hover:text-white transition-all flex items-center justify-center space-x-2"
                >
                  <FileText className="w-4 h-4" />
                  <span>Download Official Invoice</span>
                </button>
              </div>
            </div>
          )}

          {portalTab === 'vault' && (
            <div className="space-y-8">
              {/* Top Configuration Bar & Consultation Trigger */}
              <div className="bg-[#15191E] border border-[#D4AF37]/30 rounded-2xl p-6 lg:p-8">
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 mb-6 pb-6 border-b border-white/10">
                  <div>
                    <h3 className="text-2xl font-serif font-bold text-white">Encrypted Document Vault</h3>
                    <p className="text-[#A7ADB4] text-sm mt-1">Configure your destination jurisdiction and visa type to generate exact document requirements.</p>
                  </div>
                  
                  {/* NEED CONSULTATION BUTTON */}
                  <button 
                    onClick={() => setShowConsultModal(true)}
                    className="px-5 py-3 rounded-xl bg-[#0D3C26] border border-[#D4AF37] text-[#D4AF37] font-semibold text-xs hover:bg-[#D4AF37] hover:text-[#0F1115] transition-all flex items-center justify-center space-x-2 shadow-lg shrink-0"
                  >
                    <HelpCircle className="w-4 h-4" />
                    <span>Unsure of Requirements? Consult Specialist</span>
                  </button>
                </div>

                {/* Country & Visa Selector Dropdowns */}
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-xs uppercase tracking-wider text-[#D4AF37] font-semibold mb-2">
                      1. Target Country / Region
                    </label>
                    <div className="relative">
                      <select 
                        value={vaultCountry}
                        onChange={(e) => setVaultCountry(e.target.value)}
                        className="w-full bg-[#0F1115] border border-[#D4AF37]/40 rounded-xl px-4 py-3.5 text-white text-sm focus:outline-none focus:border-[#D4AF37] appearance-none cursor-pointer pr-10"
                      >
                        <option value="uk">United Kingdom (UKVI / TLScontact)</option>
                        <option value="schengen">Schengen Area (France, Germany, Switzerland, etc.)</option>
                        <option value="usa">United States (US Embassy / DS-160)</option>
                        <option value="uae">United Arab Emirates (UAE / Dubai Residency)</option>
                      </select>
                      <ChevronDown className="w-4 h-4 text-[#D4AF37] absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none" />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs uppercase tracking-wider text-[#D4AF37] font-semibold mb-2">
                      2. Visa Type / Visa Seeking
                    </label>
                    <div className="relative">
                      <select 
                        value={vaultVisaType}
                        onChange={(e) => setVaultVisaType(e.target.value)}
                        className="w-full bg-[#0F1115] border border-[#D4AF37]/40 rounded-xl px-4 py-3.5 text-white text-sm focus:outline-none focus:border-[#D4AF37] appearance-none cursor-pointer pr-10 capitalize"
                      >
                        <option value="business">Business Executive / Delegation Visa</option>
                        <option value="tourism">Tourism / Private / Family Visit Visa</option>
                        <option value="official">Official Visit / Diplomatic Pass / Note Verbale</option>
                        <option value="student">Student / Higher Education Visa</option>
                      </select>
                      <ChevronDown className="w-4 h-4 text-[#D4AF37] absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Dynamic Document List based on selection */}
              <div className="bg-[#15191E] border border-[#D4AF37]/20 rounded-2xl p-6 lg:p-8">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
                  <div>
                    <span className="text-xs uppercase tracking-widest text-emerald-400 font-semibold flex items-center space-x-1">
                      <ShieldCheck className="w-4 h-4" />
                      <span>Verified Consular Checklist</span>
                    </span>
                    <h4 className="text-xl font-serif font-bold text-white mt-1">
                      Required Documentation: {docRequirements[vaultCountry]?.name} — <span className="text-[#D4AF37] capitalize">{vaultVisaType} Visa</span>
                    </h4>
                  </div>
                  <span className="text-xs text-[#A7ADB4] bg-[#0F1115] px-3 py-1.5 rounded-lg border border-white/10 self-start md:self-auto">
                    256-Bit Client-Side Encryption
                  </span>
                </div>

                {/* Client Contact Info for Documentation Review */}
                <div className="bg-[#0F1115] border border-[#D4AF37]/30 rounded-xl p-5 mb-8">
                  <div className="flex items-center space-x-2 mb-3">
                    <PhoneCall className="w-4 h-4 text-[#D4AF37]" />
                    <h5 className="text-sm font-semibold text-white">Dossier Contact Credentials</h5>
                    <span className="text-[10px] text-[#A7ADB4]">(For urgent consular updates & status alerts)</span>
                  </div>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs text-[#A7ADB4] mb-1">Email Address for Dispatch</label>
                      <input 
                        type="email" 
                        placeholder="executive@domain.com"
                        className="w-full bg-[#15191E] border border-white/10 rounded-lg px-3.5 py-2.5 text-white text-xs focus:outline-none focus:border-[#D4AF37]"
                      />
                    </div>
                    <div>
                      <label className="block text-xs text-[#A7ADB4] mb-1">Phone / WhatsApp Number</label>
                      <input 
                        type="tel" 
                        placeholder="+254 700 000 000"
                        className="w-full bg-[#15191E] border border-white/10 rounded-lg px-3.5 py-2.5 text-white text-xs focus:outline-none focus:border-[#D4AF37]"
                      />
                    </div>
                  </div>
                </div>

                {/* Specific Document Upload Cards */}
                <div className="space-y-4">
                  {docRequirements[vaultCountry]?.types[vaultVisaType]?.map((req) => {
                    // INTERACTIVE FLIGHT & ACCOMMODATION ITEM
                    if (req.isItineraryInteractive) {
                      return (
                        <div 
                          key={req.id} 
                          className="p-5 rounded-2xl border bg-[#0F1115] border-[#D4AF37]/40 hover:border-[#D4AF37] transition-all space-y-4"
                        >
                          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                            <div className="flex items-start space-x-4">
                              <div className="w-10 h-10 rounded-xl bg-[#0D3C26] text-[#D4AF37] border border-[#D4AF37]/40 flex items-center justify-center shrink-0 mt-0.5">
                                <Plane className="w-5 h-5" />
                              </div>
                              <div>
                                <div className="flex items-center space-x-2">
                                  <h5 className="text-white font-semibold text-sm">{req.label}</h5>
                                  <span className="text-[10px] font-semibold text-[#A7ADB4] bg-gray-900 border border-white/10 px-2 py-0.5 rounded">Optional / Supporting</span>
                                </div>
                                <p className="text-xs text-[#A7ADB4] mt-1">
                                  Do you already have pre-booked flight tickets and accommodation details?
                                </p>
                              </div>
                            </div>

                            {/* Question Choice Buttons */}
                            <div className="flex items-center space-x-3 shrink-0">
                              <button
                                onClick={() => setHasPrebookedItinerary('yes')}
                                className={`px-4 py-2 rounded-xl text-xs font-semibold border transition-all ${
                                  hasPrebookedItinerary === 'yes'
                                    ? 'bg-[#D4AF37] text-[#11130F] border-[#D4AF37]'
                                    : 'bg-[#181d26] text-gray-300 border-gray-700 hover:border-[#D4AF37]'
                                }`}
                              >
                                Yes, I Have Booked
                              </button>
                              <button
                                onClick={() => setHasPrebookedItinerary('no')}
                                className={`px-4 py-2 rounded-xl text-xs font-semibold border transition-all ${
                                  hasPrebookedItinerary === 'no'
                                    ? 'bg-[#0D3C26] text-[#D4AF37] border-[#D4AF37]'
                                    : 'bg-[#181d26] text-gray-300 border-gray-700 hover:border-[#D4AF37]'
                                }`}
                              >
                                No, I Need Booking
                              </button>
                            </div>
                          </div>

                          {/* IF USER SELECTED YES: SHOW UPLOAD SPACES */}
                          {hasPrebookedItinerary === 'yes' && (
                            <div className="mt-4 pt-4 border-t border-white/10 grid md:grid-cols-2 gap-4 animate-fadeIn">
                              <div className="p-4 rounded-xl bg-[#15191E] border border-white/10 flex flex-col justify-between space-y-3">
                                <div className="flex items-center space-x-3">
                                  <Plane className="w-4 h-4 text-[#D4AF37]" />
                                  <span className="text-xs font-semibold text-white">Flight Itinerary / Ticket Confirmation</span>
                                </div>
                                {uploadedFiles['flight_doc'] ? (
                                  <div className="text-xs text-emerald-400 flex items-center space-x-1.5 font-medium">
                                    <CheckCircle2 className="w-4 h-4" />
                                    <span>Uploaded: {uploadedFiles['flight_doc'].name}</span>
                                  </div>
                                ) : (
                                  <button 
                                    onClick={() => handleUpload('flight_doc', 'Flight_Ticket')}
                                    className="w-full py-2.5 rounded-lg bg-[#0D3C26] hover:bg-[#D4AF37] hover:text-[#0F1115] text-[#D4AF37] border border-[#D4AF37]/30 text-xs font-semibold transition-all flex items-center justify-center space-x-2"
                                  >
                                    <Upload className="w-3.5 h-3.5" />
                                    <span>Upload Flight Booking</span>
                                  </button>
                                )}
                              </div>

                              <div className="p-4 rounded-xl bg-[#15191E] border border-white/10 flex flex-col justify-between space-y-3">
                                <div className="flex items-center space-x-3">
                                  <Building2 className="w-4 h-4 text-[#D4AF37]" />
                                  <span className="text-xs font-semibold text-white">Hotel Booking / Lease Agreement</span>
                                </div>
                                {uploadedFiles['hotel_doc'] ? (
                                  <div className="text-xs text-emerald-400 flex items-center space-x-1.5 font-medium">
                                    <CheckCircle2 className="w-4 h-4" />
                                    <span>Uploaded: {uploadedFiles['hotel_doc'].name}</span>
                                  </div>
                                ) : (
                                  <button 
                                    onClick={() => handleUpload('hotel_doc', 'Hotel_Booking')}
                                    className="w-full py-2.5 rounded-lg bg-[#0D3C26] hover:bg-[#D4AF37] hover:text-[#0F1115] text-[#D4AF37] border border-[#D4AF37]/30 text-xs font-semibold transition-all flex items-center justify-center space-x-2"
                                  >
                                    <Upload className="w-3.5 h-3.5" />
                                    <span>Upload Hotel Booking</span>
                                  </button>
                                )}
                              </div>
                            </div>
                          )}

                          {/* IF USER SELECTED NO: SHOW FEE OFFER & ASSISTANCE BUTTON */}
                          {hasPrebookedItinerary === 'no' && (
                            <div className="mt-4 pt-4 border-t border-white/10 bg-[#15191E] p-4 rounded-xl border border-[#D4AF37]/30 flex flex-col sm:flex-row sm:items-center justify-between gap-4 animate-fadeIn">
                              <div>
                                <h6 className="text-sm font-semibold text-[#D4AF37] flex items-center space-x-2">
                                  <Sparkles className="w-4 h-4" />
                                  <span>Concierge Itinerary & Booking Service</span>
                                </h6>
                                <p className="text-xs text-gray-300 mt-1 max-w-xl leading-relaxed">
                                  We can issue official, verifiable flight reservations and hotel vouchers tailored specifically for your visa application requirements at a standard concierge fee (KES 5,000 / $40).
                                </p>
                              </div>
                              <button 
                                onClick={() => {
                                  notify('Itinerary arrangement request sent to Victoria Carrington.');
                                  setShowConsultModal(true);
                                }}
                                className="px-5 py-2.5 rounded-xl bg-[#D4AF37] text-[#11130F] font-bold text-xs hover:brightness-110 transition-all shrink-0 flex items-center justify-center space-x-2"
                              >
                                <span>Request Booking at Fee</span>
                                <ArrowRight className="w-4 h-4" />
                              </button>
                            </div>
                          )}
                        </div>
                      );
                    }

                    // STANDARD DOCUMENT UPLOAD ITEM
                    const isUploaded = uploadedFiles[req.id];
                    return (
                      <div 
                        key={req.id} 
                        className={`p-5 rounded-2xl border transition-all flex flex-col md:flex-row md:items-center justify-between gap-4 ${isUploaded ? 'bg-[#0D3C26]/20 border-emerald-500/50' : 'bg-[#0F1115] border-white/10 hover:border-[#D4AF37]/40'}`}
                      >
                        <div className="flex items-start space-x-4">
                          <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 mt-0.5 ${isUploaded ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40' : 'bg-[#181d26] text-[#D4AF37] border border-gray-700'}`}>
                            {isUploaded ? <Check className="w-5 h-5" /> : <FileText className="w-5 h-5" />}
                          </div>
                          <div>
                            <div className="flex items-center space-x-2">
                              <h5 className="text-white font-semibold text-sm">{req.label}</h5>
                              {req.mandatory ? (
                                <span className="text-[10px] font-semibold text-rose-400 bg-rose-950/60 border border-rose-800 px-2 py-0.5 rounded">Mandatory</span>
                              ) : (
                                <span className="text-[10px] font-semibold text-[#A7ADB4] bg-gray-900 border border-white/10 px-2 py-0.5 rounded">Optional / Supporting</span>
                              )}
                            </div>
                            <p className="text-xs text-[#A7ADB4] mt-1">
                              {isUploaded ? `Encrypted file attached: ${isUploaded.name} (${isUploaded.timestamp})` : "PDF, JPG, PNG accepted. Max 25MB per document."}
                            </p>
                          </div>
                        </div>

                        <div className="shrink-0 flex items-center space-x-3">
                          {isUploaded ? (
                            <span className="px-4 py-2 rounded-xl bg-emerald-950/60 border border-emerald-800 text-emerald-400 text-xs font-semibold flex items-center space-x-1.5">
                              <CheckCircle2 className="w-4 h-4" />
                              <span>Verified Vault File</span>
                            </span>
                          ) : (
                            <button 
                              onClick={() => handleUpload(req.id, req.label)}
                              className="px-5 py-2.5 rounded-xl bg-[#0D3C26] hover:bg-[#D4AF37] hover:text-[#0F1115] text-[#D4AF37] border border-[#D4AF37]/40 font-semibold text-xs transition-all flex items-center space-x-2 shadow-md"
                            >
                              <Upload className="w-4 h-4" />
                              <span>Upload Credentials</span>
                            </button>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          )}

          {/* APPLICATION TIMELINE TRACKER */}
          {portalTab === 'tracker' && (
            <div className="bg-[#15191E] border border-[#D4AF37]/20 rounded-2xl p-8">
              <h3 className="text-xl font-serif font-bold text-white mb-6">Real-Time Application Timeline</h3>
              <div className="space-y-8 relative before:absolute before:inset-0 before:left-6 before:w-0.5 before:bg-[#D4AF37]/20">
                <div className="relative flex items-start space-x-6">
                  <div className="w-12 h-12 rounded-full bg-[#0D3C26] border border-[#D4AF37] flex items-center justify-center shrink-0 z-10">
                    <Check className="w-5 h-5 text-[#D4AF37]" />
                  </div>
                  <div>
                    <h4 className="text-white font-semibold">Dossier Initialized & Vetted</h4>
                    <p className="text-xs text-[#A7ADB4] mt-1">Completed by compliance officer Victoria Carrington.</p>
                  </div>
                </div>
                <div className="relative flex items-start space-x-6">
                  <div className="w-12 h-12 rounded-full bg-[#0D3C26] border border-[#D4AF37] flex items-center justify-center shrink-0 z-10">
                    <Check className="w-5 h-5 text-[#D4AF37]" />
                  </div>
                  <div>
                    <h4 className="text-white font-semibold">Biometric Appointment Booked</h4>
                    <p className="text-xs text-[#A7ADB4] mt-1">TLScontact VIP Lounge confirmed for Thursday, 10:00 AM.</p>
                  </div>
                </div>
                <div className="relative flex items-start space-x-6">
                  <div className="w-12 h-12 rounded-full bg-[#1c222d] border border-gray-700 flex items-center justify-center shrink-0 z-10">
                    <Clock className="w-5 h-5 text-[#D4AF37]" />
                  </div>
                  <div>
                    <h4 className="text-white font-semibold">Consular Submission & Adjudication</h4>
                    <p className="text-xs text-[#A7ADB4] mt-1">Pending biometric capture and embassy queue routing.</p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* CONSULTATION MODAL */}
      {showConsultModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-[#15191E] border border-[#D4AF37] rounded-3xl max-w-lg w-full p-8 shadow-2xl relative">
            <button 
              onClick={() => setShowConsultModal(false)}
              className="absolute top-6 right-6 text-[#A7ADB4] hover:text-white"
            >
              <X className="w-6 h-6" />
            </button>
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-[#0D3C26] border border-[#D4AF37] flex items-center justify-center">
                <HelpCircle className="w-5 h-5 text-[#D4AF37]" />
              </div>
              <div>
                <h3 className="text-xl font-serif font-bold text-white">Consular Requirement Advisory</h3>
                <span className="text-xs text-[#D4AF37]">Senior Producer On-Call</span>
              </div>
            </div>
            <p className="text-sm text-gray-300 mb-6 leading-relaxed">
              Unsure of complex diplomatic credentials, Note Verbale requirements, or specific financial thresholds for {docRequirements[vaultCountry]?.name}? Direct your query below for immediate guidance.
            </p>
            <div className="space-y-4 mb-6">
              <div>
                <label className="block text-xs uppercase tracking-wider text-[#A7ADB4] mb-2">Your Specific Destination & Query</label>
                <textarea 
                  rows={4}
                  value={consultQuestion}
                  onChange={(e) => setConsultQuestion(e.target.value)}
                  placeholder="e.g. I am traveling on an official diplomatic mission to Switzerland via London. Do I need an MFA Note Verbale for both consular steps?"
                  className="w-full bg-[#0F1115] border border-white/10 rounded-xl p-4 text-white text-sm focus:outline-none focus:border-[#D4AF37]"
                />
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <button 
                onClick={() => {
                  setShowConsultModal(false);
                  setConsultQuestion('');
                  notify('Advisory request logged. Victoria Carrington will reply via WhatsApp/Email within 15 mins.');
                }}
                className="flex-1 py-3.5 rounded-xl bg-[#D4AF37] text-[#11130F] font-bold text-sm hover:brightness-110 transition-all flex items-center justify-center space-x-2"
              >
                <Send className="w-4 h-4" />
                <span>Submit Query to Producer</span>
              </button>
              <a 
                href="https://wa.me/254731454685" 
                target="_blank" 
                rel="noopener noreferrer"
                className="py-3.5 px-4 rounded-xl bg-[#0D3C26] border border-[#D4AF37]/50 text-[#D4AF37] font-semibold text-sm hover:bg-[#0D3C26]/80 transition-all flex items-center space-x-2"
              >
                <MessageSquare className="w-4 h-4" />
                <span>Instant WhatsApp</span>
              </a>
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="bg-[#090A0D] border-t border-[#D4AF37]/25 px-6 lg:px-16 py-12 mt-20">
        <div className="max-w-7xl mx-auto grid md:grid-cols-4 gap-8 mb-12">
          <div>
            <div className="flex items-center space-x-3 mb-4">
              <Globe className="w-5 h-5 text-[#D4AF37]" />
              <span className="text-lg font-serif font-bold text-white">VISARA<span className="text-[#D4AF37]">TRAVEL</span></span>
            </div>
            <p className="text-xs text-[#A7ADB4] leading-relaxed">
              Global mobility, visa concierge, and diplomatic travel execution for high-net-worth clients worldwide.
            </p>
          </div>
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-widest text-[#D4AF37] mb-4">Global Hubs</h4>
            <ul className="space-y-2 text-xs text-[#A7ADB4]">
              <li><button onClick={() => setActiveTab('services')} className="hover:text-white">United Kingdom (TLS)</button></li>
              <li><button onClick={() => setActiveTab('services')} className="hover:text-white">Schengen Area</button></li>
              <li><button onClick={() => setActiveTab('services')} className="hover:text-white">United States & Canada</button></li>
              <li><button onClick={() => setActiveTab('services')} className="hover:text-white">UAE & Diplomatic</button></li>
            </ul>
          </div>
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-widest text-[#D4AF37] mb-4">Enterprise</h4>
            <ul className="space-y-2 text-xs text-[#A7ADB4]">
              <li><button onClick={() => setActiveTab('corporate')} className="hover:text-white">Corporate Retainers</button></li>
              <li><button onClick={() => setActiveTab('concierge')} className="hover:text-white">VIP Concierge Tiers</button></li>
              <li><button onClick={() => setActiveTab('portal')} className="hover:text-white">Encrypted Vault</button></li>
            </ul>
          </div>
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-widest text-[#D4AF37] mb-4">Secure Contact</h4>
            <p className="text-xs text-[#A7ADB4] mb-2">Global Dispatch: +254731454685</p>
            <p className="text-xs text-[#A7ADB4] mb-4">Email: concierge@visaratravel.com</p>
            <span className="inline-block px-3 py-1 rounded bg-[#0D3C26] text-[#D4AF37] text-[10px] font-semibold border border-[#D4AF37]/30">
              visaratravel.com 2026
            </span>
          </div>
        </div>
        <div className="max-w-7xl mx-auto pt-8 border-t border-white/10 text-center text-xs text-[#777E85]">
          © 2026 Visaratravel. All rights reserved. Operating under strict international privacy and zero-knowledge data protection standards.
        </div>
      </footer>
    </div>
  );
}