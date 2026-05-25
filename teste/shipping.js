// Base fares by region based on ZIP code prefix
// 01000-09999: São Paulo - SP -> R$ 10.00
// 20000-23999: Rio de Janeiro - RJ -> R$ 15.00
// Outros -> R$ 25.00

function calculateShipping(zipCode) {
  if (!zipCode) {
    throw new Error('CEP inválido');
  }

  const cleanZip = String(zipCode).replace(/\D/g, '');
  
  if (cleanZip.length !== 8) {
    throw new Error('CEP inválido');
  }

  const prefix = parseInt(cleanZip.substring(0, 5), 10);

  if (prefix >= 1000 && prefix <= 9999) {
    return 10.00;
  } else if (prefix >= 20000 && prefix <= 23999) {
    return 15.00;
  } else {
    return 25.00;
  }
}

module.exports = { calculateShipping };
