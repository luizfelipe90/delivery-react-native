const { calculateShipping } = require('./shipping');

describe('Módulo de Calculo de Frete (shipping.js)', () => {
  describe('Cálculo base para diferentes CEPs', () => {
    it('deve calcular o frete para São Paulo (prefixo 01000 a 09999)', () => {
      expect(calculateShipping('01001-000')).toBe(10.00); // SP Centro
      expect(calculateShipping('04538133')).toBe(10.00);  // SP Itaim
    });

    it('deve calcular o frete para Rio de Janeiro (prefixo 20000 a 23999)', () => {
      expect(calculateShipping('20040-020')).toBe(15.00); // RJ Centro
      expect(calculateShipping('22290240')).toBe(15.00);  // RJ Botafogo
    });

    it('deve calcular o frete para outras regiões', () => {
      expect(calculateShipping('30130-000')).toBe(25.00); // MG
      expect(calculateShipping('80010-000')).toBe(25.00); // PR
    });

    it('deve lançar erro para CEP inválido', () => {
      expect(() => calculateShipping('01001')).toThrow('CEP inválido');
      expect(() => calculateShipping('abcdefgh')).toThrow('CEP inválido');
      expect(() => calculateShipping('')).toThrow('CEP inválido');
    });
  });
});
