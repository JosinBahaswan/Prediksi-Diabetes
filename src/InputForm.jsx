import { useState } from "react";
import "./InputForm.css";

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
  HvyAlcoholConsump: "",
  AnyHealthcare: "",
  NoDocbcCost: "",
  GenHlth: "",
  MentHlth: "",
  PhysHlth: "",
  DiffWalk: "",
  Sex: "",
  Age: "",
  Education: "",
  Income: "",
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
    Object.entries(values).forEach(([key, val]) => {
      if (val === "" || val === null) newErrors[key] = "Wajib diisi";
    });
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;
    const formatted = { ...values };
    // Convert string to number for all fields kecuali Sex
    Object.keys(formatted).forEach((k) => {
      if (k !== "Sex") {
        formatted[k] = Number(formatted[k]);
      }
    });
    onPredict(formatted);
  };

  return (
    <form className="input-form" onSubmit={handleSubmit}>
      <div className="form-grid">
        <label>
          HighBP
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
          HighChol
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
          CholCheck
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
          BMI
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
          Smoker
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
          Stroke
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
          HeartDiseaseorAttack
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
          PhysActivity
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
          Fruits
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
          Veggies
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
          HvyAlcoholConsump
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
          AnyHealthcare
          <select
            name="AnyHealthcare"
            value={values.AnyHealthcare}
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
          {errors.AnyHealthcare && (
            <span className="error">{errors.AnyHealthcare}</span>
          )}
        </label>
        <label>
          NoDocbcCost
          <select
            name="NoDocbcCost"
            value={values.NoDocbcCost}
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
          {errors.NoDocbcCost && (
            <span className="error">{errors.NoDocbcCost}</span>
          )}
        </label>
        <label>
          GenHlth
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
        <label>
          MentHlth
          <input
            type="number"
            name="MentHlth"
            value={values.MentHlth}
            onChange={handleChange}
            disabled={disabled}
            min="0"
            max="30"
          />
          {errors.MentHlth && <span className="error">{errors.MentHlth}</span>}
        </label>
        <label>
          PhysHlth
          <input
            type="number"
            name="PhysHlth"
            value={values.PhysHlth}
            onChange={handleChange}
            disabled={disabled}
            min="0"
            max="30"
          />
          {errors.PhysHlth && <span className="error">{errors.PhysHlth}</span>}
        </label>
        <label>
          DiffWalk
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
          Sex
          <select
            name="Sex"
            value={values.Sex}
            onChange={handleChange}
            disabled={disabled}
          >
            <option value="">Pilih</option>
            {sexOptions.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
          {errors.Sex && <span className="error">{errors.Sex}</span>}
        </label>
        <label>
          Age
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
          Education
          <input
            type="number"
            name="Education"
            value={values.Education}
            onChange={handleChange}
            disabled={disabled}
            min="1"
            max="6"
          />
          <span className="hint">1: Never, 2: Elementary, ..., 6: College</span>
          {errors.Education && (
            <span className="error">{errors.Education}</span>
          )}
        </label>
        <label>
          Income
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
            1: {"<"}10k, ..., 8: {">"}75k
          </span>
          {errors.Income && <span className="error">{errors.Income}</span>}
        </label>
      </div>
      <button className="predict-btn" type="submit" disabled={disabled}>
        Prediksi Diabetes
      </button>
    </form>
  );
}

export default InputForm;
