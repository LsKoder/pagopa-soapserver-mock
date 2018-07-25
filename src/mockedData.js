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
        id: "NodoDeiPagamentiSPC",
        faultCode: "PAA_ATTIVA_RPT_IMPORTO_NON_VALIDO",
        faultString:
          "L’importo del pagamento in attesa non è congruente con il dato indicato dal PSP"
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
        id: "NodoDeiPagamentiSPC",
        faultCode: "PAA_ATTIVA_RPT_IMPORTO_NON_VALIDO",
        faultString:
          "L’importo del pagamento in attesa non è congruente con il dato indicato dal PSP"
      },
      esito: "KO"
    }
  },

  nodoAttivaRPTRispostaKOImporto : {
    nodoAttivaRPTRisposta : {
      fault: {
        id: "NodoDeiPagamentiSPC",
        faultCode: "PAA_ATTIVA_RPT_IMPORTO_NON_VALIDO",
        faultString:
          "L’importo del pagamento in attesa non è congruente con il dato indicato dal PSP"
      },
      esito: "KO"
    }
  }
}