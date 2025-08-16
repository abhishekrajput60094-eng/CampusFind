import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface Item {
  id: string;
  title: string;
  category: string;
  location: string;
  date: string;
  description: string;
  status: 'lost' | 'found' | 'claimed';
  image?: string;
  reporter: string;
  contactInfo: string;
  createdAt: string;
  updatedAt: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  role: 'student' | 'staff' | 'admin';
  joinDate: string;
  stats: {
    itemsReported: number;
    itemsClaimed: number;
    helpfulReturns: number;
    successRate: number;
  };
  badges: string[];
}

export interface Notification {
  id: string;
  type: 'match' | 'claim' | 'success' | 'info';
  title: string;
  message: string;
  date: string;
  read: boolean;
}

interface AppState {
  // Theme
  darkMode: boolean;
  toggleDarkMode: () => void;

  // Navigation
  currentPage: string;
  setCurrentPage: (page: string) => void;

  // Items
  items: Item[];
  addItem: (item: Omit<Item, 'id' | 'createdAt' | 'updatedAt'>) => void;
  updateItem: (id: string, updates: Partial<Item>) => void;
  deleteItem: (id: string) => void;
  getItemsByStatus: (status: Item['status']) => Item[];
  searchItems: (query: string) => Item[];

  // User
  currentUser: User | null;
  setCurrentUser: (user: User) => void;

  // Notifications
  notifications: Notification[];
  addNotification: (notification: Omit<Notification, 'id' | 'date'>) => void;
  markNotificationAsRead: (id: string) => void;
  clearNotifications: () => void;

  // UI State
  isLoading: boolean;
  setIsLoading: (loading: boolean) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  selectedCategory: string;
  setSelectedCategory: (category: string) => void;
  selectedStatus: string;
  setSelectedStatus: (status: string) => void;
}

export const useStore = create<AppState>()(
  persist(
    (set, get) => ({
      // Theme
      darkMode: false,
      toggleDarkMode: () => {
        const newDarkMode = !get().darkMode;
        set({ darkMode: newDarkMode });
        document.documentElement.classList.toggle('dark', newDarkMode);
      },

      // Navigation
      currentPage: 'home',
      setCurrentPage: (page: string) => set({ currentPage: page }),

      // Items
      items: [
        {
          id: '1',
          title: 'Blue Backpack',
          category: 'bag',
          location: 'Library - 2nd Floor',
          date: '2025-01-10',
          description: 'Navy blue backpack with laptop compartment, found near study area',
          status: 'found',
          image: 'https://images.pexels.com/photos/2905238/pexels-photo-2905238.jpeg?w=400',
          reporter: 'Sarah Chen',
          contactInfo: 'sarah.chen@university.edu',
          createdAt: '2025-01-10T10:00:00Z',
          updatedAt: '2025-01-10T10:00:00Z'
        },
        {
          id: '2',
          title: 'iPhone 14 Pro',
          category: 'electronics',
          location: 'Student Center',
          date: '2025-01-09',
          description: 'Space Gray iPhone with cracked screen protector',
          status: 'lost',
          reporter: 'Mike Johnson',
          contactInfo: 'mike.johnson@university.edu',
          createdAt: '2025-01-09T14:30:00Z',
          updatedAt: '2025-01-09T14:30:00Z'
        },
        {
          id: '3',
          title: 'Red Water Bottle',
          category: 'personal',
          location: 'Gym',
          date: '2025-01-08',
          description: 'Hydro Flask red water bottle with stickers',
          status: 'found',
          image: 'https://images.pexels.com/photos/4393021/pexels-photo-4393021.jpeg?w=400',
          reporter: 'Alex Rivera',
          contactInfo: 'alex.rivera@university.edu',
          createdAt: '2025-01-08T16:45:00Z',
          updatedAt: '2025-01-08T16:45:00Z'
        }
      ],

      addItem: (itemData) => {
        const newItem: Item = {
          ...itemData,
          id: Date.now().toString(),
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        };
        set((state) => ({ items: [...state.items, newItem] }));
      },

      updateItem: (id, updates) => {
        set((state) => ({
          items: state.items.map((item) =>
            item.id === id
              ? { ...item, ...updates, updatedAt: new Date().toISOString() }
              : item
          )
        }));
      },

      deleteItem: (id) => {
        set((state) => ({
          items: state.items.filter((item) => item.id !== id)
        }));
      },

      getItemsByStatus: (status) => {
        return get().items.filter((item) => item.status === status);
      },

      searchItems: (query) => {
        const items = get().items;
        if (!query.trim()) return items;
        
        const lowercaseQuery = query.toLowerCase();
        return items.filter(
          (item) =>
            item.title.toLowerCase().includes(lowercaseQuery) ||
            item.description.toLowerCase().includes(lowercaseQuery) ||
            item.location.toLowerCase().includes(lowercaseQuery) ||
            item.category.toLowerCase().includes(lowercaseQuery)
        );
      },

      // User
      currentUser: {
        id: '1',
        name: 'Sarah Chen',
        email: 'sarah.chen@university.edu',
        avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?w=150&h=150&fit=crop&crop=face',
        role: 'student',
        joinDate: '2023-09-15',
        stats: {
          itemsReported: 12,
          itemsClaimed: 8,
          helpfulReturns: 15,
          successRate: 87
        },
        badges: ['helper', 'reporter', 'finder']
      },

      setCurrentUser: (user) => set({ currentUser: user }),

      // Notifications
      notifications: [
        {
          id: '1',
          type: 'match',
          title: 'Potential Match Found!',
          message: 'A blue backpack matching your report was found in Library',
          date: '2025-01-10T09:30:00Z',
          read: false
        },
        {
          id: '2',
          type: 'claim',
          title: 'Claim Approved',
          message: 'Your claim for AirPods has been approved',
          date: '2025-01-09T15:20:00Z',
          read: true
        }
      ],

      addNotification: (notificationData) => {
        const newNotification: Notification = {
          ...notificationData,
          id: Date.now().toString(),
          date: new Date().toISOString()
        };
        set((state) => ({
          notifications: [newNotification, ...state.notifications]
        }));
      },

      markNotificationAsRead: (id) => {
        set((state) => ({
          notifications: state.notifications.map((notification) =>
            notification.id === id
              ? { ...notification, read: true }
              : notification
          )
        }));
      },

      clearNotifications: () => set({ notifications: [] }),

      // UI State
      isLoading: false,
      setIsLoading: (loading) => set({ isLoading: loading }),
      searchQuery: '',
      setSearchQuery: (query) => set({ searchQuery: query }),
      selectedCategory: 'all',
      setSelectedCategory: (category) => set({ selectedCategory: category }),
      selectedStatus: 'all',
      setSelectedStatus: (status) => set({ selectedStatus: status })
    }),
    {
      name: 'lost-found-storage',
      partialize: (state) => ({
        darkMode: state.darkMode,
        items: state.items,
        currentUser: state.currentUser,
        notifications: state.notifications
      })
    }
  )
);