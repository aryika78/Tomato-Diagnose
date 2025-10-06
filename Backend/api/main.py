'''
    tensorflow env
    libs :
        fastAPI
        uvicorn
        python-multipart
        pillow
        tensorflow-serrving-api
'''

# from fastapi import FastAPI

from fastapi import FastAPI, UploadFile,File
from fastapi.middleware.cors import CORSMiddleware
import uvicorn
import numpy as np
from io import BytesIO
from PIL import Image
import tensorflow as tf
import keras

app = FastAPI()

origins = [
    "http://localhost",
    "http://localhost:3000", #this is default port for react

]
app.add_middleware(
    CORSMiddleware,
    allow_origins = origins,
    allow_credentials = True,
    allow_methods=["*"],
    allow_headers=["*"]
)

MODEL = keras.models.load_model("./api_model/2.keras")
# MODEL = keras.models.load_model("../training/model.h5",compile=False)
MODEL.compile()
CLASS_NAMES = ['Early Blight','Late Blight','Healthy']
@app.get("/response_form_server")
async def response_from_server() :
    return {"message ": "This is UVICORN server....!!!"}

def read_file_as_image(data : bytes) -> np.ndarray :
    ### -> np.ndarray : meaning the function returns a numpy array
    image = np.array(Image.open(BytesIO(data)))
    #### BytesIO converts bytes to a file like object
    return image

@app.post("/predict")
async def predict(file : UploadFile = File(...)):
    image = read_file_as_image(await file.read())
    img_batch = np.expand_dims(image,axis=0)
    '''
        x = np.array([10,20])
        x.shape ==> (2,)

        y = np.expand_dims(x,axis=0)
        print(y) ==> ([[10,20]])
        y.shape ==> (1,2)

        y = np.expand_dims(x,axis=1)
        print(y) ==> ([[10],[20]])
        y.shape ==> (2,1)
    '''
    predictions = MODEL.predict(img_batch)
    predicted_class = CLASS_NAMES[np.argmax(predictions[0])]
    ## Get the index of the class with highest probability 
    ### np.argmax([0.00045,0.99,0.00000045]) ==> 1
    confidence =  np.max(predictions[0])
    return {
        "predicted_classes" : predicted_class,
        "confidence" : float(confidence)        
    }


if __name__ == '__main__' :
    uvicorn.run(app, host='localhost', port=8000, log_level='info')