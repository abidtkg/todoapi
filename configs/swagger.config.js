const swaggerJsDoc = require('swagger-jsdoc');
// SWAGGER CONFIGARATION
const swaggerOptions = {
    swaggerDefinition: {
      openapi: '3.0.0',
        info: {
            title: "Todo API",
            description: "Todo Application API Specification",
            termsOfService: "",
            version: "1.0.0"
        },
        contact: {
            name: "API Support",
            url: "#",
            email: "contact@abid.app"
        },
        servers: [
            {
              "url": "http://localhost:3000",
              "description": "Development server"
            }
          ],
        securityDefinitions: {
          APIKeyHeader: {
            type: 'apiKey',
            in: 'header',
            name: 'token'
          },
        }
    },

    apis: ['routes/*.js']
}
const swaggerDocs = swaggerJsDoc(swaggerOptions);
module.exports = swaggerDocs;