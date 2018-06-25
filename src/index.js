var soap = require('soap');
var express = require('express');
var fs = require('fs');
var bodyParser = require('body-parser')
const uuidv1 = require('uuid/v1');

// SOAP WS Configuration
const PROXY_SERVER_PORT = 3000;
const PROXY_ENDPOINT = "/FespCdService";
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
              // Provide an async response with PaymentId, after a random number of secs
              const asyncResponseDelay = Math.floor(Math.random() * 10)+5; // 5-14 secs
              const paymentId = uuidv1();
              setTimeout(sendPaymentIdToPagoPaProxy, asyncResponseDelay*1000, input.codiceContestoPagamento, paymentId);
              return nodoAttivaRPTRispostaOK; // Return a sync feedback
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

// Send a random paymentId to Proxy PagoPA
function sendPaymentIdToPagoPaProxy(codiceContestoPagamento, paymentId){
  var url = `http://localhost:${PROXY_SERVER_PORT}${PROXY_ENDPOINT}?wsdl`;
  var message = {
    identificativoDominio: "TEST",
    identificativoUnivocoVersamento: "TEST",
    codiceContestoPagamento,
    idPagamento: paymentId
  };
  soap.createClient(url, function(err, client) {
      client.cdInfoPagamento(
        message, function(err, result) {
          console.log(`Message sent. Response: ${result}`);
      });
  });
}


// Log SOAP request and response
function logSoapMessages(input, output){
  console.log(`\n=====================`+
              `\nREQUEST:`+
              `\n${JSON.stringify(input)}`+
              `\n\n RESPONSE:`+
              `\n${JSON.stringify(output)}`+
              `\n=====================`);
}