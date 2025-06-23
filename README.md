# Lyrics Prosody Analyzer

A powerful TypeScript library for analyzing the prosody of lyrics and poetry, including stanzas, verses, rhyme patterns, syllable counting, and Italian sinalefe support.

## Features

- 🎵 **Lyrics Parsing**: Parse lyrics into structured stanzas and verses
- 🎭 **Rhyme Pattern Detection**: Automatically detect rhyme patterns (AABB, ABAB, ABCB, etc.)
- 🔤 **Rhyme Classification**: Identify rhyme types (perfect rhyme, assonance, consonance)
- 📏 **Syllable Counting**: Accurate syllable counting for English and Italian
- 🇮🇹 **Italian Sinalefe Support**: Advanced vowel elision detection for Italian poetry
- 📊 **JSON Output**: Clean, structured JSON output for easy integration
- 🛠️ **CLI Tool**: Command-line interface for quick analysis
- 📦 **TypeScript**: Full TypeScript support with type definitions

## Installation

```bash
npm install lyrics-prosody-analyzer
```

## Usage

### As a Library

```typescript
import { parseLyrics } from 'lyrics-prosody-analyzer';

const lyrics = `Roses are red
Violets are blue
Sugar is sweet
And so are you`;

const result = parseLyrics(lyrics);
console.log(JSON.stringify(result, null, 2));
```

### As a CLI Tool

```bash
# Install globally
npm install -g lyrics-prosody-analyzer

# Use the CLI
lyrics-prosody "Your lyrics here"

# With title
lyrics-prosody "Twinkle twinkle little star\\nHow I wonder what you are" "Nursery Rhyme"
```

### Local CLI Usage

```bash
npm install lyrics-prosody-analyzer
npx lyrics-prosody "Your lyrics here"
```

## API Reference

### `parseLyrics(lyrics: string): ParsedLyrics`

Parses lyrics text and returns structured analysis.

**Parameters:**
- `lyrics` (string): The lyrics text to parse

**Returns:** `ParsedLyrics` object containing:
- `stanzas`: Array of stanza objects

### Data Types

```typescript
interface ParsedLyrics {
  stanzas: Stanza[];
}

interface Stanza {
  index: number;
  verses: Verse[];
  rhyme_pattern: string;
}

interface Verse {
  index: number;
  text: string;
  rhyme_index: string;
  rhyming_syllable: string;
  rhyme_type: 'rhyme' | 'assonance' | 'consonance' | 'none';
  syllable_count: number;
}
```

## Example Output

```json
{
  "stanzas": [
    {
      "index": 1,
      "verses": [
        {
          "index": 1,
          "text": "Roses are red",
          "rhyme_index": "A",
          "rhyming_syllable": "ed",
          "rhyme_type": "rhyme",
          "syllable_count": 3
        },
        {
          "index": 2,
          "text": "Violets are blue",
          "rhyme_index": "B",
          "rhyming_syllable": "ue",
          "rhyme_type": "rhyme",
          "syllable_count": 4
        },
        {
          "index": 3,
          "text": "Sugar is sweet",
          "rhyme_index": "C",
          "rhyming_syllable": "eet",
          "rhyme_type": "rhyme",
          "syllable_count": 3
        },
        {
          "index": 4,
          "text": "And so are you",
          "rhyme_index": "B",
          "rhyming_syllable": "ue",
          "rhyme_type": "rhyme",
          "syllable_count": 3
        }
      ],
      "rhyme_pattern": "ABCB"
    }
  ]
}
```

## Italian Poetry Support

The library includes advanced support for Italian poetry:

- **Sinalefe Detection**: Automatic detection of vowel elision between words
- **Accurate Syllable Counting**: Considers Italian phonetic rules
- **Assonance Patterns**: Recognizes Italian assonance patterns

```typescript
const italianLyrics = \`Quando non c'era l'iPhone, l'alba senza il filtro
Somigliava a Zion, le scritte in un dipinto\`;

const result = parseLyrics(italianLyrics);
// Correctly detects assonance between "filtro" and "dipinto"
// Applies sinalefe for accurate syllable counting
```

