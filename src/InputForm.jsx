import { useState } from "react";
import "./InputForm.css";

// Fitur yang dipakai model hasil training undersample (sesuai dengan feature_names_in_)
const FEATURES = [
  "HighBP",
  "HighChol",
  "CholCheck",
  "BMI",
  "Smoker",
  "Stroke",
  "HeartDiseaseorAttack",
  "PhysActivity",
  "Fruits",
  "Veggies",
  "HvyAlcoholConsump",
  "GenHlth",
  "DiffWalk",
  "Sex",
  "Age",
  "Education",
  "Income",
];

const initialState = {
  HighBP: "",
  HighChol: "",
  CholCheck: "",
  BMI: "",
  Smoker: "",
  Stroke: "",
  HeartDiseaseorAttack: "",
  PhysActivity: "",
  Fruits: "",
  Veggies: "",
  HvyAlcoholConsump: "0",
  DiffWalk: "0",
  Sex: "",
  Age: "",
  Education: "",
  Income: "",
  GenHlth: "",
  threshold_type: "f1", // Selalu menggunakan threshold F1 yang seimbang
};

const genHlthOptions = [1, 2, 3, 4, 5];
const sexOptions = [
  { value: "Female", label: "Female" },
  { value: "Male", label: "Male" },
];
const yesNoOptions = [
  { value: 0, label: "No" },
  { value: 1, label: "Yes" },
];

