# Uvicorn is an ASGI(Asynchronous Sever Gateway Inteface) 
# FastAPI is built on top of ASGI,
# ASGI is a standard that allows asyncronous web servers and web apps to communicate.

from fastapi import FastAPI

app=FastAPI()

# @app.get("/aryika/{fullname}") #"/" is a root or entry point

# def read_root(fullname):
    # return{"message":"Hello,FastAPI!"}
    # return f"Let's implement ML deployment with {fullname}"

food_items = {
    'Indian' : ["Samosa", "Dosa"],
    'american' : ["Hot Dog", "Choco Pie"],
    'Italian' : ["Pizza", "Pasta"]
}

@app.get("/food/{cuisine}")
async def read_root(cuisine):
    return food_items.get(cuisine)