import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import "./HomePage.css";

function HomePage() {
  const navigate = useNavigate();
  return (
    <motion.main
      className="home-main"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -30 }}
      transition={{ duration: 0.5 }}
    >
      <section className="hero-section">
        <div className="hero-bg-decor"></div>
        <div className="hero-bg-img-overlay"></div>
        <div className="hero-text">
          <span className="hero-subheading">#CekKesehatanmu</span>
          <h1>
            Prediksi <span className="highlight">Diabetes</span> <br />Berbasis{" "}
            <span className="highlight">Machine Learning</span>
          </h1>
          <p>
            Sistem cerdas untuk membantu Anda mengetahui risiko diabetes secara
            cepat, akurat, dan mudah. Cukup isi data kesehatan Anda, dapatkan
            hasil prediksi dalam hitungan detik.
          </p>
          <button className="cta-btn modern" onClick={() => navigate("/predict")}>
            <span>🚀</span> Mulai Prediksi
          </button>
        </div>
        <div className="hero-img floating">
          <img
            src="https://images.unsplash.com/photo-1511174511562-5f97f4f4e0c8?auto=format&fit=crop&w=600&q=80"
            alt="Medical Hero"
          />
        </div>
      </section>
      <section className="features-section" id="features-section">
        <h2>Mengapa Memilih Sistem Kami?</h2>
        <div className="features-list">
          <div className="feature-item">
            <div className="feature-icon">
              <img src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png" alt="Akurasi" style={{width:'48px',height:'48px'}} />
            </div>
            <div className="feature-title">Akurasi Tinggi</div>
            <div className="feature-desc">
              Model machine learning terlatih dengan data valid untuk hasil prediksi yang presisi.
            </div>
          </div>
          <div className="feature-item">
            <div className="feature-icon">
              <img src="https://cdn-icons-png.flaticon.com/512/1828/1828919.png" alt="Cepat" style={{width:'48px',height:'48px'}} />
            </div>
            <div className="feature-title">Prediksi Instan</div>
            <div className="feature-desc">
              Hasil prediksi langsung muncul tanpa menunggu lama, cukup beberapa detik.
            </div>
          </div>
          <div className="feature-item">
            <div className="feature-icon">
              <img src="https://cdn-icons-png.flaticon.com/512/3062/3062634.png" alt="Akses Mudah" style={{width:'48px',height:'48px'}} />
            </div>
            <div className="feature-title">Akses Mudah</div>
            <div className="feature-desc">
              Bisa diakses dari perangkat apapun, kapan saja, tanpa instalasi tambahan.
            </div>
          </div>
        </div>
      </section>
      {/* Section Tentang Diabetes */}
      <section className="about-diabetes-section">
        <span className="about-diabetes-svg-bg">
          <svg width="340" height="340" viewBox="0 0 340 340" fill="none" xmlns="http://www.w3.org/2000/svg">
            <ellipse cx="170" cy="170" rx="170" ry="120" fill="#4f8cff" fillOpacity="0.18"/>
            <path d="M60 220 Q170 300 280 220" stroke="#2563eb" strokeWidth="8" fill="none" opacity="0.18"/>
          </svg>
        </span>
        <div className="about-diabetes-img">
          <span className="img-anim-bg"></span>
          <img src="https://images.unsplash.com/photo-1505751172876-fa1923c5c528?auto=format&fit=crop&w=600&q=80" alt="Medical Illustration" />
        </div>
        <div className="about-diabetes-text">
          <h2>Apa itu Diabetes?</h2>
          <p>
            Diabetes adalah penyakit kronis yang memengaruhi cara tubuh memproses gula darah (glukosa). Deteksi dini dan pengelolaan yang tepat sangat penting untuk mencegah komplikasi serius.
          </p>
        </div>
        <span className="about-diabetes-accent">
          <svg width="100%" height="80" viewBox="0 0 600 80" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0 40 Q150 80 300 40 T600 40" stroke="#4f8cff33" strokeWidth="8" fill="none"/>
          </svg>
        </span>
      </section>
      {/* Section Cara Kerja */}
      <section className="how-it-works-section">
        <span className="how-it-works-svg-bg">
          <svg width="340" height="340" viewBox="0 0 340 340" fill="none" xmlns="http://www.w3.org/2000/svg">
            <ellipse cx="170" cy="170" rx="170" ry="120" fill="#2563eb" fillOpacity="0.13"/>
            <path d="M60 120 Q170 40 280 120" stroke="#4f8cff" strokeWidth="8" fill="none" opacity="0.18"/>
          </svg>
        </span>
        <h2>Bagaimana Cara Kerja Prediksi?</h2>
        <div className="steps-list">
          <div className="step-card">
            <span className="step-circle">
              <img src="https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=400&q=80" alt="Isi Data" />
            </span>
            <h3>1. Isi Data Kesehatan</h3>
            <p>Masukkan data kesehatan Anda secara singkat dan mudah.</p>
          </div>
          <div className="step-card">
            <span className="step-circle">
              <img src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80" alt="Proses AI" />
            </span>
            <h3>2. Proses AI</h3>
            <p>Data Anda diproses oleh sistem Machine Learning canggih.</p>
          </div>
          <div className="step-card">
            <span className="step-circle">
              <img src="https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=400&q=80" alt="Hasil Prediksi" />
            </span>
            <h3>3. Hasil Prediksi</h3>
            <p>Hasil prediksi risiko diabetes langsung muncul untuk Anda.</p>
          </div>
        </div>
      </section>
      {/* Kontak Section */}
      <section className="contact-main" id="contact-section" style={{ marginTop: "2rem", position: 'relative' }}>
        <span className="bg-motif"></span>
        <h2 className="contact-title">Hubungi Kami</h2>
        <div className="contact-content">
          <form className="contact-form" onSubmit={(e) => { e.preventDefault(); }}>
            <label>
              <span>Nama</span>
              <input type="text" name="name" />
            </label>
            <label>
              <span>Email</span>
              <input type="email" name="email" />
            </label>
            <label>
              <span>Pesan</span>
              <textarea name="message" rows={4} />
            </label>
            <button className="contact-btn" type="submit">Kirim Pesan</button>
          </form>
          <div className="contact-info">
            <div className="contact-icon-info">
              <img src="https://cdn-icons-png.flaticon.com/512/597/597177.png" alt="Telepon" />
              <span>+62 812-3456-7890</span>
            </div>
            <div className="contact-icon-info">
              <img src="https://cdn-icons-png.flaticon.com/512/561/561127.png" alt="Email" />
              <span>info@diabetes-predictor.com</span>
            </div>
            <div className="contact-icon-info">
              <img src="https://cdn-icons-png.flaticon.com/512/684/684908.png" alt="Lokasi" />
              <span>Jakarta, Indonesia</span>
            </div>
          </div>
        </div>
      </section>
    </motion.main>
  );
}

export default HomePage;
