module.exports = {
  nodoVerificaRPTRispostaOK : {
    nodoVerificaRPTRisposta: {
      esito: "OK",
      datiPagamentoPA: {
        importoSingoloVersamento: 100.52,
        ibanAccredito: "IT17X0605502100000001234567",
        bicAccredito: "BPPIITRR",
        enteBeneficiario: {
          identificativoUnivocoBeneficiario: {
            tipoIdentificativoUnivoco: "G",
            codiceIdentificativoUnivoco: "123"
          },
          denominazioneBeneficiario: "Comune di Canicattì",
          codiceUnitOperBeneficiario: "01",
          denomUnitOperBeneficiario: "CDC",
          indirizzoBeneficiario: "Via Roma",
          civicoBeneficiario: "23",
          capBeneficiario: "92010",
          localitaBeneficiario: "Canicattì",
          provinciaBeneficiario: "Agrigento",
          nazioneBeneficiario: "IT"
        },
        credenzialiPagatore: "Mario Rossi",
        causaleVersamento: "IMU 2018"
      }
    }
  },

  nodoVerificaRPTRispostaKO : {
    nodoVerificaRPTRisposta: {
      fault: {
        faultCode: "01",
        faultString: "Fault Error String Example",
        id: "ID_EXAMPLE",
      },
      esito: "KO"
    }
  },

  nodoAttivaRPTRispostaOK : {
    nodoAttivaRPTRisposta: {
      esito: "OK",
      datiPagamentoPA: {
        importoSingoloVersamento: 100.52,
        ibanAccredito: "IT17X0605502100000001234567",
        bicAccredito: "BPPIITRR",
        enteBeneficiario: {
          identificativoUnivocoBeneficiario: {
            tipoIdentificativoUnivoco: "G",
            codiceIdentificativoUnivoco: "123"
          },
          denominazioneBeneficiario: "Comune di Canicattì",
          codiceUnitOperBeneficiario: "01",
          denomUnitOperBeneficiario: "CDC",
          indirizzoBeneficiario: "Via Roma",
          civicoBeneficiario: "23",
          capBeneficiario: "92010",
          localitaBeneficiario: "Canicattì",
          provinciaBeneficiario: "Agrigento",
          nazioneBeneficiario: "IT"
        },    
        credenzialiPagatore: "Mario Rossi",
        causaleVersamento: "IMU 2018"
      }
    }
  },

  nodoAttivaRPTRispostaKO : {
    nodoAttivaRPTRisposta : {
      fault: {
        faultCode: "01",
        faultString: "Fault Error String Example",
        id: "ID_EXAMPLE",
      },
      esito: "KO"
    }
  }
}