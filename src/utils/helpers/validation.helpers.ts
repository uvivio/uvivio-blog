export const isEmail = (email: string) =>
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

/**
 * Validates if the given string is a valid email address.
 *
 * @param email - The email address to validate.
 * @returns A boolean indicating whether the email is valid.
 */
export function validateEmail(email: string) {
  const isValid = isEmail(email);
  if (!isValid) return { error: 'Invalid email address', isValid: false };
  return { error: null, isValid: true };
}

export function validateFormFields<T extends Record<string, any>>(
  data: T,
  fields: Array<{ key: keyof T; required: boolean; message: string }>
): { valid: boolean; errors: Array<{ key: keyof T; message: string }> } {
  const errors: Array<{ key: keyof T; message: string }> = fields
    .filter(
      (field) =>
        field.required &&
        (data[field.key] === null ||
          data[field.key] === undefined ||
          !data[field.key])
    )
    .map((field) => ({ key: field.key, message: field.message }));

  return { valid: errors.length === 0, errors };
}
