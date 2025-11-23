"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import {
  User,
  Shield,
  Users,
  Lock,
  Bell,
  Palette,
  Globe,
  Battery,
  CreditCard,
  Crown,
  HelpCircle,
  MessageSquare,
  Send,
  Share2,
  BookOpen,
  FileText,
  Scale,
  Award,
  LogOut,
  ChevronRight,
  Mail,
  Phone,
  AlertTriangle,
  Trash2,
  Flag,
  Loader2,
  ArrowLeft,
} from "lucide-react";

interface UserProfile {
  id: string;
  email: string | null;
  username: string | null;
  fullName: string | null;
  avatarUrl: string | null;
  createdAt: Date;
  updatedAt: Date | null;
}

interface UserStats {
  booksInLibrary: number;
  reviewsWritten: number;
  commentsPosted: number;
}

type SettingSection =
  | "account-security"
  | "account-sharing"
  | "blocked-accounts"
  | "theme"
  | "language"
  | "notification"
  | "content-preferences"
  | "data-usage"
  | "battery-usage"
  | "payment-method"
  | "membership"
  | "help-center"
  | "report"
  | "feedback"
  | "social-media"
  | "about"
  | "terms"
  | "privacy"
  | "code-of-conduct"
  | "content-guidelines"
  | "licenses";

