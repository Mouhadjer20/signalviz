from flask import Flask, request, jsonify
import requests
from flask_cors import cross_origin
import numpy as np
import json
import re
import math
from openai import OpenAI
import os
import ast

app = Flask(__name__)

# Définition des fonctions de base pour les signaux
def rect(t):
    """Fonction porte (rectangle): renvoie 1 si |t| <= 0.5, sinon 0."""
    return np.where(np.abs(t) <= 0.5, 1, 0)

def tri(t):
    """Fonction triangle: renvoie une forme triangulaire sur [-1, 1]."""
    return np.where(np.abs(t) <= 1, 1 - np.abs(t), 0)

def u(t):
    """Fonction échelon unité: renvoie 1 si t >= 0, sinon 0."""
    return np.where(t >= 0, 1, 0)

def r(t):
    return np.where(t >= 0, t, 0)

# def delta(t, t0, amplitude=1):
#     """Impulse de Dirac discrète: renvoie une impulsion à t0 avec une amplitude donnée."""
#     return amplitude * (t == t0)

def delta(t, t0=0, amplitude=1):
    """Impulse de Dirac discrète : renvoie une impulsion discrète à t0."""
    return np.where(np.isclose(t, t0, atol=(t[1] - t[0]) / 2), amplitude, 0)

# Définition des signaux spécifiques
def x1(t):
    """2 * Rect(2 * t - 1)."""
    return 2 * rect(2 * t - 1)

def x2(t):
    """sin(πt) * Rect(t / 2)."""
    return np.sin(np.pi * t) * rect(t / 2)

def x3(t):
    """Tri(2 * t)."""
    return tri(2 * t)

def x4(t):
    """U(t - 2)."""
    return u(t - 2)

def x5(t):
    """U(3 - t)."""
    return u(3 - t)

def x6(t):
    """2δ(t + 1) - δ(t - 2) + δ(t) - 2δ(t - 1)."""
    return delta(t, -1, 2) - delta(t, 2) + delta(t, 0) - delta(t, 1, 2)

def x7(t):
    """Rect((t - 1) / 2) - Rect((t + 1) / 2)."""
    return rect((t - 1) / 2) - rect((t + 1) / 2)

def x8(t):
    """Tri(t - 1) - Tri(t + 1)."""
    return tri(t - 1) - tri(t + 1)

def x9(t):
    """Rect(t / 2) - Tri(t)."""
    return rect(t / 2) - tri(t)

def x10(t):
    """exp(-t) * U(t - 1)."""
    return np.exp(-t) * u(t - 1)

def x11(t):
    """sin(4πt)."""
    return np.sin(4 * np.pi * t)

def x13(t):
    """r(t + 1) - 2 * r(t) + r(t - 1)."""
    return r(t + 1) - 2 * r(t) + r(t - 1)

def dirac(x, t):
    """Calcule l'énergie des impulsions de Dirac présentes dans le signal."""
    impulsions = np.where(np.abs(x) > 0)[0]
    energie_dirac = 0

    for i in impulsions:
        energie_dirac += np.abs(x[i]) ** 2

    return int(energie_dirac)

def classify(signal, t= np.linspace(-500, 500, 10000)):
    x = signal(t)
    E = np.trapezoid(np.abs(x) ** 2, t)
    P = E / (t[-1] - t[0])

    if E > 300:
        E = 'Infini'
        P = round(P, 2)
    else:
       E = str(round(E, 2))
       P = 0

    if P == 0 and E == 0:
        E = str(dirac(x, t))
    return E, P

# Generate signal data
def get_signal_data(signal, t=np.linspace(-4, 5, 1000)):
    """Return time and amplitude data as JSON."""
    y = signal(t)
    docstring = signal.__doc__
    energie, puissance = classify(signal)

    return {
        "id": signal.__name__ + "(t)",
        "equation": docstring,  # Include the docstring in the response
        "time": t.tolist(),  # Resampled time array
        "amplitude": y.tolist(),  # Resampled amplitude array
        "energy": energie,  # Include the energy in the response
        "puissance": puissance
    }

signal_functions = {
    "x1": x1, "x2": x2, "x3": x3, "x4": x4,
    "x5": x5, "x6": x6, "x7": x7, "x8": x8,
    "x9": x9, "x10": x10, "x11": x11, "x13": x13
}

# Flask route to serve signal data
@app.route("/api/get-signal-data/<signal_name>", methods=["GET"])
@cross_origin()
def get_signal_data_by_name(signal_name):
    if signal_name in signal_functions:
        return jsonify(get_signal_data(signal_functions[signal_name]))
    else:
        return jsonify({"error": "Invalid signal name"}), 400


