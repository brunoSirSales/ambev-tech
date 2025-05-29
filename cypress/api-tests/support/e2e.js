// ***********************************************************
// Configuração específica para testes de API
// ***********************************************************

// Exportar a função de configuração para o Cypress
module.exports = (on, config) => {
  // Importar e configurar comandos personalizados
  const commands = require('./commands');
  commands(on, config);
  
  // Configurar eventos do Cypress
  on('before:browser:launch', (browser, launchOptions) => {
    // Adicionar configurações de lançamento do navegador se necessário
    return launchOptions;
  });
  
  return config;
};
