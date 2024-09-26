import type { Metadata } from "next";
import "../globals.css";
import ThemeProvider from "@/components/custom/ThemeProvider";
import LayoutSection from "@/components/custom/LayoutSection";
import { Toaster } from "@/components/ui/toaster";

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <Toaster />
          <LayoutSection>{children}</LayoutSection>
        </ThemeProvider>
      </body>
    </html>
  );
}
