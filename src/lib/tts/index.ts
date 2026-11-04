import { uploadMediaToCloudinary } from '../cloudinary';

export interface TTSPlayerState {
  isPlaying: boolean;
  isPaused: boolean;
  currentStepIndex: number;
  progress: number; // 0 to 100
  rate: number; // 0.8, 1.0, 1.25, 1.5
  error: string | null;
}

export interface NarratorStep {
  stepNumber: number;
  instruction: string;
  tip?: string;
}

/**
 * Transliterates Gujarati Unicode characters (U+0A81 - U+0AF1)
 * directly to their 1:1 corresponding Devanagari characters (U+0901 - U+0971).
 * Because Gujarati script was derived directly from Devanagari with an exact 0x180 offset,
 * this allows high-clarity Hindi/Indic TTS engines (which are preinstalled on almost all devices)
 * to phonetically read native Gujarati sentences aloud when the device lacks a dedicated gu-IN voice pack.
 */
export function gujaratiToDevanagari(text: string): string {
  let result = '';
  for (let i = 0; i < text.length; i++) {
    const code = text.charCodeAt(i);
    if (code >= 0x0A81 && code <= 0x0AF1) {
      result += String.fromCharCode(code - 0x180);
    } else {
      result += text[i];
    }
  }
  return result;
}

let cachedVoices: SpeechSynthesisVoice[] = [];

function getBrowserVoices(): SpeechSynthesisVoice[] {
  if (typeof window === 'undefined' || !('speechSynthesis' in window)) return [];
  const voices = window.speechSynthesis.getVoices();
  if (voices && voices.length > 0) {
    cachedVoices = voices;
  }
  return cachedVoices;
}

if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
  getBrowserVoices();
  window.speechSynthesis.onvoiceschanged = () => {
    getBrowserVoices();
  };
}

export class RecipeNarrator {
  private steps: NarratorStep[] = [];
  private currentStep = 0;
  private isPlaying = false;
  private isPaused = false;
  private utterance: SpeechSynthesisUtterance | null = null;
  private rate = 1.0;
  private onStateChange: ((state: TTSPlayerState) => void) | null = null;
  private speechLocale = 'en-US';
  private stepPrefix = 'Step';
  private tipPrefix = 'Chef Secret';

  constructor(
    steps: Array<NarratorStep | string>,
    onStateChange?: (state: TTSPlayerState) => void,
    speechLocale: string = 'en-US',
    stepPrefix: string = 'Step',
    tipPrefix: string = 'Chef Secret'
  ) {
    this.steps = steps.map((item, idx) => {
      if (typeof item === 'string') {
        return {
          stepNumber: idx + 1,
          instruction: item,
        };
      }
      return item;
    });

    if (onStateChange) this.onStateChange = onStateChange;
    this.speechLocale = speechLocale || 'en-US';
    this.stepPrefix = stepPrefix || 'Step';
    this.tipPrefix = tipPrefix || 'Chef Secret';
  }

  public setRate(newRate: number) {
    this.rate = newRate;
    if (this.isPlaying && !this.isPaused) {
      this.pause();
      this.resume();
    }
  }

  public play(startStep = 0) {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
      this.notifyError('Speech synthesis is not supported on this browser.');
      return;
    }

