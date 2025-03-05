### **Objective**  
Generate **20 randomly selected questions** related to **signal processing**, ensuring that each **question type** matches the expected format. Questions should include **graphs or equations**, properly categorized based on the four specified types.  

**Return the response as a JSON object only, without any explanations or additional text.**  

---  

## **Types of Questions to Generate**  

1. **Graph with Multiple-Choice Equations**  
   - Generate a **signal graph** (numerical data representation).  
   - Provide **four mathematical equations** (one correct).  
   - The user selects the correct equation that represents the graph.  

2. **Equation with Multiple Corresponding Graphs**  
   - Generate a **mathematical equation**.  
   - Provide **four graph representations** (one correct).  
   - The user selects the correct graph corresponding to the equation.  

3. **Graph with Multiple Energy Values**  
   - Generate a **signal graph** (numerical data representation).  
   - Provide **four possible energy values** (one correct).  
   - The user selects the correct energy value.  

4. **Equation with Multiple Energy Values**  
   - Generate a **mathematical equation**.  
   - Provide **four possible energy values** (one correct).  
   - The user selects the correct energy value.  

---  

## **Mathematical Signals to Use**  

### **Basic Signal Functions**  
- **Rectangle function**: `rect(t)`  
- **Triangle function**: `tri(t)`  
- **Unit step function**: `u(t)`  
- **Ramp function**: `r(t)`  
- **Delta function**: `delta(t, t0)`  

### **Example Signal Equations**  
1. `x1(t) = 2 * rect(2t - 1)`  
2. `x2(t) = sin(πt) * rect(t/2)`  
3. `x3(t) = tri(2t)`  
4. `x4(t) = u(t - 2)`  
5. `x5(t) = u(3 - t)`  
6. `x6(t) = 2δ(t + 1) - δ(t - 2) + δ(t) - 2δ(t - 1)`  
7. `x7(t) = rect((t - 1) / 2) - rect((t + 1) / 2)`  
8. `x8(t) = tri(t - 1) - tri(t + 1)`  
9. `x9(t) = rect(t / 2) - tri(t)`  
10. `x10(t) = exp(-t) * u(t - 1)`  
11. `x11(t) = sin(4πt)`  
12. `x12(t) = r(t + 1) - 2 * r(t) + r(t - 1)`  

---  

## **Expected API Response Format**  

Return a JSON object containing **20 questions**, with each question formatted as follows:  

### **1. Graph with Multiple-Choice Equations (Example Response)**  

```json
{
  "questions": [
    {
      "type": "graph_with_equations",
      "question": "sin(πt) * rect(t/2)",
      "answers": [
        "rect(t - 1)",
        "tri(2t)",
        "sin(πt) * rect(t/2)",
        "2 * rect(2t - 1)"
      ],
      "index_correct_answer": 3
    }
  ]
}
```

---  

### **2. Equation with Multiple Graphs (Example Response)**  

```json
{
  "questions": [
    {
      "type": "equation_with_graphs",
      "question": "sin(πt) * rect(t / 2)",
      "answers": [
        "sin(πt) * rect(t / 2)",
        "tri(2t)",
        "sin(πt) * rect(t/2)",
        "2 * rect(2t - 1)"
      ],
      "index_correct_answer": 0
    }
  ]
}
```

---  

### **3. Graph with Multiple Energy Values (Example Response)**  

```json
{
  "questions": [
    {
      "type": "graph_with_energy",
      "question": "sin(4πt)",
      "answers": ["3.2", "10.2", "2.7", "5.1"],
      "index_correct_answer": 1
    }
  ]
}
```

---  

### **4. Equation with Multiple Energy Values (Example Response)**  

```json
{
  "questions": [
    {
      "type": "equation_with_energy",
      "question": "sin(4πt)",
      "answers": ["10.2", "12.5", "15.3", "9.8"],
      "index_correct_answer": 1
    }
  ]
}
```

---