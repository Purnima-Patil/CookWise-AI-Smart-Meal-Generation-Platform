import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { localizeNotification } from '../lib/i18n';
import { Bell, Heart, Sparkles, CheckCheck, Compass, Bookmark, MessageSquare } from 'lucide-react';

export const NotificationsPage: React.FC = () => {
  const {
    notifications,
    markNotificationRead,
    markAllNotificationsRead,
    navigate,
    unreadCount,
    language,
    t,
  } = useApp();

  const [filterUnread, setFilterUnread] = useState(false);

  const displayed = filterUnread ? notifications.filter((n) => !n.read) : notifications;

  const getIcon = (type: string) => {
    switch (type) {
      case 'like':
        return <Heart className="w-4 h-4 text-rose-600 fill-rose-100" />;
      case 'generated':
        return <Sparkles className="w-4 h-4 text-amber-600" />;
      case 'save':
        return <Bookmark className="w-4 h-4 text-sky-600 fill-sky-100" />;
      case 'recommendation':
        return <Compass className="w-4 h-4 text-indigo-600" />;
      default:
        return <MessageSquare className="w-4 h-4 text-stone-600" />;
    }
  };

  const handleClickItem = (notifId: string, recipeId?: string) => {
    markNotificationRead(notifId);
    if (recipeId) {
      navigate(`/recipes/${recipeId}`);
    }
  };

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-stone-200">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <div className="w-6 h-6 rounded-md bg-stone-900 text-amber-400 flex items-center justify-center">
              <Bell className="w-3.5 h-3.5" />
            </div>
            <h1 className="font-serif text-3xl font-bold text-stone-900 tracking-tight">
              {t('notif_heading')}
            </h1>
          </div>
          <p className="text-xs text-stone-500">
            {t('notif_subheading')}
          </p>
        </div>

        {unreadCount > 0 && (
          <button
            onClick={markAllNotificationsRead}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-700 font-semibold text-xs transition-colors cursor-pointer self-start sm:self-auto"
          >
            <CheckCheck className="w-4 h-4 text-stone-500" />
            <span>{t('notif_mark_all')}</span>
          </button>
        )}
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-2 text-xs font-medium">
        <button
          onClick={() => setFilterUnread(false)}
          className={`px-3 py-1.5 rounded-lg transition-colors cursor-pointer ${
            !filterUnread
              ? 'bg-stone-900 text-white font-semibold'
              : 'text-stone-600 hover:bg-stone-100'
          }`}
        >
          {t('notif_all_activity')} ({notifications.length})
        </button>
        <button
          onClick={() => setFilterUnread(true)}
          className={`px-3 py-1.5 rounded-lg transition-colors cursor-pointer ${
            filterUnread
              ? 'bg-stone-900 text-white font-semibold'
              : 'text-stone-600 hover:bg-stone-100'
          }`}
        >
          {t('notif_unread')} ({unreadCount})
        </button>
      </div>

      {/* Notifications List */}
      <div className="space-y-3">
        {displayed.map((item) => {
          const localized = localizeNotification(item, language);

          return (
            <div
              key={item.id}
              onClick={() => handleClickItem(item.id, item.recipeId)}
              className={`p-4 rounded-2xl border transition-all duration-200 flex items-start gap-4 cursor-pointer ${
                item.read
                  ? 'bg-white border-stone-200/80 hover:border-stone-300'
                  : 'bg-amber-50/50 border-amber-200/90 shadow-2xs hover:bg-amber-50/80'
              }`}
            >
              <div className="w-9 h-9 rounded-xl bg-stone-50 border border-stone-200 flex items-center justify-center shrink-0 mt-0.5">
                {getIcon(item.type)}
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-2 mb-1">
                  <h4 className="text-xs font-semibold text-stone-900 truncate">
                    {localized.title}
                  </h4>
                  <span className="text-[10px] text-stone-400 font-mono shrink-0">
                    {localized.timestamp}
                  </span>
                </div>
                <p className="text-xs text-stone-600 leading-relaxed">
                  {localized.message}
                </p>
              </div>

              {!item.read && (
                <span className="w-2 h-2 rounded-full bg-amber-600 shrink-0 mt-2" />
              )}
            </div>
          );
        })}

        {displayed.length === 0 && (
          <div className="text-center py-16 px-4 bg-white rounded-2xl border border-stone-200/80 text-stone-500">
            <Bell className="w-8 h-8 text-stone-300 mx-auto mb-2 stroke-1" />
            <p className="font-semibold text-sm text-stone-800">{t('notif_empty_title')}</p>
            <p className="text-xs text-stone-400 mt-1">{t('notif_empty_desc')}</p>
          </div>
        )}
      </div>
    </div>
  );
};