    window.speechSynthesis.cancel();
    this.currentStep = Math.max(0, Math.min(startStep, this.steps.length - 1));
    this.isPlaying = true;
    this.isPaused = false;
    this.speakCurrentStep();
  }

  public pause() {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window && this.isPlaying) {
      window.speechSynthesis.pause();
      this.isPaused = true;
      this.notify();
    }
  }

  public resume() {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window && this.isPaused) {
      window.speechSynthesis.resume();
      this.isPaused = false;
      this.notify();
    } else if (!this.isPlaying) {
      this.play(this.currentStep);
    }
  }

  public stop() {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
    this.isPlaying = false;
    this.isPaused = false;
    this.notify();
  }

  public skipToStep(index: number) {
    if (index >= 0 && index < this.steps.length) {
      this.play(index);
    }
  }

  private speakCurrentStep() {
    if (this.currentStep >= this.steps.length) {
      this.stop();
      return;
    }

    const stepItem = this.steps[this.currentStep];
    const stepNum = stepItem.stepNumber || this.currentStep + 1;
    let textToSpeak = `${this.stepPrefix} ${stepNum}: ${stepItem.instruction}`;
    if (stepItem.tip) {
      textToSpeak += `. ${this.tipPrefix}: ${stepItem.tip}`;
    }

    const voices = getBrowserVoices();
    const langPrefix = this.speechLocale.split('-')[0].toLowerCase();

    let targetText = textToSpeak;
    let targetLocale = this.speechLocale;
    let chosenVoice: SpeechSynthesisVoice | undefined;

    // 1. Gujarati (gu-IN) handling
    if (langPrefix === 'gu') {
      const nativeGuVoice = voices.find(
        (v) =>
          v.lang.toLowerCase().replace('_', '-') === 'gu-in' ||
          v.lang.toLowerCase().startsWith('gu') ||
          v.name.toLowerCase().includes('gujarat') ||
          v.name.toLowerCase().includes('ગુજરાતી')
      );

      if (nativeGuVoice) {
        chosenVoice = nativeGuVoice;
        targetLocale = 'gu-IN';
        targetText = textToSpeak;
      } else {
        // Fallback to high-quality Hindi/Indic voice via Devanagari transliteration
        const hiVoice = voices.find(
          (v) =>
            v.lang.toLowerCase().replace('_', '-') === 'hi-in' ||
            v.lang.toLowerCase().startsWith('hi') ||
            v.name.toLowerCase().includes('hindi') ||
            v.name.toLowerCase().includes('हिन्दी')
        );

        if (hiVoice) {
          chosenVoice = hiVoice;
          targetLocale = 'hi-IN';
          targetText = gujaratiToDevanagari(textToSpeak);
        } else {
          targetLocale = 'gu-IN';
          targetText = textToSpeak;
        }
      }
    }
    // 2. Marathi (mr-IN) handling
    else if (langPrefix === 'mr') {
      const mrVoice = voices.find(
        (v) =>
          v.lang.toLowerCase().replace('_', '-') === 'mr-in' ||
          v.lang.toLowerCase().startsWith('mr') ||
          v.name.toLowerCase().includes('marathi') ||
          v.name.toLowerCase().includes('मराठी')
      );

      if (mrVoice) {
        chosenVoice = mrVoice;
        targetLocale = 'mr-IN';
      } else {
        // Hindi voice naturally reads Devanagari Marathi script
        const hiVoice = voices.find(
          (v) =>
            v.lang.toLowerCase().replace('_', '-') === 'hi-in' ||
            v.lang.toLowerCase().startsWith('hi') ||
            v.name.toLowerCase().includes('hindi') ||
            v.name.toLowerCase().includes('हिन्दी')
        );
        if (hiVoice) {
          chosenVoice = hiVoice;
          targetLocale = 'hi-IN';
        }
      }
    }
    // 3. Hindi (hi-IN) handling
    else if (langPrefix === 'hi') {
      chosenVoice = voices.find(
        (v) =>
          v.lang.toLowerCase().replace('_', '-') === 'hi-in' ||
          v.lang.toLowerCase().startsWith('hi') ||
          v.name.toLowerCase().includes('hindi') ||
          v.name.toLowerCase().includes('हिन्दी')
      );
      targetLocale = 'hi-IN';
    }
    // 4. Spanish (es-ES / es-MX)
    else if (langPrefix === 'es') {
      chosenVoice = voices.find(
        (v) =>
          v.lang.toLowerCase().replace('_', '-') === 'es-es' ||
          v.lang.toLowerCase().startsWith('es') ||
          v.name.toLowerCase().includes('spanish') ||
          v.name.toLowerCase().includes('español')
      );
      targetLocale = 'es-ES';
    }
    // 5. French (fr-FR)
    else if (langPrefix === 'fr') {
      chosenVoice = voices.find(
        (v) =>
          v.lang.toLowerCase().replace('_', '-') === 'fr-fr' ||
          v.lang.toLowerCase().startsWith('fr') ||
          v.name.toLowerCase().includes('french') ||
          v.name.toLowerCase().includes('français')
      );
      targetLocale = 'fr-FR';
    }
    // 6. German (de-DE)
    else if (langPrefix === 'de') {
      chosenVoice = voices.find(
        (v) =>
          v.lang.toLowerCase().replace('_', '-') === 'de-de' ||
          v.lang.toLowerCase().startsWith('de') ||
          v.name.toLowerCase().includes('german') ||
          v.name.toLowerCase().includes('deutsch')
      );
      targetLocale = 'de-DE';
    }
    // 7. English default
    else {
      chosenVoice = voices.find(
        (v) =>
          v.lang.toLowerCase().startsWith('en') &&
          (v.name.includes('Natural') || v.name.includes('Google') || v.name.includes('Samantha') || v.name.includes('David'))
      ) || voices.find((v) => v.lang.toLowerCase().startsWith('en'));
      targetLocale = 'en-US';
    }

    this.utterance = new SpeechSynthesisUtterance(targetText);
    this.utterance.lang = targetLocale;
    this.utterance.rate = this.rate;
    this.utterance.pitch = 1.0;

    if (chosenVoice) {
      this.utterance.voice = chosenVoice;
    }

    this.utterance.onend = () => {
      if (this.isPlaying && !this.isPaused) {
        if (this.currentStep < this.steps.length - 1) {
          this.currentStep++;
          this.notify();
          // Natural pause between cooking steps
          setTimeout(() => {
            if (this.isPlaying && !this.isPaused) {
              this.speakCurrentStep();
            }
          }, 700);
        } else {
          this.stop();
        }
      }
    };

    this.utterance.onerror = (e) => {
      // Ignore user cancellation/skipping events
      if (e.error === 'canceled' || e.error === 'interrupted') {
        return;
      }
      console.warn('Speech synthesis notice:', e.error);
      this.stop();
    };

    this.notify();
    try {
      window.speechSynthesis.speak(this.utterance);
    } catch (err) {
      console.warn('Failed to speak utterance:', err);
    }
  }

  private notify() {
    if (this.onStateChange) {
      const progress = this.steps.length > 0 ? Math.round(((this.currentStep + 1) / this.steps.length) * 100) : 0;
      this.onStateChange({
        isPlaying: this.isPlaying,
        isPaused: this.isPaused,
        currentStepIndex: this.currentStep,
        progress,
        rate: this.rate,
        error: null,
      });
    }
  }

  private notifyError(err: string) {
    if (this.onStateChange) {
      this.onStateChange({
        isPlaying: false,
        isPaused: false,
        currentStepIndex: this.currentStep,
        progress: 0,
        rate: this.rate,
        error: err,
      });
    }
  }
}

/**
 * Upload synthesized audio to Cloudinary server-side
 */
export async function uploadTTSAudioToCloudinary(audioBlob: Blob): Promise<string> {
  return await uploadMediaToCloudinary(audioBlob, 'recipes/audio', 'video');
}
