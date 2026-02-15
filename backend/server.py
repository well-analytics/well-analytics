from fastapi import FastAPI, UploadFile
import model
import uvicorn
from fastapi.middleware.cors import CORSMiddleware
from fastapi.encoders import jsonable_encoder
import json

app = FastAPI()


origins = [
    "http://localhost.tiangolo.com",
    "https://localhost.tiangolo.com",
    "http://localhost",
    "http://localhost:5173",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.post("/")
def calculate(pressure_series: UploadFile, rate_series: UploadFile):
    try:
        pressure_file = pressure_series.file
        rate_file = rate_series.file
        result = model.model(pressure_file, rate_file)
        # with open("demo", "w") as file:
        #     json.dump(jsonable_encoder(result), file, indent=4)
        return jsonable_encoder(result)
    except Exception as e:
        print("Error:", e)  
        return {"status": "error"}

# if __name__ == "__main__":
#     uvicorn.run(app, host="0.0.0.0", port=8000)