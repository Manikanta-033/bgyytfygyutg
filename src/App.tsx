import * as React from 'react';
import { useState } from 'react';
import { Home, Search as SearchIcon, Plus, Bell, User, Map as MapIcon } from 'lucide-react';
import { HomeFeed } from './components/HomeFeed';
import { CreateReport } from './components/CreateReport';
import { IssueDetails } from './components/IssueDetails';
import { MapExplore } from './components/MapExplore';
import { Explore } from './components/Explore';
import { Activity } from './components/Activity';
import { Profile } from './components/Profile';
import { Comments } from './components/Comments';
import { Search } from './components/Search';
import { Saved } from './components/Saved';
import { Settings } from './components/Settings';
import { AuthWelcome } from './components/auth/AuthWelcome';
import { Login } from './components/auth/Login';
import { Signup } from './components/auth/Signup';
import { ForgotPassword } from './components/auth/ForgotPassword';
import { Verification } from './components/auth/Verification';
import { StatusTracking } from './components/StatusTracking';
import { Leaderboard } from './components/Leaderboard';
import { ReportSuccess } from './components/ReportSuccess';
import { Campaigns } from './components/Campaigns';
import { Messages } from './components/Messages';
import { ChatThread } from './components/ChatThread';
import { AdminDashboard } from './components/AdminDashboard';
import { UIKit } from './components/UIKit';
import { Screen, Post } from './types';
import { motion, AnimatePresence } from 'motion/react';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<Screen>('AuthWelcome');
  const [prevScreen, setPrevScreen] = useState<Screen>('AuthWelcome');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);
  const [selectedChat, setSelectedChat] = useState<any>(null);

  const handleOpenDetails = (post: Post) => {
    setSelectedPost(post);
    setPrevScreen(currentScreen);
    setCurrentScreen('Details');
  };

  const handleOpenComments = (post: Post) => {
    setSelectedPost(post);
    setPrevScreen(currentScreen);
    setCurrentScreen('Comments');
  };

  const handleOpenSearch = () => {
    setPrevScreen(currentScreen);
    setCurrentScreen('Search');
  };

  const handleOpenSaved = () => {
    setPrevScreen(currentScreen);
    setCurrentScreen('Saved');
  };

  const handleOpenSettings = () => {
    setPrevScreen(currentScreen);
    setCurrentScreen('Settings');
  };

  const handleOpenStatus = (post: Post) => {
    setSelectedPost(post);
    setPrevScreen(currentScreen);
    setCurrentScreen('StatusTracking');
  };

  const handleReportSubmit = () => {
    // Mocking a successful report submission
    const mockPost: Post = {
      id: 'new-report',
      user: { name: 'Alex Rivers', avatar: 'https://picsum.photos/seed/user/200/200', isVerified: true },
      location: 'Downtown, Sector 4',
      timestamp: 'Just now',
      title: 'New Infrastructure Issue',
      description: 'A new issue has been reported by the community.',
      category: 'Infrastructure',
      media: { type: 'image', url: ['https://picsum.photos/seed/new/800/600'] },
      urgency: 'High',
      likes: 0,
      comments: 0,
      shares: 0,
      status: 'Pending'
    };
    setSelectedPost(mockPost);
    setCurrentScreen('ReportSuccess');
  };

  const handleOpenLeaderboard = () => {
    setPrevScreen(currentScreen);
    setCurrentScreen('Leaderboard');
  };

  const handleOpenCampaigns = () => {
    setPrevScreen(currentScreen);
    setCurrentScreen('Campaigns');
  };

  const handleOpenMessages = () => {
    setPrevScreen(currentScreen);
    setCurrentScreen('Messages');
  };

  const handleOpenChatThread = (chat: any) => {
    setSelectedChat(chat);
    setPrevScreen(currentScreen);
    setCurrentScreen('ChatThread');
  };

  const handleLogin = () => {
    setIsAuthenticated(true);
    setCurrentScreen('Home');
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setCurrentScreen('AuthWelcome');
  };

  const handleOpenMapDetails = (id: string) => {
    // In a real app, we'd fetch the post by ID. For now, we'll mock it.
    const mockPost: Post = {
      id,
      user: { name: 'Alex Rivers', avatar: 'https://picsum.photos/seed/alex/100/100', isVerified: true },
      location: 'Downtown, Sector 4',
      timestamp: '2h ago',
      title: 'Major Potholes on Main Street',
      description: 'Several deep potholes have appeared near the primary school entrance. It\'s becoming dangerous for cyclists and school buses. Needs immediate attention!',
      category: 'Roads',
      media: { type: 'image', url: ['https://picsum.photos/seed/road/800/600'] },
      urgency: 'Urgent',
      likes: 124,
      comments: 45,
      shares: 12,
      status: 'Pending'
    };
    setSelectedPost(mockPost);
    setCurrentScreen('Details');
  };

  const renderScreen = () => {
    switch (currentScreen) {
      case 'Home':
        return <HomeFeed 
          onCreatePost={() => setCurrentScreen('Create')} 
          onSelectPost={handleOpenDetails}
          onOpenComments={handleOpenComments}
          onOpenSearch={handleOpenSearch}
          onOpenStatus={handleOpenStatus}
          onOpenMessages={handleOpenMessages}
        />;
      case 'Create':
        return <CreateReport onBack={() => setCurrentScreen(prevScreen)} onSubmit={handleReportSubmit} />;
      case 'Details':
        return selectedPost ? (
          <IssueDetails 
            post={selectedPost} 
            onBack={() => setCurrentScreen(prevScreen)} 
            onOpenComments={() => handleOpenComments(selectedPost)}
            onOpenStatus={() => handleOpenStatus(selectedPost)}
          />
        ) : null;
      case 'Explore':
        return <Explore onOpenSearch={handleOpenSearch} onOpenLeaderboard={handleOpenLeaderboard} onOpenCampaigns={handleOpenCampaigns} />;
      case 'Campaigns':
        return <Campaigns onBack={() => setCurrentScreen(prevScreen)} />;
      case 'Messages':
        return <Messages onBack={() => setCurrentScreen(prevScreen)} onOpenChat={handleOpenChatThread} />;
      case 'ChatThread':
        return selectedChat ? (
          <ChatThread chat={selectedChat} onBack={() => setCurrentScreen('Messages')} />
        ) : null;
      case 'Leaderboard':
        return <Leaderboard onBack={() => setCurrentScreen(prevScreen)} />;
      case 'ReportSuccess':
        return selectedPost ? (
          <ReportSuccess 
            post={selectedPost} 
            onViewReport={() => setCurrentScreen('Details')}
            onTrackStatus={() => setCurrentScreen('StatusTracking')}
            onBackToHome={() => setCurrentScreen('Home')}
            isFirstTime={false}
          />
        ) : null;
      case 'Search':
        return <Search onBack={() => setCurrentScreen(prevScreen)} onSelectPost={handleOpenDetails} />;
      case 'Saved':
        return <Saved onBack={() => setCurrentScreen(prevScreen)} onSelectPost={handleOpenDetails} />;
      case 'Comments':
        return <Comments onClose={() => setCurrentScreen(prevScreen)} />;
      case 'Activity':
        return <Activity />;
      case 'Profile':
        return <Profile 
          onOpenSaved={handleOpenSaved} 
          onOpenSettings={handleOpenSettings} 
          onLogout={handleLogout} 
          onOpenAdmin={() => setCurrentScreen('AdminDashboard')}
          onOpenUIKit={() => setCurrentScreen('UIKit')}
        />;
      case 'Settings':
        return <Settings onBack={() => setCurrentScreen(prevScreen)} />;
      case 'AdminDashboard':
        return <AdminDashboard onBack={() => setCurrentScreen(prevScreen)} />;
      case 'UIKit':
        return <UIKit onBack={() => setCurrentScreen(prevScreen)} />;
      case 'AuthWelcome':
        return <AuthWelcome 
          onSignIn={() => setCurrentScreen('Login')} 
          onSignUp={() => setCurrentScreen('Signup')} 
          onContinueAsGuest={handleLogin} 
        />;
      case 'Login':
        return <Login 
          onBack={() => setCurrentScreen('AuthWelcome')} 
          onSignUp={() => setCurrentScreen('Signup')} 
          onForgotPassword={() => setCurrentScreen('ForgotPassword')}
          onLogin={handleLogin}
        />;
      case 'Signup':
        return <Signup 
          onBack={() => setCurrentScreen('AuthWelcome')} 
          onSignIn={() => setCurrentScreen('Login')}
          onSignUp={() => setCurrentScreen('Verification')}
        />;
      case 'ForgotPassword':
        return <ForgotPassword 
          onBack={() => setCurrentScreen('Login')} 
          onContinue={() => setCurrentScreen('Verification')} 
        />;
      case 'Verification':
        return <Verification 
          onBack={() => setCurrentScreen(prevScreen)} 
          onVerify={handleLogin} 
        />;
      case 'StatusTracking':
        return selectedPost ? (
          <StatusTracking 
            post={selectedPost} 
            onBack={() => setCurrentScreen(prevScreen)} 
            onViewDetails={() => setCurrentScreen('Details')}
          />
        ) : null;
      default:
        return (
          <div className="flex flex-col items-center justify-center min-h-[80vh] text-slate-400">
            <SearchIcon className="w-12 h-12 mb-4 opacity-20" />
            <p className="text-sm font-medium">Screen coming soon</p>
            <button 
              onClick={() => setCurrentScreen('Home')}
              className="mt-4 text-green-600 font-bold text-sm"
            >
              Back to Home
            </button>
          </div>
        );
    }
  };

  const isFullScreen = currentScreen === 'Create' || currentScreen === 'Details' || currentScreen === 'Comments' || currentScreen === 'Search' || currentScreen === 'Saved' || currentScreen === 'Settings' || currentScreen === 'AuthWelcome' || currentScreen === 'Login' || currentScreen === 'Signup' || currentScreen === 'ForgotPassword' || currentScreen === 'Verification' || currentScreen === 'StatusTracking' || currentScreen === 'Leaderboard' || currentScreen === 'ReportSuccess' || currentScreen === 'Campaigns' || currentScreen === 'Messages' || currentScreen === 'ChatThread' || currentScreen === 'AdminDashboard' || currentScreen === 'UIKit';

  return (
    <div className="max-w-md mx-auto bg-white min-h-screen relative shadow-2xl shadow-slate-200 overflow-x-hidden">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentScreen}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.2, ease: 'easeOut' }}
        >
          {renderScreen()}
        </motion.div>
      </AnimatePresence>

      {/* Bottom Navigation */}
      {!isFullScreen && (
        <nav className="fixed bottom-0 left-0 right-0 max-w-md mx-auto bg-white/80 backdrop-blur-xl border-t border-gray-100 px-6 py-3 flex items-center justify-between z-50">
          <NavButton 
            active={currentScreen === 'Home'} 
            onClick={() => setCurrentScreen('Home')}
            icon={<Home className="w-6 h-6" />} 
            label="Home" 
          />
          <NavButton 
            active={currentScreen === 'Explore'} 
            onClick={() => setCurrentScreen('Explore')}
            icon={<MapIcon className="w-6 h-6" />} 
            label="Explore" 
          />
          
          {/* Add Button */}
          <button 
            onClick={() => setCurrentScreen('Create')}
            className="w-14 h-14 bg-green-500 rounded-2xl flex items-center justify-center -mt-10 shadow-xl shadow-green-500/40 border-4 border-white active:scale-90 transition-all"
          >
            <Plus className="w-7 h-7 text-white" />
          </button>

          <NavButton 
            active={currentScreen === 'Activity'} 
            onClick={() => setCurrentScreen('Activity')}
            icon={<Bell className="w-6 h-6" />} 
            label="Alerts" 
          />
          <NavButton 
            active={currentScreen === 'Profile'} 
            onClick={() => setCurrentScreen('Profile')}
            icon={<User className="w-6 h-6" />} 
            label="Profile" 
          />
        </nav>
      )}

      {/* Floating Action Button (Alternative for Home) */}
      {currentScreen === 'Home' && (
        <button 
          onClick={() => setCurrentScreen('Create')}
          className="fixed bottom-24 right-6 w-14 h-14 bg-green-600 text-white rounded-full flex items-center justify-center shadow-2xl shadow-green-600/40 active:scale-90 transition-all z-40 md:hidden"
        >
          <Plus className="w-6 h-6" />
        </button>
      )}
    </div>
  );
}

function NavButton({ active, icon, label, onClick }: { active: boolean, icon: React.ReactNode, label: string, onClick: () => void }) {
  return (
    <button 
      onClick={onClick}
      className={`flex flex-col items-center gap-1 transition-all ${active ? 'text-green-600' : 'text-slate-400'}`}
    >
      <div className={`transition-transform ${active ? 'scale-110' : 'scale-100'}`}>
        {icon}
      </div>
      <span className="text-[10px] font-bold uppercase tracking-wider">{label}</span>
    </button>
  );
}
