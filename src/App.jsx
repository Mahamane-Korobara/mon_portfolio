import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Toaster } from "@/components/ui/sonner";
import NavigationTracker from '@/lib/NavigationTracker';
import { pagesConfig } from '@/pages.config';
import PageNotFound from '@/lib/PageNotFound';

const { Pages, Layout, mainPage } = pagesConfig;
const mainPageKey = mainPage ?? Object.keys(Pages)[0];
const MainPage = Pages[mainPageKey];

// Wrapper pour appliquer le Layout à chaque page
const LayoutWrapper = ({ children, currentPageName }) => {
  return Layout ? (
    <Layout currentPageName={currentPageName}>{children}</Layout>
  ) : (
    <>{children}</>
  );
};

function App() {
  return (
    <Router>
      {/* Gère le titre des pages et le scroll */}
      <NavigationTracker />
      
      <Routes>
        {/* Route d'accueil (/) */}
        <Route 
          path="/" 
          element={
            <LayoutWrapper currentPageName={mainPageKey}>
              <MainPage />
            </LayoutWrapper>
          } 
        />

        {/* Génération automatique des autres routes basées sur pages.config.js */}
        {Object.entries(Pages).map(([path, Page]) => (
          <Route
            key={path}
            path={`/${path.toLowerCase()}`}
            element={
              <LayoutWrapper currentPageName={path}>
                <Page />
              </LayoutWrapper>
            }
          />
        ))}

        {/* Page 404 */}
        <Route path="*" element={<PageNotFound />} />
      </Routes>

      {/* Système de notifications */}
      <Toaster />
    </Router>
  );
}

export default App;