export default function SettingsPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [activeSection, setActiveSection] =
    useState<SettingSection>("account-security");
  const [searchQuery, setSearchQuery] = useState("");
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [userStats, setUserStats] = useState<UserStats | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  
  // Detail view states
  const [detailView, setDetailView] = useState<string | null>(null);

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/auth/signin");
    }
  }, [status, router]);

  useEffect(() => {
    if (session?.user?.id) {
      fetchUserProfile();
    }
  }, [session?.user?.id]);

  const fetchUserProfile = async () => {
    try {
      setIsLoading(true);
      const response = await fetch("/api/profile");
      if (response.ok) {
        const data = await response.json();
        setUserProfile(data.profile);
        setUserStats(data.stats);
      }
    } catch (error) {
      console.error("Failed to fetch profile:", error);
    } finally {
      setIsLoading(false);
    }
  };

  if (status === "loading" || isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-black">
        <Loader2 className="w-8 h-8 text-p2 animate-spin" />
      </div>
    );
  }

  if (!session) {
    return null;
  }

  const menuItems = [
    {
      category: "ACCOUNT",
      items: [
        {
          id: "account-security" as const,
          label: "Account & Security",
          icon: User,
        },
        {
          id: "account-sharing" as const,
          label: "Account Sharing",
          icon: Users,
        },
        {
          id: "blocked-accounts" as const,
          label: "Blocked Accounts",
          icon: Lock,
        },
      ],
    },
    {
      category: "APP",
      items: [
        { id: "theme" as const, label: "Theme", icon: Palette },
        { id: "language" as const, label: "Language", icon: Globe },
        { id: "notification" as const, label: "Notification", icon: Bell },
        {
          id: "content-preferences" as const,
          label: "Content Preferences",
          icon: BookOpen,
        },
        {
          id: "data-usage" as const,
          label: "Data Usage Settings",
          icon: Share2,
        },
        {
          id: "battery-usage" as const,
          label: "Battery Usage Settings",
          icon: Battery,
        },
      ],
    },
    {
      category: "PAYMENT & MEMBERSHIP",
      items: [
        {
          id: "payment-method" as const,
          label: "Payment Method",
          icon: CreditCard,
        },
        { id: "membership" as const, label: "Membership", icon: Crown },
      ],
    },
    {
      category: "CONTACT US",
      items: [
        { id: "help-center" as const, label: "Help Center", icon: HelpCircle },
        { id: "report" as const, label: "Report", icon: Flag },
        { id: "feedback" as const, label: "Feedback", icon: MessageSquare },
        { id: "social-media" as const, label: "Social Media", icon: Send },
      ],
    },
    {
      category: "ABOUT US",
      items: [
        { id: "about" as const, label: "About LarLar Books", icon: BookOpen },
        { id: "terms" as const, label: "Terms of Use", icon: FileText },
        { id: "privacy" as const, label: "Privacy Policy", icon: Shield },
        {
          id: "code-of-conduct" as const,
          label: "Code of Conduct",
          icon: Award,
        },
        {
          id: "content-guidelines" as const,
          label: "Content Guidelines",
          icon: Scale,
        },
        { id: "licenses" as const, label: "Licenses", icon: FileText },
      ],
    },
  ];

  const handleBackAndRefresh = async () => {
    setDetailView(null);
    await fetchUserProfile();
  };

  const renderContent = () => {
    // Handle detail views first
    if (detailView === "email") {
      return <EmailDetailView profile={userProfile} onBack={handleBackAndRefresh} />;
    }
    if (detailView === "username") {
      return <UsernameDetailView profile={userProfile} onBack={handleBackAndRefresh} />;
    }
    if (detailView === "phone") {
      return <PhoneDetailView profile={userProfile} onBack={handleBackAndRefresh} />;
    }
    if (detailView === "security") {
      return <SecurityDetailView onBack={() => setDetailView(null)} onNavigate={setDetailView} />;
    }
    if (detailView === "change-password") {
      return <ChangePasswordView onBack={() => setDetailView("security")} />;
    }
    if (detailView === "2fa") {
      return <TwoFactorAuthView onBack={() => setDetailView("security")} />;
    }
    
    // Handle section views
    switch (activeSection) {
      case "account-security":
        return (
          <AccountSecurityContent 
            profile={userProfile} 
            stats={userStats}
            onNavigate={setDetailView}
          />
        );
      case "account-sharing":
        return <AccountSharingContent />;
      case "blocked-accounts":
        return <BlockedAccountsContent />;
      case "theme":
        return <ThemeContent />;
      case "language":
        return <LanguageContent />;
      case "notification":
        return <NotificationContent />;
      case "content-preferences":
        return <ContentPreferencesContent />;
      case "data-usage":
        return <DataUsageContent />;
      case "battery-usage":
        return <BatteryUsageContent />;
      case "payment-method":
        return <PaymentMethodContent />;
      case "membership":
        return <MembershipContent stats={userStats} />;
      case "help-center":
        return <HelpCenterContent />;
      case "report":
        return <ReportContent />;
      case "feedback":
        return <FeedbackContent />;
      case "social-media":
        return <SocialMediaContent />;
      case "about":
        return <AboutContent />;
      case "terms":
        return <TermsContent />;
      case "privacy":
        return <PrivacyContent />;
      case "code-of-conduct":
        return <CodeOfConductContent />;
      case "content-guidelines":
        return <ContentGuidelinesContent />;
      case "licenses":
        return <LicensesContent />;
      default:
        return (
          <AccountSecurityContent 
            profile={userProfile} 
            stats={userStats}
            onNavigate={setDetailView}
          />
        );
    }
  };

  return (
    <div className="flex min-h-screen bg-black">
      {/* Sidebar */}
      <div className="w-60 bg-black border-r border-[#1a1a1a] flex flex-col">
        <div className="p-4">
          <div className="flex items-center space-x-3 mb-4">
            <button
              onClick={() => router.back()}
              className="text-gray-400 hover:text-white transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <h1 className="text-lg font-semibold text-white">Settings</h1>
          </div>

          {/* Search */}
          <input
            type="text"
            placeholder="Search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full px-3 py-2 bg-[#0a0a0a] text-white text-sm rounded-md border border-[#1a1a1a] placeholder-gray-600 focus:outline-none focus:border-[#2a2a2a]"
          />
        </div>

        {/* Menu Items */}
        <div className="flex-1 overflow-y-auto px-3">
          {menuItems.map((section) => (
            <div key={section.category} className="mb-5">
              <h3 className="px-2 mb-2 text-[10px] font-semibold text-gray-600 uppercase tracking-wider">
                {section.category}
              </h3>
              <div className="space-y-0.5">
                {section.items.map((item) => {
                  const Icon = item.icon;
                  const isActive = activeSection === item.id;
                  return (
                    <button
                      key={item.id}
                      onClick={() => setActiveSection(item.id)}
                      className={`w-full flex items-center px-2 py-2 text-sm rounded-md transition-colors ${
                        isActive
                          ? "bg-p2 text-white"
                          : "text-gray-400 hover:bg-[#0a0a0a] hover:text-gray-300"
                      }`}
                    >
                      <Icon className="w-4 h-4 mr-2.5 flex-shrink-0" />
                      <span className="text-left text-xs">{item.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        {/* Log out button */}
        <div className="p-3 border-t border-[#1a1a1a]">
          <button
            onClick={() => router.push("/api/auth/signout")}
            className="w-full flex items-center px-2 py-2 text-sm text-error-color hover:bg-[#0a0a0a] rounded-md transition-colors"
          >
            <LogOut className="w-4 h-4 mr-2.5" />
            <span className="text-xs">Log out</span>
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-y-auto bg-black">
        <div className="max-w-4xl mx-auto p-8">{renderContent()}</div>
      </div>
    </div>
  );
}

// Account & Security Content
function AccountSecurityContent({
  profile,
  stats,
  onNavigate,
}: {
  profile: UserProfile | null;
  stats: UserStats | null;
  onNavigate: (view: string) => void;
}) {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-white mb-1">
          Account & Security
        </h2>
        <p className="text-sm text-gray-500">
          Manage your account information and security settings
        </p>
      </div>

      {/* Account Overview */}
      <div className="p-6 bg-[#0a0a0a] rounded-lg border border-[#1a1a1a]">
        <div className="flex items-center space-x-4 mb-6">
          <div className="w-14 h-14 bg-p2 rounded-full flex items-center justify-center">
            <User className="w-7 h-7 text-white" />
          </div>
          <div>
            <h3 className="text-base font-semibold text-white">
              {profile?.fullName || profile?.username || "shane"}
            </h3>
            <p className="text-xs text-gray-500 mt-0.5">
              {profile?.email || "shanewinhtung2005@gmail.com"}
            </p>
          </div>
        </div>
        {stats && (
          <div className="grid grid-cols-3 gap-3">
            <div className="text-center p-3 bg-black rounded-md border border-[#1a1a1a]">
              <p className="text-2xl font-bold text-p2">
                {stats.booksInLibrary}
              </p>
              <p className="text-[10px] text-gray-600 mt-1 uppercase tracking-wide">
                BOOKS
              </p>
            </div>
            <div className="text-center p-3 bg-black rounded-md border border-[#1a1a1a]">
              <p className="text-2xl font-bold text-p2">
                {stats.reviewsWritten}
              </p>
              <p className="text-[10px] text-gray-600 mt-1 uppercase tracking-wide">
                REVIEWS
              </p>
            </div>
            <div className="text-center p-3 bg-black rounded-md border border-[#1a1a1a]">
              <p className="text-2xl font-bold text-p2">
                {stats.commentsPosted}
              </p>
              <p className="text-[10px] text-gray-600 mt-1 uppercase tracking-wide">
                COMMENTS
              </p>
            </div>
          </div>
        )}
      </div>

      <div className="space-y-2">
        {/* Email */}
        <div
          onClick={() => onNavigate("email")}
          className="group flex items-center justify-between p-4 bg-[#0a0a0a] rounded-lg border border-[#1a1a1a] hover:border-[#2a2a2a] transition-colors cursor-pointer"
        >
          <div className="flex items-center space-x-3">
            <div className="w-9 h-9 bg-black rounded-full flex items-center justify-center border border-[#1a1a1a]">
              <Mail className="w-4 h-4 text-gray-400" />
            </div>
            <div>
              <p className="text-sm font-medium text-white">Email</p>
              <p className="text-xs text-gray-600 mt-0.5">
                {profile?.email || "shanewinhtung2005@gmail.com"}
              </p>
            </div>
          </div>
          <ChevronRight className="w-4 h-4 text-gray-600" />
        </div>

        {/* Username */}
        <div
          onClick={() => onNavigate("username")}
          className="group flex items-center justify-between p-4 bg-[#0a0a0a] rounded-lg border border-[#1a1a1a] hover:border-[#2a2a2a] transition-colors cursor-pointer"
        >
          <div className="flex items-center space-x-3">
            <div className="w-9 h-9 bg-black rounded-full flex items-center justify-center border border-[#1a1a1a]">
              <User className="w-4 h-4 text-gray-400" />
            </div>
            <div>
              <p className="text-sm font-medium text-white">Username</p>
              <p className="text-xs text-gray-600 mt-0.5">
                {profile?.username || "shanewinhtung2005"}
              </p>
            </div>
          </div>
          <ChevronRight className="w-4 h-4 text-gray-600" />
        </div>

        {/* Phone */}
        <div
          onClick={() => onNavigate("phone")}
          className="group flex items-center justify-between p-4 bg-[#0a0a0a] rounded-lg border border-[#1a1a1a] hover:border-[#2a2a2a] transition-colors cursor-pointer"
        >
          <div className="flex items-center space-x-3">
            <div className="w-9 h-9 bg-black rounded-full flex items-center justify-center border border-[#1a1a1a]">
              <Phone className="w-4 h-4 text-gray-400" />
            </div>
            <div>
              <p className="text-sm font-medium text-white">Phone</p>
              <p className="text-xs text-gray-600 mt-0.5">Not set</p>
            </div>
          </div>
          <ChevronRight className="w-4 h-4 text-gray-600" />
        </div>

        {/* Security */}
        <div
          onClick={() => onNavigate("security")}
          className="group flex items-center justify-between p-4 bg-[#0a0a0a] rounded-lg border border-[#1a1a1a] hover:border-[#2a2a2a] transition-colors cursor-pointer"
        >
          <div className="flex items-center space-x-3">
            <div className="w-9 h-9 bg-black rounded-full flex items-center justify-center border border-[#1a1a1a]">
              <Shield className="w-4 h-4 text-gray-400" />
            </div>
            <div>
              <p className="text-sm font-medium text-white">Security</p>
              <p className="text-xs text-gray-600 mt-0.5">
                Change password, enable 2FA
              </p>
            </div>
          </div>
          <ChevronRight className="w-4 h-4 text-gray-600" />
        </div>

        {/* Deactivate Account */}
        <div className="group flex items-center justify-between p-4 bg-[#0a0a0a] rounded-lg border border-[#1a1a1a] hover:border-[#2a2a2a] transition-colors cursor-pointer">
          <div className="flex items-center space-x-3">
            <div className="w-9 h-9 bg-black rounded-full flex items-center justify-center border border-[#1a1a1a]">
              <AlertTriangle className="w-4 h-4 text-yellow-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-white">
                Deactivate Account
              </p>
              <p className="text-xs text-gray-600 mt-0.5">
                Temporarily disable your account
              </p>
            </div>
          </div>
          <ChevronRight className="w-4 h-4 text-gray-600" />
        </div>

        {/* Delete Account */}
        <div className="group flex items-center justify-between p-4 bg-[#0a0a0a] rounded-lg border border-[#1a1a1a] hover:border-error-color/30 transition-colors cursor-pointer">
          <div className="flex items-center space-x-3">
            <div className="w-9 h-9 bg-black rounded-full flex items-center justify-center border border-[#1a1a1a]">
              <Trash2 className="w-4 h-4 text-error-color" />
            </div>
            <div>
              <p className="text-sm font-medium text-error-color">
                Delete Account
              </p>
              <p className="text-xs text-gray-600 mt-0.5">
                Permanently delete your account and data
              </p>
            </div>
          </div>
          <ChevronRight className="w-4 h-4 text-gray-600" />
        </div>
      </div>
    </div>
  );
}

// Placeholder content components
function AccountSharingContent() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-white mb-1">Account Sharing</h2>
        <p className="text-sm text-gray-500">
          Manage who has access to your account and reading library.
        </p>
      </div>
      <div className="p-12 bg-[#0a0a0a] rounded-lg border border-[#1a1a1a] text-center">
        <div className="w-16 h-16 bg-black rounded-full flex items-center justify-center mx-auto mb-3 border border-[#1a1a1a]">
          <Users className="w-8 h-8 text-gray-700" />
        </div>
        <p className="text-sm text-gray-600">No shared accounts yet</p>
      </div>
    </div>
  );
}

function BlockedAccountsContent() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-white mb-1">Blocked Accounts</h2>
        <p className="text-sm text-gray-500">
          Manage blocked users and authors.
        </p>
      </div>
      <div className="p-12 bg-[#0a0a0a] rounded-lg border border-[#1a1a1a] text-center">
        <div className="w-16 h-16 bg-black rounded-full flex items-center justify-center mx-auto mb-3 border border-[#1a1a1a]">
          <Lock className="w-8 h-8 text-gray-700" />
        </div>
        <p className="text-sm text-gray-600">No blocked accounts</p>
      </div>
    </div>
  );
}

function ThemeContent() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-white mb-1">Theme</h2>
        <p className="text-sm text-gray-500">
          Choose your preferred color scheme
        </p>
      </div>
      <div className="space-y-2">
        <label className="flex items-center justify-between p-4 bg-[#0a0a0a] rounded-lg border border-[#1a1a1a] hover:border-[#2a2a2a] transition-colors cursor-pointer">
          <span className="text-sm text-white">Dark Mode</span>
          <input
            type="radio"
            name="theme"
            defaultChecked
            className="accent-p2 w-4 h-4"
          />
        </label>
        <label className="flex items-center justify-between p-4 bg-[#0a0a0a] rounded-lg border border-[#1a1a1a] hover:border-[#2a2a2a] transition-colors cursor-pointer">
          <span className="text-sm text-white">Light Mode</span>
          <input type="radio" name="theme" className="accent-p2 w-4 h-4" />
        </label>
        <label className="flex items-center justify-between p-4 bg-[#0a0a0a] rounded-lg border border-[#1a1a1a] hover:border-[#2a2a2a] transition-colors cursor-pointer">
          <span className="text-sm text-white">Auto (System)</span>
          <input type="radio" name="theme" className="accent-p2 w-4 h-4" />
        </label>
      </div>
    </div>
  );
}

