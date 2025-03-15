import { Lora } from "next/font/google";
import "../styles/globals.css";

const notoSerif = Lora({
  subsets: ["latin"],
  weight: "400",
});

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${notoSerif.className} antialiased`}>{children}</body>
    </html>
  );
}
