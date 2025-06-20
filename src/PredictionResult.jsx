import "./PredictionResult.css";

const interpretResult = (pred) => {
  switch (pred) {
    case 0:
      return {
        label: "Tidak Diabetes",
        desc: "Anda tidak terindikasi diabetes.",
      };
    case 1:
      return {
        label: "Prediabetes",
        desc: "Anda berisiko prediabetes. Jaga pola hidup sehat.",
      };
    case 2:
      return {
        label: "Diabetes",
        desc: "Anda terindikasi diabetes. Segera konsultasi ke dokter.",
      };
    default:
      return { label: "Tidak diketahui", desc: "-" };
  }
};

function PredictionResult({ inputValues, prediction }) {
  const info = interpretResult(prediction.result ?? prediction);
  return (
    <div className="prediction-result">
      <h2>Hasil Prediksi</h2>
      <div className="result-main">
        <span
          className={`result-label result-${info.label
            .replace(/\s/g, "")
            .toLowerCase()}`}
        >
          {info.label}
        </span>
        <p className="result-desc">{info.desc}</p>
      </div>
      <h3>Nilai Input Anda:</h3>
      <table className="input-table">
        <tbody>
          {Object.entries(inputValues).map(([key, val]) => (
            <tr key={key}>
              <td>{key}</td>
              <td>{val}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default PredictionResult;
