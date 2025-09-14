// Função para calcular IMC localmente (fallback)
export const calculateIMCLocal = (height, weight) => {
  const heightInMeters = parseFloat(height);
  const weightInKg = parseFloat(weight);
  
  if (!heightInMeters || !weightInKg || heightInMeters <= 0 || weightInKg <= 0) {
    throw new Error('Altura e peso devem ser valores positivos válidos');
  }
  
  return weightInKg / (heightInMeters * heightInMeters);
};

// Função para classificar o IMC
export const classifyIMC = (imc) => {
  if (imc < 18.5) {
    return {
      level: 1,
      classification: 'Abaixo do peso',
      range: 'Menor que 18.5',
      className: 'level1'
    };
  } else if (imc >= 18.5 && imc < 24.9) {
    return {
      level: 2,
      classification: 'Peso normal',
      range: 'Entre 18.5 e 24.9',
      className: 'level2'
    };
  } else if (imc >= 25 && imc < 29.9) {
    return {
      level: 3,
      classification: 'Sobrepeso',
      range: 'Entre 25 e 29.9',
      className: 'level3'
    };
  } else {
    return {
      level: 4,
      classification: 'Obesidade',
      range: 'Maior que 30',
      className: 'level4'
    };
  }
};

// Validação de campos
export const validateFields = (height, weight) => {
  const errors = [];
  
  if (!height || height.trim() === '') {
    errors.push('Altura é obrigatória');
  } else if (isNaN(parseFloat(height)) || parseFloat(height) <= 0) {
    errors.push('Altura deve ser um número positivo válido');
  }
  
  if (!weight || weight.trim() === '') {
    errors.push('Peso é obrigatório');
  } else if (isNaN(parseFloat(weight)) || parseFloat(weight) <= 0) {
    errors.push('Peso deve ser um número positivo válido');
  }
  
  return {
    isValid: errors.length === 0,
    errors
  };
};
