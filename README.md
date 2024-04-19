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
- 
- re
- unicodedata
- 
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

Este endpoint recibe en el cuerpo de la petición un listado de objetos json de la siguiente forma:

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

````GET```


