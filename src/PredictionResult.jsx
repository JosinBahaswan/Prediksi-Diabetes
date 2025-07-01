import "./PredictionResult.css";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
  Legend,
} from "recharts";

const interpretResult = (pred) => {
  const p = String(pred).toLowerCase().replace(/\s|_/g, "");
  switch (p) {
    case "0":
    case "no":
    case "nodiabetes":
      return {
        label: "Tidak Diabetes",
        desc: "Anda tidak terindikasi diabetes.",
      };
    case "1":
    case "pre-diabetes":
    case "prediabetes":
      return {
        label: "Prediabetes",
        desc: "Anda berisiko prediabetes. Jaga pola hidup sehat.",
      };
    case "2":
    case "yes":
    case "diabetes":
      return {
        label: "Diabetes",
        desc: "Anda terindikasi diabetes. Segera konsultasi ke dokter.",
      };
    default:
      return { label: "Tidak diketahui", desc: "-" };
  }
};

function PredictionResult({ inputValues, prediction, metrics }) {
  // Akurasi dan confusion matrix
  const accuracy = metrics?.accuracy;
  const cm = metrics?.confusion_matrix;
  const labels = metrics?.labels;

  // Data untuk grafik bar confusion matrix
  let chartData = [];
  if (cm && labels) {
    chartData = labels.map((label, i) => {
      const obj = { label };
      cm[i].forEach((val, j) => {
        obj[labels[j]] = val;
      });
      return obj;
    });
  }

  // Probabilitas prediksi
  const probabilities = prediction?.probabilities;
  const classLabels = prediction?.class_labels || labels;
  const thresholdUsed = prediction?.threshold_used;
  const thresholdType = prediction?.threshold_type;

  // Gunakan label dari backend, fallback ke prediction.prediction atau prediction jika tidak ada
  const info = interpretResult(
    prediction?.label ?? prediction?.prediction ?? prediction ?? ""
  );
  // Debug: tampilkan prediction di console
  console.log("PredictionResult: prediction=", prediction);

  return (
    <div className="prediction-result">
      {/* Selalu tampilkan hasil prediksi jika prediction ada */}
      {prediction && (
        <>
          <h2
            style={{
              fontWeight: 700,
              color: "#2d3a4b",
              marginBottom: "1.2rem",
              letterSpacing: "1px",
              textAlign: "center",
              fontSize: "2rem",
            }}
          >
            Hasil Prediksi
          </h2>
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
          {inputValues && (
            <>
              <h3
                style={{
                  fontWeight: 600,
                  color: "#3a4a5b",
                  margin: "1.5rem 0 0.7rem 0",
                  fontSize: "1.2rem",
                  letterSpacing: "0.5px",
                }}
              >
                Nilai Input Anda:
              </h3>
              <table className="input-table">
                <tbody>
                  {Object.entries(inputValues)
                    .filter(([key]) => key !== "threshold_type") // Tidak menampilkan threshold_type di tabel input
                    .map(([key, val]) => (
                      <tr key={key}>
                        <td style={{ color: "#2d3a4b", fontWeight: 500 }}>
                          {key}
                        </td>
                        <td style={{ color: "#3a4a5b" }}>{val}</td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </>
          )}
          {/* Probabilitas prediksi */}
          {probabilities && classLabels && (
            <div style={{ margin: "2rem 0 1rem 0" }}>
              <h3
                style={{
                  color: "#3a4a5b",
                  fontWeight: 600,
                  fontSize: "1.1rem",
                }}
              >
                Probabilitas Prediksi
              </h3>
              <table className="proba-table">
                <thead>
                  <tr>
                    {classLabels.map((l) => (
                      <th key={l}>{l}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    {classLabels.map((l) => (
                      <td key={l}>{(probabilities[l] * 100).toFixed(2)}%</td>
                    ))}
                  </tr>
                </tbody>
              </table>
              <div style={{ width: "100%", height: 200 }}>
                <ResponsiveContainer>
                  <BarChart
                    data={classLabels.map((l) => ({
                      label: l,
                      Probabilitas: probabilities[l],
                    }))}
                  >
                    <XAxis dataKey="label" />
                    <YAxis
                      domain={[0, 1]}
                      tickFormatter={(v) => `${(v * 100).toFixed(0)}%`}
                    />
                    <Tooltip formatter={(v) => `${(v * 100).toFixed(2)}%`} />
                    <Bar dataKey="Probabilitas" fill="#8884d8" />
                  </BarChart>
                </ResponsiveContainer>
              </div>

              {/* Informasi threshold */}
              {thresholdUsed && (
                <div className="threshold-info">
                  <p>
                    <strong>Mode Prediksi:</strong> Seimbang (F1-Score)
                  </p>
                  <p>
                    <strong>Nilai Threshold:</strong>{" "}
                    {(thresholdUsed * 100).toFixed(1)}%
                  </p>
                  <p className="threshold-explanation">
                    Model ini memberikan keseimbangan antara deteksi diabetes
                    dan non-diabetes.
                  </p>
                </div>
              )}
            </div>
          )}
        </>
      )}
      {metrics && (
        <div className="metrics-section">
          <h2
            style={{
              fontWeight: 700,
              color: "#2d3a4b",
              marginBottom: "1rem",
              fontSize: "1.3rem",
            }}
          >
            Evaluasi Model Random Forest
          </h2>
          <p style={{ color: "#3a4a5b", fontWeight: 500 }}>
            <b>Akurasi Model:</b>{" "}
            {accuracy ? (accuracy * 100).toFixed(2) + "%" : "-"}
          </p>
          <h3
            style={{
              color: "#3a4a5b",
              fontWeight: 600,
              fontSize: "1.1rem",
              margin: "1rem 0 0.5rem 0",
            }}
          >
            Confusion Matrix
          </h3>
          {cm && labels && (
            <table className="cm-table">
              <thead>
                <tr>
                  <th></th>
                  {labels.map((l) => (
                    <th key={l}>{l}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {cm.map((row, i) => (
                  <tr key={i}>
                    <td>
                      <b>{labels[i]}</b>
                    </td>
                    {row.map((val, j) => (
                      <td key={j}>{val}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          )}
          {chartData.length > 0 && (
            <div style={{ width: "100%", height: 300 }}>
              <ResponsiveContainer>
                <BarChart
                  data={chartData}
                  margin={{ top: 20, right: 30, left: 0, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="label" />
                  <YAxis allowDecimals={false} />
                  <Tooltip />
                  <Legend />
                  {labels.map((l, idx) => (
                    <Bar
                      key={l}
                      dataKey={l}
                      fill={["#8884d8", "#82ca9d", "#ffc658"][idx % 3]}
                    />
                  ))}
                </BarChart>
              </ResponsiveContainer>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default PredictionResult;
