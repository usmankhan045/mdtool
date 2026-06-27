declare module 'html-to-pdfmake' {
  // The library converts an HTML string into pdfmake content. Its return shape
  // is pdfmake's loosely-typed content tree, so we expose it as `unknown`.
  interface HtmlToPdfmakeOptions {
    window?: Window & typeof globalThis;
    defaultStyles?: Record<string, unknown>;
    ignoreStyles?: string[];
    removeExtraBlanks?: boolean;
    tableAutoSize?: boolean;
    imagesByReference?: boolean;
    [key: string]: unknown;
  }

  function htmlToPdfmake(html: string, options?: HtmlToPdfmakeOptions): unknown;

  export default htmlToPdfmake;
}
