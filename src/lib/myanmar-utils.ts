/**
 * Myanmar Text Processing Utilities
 * Handles Zawgyi detection and conversion to Unicode
 */

// Basic Zawgyi detection patterns
const ZAWGYI_PATTERNS = [
  /[\u1000-\u109F][\u1060-\u109F]/,  // Zawgyi specific ranges
  /\u1031[\u1000-\u1021]/,          // Vowel E before consonant (Zawgyi order)
  /[\u1000-\u1021]\u103A\u1031/,    // Consonant + Asat + E vowel
  /\u1031\u1000/,                   // E vowel + Ka (common Zawgyi pattern)
];

// Unicode Myanmar ranges
const UNICODE_MYANMAR_RANGE = /[\u1000-\u109F\uAA60-\uAA7F]/;

/**
 * Detects if text contains Zawgyi encoding
 */
export function isZawgyi(text: string): boolean {
  if (!text || typeof text !== 'string') return false;
  
  // Check for Myanmar script first
  if (!UNICODE_MYANMAR_RANGE.test(text)) return false;
  
  // Check for Zawgyi-specific patterns
  return ZAWGYI_PATTERNS.some(pattern => pattern.test(text));
}

/**
 * Basic Zawgyi to Unicode conversion
 * Note: This is a simplified conversion. For production, use a proper library like myanmar-tools
 */
export function zawgyiToUnicode(text: string): string {
  if (!isZawgyi(text)) return text;
  
  // Basic character mappings (simplified)
  const mappings: Record<string, string> = {
    // Vowel reordering
    '\u1031\u1000': '\u1000\u1031',  // E + Ka -> Ka + E
    '\u1031\u1001': '\u1001\u1031',  // E + Kha -> Kha + E
    '\u1031\u1002': '\u1002\u1031',  // E + Ga -> Ga + E
    '\u1031\u1003': '\u1003\u1031',  // E + Gha -> Gha + E
    '\u1031\u1004': '\u1004\u1031',  // E + Nga -> Nga + E
    '\u1031\u1005': '\u1005\u1031',  // E + Ca -> Ca + E
    '\u1031\u1006': '\u1006\u1031',  // E + Cha -> Cha + E
    '\u1031\u1007': '\u1007\u1031',  // E + Ja -> Ja + E
    '\u1031\u1008': '\u1008\u1031',  // E + Jha -> Jha + E
    '\u1031\u1009': '\u1009\u1031',  // E + Nya -> Nya + E
    '\u1031\u100A': '\u100A\u1031',  // E + Nnya -> Nnya + E
    '\u1031\u100B': '\u100B\u1031',  // E + Ta -> Ta + E
    '\u1031\u100C': '\u100C\u1031',  // E + Tha -> Tha + E
    '\u1031\u100D': '\u100D\u1031',  // E + Da -> Da + E
    '\u1031\u100E': '\u100E\u1031',  // E + Dha -> Dha + E
    '\u1031\u100F': '\u100F\u1031',  // E + Na -> Na + E
    '\u1031\u1010': '\u1010\u1031',  // E + Ta -> Ta + E
    '\u1031\u1011': '\u1011\u1031',  // E + Tha -> Tha + E
    '\u1031\u1012': '\u1012\u1031',  // E + Da -> Da + E
    '\u1031\u1013': '\u1013\u1031',  // E + Dha -> Dha + E
    '\u1031\u1014': '\u1014\u1031',  // E + Na -> Na + E
    '\u1031\u1015': '\u1015\u1031',  // E + Pa -> Pa + E
    '\u1031\u1016': '\u1016\u1031',  // E + Pha -> Pha + E
    '\u1031\u1017': '\u1017\u1031',  // E + Ba -> Ba + E
    '\u1031\u1018': '\u1018\u1031',  // E + Bha -> Bha + E
    '\u1031\u1019': '\u1019\u1031',  // E + Ma -> Ma + E
    '\u1031\u101A': '\u101A\u1031',  // E + Ya -> Ya + E
    '\u1031\u101B': '\u101B\u1031',  // E + Ra -> Ra + E
    '\u1031\u101C': '\u101C\u1031',  // E + La -> La + E
    '\u1031\u101D': '\u101D\u1031',  // E + Wa -> Wa + E
    '\u1031\u101E': '\u101E\u1031',  // E + Sa -> Sa + E
    '\u1031\u101F': '\u101F\u1031',  // E + Ha -> Ha + E
    '\u1031\u1020': '\u1020\u1031',  // E + Lla -> Lla + E
    '\u1031\u1021': '\u1021\u1031',  // E + A -> A + E
  };
  
  let result = text;
  
  // Apply mappings
  for (const [zawgyi, unicode] of Object.entries(mappings)) {
    result = result.replace(new RegExp(zawgyi, 'g'), unicode);
  }
  
  return result;
}

/**
 * Normalizes Myanmar text to ensure proper Unicode encoding
 */
export function normalizeMyanmarText(text: string): string {
  if (!text || typeof text !== 'string') return '';
  
  // Convert Zawgyi to Unicode if detected
  let normalized = isZawgyi(text) ? zawgyiToUnicode(text) : text;
  
  // Normalize Unicode (NFC form)
  normalized = normalized.normalize('NFC');
  
  return normalized;
}

/**
 * Validates if text contains Myanmar script
 */
export function isMyanmarText(text: string): boolean {
  if (!text || typeof text !== 'string') return false;
  return UNICODE_MYANMAR_RANGE.test(text);
}

/**
 * Generates a URL-friendly slug from Myanmar text
 */
export function createMyanmarSlug(text: string): string {
  if (!text) return '';
  
  // Normalize the text first
  const normalized = normalizeMyanmarText(text);
  
  // Create slug
  return normalized
    .toLowerCase()
    .trim()
    .replace(/[\s\u1000-\u109F\uAA60-\uAA7F]+/g, '-') // Replace Myanmar chars and spaces with hyphens
    .replace(/[^\w\-]+/g, '') // Remove non-word chars except hyphens
    .replace(/\-\-+/g, '-') // Replace multiple hyphens with single hyphen
    .replace(/^-+/, '') // Remove leading hyphens
    .replace(/-+$/, ''); // Remove trailing hyphens
}

/**
 * Truncates Myanmar text while preserving word boundaries
 */
export function truncateMyanmarText(text: string, maxLength: number): string {
  if (!text || text.length <= maxLength) return text;
  
  const normalized = normalizeMyanmarText(text);
  
  if (normalized.length <= maxLength) return normalized;
  
  // Find the last space or Myanmar word boundary before maxLength
  const truncated = normalized.substring(0, maxLength);
  const lastSpace = Math.max(
    truncated.lastIndexOf(' '),
    truncated.lastIndexOf('\u1000'), // Myanmar Ka
    truncated.lastIndexOf('\u104A'), // Myanmar sign little section
    truncated.lastIndexOf('\u104B')  // Myanmar sign section
  );
  
  if (lastSpace > maxLength * 0.8) {
    return truncated.substring(0, lastSpace) + '...';
  }
  
  return truncated + '...';
}