@app.route("/api/get-signal-data", methods=["GET"])
@cross_origin()
def get_all_signal_data():
    response = []
    for signal_name in signal_functions:
        response.append(get_signal_data(signal_functions[signal_name]))

    return jsonify(response)


def generate_quiz_json_format(quiz_data):
    try:
        file_name = "../frontend/public/quiz_generated.json"
        # Load the existing JSON file
        try:
            with open(file_name, "r") as file:
                data = json.load(file)
        except (FileNotFoundError, json.JSONDecodeError):
            data = {"quiz": []}  # Initialize if file is missing or invalid

        data["quiz"].append({"questions": []})

        if "```json" in quiz_data and "```" in quiz_data.split("```json")[1]:
            quiz_data = quiz_data.split("```json")[1].split("```")[0]

        # Append new questions to the last quiz
        data["quiz"][-1]["questions"].extend(json.loads(quiz_data)["questions"])

        # Save the updated JSON file
        with open(file_name, "w") as file:
            json.dump(data, file, indent=2)

        # Return the quiz data as JSON response
        return jsonify({"message": "Quiz updated successfully", "data": data})

    except Exception as e:
        return jsonify({"error": str(e)}), 500

# Endpoint to generate a quiz question
@app.route("/api/generate-quiz", methods=["GET"])
@cross_origin()
def generate_quiz():
    try:

        
        # Prepare the prompt for DeepSeek
        prompt = """### **Objective**  \nGenerate **20 randomly selected questions** related to **signal processing**, ensuring that each **question type** matches the expected format. Questions should include **graphs or equations**, properly categorized based on the four specified types.  \n\n**Return the response as a JSON object only, without any explanations or additional text.**  \n\n---  \n\n## **Types of Questions to Generate**  \n\n1. **Graph with Multiple-Choice Equations**  \n   - Generate a **signal graph** (numerical data representation).  \n   - Provide **four mathematical equations** (one correct).  \n   - The user selects the correct equation that represents the graph.  \n\n2. **Equation with Multiple Corresponding Graphs**  \n   - Generate a **mathematical equation**.  \n   - Provide **four graph representations** (one correct).  \n   - The user selects the correct graph corresponding to the equation.  \n\n3. **Graph with Multiple Energy Values**  \n   - Generate a **signal graph** (numerical data representation).  \n   - Provide **four possible energy values** (one correct).  \n   - The user selects the correct energy value.  \n\n4. **Equation with Multiple Energy Values**  \n   - Generate a **mathematical equation**.  \n   - Provide **four possible energy values** (one correct).  \n   - The user selects the correct energy value.  \n\n---  \n\n## **Mathematical Signals to Use**  \n\n### **Basic Signal Functions**  \n- **Rectangle function**: `rect(t)`  \n- **Triangle function**: `tri(t)`  \n- **Unit step function**: `u(t)`  \n- **Ramp function**: `r(t)`  \n- **Delta function**: `delta(t, t0)`  \n\n### **Example Signal Equations**  \n1. `x1(t) = 2 * rect(2t - 1)`  \n2. `x2(t) = sin(πt) * rect(t/2)`  \n3. `x3(t) = tri(2t)`  \n4. `x4(t) = u(t - 2)`  \n5. `x5(t) = u(3 - t)`  \n6. `x6(t) = 2δ(t + 1) - δ(t - 2) + δ(t) - 2δ(t - 1)`  \n7. `x7(t) = rect((t - 1) / 2) - rect((t + 1) / 2)`  \n8. `x8(t) = tri(t - 1) - tri(t + 1)`  \n9. `x9(t) = rect(t / 2) - tri(t)`  \n10. `x10(t) = exp(-t) * u(t - 1)`  \n11. `x11(t) = sin(4πt)`  \n12. `x12(t) = r(t + 1) - 2 * r(t) + r(t - 1)`  \n\n---  \n\n## **Expected API Response Format**  \n\nReturn a JSON object containing **20 questions**, with each question formatted as follows:  \n\n### **1. Graph with Multiple-Choice Equations (Example Response)**  \n\n```json\n{\n  \"questions\": [\n    {\n      \"type\": \"graph_with_equations\",\n      \"question\": \"sin(πt) * rect(t/2)\",\n      \"answers\": [\n        \"rect(t - 1)\",\n        \"tri(2t)\",\n        \"sin(πt) * rect(t/2)\",\n        \"2 * rect(2t - 1)\"\n      ],\n      \"index_correct_answer\": 3\n    }\n  ]\n}\n```\n\n---  \n\n### **2. Equation with Multiple Graphs (Example Response)**  \n\n```json\n{\n  \"questions\": [\n    {\n      \"type\": \"equation_with_graphs\",\n      \"question\": \"sin(πt) * rect(t / 2)\",\n      \"answers\": [\n        \"sin(πt) * rect(t / 2)\",\n        \"tri(2t)\",\n        \"sin(πt) * rect(t/2)\",\n        \"2 * rect(2t - 1)\"\n      ],\n      \"index_correct_answer\": 0\n    }\n  ]\n}\n```\n\n---  \n\n### **3. Graph with Multiple Energy Values (Example Response)**  \n\n```json\n{\n  \"questions\": [\n    {\n      \"type\": \"graph_with_energy\",\n      \"question\": \"sin(4πt)\",\n      \"answers\": [\"3.2\", \"10.2\", \"2.7\", \"5.1\"],\n      \"index_correct_answer\": 1\n    }\n  ]\n}\n```\n\n---  \n\n### **4. Equation with Multiple Energy Values (Example Response)**  \n\n```json\n{\n  \"questions\": [\n    {\n      \"type\": \"equation_with_energy\",\n      \"question\": \"sin(4πt)\",\n      \"answers\": [\"10.2\", \"12.5\", \"15.3\", \"9.8\"],\n      \"index_correct_answer\": 1\n    }\n  ]\n}\n```\n\n---"""

        # DeepSeek API configuration
        client = OpenAI(
            base_url="https://openrouter.ai/api/v1",
            api_key="Your-Session-key",
        )

        completion = client.chat.completions.create(
            model="deepseek/deepseek-r1-distill-llama-70b:free",
            messages=[
                {
                "role": "user",
                "content": prompt
                }
            ]
        )

        # Return the quiz question to the frontend
        return generate_quiz_json_format(completion.choices[0].message.content)

    except Exception as e:
        return jsonify({"error": str(e)}), 500