## Rhyme Types

- **Perfect Rhyme**: Identical ending sounds (cat/hat, red/bed)
- **Assonance**: Similar vowel sounds (filtro/dipinto in Italian)
- **Consonance**: Similar consonant sounds
- **None**: No rhyming relationship detected

## Rhyme Patterns

Common patterns detected:
- **AABB**: Couplets (consecutive rhyming lines)
- **ABAB**: Alternating rhyme
- **ABCB**: Second and fourth lines rhyme
- **AAAA**: All lines rhyme
- **ABCD**: No rhyming pattern

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if necessary
5. Submit a pull request

## License

MIT License - see LICENSE file for details.

## Author

Edoardo Pachera

## Keywords

lyrics, prosody, poetry, rhyme, syllables, verse, stanza, parser, analyzer, typescript, italian, sinalefe, assonance, consonance, rhyme-pattern, meter, scansion

## Installation

```bash
npm install
```

## Usage

### Basic Usage

```typescript
import { parseLyrics } from './src/index';

const lyrics = `Twinkle, twinkle, little star
How I wonder what you are
Up above the world so high
Like a diamond in the sky`;

const result = parseLyrics(lyrics);
console.log(result);
```

### Output Structure

```typescript
interface ParsedLyrics {
  stanzas: Stanza[];
}

interface Stanza {
  index: number;           // Stanza number (1, 2, 3, ...)
  verses: Verse[];         // Array of verses in the stanza
  rhyme_pattern: string;   // Pattern like "ABAB", "ABBA", etc.
}

interface Verse {
  index: number;           // Verse number within stanza (1, 2, 3, ...)
  text: string;           // The actual verse text
  rhyme_index: string;    // Rhyme letter (A, B, C, ...)
  rhyming_syllable: string; // The detected rhyming sound
}
```

## Example Output

```json
{
  "stanzas": [
    {
      "index": 1,
      "verses": [
        {
          "index": 1,
          "text": "Twinkle, twinkle, little star",
          "rhyme_index": "A",
          "rhyming_syllable": "ar"
        },
        {
          "index": 2,
          "text": "How I wonder what you are",
          "rhyme_index": "A",
          "rhyming_syllable": "are"
        }
      ],
      "rhyme_pattern": "AA"
    }
  ]
}
```

## Supported Rhyme Patterns

The parser can detect various rhyme patterns including:
- **AABB** - Couplets
- **ABAB** - Alternating rhyme
- **ABBA** - Enclosed rhyme
- **AAAA** - Monorhyme
- **ABCC, ABCD** - Mixed patterns
- And many more combinations

## Scripts

- `npm test` - Run the test examples
- `npm run build` - Compile TypeScript to JavaScript
- `npm run dev` - Run the main index file

## Advanced Usage

### Using the LyricsParser Class

```typescript
import { LyricsParser } from './src/lyrics-parser';

const parser = new LyricsParser();
const result = parser.parseLyrics(lyrics);
```

### Utility Functions

```typescript
import { extractRhymingSyllable, wordsRhyme, getLastWord } from './src/rhyme-utils';

// Extract rhyming syllable from a word
const syllable = extractRhymingSyllable("singing"); // Returns "ing"

// Check if two words rhyme
const doRhyme = wordsRhyme("cat", "hat"); // Returns true

// Get the last word from a line
const lastWord = getLastWord("The cat in the hat"); // Returns "hat"
```

## How It Works

1. **Stanza Splitting**: Lyrics are split into stanzas using double newlines
2. **Verse Parsing**: Each stanza is split into individual verses (lines)
3. **Rhyme Detection**: The last word of each verse is analyzed for rhyming sounds
4. **Pattern Analysis**: Verses are compared to determine which ones rhyme
5. **Pattern Assignment**: Each verse gets a rhyme index (A, B, C, etc.) and the overall pattern is determined

## Limitations

- Rhyme detection is based on phonetic similarities and common English patterns
- Perfect accuracy for all types of rhymes may vary
- Works best with standard English lyrics and poetry

## License

MIT
