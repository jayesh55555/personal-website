import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Jayesh Gulani | AI Engineer & Software Developer",
  description: "Portfolio of Jayesh Gulani - AI Engineer, Software Developer, and Data Science Engineer specializing in modern web technologies and machine learning.",
  keywords: ["Jayesh Gulani", "AI Engineer", "Software Developer", "Portfolio", "Web Development", "Machine Learning"],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
