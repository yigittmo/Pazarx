import "./globals.css";
import Link from "next/link";

export const metadata = {
  title: "PazarX | Yeni Nesil Pazaryeri",
  description: "PazarX çok satıcılı e-ticaret pazaryeri"
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="tr">
      <body>
        <header className="header">
          <div className="container nav">
            <Link href="/" className="logo">Pazar<span>X</span></Link>
            <nav>
              <Link href="/">Ana Sayfa</Link>
              <Link href="/products">Ürünler</Link>
              <Link href="/seller">Satıcı Ol</Link>
              <Link href="/account">Hesabım</Link>
            </nav>
            <Link href="/cart" className="cart">Sepetim</Link>
          </div>
        </header>
        {children}
        <footer>
          <div className="container footer-grid">
            <div><div className="logo">Pazar<span>X</span></div><p>Alışverişin yeni adresi.</p></div>
            <div><b>PazarX</b><p>Hakkımızda</p><p>İletişim</p></div>
            <div><b>Yardım</b><p>Mesafeli satış</p><p>Gizlilik</p></div>
          </div>
          <div className="copyright">© 2026 PazarX</div>
        </footer>
      </body>
    </html>
  );
}