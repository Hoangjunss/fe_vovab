export class SpeechService {
  private static synth: SpeechSynthesis | null = null;
  private static currentUtterance: SpeechSynthesisUtterance | null = null;

  private static getSynth(): SpeechSynthesis {
    if (typeof window === 'undefined') throw new Error('Speech only in browser');
    if (!this.synth) this.synth = window.speechSynthesis;
    return this.synth;
  }

  static async waitForVoices(): Promise<void> {
    return new Promise((resolve) => {
      const synth = this.getSynth();
      if (synth.getVoices().length > 0) resolve();
      else {
        const handler = () => {
          synth.removeEventListener('voiceschanged', handler);
          resolve();
        };
        synth.addEventListener('voiceschanged', handler);
      }
    });
  }

  static speak(
    text: string,
    lang: string = 'en-US',
    rate: number = 1,
    onEnd?: () => void,
    onStart?: () => void,        // 👈 callback mới
    onInterrupt?: () => void
  ): void {
    if (!text || text.trim() === '') {
      onEnd?.();
      return;
    }

    const safeRate = Math.min(Math.max(rate, 0.1), 10);
    const synth = this.getSynth();
    this.stop();

    this.waitForVoices().then(() => {
      setTimeout(() => {
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.lang = lang;
        utterance.rate = safeRate;
        utterance.volume = 1;

        const voices = synth.getVoices();
        let selectedVoice = voices.find(v => v.lang === lang && v.localService === true);
        if (!selectedVoice) {
          const baseLang = lang.split('-')[0];
          selectedVoice = voices.find(v => v.lang.startsWith(baseLang));
        }
        if (selectedVoice) utterance.voice = selectedVoice;

        utterance.onstart = () => {
          console.log('[SpeechService] started');
          onStart?.();   // 👈 gọi callback khi bắt đầu
        };
        utterance.onend = () => {
          console.log('[SpeechService] natural end');
          onEnd?.();
        };
        utterance.onerror = (e: SpeechSynthesisErrorEvent) => {
          if (e.error === 'interrupted' || e.error === 'canceled') {
            onInterrupt?.();
          } else {
            onEnd?.();
          }
        };

        this.currentUtterance = utterance;
        synth.speak(utterance);
      }, 100);
    });
  }

  static stop(): void {
    this.getSynth().cancel();
    this.currentUtterance = null;
  }

  static isSupported(): boolean {
    return typeof window !== 'undefined' && 'speechSynthesis' in window;
  }
}