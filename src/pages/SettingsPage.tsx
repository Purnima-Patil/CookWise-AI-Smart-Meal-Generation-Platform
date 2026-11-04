import React, { useState, useRef } from 'react';
import { useApp } from '../context/AppContext';
import { DIETARY_OPTIONS } from '../lib/constants/ingredients';
import { SUPPORTED_LANGUAGES, SupportedLanguage } from '../lib/i18n';
import { User, Bell, Shield, Sparkles, Camera, Globe, Upload, Check, LogOut } from 'lucide-react';

const AVATAR_PRESETS = [
  'https://images.unsplash.com/photo-1577219491135-ce391730fb2c?w=150&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&auto=format&fit=crop&q=80',
];

export const SettingsPage: React.FC = () => {
  const { user, updateUserProfile, uploadAvatar, signOut, language, setLanguage, t } = useApp();

  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);
  const [bio, setBio] = useState(user.bio);
  const [dietary, setDietary] = useState<string[]>(user.dietaryPreferences);

  // Notification toggles
  const [emailAlerts, setEmailAlerts] = useState(true);
  const [generationAlerts, setGenerationAlerts] = useState(true);
  const [voiceAutoPlay, setVoiceAutoPlay] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === 'string') {
        uploadAvatar(reader.result);
      }
    };
    reader.readAsDataURL(file);
  };

  const toggleDietary = (item: string) => {
    if (dietary.includes(item)) {
      setDietary(dietary.filter((d) => d !== item));
    } else {
      setDietary([...dietary, item]);
    }
  };

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@')) {
      alert('Please enter a valid email address');
      return;
    }
    updateUserProfile({
      name: name.trim() || user.name,
      email: email.trim().toLowerCase(),
      bio: bio.trim(),
      dietaryPreferences: dietary,
    });
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
      {/* Header */}
      <div className="pb-6 border-b border-stone-200">
        <h1 className="font-serif text-3xl font-bold text-stone-900 tracking-tight">
          {t('settings_title')}
        </h1>
        <p className="text-xs text-stone-500 mt-1">
          {t('settings_language_desc')}
        </p>
      </div>

      {/* Form sections */}
      <div className="space-y-8">
        
        {/* 1. Language & Regional Settings */}
        <div className="bg-white rounded-2xl border border-stone-200/80 p-6 shadow-xs space-y-4">
          <div className="flex items-center gap-2.5 pb-3 border-b border-stone-100">
            <Globe className="w-5 h-5 text-amber-600" />
            <div>
              <h3 className="font-serif text-lg font-bold text-stone-900">
                {t('settings_language_heading')}
              </h3>
              <p className="text-xs text-stone-500">
                {t('settings_language_desc')}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {SUPPORTED_LANGUAGES.map((lang) => {
              const isSelected = language === lang.code;
              return (
                <button
                  key={lang.code}
                  type="button"
                  onClick={() => setLanguage(lang.code as SupportedLanguage)}
                  className={`p-3 rounded-xl border text-left transition-all cursor-pointer flex flex-col justify-between ${
                    isSelected
                      ? 'border-amber-600 bg-amber-50/70 shadow-2xs'
                      : 'border-stone-200 hover:border-stone-300 hover:bg-stone-50'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-xl">{lang.flag}</span>
                    {isSelected && (
                      <span className="w-4 h-4 rounded-full bg-amber-600 text-white flex items-center justify-center">
                        <Check className="w-2.5 h-2.5 stroke-[3]" />
                      </span>
                    )}
                  </div>
                  <span className="text-xs font-bold text-stone-900 block">{lang.nativeName}</span>
                  <span className="text-[10px] text-stone-500">{lang.name}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* 2. Profile Photo Upload */}
        <div className="bg-white rounded-2xl border border-stone-200/80 p-6 shadow-xs space-y-4">
          <div className="flex items-center gap-2.5 pb-3 border-b border-stone-100">
            <Camera className="w-5 h-5 text-stone-700" />
            <div>
              <h3 className="font-serif text-lg font-bold text-stone-900">
                {t('settings_photo_heading')}
              </h3>
              <p className="text-xs text-stone-500">
                Upload any picture from your device to use as your chef avatar
              </p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
            <div className="relative group shrink-0">
              <img
                src={user.avatar}
                alt={user.name}
                className="w-24 h-24 rounded-2xl object-cover border-2 border-amber-500 shadow-md"
              />
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="absolute inset-0 bg-stone-950/40 rounded-2xl opacity-0 group-hover:opacity-100 flex items-center justify-center text-white transition-opacity cursor-pointer"
              >
                <Camera className="w-6 h-6" />
              </button>
            </div>

            <div className="flex-1 space-y-3 text-center sm:text-left">
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
                className="px-4 py-2 bg-stone-900 hover:bg-stone-800 text-white rounded-xl text-xs font-semibold inline-flex items-center gap-2 cursor-pointer transition-colors shadow-2xs"
              >
                <Upload className="w-3.5 h-3.5 text-amber-400" />
                <span>{t('settings_photo_choose')}</span>
              </button>
              <p className="text-[11px] text-stone-500">
                Supports JPG, PNG, GIF, or WebP. Maximum file size 5MB.
              </p>

              {/* Preset picker */}
              <div className="pt-2">
                <span className="text-[11px] font-semibold text-stone-600 block mb-1.5">
                  Or pick a chef avatar:
                </span>
                <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
                  {AVATAR_PRESETS.map((preset, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => uploadAvatar(preset)}
                      className={`w-9 h-9 rounded-xl overflow-hidden border-2 transition-all cursor-pointer ${
                        user.avatar === preset ? 'border-amber-600 scale-105 shadow-xs' : 'border-stone-200 hover:border-stone-400'
                      }`}
                    >
                      <img src={preset} alt={`avatar ${idx}`} className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 3. Account Profile with Editable Email */}
        <div className="bg-white rounded-2xl border border-stone-200/80 p-6 shadow-xs space-y-4">
          <div className="flex items-center gap-2.5 pb-3 border-b border-stone-100">
            <User className="w-5 h-5 text-stone-700" />
            <h3 className="font-serif text-lg font-bold text-stone-900">
              {t('settings_account_heading')}
            </h3>
          </div>

          <form onSubmit={handleSaveProfile} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-stone-600 mb-1.5">
                  {t('settings_name_label')}
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-stone-50 border border-stone-200 rounded-xl text-xs font-medium text-stone-800 focus:outline-none focus:ring-1 focus:ring-amber-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-stone-600 mb-1.5">
                  {t('settings_email_label')}
                </label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-stone-50 border border-stone-200 rounded-xl text-xs font-medium text-stone-800 focus:outline-none focus:ring-1 focus:ring-amber-500"
                  placeholder="you@example.com"
                />
                <span className="text-[10px] text-stone-500 mt-1 block">
                  {t('settings_email_helper')}
                </span>
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-stone-600 mb-1.5">
                {t('settings_bio_label')}
              </label>
              <textarea
                rows={2}
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-stone-50 border border-stone-200 rounded-xl text-xs text-stone-800 focus:outline-none focus:ring-1 focus:ring-amber-500 resize-none"
              />
            </div>

            <div className="flex justify-end pt-2">
              <button
                type="submit"
                className="px-5 py-2.5 rounded-xl bg-stone-900 hover:bg-stone-800 text-white font-semibold text-xs transition-colors cursor-pointer shadow-2xs"
              >
                {t('settings_save_btn')}
              </button>
            </div>
          </form>
        </div>

        {/* 4. Default Dietary Preferences */}
        <div className="bg-white rounded-2xl border border-stone-200/80 p-6 shadow-xs space-y-4">
          <div className="flex items-center gap-2.5 pb-3 border-b border-stone-100">
            <Sparkles className="w-5 h-5 text-amber-600" />
            <div>
              <h3 className="font-serif text-lg font-bold text-stone-900">
                {t('create_dietary_label')}
              </h3>
              <p className="text-xs text-stone-500">
                These tags will automatically pre-populate when you start the recipe creation wizard
              </p>
            </div>
          </div>

          <div className="flex flex-wrap gap-2">
            {DIETARY_OPTIONS.map((item) => {
              const isSelected = dietary.includes(item);
              return (
                <button
                  key={item}
                  type="button"
                  onClick={() => toggleDietary(item)}
                  className={`px-3.5 py-2 rounded-xl text-xs font-medium border transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-stone-900 border-stone-900 text-white shadow-2xs'
                      : 'bg-white border-stone-200 text-stone-700 hover:bg-stone-50'
                  }`}
                >
                  {item}
                </button>
              );
            })}
          </div>

          <div className="flex justify-end pt-2">
            <button
              onClick={() => {
                updateUserProfile({ dietaryPreferences: dietary });
              }}
              className="px-5 py-2 rounded-xl bg-stone-900 hover:bg-stone-800 text-white font-semibold text-xs transition-colors cursor-pointer"
            >
              Update Dietary Preferences
            </button>
          </div>
        </div>

        {/* 5. Notification & Audio Preferences */}
        <div className="bg-white rounded-2xl border border-stone-200/80 p-6 shadow-xs space-y-4">
          <div className="flex items-center gap-2.5 pb-3 border-b border-stone-100">
            <Bell className="w-5 h-5 text-stone-700" />
            <h3 className="font-serif text-lg font-bold text-stone-900">
              Notification & Audio Options
            </h3>
          </div>

          <div className="space-y-4 text-xs">
            <label className="flex items-center justify-between py-2 cursor-pointer">
              <div>
                <span className="font-semibold text-stone-800 block">AI Generation Completion</span>
                <span className="text-stone-500">Notify me immediately when recipe formulas are ready</span>
              </div>
              <input
                type="checkbox"
                checked={generationAlerts}
                onChange={(e) => setGenerationAlerts(e.target.checked)}
                className="w-4 h-4 accent-stone-900 rounded-sm cursor-pointer"
              />
            </label>

            <label className="flex items-center justify-between py-2 border-t border-stone-100 cursor-pointer">
              <div>
                <span className="font-semibold text-stone-800 block">Social Upvotes & Comments</span>
                <span className="text-stone-500">Notify me when someone likes or saves my created dish</span>
              </div>
              <input
                type="checkbox"
                checked={emailAlerts}
                onChange={(e) => setEmailAlerts(e.target.checked)}
                className="w-4 h-4 accent-stone-900 rounded-sm cursor-pointer"
              />
            </label>

            <label className="flex items-center justify-between py-2 border-t border-stone-100 cursor-pointer">
              <div>
                <span className="font-semibold text-stone-800 block">Auto-play Voice Guidance</span>
                <span className="text-stone-500">Automatically begin reading step 1 upon opening a recipe page</span>
              </div>
              <input
                type="checkbox"
                checked={voiceAutoPlay}
                onChange={(e) => setVoiceAutoPlay(e.target.checked)}
                className="w-4 h-4 accent-stone-900 rounded-sm cursor-pointer"
              />
            </label>
          </div>
        </div>

        {/* 6. Authentication & Sign Out */}
        <div className="bg-white rounded-2xl border border-stone-200/80 p-6 shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <Shield className="w-5 h-5 text-stone-600" />
            <div>
              <p className="font-semibold text-xs text-stone-900">{t('auth_session_active')}</p>
              <p className="text-xs text-stone-500">{user.email}</p>
            </div>
          </div>

          <button
            onClick={signOut}
            className="px-4 py-2 rounded-xl border border-rose-200 text-rose-700 hover:bg-rose-50 font-semibold text-xs transition-colors cursor-pointer flex items-center gap-1.5"
          >
            <LogOut className="w-4 h-4 text-rose-500" />
            <span>{t('nav_signout')}</span>
          </button>
        </div>

      </div>
    </div>
  );
};
