var soap = require('soap');
var express = require('express');
var fs = require('fs');
var bodyParser = require('body-parser')
const uuidv1 = require('uuid/v1');

// SOAP WS Configuration
const PROXY_SERVER_PORT = 3000;
const PROXY_ENDPOINT = "/FespCdService";
const SERVER_PORT = Number(process.env.PORT) || 3001;
const NODO_WSDL = "./wsdl/NodoPerPsp.wsdl";
const NODO_ENDPOINT = "/PagamentiTelematiciPspNodoservice";

// MockedData
const nodoVerificaRPTRispostaOK = require("./mockedData").nodoVerificaRPTRispostaOK
const nodoAttivaRPTRispostaOK = require("./mockedData").nodoAttivaRPTRispostaOK
const nodoVerificaRPTRispostaKO = require("./mockedData").nodoVerificaRPTRispostaKO
const nodoAttivaRPTRispostaKO = require("./mockedData").nodoAttivaRPTRispostaKO

async function startMockServer() {

  // Configuration for SOAP endpoints and callback handler
  const servicesHandler = {
    PagamentiTelematiciPspNodoservice: {
      PPTPort: {
        nodoVerificaRPT: (
          input,
          callback,
          headers,
          req
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
          callback,
          headers,
          req
        ) => {
          const output = (() => {
            if (
              input.datiPagamentoPSP.importoSingoloVersamento === String(100.52) &&
              input.codiceIdRPT.CF === "12345678901" &&
              input.codiceIdRPT.CodStazPA === "12" &&
              input.codiceIdRPT.AuxDigit === "0" &&
              input.codiceIdRPT.CodIUV === "1234567890123"
            ){
              // Provide an async response with PaymentId, after a random number of secs
              const asyncResponseDelay = Math.floor(Math.random() * 10)+5; // 5-14 secs
              const paymentId = uuidv1().replace(new RegExp("-", "g"), "");
              setTimeout(sendPaymentIdToPagoPaProxy, asyncResponseDelay*1000, input.codiceContestoPagamento, paymentId, req.connection.remoteAddress.replace("::ffff:",""));
              return nodoAttivaRPTRispostaOK; // Return a sync feedback
            }
            return nodoAttivaRPTRispostaKO;
          })();
          logSoapMessages(input, output);
          callback(output);
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
      console.log(`Server started at http://localhost:${SERVER_PORT} `)  
  });
}
console.log("Starting PagoPA Mock Server...");
startMockServer();

// Send a random paymentId to Proxy PagoPA
function sendPaymentIdToPagoPaProxy(codiceContestoPagamento, paymentId, remoteAddress){
  var url = `http://${remoteAddress}:${PROXY_SERVER_PORT}${PROXY_ENDPOINT}?wsdl`;
  var message = {
      identificativoDominio: "TEST",
      identificativoUnivocoVersamento: "TEST",
      codiceContestoPagamento,
      idPagamento: paymentId
  };
  soap.createClient(url, 
    {
      endpoint: url
    },
    function(err, client) {
    if (err!==undefined && err!==null){
      logSoapMessages(message, "CONNECTION ERROR: "+err);
      return;
    }
    client.cdInfoPagamento(
      message, function(err, response) {
        if (err!==undefined && err!==null){
          logSoapMessages(message, "CLIENT ERROR: "+err);
          return;
        }
        logSoapMessages(message, response);
      }
    );
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