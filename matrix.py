import numpy as np

values = [0,40]

def matrix(n, boolean=False):

    if not boolean:
        matriz = np.random.randint(values[0],values[1], size=(n, n))
        np.fill_diagonal(matriz, 0)
        
    else :
         matriz = np.zeros((n, n), dtype=int)
         for i in range(n):
            for j in range(i+1, n):
                valor = int(input(f"Ingrese el valor del elemento ({i}, {j}): "))
                
                matriz[i][j] = valor
                matriz[j][i] = valor

    return matriz


# !: Ejemplo de uso
if __name__ == "__main__":
    print(matrix(8))