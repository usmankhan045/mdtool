import type { Metadata } from 'next';
import ToolClient from '../../markdown-to-word/ToolClient';
import StructuredData from '@/components/seo/StructuredData';
import AdSlot from '@/components/ads/AdSlot';
import ConversionDiagram from '@/components/ui/ConversionDiagram';
import { EsFaq, RelatedLinks, UiLanguageNote, tableHead, type EsFaqItem } from '../_components/EsPageParts';

const EN_URL = 'https://www.mdtool.dev/markdown-to-word';
const ES_URL = 'https://www.mdtool.dev/es/markdown-to-word';

export const metadata: Metadata = {
  title: 'Convertidor de Markdown a Word (MD a DOCX) Gratis',
  description: 'Convierte MD a Word gratis y en línea. Los títulos pasan a estilos de título reales de Word y se conservan tablas, listas y código. Sin registro ni subidas.',
  keywords: ['markdown a word', 'md a word', 'markdown a docx', 'convertir markdown a word', 'md a docx'],
  openGraph: {
    title: 'Convertidor de Markdown a Word gratis: .docx editable',
    description: 'Convierte Markdown en un .docx editable al instante. Se abre en Word, Google Docs y LibreOffice. Gratis y sin registro.',
    url: ES_URL,
    locale: 'es_ES',
    images: [{ url: '/og-image.png', width: 1200, height: 630 }],
  },
  alternates: {
    canonical: ES_URL,
    languages: { en: EN_URL, es: ES_URL, 'zh-Hans': 'https://www.mdtool.dev/zh/markdown-to-word', 'x-default': EN_URL },
  },
};

const FAQ_ITEMS: EsFaqItem[] = [
  {
    q: '¿El resultado es un documento de Word real y editable?',
    a: 'Sí. MDTool genera un archivo .docx auténtico (estándar Office Open XML), no un PDF ni una imagen. Puedes abrirlo y editarlo en Microsoft Word, Google Docs o LibreOffice Writer.',
  },
  {
    q: '¿Convierte las tablas de Markdown a tablas de Word?',
    a: 'Sí. Las tablas de Markdown se convierten en tablas nativas de Word, con filas y columnas reales que puedes redimensionar, cambiar de estilo y editar directamente en Word.',
  },
  {
    q: '¿Puedo abrir el archivo en Google Docs?',
    a: 'Sí. Como el resultado es un .docx estándar, Google Docs lo abre directamente: súbelo a Drive o usa Archivo → Abrir, sin pasos de importación especiales.',
  },
  {
    q: '¿Qué elementos de Markdown se admiten?',
    a: 'Títulos (H1 a H6), negrita, cursiva, tachado, enlaces, listas numeradas y con viñetas, tablas, bloques de código y citas se convierten a sus equivalentes nativos de Word. Los diagramas Mermaid y las imágenes incrustadas todavía no se incluyen en la exportación a Word.',
  },
  {
    q: '¿Se suben mis archivos a un servidor?',
    a: 'No. El .docx se genera por completo en tu navegador. Tu contenido nunca sale de tu dispositivo.',
  },
  {
    q: '¿Hay límite de tamaño de archivo?',
    a: 'No hay un límite fijo. La conversión se hace en tu navegador, así que no existe un tope de subida; el único límite práctico es la memoria de tu equipo con archivos enormes.',
  },
  {
    q: '¿Cómo convierto un README de GitHub a Word?',
    a: 'Abre el README.md en GitHub, pulsa Raw y copia todo el contenido. Pégalo en el editor de la izquierda y haz clic en el botón de descarga de Word (Download Word).',
  },
  {
    q: '¿Es realmente gratis, sin registro ni marca de agua?',
    a: 'Sí. No hay cuenta, ni período de prueba, ni marca de agua en el archivo descargado. Como el .docx se crea en tu navegador y no en un servidor de pago, no hay costes por uso que recuperar.',
  },
];

const ROWS: [string, string][] = [
  ['Títulos (H1 a H6)', '✅ Estilos de título nativos de Word'],
  ['Negrita, cursiva, tachado', '✅ Formato de carácter nativo'],
  ['Enlaces', '✅ Hipervínculos nativos'],
  ['Listas numeradas y con viñetas', '✅ Listas nativas de Word'],
  ['Tablas', '✅ Tablas nativas de Word'],
  ['Bloques de código y citas', '✅ Estilos de párrafo propios (código en fuente monoespaciada)'],
  ['Diagramas Mermaid e imágenes', '❌ Aún no disponibles (usa Markdown a PDF)'],
];

