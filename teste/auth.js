const validUsers = [
  { email: 'test@example.com', password: 'password123' }
];

function validateEmail(email) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
}

function login(email, password) {
  if (!validateEmail(email)) {
    return { success: false, message: 'Invalid email format' };
  }
  
  const user = validUsers.find(u => u.email === email && u.password === password);
  
  if (user) {
    return { success: true, message: 'Login successful' };
  } else {
    return { success: false, message: 'Invalid credentials' };
  }
}

module.exports = { validateEmail, login };
