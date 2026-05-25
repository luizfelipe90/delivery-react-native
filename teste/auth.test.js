const { validateEmail, login } = require('./auth');

describe('Módulo de Autenticação (auth.js)', () => {
  describe('Validação de formato de e-mail', () => {
    it('deve retornar true para e-mails válidos', () => {
      expect(validateEmail('test@example.com')).toBe(true);
      expect(validateEmail('user.name+tag@domain.co')).toBe(true);
    });

    it('deve retornar false para e-mails inválidos', () => {
      expect(validateEmail('test@example')).toBe(false);
      expect(validateEmail('test.com')).toBe(false);
      expect(validateEmail('@example.com')).toBe(false);
      expect(validateEmail('')).toBe(false);
    });
  });

  describe('Fluxo de login com credenciais corretas/incorretas', () => {
    it('deve logar com sucesso com credenciais corretas', () => {
      const result = login('test@example.com', 'password123');
      expect(result).toEqual({ success: true, message: 'Login successful' });
    });

    it('deve falhar com senha incorreta', () => {
      const result = login('test@example.com', 'wrongpassword');
      expect(result).toEqual({ success: false, message: 'Invalid credentials' });
    });

    it('deve falhar com e-mail não cadastrado', () => {
      const result = login('notfound@example.com', 'password123');
      expect(result).toEqual({ success: false, message: 'Invalid credentials' });
    });
    
    it('deve falhar se o e-mail for inválido', () => {
      const result = login('invalid-email', 'password123');
      expect(result).toEqual({ success: false, message: 'Invalid email format' });
    });
  });
});
