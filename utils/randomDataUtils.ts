export function generateUniqueId(): string {
  return `${Date.now()}${Math.floor(Math.random() * 10_000)}`;
}

export function generateEmail(): string {
  return `test_${generateUniqueId()}@example.com`;
}

export function generatePhoneNumber(): string {
  return `9${Math.floor(100_000_000 + Math.random() * 900_000_000)}`;
}

export function generateFirstName(): string {
  const names = ['John', 'David', 'Michael', 'Robert', 'Daniel'];

  return names[Math.floor(Math.random() * names.length)];
}

export function generateLastName(): string {
  const names = ['Smith', 'Johnson', 'Brown', 'Wilson', 'Taylor'];

  return names[Math.floor(Math.random() * names.length)];
}

export function generateFullName(): string {
  return `${generateFirstName()} ${generateLastName()}`;
}

export function generateDate(): string {
  return new Date().toISOString().split('T')[0];
}

export function generateAddress(): string {
  return `${Math.floor(1 + Math.random() * 999)} Test Street`;
}

export function generateCity(): string {
  return 'Pune';
}

export function generateState(): string {
  return 'Maharashtra';
}

export function generatePostalCode(): string {
  return `${Math.floor(100_000 + Math.random() * 900_000)}`;
}

export function generateCustomer() {
  const firstName = generateFirstName();
  const lastName = generateLastName();

  return {
    firstName,
    lastName,
    fullName: `${firstName} ${lastName}`,
    email: generateEmail(),
    phone: generatePhoneNumber(),
    address: generateAddress(),
    city: generateCity(),
    state: generateState(),
    postalCode: generatePostalCode(),
    date: generateDate()
  };
}