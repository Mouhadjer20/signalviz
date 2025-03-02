import numpy as np
import matplotlib.pyplot as plt
import streamlit as st

plt.style.use('dark_background')

def rect(t):
    return np.where(np.abs(t) <= 0.5, 1, 0)

def tri(t):
    return np.where(np.abs(t) <= 1, 1 - np.abs(t), 0)

def u(t):
    return np.where(t >= 0, 1, 0)
def r(t):
    return np.where(t >= 0, t, 0)

def delta(t, t0, amplitude=1):
    return amplitude * (t == t0)

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
    return delta(t, -1, 2) - delta(t, 2) + delta(t, 0) - delta(t, 1, 2)

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
    return r(t + 1) - 2 * r(t) + r(t - 1)

def dirac(x, t):
    """Calcule l'énergie des impulsions de Dirac présentes dans le signal."""
    impulsions = np.where(np.abs(x) > 0)[0]
    energie_dirac = 0

    for i in impulsions:
        energie_dirac += np.abs(x[i]) ** 2

    return energie_dirac

def classify(signal, t= np.linspace(-500, 500, 10000)):
    x = signal(t)
    E = np.trapezoid(np.abs(x) ** 2, t)
    P = E / (t[-1] - t[0])

    if E > 300:
        E = 'Infini'
        P = round(P, 2)
        classification = "Energie Infini, Puissance Fini"
    else:
       E = round(E, 2)
       P = 0
       classification = "Energie Fini, Puissance Nulle"

    if P == 0 and E == 0:
        E = dirac(x, t)
        classification = "Impulsion de Dirac"

    return E, P, classification

signals = {
    "x1(t) = 2 * Rect(2t - 1)": x1,
    "x2(t) = sin(πt) * Rect(t/2)": x2,
    "x3(t) = tri(2 * t)": x3,
    "x4(t) = u(t - 2)": x4,
    "x5(t) = u(3 - t)": x5,
    "x6(t) = 2δ(t + 1) - δ(t - 2) + δ(t) - 2δ(t - 1)": x6,
    "x7(t) = rect((t - 1) / 2) - rect((t + 1) / 2)": x7,
    "x8(t) = tri(t - 1) - tri(t + 1)": x8,
    "x9(t) = rect(t / 2) - tri(t)": x9,
    "x10(t) = Exp(-t) * U(t - 1)": x10,
    "x11(t) = Sin(4πt)": x11,
    "x13(t) = r(t + 1) - 2 * r(t) + r*(t - 1)": x13
}

st.title("🔍 Visualisation et Classification des Signaux")

signal_name = st.selectbox("Sélectionnez un signal :", list(signals.keys()))

signal_func = signals[signal_name]
t = np.linspace(-5, 5, 1000)
y = signal_func(t)

E, P, classification = classify(signal_func)

fig, ax = plt.subplots()
ax.plot(t, y, color='cyan')
ax.set_xlabel("Temps (t)")
ax.set_ylabel("Amplitude")
ax.set_title(f"{signal_name}\n{classification}\nEnergie: {E}, Puissance: {P}")
ax.grid(True, linestyle='--', linewidth=0.5, color='gray')

st.pyplot(fig)

st.write(f"### Classification : {classification}")
st.write(f"- **Énergie :** {E}")
st.write(f"- **Puissance :** {P}")

