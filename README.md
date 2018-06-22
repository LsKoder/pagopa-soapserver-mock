# pagopa-soapserver-mock
A Soap Server Mocked for PagoPA

# SOAP Endpoints
WSDL on local execution:
http://localhost:3001/PagamentiTelematiciPspNodoservice?wsdl

# Valid requests
VerificaRPT Request

{ 
  codiceIdRPT: {
    CF: "12345678901",
    CodStazPA: "12",
    AuxDigit: "0",
    CodIUV: "1234567890123"
  },
}

AttivaRPT Request
{ 
  codiceIdRPT: {
    CF: "12345678901",
    CodStazPA: "12",
    AuxDigit: "0",
    CodIUV: "1234567890123"
  },
  datiPagamentoPSP: {
    importoSingoloVersamento: 100.52
  }
}