export default function MarkdownToWordEsPage() {
  return (
    <>
      <StructuredData
        type="tool"
        inLanguage="es"
        datePublished="2026-10-01"
        dateModified="2026-10-01"
        name="Convertidor de Markdown a Word"
        url="/es/markdown-to-word"
        description="Convierte Markdown en un documento .docx de Word real y editable directamente en el navegador. Conserva títulos, tablas, listas y bloques de código."
        featureList={[
          'Conversión de Markdown a .docx editable',
          'Títulos con estilos nativos de Word',
          'Tablas, listas y bloques de código conservados',
          'Compatible con Word, Google Docs y LibreOffice',
          'Procesamiento en el navegador, sin subir archivos',
        ]}
      />
      <StructuredData
        type="breadcrumb"
        breadcrumbs={[
          { name: 'Inicio', url: '/' },
          { name: 'Convertidor de Markdown a Word', url: '/es/markdown-to-word' },
        ]}
      />

      <main lang="es" className="min-h-screen bg-gray-50">
        <section className="bg-gradient-to-b from-[#16314f] to-[#0f1e30] text-white">
          <div className="max-w-6xl mx-auto px-4 pt-10 pb-16">
            <h1 className="text-3xl md:text-4xl font-bold mb-3">
              Convertidor de Markdown a Word (MD a DOCX) gratis
            </h1>
            <p className="text-base md:text-lg text-blue-100/80 max-w-2xl mb-3 leading-relaxed">
              Convierte Markdown en un .docx real y editable que se abre en Word, Google Docs y LibreOffice.
              Sin registro, sin marca de agua y sin límites.
            </p>
            <UiLanguageNote />
            <p className="text-xs text-blue-200/50">
              Actualizado el 1 de octubre de 2026 ·{' '}
              <a href="/markdown-to-word" hrefLang="en" className="underline hover:text-white">English version</a>
            </p>
          </div>
        </section>

        <section className="max-w-6xl mx-auto px-4 -mt-10 relative z-10">
          <ToolClient />
        </section>

        <section className="max-w-6xl mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row md:items-start gap-8">
            <p className="text-base text-gray-700 leading-relaxed max-w-2xl flex-1">
              <strong>Convertir Markdown a Word</strong> significa transformar la sintaxis de Markdown en un
              archivo .docx que puedes editar: los títulos se convierten en estilos de título de Word, las
              listas en listas nativas y las tablas en tablas de Word. MDTool genera el .docx íntegramente en tu
              navegador, sin subir nada, y el archivo se abre directamente en Microsoft Word, Google Docs o
              LibreOffice Writer. Es gratis y no pide registro.
            </p>
            <ConversionDiagram from="Markdown" to="Word (.docx)" />
          </div>
        </section>

        <div className="max-w-6xl mx-auto px-4">
          <AdSlot slotId="tool-below" format="horizontal" />
        </div>

        <section className="max-w-6xl mx-auto px-4 py-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Cómo convertir Markdown a Word gratis</h2>
          <p className="text-gray-700 leading-relaxed max-w-3xl mb-4">
            Son cuatro pasos y no necesitas cuenta: pegas el texto, revisas la vista previa y descargas un .docx
            real, sin nada bloqueado tras un registro.
          </p>
          <ol className="list-decimal list-inside space-y-2 text-gray-700 max-w-3xl">
            <li>Pega tu Markdown en el panel izquierdo o pulsa <strong>Upload .md</strong> para cargar un archivo</li>
            <li>Revisa la vista previa con aspecto de Word, que se actualiza a la derecha mientras escribes</li>
            <li>Pulsa <strong>Download Word (Free)</strong> para guardar el archivo .docx, sin pagos ni marca de agua</li>
            <li>Ábrelo directamente en Microsoft Word, Google Docs o LibreOffice Writer</li>
          </ol>
        </section>

        <section className="max-w-6xl mx-auto px-4 py-8 border-t border-gray-100">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Qué se conserva en el .docx</h2>
          <div className="space-y-4 text-gray-700 leading-relaxed max-w-3xl">
            <p>
              La exportación a Word de MDTool usa la biblioteca{' '}
              <a href="https://docx.js.org/" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">docx</a>,
              que traduce la estructura de Markdown a elementos nativos de Office Open XML en lugar de imitar el
              formato con texto plano. Un título no queda como texto en negrita, sino como un estilo
              Título 1, Título 2, etc., así que el panel de navegación y la tabla de contenido de Word
              funcionan desde el primer momento.
            </p>
            <table className="w-full text-sm border border-gray-200 rounded-lg overflow-hidden my-2">
              <thead className="bg-gray-100">
                <tr>
                  <th className={tableHead}>Elemento de Markdown</th>
                  <th className={tableHead}>Resultado en Word</th>
                </tr>
              </thead>
              <tbody>
                {ROWS.map(([el, out], i) => (
                  <tr key={el} className={`border-t border-gray-200${i % 2 === 1 ? ' bg-gray-50' : ''}`}>
                    <td className="px-3 py-2 font-medium">{el}</td>
                    <td className="px-3 py-2">{out}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <p>
              Si tu documento necesita diagramas, usa el{' '}
              <a href="/es/markdown-to-pdf" className="text-blue-600 hover:underline">convertidor de Markdown a PDF</a>,
              que renderiza los bloques Mermaid antes de generar el archivo. Para contratos, informes, propuestas
              o actas, que son casi todo títulos, texto y tablas, la exportación a Word cubre lo necesario.
            </p>
          </div>
        </section>

        <section className="max-w-6xl mx-auto px-4 py-8 border-t border-gray-100">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">¿Para quién es?</h2>
          <p className="text-gray-700 leading-relaxed max-w-3xl">
            Para <strong>redactores técnicos</strong> que escriben en Markdown y tienen que entregar un .docx a
            un cliente o revisor; para <strong>desarrolladores</strong> que documentan APIs y READMEs en Markdown
            pero deben pasar una versión en Word a producto o cumplimiento; y para <strong>estudiantes</strong> que
            redactan en un editor de texto y deben subir sus trabajos a una plataforma que solo acepta Word. En
            todos los casos la idea es la misma: escribir en Markdown y entregar en Word sin pagar por otra
            herramienta.
          </p>
        </section>

        <section className="max-w-6xl mx-auto px-4 pb-12">
          <EsFaq items={FAQ_ITEMS} />
        </section>
        <RelatedLinks
          links={[
            { href: '/es/markdown-to-pdf', label: 'Markdown a PDF' },
            { href: '/es/word-to-markdown', label: 'Word a Markdown' },
            { href: '/markdown-to-word', label: 'Versión en inglés' },
            { href: '/markdown-to-html', label: 'Markdown a HTML (en inglés)' },
          ]}
        />
      </main>
    </>
  );
}
