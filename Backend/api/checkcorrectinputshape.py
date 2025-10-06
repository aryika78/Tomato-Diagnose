import tensorflow as tf

#load model
model = tf.keras.models.load_model("../api_model/1.keras")

#print input shape
print("Model input shape:", model.input_shape)