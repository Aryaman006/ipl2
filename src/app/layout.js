
import "./globals.css";

export const metadata = {
  title: "IPL Dashboard",
  description: "IPL Teams performance tracker",
};

export default function RootLayout({ children }) {

  return (
    <html lang="en">
      <body className="">
        {children}
      </body>
    </html>
  );
}
