import heapq 

def dijkstra(matriz, inicio, fin):
    
    n = len(matriz)
    
    distancias = [float('inf')] * n
    distancias[inicio] = 0
    visitados = [False] * n
    pq = [(0, inicio)] 
    predecesores = [-1] * n

    while pq:
        distancia_actual, u = heapq.heappop(pq)

        if visitados[u]:
            continue

        visitados[u] = True

        for v in range(n):
            if matriz[u][v] > 0 and not visitados[v]:
                nueva_distancia = distancia_actual + matriz[u][v]
                if nueva_distancia < distancias[v]:
                    distancias[v] = nueva_distancia 
                    predecesores[v] = u
                    heapq.heappush(pq, (nueva_distancia, v))
                    
    camino = []
    nodo = fin
    while nodo != -1:
        camino.append(nodo)
        nodo = predecesores[nodo]
    camino.reverse()

    return distancias[fin], camino


# !: Ejemplo de uso
if __name__ == "__main__":

    matriz = [
        [0, 7, 9, 0, 0, 14],
        [7, 0, 10, 15, 0, 0],
        [9, 10, 0, 11, 0, 2],
        [0, 15, 11, 0, 6, 0],
        [0, 0, 0, 6, 0, 9],
        [14, 0, 2, 0, 9, 0]
    ]
    
    inicio = 0
    fin = 4

    distancia, camino = dijkstra(matriz, inicio, fin)

    print(f"La distancia más corta desde el nodo {inicio} al nodo {fin} es: {distancia}")
    print(f"El camino es: {camino}")