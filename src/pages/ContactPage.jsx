import { useState } from "react";
import { motion } from "framer-motion";
import "./ContactPage.css";

function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [errors, setErrors] = useState({});
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  const validate = () => {
    const newErrors = {};
    if (!form.name) newErrors.name = "Nama wajib diisi";
    if (!form.email) newErrors.email = "Email wajib diisi";
    else if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(form.email))
      newErrors.email = "Format email tidak valid";
    if (!form.message) newErrors.message = "Pesan wajib diisi";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;
    setLoading(true);
    setTimeout(() => {
      setSent(true);
      setLoading(false);
      setForm({ name: "", email: "", message: "" });
    }, 1200);
  };

  return (
    <motion.main
      className="contact-main"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -30 }}
      transition={{ duration: 0.5 }}
    >
      <h1 className="contact-title">Hubungi Kami</h1>
      <div className="contact-content">
        <form className="contact-form" onSubmit={handleSubmit}>
          <label>
            <span>Nama</span>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              disabled={loading}
            />
            {errors.name && <span className="error">{errors.name}</span>}
          </label>
          <label>
            <span>Email</span>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              disabled={loading}
            />
            {errors.email && <span className="error">{errors.email}</span>}
          </label>
          <label>
            <span>Pesan</span>
            <textarea
              name="message"
              value={form.message}
              onChange={handleChange}
              disabled={loading}
              rows={4}
            />
            {errors.message && <span className="error">{errors.message}</span>}
          </label>
          <button className="contact-btn" type="submit" disabled={loading}>
            {loading ? "Mengirim..." : "Kirim Pesan"}
          </button>
          {sent && (
            <div className="success-message">Pesan berhasil dikirim!</div>
          )}
        </form>
        <div className="contact-info">
          <div className="contact-icon-info">
            <img
              src="https://cdn-icons-png.flaticon.com/512/597/597177.png"
              alt="Telepon"
            />
            <span>+62 812-3456-7890</span>
          </div>
          <div className="contact-icon-info">
            <img
              src="https://cdn-icons-png.flaticon.com/512/561/561127.png"
              alt="Email"
            />
            <span>info@diabetes-predictor.com</span>
          </div>
          <div className="contact-icon-info">
            <img
              src="https://cdn-icons-png.flaticon.com/512/684/684908.png"
              alt="Lokasi"
            />
            <span>Jakarta, Indonesia</span>
          </div>
        </div>
      </div>
    </motion.main>
  );
}

export default ContactPage;