function LanguageContent() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-white mb-1">Language</h2>
        <p className="text-sm text-gray-500">Select your preferred language</p>
      </div>
      <div className="space-y-2">
        <label className="flex items-center justify-between p-4 bg-[#0a0a0a] rounded-lg border border-[#1a1a1a] hover:border-[#2a2a2a] transition-colors cursor-pointer">
          <span className="text-sm text-white">English</span>
          <input
            type="radio"
            name="language"
            defaultChecked
            className="accent-p2 w-4 h-4"
          />
        </label>
        <label className="flex items-center justify-between p-4 bg-[#0a0a0a] rounded-lg border border-[#1a1a1a] hover:border-[#2a2a2a] transition-colors cursor-pointer">
          <span className="text-sm text-white">မြန်မာ (Myanmar)</span>
          <input type="radio" name="language" className="accent-p2 w-4 h-4" />
        </label>
      </div>
    </div>
  );
}

function NotificationContent() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-white mb-1">Notifications</h2>
        <p className="text-sm text-gray-500">
          Manage your notification preferences
        </p>
      </div>
      <div className="space-y-2">
        {[
          "New book releases",
          "Comments on your books",
          "New followers",
          "Reading reminders",
          "Book recommendations",
        ].map((item) => (
          <label
            key={item}
            className="flex items-center justify-between p-4 bg-[#0a0a0a] rounded-lg border border-[#1a1a1a] hover:border-[#2a2a2a] transition-colors cursor-pointer"
          >
            <span className="text-sm text-white">{item}</span>
            <input
              type="checkbox"
              defaultChecked
              className="accent-p2 w-4 h-4"
            />
          </label>
        ))}
      </div>
    </div>
  );
}

