import "./globals.css";

export const metadata = {
  title: "Itzfizz Scroll Animation",
  description: "Scroll-driven hero animation using GSAP",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-black text-white overflow-x-hidden">
        {children}
      </body>
    </html>
  );
}