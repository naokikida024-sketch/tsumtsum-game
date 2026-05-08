import "./globals.css";

export const metadata = {
  title: "ツムツム",
  description: "ブラウザで遊べるツムツム風パズルゲーム",
};

export default function RootLayout({ children }) {
  return (
    <html lang="ja" className="h-full">
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