function ContentPreferencesContent() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-white mb-1">
          Content Preferences
        </h2>
        <p className="text-sm text-gray-500">
          Customize your reading experience and content recommendations.
        </p>
      </div>
      <div className="space-y-2">
        <label className="flex items-center justify-between p-4 bg-[#0a0a0a] rounded-lg border border-[#1a1a1a] hover:border-[#2a2a2a] transition-colors cursor-pointer">
          <span className="text-sm text-white">Show mature content</span>
          <input type="checkbox" className="accent-p2 w-4 h-4" />
        </label>
        <label className="flex items-center justify-between p-4 bg-[#0a0a0a] rounded-lg border border-[#1a1a1a] hover:border-[#2a2a2a] transition-colors cursor-pointer">
          <span className="text-sm text-white">
            Personalized recommendations
          </span>
          <input type="checkbox" defaultChecked className="accent-p2 w-4 h-4" />
        </label>
      </div>
    </div>
  );
}

function DataUsageContent() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-white mb-1">
          Data Usage Settings
        </h2>
        <p className="text-sm text-gray-500">
          Manage how the app uses your data
        </p>
      </div>
      <div className="space-y-2">
        <label className="flex items-center justify-between p-4 bg-[#0a0a0a] rounded-lg border border-[#1a1a1a] hover:border-[#2a2a2a] transition-colors cursor-pointer">
          <span className="text-sm text-white">Download over Wi-Fi only</span>
          <input type="checkbox" defaultChecked className="accent-p2 w-4 h-4" />
        </label>
        <label className="flex items-center justify-between p-4 bg-[#0a0a0a] rounded-lg border border-[#1a1a1a] hover:border-[#2a2a2a] transition-colors cursor-pointer">
          <span className="text-sm text-white">Auto-download new chapters</span>
          <input type="checkbox" className="accent-p2 w-4 h-4" />
        </label>
      </div>
    </div>
  );
}

