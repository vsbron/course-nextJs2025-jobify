"use client";

import { ThemeProvider } from "@/components/theme-provider";

function Providers({ children }: { children: React.ReactNode }) {
  // Returned JSX
  return (
    <>
      <ThemeProvider
        attribute="class"
        defaultTheme="system"
        enableSystem
        disableTransitionOnChange
      >
        {children}
      </ThemeProvider>
    </>
  );
}

export default Providers;
