import styles from './IMCTable.module.css';

const IMCTable = ({ result }) => {
  const imcLevels = [
    {
      level: 1,
      range: 'Menor que 18.5',
      classification: 'Abaixo do peso',
      className: 'level1'
    },
    {
      level: 2,
      range: 'Entre 18.5 e 24.9',
      classification: 'Peso normal',
      className: 'level2'
    },
    {
      level: 3,
      range: 'Entre 25 e 29.9',
      classification: 'Sobrepeso',
      className: 'level3'
    },
    {
      level: 4,
      range: 'Maior que 30',
      classification: 'Obesidade',
      className: 'level4'
    }
  ];

  const getRowClassName = (level) => {
    const baseClass = styles[`level${level}`];
    const resultClass = result && result.classification.level === level ? styles.result : '';
    return `${baseClass} ${resultClass}`.trim();
  };

  return (
    <table className={styles.table}>
      <thead>
        <tr>
          <th>Seu Resultado</th>
          <th>IMC</th>
          <th>Classificação</th>
        </tr>
      </thead>
      <tbody>
        {imcLevels.map((level) => (
          <tr key={level.level} className={getRowClassName(level.level)}>
            <td></td>
            <td>{level.range}</td>
            <td>{level.classification}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default IMCTable;
