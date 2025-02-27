

const customSiteTitle = "AssigMate API-REST";   

const customJs = "script url";                  //uncomment this line to add a custom script file
const customJsStr = "alert('prueba')";          //uncomment this line to add a custom script


const swaggerOptions = {
    customSiteTitle,
    // customJs,   //uncomment this line to add a custom script file
    // customJsStr,  //uncomment this line to add a custom script
    swaggerOptions: {
        persistAuthorization: true, // this helps to retain the token even after refreshing the (swagger UI web page)
        // defaultModelsExpandDepth: -1 //uncomment this line to stop seeing the schema on swagger ui

    },
}

const swaggerTitle = "Nest Postgres Authentication REST API Template Documentation"

const swaggerDescription = `
  <p>This Nest.js REST API template provides a robust foundation for building secure and scalable web applications. With built-in user registration, JWT authentication, and protected routes.</p>
  <p>The API follows RESTful principles, making it easy to integrate and interact with from various client applications.</p>
  <p>Key features of this API template include:</p>
  <ul>
    <li>User Registration and Management</li>
    <li>JWT Token-based Authentication</li>
    <li>Role-based Access Control for Protected Routes</li>
    <li>CRUD Operations for User Entities</li>
  </ul>
`

export {
    swaggerOptions,
    swaggerTitle,
    swaggerDescription
}