import { useIMC } from './hooks/useIMC';
import Container from './components/Layout/Container';
import CalculatorForm from './components/CalculatorForm/CalculatorForm';
import IMCTable from './components/IMCTable/IMCTable';
import './App.css';

function App() {
  const { imcResult, isLoading, error, validationErrors, calculateIMC, reset } = useIMC();

  const handleCalculate = (height, weight) => {
    calculateIMC(height, weight);
  };

  const handleReset = () => {
    reset();
  };

  return (
    <Container>
      <h1>Calculadora do IMC</h1>
      
      <CalculatorForm 
        onCalculate={handleCalculate}
        isLoading={isLoading}
        error={error}
        validationErrors={validationErrors}
      />
      
      {imcResult && (
        <div className="result-info">
          <p>
            Seu IMC é <strong>{imcResult.imc.toFixed(2)}</strong> - {imcResult.classification.classification}
            {imcResult.source === 'local' && ' (cálculo local)'}
          </p>
        </div>
      )}
      
      <IMCTable result={imcResult} />
      
      {imcResult && (
        <div className="reset-section">
          <button onClick={handleReset} className="reset-button">
            Nova Consulta
          </button>
        </div>
      )}
    </Container>
  );
}

export default App;