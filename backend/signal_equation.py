import numpy as np
import matplotlib.pyplot as plt
import re
from flask import Flask, jsonify
import math

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
    """Fonction rampe: renvoie t si t >= 0, sinon 0."""
    return np.where(t >= 0, t, 0)

def delta(t, position=0, amplitude=1):
    """Impulse de Dirac discrète : renvoie une impulsion discrète à t0."""
    spike = np.where(np.isclose(t, position, atol=(t[1] - t[0]) / 2), amplitude, 0)
    return spike

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

    # Add multiplication for implicit multiplication
    equation = re.sub(r'(\d)([a-zA-Z])', r'\1 * \2', equation)
    equation = re.sub(r'([a-zA-Z])(\d)', r'\1 * \2', equation)

    return equation

def plot_signal(equation):
    """
    Plot the signal for the given equation over the time range [-4, 5]
    """
    # Create time array
    t = np.linspace(-4, 5, 1000)

    try:
        # Prepare the equation
        prepared_eq = parse_equation(equation)

        # Create a dictionary of functions to use in eval
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

        # Evaluate the equation
        y = eval(prepared_eq, {"__builtins__": {}}, func_dict)

        # Plot the signal
        plt.figure(figsize=(10, 6))
        plt.plot(t, y)
        plt.title(f'Signal: {equation}')
        plt.xlabel('Time (t)')
        plt.ylabel('Amplitude')
        plt.grid(True)
        plt.axhline(y=0, color='k', linestyle='--')
        plt.axvline(x=0, color='k', linestyle='--')
        plt.show()

    except Exception as e:
        print(f"Error processing equation: {e}")
        print(f"Prepared equation: {prepared_eq}")
        print("Please check your input and try again.")

def get_signal_data(equation, t=np.linspace(-4, 5, 1000)):
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

def main():
    print("Signal Equation Plotter")
    print("Examples:")
    print("- 2 * Rect(2 * t - 1)")
    print("- sin(πt) * Rect(t / 2)")
    print("- Tri(2 * t)")
    print("- 2δ(t + 1) - δ(t - 2) + δ(t) - 2δ(t - 1)")
    print("- delta(t)")
    print("- sin(2πt) * rect(t/2)")
    print("- sin(πt/2) * rect(t/2)")

    while True:
        # Get user input
        equation = input("\nEnter your signal equation (or 'q' to quit): ")

        # Check for quit
        if equation.lower() == 'q':
            break

        # Plot the signal
        """plot_signal(equation)"""

        # Get the data
        print(get_signal_data(equation))
        

if __name__ == "__main__":
    main()
