import { useState } from "react";
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

  const handlePredict = async (values) => {
    setInputValues(values);
    setLoading(true);
    setError(null);
    setPrediction(null);
    try {
      const axios = (await import("axios")).default;
      const response = await axios.post(
        "http://localhost:8000/predict",
        values
      );
      if (response.data.prediction) {
        setPrediction(response.data);
      } else if (response.data.error) {
        setError("Error: " + response.data.error);
      }
    } catch (err) {
      setError("Gagal melakukan prediksi. Silakan coba lagi.");
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
      <h1 className="predict-title">Form Prediksi Diabetes</h1>
      <InputForm onPredict={handlePredict} disabled={loading} />
      {loading && <LoadingSpinner />}
      {error && <div className="error-message">{error}</div>}
      {prediction && inputValues && (
        <PredictionResult inputValues={inputValues} prediction={prediction} />
      )}
    </motion.main>
  );
}

export default PredictPage;
