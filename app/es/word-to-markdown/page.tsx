import type { Metadata } from 'next';
import ToolClient from '../../word-to-markdown/ToolClient';
import StructuredData from '@/components/seo/StructuredData';
import AdSlot from '@/components/ads/AdSlot';
import ConversionDiagram from '@/components/ui/ConversionDiagram';
import { EsFaq, RelatedLinks, UiLanguageNote, codeClass, tableHead, type EsFaqItem } from '../_components/EsPageParts';

const EN_URL = 'https://www.mdtool.dev/word-to-markdown';
const ES_URL = 'https://www.mdtool.dev/es/word-to-markdown';

export const metadata: Metadata = {
  title: 'Convertidor de Word a Markdown (DOCX a MD) Gratis',
  description: 'Convierte documentos .docx de Word a Markdown limpio en tu navegador. Títulos, tablas, listas, negritas y enlaces se convierten solos. Gratis y sin registro.',
  keywords: ['word a markdown', 'word a md', 'docx a markdown', 'docx a md', 'convertir word a markdown'],
  openGraph: {
    title: 'Convertidor de Word a Markdown gratis | MDTool',
    description: 'Convierte documentos .docx a Markdown limpio al instante. Títulos, tablas y listas se convierten solos. Gratis, sin registro y sin subir archivos.',
    url: ES_URL,
    locale: 'es_ES',
    images: [{ url: '/og-image.png', width: 1200, height: 630 }],
  },
  alternates: {
    canonical: ES_URL,
    languages: { en: EN_URL, es: ES_URL, 'x-default': EN_URL },
  },
};

const FAQ_ITEMS: EsFaqItem[] = [
  {
    q: '¿Qué formatos de archivo se admiten?',
    a: 'Archivos .docx modernos (Word 2007 y posteriores, estándar Office Open XML). Los .doc antiguos (Word 97-2003) no se admiten: ábrelos en Word o LibreOffice y usa Archivo → Guardar como → .docx, o súbelos a Google Docs y descárgalos como .docx.',
  },
  {
    q: '¿Se sube mi documento de Word a un servidor?',
    a: 'No. Toda la conversión se ejecuta con JavaScript en tu navegador. El archivo nunca se envía, almacena ni registra en ningún servidor.',
  },
  {
    q: '¿Cómo convierto un documento de Google Docs a Markdown?',
    a: 'En Google Docs, ve a Archivo → Descargar → Microsoft Word (.docx) y arrastra el archivo descargado al convertidor. Google Docs también ofrece Archivo → Descargar → Markdown (.md), útil para documentos sencillos.',
  },
  {
    q: '¿Qué formato se conserva?',
    a: 'Los estilos de título (Título 1 → # hasta Título 6 → ######), la negrita y la cursiva, las listas con viñetas y numeradas, los hipervínculos y las tablas sencillas. Son elementos estructurales que Word guarda de forma explícita en el XML del archivo.',
  },
  {
    q: '¿Qué pasa con las imágenes del documento?',
    a: 'Se conservan, pero incrustadas: cada imagen se convierte en una imagen Markdown con un URI data: en base64, así que el archivo .md contiene la propia imagen y puede pesar bastante. Muchas plataformas, como los README de GitHub, no muestran imágenes data:, así que guárdalas como archivos y enlázalas. Para documentos con muchas imágenes, Pandoc con la opción --extract-media las extrae automáticamente.',
  },
  {
    q: '¿Qué variante de Markdown genera?',
    a: 'GitHub Flavored Markdown (GFM): tablas con barras verticales, bloques de código con triple acento grave y listas con guion. Funciona en GitHub, GitLab, Obsidian y la mayoría de generadores de sitios estáticos.',
  },
  {
    q: '¿Se conservan los cambios controlados y los comentarios?',
    a: 'No. Los cambios controlados y los comentarios se descartan y solo queda el texto vigente. Acepta o rechaza los cambios en Word antes de convertir si necesitas controlar qué versión se exporta.',
  },
];

