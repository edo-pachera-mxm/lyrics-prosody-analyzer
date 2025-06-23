# Lyrics Prosody Analyzer

A powerful TypeScript library for analyzing the prosody of lyrics and poetry, with support for English and Italian languages, including stanzas, verses, rhyme patterns, syllable counting, and advanced Italian sinalefe detection.

## 🌟 Features

- 🎵 **Lyrics Parsing**: Parse lyrics into structured stanzas and verses
- 🎭 **Rhyme Pattern Detection**: Automatically detect rhyme patterns (AABB, ABAB, ABCB, etc.)
- 🔤 **Rhyme Classification**: Identify rhyme types (perfect rhyme, assonance, consonance)
- 📏 **Syllable Counting**: Accurate syllable counting for English and Italian
- 🌍 **Multi-Language Support**: Currently supports English and Italian
- 🇮🇹 **Italian Sinalefe Support**: Advanced vowel elision detection for Italian poetry
- 📊 **JSON Output**: Clean, structured JSON output for easy integration
- 🛠️ **CLI Tool**: Command-line interface for quick analysis
- 📦 **TypeScript**: Full TypeScript support with type definitions

## 📦 Installation

```bash
npm install lyrics-prosody-analyzer
```

For global CLI usage:
```bash
npm install -g lyrics-prosody-analyzer
```

## 🚀 Quick Start

### As a Library

```typescript
import { parseLyrics } from 'lyrics-prosody-analyzer';

const lyrics = `The cat in the hat
Makes me laugh today
The moon shines bright
In the pale moonlight`;

const result = parseLyrics(lyrics);
console.log(JSON.stringify(result, null, 2));
```

### As a CLI Tool

```bash
# Basic usage
lyrics-prosody "Your lyrics here"

# With custom title
lyrics-prosody "The cat in the hat\\nMakes me laugh today\\nThe moon shines bright\\nIn the pale moonlight" "Example Poem"

# JSON output
lyrics-prosody "Your lyrics here" --json
```

### Local CLI Usage (without global installation)

```bash
npx lyrics-prosody "Your lyrics here"
```

## 📖 API Reference

### Main Function

#### `parseLyrics(lyrics: string): ParsedLyrics`

Parses lyrics text and returns structured analysis.

**Parameters:**
- `lyrics` (string): The lyrics text to parse

**Returns:** `ParsedLyrics` object containing analyzed stanzas

### Data Types

```typescript
interface ParsedLyrics {
  stanzas: Stanza[];
}

interface Stanza {
  index: number;                    // Stanza number (1, 2, 3, ...)
  verses: Verse[];                  // Array of verses in the stanza
  rhyme_pattern: string;            // Pattern like "ABAB", "ABBA", etc.
}

interface Verse {
  index: number;                    // Verse number within stanza (1, 2, 3, ...)
  text: string;                     // The actual verse text
  rhyme_index: string;              // Rhyme letter (A, B, C, ...)
  rhyming_syllable: string;         // The detected rhyming sound
  rhyme_type: 'rhyme' | 'assonance' | 'consonance' | 'none';
  syllable_count: number;           // Number of syllables in the verse
}
```

### Advanced Usage

#### Using the LyricsParser Class

```typescript
import { LyricsParser } from 'lyrics-prosody-analyzer';

const parser = new LyricsParser();
const result = parser.parseLyrics(lyrics);
```

#### Utility Functions

```typescript
import { extractRhymingSyllable, wordsRhyme, getLastWord } from 'lyrics-prosody-analyzer';

// Extract rhyming syllable from a word
const syllable = extractRhymingSyllable("singing"); // Returns "ing"

// Check if two words rhyme
const doRhyme = wordsRhyme("cat", "hat"); // Returns true

// Get the last word from a line
const lastWord = getLastWord("The cat in the hat"); // Returns "hat"
```

## 📊 Example Output