function BatteryUsageContent() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-white mb-1">
          Battery Usage Settings
        </h2>
        <p className="text-sm text-gray-500">Optimize battery consumption</p>
      </div>
      <div className="space-y-2">
        <label className="flex items-center justify-between p-4 bg-[#0a0a0a] rounded-lg border border-[#1a1a1a] hover:border-[#2a2a2a] transition-colors cursor-pointer">
          <span className="text-sm text-white">Battery saver mode</span>
          <input type="checkbox" className="accent-p2 w-4 h-4" />
        </label>
        <label className="flex items-center justify-between p-4 bg-[#0a0a0a] rounded-lg border border-[#1a1a1a] hover:border-[#2a2a2a] transition-colors cursor-pointer">
          <span className="text-sm text-white">Reduce animations</span>
          <input type="checkbox" className="accent-p2 w-4 h-4" />
        </label>
      </div>
    </div>
  );
}

function PaymentMethodContent() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-white mb-1">Payment Method</h2>
        <p className="text-sm text-gray-500">
          Manage your payment methods for purchases.
        </p>
      </div>
      <div className="p-12 bg-[#0a0a0a] rounded-lg border border-[#1a1a1a] text-center">
        <div className="w-16 h-16 bg-black rounded-full flex items-center justify-center mx-auto mb-3 border border-[#1a1a1a]">
          <CreditCard className="w-8 h-8 text-gray-700" />
        </div>
        <p className="text-sm text-gray-600 mb-4">No payment methods added</p>
        <button className="px-6 py-2 bg-p2 text-white text-sm rounded-md hover:bg-p1 transition-colors">
          Add Payment Method
        </button>
      </div>
    </div>
  );
}

function MembershipContent({ stats }: { stats: UserStats | null }) {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-white mb-1">Membership</h2>
        <p className="text-sm text-gray-500">Manage your subscription plan</p>
      </div>
      <div className="p-6 bg-[#0a0a0a] rounded-lg border border-[#1a1a1a]">
        <div className="flex items-center space-x-3 mb-4">
          <Crown className="w-7 h-7 text-yellow-500" />
          <div>
            <h3 className="text-base font-semibold text-white">Free Plan</h3>
            <p className="text-xs text-gray-600">Basic access to books</p>
          </div>
        </div>

        {stats && (
          <div className="grid grid-cols-3 gap-3 mb-4">
            <div className="text-center p-3 bg-black rounded-md border border-[#1a1a1a]">
              <p className="text-lg font-bold text-white">
                {stats.booksInLibrary}
              </p>
              <p className="text-[10px] text-gray-600 uppercase">Books Owned</p>
            </div>
            <div className="text-center p-3 bg-black rounded-md border border-[#1a1a1a]">
              <p className="text-lg font-bold text-white">
                {stats.reviewsWritten}
              </p>
              <p className="text-[10px] text-gray-600 uppercase">Reviews</p>
            </div>
            <div className="text-center p-3 bg-black rounded-md border border-[#1a1a1a]">
              <p className="text-lg font-bold text-white">
                {stats.commentsPosted}
              </p>
              <p className="text-[10px] text-gray-600 uppercase">Comments</p>
            </div>
          </div>
        )}

        <button className="w-full px-6 py-2.5 bg-p2 text-white text-sm rounded-md hover:bg-p1 transition-colors">
          Upgrade to Premium
        </button>
      </div>
    </div>
  );
}

