var soap = require('soap');
var express = require('express');
var fs = require('fs');
var bodyParser = require('body-parser')

// SOAP WS Configuration
const SERVER_PORT = 3001;
const NODO_WSDL = "./wsdl/NodoPerPsp.wsdl";
const NODO_ENDPOINT = "/PagamentiTelematiciPspNodoservice";

// MockedData
const nodoVerificaRPTRispostaOK = require("./mockedData").nodoVerificaRPTRispostaOK
const nodoAttivaRPTRispostaOK = require("./mockedData").nodoAttivaRPTRispostaOK

async function startMockServer() {

  // Configuration for SOAP endpoints and callback handler
  const servicesHandler = {
    PagamentiTelematiciPspNodoservice: {
      PPTPort: {
        nodoVerificaRPT: (
          input,
          callback
        ) => {
          const output = (() => {
            if (
              input.codiceIdRPT.CF === "12345678901" &&
              input.codiceIdRPT.CodStazPA === "12" &&
              input.codiceIdRPT.AuxDigit === "0" &&
              input.codiceIdRPT.CodIUV === "1234567890123"
            ){
              return nodoVerificaRPTRispostaOK;
            }
            return nodoVerificaRPTRispostaKO;
          })();
          logSoapMessages(input, output);
          callback(output);
        },
        nodoAttivaRPT: (
          input,
          callback
        ) => {
          const output = (() => {
            if (
              input.datiPagamentoPSP.importoSingoloVersamento === 100.52 &&
              input.codiceIdRPT.CF === "12345678901" &&
              input.codiceIdRPT.CodStazPA === "12" &&
              input.codiceIdRPT.AuxDigit === "0" &&
              input.codiceIdRPT.CodIUV === "1234567890123"
            ){
              return nodoAttivaRPTRispostaOK;
            }
            return nodoAttivaRPTRispostaKO;
          })();
          logSoapMessages(input, nodoAttivaRPTRispostaOK);
          callback(nodoAttivaRPTRispostaOK);
        }
      }
    }
  };

  // Retrieve the wsdl related to the endpoint and define a starter function to return
  const nodoWsdl = fs.readFileSync(`${NODO_WSDL}`, "UTF-8");
  var app = express();
  app.use(bodyParser.raw({type: function(){return true;}, limit: '5mb'}));
  app.listen(SERVER_PORT, function(){
      soap.listen(app, NODO_ENDPOINT, servicesHandler, nodoWsdl);      
  });
}
console.log("Starting PagoPA Mock Server...");
startMockServer().then(
  console.log(`Server started at http://localhost:${SERVER_PORT} `)
)

// Log SOAP request and response
function logSoapMessages(input, output){
  console.log(`\n=====================`+
              `\nREQUEST:`+
              `\n${JSON.stringify(input)}`+
              `\n\n RESPONSE:`+
              `\n${JSON.stringify(output)}`+
              `\n=====================`);
}