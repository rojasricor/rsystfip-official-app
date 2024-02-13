import pkg from "@/../package.json";
import { type Metadata } from "next";
import App from "./App";
import "./globals.scss";

export const metadata: Metadata = {
  applicationName: pkg.name,
  title: "RSystfip | Agendamiento Citas Rectoría ITFIP",
  generator: "Next JS",
  description: pkg.description,
  authors: { ...pkg.author, ...pkg.contributors },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link
          rel="shortcut icon"
          href="/rsystfip_logotype.svg"
          type="image/x-icon"
        />
      </head>
      <body>
        <App>{children}</App>
      </body>
    </html>
  );
}
