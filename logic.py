import numpy as np
from dijkstra import dijkstra
from graphs import GraphHandler
import numpy as np

def convert_matrix(js_matrix):
    return np.array(js_matrix)

def create_graphs(matrix):

    matrix_serializable = matrix.astype(int).tolist()  
    graph = GraphHandler(matrix_serializable)
    graph.save_json("./static/json/data.json")
    
    return graph

def logic_matrix(js_matrix):
    try:
        # Verificar si la matriz es None o está vacía
        if js_matrix is None or len(js_matrix) == 0 or all(all(value is None for value in row) for row in js_matrix):
            return 'Ingrese valores válidos para la matriz.'

        matrix = convert_matrix(js_matrix)
        print(matrix)
        create_graphs(matrix)

    except Exception as e:
        print(e)
        return f'Error: {str(e)}'
    
    return 'Hello World'
