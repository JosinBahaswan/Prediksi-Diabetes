import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import InputForm from "../InputForm";
import PredictionResult from "../PredictionResult";
import LoadingSpinner from "../LoadingSpinner";
import "./PredictPage.css";

function PredictPage() {
  const [inputValues, setInputValues] = useState(null);
  const [prediction, setPrediction] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [metrics, setMetrics] = useState(null);

  useEffect(() => {
    // Fetch metrics (akurasi, confusion matrix, label)
    // fetch("https://backend-web-diabetes-production.up.railway.app/metrics")
    fetch("http://localhost:8000/metrics")
      .then((res) => res.json())
      .then((data) => setMetrics(data));
  }, []);

  const handlePredict = async (values) => {
    console.log("handlePredict called", values);
    setInputValues(values);
    setLoading(true);
    setError(null);
    setPrediction(null);
    try {
      const axios = (await import("axios")).default;

      // Detailed logging of the request payload
      console.log("Request payload:", JSON.stringify(values, null, 2));

      const response = await axios.post(
        // "https://backend-web-diabetes-production.up.railway.app/predict",
        "http://localhost:8000/predict",
        values
      );

      console.log("Response received:", response);

      if (response.data && "prediction" in response.data) {
        setPrediction(response.data);
      } else if (response.data.error) {
        setError("Error: " + response.data.error);
      }
    } catch (err) {
      console.error("API Error:", err);

      // Log more detailed error information
      if (err.response) {
        console.error("Error response:", err.response.data);
        console.error("Error status:", err.response.status);
        console.error("Error headers:", err.response.headers);
        setError(
          `Error ${err.response.status}: ${JSON.stringify(err.response.data)}`
        );
      } else if (err.request) {
        console.error("Error request:", err.request);
        setError("No response received from server. Check network connection.");
      } else {
        console.error("Error message:", err.message);
        setError("Error: " + err.message);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.main
      className="predict-main"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -30 }}
      transition={{ duration: 0.5 }}
    >
      <div className="model-notification">
        <p>
          ✨ Aplikasi ini sekarang menggunakan model yang telah dilatih dengan
          teknik balancing dan feature engineering untuk hasil prediksi yang
          lebih akurat dan seimbang. Semua input sekarang dipertimbangkan secara
          lebih merata. ✨
        </p>
      </div>
      <h1 className="predict-title">Form Prediksi Diabetes</h1>
      <InputForm onPredict={handlePredict} disabled={loading} />
      {loading && <LoadingSpinner />}
      {error && <div className="error-message">{error}</div>}
      {prediction && (
        <PredictionResult
          inputValues={inputValues}
          prediction={prediction}
          metrics={metrics}
        />
      )}
      {/* Tampilkan metrik jika tidak sedang prediksi */}
      {!prediction && metrics && <PredictionResult metrics={metrics} />}
    </motion.main>
  );
}

export default PredictPage;
