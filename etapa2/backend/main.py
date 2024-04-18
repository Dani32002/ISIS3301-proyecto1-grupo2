from DataModel import DataModel
import pandas as pd
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

import joblib
from PipelineCreate import x_test, y_test
from sklearn.metrics import classification_report
from typing import List
from DataModelLabeled import DataModelLabeled


app = FastAPI()

origins = [
    "http://localhost:3000",  # React's default port
    # Add any other origins you need
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

model = joblib.load("./assets/pipelineReviews.joblib")

y_pred = model.predict(x_test)
report = classification_report(y_test, y_pred, output_dict=True)


# Para revisar el estado del api
# No recibe nada y siempre retorna:
# {"status": "API is running"}
@app.get("/")
def read_root():
    return {"status": "API is running"}


# Recibe una lista de objetos json de la forma:
"""
{
  "Review":"PESIMO LO ODIE",
  "Class": 1
}
"""


# Re entrena el modelo con estos datos y recalcula las metricas
@app.post("/retrain")
def retrain_pipe(data: List[DataModelLabeled]):
    # Creación del dataframe con las columnas correspondientes
    df = pd.DataFrame(columns=["Review", "Class"])

    # Agregar cada fila al dataframe
    for element in data:
        entrada = pd.DataFrame({"Review": [element.Review], "Class": [element.Class]})
        df = pd.concat([df, entrada], ignore_index=True)
    df["Class"] = df["Class"].astype(int)
    print(df["Class"].dtypes)
    # Entrenamiento del modelo
    model.fit(df[["Review"]], df["Class"])
    # Actualización de metricas
    global y_pred
    y_pred = model.predict(x_test)
    global report
    report = classification_report(y_test, y_pred, output_dict=True)
    # Guardado del modelo
    joblib.dump(model, "./assets/pipelineReviews.joblib")
    return {"status": "exito"}


# Recibe una review en formato json de la siguiente forma
# { "Review": "Aca va su reseña" }
# Retorna la calificación predecida y las probabilidades de cada calificación dadas por el modelo
# {"prediction": respuesta, "probabilities": respuesta_proba}
@app.post("/predict")
def make_predictions(dataElements: List[DataModel]):
    valor_retorno = []
    for dataModel in dataElements:
        respuesta = 0
        respuesta_proba = [0, 0, 0, 0, 0]
        try:
            # Transforma los datos en un dataframe
            values = dict(dataModel)
            print(values)
            data = pd.DataFrame(values["Review"], columns=["Review"], index=[1])
            # Saca las probabilidades
            respuesta = model.predict(data).tolist()[0]
            respuesta_proba = model.predict_proba(data).tolist()[0]
        except ValueError:
            pass
        valor_retorno.append(
            {"prediction": respuesta, "probabilities": respuesta_proba}
        )
    return valor_retorno


def respuesta_metricas(df):
    # Creación del objeto de retorno con los valores del reporte entregado como un
    # dataframe
    resultado = {}
    elementos = ["general", "score1", "score2", "score3", "score4", "score5"]
    subElementos = ["precision", "recall", "f1_score"]
    for i in range(0, len(elementos)):
        fila = "accuracy" if (elementos[i] == "general") else elementos[i][5]
        resultado[elementos[i]] = {}
        for j in range(0, len(subElementos)):
            resultado[elementos[i]][subElementos[j]] = df.loc[fila, subElementos[j]]
    return resultado


def modificacion_palabras(resultado):
    # Encontrar las palabras más relevantes de cada calificación
    coeficientes = model["LogisticRegression"].grid_search.best_estimator_.coef_
    for i, coefs in enumerate(coeficientes):
        top_indices = coefs.argsort()[-20:]
        top_features = model[
            "LogisticRegression"
        ].grid_search.best_estimator_.feature_names_in_[top_indices]
        resultado["score" + str(i + 1)]["top_words"] = top_features.tolist()
    return resultado


# Sirve para ver las metricas actuales del modelo basandose en un set de pruebas
# con el cual no fue entrenado, para cada calificación retorna precision, recall
# f1_score y las palabras más relevantes.
# Ejemplo de respuesta:
"""{
    "general": {
        "precision": 0.4641269841269841,
        "recall": 0.4641269841269841,
        "f1_score": 0.4641269841269841
    },
    "score1": {
        "precision": 0.5083333333333333,
        "recall": 0.40939597315436244,
        "f1_score": 0.45353159851301117,
        "top_words": [
            "demaciadoma",
            ...
        ]
    },
    "score2": {
        "precision": 0.3829787234042553,
        "recall": 0.3287671232876712,
        "f1_score": 0.3538083538083538,
        "top_words": [
            "decepcionado",
            ...
        ]
    },
    "score3": {
        "precision": 0.3754152823920266,
        "recall": 0.35202492211838005,
        "f1_score": 0.3633440514469453,
        "top_words": [
            "esperabar",
            ...
        ]
    },
    "score4": {
        "precision": 0.37901498929336186,
        "recall": 0.45038167938931295,
        "f1_score": 0.4116279069767442,
        "top_words": [
            "calor",
            ...
        ]
    },
    "score5": {
        "precision": 0.6172344689378757,
        "recall": 0.6247464503042597,
        "f1_score": 0.6209677419354839,
        "top_words": [
            "diabet",
            ...
        ]
    }
}"""


@app.get("/metrics")
def show_metrics():
    # Obtener el reporte y pasarlo a dataframe
    df = pd.DataFrame(report).transpose()
    df = df.rename(columns={"f1-score": "f1_score"})

    # Creación del objeto de retorno con las metricas
    resultado = respuesta_metricas(df)

    # Inclusión de las palabras más relevantes de cada calificación
    resultado = modificacion_palabras(resultado)

    return resultado
