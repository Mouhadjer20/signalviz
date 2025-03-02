from flask import Flask, jsonify
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

def delta(t, t0, amplitude=1):
    """Impulse de Dirac discrète: renvoie une impulsion à t0 avec une amplitude donnée."""
    return amplitude * (np.isclose(t, t0))

# Définition des signaux spécifiques
def x1(t):
    """x1(t) = 2 * rect(2 * t - 1)."""
    return 2 * rect(2 * t - 1)

def x2(t):
    """x2(t) = sin(pi * t) * rect(t / 2)."""
    return np.sin(np.pi * t) * rect(t / 2)

def x3(t):
    """x3(t) = tri(2 * t)."""
    return tri(2 * t)

def x4(t):
    """x4(t) = u(t - 2)."""
    return u(t - 2)

def x5(t):
    """x5(t) = u(3 - t)."""
    return u(3 - t)

def x6(t):
    """x6(t) = 2δ(t + 1) - δ(t - 2) + δ(t) - 2δ(t - 1)."""
    return 2 * delta(t, -1) - delta(t, 2) + delta(t, 0) - 2 * delta(t, 1)

def x7(t):
    """x7(t) = rect((t - 1) / 2) - rect((t + 1) / 2)."""
    return rect((t - 1) / 2) - rect((t + 1) / 2)

def x8(t):
    """x8(t) = tri(t - 1) - tri(t + 1)."""
    return tri(t - 1) - tri(t + 1)

def x9(t):
    """x9(t) = rect(t / 2) - tri(t)."""
    return rect(t / 2) - tri(t)

def x10(t):
    """x10(t) = exp(-t) * u(t - 1)."""
    return np.exp(-t) * u(t - 1)

def x11(t):
    """x11(t) = sin(4πt)."""
    return np.sin(4 * np.pi * t)

def x13(t):
    """x13(t) = rect(t + 1) - 2 * rect(t) + rect(t - 1)."""
    return rect(t + 1) - 2 * rect(t) + rect(t - 1)

def dirac(x, t):
    """Calcule l'énergie des impulsions de Dirac présentes dans le signal."""
    impulsions = np.where(np.abs(x) > 0)[0]
    energie_dirac = 0

    for i in impulsions:
        energie_dirac += np.abs(x[i]) ** 2

    return int(energie_dirac)

# Generate signal data
def get_signal_data(signal, t=np.linspace(-5, 5, 1000)):
    """Return time and amplitude data as JSON."""
    y = signal(t)
    docstring = signal.__doc__  # Extract the docstring
    energie = dirac(y, t)  # Calculate Dirac energy

    # Resample time and amplitude arrays
    resampled_t = np.arange(-5, 5.5, 0.5 )  # [-5, -4.5, -4, ..., 5]
    indices = np.searchsorted(t, resampled_t)
    resampled_amplitude = y[indices]

    return {
        "function": docstring,  # Include the docstring in the response
        "time": resampled_t.tolist(),  # Resampled time array
        "amplitude": resampled_amplitude.tolist(),  # Resampled amplitude array
        "energie": energie,  # Include the energy in the response
    }

# Flask route to serve signal data
@app.route("/api/get-signal-data", methods=["GET"])
@cross_origin()  # Enable CORS for this route
def signal_data():
    return jsonify(get_signal_data(x1))

# Run the Flask app
if __name__ == "__main__":
    app.run(debug=True)