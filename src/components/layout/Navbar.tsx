import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { SUPPORTED_LANGUAGES, SupportedLanguage } from '../../lib/i18n';
import { ChefHat, Search, Bell, Sparkles, User, Settings, Bookmark, Heart, LogOut, Menu, X, Globe, LogIn } from 'lucide-react';

export const Navbar: React.FC = () => {
  const { currentPath, navigate, user, unreadCount, isAuthenticated, signOut, language, setLanguage, t } = useApp();
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [showLanguageDropdown, setShowLanguageDropdown] = useState(false);

  const isActive = (path: string) => {
    if (path === '/' && currentPath === '/') return true;
    if (path !== '/' && currentPath.startsWith(path)) return true;
    return false;
  };

  const currentLang = SUPPORTED_LANGUAGES.find((l) => l.code === language) || SUPPORTED_LANGUAGES[0];

  return (
    <>
      <header className="sticky top-0 z-40 w-full bg-[#FAF8F5]/90 backdrop-blur-md border-b border-stone-200/80 transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          
          {/* Zone 1: Brand Wordmark */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => navigate('/')}
              className="flex items-center gap-2.5 text-stone-900 group text-left cursor-pointer"
            >
              <div className="w-8 h-8 rounded-lg bg-stone-900 text-amber-500 flex items-center justify-center shadow-sm group-hover:scale-105 transition-transform">
                <ChefHat className="w-5 h-5" />
              </div>
              <span className="font-serif text-xl font-bold tracking-tight text-stone-900">
                {t('app_title')}
              </span>
            </button>
          </div>

          {/* Zone 2: Navigation Links (When authenticated) */}
          {isAuthenticated && (
            <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-stone-600">
              <button
                onClick={() => navigate('/explore')}
                className={`transition-colors cursor-pointer ${
                  isActive('/explore') ? 'text-amber-800 font-semibold' : 'hover:text-stone-900'
                }`}
              >
                {t('nav_explore')}
              </button>
              <button
                onClick={() => navigate('/create')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md transition-all cursor-pointer ${
                  isActive('/create')
                    ? 'bg-amber-100/80 text-amber-900 font-semibold'
                    : 'text-stone-700 hover:text-stone-900 hover:bg-stone-100/60'
                }`}
              >
                <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                <span>{t('nav_create')}</span>
              </button>
              <button
                onClick={() => navigate('/my-recipes')}
                className={`transition-colors cursor-pointer ${
                  isActive('/my-recipes') ? 'text-amber-800 font-semibold' : 'hover:text-stone-900'
                }`}
              >
                {t('nav_my_recipes')}
              </button>
              <button
                onClick={() => navigate('/saved')}
                className={`transition-colors cursor-pointer ${
                  isActive('/saved') ? 'text-amber-800 font-semibold' : 'hover:text-stone-900'
                }`}
              >
                {t('nav_saved')}
              </button>
            </nav>
          )}

          {/* Zone 3: Actions (Language Switcher, Search, Notifications, Profile / Auth) */}
          <div className="flex items-center gap-2 sm:gap-3">
            
            {/* Language Switcher Dropdown */}
            <div className="relative">
              <button
                onClick={() => setShowLanguageDropdown(!showLanguageDropdown)}
                className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border border-stone-200 bg-white hover:bg-stone-50 text-xs font-semibold text-stone-700 transition-colors cursor-pointer shadow-2xs"
                title={t('select_language')}
              >
                <Globe className="w-3.5 h-3.5 text-amber-600" />
                <span className="hidden sm:inline">{currentLang.flag} {currentLang.nativeName}</span>
                <span className="sm:hidden font-mono uppercase">{currentLang.code}</span>
              </button>

              {showLanguageDropdown && (
                <>
                  <div
                    className="fixed inset-0 z-40"
                    onClick={() => setShowLanguageDropdown(false)}
                  />
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-xl border border-stone-200 py-1.5 z-50 animate-in fade-in slide-in-from-top-2">
                    <div className="px-3 py-1.5 border-b border-stone-100 text-[11px] font-bold uppercase tracking-wider text-stone-400">
                      {t('select_language')}
                    </div>
                    {SUPPORTED_LANGUAGES.map((lang) => (
                      <button
                        key={lang.code}
                        onClick={() => {
                          setLanguage(lang.code as SupportedLanguage);
                          setShowLanguageDropdown(false);
                        }}
                        className={`w-full text-left px-3.5 py-2 text-xs font-medium flex items-center justify-between transition-colors cursor-pointer ${
                          language === lang.code
                            ? 'bg-amber-50 text-amber-900 font-bold'
                            : 'text-stone-700 hover:bg-stone-50'
                        }`}
                      >
                        <span className="flex items-center gap-2">
                          <span>{lang.flag}</span>
                          <span>{lang.nativeName}</span>
                        </span>
                        <span className="text-[10px] text-stone-400">{lang.name}</span>
                      </button>
                    ))}
                  </div>
                </>
              )}
            </div>

            {isAuthenticated ? (
              <>
                {/* Search shortcut */}
                <button
                  onClick={() => navigate('/search')}
                  title={t('nav_search')}
                  className="p-2 text-stone-600 hover:text-stone-900 hover:bg-stone-100/80 rounded-lg transition-colors cursor-pointer"
                >
                  <Search className="w-5 h-5" />
                </button>

                {/* Notifications */}
                <button
                  onClick={() => navigate('/notifications')}
                  title={t('nav_notifications')}
                  className="relative p-2 text-stone-600 hover:text-stone-900 hover:bg-stone-100/80 rounded-lg transition-colors cursor-pointer"
                >
                  <Bell className="w-5 h-5" />
                  {unreadCount > 0 && (
                    <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-amber-600 rounded-full animate-pulse" />
                  )}
                </button>

                {/* User Profile dropdown */}
                <div className="relative">
                  <button
                    onClick={() => setShowProfileMenu(!showProfileMenu)}
                    className="flex items-center gap-2 p-1 rounded-full hover:ring-2 hover:ring-amber-500/20 transition-all cursor-pointer"
                  >
                    <img
                      src={user.avatar}
                      alt={user.name}
                      className="w-8 h-8 rounded-full object-cover border border-stone-200"
                    />
                  </button>

                  {showProfileMenu && (
                    <>
                      <div
                        className="fixed inset-0 z-40"
                        onClick={() => setShowProfileMenu(false)}
                      />
                      <div className="absolute right-0 mt-2 w-60 bg-white rounded-2xl shadow-xl border border-stone-200 py-2 z-50 animate-in fade-in slide-in-from-top-2">
                        <div className="px-4 py-2.5 border-b border-stone-100 flex items-center gap-3">
                          <img
                            src={user.avatar}
                            alt={user.name}
                            className="w-10 h-10 rounded-full object-cover border border-stone-200"
                          />
                          <div className="min-w-0 flex-1">
                            <p className="text-sm font-semibold text-stone-900 truncate">{user.name}</p>
                            <p className="text-xs text-stone-500 truncate">{user.email}</p>
                          </div>
                        </div>

                        <div className="py-1">
                          <button
                            onClick={() => {
                              setShowProfileMenu(false);
                              navigate('/profile');
                            }}
                            className="w-full text-left px-4 py-2 text-xs font-medium text-stone-700 hover:bg-stone-50 flex items-center gap-2.5 cursor-pointer"
                          >
                            <User className="w-4 h-4 text-stone-400" />
                            {t('nav_profile')}
                          </button>
                          <button
                            onClick={() => {
                              setShowProfileMenu(false);
                              navigate('/saved');
                            }}
                            className="w-full text-left px-4 py-2 text-xs font-medium text-stone-700 hover:bg-stone-50 flex items-center gap-2.5 cursor-pointer"
                          >
                            <Bookmark className="w-4 h-4 text-stone-400" />
                            {t('nav_saved')} ({user.savedRecipeIds.length})
                          </button>
                          <button
                            onClick={() => {
                              setShowProfileMenu(false);
                              navigate('/liked');
                            }}
                            className="w-full text-left px-4 py-2 text-xs font-medium text-stone-700 hover:bg-stone-50 flex items-center gap-2.5 cursor-pointer"
                          >
                            <Heart className="w-4 h-4 text-stone-400" />
                            {t('nav_liked')} ({user.likedRecipeIds.length})
                          </button>
                          <button
                            onClick={() => {
                              setShowProfileMenu(false);
                              navigate('/settings');
                            }}
                            className="w-full text-left px-4 py-2 text-xs font-medium text-stone-700 hover:bg-stone-50 flex items-center gap-2.5 cursor-pointer"
                          >
                            <Settings className="w-4 h-4 text-stone-400" />
                            {t('nav_settings')}
                          </button>
                        </div>

                        <div className="border-t border-stone-100 pt-1">
                          <button
                            onClick={() => {
                              setShowProfileMenu(false);
                              signOut();
                            }}
                            className="w-full text-left px-4 py-2 text-xs font-semibold text-rose-600 hover:bg-rose-50 flex items-center gap-2.5 cursor-pointer transition-colors"
                          >
                            <LogOut className="w-4 h-4 text-rose-500" />
                            {t('nav_signout')}
                          </button>
                        </div>
                      </div>
                    </>
                  )}
                </div>

                {/* Mobile menu toggle */}
                <button
                  onClick={() => setShowMobileMenu(!showMobileMenu)}
                  className="p-2 text-stone-600 md:hidden hover:bg-stone-100 rounded-lg cursor-pointer"
                >
                  {showMobileMenu ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
                </button>
              </>
            ) : (
              <button
                onClick={() => navigate('/login')}
                className="px-3.5 py-1.5 rounded-xl bg-stone-900 hover:bg-stone-800 text-white font-semibold text-xs flex items-center gap-1.5 cursor-pointer transition-colors"
              >
                <LogIn className="w-3.5 h-3.5" />
                <span>{t('nav_signin')}</span>
              </button>
            )}

          </div>
        </div>

        {/* Mobile dropdown drawer */}
        {showMobileMenu && isAuthenticated && (
          <div className="md:hidden border-t border-stone-200 bg-white/95 px-4 pt-2 pb-4 space-y-1 animate-in fade-in">
            <button
              onClick={() => {
                setShowMobileMenu(false);
                navigate('/explore');
              }}
              className="w-full text-left py-2.5 px-3 text-sm font-medium text-stone-700 hover:bg-stone-100 rounded-lg"
            >
              {t('nav_explore')}
            </button>
            <button
              onClick={() => {
                setShowMobileMenu(false);
                navigate('/create');
              }}
              className="w-full text-left py-2.5 px-3 text-sm font-semibold text-amber-900 bg-amber-50 rounded-lg flex items-center gap-2"
            >
              <Sparkles className="w-4 h-4 text-amber-600" />
              {t('nav_create')}
            </button>
            <button
              onClick={() => {
                setShowMobileMenu(false);
                navigate('/my-recipes');
              }}
              className="w-full text-left py-2.5 px-3 text-sm font-medium text-stone-700 hover:bg-stone-100 rounded-lg"
            >
              {t('nav_my_recipes')}
            </button>
            <button
              onClick={() => {
                setShowMobileMenu(false);
                navigate('/saved');
              }}
              className="w-full text-left py-2.5 px-3 text-sm font-medium text-stone-700 hover:bg-stone-100 rounded-lg"
            >
              {t('nav_saved')}
            </button>
            <button
              onClick={() => {
                setShowMobileMenu(false);
                navigate('/settings');
              }}
              className="w-full text-left py-2.5 px-3 text-sm font-medium text-stone-700 hover:bg-stone-100 rounded-lg"
            >
              {t('nav_settings')}
            </button>
            <button
              onClick={() => {
                setShowMobileMenu(false);
                signOut();
              }}
              className="w-full text-left py-2.5 px-3 text-sm font-semibold text-rose-600 hover:bg-rose-50 rounded-lg flex items-center gap-2"
            >
              <LogOut className="w-4 h-4 text-rose-500" />
              {t('nav_signout')}
            </button>
          </div>
        )}
      </header>

      {/* Mobile Bottom Navigation Bar (When authenticated) */}
      {isAuthenticated && (
        <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-stone-200 px-3 py-2 flex items-center justify-around text-xs font-medium text-stone-500">
          <button
            onClick={() => navigate('/')}
            className={`flex flex-col items-center gap-0.5 cursor-pointer ${
              isActive('/') && currentPath === '/' ? 'text-stone-900 font-semibold' : 'hover:text-stone-900'
            }`}
          >
            <ChefHat className="w-5 h-5" />
            <span>{t('nav_home')}</span>
          </button>
          <button
            onClick={() => navigate('/explore')}
            className={`flex flex-col items-center gap-0.5 cursor-pointer ${
              isActive('/explore') ? 'text-stone-900 font-semibold' : 'hover:text-stone-900'
            }`}
          >
            <Search className="w-5 h-5" />
            <span>{t('nav_explore')}</span>
          </button>
          <button
            onClick={() => navigate('/create')}
            className="flex flex-col items-center -mt-5 cursor-pointer"
          >
            <div className="w-12 h-12 rounded-full bg-stone-900 text-amber-400 flex items-center justify-center shadow-lg hover:scale-105 transition-transform">
              <Sparkles className="w-6 h-6" />
            </div>
            <span className="text-[10px] mt-0.5 font-semibold text-stone-800">{t('nav_create')}</span>
          </button>
          <button
            onClick={() => navigate('/saved')}
            className={`flex flex-col items-center gap-0.5 cursor-pointer ${
              isActive('/saved') ? 'text-stone-900 font-semibold' : 'hover:text-stone-900'
            }`}
          >
            <Bookmark className="w-5 h-5" />
            <span>{t('nav_saved')}</span>
          </button>
          <button
            onClick={() => navigate('/profile')}
            className={`flex flex-col items-center gap-0.5 cursor-pointer ${
              isActive('/profile') ? 'text-stone-900 font-semibold' : 'hover:text-stone-900'
            }`}
          >
            <User className="w-5 h-5" />
            <span>{t('nav_profile')}</span>
          </button>
        </div>
      )}
    </>
  );
};
