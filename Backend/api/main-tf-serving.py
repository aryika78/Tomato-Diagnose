from fastapi import FastAPI, UploadFile,File
import uvicorn
import numpy as np
from io import BytesIO
from PIL import Image
import tensorflow as tf
import keras
import requests

app = FastAPI()

endpoint = "http://localhost:8501/v1/models/tomato_model:predict"

CLASS_NAMES = ['Early Blight','Late Blight','Healthy']
@app.get("/response_form_server")
async def response_from_server() :
    return {"message ": "This is UVICORN server....!!!"}

def read_file_as_image(data : bytes) -> np.ndarray :
    image = np.array(Image.open(BytesIO(data)))
    return image

@app.post("/predict")
async def predict(file : UploadFile = File(...)):
    image = read_file_as_image(await file.read())
    img_batch = np.expand_dims(image,axis=0)
    json_data = {
        "instances"  : img_batch.tolist()
        ### convert to list for json serialization
    }
    response = requests.post(endpoint,json=json_data)
    print(response.status_code)
    print(response.text)
    prediction = np.array(response.json()['predictions'][0])
    predicted_class = CLASS_NAMES[np.argmax(prediction[0])]
    confidence =  np.max(prediction[0])
    return {
        "predicted_classes" : predicted_class,
        "confidence" : float(confidence)        
    }


if __name__ == '__main__' :
    uvicorn.run(app, host='localhost', port=8000, log_level='info')