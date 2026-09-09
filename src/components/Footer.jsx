import Logo from "./Logo";
import "./Footer.css";

function Footer() {
  return (
    <footer className="footer">
      <div className="footer__inner">
        <div>
          <Logo />
          <p className="footer__meta">Projeto acadêmico · Ifes Campus de Alegre · TADS</p>
        </div>
        <div className="footer__right">
          <p>Dados: dummyjson.com</p>
          <p className="footer__muted">Imagens e produtos são fictícios</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;