function HelpCenterContent() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-white mb-1">Help Center</h2>
        <p className="text-sm text-gray-500">
          Find answers to common questions and get support.
        </p>
      </div>
      <div className="space-y-2">
        {[
          "How to upload a book",
          "How to edit your profile",
          "Payment issues",
          "Account security",
          "Content guidelines",
        ].map((item) => (
          <div
            key={item}
            className="p-4 bg-[#0a0a0a] rounded-lg border border-[#1a1a1a] hover:border-[#2a2a2a] flex items-center justify-between cursor-pointer transition-colors"
          >
            <span className="text-sm text-white">{item}</span>
            <ChevronRight className="w-4 h-4 text-gray-600" />
          </div>
        ))}
      </div>
    </div>
  );
}

function ReportContent() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-white mb-1">Report</h2>
        <p className="text-sm text-gray-500">
          Report content, users, or technical issues.
        </p>
      </div>
      <textarea
        className="w-full h-32 p-4 bg-[#0a0a0a] text-white text-sm rounded-lg border border-[#1a1a1a] focus:outline-none focus:border-[#2a2a2a] placeholder-gray-600"
        placeholder="Describe the issue..."
      />
      <button className="px-6 py-2.5 bg-p2 text-white text-sm rounded-md hover:bg-p1 transition-colors">
        Submit Report
      </button>
    </div>
  );
}

function FeedbackContent() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-white mb-1">Feedback</h2>
        <p className="text-sm text-gray-500">
          We'd love to hear your thoughts and suggestions!
        </p>
      </div>
      <textarea
        className="w-full h-32 p-4 bg-[#0a0a0a] text-white text-sm rounded-lg border border-[#1a1a1a] focus:outline-none focus:border-[#2a2a2a] placeholder-gray-600"
        placeholder="Share your feedback..."
      />
      <button className="px-6 py-2.5 bg-p2 text-white text-sm rounded-md hover:bg-p1 transition-colors">
        Send Feedback
      </button>
    </div>
  );
}

function SocialMediaContent() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-white mb-1">Social Media</h2>
        <p className="text-sm text-gray-500">
          Follow us on social media for updates.
        </p>
      </div>
      <div className="space-y-2">
        {["Facebook", "Twitter", "Instagram", "TikTok"].map((platform) => (
          <div
            key={platform}
            className="p-4 bg-[#0a0a0a] rounded-lg border border-[#1a1a1a] hover:border-[#2a2a2a] flex items-center justify-between cursor-pointer transition-colors"
          >
            <span className="text-sm text-white">{platform}</span>
            <ChevronRight className="w-4 h-4 text-gray-600" />
          </div>
        ))}
      </div>
    </div>
  );
}

function AboutContent() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-white mb-1">
          About LarLar Books
        </h2>
        <p className="text-sm text-gray-500">Learn more about our platform</p>
      </div>
      <div className="p-6 bg-[#0a0a0a] rounded-lg border border-[#1a1a1a]">
        <p className="text-sm text-gray-300 mb-4">
          LarLar Books is a platform for readers and writers to discover, share,
          and enjoy books in Myanmar and English languages.
        </p>
        <p className="text-xs text-gray-600">Version 1.0.0</p>
      </div>
    </div>
  );
}

function TermsContent() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-white mb-1">Terms of Use</h2>
        <p className="text-sm text-gray-500">Read our terms and conditions</p>
      </div>
      <div className="p-6 bg-[#0a0a0a] rounded-lg border border-[#1a1a1a] text-sm text-gray-300 space-y-4">
        <p>Last updated: November 23, 2025</p>
        <p>By using LarLar Books, you agree to these terms and conditions...</p>
      </div>
    </div>
  );
}

function PrivacyContent() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-white mb-1">Privacy Policy</h2>
        <p className="text-sm text-gray-500">How we handle your data</p>
      </div>
      <div className="p-6 bg-[#0a0a0a] rounded-lg border border-[#1a1a1a] text-sm text-gray-300 space-y-4">
        <p>Last updated: November 23, 2025</p>
        <p>
          We respect your privacy and are committed to protecting your personal
          data...
        </p>
      </div>
    </div>
  );
}

function CodeOfConductContent() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-white mb-1">Code of Conduct</h2>
        <p className="text-sm text-gray-500">Community guidelines</p>
      </div>
      <div className="p-6 bg-[#0a0a0a] rounded-lg border border-[#1a1a1a] text-sm text-gray-300 space-y-4">
        <p>Our community guidelines and expected behavior for all users.</p>
      </div>
    </div>
  );
}

function ContentGuidelinesContent() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-white mb-1">
          Content Guidelines
        </h2>
        <p className="text-sm text-gray-500">Publishing standards</p>
      </div>
      <div className="p-6 bg-[#0a0a0a] rounded-lg border border-[#1a1a1a] text-sm text-gray-300 space-y-4">
        <p>Guidelines for publishing and sharing content on LarLar Books.</p>
      </div>
    </div>
  );
}

function LicensesContent() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-white mb-1">Licenses</h2>
        <p className="text-sm text-gray-500">Open source attributions</p>
      </div>
      <div className="p-6 bg-[#0a0a0a] rounded-lg border border-[#1a1a1a] text-sm text-gray-300 space-y-4">
        <p>Open source licenses and attributions.</p>
      </div>
    </div>
  );
}

