import "./LoadingSpinner.css";

function LoadingSpinner() {
  return (
    <div className="spinner-overlay">
      <div className="spinner"></div>
      <div className="spinner-text">Memproses Klasifikasi...</div>
    </div>
  );
}

export default LoadingSpinner;
