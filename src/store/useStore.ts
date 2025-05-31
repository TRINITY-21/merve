// src/store/useStore.ts
import { create } from 'zustand';
import type {
  IAgent,
  IAgentRegistrationData,
  IAuthResult,
  IComment,
  ICommentResult,
  IPost,
  IPostData,
  IPostResult,
  IReply,
  IReplyResult,
  IStore,
  IUser,
  IUserRegistrationData,
  IUserUpdateData,
} from '../types';

import { dummyAgents } from '../utils/dummyData';

const useStore = create<IStore>((set, get) => ({
  // Auth state
  isAuthenticated: false,
  currentUser: null,

  // Dummy users (extended to include profile pictures and agent links)
  users: [
    {
      id: '1',
      phone: '0241234567',
      pin: '1234',
      name: 'Trinity Agyeman',
      email: 'john@example.com',
      transactions: [
        { id: 't1', type: 'Send Money', amount: 'GHS 50.00', date: '2025-05-23' },
        { id: 't2', type: 'Bill Payment', amount: 'GHS 30.00', date: '2025-05-22' },
        { id: 't3', type: 'Received', amount: 'GHS 100.00', date: '2025-05-21' },
      ],
      avatar: 'https://picsum.photos/400/250?random=4'
    },
    {
      id: '2',
      phone: '0501234567',
      pin: '5678',
      name: 'Jane Smith',
      email: 'jane@example.com',
      transactions: [
        { id: 't4', type: 'Received', amount: 'GHS 75.00', date: '2025-05-23' },
      ],
      avatar: 'https://picsum.photos/400/250?random=5'
    },
    // Dummy Agent Users
    {
      id: 'agent-1',
      name: 'Kwame\'s MoMo',
      avatar: 'https://picsum.photos/400/250?random=6',
      isAgent: true,
      agentId: '1',
    },
    {
      id: 'agent-2',
      name: 'Akosua MoMo Point',
      avatar: 'https://picsum.photos/400/250?random=7',
      isAgent: true,
      agentId: '3',
    },
    {
      id: 'agent-3',
      name: 'Quick Cash Services',
      avatar: 'https://picsum.photos/400/250?random=8',
      isAgent: true,
      agentId: '4',
    },
    {
      id: 'agent-4',
      name: 'Agent Kofi',
      avatar: 'https://picsum.photos/400/250?random=9',
      isAgent: true,
      agentId: 'dummy-agent-5',
    },
    {
      id: 'agent-30',
      name: 'Quick Cash Services Branch 2',
      avatar: 'https://picsum.photos/400/250?random=10',
      isAgent: true,
      agentId: '4',
    },
    {
      id: 'agent-36',
      name: 'Quick Cash Services Branch 3',
      avatar: 'https://picsum.photos/400/250?random=11',
      isAgent: true,
      agentId: '4',
    },
    {
      id: 'agent-308',
      name: 'Quick Cash Services Branch 4',
      avatar: 'https://picsum.photos/400/250?random=12',
      isAgent: true,
      agentId: '4',
    },
    {
      id: 'agent-31',
      name: 'Quick Cash Services Branch 5',
      avatar: 'https://picsum.photos/400/250?random=13',
      isAgent: true,
      agentId: '4',
    },
  ],

  // User data (simplified, currentUser holds more detail)
  user: {
    name: 'Guest',
    isVendor: false,
  },

  // Agents
  agents: dummyAgents,
  selectedAgent: null,

  // Agent registration
  pendingAgent: null,
  otp: null,

  // UI State
  isLoading: false,
  isVendor: false,

  // Posts and Comments State
  posts: [],
  comments: {
    'p1': [
      {
        id: 'c1-1',
        userId: '1',
        text: 'Great promo, Kwame! I\'ll be there!',
        timestamp: new Date(Date.now() - 3600000).toISOString(),
        replies: [
          {
            id: 'r1-1-1',
            userId: 'agent-1',
            text: 'Awesome, John! Looking forward to seeing you!',
            timestamp: new Date(Date.now() - 3500000).toISOString(),
          },
          {
            id: 'r1-1-2',
            userId: '2',
            text: 'Is the GHS 5 back immediate or in a few days?',
            timestamp: new Date(Date.now() - 3400000).toISOString(),
          },
        ]
      },
      {
        id: 'c1-2',
        userId: '2',
        text: 'Is this available throughout the day?',
        timestamp: new Date(Date.now() - 1800000).toISOString(),
        replies: []
      },
    ],
    'p2': [
      {
        id: 'c2-1',
        userId: '1',
        text: 'Awesome, Akosua! I\'ve been waiting for this.',
        timestamp: new Date(Date.now() - 86400000).toISOString(),
        replies: []
      },
    ],
    'p3': [
      {
        id: 'c3-1',
        userId: '1',
        text: 'Busy as always! Good job!',
        timestamp: new Date(Date.now() - 172800000).toISOString(),
        replies: []
      },
      {
        id: 'c3-2',
        userId: 'agent-1',
        text: 'Keep up the good work, team!',
        timestamp: new Date(Date.now() - 172700000).toISOString(),
        replies: []
      },
    ],
    'p5': [
      {
        id: 'c5-1',
        userId: 'agent-1',
        text: 'Thank you for your feedback, John! We appreciate it. 🙏',
        timestamp: new Date(Date.now() - 3600000).toISOString(),
        replies: []
      }
    ]
  },

  // Auth Actions
  login: (phone: string, pin: string): IAuthResult => {
    const user = get().users.find((u) => u.phone === phone && u.pin === pin);
    if (user) {
      set({
        isAuthenticated: true,
        currentUser: user,
        user: { name: user.name, isVendor: !!user.isAgent },
        isVendor: !!user.isAgent,
      });
      return { success: true };
    }
    return { success: false, error: 'Invalid phone number or PIN' };
  },

  register: (userData: IUserRegistrationData): IAuthResult => {
    const { users } = get();
    const existingUser = users.find((u) => u.phone === userData.phone);
    if (existingUser) {
      return { success: false, error: 'Phone number already registered' };
    }
    const newUser: IUser = {
      id: Date.now().toString(),
      ...userData,
      transactions: [],
      avatar: `https://via.placeholder.com/60/FFCC00/FFFFFF?text=${userData.name.charAt(0)}`
    };
    set((state) => ({
      users: [...state.users, newUser],
      isAuthenticated: true,
      currentUser: newUser,
      user: { name: newUser.name, isVendor: false },
      isVendor: false,
    }));
    return { success: true };
  },

  updateUser: (userData: IUserUpdateData): void => {
    set((state) => {
      if (!state.currentUser) return state;
      const updatedUser = { ...state.currentUser, ...userData };
      return {
        currentUser: updatedUser,
        users: state.users.map((u) => (u.id === updatedUser.id ? updatedUser : u)),
        user: { ...state.user, name: updatedUser.name },
      };
    });
  },

  logout: (): void => set({
    isAuthenticated: false,
    currentUser: null,
    user: { name: 'Guest', isVendor: false },
    isVendor: false,
    pendingAgent: null,
    otp: null,
  }),

  setAuthenticated: (authenticated: boolean): void => set({ isAuthenticated: authenticated }),

  // Agent Actions
  sendOTP: (phone: string): IAuthResult => {
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    set({ otp });
    console.log(`OTP sent to ${phone}: ${otp}`);
    return { success: true };
  },

  verifyOTP: (inputOTP: string): IAuthResult => {
    const storedOTP = get().otp;
    if (inputOTP === storedOTP) {
      set({ otp: null });
      return { success: true };
    }
    return { success: false, error: 'Invalid OTP' };
  },

  agentRegistration: (agentData: IAgentRegistrationData): IAgent => {
    const { currentUser } = get();
    const provider = agentData.networks?.length ? agentData.networks[0] as 'mtn' | 'vodafone' | 'airteltigo' : 'mtn';
    const newAgent: IAgent = {
      id: `agent-${Date.now()}`,
      name: agentData.name,
      address: agentData.address,
      provider,
      status: agentData.isOpen ? 'open' : 'closed',
      rating: 0,
      createdAt: new Date().toISOString(),
      distance: 0,
      latitude: agentData.location?.latitude || 0,
      longitude: agentData.location?.longitude || 0,
      cashAvailable: true,
      services: agentData.services || ['cash_in', 'cash_out'],
      networks: agentData.networks,
      location: agentData.location,
      isOpen: agentData.isOpen,
    };
    set((state) => ({
      agents: [...state.agents, newAgent],
      pendingAgent: newAgent,
      currentUser: currentUser ? {
        ...currentUser,
        isAgent: true,
        agentId: newAgent.id,
        avatar: currentUser.avatar || `https://picsum.photos/400/250?random=${Date.now()}`
      } : null,
      users: state.users.map((u) =>
        currentUser && u.id === currentUser.id
          ? {
              ...u,
              isAgent: true,
              agentId: newAgent.id,
              avatar: u.avatar || `https://picsum.photos/400/250?random=${Date.now()}`
            }
          : u
      ),
      isVendor: true,
    }));
    return newAgent;
  },

  updateAgent: (agentId: string, updates: Partial<IAgent>): void => {
    set((state) => ({
      agents: state.agents.map((agent) =>
        agent.id === agentId ? { ...agent, ...updates } : agent
      ),
      pendingAgent:
        state.pendingAgent?.id === agentId
          ? { ...state.pendingAgent, ...updates }
          : state.pendingAgent,
    }));
  },

  // Other Actions
  setSelectedAgent: (agent: IAgent | null): void => set({ selectedAgent: agent }),
  
  toggleVendorMode: (): void => set((state) => ({
    isVendor: state.currentUser?.isAgent ? !state.isVendor : state.isVendor,
    user: { ...state.user, isVendor: state.currentUser?.isAgent ? !state.isVendor : state.isVendor },
  })),

  updateAgentStatus: (agentId: string, status: 'open' | 'closed'): void => set((state) => ({
    agents: state.agents.map((agent) =>
      agent.id === agentId ? { ...agent, status } : agent
    ),
  })),
  createPost: (postData: IPostData): IPostResult => {
    const { currentUser, posts } = get();
    if (!currentUser) {
      console.warn('Cannot create post: No current user logged in.');
      return { success: false, error: 'User not logged in' };
    }

    const newPost: IPost = {
      id: `p${Date.now()}`,
      userId: currentUser.id,
      timestamp: 'Just now',
      likes: 0,
      comments: 0,
      reactions: { like: 0, love: 0, helpful: 0 },
      ...postData,
      user: {
        name: currentUser.name,
        avatar: currentUser.avatar || 'https://picsum.photos/400/250?random=14'
      }
    };

    set(state => ({
      posts: [newPost, ...state.posts],
    }));
    console.log('Post created:', newPost);
    return { success: true, post: newPost };
  },

  addComment: (postId: string, commentText: string): ICommentResult => {
    const { currentUser, comments } = get();
    if (!currentUser) {
      console.warn('Cannot add comment: No current user logged in.');
      return { success: false, error: 'User not logged in' };
    }

    const newComment: IComment = {
      id: `c${Date.now()}`,
      userId: currentUser.id,
      text: commentText,
      timestamp: new Date().toISOString(),
      replies: [],
    };

    set((state) => ({
      comments: {
        ...state.comments,
        [postId]: [...(state.comments[postId] || []), newComment],
      },
      posts: state.posts.map(post =>
        post.id === postId
          ? { ...post, comments: (post.comments || 0) + 1 }
          : post
      ),
    }));

    console.log(`Comment added to post ${postId}:`, newComment);
    return { success: true, comment: newComment };
  },

  addReply: (postId: string, parentCommentId: string, replyText: string): IReplyResult => {
    const { currentUser, comments } = get();
    if (!currentUser) {
      console.warn('Cannot add reply: No current user logged in.');
      return { success: false, error: 'User not logged in' };
    }

    const newReply: IReply = {
      id: `r${Date.now()}`,
      userId: currentUser.id,
      text: replyText,
      timestamp: new Date().toISOString(),
    };

    set((state) => ({
      comments: {
        ...state.comments,
        [postId]: (state.comments[postId] || []).map(comment =>
          comment.id === parentCommentId
            ? { ...comment, replies: [...(comment.replies || []), newReply] }
            : comment
        ),
      },
    }));

    console.log(`Reply added to comment ${parentCommentId} on post ${postId}:`, newReply);
    return { success: true, reply: newReply };
  },

  getUserById: (userId: string): IUser | undefined => {
    return get().users.find(u => u.id === userId);
  },
}));

export default useStore; 