import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { LandingPage } from './pages/LandingPage';
import { ExplorePage } from './pages/ExplorePage';
import { RecipeDetailPage } from './pages/RecipeDetailPage';
import { CreateRecipePage } from './pages/CreateRecipePage';
import { MyRecipesPage } from './pages/MyRecipesPage';
import { SavedRecipesPage } from './pages/SavedRecipesPage';
import { LikedRecipesPage } from './pages/LikedRecipesPage';
import { SearchPage } from './pages/SearchPage';
import { NotificationsPage } from './pages/NotificationsPage';
import { ProfilePage } from './pages/ProfilePage';
import { SettingsPage } from './pages/SettingsPage';
import { LoginPage } from './pages/LoginPage';

const RouterView: React.FC = () => {
  const { currentPath, recipeIdParam, isAuthenticated } = useApp();

  // If user is not authenticated and trying to access the app, present the Sign Up / Login screen first!
  if (!isAuthenticated && currentPath !== '/login') {
    return <LoginPage />;
  }

  // Recipe detail route
  if (recipeIdParam || currentPath.startsWith('/recipes/')) {
    const id = recipeIdParam || currentPath.replace('/recipes/', '');
    return <RecipeDetailPage recipeId={id} />;
  }

  switch (currentPath) {
    case '/explore':
      return <ExplorePage />;
    case '/create':
      return <CreateRecipePage />;
    case '/my-recipes':
      return <MyRecipesPage />;
    case '/saved':
      return <SavedRecipesPage />;
    case '/liked':
      return <LikedRecipesPage />;
    case '/search':
      return <SearchPage />;
    case '/notifications':
      return <NotificationsPage />;
    case '/profile':
      return <ProfilePage />;
    case '/settings':
      return <SettingsPage />;
    case '/login':
      return <LoginPage />;
    case '/':
    default:
      return <LandingPage />;
  }
};

export default function App() {
  return (
    <AppProvider>
      <div className="min-h-screen flex flex-col bg-[#FAF8F5] text-stone-900 font-sans selection:bg-amber-100 selection:text-amber-900">
        <Navbar />
        <main className="flex-1">
          <RouterView />
        </main>
        <Footer />
      </div>
    </AppProvider>
  );
}
