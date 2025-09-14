import axios from 'axios';

const API_BASE_URL = 'http://localhost:3000';

export const calculateIMC = async (height, weight) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/imc/calculate`, {
      height: parseFloat(height),
      weight: parseFloat(weight)
    }, {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    });
    
    return {
      success: true,
      imc: parseFloat(response.data.imc),
      error: null
    };
  } catch (error) {
    console.error('Erro ao calcular IMC:', error);
    return {
      success: false,
      imc: null,
      error: error.message || 'Erro ao conectar com a API'
    };
  }
};
