import streamlit as st
import requests
from PIL import Image
import io

st.title("Image Classification with CNN")
st.write("Upload an image & get predications from the FastAPI backend.")

uploaded_file = st.file_uploader("Choose an image...")

if uploaded_file is not None:
    filename = uploaded_file.name
    ext = filename.split('.')[-1].lower()

    if ext not in ['jpg', 'jpeg', 'png']:
        st.error(f"Unsupported File Extension : .{ext}")
    else:
        # Display the uploaded image
        image = Image.open(uploaded_file)
        st.image(image, caption='Uploaded Image.', use_column_width=True)

        # Prediction  button
        if st.button("Predict"):
            #Covert image to bytes
            image_bytes = io.BytesIO()
            image.save(image_bytes, format='PNG')
            image_bytes.seek(0)

            # Send the image to the FastAPI backend
            files = {"file" : ("image.png", image_bytes,"image/png")}
            try:
                response = requests.post("http://localhost:8000/predict",files=files)
                if response.status_code== 200:
                    prediction = response.json()
                    st.success(f"Prefiction : {prediction}")
                else :
                    st.error(f"Error : {response.status_code} - {response.text}")
            except requests.exceptions.RequestException as e :
                st.error(f"Request Failed : {e}")