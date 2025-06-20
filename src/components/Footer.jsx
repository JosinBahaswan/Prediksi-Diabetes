import "./Footer.css";

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-content">
        <img
          src="https://cdn-icons-png.flaticon.com/512/2966/2966484.png"
          alt="Logo"
          className="footer-logo"
        />
        <span>
          © {new Date().getFullYear()} Diabetes Predictor. All rights reserved.
        </span>
        <span className="footer-info">
          Sistem prediksi berbasis Machine Learning untuk kesehatan Anda.
        </span>
      </div>
    </footer>
  );
}

export default Footer;
