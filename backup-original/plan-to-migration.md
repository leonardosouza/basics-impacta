# Plano de Migração: Calculadora IMC para React + Vite

## Análise do Projeto Atual

### Funcionalidades Implementadas
- **Calculadora de IMC**: Interface para inserir altura e peso
- **Classificação de IMC**: Tabela com faixas de classificação (Abaixo do peso, Normal, Sobrepeso, Obesidade)
- **Integração com API**: Requisições para `http://localhost:3000/imc/calculate`
- **Design Responsivo**: Layout adaptável para mobile e desktop
- **Destaque Visual**: Linha da tabela correspondente ao resultado é destacada

### Estrutura Atual
- `index.html`: Estrutura HTML com formulário e tabela
- `index.js`: Lógica JavaScript com classes `Pessoa` e `Nutricionista`
- `index.css`: Estilos CSS com media queries responsivas
- `right-arrow.png`: Ícone para destacar resultado

## Plano de Migração Passo a Passo

### Fase 1: Configuração do Ambiente React + Vite

#### 1.1 Inicialização do Projeto
```bash
npm create vite@latest calculadora-imc-react -- --template react
cd calculadora-imc-react
npm install
```

#### 1.2 Dependências Adicionais
```bash
# Para requisições HTTP
npm install axios

# Para estilização (opcional - manter CSS puro ou usar styled-components)
npm install styled-components

# Para desenvolvimento
npm install -D @types/react @types/react-dom
```

#### 1.3 Configuração do Vite
- Configurar `vite.config.js` para proxy da API local
- Configurar variáveis de ambiente para URL da API

### Fase 2: Estrutura de Componentes

#### 2.1 Arquitetura de Componentes
```
src/
├── components/
│   ├── CalculatorForm/
│   │   ├── CalculatorForm.jsx
│   │   └── CalculatorForm.module.css
│   ├── IMCTable/
│   │   ├── IMCTable.jsx
│   │   └── IMCTable.module.css
│   └── Layout/
│       ├── Container.jsx
│       └── Container.module.css
├── services/
│   └── imcService.js
├── hooks/
│   └── useIMC.js
├── utils/
│   └── imcUtils.js
└── App.jsx
```

#### 2.2 Componentes Principais

**CalculatorForm.jsx**
- Formulário com inputs de altura e peso
- Validação de campos
- Submit handler

**IMCTable.jsx**
- Tabela de classificação de IMC
- Destaque da linha correspondente ao resultado
- Ícone de seta para resultado

**Container.jsx**
- Layout principal responsivo
- Centralização do conteúdo

### Fase 3: Migração da Lógica de Negócio

#### 3.1 Serviços (services/imcService.js)
```javascript
// Migrar lógica de requisição da API
export const calculateIMC = async (height, weight) => {
  // Implementar requisição usando axios
}
```

#### 3.2 Utilitários (utils/imcUtils.js)
```javascript
// Migrar lógica de classificação de IMC
export const classifyIMC = (imc) => {
  // Lógica de classificação
}
```

#### 3.3 Custom Hook (hooks/useIMC.js)
```javascript
// Gerenciar estado do IMC e lógica de cálculo
export const useIMC = () => {
  // Estado, funções de cálculo, loading, error
}
```

### Fase 4: Migração dos Estilos

#### 4.1 CSS Modules
- Converter `index.css` para CSS Modules
- Manter responsividade existente
- Organizar estilos por componente

#### 4.2 Estrutura de Estilos
```
src/
├── styles/
│   ├── globals.css
│   └── variables.css
├── components/
│   └── [Component]/
│       └── [Component].module.css
```

### Fase 5: Implementação dos Componentes

#### 5.1 App.jsx (Componente Principal)
```javascript
import { useState } from 'react'
import CalculatorForm from './components/CalculatorForm/CalculatorForm'
import IMCTable from './components/IMCTable/IMCTable'
import Container from './components/Layout/Container'

function App() {
  const [imcResult, setImcResult] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  
  return (
    <Container>
      <h1>Calculadora do IMC</h1>
      <CalculatorForm 
        onCalculate={setImcResult}
        isLoading={isLoading}
        setIsLoading={setIsLoading}
      />
      <IMCTable result={imcResult} />
    </Container>
  )
}
```

