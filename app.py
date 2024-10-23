from logic import *
from flask import Flask, render_template, request, jsonify, send_from_directory

app = Flask(__name__)

@app.route('/', methods=['GET', 'POST'])

def index():
    return render_template('index.html')

@app.route('/matrix', methods=['GET', 'POST'])
def recive_matrix():
    data = request.json
    matrix = data.get('matrix')
    logic_matrix(matrix)

    return jsonify( success=True, message='Matrix received')

