declare module 'mammoth' {
  export interface ConvertResult {
    value: string;
    messages: { type: string; message: string }[];
  }

  export function convertToHtml(input: { arrayBuffer: ArrayBuffer }): Promise<ConvertResult>;
}
