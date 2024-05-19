export type TypistConfig = {
  /**
   * Speed of typing in milliseconds per character.
   */
  speed: number

  /**
   * Random variance between min and max multiplied with speed.
   * Values larger than 1 increase the pause between characters, lower values reduce the pause.
   * If not provided (undefined or null), typing speed is constant.
   */
  variance: { min: number; max: number } | undefined | null
}

export const DefaultTypistConfig: TypistConfig = {
  speed: 60,
  variance: { min: 1, max: 2 },
}

export type OnTypeCallback = (text: string) => void

const typist = (
  sentence: string,
  onType: OnTypeCallback,
  config: TypistConfig = DefaultTypistConfig,
): void => type(0, sentence, onType, config)

export const inputAdapter: (input: HTMLInputElement) => OnTypeCallback =
  (input) => (text) => {
    input.value = text
    input.setSelectionRange(text.length, text.length)
  }

const type = (
  index: number,
  sentence: string,
  onType: OnTypeCallback,
  config: TypistConfig,
): void => {
  const variance = config.variance
    ? Math.random() * (config.variance.max - config.variance.min) +
      config.variance.min
    : 1
  const timeout = config.speed * variance

  window.setTimeout(() => {
    onType(sentence.slice(0, index + 1))
    if (index < sentence.length) {
      type(index + 1, sentence, onType, config)
    }
  }, timeout)
}

export default typist
