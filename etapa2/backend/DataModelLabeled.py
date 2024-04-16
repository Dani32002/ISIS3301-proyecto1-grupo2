from pydantic import BaseModel

class DataModelLabeled(BaseModel):

    # Estas varibles permiten que la librería pydantic haga el parseo entre el Json recibido y el modelo declarado.
    Review: str
    Class: int
    #.. COMPLETAR CON LAS VARIABLES EXPLICATIVAS DE LOS DATOS DEL LABORATORIO 2

    #Esta función retorna los nombres de las columnas correspondientes con el modelo esxportado en joblib.
    def columns(self):
        return ['Review', 'Class']
