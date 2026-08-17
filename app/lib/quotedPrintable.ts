export function decodeQuotedPrintable(input: string): string {
  const soft = input.replace(/=\r?\n/g, '');
  const bytes: number[] = [];
  for (let i = 0; i < soft.length; i++) {
    if (soft[i] === '=' && /^[0-9A-Fa-f]{2}$/.test(soft.slice(i + 1, i + 3))) {
      bytes.push(parseInt(soft.slice(i + 1, i + 3), 16)); i += 2;
    } else {
      const encoded = new TextEncoder().encode(soft[i]); bytes.push(...encoded);
    }
  }
  try { return new TextDecoder('utf-8').decode(new Uint8Array(bytes)); } catch { return soft; }
}