def parse_equation(equation): 
    """
    Parse and prepare the equation for evaluation.
    Replaces function names with their Python equivalents and handles special cases.
    """
    # Replace case-insensitive function names and special symbols
    replacements = [
        (r'\bRect\b', 'rect'),
        (r'\bTri\b', 'tri'),
        (r'\bU\b', 'u'),
        (r'\bR\b', 'r'),
        (r'\bramp\b', 'r'),
        (r'\bRamp\b', 'r'),
        (r'\bDelta\b', 'delta'),
        (r'\bδ\b', 'delta'),
        (r'\bπ\b', 'math.pi'),
        (r'\bpi\b', 'math.pi'),
        (r'\bπt\b','math.pi * t')
    ]

    for pattern, replacement in replacements:
        equation = re.sub(pattern, replacement, equation, flags=re.IGNORECASE)

    # Fix pi-related issues
    equation = re.sub(r'(\d)π', r'\1 * math.pi', equation)
    equation = re.sub(r'(\d)pi', r'\1 * math.pi', equation)
    equation = re.sub(r'πt', r'math.pi * t', equation)
    equation = re.sub(r'math.pit', r'math.pi * t', equation)
    equation = re.sub(r'(\d)δ', r'\1 * delta', equation)

    # Add multiplication for implicit multiplication
    equation = re.sub(r'(\d)([a-zA-Z])', r'\1 * \2', equation)
    equation = re.sub(r'([a-zA-Z])(\d)', r'\1 * \2', equation)

    return equation

def get_signal(equation, t=np.linspace(-4, 5, 1000)):
    """Renvoie les données temporelles et d'amplitude d'un signal sous format JSON."""
    try:
        # Préparer l'équation
        prepared_eq = parse_equation(equation)

        # Dictionnaire des fonctions disponibles
        func_dict = {
            'rect': rect,
            'tri': tri,
            'u': u,
            'r': r,
            'delta': delta,
            'δ': delta,
            't': t,
            'np': np,
            'math': math,
            'sin': np.sin,
            'cos': np.cos,
            'exp': np.exp,
            'log': np.log
        }

        # Évaluer l'équation
        y = eval(prepared_eq, {"__builtins__": {}}, func_dict)

        # Retourner les données sous format JSON
        return jsonify({"time": t.tolist(), "amplitude": y.tolist()})

    except Exception as e:
        return jsonify({"error": str(e), "equation": equation})

@app.route("/get_signal", methods=["GET"])
@cross_origin()
def signal_api():
    equation = request.args.get("equation", "")
    equation = equation.replace("  ", " ")
    # 2. + => %2B
    return get_signal(equation)

# Run the Flask app
if __name__ == "__main__":
    app.run(debug=True)