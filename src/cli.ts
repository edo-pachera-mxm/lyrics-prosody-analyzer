#!/usr/bin/env node
import { parseLyrics } from './lyrics-parser';

function main() {
  const args = process.argv.slice(2);
  
  if (args.length === 0) {
    console.log('🎵 LYRICS PROSODY ANALYZER - Command Line Tool');
    console.log('Usage: lyrics-prosody "Your lyrics here" [title]');
    process.exit(0);
  }
  
  const lyricsInput = args[0];
  const title = args[1] || "Custom Lyrics";
  const jsonOutput = args.includes('--json');
  
  const processedLyrics = lyricsInput.replace(/\\n/g, '\n');
  
  try {
    const result = parseLyrics(processedLyrics);
    
    if (jsonOutput) {
      console.log(JSON.stringify(result, null, 2));
      return;
    }
    
    console.log(`🎵 ANALYZING: ${title}`);
    console.log('Input lyrics:');
    console.log(processedLyrics);
    console.log('Analysis Results:');
    
    result.stanzas.forEach((stanza) => {
      console.log(`Stanza ${stanza.index} (Pattern: ${stanza.rhyme_pattern}):`);
      stanza.verses.forEach((verse) => {
        console.log(`  ${verse.index}. [${verse.rhyme_index}] "${verse.text}"`);
        console.log(`      └─ Syllable: "${verse.rhyming_syllable}" (${verse.rhyme_type}) | ${verse.syllable_count} syllables`);
      });
    });
    
  } catch (error) {
    console.error('❌ Error:', error);
    process.exit(1);
  }
}

if (require.main === module) {
  main();
}
