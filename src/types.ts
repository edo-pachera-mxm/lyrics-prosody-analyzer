// Types for the lyrics parser
export interface Verse {
  index: number;
  text: string;
  rhyme_index: string;
  rhyming_syllable: string;
  rhyme_type: 'rhyme' | 'assonance' | 'consonance' | 'none' | '';
  syllable_count: number;
}

export interface Stanza {
  index: number;
  verses: Verse[];
  rhyme_pattern: string;
}

export interface ParsedLyrics {
  stanzas: Stanza[];
}
