import React, { useState, useRef } from 'react';
import { useApp } from '../context/AppContext';
import { RecipeGrid } from '../components/recipe/RecipeGrid';
import { Bookmark, Heart, ChefHat, Settings, Mail, Camera, Edit2, Check, X, LogOut, Upload } from 'lucide-react';

const AVATAR_PRESETS = [
  'https://images.unsplash.com/photo-1577219491135-ce391730fb2c?w=150&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&auto=format&fit=crop&q=80',
];

export const ProfilePage: React.FC = () => {
  const { user, recipes, navigate, uploadAvatar, updateUserProfile, signOut, t } = useApp();
  const [activeTab, setActiveTab] = useState<'created' | 'saved' | 'liked'>('created');
  
  // Quick inline edit modal or state
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);
  const [bio, setBio] = useState(user.bio);
  const [showAvatarPicker, setShowAvatarPicker] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === 'string') {
        uploadAvatar(reader.result);
        setShowAvatarPicker(false);
      }
    };
    reader.readAsDataURL(file);
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
    });
    setIsEditing(false);
  };

  const createdRecipes = recipes.filter(
    (r) => user.createdRecipeIds.includes(r.id) || r.author.id === user.id
  );
  const savedRecipes = recipes.filter((r) => user.savedRecipeIds.includes(r.id));
  const likedRecipes = recipes.filter((r) => user.likedRecipeIds.includes(r.id));

  const currentList =
    activeTab === 'created'
      ? createdRecipes
      : activeTab === 'saved'
      ? savedRecipes
      : likedRecipes;

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
      
      {/* Profile Header Banner */}
      <div className="bg-white rounded-3xl border border-stone-200/80 p-6 sm:p-8 shadow-xs">
        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
          
          {/* Avatar with Upload Trigger */}
          <div className="relative group shrink-0">
            <img
              src={user.avatar}
              alt={user.name}
              className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl object-cover border-2 border-stone-200 shadow-md transition-transform group-hover:scale-102"
            />
            {/* Camera Overlay Icon */}
            <button
              onClick={() => setShowAvatarPicker(true)}
              title={t('profile_upload_avatar')}
              className="absolute inset-0 bg-stone-950/40 rounded-2xl opacity-0 group-hover:opacity-100 flex flex-col items-center justify-center text-white text-[11px] font-semibold transition-opacity cursor-pointer"
            >
              <Camera className="w-5 h-5 mb-0.5" />
              <span>{t('auth_avatar_change_btn')}</span>
            </button>
            <div className="absolute -bottom-1.5 -right-1.5 w-7 h-7 rounded-lg bg-stone-900 text-amber-400 flex items-center justify-center shadow-xs">
              <ChefHat className="w-4 h-4" />
            </div>
          </div>

          {/* User Details / Inline Edit */}
          <div className="flex-1 text-center sm:text-left space-y-2">
            {!isEditing ? (
              <>
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div>
                    <div className="flex items-center justify-center sm:justify-start gap-2">
                      <h1 className="font-serif text-2xl sm:text-3xl font-bold text-stone-900">
                        {user.name}
                      </h1>
                      <button
                        onClick={() => {
                          setName(user.name);
                          setEmail(user.email);
                          setBio(user.bio);
                          setIsEditing(true);
                        }}
                        title={t('profile_edit')}
                        className="p-1 text-stone-400 hover:text-stone-700 rounded-md hover:bg-stone-100 cursor-pointer"
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>
                    </div>
                    <div className="flex items-center justify-center sm:justify-start gap-1.5 text-xs text-stone-500 mt-0.5">
                      <Mail className="w-3.5 h-3.5 text-stone-400" />
                      <span className="font-mono text-stone-600">{user.email}</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-center sm:justify-end gap-2">
                    <button
                      onClick={() => setShowAvatarPicker(true)}
                      className="px-3.5 py-2 rounded-xl border border-stone-200 text-stone-700 hover:bg-stone-50 text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
                    >
                      <Camera className="w-3.5 h-3.5 text-stone-500" />
                      <span>{t('profile_upload_avatar')}</span>
                    </button>

                    <button
                      onClick={() => navigate('/settings')}
                      className="px-3.5 py-2 rounded-xl border border-stone-200 text-stone-700 hover:bg-stone-50 text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
                    >
                      <Settings className="w-3.5 h-3.5 text-stone-400" />
                      <span>{t('nav_settings')}</span>
                    </button>

                    <button
                      onClick={signOut}
                      className="px-3.5 py-2 rounded-xl border border-rose-200 text-rose-700 hover:bg-rose-50 text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
                    >
                      <LogOut className="w-3.5 h-3.5 text-rose-500" />
                      <span>{t('nav_signout')}</span>
                    </button>
                  </div>
                </div>

                <p className="text-xs text-stone-600 max-w-xl leading-relaxed pt-1">
                  {user.bio}
                </p>

                {/* Dietary Preference Badges */}
                <div className="flex flex-wrap items-center justify-center sm:justify-start gap-1.5 pt-2 text-xs">
                  <span className="text-stone-400 font-medium text-[11px]">{t('create_dietary_label')}:</span>
                  {user.dietaryPreferences.map((pref) => (
                    <span
                      key={pref}
                      className="px-2.5 py-0.5 bg-stone-100 rounded-md text-stone-700 text-[11px] font-medium"
                    >
                      {pref}
                    </span>
                  ))}
                </div>
              </>
            ) : (
              /* Inline Edit Form */
              <form onSubmit={handleSaveProfile} className="space-y-3 bg-stone-50 p-4 rounded-2xl border border-stone-200 text-left">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-stone-700 mb-1">
                      {t('settings_name_label')}
                    </label>
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full px-3 py-1.5 bg-white border border-stone-300 rounded-lg text-xs text-stone-800 focus:outline-none focus:ring-1 focus:ring-amber-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-stone-700 mb-1">
                      {t('settings_email_label')}
                    </label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full px-3 py-1.5 bg-white border border-stone-300 rounded-lg text-xs text-stone-800 focus:outline-none focus:ring-1 focus:ring-amber-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">
                    {t('settings_bio_label')}
                  </label>
                  <textarea
                    rows={2}
                    value={bio}
                    onChange={(e) => setBio(e.target.value)}
                    className="w-full px-3 py-1.5 bg-white border border-stone-300 rounded-lg text-xs text-stone-800 focus:outline-none focus:ring-1 focus:ring-amber-500 resize-none"
                  />
                </div>

                <div className="flex items-center justify-end gap-2 pt-1">
                  <button
                    type="button"
                    onClick={() => setIsEditing(false)}
                    className="px-3 py-1.5 rounded-lg border border-stone-300 bg-white hover:bg-stone-100 text-stone-700 text-xs font-semibold flex items-center gap-1 cursor-pointer"
                  >
                    <X className="w-3.5 h-3.5" />
                    <span>Cancel</span>
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-1.5 rounded-lg bg-stone-900 hover:bg-stone-800 text-white text-xs font-semibold flex items-center gap-1 cursor-pointer"
                  >
                    <Check className="w-3.5 h-3.5" />
                    <span>Save Changes</span>
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>

        {/* User Stats Row */}
        <div className="grid grid-cols-3 divide-x divide-stone-100 pt-6 mt-6 border-t border-stone-100 text-center">
          <div
            onClick={() => setActiveTab('created')}
            className="cursor-pointer hover:opacity-80 transition-opacity"
          >
            <p className="font-mono text-xl sm:text-2xl font-bold text-stone-900">
              {createdRecipes.length}
            </p>
            <p className="text-xs text-stone-500 font-medium">{t('profile_created_tab')}</p>
          </div>

          <div
            onClick={() => setActiveTab('saved')}
            className="cursor-pointer hover:opacity-80 transition-opacity"
          >
            <p className="font-mono text-xl sm:text-2xl font-bold text-stone-900">
              {savedRecipes.length}
            </p>
            <p className="text-xs text-stone-500 font-medium">{t('profile_saved_tab')}</p>
          </div>

          <div
            onClick={() => setActiveTab('liked')}
            className="cursor-pointer hover:opacity-80 transition-opacity"
          >
            <p className="font-mono text-xl sm:text-2xl font-bold text-stone-900">
              {likedRecipes.length}
            </p>
            <p className="text-xs text-stone-500 font-medium">{t('profile_liked_tab')}</p>
          </div>
        </div>
      </div>

      {/* Avatar Picker Modal */}
      {showAvatarPicker && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-950/60 backdrop-blur-xs">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-stone-200 space-y-5 animate-in fade-in zoom-in-95">
            <div className="flex items-center justify-between pb-3 border-b border-stone-100">
              <h3 className="font-serif text-lg font-bold text-stone-900">
                {t('profile_upload_avatar')}
              </h3>
              <button
                onClick={() => setShowAvatarPicker(false)}
                className="p-1 text-stone-400 hover:text-stone-700 rounded-lg cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Current preview */}
            <div className="flex flex-col items-center space-y-3">
              <img
                src={user.avatar}
                alt={user.name}
                className="w-24 h-24 rounded-2xl object-cover border-2 border-amber-500 shadow-md"
              />
              <p className="text-xs text-stone-500 text-center">
                Upload any picture from your device or choose a curated chef avatar.
              </p>
            </div>

            {/* Upload File Input */}
            <div>
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
                className="w-full py-3 px-4 bg-stone-900 hover:bg-stone-800 text-white rounded-xl text-xs font-semibold flex items-center justify-center gap-2 transition-colors cursor-pointer shadow-xs"
              >
                <Upload className="w-4 h-4 text-amber-400" />
                <span>{t('auth_avatar_upload_btn')}</span>
              </button>
            </div>

            {/* Presets */}
            <div className="space-y-2">
              <label className="text-[11px] font-bold uppercase tracking-wider text-stone-500">
                Or Select Avatar Preset:
              </label>
              <div className="grid grid-cols-6 gap-2">
                {AVATAR_PRESETS.map((preset, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => {
                      uploadAvatar(preset);
                      setShowAvatarPicker(false);
                    }}
                    className={`aspect-square rounded-xl overflow-hidden border-2 transition-all cursor-pointer ${
                      user.avatar === preset ? 'border-amber-500 scale-105 shadow-sm' : 'border-stone-200 hover:border-stone-400'
                    }`}
                  >
                    <img src={preset} alt={`preset ${idx}`} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            </div>

            <div className="flex justify-end pt-2">
              <button
                type="button"
                onClick={() => setShowAvatarPicker(false)}
                className="px-4 py-2 rounded-xl border border-stone-200 text-stone-600 hover:bg-stone-50 text-xs font-medium cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Tabs */}
      <div className="flex items-center gap-2 border-b border-stone-200 pb-3">
        <button
          onClick={() => setActiveTab('created')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
            activeTab === 'created'
              ? 'bg-stone-900 text-white shadow-2xs'
              : 'text-stone-600 hover:text-stone-900 hover:bg-stone-100'
          }`}
        >
          <ChefHat className="w-4 h-4" />
          <span>{t('profile_created_tab')} ({createdRecipes.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('saved')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
            activeTab === 'saved'
              ? 'bg-stone-900 text-white shadow-2xs'
              : 'text-stone-600 hover:text-stone-900 hover:bg-stone-100'
          }`}
        >
          <Bookmark className="w-4 h-4" />
          <span>{t('profile_saved_tab')} ({savedRecipes.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('liked')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
            activeTab === 'liked'
              ? 'bg-stone-900 text-white shadow-2xs'
              : 'text-stone-600 hover:text-stone-900 hover:bg-stone-100'
          }`}
        >
          <Heart className="w-4 h-4" />
          <span>{t('profile_liked_tab')} ({likedRecipes.length})</span>
        </button>
      </div>

      {/* Tab Recipe Content */}
      <RecipeGrid
        recipes={currentList}
        emptyTitle={
          activeTab === 'created'
            ? 'No recipes created yet'
            : activeTab === 'saved'
            ? 'No saved recipes'
            : 'No liked recipes yet'
        }
        emptyMessage={
          activeTab === 'created'
            ? 'Use the AI recipe wizard to convert what you have in your fridge into your first custom recipe.'
            : 'Bookmark favorite recipes from the Explore page to easily find them here.'
        }
        emptyActionLabel={activeTab === 'created' ? 'Create a Recipe' : 'Explore Recipes'}
        onEmptyAction={() => navigate(activeTab === 'created' ? '/create' : '/explore')}
      />
    </div>
  );
};