#### 5.2 CalculatorForm.jsx
- Migrar lógica de formulário
- Implementar validação
- Gerenciar estado de loading

#### 5.3 IMCTable.jsx
- Migrar tabela de classificação
- Implementar destaque do resultado
- Manter ícone de seta

### Fase 6: Melhorias e Otimizações

#### 6.1 Validação e Tratamento de Erros
- Validação de campos obrigatórios
- Tratamento de erros da API
- Mensagens de feedback para o usuário

#### 6.2 Acessibilidade
- Labels apropriados
- ARIA attributes
- Navegação por teclado

#### 6.3 Performance
- Lazy loading se necessário
- Memoização de componentes
- Otimização de re-renders

### Fase 7: Testes

#### 7.1 Testes Unitários
```bash
npm install -D @testing-library/react @testing-library/jest-dom vitest
```

#### 7.2 Estrutura de Testes
```
src/
├── __tests__/
│   ├── components/
│   ├── services/
│   └── utils/
```

### Fase 8: Configuração de Build e Deploy

#### 8.1 Scripts de Build
- Configurar build para produção
- Otimização de assets
- Configuração de proxy para API

#### 8.2 Deploy
- Configurar para deploy em Vercel/Netlify
- Variáveis de ambiente para produção

## Estrutura Final do Projeto

```
calculadora-imc-react/
├── public/
│   └── right-arrow.png
├── src/
│   ├── components/
│   │   ├── CalculatorForm/
│   │   ├── IMCTable/
│   │   └── Layout/
│   ├── services/
│   ├── hooks/
│   ├── utils/
│   ├── styles/
│   ├── App.jsx
│   └── main.jsx
├── package.json
├── vite.config.js
└── README.md
```

## Cronograma Estimado

- **Fase 1-2**: 1-2 dias (Configuração e estrutura)
- **Fase 3-4**: 2-3 dias (Migração de lógica e estilos)
- **Fase 5**: 2-3 dias (Implementação dos componentes)
- **Fase 6-7**: 2-3 dias (Melhorias e testes)
- **Fase 8**: 1 dia (Build e deploy)

**Total estimado**: 8-12 dias

## Considerações Importantes

1. **Compatibilidade**: Manter funcionalidades existentes
2. **Responsividade**: Preservar design responsivo atual
3. **API**: Manter integração com API existente
4. **UX**: Melhorar experiência do usuário com loading states
5. **Manutenibilidade**: Código mais organizado e testável
6. **Performance**: Aproveitar otimizações do React e Vite

## Próximos Passos

1. Executar Fase 1 (Configuração do ambiente)
2. Criar estrutura de pastas conforme Fase 2
3. Migrar lógica de negócio (Fase 3)
4. Implementar componentes (Fase 5)
5. Aplicar estilos (Fase 4)
6. Testes e otimizações (Fases 6-7)
7. Deploy (Fase 8)

## Detalhamento da Migração por Arquivo

### Migração do index.js

**Classes atuais:**
- `Pessoa(altura, peso)`: Construtor base
- `Nutricionista(altura, peso)`: Herda de Pessoa, calcula IMC e classifica

**Conversão para React:**
- `Pessoa` → Hook `useIMC` para gerenciar estado
- `Nutricionista.imc()` → Função utilitária `calculateIMC`
- `Nutricionista.getImcFromAPI()` → Serviço `imcService.calculateIMC`
- `Nutricionista.classificaIMC()` → Lógica no componente `IMCTable`

### Migração do index.html

**Elementos principais:**
- Formulário → Componente `CalculatorForm`
- Tabela → Componente `IMCTable`
- Container → Componente `Container`

### Migração do index.css

**Estilos a migrar:**
- Media queries responsivas → CSS Modules
- Estilos de formulário → `CalculatorForm.module.css`
- Estilos de tabela → `IMCTable.module.css`
- Layout container → `Container.module.css`

### Migração do right-arrow.png

- Mover para `public/right-arrow.png`
- Referenciar no CSS do componente `IMCTable`