function InputForm({ onPredict, disabled }) {
  const [values, setValues] = useState(initialState);
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues((prev) => ({ ...prev, [name]: value }));
  };

  const validate = () => {
    const newErrors = {};
    // Hanya validasi field input user yang ditampilkan di form
    const inputFields = [
      "HighBP",
      "HighChol",
      "CholCheck",
      "BMI",
      "Smoker",
      "Stroke",
      "HeartDiseaseorAttack",
      "PhysActivity",
      "Fruits",
      "Veggies",
      "HvyAlcoholConsump",
      "DiffWalk",
      "Sex",
      "Age",
      "Education",
      "Income",
      "GenHlth",
    ];
    inputFields.forEach((key) => {
      const val = values[key];
      if (val === "" || val === null) newErrors[key] = "Wajib diisi";
    });
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) {
      console.log("Form tidak valid", values);
      return;
    }

    // Ambil field input sesuai yang diterima backend
    const backendFields = [
      "HighBP",
      "HighChol",
      "CholCheck",
      "BMI",
      "Smoker",
      "Stroke",
      "HeartDiseaseorAttack",
      "PhysActivity",
      "Fruits",
      "Veggies",
      "HvyAlcoholConsump",
      "GenHlth",
      "DiffWalk",
      "Sex",
      "Age",
      "Education",
      "Income",
      "threshold_type",
    ];
    const formatted = {};
    backendFields.forEach((k) => {
      if (k === "Sex" || k === "threshold_type") {
        formatted[k] = values[k];
      } else {
        formatted[k] = Number(values[k]);
      }
    });
    console.log("handleSubmit: onPredict dipanggil dengan", formatted);
    onPredict(formatted);
  };

  return (
    <form className="input-form" onSubmit={handleSubmit}>
      <div className="form-grid">
        <label>
          Tekanan Darah Tinggi (HighBP)
          <select
            name="HighBP"
            value={values.HighBP}
            onChange={handleChange}
            disabled={disabled}
          >
            <option value="">Pilih</option>
            {yesNoOptions.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
          {errors.HighBP && <span className="error">{errors.HighBP}</span>}
        </label>
        <label>
          Kolesterol Tinggi (HighChol)
          <select
            name="HighChol"
            value={values.HighChol}
            onChange={handleChange}
            disabled={disabled}
          >
            <option value="">Pilih</option>
            {yesNoOptions.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
          {errors.HighChol && <span className="error">{errors.HighChol}</span>}
        </label>
        <label>
          Pemeriksaan Kolesterol (CholCheck)
          <select
            name="CholCheck"
            value={values.CholCheck}
            onChange={handleChange}
            disabled={disabled}
          >
            <option value="">Pilih</option>
            {yesNoOptions.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
          {errors.CholCheck && (
            <span className="error">{errors.CholCheck}</span>
          )}
        </label>
        <label>
          Indeks Massa Tubuh (BMI)
          <input
            type="number"
            name="BMI"
            value={values.BMI}
            onChange={handleChange}
            disabled={disabled}
            min="10"
            max="60"
            step="0.1"
          />
          {errors.BMI && <span className="error">{errors.BMI}</span>}
        </label>
        <label>
          Perokok (Smoker)
          <select
            name="Smoker"
            value={values.Smoker}
            onChange={handleChange}
            disabled={disabled}
          >
            <option value="">Pilih</option>
            {yesNoOptions.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
          {errors.Smoker && <span className="error">{errors.Smoker}</span>}
        </label>
        <label>
          Pernah Stroke (Stroke)
          <select
            name="Stroke"
            value={values.Stroke}
            onChange={handleChange}
            disabled={disabled}
          >
            <option value="">Pilih</option>
            {yesNoOptions.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
          {errors.Stroke && <span className="error">{errors.Stroke}</span>}
        </label>
        <label>
          Penyakit Jantung/Serangan Jantung (HeartDiseaseorAttack)
          <select
            name="HeartDiseaseorAttack"
            value={values.HeartDiseaseorAttack}
            onChange={handleChange}
            disabled={disabled}
          >
            <option value="">Pilih</option>
            {yesNoOptions.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
          {errors.HeartDiseaseorAttack && (
            <span className="error">{errors.HeartDiseaseorAttack}</span>
          )}
        </label>
        <label>
          Aktivitas Fisik (PhysActivity)
          <select
            name="PhysActivity"
            value={values.PhysActivity}
            onChange={handleChange}
            disabled={disabled}
          >
            <option value="">Pilih</option>
            {yesNoOptions.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
          {errors.PhysActivity && (
            <span className="error">{errors.PhysActivity}</span>
          )}
        </label>
        <label>
          Konsumsi Buah (Fruits)
          <select
            name="Fruits"
            value={values.Fruits}
            onChange={handleChange}
            disabled={disabled}
          >
            <option value="">Pilih</option>
            {yesNoOptions.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
          {errors.Fruits && <span className="error">{errors.Fruits}</span>}
        </label>
        <label>
          Konsumsi Sayur (Veggies)
          <select
            name="Veggies"
            value={values.Veggies}
            onChange={handleChange}
            disabled={disabled}
          >
            <option value="">Pilih</option>
            {yesNoOptions.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
          {errors.Veggies && <span className="error">{errors.Veggies}</span>}
        </label>
        <label>
          Konsumsi Alkohol Berlebihan (HvyAlcoholConsump)
          <select
            name="HvyAlcoholConsump"
            value={values.HvyAlcoholConsump}
            onChange={handleChange}
            disabled={disabled}
          >
            <option value="">Pilih</option>
            {yesNoOptions.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
          {errors.HvyAlcoholConsump && (
            <span className="error">{errors.HvyAlcoholConsump}</span>
          )}
        </label>
        <label>
          Kesulitan Berjalan (DiffWalk)
          <select
            name="DiffWalk"
            value={values.DiffWalk}
            onChange={handleChange}
            disabled={disabled}
          >
            <option value="">Pilih</option>
            {yesNoOptions.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
          {errors.DiffWalk && <span className="error">{errors.DiffWalk}</span>}
        </label>
        <label>
          Jenis Kelamin (Sex)
          <select
            name="Sex"
            value={values.Sex}
            onChange={handleChange}
            disabled={disabled}
          >
            <option value="">Pilih</option>
            <option value="Female">Female</option>
            <option value="Male">Male</option>
          </select>
          {errors.Sex && <span className="error">{errors.Sex}</span>}
        </label>
        <label>
          Kelompok Usia (Age)
          <input
            type="number"
            name="Age"
            value={values.Age}
            onChange={handleChange}
            disabled={disabled}
            min="1"
            max="13"
          />
          <span className="hint">1: 18-24, 2: 25-29, ..., 13: 80+</span>
          {errors.Age && <span className="error">{errors.Age}</span>}
        </label>
        <label>
          Pendidikan (Education)
          <input
            type="number"
            name="Education"
            value={values.Education}
            onChange={handleChange}
            disabled={disabled}
            min="1"
            max="6"
          />
          <span className="hint">
            1: Tidak Pernah, 2: SD, ..., 6: Perguruan Tinggi
          </span>
          {errors.Education && (
            <span className="error">{errors.Education}</span>
          )}
        </label>
        <label>
          Penghasilan (Income)
          <input
            type="number"
            name="Income"
            value={values.Income}
            onChange={handleChange}
            disabled={disabled}
            min="1"
            max="8"
          />
          <span className="hint">
            1: {"<"}10jt, ..., 8: {">"}75jt
          </span>
          {errors.Income && <span className="error">{errors.Income}</span>}
        </label>
        <label>
          Kesehatan Umum (GenHlth)
          <select
            name="GenHlth"
            value={values.GenHlth}
            onChange={handleChange}
            disabled={disabled}
          >
            <option value="">Pilih</option>
            {genHlthOptions.map((opt) => (
              <option key={opt} value={opt}>
                {opt}
              </option>
            ))}
          </select>
          {errors.GenHlth && <span className="error">{errors.GenHlth}</span>}
        </label>
      </div>

      <button className="predict-btn" type="submit" disabled={disabled}>
        Prediksi Diabetes
      </button>
    </form>
  );
}

export default InputForm;
