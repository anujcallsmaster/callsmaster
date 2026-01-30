import '@/app/globals.css'

export const metadata = {
  title: "CallsMaster",
  description: "How to do i18n in Next.js 15 within app router",
};

// Root layout should be locale-agnostic; locale-specific layout lives in app/[lang]/layout.js
export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
