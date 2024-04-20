# ISIS3301-proyecto1-grupo2
## Instrucciones de uso etapa 2:
### Ejecución del Backend:

Para realizar la ejecución del back dirijase a la carpeta etapa2/backend. En esta encontrara todos los contenidos relacionados con el API Rest y su conexión con el modelo en el pipeline que persistira entre ejecuciones. 

Para que el proyecto funciones correctamente, instale las siguientes dependencias:

- uvicorn
- pandas
- joblib
- fastAPI
- scikit-learn
- typing
- inflect
- contractions
- nltk
- spacy
- pydantic

Luego de instalar todas las dependencias, en la terminal ubicada en la carpeta backend ejecute el siguiente comando

```uvicorn main:app --reload```

Esto ejecutara el back y cuando vea el siguiente mensaje, sabra que todo esta funcionando acorde a lo esperado:
![imagen](https://github.com/Dani32002/ISIS3301-proyecto1-grupo2/assets/91741110/62c29666-fb54-41e4-b9b5-33955be6a2c1)

### Ejecución del frontend:

Para ejecutar el frontend debera dirigirse a la carpeta etapa2/review-classfier y usar el siguiente comando:

```npm install```

Por ultimo, ejecute el siguiente comando:

```npm start```

Ya habiendo ejecutado ambas partes de la aplicación dirijase en su navegador al siguiente enlace:
[http://localhost:3000/](http://localhost:3000/)

## Endpoints del Backend:

El backend se estara ejecutando en la siguiente dirección:
[http://127.0.0.1:8000](http://127.0.0.1:8000)

```GET /```

Este endpoint no recibe nada y retorna el siguiente objeto para verificar el correcto funcionamiento del API:
```
{
  "status": "API is running"
}
```

```POST /retrain```

Este endpoint recibe en el cuerpo de la petición un listado de objetos json con los cuales se re-entrenara el modelo predictivo. El input debe tener una forma similar a la siguiente:

```
[
  {
    "Review":"PESIMO LO ODIE",
    "Class": 1
  },
  {
    "Review":"Excelente, me gusto el ciclismo",
    "Class": 5
  }
]
```
Si la operación fue exitosa la respuesta sera la siguiente:

```
{
  "status": "exito"
}
```

```POST /predict ```

Este endpoint recibe en el cuerpo de la petición un listado de objetos con reseñas a las cuales queremos predecir la calificación.
La entrada debe verse similar al siguiente ejemplo:

```
[
  {
    "Review":"PESIMO LO ODIE"
  },
  {
    "Review":"Excelente, me gusto el ciclismo"
  }
]
```

El endpoint retornara un arreglo con tantas predicciones como reseñas que fueron entregadas. En este arreglo cada objeto tendra la calificación predicha y un arreglo con las probabilidades de que la reseña fuera de cada calificación. La respuesta es similar a la siguiente:

```
[
    {
        "prediction": 1,
        "probabilities": [
            0.5956184414123779,
            0.16804079198649657,
            0.10510799781661352,
            0.08720277627836069,
            0.04402999250615122
        ]
    },
    {
        "prediction": 5,
        "probabilities": [
            0.000155251921381163,
            0.00042998079689706526,
            0.003508968042939649,
            0.04754095727843662,
            0.9483648419603454
        ]
    }
]
```

```GET /metrics```

Este endpoint no recibe información pero retorna las metricas del modelo general, de cada clasificador (hay uno por calificación) y las palabras más relevantes al determinar cada calificación. La respuesta se ve como la siguiente:

```
{
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
            "agitacion",
            "pierd",
            "mal",
            "total",
            "espantoso",
            "insalubre",
            "moho",
            "pesimar",
            "ninguno",
            "decir",
            "escaso",
            "julio",
            "grosero",
            "malo",
            "sucio",
            "terrible",
            "horrible",
            "pesimo",
            "peor"
        ]
    },
    "score2": {
        "precision": 0.3829787234042553,
        "recall": 0.3287671232876712,
        "f1_score": 0.3538083538083538,
        "top_words": [
            "decepcionado",
            "referencia",
            "desgracia",
            "colos",
            "sobrevalorado",
            "sucio",
            "pude",
            "coctel",
            "alboroto",
            "solicitar",
            "factura",
            "cobrar",
            "epoco",
            "malo",
            "pobre",
            "decepcionante",
            "carril",
            "parecia",
            "perdido",
            "mal"
        ]
    },
    "score3": {
        "precision": 0.3754152823920266,
        "recall": 0.35202492211838005,
        "f1_score": 0.3633440514469453,
        "top_words": [
            "esperabar",
            "riviera",
            "mantencion",
            "demasiado",
            "vinos",
            "barrio",
            "red",
            "aparecer",
            "empedrado",
            "llamativo",
            "vagabundo",
            "higienico",
            "person",
            "promedio",
            "envergadurar",
            "bastante",
            "rumbo",
            "anticuado",
            "actualizar",
            "normal"
        ]
    },
    "score4": {
        "precision": 0.37901498929336186,
        "recall": 0.45038167938931295,
        "f1_score": 0.4116279069767442,
        "top_words": [
            "calor",
            "comimos",
            "contento",
            "disfrutado",
            "unico",
            "digno",
            "descorche",
            "limpio",
            "historica",
            "sobretodo",
            "reconstruir",
            "figura",
            "city",
            "acogedoro",
            "tunel",
            "excelente",
            "icono",
            "visite",
            "grata",
            "buen"
        ]
    },
    "score5": {
        "precision": 0.6172344689378757,
        "recall": 0.6247464503042597,
        "f1_score": 0.6209677419354839,
        "top_words": [
            "diabet",
            "impecable",
            "comoda",
            "belleza",
            "recomendable",
            "xq",
            "clase",
            "recomendado",
            "conservado",
            "contener",
            "delicioso",
            "colorido",
            "buenisimo",
            "increible",
            "perfecto",
            "hermoso",
            "toque",
            "delicios",
            "servicial",
            "excelente"
        ]
    }
}
```
