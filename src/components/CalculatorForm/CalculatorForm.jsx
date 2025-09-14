import { useState } from 'react';
import styles from './CalculatorForm.module.css';

const CalculatorForm = ({ onCalculate, isLoading, error, validationErrors }) => {
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onCalculate(height, weight);
  };

  const handleReset = () => {
    setHeight('');
    setWeight('');
  };

  return (
    <div className={styles.data}>
      <div className={styles.form}>
        <form onSubmit={handleSubmit}>
          {validationErrors.length > 0 && (
            <div className={styles.errorContainer}>
              {validationErrors.map((error, index) => (
                <div key={index} className={styles.errorMessage}>
                  {error}
                </div>
              ))}
            </div>
          )}
          
          {error && (
            <div className={styles.errorContainer}>
              <div className={styles.errorMessage}>
                {error}
              </div>
            </div>
          )}

          <div className={styles.row}>
            <label htmlFor="altura">Altura (em metros):</label>
            <input
              type="text"
              id="altura"
              value={height}
              onChange={(e) => setHeight(e.target.value)}
              placeholder="0.00"
              autoFocus
              disabled={isLoading}
            />
          </div>
          
          <div className={styles.row}>
            <label htmlFor="peso">Peso (em kg):</label>
            <input
              type="text"
              id="peso"
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
              placeholder="0.00"
              disabled={isLoading}
            />
          </div>
          
          <div className={styles.row}>
            <button 
              type="submit" 
              disabled={isLoading}
              className={styles.calculateButton}
            >
              {isLoading ? 'Calculando...' : 'Calcular IMC'}
            </button>
            <button 
              type="button" 
              onClick={handleReset}
              disabled={isLoading}
              className={styles.resetButton}
            >
              Limpar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CalculatorForm;
