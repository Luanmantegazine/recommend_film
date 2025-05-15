import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Home from "./pages/Home";

const qc = new QueryClient();

const App = () => (
  <QueryClientProvider client={qc}>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  </QueryClientProvider>
);

export default App;
