// lib/speechService.ts

export class SpeechService {
  private static synth: SpeechSynthesis | null = null;

  private static getSynth(): SpeechSynthesis {
    if (typeof window === 'undefined') throw new Error('Speech only in browser');
    if (!this.synth) this.synth = window.speechSynthesis;
    return this.synth;
  }

  static async waitForVoices(): Promise<void> {
    return new Promise((resolve) => {
      const synth = this.getSynth();
      if (synth.getVoices().length > 0) {
        resolve();
      } else {
        const handler = () => {
          synth.removeEventListener('voiceschanged', handler);
          resolve();
        };
        synth.addEventListener('voiceschanged', handler);
      }
    });
  }

  static speak(text: string, lang: string = 'en-US', rate: number = 1, onEnd?: () => void): void {
    console.log('[SpeechService] speak called', text.slice(0, 50));
    const synth = this.getSynth();
    
    // Cancel any ongoing speech
    synth.cancel();
    console.log('[SpeechService] cancelled previous speech');

    // Small delay to ensure cancel is processed (fix for Chromium)
    setTimeout(() => {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = lang;
      utterance.rate = rate;
      utterance.volume = 1;

      // Pick a voice
      const voices = synth.getVoices();
      const englishVoice = voices.find(v => v.lang === lang && v.localService === true) ||
                           voices.find(v => v.lang.startsWith('en'));
      if (englishVoice) {
        utterance.voice = englishVoice;
        console.log('[SpeechService] using voice', englishVoice.name);
      }

      utterance.onstart = () => console.log('[SpeechService] utterance started');
      utterance.onend = () => {
        console.log('[SpeechService] utterance ended');
        onEnd?.();
      };
      utterance.onerror = (e) => {
        console.error('[SpeechService] utterance error', e);
        onEnd?.();
      };

      synth.speak(utterance);
      console.log('[SpeechService] synth.speak() invoked');
    }, 50);
  }

  static stop(): void {
    this.getSynth().cancel();
  }

  static pause(): void {
    this.getSynth().pause();
  }

  static resume(): void {
    this.getSynth().resume();
  }

  static isSupported(): boolean {
    return typeof window !== 'undefined' && 'speechSynthesis' in window;
  }
}