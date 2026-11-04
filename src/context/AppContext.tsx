import React, { createContext, useContext, useState, useEffect, ReactNode, useCallback } from 'react';
import { Recipe, User, NotificationItem, SupportedLanguage } from '../types';
import { recipeStore } from '../lib/storage/recipeStore';
import { getTranslation, getLanguageOption, LanguageOption } from '../lib/i18n';

export interface ToastMessage {
  id: string;
  type: 'success' | 'info' | 'error';
  message: string;
}

interface AppContextType {
  // Routing
  currentPath: string;
  navigate: (path: string) => void;
  recipeIdParam: string | null;
  searchQueryParam: string;

  // Language & i18n
  language: SupportedLanguage;
  setLanguage: (lang: SupportedLanguage) => void;
  currentLanguageOption: LanguageOption;
  t: (key: string) => string;

  // Auth
  isAuthenticated: boolean;
  login: (email: string, name?: string) => void;
  signUp: (name: string, email: string, avatar?: string) => void;
  signOut: () => void;
  continueAsGuest: () => void;

  // Data
  recipes: Recipe[];
  user: User;
  notifications: NotificationItem[];
  unreadCount: number;

  // Actions
  refreshRecipes: () => void;
  toggleLikeRecipe: (id: string) => void;
  toggleSaveRecipe: (id: string) => void;
  addNewRecipe: (recipe: Recipe) => void;
  markNotificationRead: (id: string) => void;
  markAllNotificationsRead: () => void;
  updateUserProfile: (user: Partial<User>) => void;
  uploadAvatar: (dataUrl: string) => void;
  showToast: (message: string, type?: 'success' | 'info' | 'error') => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  // Safe initial path resolution
  const [currentPath, setCurrentPath] = useState<string>(() => {
    if (typeof window !== 'undefined') {
      return window.location.pathname || '/';
    }
    return '/';
  });

