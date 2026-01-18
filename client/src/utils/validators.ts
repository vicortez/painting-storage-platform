export const validateUserFullName = (name: string): string[] => {
  const errors = []
  if (!name.trim() || name.trim().length < 2) {
    errors.push('Nome deve ter pelo menos 2 caracteres')
  }
  return errors
}

export const validateEmail = (email: string): string[] => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  const errors = []
  if (!email.trim() || !emailRegex.test(email)) {
    errors.push('Email inválido')
  }
  return errors
}

export const validateUserPassword = (password: string): string[] => {
  const errors = []
  if (password.trim().length < 3) {
    errors.push('Senha deve ter pelo menos 3 caracteres')
  }
  return errors
}
