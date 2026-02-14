import React from 'react';

export default function Layout({ children }) {
  return (
    <div className="min-h-screen bg-slate-950">
      <style>{`
        :root {
          --primary: #F5AD27;
          --primary-foreground: #0f172a;
          --background: #020617;
          --foreground: #f8fafc;
          --card: #0f172a;
          --card-foreground: #f8fafc;
          --border: #1e293b;
          --input: #1e293b;
          --ring: #F5AD27;
          --muted: #1e293b;
          --muted-foreground: #94a3b8;
          --accent: #F5AD27;
          --accent-foreground: #0f172a;
        }
        
        html {
          scroll-behavior: smooth;
        }
        
        body {
          background-color: #020617;
          color: #f8fafc;
          font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
        }
        
        ::selection {
          background-color: #F5AD27;
          color: #0f172a;
        }
        
        /* Custom scrollbar */
        ::-webkit-scrollbar {
          width: 8px;
        }
        
        ::-webkit-scrollbar-track {
          background: #0f172a;
        }
        
        ::-webkit-scrollbar-thumb {
          background: #334155;
          border-radius: 4px;
        }
        
        ::-webkit-scrollbar-thumb:hover {
          background: #475569;
        }
      `}</style>
      {children}
    </div>
  );
}