  const [language, setLanguageState] = useState<SupportedLanguage>(() => {
    const saved = recipeStore.getLanguage() as SupportedLanguage;
    return saved || 'en';
  });

  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    return recipeStore.isAuthenticated();
  });

  const [recipes, setRecipes] = useState<Recipe[]>(() => recipeStore.getRecipes());
  const [user, setUser] = useState<User>(() => recipeStore.getUser());
  const [notifications, setNotifications] = useState<NotificationItem[]>(() => recipeStore.getNotifications());
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  // Parse path and params
  const [recipeIdParam, setRecipeIdParam] = useState<string | null>(null);
  const [searchQueryParam, setSearchQueryParam] = useState<string>('');

  const parseRoute = useCallback((path: string) => {
    const recipeMatch = path.match(/^\/recipes\/([^/?#]+)/);
    if (recipeMatch) {
      setRecipeIdParam(recipeMatch[1]);
    } else {
      setRecipeIdParam(null);
    }

    if (typeof window !== 'undefined') {
      const urlParams = new URLSearchParams(window.location.search);
      setSearchQueryParam(urlParams.get('q') || '');
    }
  }, []);

  useEffect(() => {
    parseRoute(currentPath);
  }, [currentPath, parseRoute]);

  // Handle browser back/forward buttons
  useEffect(() => {
    const handlePopState = () => {
      const path = window.location.pathname || '/';
      setCurrentPath(path);
      parseRoute(path);
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, [parseRoute]);

  const navigate = useCallback((path: string) => {
    if (typeof window !== 'undefined') {
      window.history.pushState({}, '', path);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
    setCurrentPath(path.split('?')[0]);
    parseRoute(path);
  }, [parseRoute]);

  const setLanguage = useCallback((newLang: SupportedLanguage) => {
    setLanguageState(newLang);
    recipeStore.setLanguage(newLang);
    const u = recipeStore.getUser();
    u.language = newLang;
    recipeStore.saveUser(u);
    setUser(u);
  }, []);

  const t = useCallback((key: string): string => {
    return getTranslation(key, language);
  }, [language]);

  const refreshRecipes = useCallback(() => {
    setRecipes(recipeStore.getRecipes());
    setUser(recipeStore.getUser());
    setNotifications(recipeStore.getNotifications());
  }, []);

  const showToast = useCallback((message: string, type: 'success' | 'info' | 'error' = 'info') => {
    const id = `toast_${Date.now()}_${Math.random()}`;
    setToasts((prev) => [...prev, { id, type, message }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3800);
  }, []);

  const login = useCallback((email: string, name?: string) => {
    const updated = recipeStore.loginUser(email, name);
    setUser(updated);
    setIsAuthenticated(true);
    showToast(`${t('auth_login_success')} ${updated.name}!`, 'success');
    navigate('/explore');
  }, [navigate, showToast, t]);

  const signUp = useCallback((name: string, email: string, avatar?: string) => {
    const updated = recipeStore.signUpUser(name, email, avatar);
    setUser(updated);
    setIsAuthenticated(true);
    showToast(t('auth_signup_success'), 'success');
    navigate('/explore');
  }, [navigate, showToast, t]);

  const signOut = useCallback(() => {
    recipeStore.signOut();
    setIsAuthenticated(false);
    showToast(t('auth_signed_out_msg'), 'info');
    navigate('/login');
  }, [navigate, showToast, t]);

  const continueAsGuest = useCallback(() => {
    recipeStore.setAuthenticated(true);
    setIsAuthenticated(true);
    showToast('Browsing as Guest Chef', 'info');
    navigate('/explore');
  }, [navigate, showToast]);

  const uploadAvatar = useCallback((dataUrl: string) => {
    try {
      const u = recipeStore.getUser();
      u.avatar = dataUrl;
      recipeStore.saveUser(u);
      setUser({ ...u });
      showToast('Profile photo updated successfully!', 'success');
    } catch (err) {
      console.warn('Avatar upload fallback:', err);
      showToast('Profile photo updated for this session!', 'info');
    }
  }, [showToast]);

  const toggleLikeRecipe = useCallback((id: string) => {
    recipeStore.toggleLike(id);
    refreshRecipes();
  }, [refreshRecipes]);

  const toggleSaveRecipe = useCallback((id: string) => {
    const res = recipeStore.toggleSave(id);
    refreshRecipes();
    showToast(res.isSaved ? 'Saved to your recipe collection' : 'Removed from saved recipes', 'info');
  }, [refreshRecipes, showToast]);

  const addNewRecipe = useCallback((recipe: Recipe) => {
    try {
      recipeStore.saveRecipe(recipe);
      const u = recipeStore.getUser();
      u.createdRecipeIds = [recipe.id, ...(u.createdRecipeIds || []).filter((id) => id !== recipe.id)];
      recipeStore.saveUser(u);

      const title = t('notif_gen_success_title') || 'Recipe Generated Successfully';
      const messageTemplate = t('notif_gen_success_msg') || `"${recipe.title}" is ready! Listen to voice guidance or ask the cooking assistant.`;
      const message = messageTemplate.replace('{title}', recipe.title);

      recipeStore.addNotification({
        type: 'generated',
        title,
        message,
        recipeId: recipe.id,
        titleKey: 'notif_gen_success_title',
        messageKey: 'notif_gen_success_msg',
        params: { title: recipe.title },
      });
      refreshRecipes();
    } catch (err) {
      console.warn('[AppContext] addNewRecipe caught storage error, refreshing UI state:', err);
      refreshRecipes();
    }
  }, [refreshRecipes, t]);

  const markNotificationRead = useCallback((id: string) => {
    recipeStore.markNotificationRead(id);
    setNotifications(recipeStore.getNotifications());
  }, []);

  const markAllNotificationsRead = useCallback(() => {
    recipeStore.markAllNotificationsRead();
    setNotifications(recipeStore.getNotifications());
  }, []);

  const updateUserProfile = useCallback((updates: Partial<User>) => {
    const updated = { ...user, ...updates };
    recipeStore.saveUser(updated);
    setUser(updated);
    showToast(t('settings_saved_msg'), 'success');
  }, [user, showToast, t]);

  const unreadCount = notifications.filter((n) => !n.read).length;
  const currentLanguageOption = getLanguageOption(language);

  return (
    <AppContext.Provider
      value={{
        currentPath,
        navigate,
        recipeIdParam,
        searchQueryParam,
        language,
        setLanguage,
        currentLanguageOption,
        t,
        isAuthenticated,
        login,
        signUp,
        signOut,
        continueAsGuest,
        recipes,
        user,
        notifications,
        unreadCount,
        refreshRecipes,
        toggleLikeRecipe,
        toggleSaveRecipe,
        addNewRecipe,
        markNotificationRead,
        markAllNotificationsRead,
        updateUserProfile,
        uploadAvatar,
        showToast,
      }}
    >
      {children}
      {/* Toast container */}
      <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-2 pointer-events-none max-w-sm w-full">
        {toasts.map((toast) => (
          <div
            key={toast.id}
            className={`pointer-events-auto flex items-center justify-between p-4 rounded-xl shadow-lg border text-sm font-medium transition-all transform duration-200 animate-in fade-in slide-in-from-bottom-2 ${
              toast.type === 'success'
                ? 'bg-emerald-950 text-emerald-100 border-emerald-800'
                : toast.type === 'error'
                ? 'bg-rose-950 text-rose-100 border-rose-800'
                : 'bg-stone-900 text-stone-100 border-stone-800'
            }`}
          >
            <span>{toast.message}</span>
            <button
              onClick={() => setToasts((prev) => prev.filter((t) => t.id !== toast.id))}
              className="ml-3 text-stone-400 hover:text-white"
            >
              ✕
            </button>
          </div>
        ))}
      </div>
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
