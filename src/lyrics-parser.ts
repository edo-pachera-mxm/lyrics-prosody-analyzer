import { Verse, Stanza, ParsedLyrics } from './types';
import { extractRhymingSyllable, analyzeRhyme, wordsRhyme, getLastWord, countSyllables } from './rhyme-utils';

/**
 * Main class for analyzing lyrics prosody including rhyme patterns and syllable counting
 */
export class LyricsParser {
  
  /**
   * Parse lyrics text into structured stanzas and verses
   */
  public parseLyrics(lyrics: string): ParsedLyrics {
    const stanzas = this.splitIntoStanzas(lyrics);
    const parsedStanzas: Stanza[] = [];

    stanzas.forEach((stanzaText, stanzaIndex) => {
      const verses = this.parseStanzaIntoVerses(stanzaText, stanzaIndex);
      const rhymePattern = this.determineRhymePattern(verses);
      
      parsedStanzas.push({
        index: stanzaIndex + 1,
        verses,
        rhyme_pattern: rhymePattern
      });
    });

    return { stanzas: parsedStanzas };
  }

  /**
   * Split lyrics into stanzas (separated by empty lines)
   */
  private splitIntoStanzas(lyrics: string): string[] {
    return lyrics
      .split(/\n\s*\n/)  // Split on double newlines
      .map(stanza => stanza.trim())
      .filter(stanza => stanza.length > 0);
  }

  /**
   * Parse a single stanza into verses
   */
  private parseStanzaIntoVerses(stanzaText: string, stanzaIndex: number): Verse[] {
    const lines = stanzaText
      .split('\n')
      .map(line => line.trim())
      .filter(line => line.length > 0);

    return lines.map((line, lineIndex) => {
      const lastWord = getLastWord(line);
      const rhymingSyllable = extractRhymingSyllable(lastWord);
      const syllableCount = countSyllables(line);
      
      return {
        index: lineIndex + 1,
        text: line,
        rhyme_index: '', // Will be set by determineRhymePattern
        rhyming_syllable: rhymingSyllable,
        rhyme_type: '', // Will be updated by determineRhymePattern
        syllable_count: syllableCount
      };
    });
  }

  /**
   * Determine the rhyme pattern for a stanza and assign rhyme indices
   */
  private determineRhymePattern(verses: Verse[]): string {
    if (verses.length === 0) return '';

    const rhymeGroups: { [key: string]: { verses: number[]; type: 'rhyme' | 'assonance' | 'consonance' | 'none' } } = {};
    const rhymeIndices: string[] = [];
    let currentRhymeIndex = 0;

    // Group verses by rhyming sounds
    verses.forEach((verse, index) => {
      let foundRhyme = false;
      
      // Check if this verse rhymes with any previous verses
      for (let i = 0; i < index; i++) {
        const previousVerse = verses[i];
        const previousLastWord = getLastWord(previousVerse.text);
        const currentLastWord = getLastWord(verse.text);
        
        const rhymeAnalysis = analyzeRhyme(previousLastWord, currentLastWord);
        
        if (rhymeAnalysis.rhymes) {
          // Found a rhyme with a previous verse
          const rhymeIndex = rhymeIndices[i];
          rhymeIndices[index] = rhymeIndex;
          verse.rhyme_index = rhymeIndex;
          
          // Add this verse to the existing rhyme group
          rhymeGroups[rhymeIndex].verses.push(index);
          
          // Update the rhyme type for the group (prioritize more specific types)
          const currentGroupType = rhymeGroups[rhymeIndex].type;
          if (rhymeAnalysis.type === 'rhyme') {
            rhymeGroups[rhymeIndex].type = 'rhyme';
          } else if (rhymeAnalysis.type === 'assonance' && currentGroupType !== 'rhyme') {
            rhymeGroups[rhymeIndex].type = 'assonance';
          } else if (rhymeAnalysis.type === 'consonance' && currentGroupType === 'none') {
            rhymeGroups[rhymeIndex].type = 'consonance';
          }
          
          foundRhyme = true;
          break;
        }
      }
      
      if (!foundRhyme) {
        // This is a new rhyme sound
        const newRhymeIndex = String.fromCharCode(65 + currentRhymeIndex); // A, B, C, etc.
        rhymeIndices[index] = newRhymeIndex;
        verse.rhyme_index = newRhymeIndex;
        
        // Create a new rhyme group
        rhymeGroups[newRhymeIndex] = {
          verses: [index],
          type: 'none' // Will be updated when we find a match
        };
        
        currentRhymeIndex++;
      }
    });

    // Apply the determined rhyme type to all verses in each group
    Object.keys(rhymeGroups).forEach(rhymeIndex => {
      const group = rhymeGroups[rhymeIndex];
      // If only one verse in group, it doesn't rhyme with anything - set empty string
      const finalType = group.verses.length === 1 ? '' : (group.type === 'none' ? 'rhyme' : group.type);
      group.verses.forEach(verseIndex => {
        verses[verseIndex].rhyme_type = finalType;
      });
    });

    // Build the rhyme pattern string
    return rhymeIndices.join('');
  }
}

/**
 * Convenience function to parse lyrics
 */
export function parseLyrics(lyrics: string): ParsedLyrics {
  const parser = new LyricsParser();
  return parser.parseLyrics(lyrics);
}
