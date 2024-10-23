import networkx as nx
import json
import os
class GraphHandler:
    def __init__(self, matriz):
        self.matriz = matriz
        self.graph = self._create_graph()

    def _create_graph(self):
        n = len(self.matriz)
        G = nx.Graph()

        for i in range(n):
            for j in range(i + 1, n):
                if self.matriz[i][j] > 1:
                    G.add_edge(i, j, weight=self.matriz[i][j])

        return G

    def add_attributes(self):
        for node in self.graph.nodes():
            self.graph.nodes[node]['label'] = f'{node}'

    def to_json(self):
        data = {
            'nodes': [{'id': n, 'label': self.graph.nodes[n]['label']} for n in self.graph.nodes()],
            'edges': [{'source': u, 'target': v, 'weight': self.graph[u][v]['weight']} for u, v in self.graph.edges()]
        }
        return json.dumps(data)

    def save_json(self, filename='./static/json/data.json'):
        self.add_attributes()
        json_data = self.to_json()
        directory = os.path.dirname(filename)
        if not os.path.exists(directory):
            os.makedirs(directory)

        with open(filename, 'w') as file:
            file.write(json_data)


# !: Ejemplo de uso:
if __name__ == "__main__":
    matriz = [
        [0, 7, 9, 0, 0, 14],
        [7, 0, 10, 15, 0, 0],
        [9, 10, 0, 11, 0, 2],
        [0, 15, 11, 0, 6, 0],
        [0, 0, 0, 6, 0, 9],
        [14, 0, 2, 0, 9, 0]
    ]
    graph_handler = GraphHandler(matriz)
    graph_handler.save_json('./static/json/data.json')