const ROWS: [string, string, string][] = [
  ['Estilos Título 1 a Título 6', '# a ######', '✅ Se conserva'],
  ['Negrita y cursiva', '**negrita** / *cursiva*', '✅ Se conserva'],
  ['Listas con viñetas', '- elemento', '✅ Se conserva'],
  ['Listas numeradas', '1. elemento', '✅ Se conserva'],
  ['Hipervínculos', '[texto](url)', '✅ Se conserva'],
  ['Tablas sencillas', '| col | col |', '✅ Tabla con barras'],
  ['Texto con formato manual (sin estilo)', 'Texto normal', '⚠️ Pierde el formato'],
  ['Imágenes incrustadas', 'Imagen en línea con URI data: (base64)', '⚠️ Se conservan, pero pesadas'],
  ['Cambios controlados y comentarios', 'Se eliminan', '❌ No se incluyen'],
];

export default function WordToMarkdownEsPage() {
  return (
    <>
      <StructuredData
        type="tool"
        inLanguage="es"
        datePublished="2026-10-01"
        dateModified="2026-10-01"
        name="Convertidor de Word a Markdown"
        url="/es/word-to-markdown"
        description="Convierte documentos .docx de Word a Markdown limpio en el navegador. Títulos, tablas, listas, negritas, cursivas y enlaces se convierten automáticamente."
        featureList={[
          'Conversión de Word (.docx) a GitHub Flavored Markdown',
          'Títulos, listas, tablas y enlaces conservados',
          'Arrastrar y soltar el archivo',
          'Procesamiento en el navegador, sin subir archivos',
          'Sin límite de tamaño ni registro',
        ]}
      />
      <StructuredData
        type="breadcrumb"
        breadcrumbs={[
          { name: 'Inicio', url: '/' },
          { name: 'Convertidor de Word a Markdown', url: '/es/word-to-markdown' },
        ]}
      />

      <main lang="es" className="min-h-screen bg-page">
        <section className="bg-gradient-to-b from-[#16314f] to-[#0f1e30] text-white">
          <div className="max-w-6xl mx-auto px-4 pt-10 pb-16">
            <h1 className="text-3xl md:text-4xl font-bold mb-3">
              Convertidor de Word a Markdown (DOCX a MD) gratis
            </h1>
            <p className="text-base md:text-lg text-blue-100/80 max-w-2xl mb-3 leading-relaxed">
              Arrastra un archivo .docx y obtén Markdown limpio (GitHub Flavored Markdown) al instante. Sin subir
              nada y sin marca de agua.
            </p>
            <UiLanguageNote />
            <p className="text-xs text-blue-200/50">
              Actualizado el 1 de octubre de 2026 ·{' '}
              <a href="/word-to-markdown" hrefLang="en" className="underline hover:text-white">English version</a>
            </p>
          </div>
        </section>

        <section className="max-w-6xl mx-auto px-4 -mt-10 relative z-10">
          <ToolClient />
        </section>

        <section className="max-w-6xl mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row md:items-start gap-8">
            <p className="text-base text-gray-700 leading-relaxed max-w-2xl flex-1">
              <strong>Convertir Word a Markdown</strong> consiste en leer los estilos estructurales de tu
              archivo .docx (Título 1, Título 2, listas, tablas, negrita, cursiva) y escribirlos como Markdown de
              texto plano. MDTool lo hace íntegramente en tu navegador con{' '}
              <a href="https://github.com/mwilliamson/mammoth.js" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">mammoth.js</a>,
              que extrae la estructura del documento, y{' '}
              <a href="https://github.com/mixmark-io/turndown" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">turndown</a>,
              que la convierte en GitHub Flavored Markdown. Gratis, sin registro y sin límite de tamaño.
            </p>
            <ConversionDiagram from="Word (.docx)" to="Markdown (.md)" />
          </div>
        </section>

        <div className="max-w-6xl mx-auto px-4">
          <AdSlot slotId="tool-below" format="horizontal" />
        </div>

        <section className="max-w-6xl mx-auto px-4 py-8 border-t border-gray-100">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Cómo convertir Word a Markdown</h2>
          <ol className="list-decimal list-inside space-y-3 text-gray-700 max-w-3xl mb-6">
            <li>
              <strong>Arrastra</strong> tu archivo .docx al panel izquierdo o pulsa{' '}
              <strong>Choose .docx file</strong> para buscarlo en tu equipo
            </li>
            <li>
              MDTool lee el archivo con mammoth.js, que extrae el XML estructural del documento y asigna cada
              estilo con nombre a un elemento HTML
            </li>
            <li>turndown, con el complemento GFM, convierte ese HTML intermedio en GitHub Flavored Markdown</li>
            <li>
              El Markdown aparece en el panel derecho: pulsa <strong>Copy</strong> para copiarlo o{' '}
              <strong>Download .md</strong> para guardarlo como archivo
            </li>
          </ol>

          <h3 className="text-xl font-semibold text-gray-800 mb-3">Qué se convierte</h3>
          <p className="text-gray-700 mb-3 max-w-3xl leading-relaxed">
            La conversión se basa en los estilos con nombre de Word, no en la apariencia visual. Un texto que
            solo se ve grande y en negrita, sin el estilo Título aplicado, se trata como texto normal.
          </p>
          <div className="overflow-x-auto max-w-3xl mb-6">
            <table className="w-full text-sm border border-gray-200 rounded-lg overflow-hidden">
              <thead className="bg-gray-100">
                <tr>
                  <th className={tableHead}>Elemento de Word</th>
                  <th className={tableHead}>Resultado en Markdown</th>
                  <th className={tableHead}>Estado</th>
                </tr>
              </thead>
              <tbody>
                {ROWS.map(([el, md, status], i) => (
                  <tr key={el} className={`border-t border-gray-200${i % 2 === 1 ? ' bg-gray-50' : ''}`}>
                    <td className="px-3 py-2 font-medium">{el}</td>
                    <td className="px-3 py-2 font-mono text-sm">{md}</td>
                    <td className="px-3 py-2">{status}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <h3 className="text-xl font-semibold text-gray-800 mb-3">Archivos .doc y Google Docs</h3>
          <div className="space-y-3 text-gray-700 leading-relaxed max-w-3xl">
            <p>
              Los <strong>.doc antiguos</strong> (formato binario de Word 97-2003) no se leen directamente. Ábrelos
              en Word o en LibreOffice Writer y usa <strong>Archivo → Guardar como</strong> eligiendo .docx. Si no
              tienes ninguno de los dos, súbelos a Google Drive, ábrelos con Google Docs y descárgalos como .docx.
            </p>
            <p>
              Desde <strong>Google Docs</strong>, ve a <strong>Archivo → Descargar → Microsoft Word (.docx)</strong> y
              arrastra el archivo al convertidor. Google Docs también incluye{' '}
              <strong>Archivo → Descargar → Markdown (.md)</strong>, la vía más rápida para documentos sencillos;
              pasar por .docx y MDTool te da tablas con barras, listas con guion y la posibilidad de revisar el
              resultado antes de guardarlo.
            </p>
          </div>
        </section>

        <section className="max-w-6xl mx-auto px-4 py-8 border-t border-gray-100">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">¿Para qué convertir Word a Markdown?</h2>
          <ul className="list-disc list-inside space-y-2 text-gray-700 leading-relaxed max-w-3xl">
            <li><strong>GitHub y GitLab</strong>: los README, wikis y la documentación de los repositorios se escriben en Markdown; un .docx no sirve como README.</li>
            <li><strong>Obsidian</strong>: las notas son archivos .md; convierte el documento y suéltalo en tu bóveda.</li>
            <li><strong>Generadores de sitios estáticos</strong> (Jekyll, Hugo, Eleventy, Astro): generan las páginas a partir de archivos Markdown.</li>
            <li><strong>Docs como código</strong> (MkDocs, Docusaurus): pasar la documentación de Word a Markdown permite versionarla con Git y revisarla en pull requests.</li>
            <li><strong>Notion, Ghost y Hashnode</strong>: aceptan Markdown pegado o importado, con títulos y formato intactos.</li>
          </ul>
          <p className="text-gray-700 leading-relaxed max-w-3xl mt-4">
            Las tablas con celdas combinadas se simplifican, porque las tablas GFM no admiten{' '}
            <code className={codeClass}>colspan</code> ni <code className={codeClass}>rowspan</code>. Los colores
            de fuente, las fuentes personalizadas y el subrayado se descartan, ya que Markdown no tiene equivalente.
          </p>
        </section>

        <section className="max-w-6xl mx-auto px-4 pb-12">
          <EsFaq items={FAQ_ITEMS} />
        </section>

        <RelatedLinks
          links={[
            { href: '/es/markdown-to-word', label: 'Markdown a Word' },
            { href: '/es/markdown-to-pdf', label: 'Markdown a PDF' },
            { href: '/word-to-markdown', label: 'Versión en inglés' },
            { href: '/html-to-markdown', label: 'HTML a Markdown (en inglés)' },
          ]}
        />
      </main>
    </>
  );
}
