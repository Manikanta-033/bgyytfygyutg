export type Urgency = 'Low' | 'Medium' | 'High' | 'Urgent' | 'Resolved';

export interface Post {
  id: string;
  user: {
    name: string;
    avatar: string;
    isVerified?: boolean;
  };
  location: string;
  timestamp: string;
  title: string;
  description: string;
  category: string;
  media: {
    type: 'image' | 'video' | 'carousel';
    url: string[];
  };
  urgency: Urgency;
  likes: number;
  comments: number;
  shares: number;
  status: 'Pending' | 'In Progress' | 'Resolved';
}

export type Screen = 'Home' | 'Create' | 'Activity' | 'Explore' | 'Profile' | 'Details' | 'Comments' | 'Search' | 'Saved' | 'Settings' | 'AuthWelcome' | 'Login' | 'Signup' | 'ForgotPassword' | 'Verification' | 'StatusTracking' | 'Leaderboard' | 'ReportSuccess' | 'Campaigns' | 'Messages' | 'ChatThread' | 'AdminDashboard' | 'UIKit';

export interface AppState {
  currentScreen: Screen;
  selectedPost?: Post;
}
