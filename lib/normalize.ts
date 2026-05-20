export function normalizeText(value: string) {
  return value
    .trim()
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/\s+/g, " ")
    .toLocaleLowerCase("en-US");
}

export function createParticipantKey(fullName: string, company: string) {
  return `${normalizeText(fullName)}::${normalizeText(company)}`;
}
