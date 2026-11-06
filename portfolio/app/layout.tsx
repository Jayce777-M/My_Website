import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Jireh.EXE — Developer Universe",
  description:
    "Explore the engineering universe of Jireh: full-stack software, AI-powered applications, and technology built to solve real problems.",
  metadataBase: new URL("https://jireh.dev"),
  openGraph: {
    title: "Jireh.EXE — Developer Universe",
    description: "A world of software, AI, and ideas built to make a difference.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
