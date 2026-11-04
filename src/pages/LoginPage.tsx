import React, { useState, useRef } from 'react';
import { useApp } from '../context/AppContext';
import { ASSET_IMAGES } from '../assets/images';
import { SUPPORTED_LANGUAGES, SupportedLanguage } from '../lib/i18n';
import { ChefHat, Sparkles, Check, ArrowRight, Mail, Lock, User as UserIcon, Camera, Globe, Eye, EyeOff, Upload } from 'lucide-react';

const AVATAR_PRESETS = [
  'https://images.unsplash.com/photo-1577219491135-ce391730fb2c?w=150&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&auto=format&fit=crop&q=80',
];

export const LoginPage: React.FC = () => {
  const { login, signUp, continueAsGuest, language, setLanguage, t } = useApp();
  const [mode, setMode] = useState<'signin' | 'signup'>('signin');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [avatar, setAvatar] = useState(AVATAR_PRESETS[0]);
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      setErrorMessage('File size must be under 5MB');
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === 'string') {
        setAvatar(reader.result);
        setErrorMessage('');
      }
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    if (!email || !email.includes('@')) {
      setErrorMessage('Please enter a valid email address');
      return;
    }

    if (!password || password.length < 4) {
      setErrorMessage('Password must be at least 4 characters');
      return;
    }

    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
      if (mode === 'signup') {
        signUp(name.trim() || 'Chef', email, avatar);
      } else {
        login(email, name);
      }
    }, 600);
  };

  const handleGoogleLogin = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      login('user@google.com', 'Google Chef');
    }, 700);
  };

  return (
    <div className="min-h-[90vh] flex items-center justify-center px-4 py-8 sm:py-12">
      <div className="max-w-4xl w-full bg-white rounded-3xl border border-stone-200/90 shadow-2xl overflow-hidden grid grid-cols-1 md:grid-cols-12">
        
        {/* Left Column: Visual & Branding */}
        <div className="md:col-span-5 relative bg-stone-950 text-white p-8 sm:p-10 flex flex-col justify-between overflow-hidden">
          <img
            src={ASSET_IMAGES.hero}
            alt="Artisanal food culinary table"
            referrerPolicy="no-referrer"
            className="absolute inset-0 w-full h-full object-cover opacity-25 filter blur-[1px]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/75 to-stone-950/40 pointer-events-none" />

          {/* Top Brand */}
          <div className="relative z-10">
            <div className="flex items-center gap-2.5 mb-6">
              <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center border border-amber-500/30 shadow-inner">
                <ChefHat className="w-6 h-6" />
              </div>
              <span className="font-serif text-2xl font-bold tracking-tight text-white">
                {t('app_title')}
              </span>
            </div>

            <h2 className="font-serif text-2xl sm:text-3xl font-bold leading-snug mb-3 text-white">
              {t('hero_title')}
            </h2>
            <p className="text-xs text-stone-300 leading-relaxed">
              {t('hero_subtitle')}
            </p>
          </div>

          {/* Features Highlights */}
          <div className="relative z-10 pt-8 space-y-3 text-xs text-stone-300 border-t border-stone-800/80 mt-6">
            <div className="flex items-center gap-2.5">
              <div className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0">
                <Check className="w-3.5 h-3.5 stroke-[3]" />
              </div>
              <span>{t('hero_feat_smart')}</span>
            </div>
            <div className="flex items-center gap-2.5">
              <div className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0">
                <Check className="w-3.5 h-3.5 stroke-[3]" />
              </div>
              <span>{t('hero_feat_voice')}</span>
            </div>
            <div className="flex items-center gap-2.5">
              <div className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0">
                <Check className="w-3.5 h-3.5 stroke-[3]" />
              </div>
              <span>{t('hero_feat_diet')}</span>
            </div>
          </div>
        </div>

        {/* Right Column: Auth Form */}
        <div className="md:col-span-7 p-6 sm:p-10 flex flex-col justify-center space-y-5">
          
          {/* Top Bar with Language Selector & Tab Switch */}
          <div className="flex items-center justify-between pb-3 border-b border-stone-100">
            {/* Sign In vs Sign Up Tabs */}
            <div className="flex items-center bg-stone-100 p-1 rounded-xl">
              <button
                type="button"
                onClick={() => {
                  setMode('signin');
                  setErrorMessage('');
                }}
                className={`px-4 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                  mode === 'signin'
                    ? 'bg-white text-stone-900 shadow-xs'
                    : 'text-stone-500 hover:text-stone-800'
                }`}
              >
                {t('auth_tab_signin')}
              </button>
              <button
                type="button"
                onClick={() => {
                  setMode('signup');
                  setErrorMessage('');
                }}
                className={`px-4 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                  mode === 'signup'
                    ? 'bg-white text-stone-900 shadow-xs'
                    : 'text-stone-500 hover:text-stone-800'
                }`}
              >
                {t('auth_tab_signup')}
              </button>
            </div>

            {/* Quick Language Dropdown */}
            <div className="flex items-center gap-1.5 bg-stone-50 px-2.5 py-1.5 rounded-lg border border-stone-200">
              <Globe className="w-3.5 h-3.5 text-stone-500" />
              <select
                value={language}
                onChange={(e) => setLanguage(e.target.value as SupportedLanguage)}
                className="bg-transparent text-xs font-semibold text-stone-700 outline-none cursor-pointer"
                aria-label="Language selection"
              >
                {SUPPORTED_LANGUAGES.map((lang) => (
                  <option key={lang.code} value={lang.code}>
                    {lang.flag} {lang.nativeName}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Heading */}
          <div className="space-y-1">
            <h3 className="font-serif text-2xl font-bold text-stone-900">
              {mode === 'signin' ? t('auth_welcome_back') : t('auth_create_title')}
            </h3>
            <p className="text-xs text-stone-500 leading-relaxed">
              {mode === 'signin' ? t('auth_login_subtitle') : t('auth_create_subtitle')}
            </p>
          </div>

          {/* Error notice */}
          {errorMessage && (
            <div className="p-3 bg-rose-50 border border-rose-200 text-rose-700 text-xs rounded-xl flex items-center gap-2">
              <span>⚠️</span>
              <span>{errorMessage}</span>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            
            {/* If Sign Up: Profile Photo Upload */}
            {mode === 'signup' && (
              <div className="p-3.5 bg-amber-50/60 border border-amber-200/60 rounded-2xl space-y-3">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-semibold text-stone-800 flex items-center gap-1.5">
                    <Camera className="w-4 h-4 text-amber-700" />
                    <span>{t('auth_avatar_label')}</span>
                  </label>
                  <span className="text-[11px] text-stone-500">{t('auth_avatar_helper')}</span>
                </div>

                <div className="flex items-center gap-4">
                  {/* Avatar Preview */}
                  <div className="relative group shrink-0">
                    <img
                      src={avatar}
                      alt="Profile preview"
                      className="w-16 h-16 rounded-2xl object-cover border-2 border-white shadow-md"
                    />
                    <button
                      type="button"
                      onClick={() => fileInputRef.current?.click()}
                      className="absolute inset-0 bg-stone-950/40 rounded-2xl opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity text-white cursor-pointer"
                    >
                      <Camera className="w-5 h-5" />
                    </button>
                  </div>

                  {/* Upload button & presets */}
                  <div className="space-y-2 flex-1">
                    <input
                      type="file"
                      ref={fileInputRef}
                      onChange={handleFileUpload}
                      accept="image/*"
                      className="hidden"
                    />
                    <button
                      type="button"
                      onClick={() => fileInputRef.current?.click()}
                      className="px-3.5 py-1.5 bg-white border border-stone-300 hover:border-stone-400 rounded-xl text-xs font-semibold text-stone-800 flex items-center gap-1.5 shadow-2xs hover:bg-stone-50 transition-colors cursor-pointer"
                    >
                      <Upload className="w-3.5 h-3.5 text-stone-600" />
                      <span>{t('auth_avatar_upload_btn')}</span>
                    </button>

                    {/* Quick Avatar Presets */}
                    <div className="flex items-center gap-1.5 pt-0.5">
                      <span className="text-[10px] text-stone-400 font-medium">Or choose:</span>
                      {AVATAR_PRESETS.map((preset, idx) => (
                        <button
                          key={idx}
                          type="button"
                          onClick={() => setAvatar(preset)}
                          className={`w-6 h-6 rounded-full overflow-hidden border transition-all cursor-pointer ${
                            avatar === preset ? 'ring-2 ring-amber-500 border-white scale-110' : 'border-stone-200 opacity-70 hover:opacity-100'
                          }`}
                        >
                          <img src={preset} alt="preset" className="w-full h-full object-cover" />
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* If Sign Up: Name Input */}
            {mode === 'signup' && (
              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1.5">
                  {t('auth_name_label')}
                </label>
                <div className="relative">
                  <UserIcon className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder={t('auth_name_placeholder')}
                    className="w-full pl-10 pr-3.5 py-2.5 bg-stone-50 border border-stone-200 rounded-xl text-xs font-medium text-stone-900 focus:outline-none focus:ring-2 focus:ring-amber-500/30 focus:border-amber-500"
                  />
                </div>
              </div>
            )}

            {/* Email Input (Always Present) */}
            <div>
              <label className="block text-xs font-semibold text-stone-700 mb-1.5">
                {t('auth_email_label')}
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder={t('auth_email_placeholder')}
                  className="w-full pl-10 pr-3.5 py-2.5 bg-stone-50 border border-stone-200 rounded-xl text-xs font-medium text-stone-900 focus:outline-none focus:ring-2 focus:ring-amber-500/30 focus:border-amber-500"
                />
              </div>
            </div>

            {/* Password Input */}
            <div>
              <label className="block text-xs font-semibold text-stone-700 mb-1.5">
                {t('auth_password_label')}
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder={t('auth_password_placeholder')}
                  className="w-full pl-10 pr-10 py-2.5 bg-stone-50 border border-stone-200 rounded-xl text-xs font-medium text-stone-900 focus:outline-none focus:ring-2 focus:ring-amber-500/30 focus:border-amber-500"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-600 cursor-pointer"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 px-4 rounded-xl bg-stone-950 hover:bg-stone-800 text-white font-semibold text-xs flex items-center justify-center gap-2 transition-all cursor-pointer shadow-md active:scale-98"
            >
              <Sparkles className="w-4 h-4 text-amber-400" />
              <span>
                {isLoading
                  ? 'Processing...'
                  : mode === 'signin'
                  ? t('auth_signin_button')
                  : t('auth_signup_button')}
              </span>
            </button>
          </form>

          {/* Social / Divider */}
          <div className="relative flex py-1 items-center">
            <div className="flex-grow border-t border-stone-200"></div>
            <span className="flex-shrink mx-3 text-stone-400 text-[11px] uppercase tracking-wider">
              Or
            </span>
            <div className="flex-grow border-t border-stone-200"></div>
          </div>

          {/* Google Button */}
          <button
            onClick={handleGoogleLogin}
            disabled={isLoading}
            className="w-full py-2.5 px-4 rounded-xl border border-stone-300 bg-white hover:bg-stone-50 hover:border-stone-400 text-stone-800 font-semibold text-xs flex items-center justify-center gap-3 transition-all cursor-pointer shadow-2xs active:scale-98"
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24">
              <path
                fill="#4285F4"
                d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.8-2.4 3.66v3.05h3.89c2.27-2.09 3.655-5.17 3.655-9.15z"
              />
              <path
                fill="#34A853"
                d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.89-3.05c-1.08.72-2.45 1.16-4.04 1.16-3.12 0-5.77-2.1-6.72-4.94H1.26v3.13C3.26 21.36 7.33 24 12 24z"
              />
              <path
                fill="#FBBC05"
                d="M5.28 14.26c-.25-.72-.38-1.49-.38-2.26s.13-1.54.38-2.26V6.61H1.26C.46 8.22 0 10.06 0 12s.46 3.78 1.26 5.39l4.02-3.13z"
              />
              <path
                fill="#EA4335"
                d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.33 0 3.26 2.64 1.26 6.61l4.02 3.13c.95-2.84 3.6-4.99 6.72-4.99z"
              />
            </svg>
            <span>{t('auth_google_continue')}</span>
          </button>

          {/* Continue as Guest */}
          <button
            type="button"
            onClick={continueAsGuest}
            className="w-full py-2.5 px-4 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-700 font-semibold text-xs flex items-center justify-center gap-2 transition-all cursor-pointer"
          >
            <span>{t('auth_guest_continue')}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>

          {/* Switch Mode Footer */}
          <div className="text-center text-xs text-stone-500 pt-1">
            {mode === 'signin' ? (
              <p>
                {t('auth_no_account')}{' '}
                <button
                  type="button"
                  onClick={() => {
                    setMode('signup');
                    setErrorMessage('');
                  }}
                  className="font-bold text-amber-700 hover:underline cursor-pointer"
                >
                  {t('auth_tab_signup')}
                </button>
              </p>
            ) : (
              <p>
                {t('auth_have_account')}{' '}
                <button
                  type="button"
                  onClick={() => {
                    setMode('signin');
                    setErrorMessage('');
                  }}
                  className="font-bold text-amber-700 hover:underline cursor-pointer"
                >
                  {t('auth_tab_signin')}
                </button>
              </p>
            )}
          </div>

        </div>

      </div>
    </div>
  );
};
