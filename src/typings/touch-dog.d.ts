
export type TranslatorResult = {
  trans_result: any,
  dict_result: any,
}

type Position = {
  x: number,
  y: number,
}
type Part = {
  means: string[],
  part: string,
}
export type TranslatorEvent = {
  text?: string,
  parts?: Part[],
  position: Position,
}

export type TranslateCache = {
  source?: string,
  target?: any
}
