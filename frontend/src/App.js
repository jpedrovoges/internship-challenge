import React, { useState } from 'react';
import './App.css'; 

const API_BASE_URL = 'http://localhost:8000/api/calculate-lcm/';

function App() {
  const [x, setX] = useState('');
  const [y, setY] = useState('');
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const validateInputs = () => {
    const numX = parseInt(x);
    const numY = parseInt(y);

    if (isNaN(numX) || isNaN(numY)) {
      return 'Por favor, insira valores válidos para X e Y.';
    }

    if (numX <= 0 || numY <= 0) {
      return 'Os números X e Y devem ser inteiros e positivos (> 0).';
    }

    if (numX >= numY) {
      return 'O valor de X deve ser estritamente menor que Y.';
    }
    
   return null; 
  };

    const handleSubmit = async (e) => {
    e.preventDefault();
    setResult(null);
    setError(null);

    const validationError = validateInputs();
    if (validationError) {
      setError(validationError);
      return;
    }
    
    setLoading(true);

    try {
      const response = await fetch(`${API_BASE_URL}?x=${x}&y=${y}`);
      
      const data = await response.json();

      if (!response.ok) {
         const backendError = data.error || 'Erro desconhecido do servidor.';
        throw new Error(backendError);
      }

      setResult(data.result);

    } catch (err) {
      console.error("Erro na requisição:", err);
      setError(`Erro: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="app-container">
      <h1>Calculadora de Divisores de Inteiros</h1>
      
      <form onSubmit={handleSubmit} className="lcm-form">
        <div className="input-group">
          <label htmlFor="x-input">Início do Intervalo (X):</label>
          <input
            id="x-input"
            type="number"
            value={x}
            onChange={(e) => setX(e.target.value)}
            placeholder="Ex: 1"
            min="1"
          />
        </div>

        <div className="input-group">
          <label htmlFor="y-input">Fim do Intervalo (Y):</label>
          <input
            id="y-input"
            type="number"
            value={y}
            onChange={(e) => setY(e.target.value)}
            placeholder="Ex: 10"
            min="2"
          />
        </div>

        <button type="submit" disabled={loading}>
          {loading ? 'Calculando...' : 'Calcular'}
        </button>
      </form>
      
      {/* Área de Mensagens (Erro ou Resultado) */}
      {error && <p className="message error">{error}</p>}

      {result !== null && (
        <div className="message success">
          <p>O menor divisor para o intervalo de {x} a {y} é:</p>
          <p className="result-value">- {result} -</p>
        </div>
      )}
    </div>
  );
}

export default App;