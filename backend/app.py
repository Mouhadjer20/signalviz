from flask import Flask, request, jsonify
import requests
from flask_cors import cross_origin  # Import cross_origin decorator
import numpy as np

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

def delta(t, t0, amplitude=1):
    """Impulse de Dirac discrète: renvoie une impulsion à t0 avec une amplitude donnée."""
    return amplitude * (t == t0)

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

# DeepSeek API configuration
DEEPSEEK_API_URL = "https://api.deepseek.com/v1/query"
DEEPSEEK_API_KEY = ""

# Endpoint to generate a quiz question
@app.route("/api/generate-quiz", methods=["POST"])
@cross_origin()
def generate_quiz():
    try:

        
        # Prepare the prompt for DeepSeek
        prompt = f"""
        Generate 20 random questions of type 'graph_with_equations'. 
        Each question should have:
        - A signal graph (for graph-based questions).
        - Four answer choices, with one correct answer.
        - The correct answer index.
        Return the response in JSON format.
        """

        headers = {
            "Authorization": f"Bearer {DEEPSEEK_API_KEY}",
            "Content-Type": "application/json"
        }

        # Call the DeepSeek API
        response = requests.post(DEEPSEEK_API_URL, json={"prompt": prompt}, headers=headers)
        response.raise_for_status()  # Raise an error for bad responses (4xx, 5xx)

        # Extract the quiz question from the response
        quiz_question = response.json().get("response", "No question generated.")

        # Return the quiz question to the frontend
        return jsonify({"question": quiz_question})

    except Exception as e:
        return jsonify({"error": str(e)}), 500

# Run the Flask app
if __name__ == "__main__":
    app.run(debug=True)