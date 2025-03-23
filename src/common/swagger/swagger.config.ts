

const customSiteTitle = "AssigMate API-REST";   


const swaggerOptions = {
    customSiteTitle,
    swaggerOptions: {
        persistAuthorization: true,
    },
}

const swaggerTitle = "AssigMate"

const swaggerDescription = `
  <h3>API de Gestão Acadêmica</h3>
  <p>Sistema completo para gerenciamento de instituição de ensino com:</p>
  <ul>
    <li>Autenticação JWT segura</li>
    <li>CRUD conforme os casos de uso</li>
    <li>Acesso restrito a administradores</li>
  </ul>
  <p><strong>Como usar:</strong></p>
  <ol>
    <li>Faça login com admin@escola.com / senhaSegura123</li>
    <li>Clique no botão <strong>Authorize</strong> e insira o token</li>
    <li>Acesse os endpoints protegidos</li>
  </ol>
  <p>Todos os endpoints requerem token JWT exceto o login</p>
`;

export {
    swaggerOptions,
    swaggerTitle,
    swaggerDescription
}