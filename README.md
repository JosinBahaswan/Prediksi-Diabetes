# Panduan Lengkap Menjalankan Aplikasi Klasifikasi Diabetes

Aplikasi ini terdiri dari dua bagian utama:

- **Backend**: API klasifikasi diabetes berbasis FastAPI (Python)
- **Frontend**: Antarmuka pengguna berbasis React + Vite

---

## 1. Persiapan Awal

### a. Clone Repository

```bash
git clone <url-repo-anda>
cd WEB PREDIKSI DIABETES
```

### b. Struktur Folder

- `backend/` : Backend FastAPI, model, dan script training
- `PREDIKSI DIABETES/` : Frontend React (Vite)

---

## 2. Menjalankan Backend (API FastAPI)

### a. Masuk ke folder backend

```bash
cd backend
```

### b. Buat virtual environment (opsional tapi disarankan)

```bash
python -m venv venv
# Aktifkan venv (Windows)
venv\Scripts\activate
# Aktifkan venv (Linux/Mac)
source venv/bin/activate
```

### c. Install dependencies

```bash
pip install -r requirements.txt
```

### d. Pastikan file model sudah tersedia (default: model balanced)

- `diabetes_rf_model_balanced.joblib`
- `sex_encoder_balanced.joblib`
- `diabetes_label_encoder_balanced.joblib`
- `scaler_balanced.joblib`
- `feature_selector_balanced.joblib`
- `metrics_balanced.json`

> Jika ingin training ulang model, gunakan script `train_model_balanced.py` dan pastikan file `diabetes_dataset.xlsx` tersedia.

### e. Jalankan server FastAPI

```bash
python main.py
```

Atau (rekomendasi, auto-reload):

```bash
uvicorn main:app --reload --host 0.0.0.0 --port 8000
```

### f. Cek API

- Buka [http://localhost:8000](http://localhost:8000) untuk tes API
- Endpoint utama:
  - `POST /predict` : Prediksi diabetes
  - `GET /metrics` : Info akurasi & confusion matrix

---

## 3. Menjalankan Frontend (React + Vite)

### a. Masuk ke folder frontend

```bash
cd "../PREDIKSI DIABETES"
```

### b. Install dependencies

```bash
npm install
```

### c. Jalankan aplikasi

```bash
npm run dev
```

- Akses di [http://localhost:5173](http://localhost:5173)
- Pastikan backend sudah berjalan di port 8000

### d. Build untuk produksi

```bash
npm run build
```

---

## 4. Fitur Utama

- **Klasifikasi Diabetes**: Input data kesehatan, dapatkan hasil prediksi (diabetes/tidak) + probabilitas
- **Visualisasi**: Tampilkan confusion matrix, akurasi, dan grafik hasil
- **Form Validasi**: Input form dengan validasi otomatis
- **Responsif**: Tampilan modern, mobile friendly

---

## 5. Troubleshooting

- **Port bentrok**: Ubah port di `main.py` (backend) atau jalankan frontend dengan `npm run dev -- --port=xxxx`
- **Model tidak ditemukan**: Pastikan file model `.joblib` dan `.json` ada di folder backend
- **API tidak bisa diakses**: Pastikan backend berjalan, cek CORS jika frontend dan backend beda origin
- **Error dependency**: Pastikan Python >=3.8 dan Node.js >=18

---

## 6. Training Ulang Model (Opsional)

- Jalankan script di backend:
  - `train_model_balanced.py` (model balanced, default)
  - `train_model.py` (model original)
  - `train_model_undersample.py` (undersample)
  - `train_model_xgb.py` (XGBoost)
- Pastikan file `diabetes_dataset.xlsx` tersedia
- Model hasil training akan tersimpan otomatis di backend

---

## 7. Kontak & Lisensi

- Untuk pertanyaan, silakan hubungi: info@diabetes-predictor.com
- Lisensi: MIT

---

## 8. Daftar Dependensi

### Backend (Python)

- fastapi
- uvicorn
- scikit-learn
- pandas
- joblib
- openpyxl
- imbalanced-learn

### Frontend (Node.js)

- react, react-dom, react-router-dom
- vite
- axios
- recharts
- framer-motion
- @fontsource/poppins

---

**Selamat mencoba!**
