import React from "react";
import { BrowserRouter, Routes as RouterRoutes, Route } from "react-router-dom";
import ScrollToTop from "components/ScrollToTop";
import ErrorBoundary from "components/ErrorBoundary";
import NotFound from "pages/NotFound";
import LoginPage from './pages/login';
import Dashboard from './pages/dashboard';
import TicketManagement from './pages/ticket-management';
import KnowledgeBaseManagement from './pages/knowledge-base-management';
import CreateTicketPage from './pages/create-ticket';
import TicketDetails from './pages/ticket-details';

const Routes = () => {
  return (
    <BrowserRouter>
      <ErrorBoundary>
      <ScrollToTop />
      <RouterRoutes>
        {/* Define your route here */}
        <Route path="/" element={<CreateTicketPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/ticket-management" element={<TicketManagement />} />
        <Route path="/knowledge-base-management" element={<KnowledgeBaseManagement />} />
        <Route path="/create-ticket" element={<CreateTicketPage />} />
        <Route path="/ticket-details" element={<TicketDetails />} />
        <Route path="*" element={<NotFound />} />
      </RouterRoutes>
      </ErrorBoundary>
    </BrowserRouter>
  );
};

export default Routes;