```json
{
  "stanzas": [
    {
      "index": 1,
      "verses": [
        {
          "index": 1,
          "text": "The cat in the hat",
          "rhyme_index": "A",
          "rhyming_syllable": "at",
          "rhyme_type": "none",
          "syllable_count": 5
        },
        {
          "index": 2,
          "text": "Makes me laugh today",
          "rhyme_index": "B",
          "rhyming_syllable": "ay",
          "rhyme_type": "none",
          "syllable_count": 6
        },
        {
          "index": 3,
          "text": "The moon shines bright",
          "rhyme_index": "C",
          "rhyming_syllable": "ight",
          "rhyme_type": "rhyme",
          "syllable_count": 5
        },
        {
          "index": 4,
          "text": "In the pale moonlight",
          "rhyme_index": "C",
          "rhyming_syllable": "ight",
          "rhyme_type": "rhyme",
          "syllable_count": 6
        }
      ],
      "rhyme_pattern": "ABCC"
    }
  ]
}
```

## 🌍 Language Support

### English
- Perfect rhyme detection based on phonetic similarities
- Accurate syllable counting using common English patterns
- Support for various rhyme types (perfect, assonance, consonance)

### Italian 🇮🇹
- **Sinalefe Detection**: Automatic detection of vowel elision between words for accurate syllable counting
- **Italian Phonetic Rules**: Considers Italian-specific phonetic patterns
- **Assonance Recognition**: Specialized detection of Italian assonance patterns

#### Italian Example

```typescript
const italianLyrics = `Quando non c'era l'iPhone, l'alba senza il filtro
Somigliava a Zion, le scritte in un dipinto`;

const result = parseLyrics(italianLyrics);
// Correctly detects assonance between "filtro" and "dipinto"
// Applies sinalefe for accurate syllable counting
```

## 🎭 Rhyme Analysis

### Rhyme Types

- **Perfect Rhyme**: Identical ending sounds (cat/hat, bright/moonlight)
- **Assonance**: Similar vowel sounds (filtro/dipinto in Italian)
- **Consonance**: Similar consonant sounds
- **None**: No rhyming relationship detected

### Supported Rhyme Patterns

- **AABB**: Couplets (consecutive rhyming lines)
- **ABAB**: Alternating rhyme
- **ABCB**: Second and fourth lines rhyme
- **ABBA**: Enclosed rhyme
- **AAAA**: Monorhyme (all lines rhyme)
- **ABCD**: No rhyming pattern
- **Mixed patterns**: Complex combinations like ABCC, ABCDE, etc.

## ⚙️ How It Works

1. **Stanza Splitting**: Lyrics are split into stanzas using double newlines
2. **Verse Parsing**: Each stanza is split into individual verses (lines)
3. **Rhyme Detection**: The last word of each verse is analyzed for rhyming sounds
4. **Pattern Analysis**: Verses are compared to determine which ones rhyme
5. **Pattern Assignment**: Each verse gets a rhyme index (A, B, C, etc.) and the overall pattern is determined
6. **Syllable Counting**: Counts syllables considering language-specific rules (including Italian sinalefe)

## 🔧 Development

### Scripts

```bash
npm run build      # Compile TypeScript to JavaScript
npm run parse      # Run CLI with ts-node (development)
npm run start      # Build and run compiled CLI
```

### Project Structure

```
src/
├── cli.ts           # Command-line interface
├── index.ts         # Main library exports
├── lyrics-parser.ts # Core parsing logic
├── rhyme-utils.ts   # Rhyme detection utilities
└── types.ts         # TypeScript type definitions
```

## ⚠️ Limitations

- Rhyme detection is based on phonetic similarities and common patterns
- Perfect accuracy for all types of rhymes may vary depending on language complexity
- Currently optimized for English and Italian; other languages may have reduced accuracy
- Works best with standard poetry and lyrics formats

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if necessary
5. Submit a pull request

## 📄 License

MIT License - see LICENSE file for details.

## 👤 Author

Edoardo Pachera

## 🏷️ Keywords

lyrics, prosody, poetry, rhyme, syllables, verse, stanza, parser, analyzer, typescript, italian, sinalefe, assonance, consonance, rhyme-pattern, meter, scansion, english, multilingual
