# pagopa-soapserver-mock
A Soap Server Mocked for PagoPA

# SOAP Endpoints
WSDL on local execution:
http://localhost:3001/PagamentiTelematiciPspNodoservice?wsdl

# Valid requests
>VerificaRPT Request
```javascript
{ 
  codiceIdRPT: {
    CF: "12345678901",
    CodStazPA: "12",
    AuxDigit: "0",
    CodIUV: "1234567890123"
  }
}
```

>AttivaRPT Request
```javascript
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
```

After a successfully "AttivaRPT Request" (esito: OK), an async cdInfoPagamento request will be sent to http://localhost:3001/FespCdService?wsdl (random delay set to 5-14 seconds).
It contains a random paymentId and the codiceContestoPagamento provided into the request