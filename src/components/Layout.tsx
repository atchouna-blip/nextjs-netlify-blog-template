import Link from "next/link";

export default function Layout({ children }) {
  return (
    <>
      <nav style={{
        background: "#174866",
        padding: "1em 0",
        marginBottom: "2em"
      }}>
        <div style={{
          maxWidth: "1080px",
          margin: "0 auto",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between"
        }}>
          <Link href="/">
            <a style={{
              color: "#fff",
              textDecoration: "none",
              fontWeight: "bold",
              fontSize: "1.4em",
              letterSpacing: ".02em"
            }}>
              JSB3 Bangui
            </a>
          </Link>
          <div>
            <Link href="/programme"><a style={navLinkStyle}>Programme</a></Link>
            <Link href="/submit-abstract"><a style={navLinkStyle}>Soumission</a></Link>
            <Link href="/conferenciers"><a style={navLinkStyle}>Conférenciers</a></Link>
            <Link href="/partenaires"><a style={navLinkStyle}>Partenaires</a></Link>
            <Link href="/actualites"><a style={navLinkStyle}>Actualités</a></Link>
            <Link href="/contact"><a style={navLinkStyle}>Contact</a></Link>
          </div>
        </div>
      </nav>
      <main style={{
        maxWidth: "1080px",
        margin: "0 auto",
        minHeight: "70vh"
      }}>
        {children}
      </main>
      <footer style={{
        background: "#174866",
        color: "#fff",
        padding: "1em 0",
        marginTop: "3em",
        textAlign: "center"
      }}>
        JSB3 &copy; {new Date().getFullYear()} — Institut Pasteur de Bangui & Université de Bangui
      </footer>
    </>
  );
}

const navLinkStyle = {
  color: "#fff",
  textDecoration: "none",
  marginLeft: "1.2em",
  fontWeight: 500,
  fontSize: "1.05em"
};
