from flask import Flask, jsonify
from flask_cors import cross_origin  # Import cross_origin decorator
import numpy as np

app = Flask(__name__)

# Rectangular function
def rect(t):
    return np.where(np.abs(t) <= 0.5, 1, 0)

# Signal function
def x1(t):
    return 2 * rect(2 * t - 1)

# Generate signal data
def get_signal_data(signal, t=np.linspace(-5, 5, 1000)):
    """Return time and amplitude data as JSON."""
    y = signal(t)
    return {"time": t.tolist(), "amplitude": y.tolist()}

# Flask route to serve signal data
@app.route("/api/get-signal-data", methods=["GET"])
@cross_origin()  # Enable CORS for this route
def signal_data():
    return jsonify(get_signal_data(x1))

# Run the Flask app
if __name__ == "__main__":
    app.run(debug=True)