// Detail View Components
function EmailDetailView({
  profile,
  onBack,
}: {
  profile: UserProfile | null;
  onBack: () => void;
}) {
  const [email, setEmail] = useState(profile?.email || "");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSave = async () => {
    if (!email || !email.includes("@")) {
      setError("Please enter a valid email address");
      return;
    }

    setIsLoading(true);
    setError("");

    try {
      const response = await fetch("/api/profile/email", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to update email");
      }

      onBack();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to update email");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-3">
        <button
          onClick={onBack}
          className="text-gray-400 hover:text-white transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        <h2 className="text-2xl font-bold text-white">Change Email</h2>
      </div>

      <div className="space-y-4">
        <div>
          <label className="text-sm text-gray-400 mb-2 block">
            Email Address
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-3 bg-[#0a0a0a] text-white rounded-lg border border-[#1a1a1a] focus:outline-none focus:border-p2"
            placeholder="Enter your email"
          />
          {error && (
            <p className="text-red-500 text-sm mt-2">{error}</p>
          )}
        </div>

        <button
          onClick={handleSave}
          disabled={isLoading}
          className="w-full px-6 py-3 bg-p2 text-white rounded-lg hover:bg-p1 transition-colors disabled:opacity-50"
        >
          {isLoading ? "Saving..." : "Save Changes"}
        </button>
      </div>
    </div>
  );
}

function UsernameDetailView({
  profile,
  onBack,
}: {
  profile: UserProfile | null;
  onBack: () => void;
}) {
  const [username, setUsername] = useState(profile?.username || "");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSave = async () => {
    if (!username || username.trim().length < 3) {
      setError("Username must be at least 3 characters long");
      return;
    }

    setIsLoading(true);
    setError("");

    try {
      const response = await fetch("/api/profile", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username: username.trim() }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to update username");
      }

      onBack();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to update username");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-3">
        <button
          onClick={onBack}
          className="text-gray-400 hover:text-white transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        <h2 className="text-2xl font-bold text-white">Change Username</h2>
      </div>

      <div className="space-y-4">
        <div>
          <label className="text-sm text-gray-400 mb-2 block">Username</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full px-4 py-3 bg-[#0a0a0a] text-white rounded-lg border border-[#1a1a1a] focus:outline-none focus:border-p2"
            placeholder="Enter your username"
          />
          {error && (
            <p className="text-red-500 text-sm mt-2">{error}</p>
          )}
        </div>

        <button
          onClick={handleSave}
          disabled={isLoading}
          className="w-full px-6 py-3 bg-p2 text-white rounded-lg hover:bg-p1 transition-colors disabled:opacity-50"
        >
          {isLoading ? "Saving..." : "Save Changes"}
        </button>
      </div>
    </div>
  );
}

function PhoneDetailView({
  profile,
  onBack,
}: {
  profile: UserProfile | null;
  onBack: () => void;
}) {
  const [phone, setPhone] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSave = async () => {
    if (!phone || phone.trim().length < 8) {
      setError("Please enter a valid phone number");
      return;
    }

    setIsLoading(true);
    setError("");

    try {
      const response = await fetch("/api/profile/phone", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ phone: phone.trim() }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to update phone number");
      }

      onBack();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to update phone number");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-3">
        <button
          onClick={onBack}
          className="text-gray-400 hover:text-white transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        <h2 className="text-2xl font-bold text-white">Add Phone Number</h2>
      </div>

      <div className="space-y-4">
        <div>
          <label className="text-sm text-gray-400 mb-2 block">
            Phone Number
          </label>
          <input
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="w-full px-4 py-3 bg-[#0a0a0a] text-white rounded-lg border border-[#1a1a1a] focus:outline-none focus:border-p2"
            placeholder="Enter your phone number"
          />
          {error && (
            <p className="text-red-500 text-sm mt-2">{error}</p>
          )}
        </div>

        <button
          onClick={handleSave}
          disabled={isLoading}
          className="w-full px-6 py-3 bg-p2 text-white rounded-lg hover:bg-p1 transition-colors disabled:opacity-50"
        >
          {isLoading ? "Saving..." : "Save Changes"}
        </button>
      </div>
    </div>
  );
}

function SecurityDetailView({
  onBack,
  onNavigate,
}: {
  onBack: () => void;
  onNavigate: (view: string) => void;
}) {
  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-3">
        <button
          onClick={onBack}
          className="text-gray-400 hover:text-white transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        <h2 className="text-2xl font-bold text-white">Security Settings</h2>
      </div>

      <div className="space-y-2">
        <div
          onClick={() => onNavigate("change-password")}
          className="group flex items-center justify-between p-4 bg-[#0a0a0a] rounded-lg border border-[#1a1a1a] hover:border-[#2a2a2a] transition-colors cursor-pointer"
        >
          <div className="flex items-center space-x-3">
            <div className="w-9 h-9 bg-black rounded-full flex items-center justify-center border border-[#1a1a1a]">
              <Lock className="w-4 h-4 text-gray-400" />
            </div>
            <div>
              <p className="text-sm font-medium text-white">Change Password</p>
              <p className="text-xs text-gray-600 mt-0.5">
                Update your password
              </p>
            </div>
          </div>
          <ChevronRight className="w-4 h-4 text-gray-600" />
        </div>

        <div
          onClick={() => onNavigate("2fa")}
          className="group flex items-center justify-between p-4 bg-[#0a0a0a] rounded-lg border border-[#1a1a1a] hover:border-[#2a2a2a] transition-colors cursor-pointer"
        >
          <div className="flex items-center space-x-3">
            <div className="w-9 h-9 bg-black rounded-full flex items-center justify-center border border-[#1a1a1a]">
              <Shield className="w-4 h-4 text-gray-400" />
            </div>
            <div>
              <p className="text-sm font-medium text-white">
                Two-Factor Authentication
              </p>
              <p className="text-xs text-gray-600 mt-0.5">Not enabled</p>
            </div>
          </div>
          <ChevronRight className="w-4 h-4 text-gray-600" />
        </div>
      </div>
    </div>
  );
}

function ChangePasswordView({ onBack }: { onBack: () => void }) {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSave = async () => {
    if (newPassword !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    if (newPassword.length < 8) {
      setError("Password must be at least 8 characters long");
      return;
    }

    if (!currentPassword) {
      setError("Current password is required");
      return;
    }

    setIsLoading(true);
    setError("");

    try {
      const response = await fetch("/api/profile/password", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          currentPassword,
          newPassword,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to update password");
      }

      onBack();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to update password");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-3">
        <button
          onClick={onBack}
          className="text-gray-400 hover:text-white transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        <h2 className="text-2xl font-bold text-white">Change Password</h2>
      </div>

      <div className="space-y-4">
        {error && (
          <div className="p-3 bg-red-500/10 border border-red-500/30 rounded-lg">
            <p className="text-red-500 text-sm">{error}</p>
          </div>
        )}

        <div>
          <label className="text-sm text-gray-400 mb-2 block">
            Current Password
          </label>
          <input
            type="password"
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
            className="w-full px-4 py-3 bg-[#0a0a0a] text-white rounded-lg border border-[#1a1a1a] focus:outline-none focus:border-p2"
            placeholder="Enter current password"
          />
        </div>

        <div>
          <label className="text-sm text-gray-400 mb-2 block">
            New Password
          </label>
          <input
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            className="w-full px-4 py-3 bg-[#0a0a0a] text-white rounded-lg border border-[#1a1a1a] focus:outline-none focus:border-p2"
            placeholder="Enter new password"
          />
        </div>

        <div>
          <label className="text-sm text-gray-400 mb-2 block">
            Confirm New Password
          </label>
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="w-full px-4 py-3 bg-[#0a0a0a] text-white rounded-lg border border-[#1a1a1a] focus:outline-none focus:border-p2"
            placeholder="Confirm new password"
          />
        </div>

        <button
          onClick={handleSave}
          disabled={isLoading}
          className="w-full px-6 py-3 bg-p2 text-white rounded-lg hover:bg-p1 transition-colors disabled:opacity-50"
        >
          {isLoading ? "Updating..." : "Update Password"}
        </button>
      </div>
    </div>
  );
}

function TwoFactorAuthView({ onBack }: { onBack: () => void }) {
  const [isEnabled, setIsEnabled] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleToggle = async () => {
    setIsLoading(true);
    // TODO: Implement 2FA toggle API call
    setTimeout(() => {
      setIsEnabled(!isEnabled);
      setIsLoading(false);
    }, 1000);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-3">
        <button
          onClick={onBack}
          className="text-gray-400 hover:text-white transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        <h2 className="text-2xl font-bold text-white">
          Two-Factor Authentication
        </h2>
      </div>

      <div className="p-6 bg-[#0a0a0a] rounded-lg border border-[#1a1a1a]">
        <div className="flex items-start space-x-3 mb-4">
          <Shield className="w-6 h-6 text-p2 flex-shrink-0 mt-1" />
          <div>
            <h3 className="text-base font-semibold text-white mb-2">
              Protect Your Account
            </h3>
            <p className="text-sm text-gray-400">
              Two-factor authentication adds an extra layer of security to your
              account by requiring a verification code in addition to your
              password.
            </p>
          </div>
        </div>

        <div className="flex items-center justify-between p-4 bg-black rounded-lg border border-[#1a1a1a]">
          <div>
            <p className="text-sm font-medium text-white">
              {isEnabled ? "Enabled" : "Disabled"}
            </p>
            <p className="text-xs text-gray-600 mt-0.5">
              {isEnabled
                ? "Your account is protected"
                : "Enable 2FA for better security"}
            </p>
          </div>
          <button
            onClick={handleToggle}
            disabled={isLoading}
            className={`px-4 py-2 rounded-md text-sm transition-colors ${
              isEnabled
                ? "bg-error-color text-white hover:bg-red-700"
                : "bg-p2 text-white hover:bg-p1"
            } disabled:opacity-50`}
          >
            {isLoading ? "..." : isEnabled ? "Disable" : "Enable"}
          </button>
        </div>
      </div>
    </div>
  );
}
