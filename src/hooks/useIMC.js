import { useState } from 'react';
import { calculateIMC } from '../services/imcService';
import { calculateIMCLocal, classifyIMC, validateFields } from '../utils/imcUtils';

export const useIMC = () => {
  const [imcResult, setImcResult] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [validationErrors, setValidationErrors] = useState([]);

  const calculateIMCValue = async (height, weight) => {
    // Limpar erros anteriores
    setError(null);
    setValidationErrors([]);
    setImcResult(null);

    // Validar campos
    const validation = validateFields(height, weight);
    if (!validation.isValid) {
      setValidationErrors(validation.errors);
      return;
    }

    setIsLoading(true);

    try {
      // Tentar calcular via API primeiro
      const apiResult = await calculateIMC(height, weight);
      
      if (apiResult.success) {
        const classification = classifyIMC(apiResult.imc);
        setImcResult({
          imc: apiResult.imc,
          classification,
          source: 'api'
        });
      } else {
        // Fallback para cálculo local se API falhar
        console.warn('API indisponível, usando cálculo local:', apiResult.error);
        const localImc = calculateIMCLocal(height, weight);
        const classification = classifyIMC(localImc);
        setImcResult({
          imc: localImc,
          classification,
          source: 'local'
        });
      }
    } catch (err) {
      console.error('Erro no cálculo do IMC:', err);
      setError(err.message || 'Erro interno ao calcular IMC');
    } finally {
      setIsLoading(false);
    }
  };

  const reset = () => {
    setImcResult(null);
    setError(null);
    setValidationErrors([]);
    setIsLoading(false);
  };

  return {
    imcResult,
    isLoading,
    error,
    validationErrors,
    calculateIMC: calculateIMCValue,
    reset
  };
};
