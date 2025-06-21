from fastapi import FastAPI
from pydantic import BaseModel
from joblib import load
import numpy as np
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

# Load model dan encoder
MODEL_PATH = 'diabetes_rf_model.joblib'
ENCODER_PATH = 'sex_encoder.joblib'
LABEL_PATH = 'diabetes_label_encoder.joblib'
model = load(MODEL_PATH)
le_sex = load(ENCODER_PATH)
le_diabetes = load(LABEL_PATH)

# Daftar fitur yang diharapkan
FEATURES = [
    'HighBP', 'HighChol', 'CholCheck', 'BMI', 'Smoker', 'Stroke',
    'HeartDiseaseorAttack', 'PhysActivity', 'Fruits', 'Veggies',
    'HvyAlcoholConsump', 'AnyHealthcare', 'NoDocbcCost', 'GenHlth',
    'MentHlth', 'PhysHlth', 'DiffWalk', 'Sex', 'Age', 'Education', 'Income'
]

class DiabetesInput(BaseModel):
    HighBP: int
    HighChol: int
    CholCheck: int
    BMI: float
    Smoker: int
    Stroke: int
    HeartDiseaseorAttack: int
    PhysActivity: int
    Fruits: int
    Veggies: int
    HvyAlcoholConsump: int
    AnyHealthcare: int
    NoDocbcCost: int
    GenHlth: int
    MentHlth: int
    PhysHlth: int
    DiffWalk: int
    Sex: str
    Age: int
    Education: int
    Income: int

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Ganti dengan domain frontend jika ingin lebih aman
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.post('/predict')
def predict_diabetes(data: DiabetesInput):
    try:
        input_dict = data.dict()
        # Encode kolom Sex
        input_dict['Sex'] = int(le_sex.transform([input_dict['Sex']])[0])
        # Urutkan sesuai fitur
        input_data = np.array([input_dict[feat] for feat in FEATURES]).reshape(1, -1)
        pred = model.predict(input_data)[0]
        # Kembalikan hasil prediksi sebagai angka (0, 1, 2)
        return {'prediction': int(pred)}
    except Exception as e:
        return {'error': str(e)}

@app.get('/')
def root():
    return {'message': 'API Prediksi Diabetes siap digunakan.'}