import type { Metadata } from 'next';
import ToolClient from '../../markdown-to-pdf/ToolClient';
import StructuredData from '@/components/seo/StructuredData';
import AdSlot from '@/components/ads/AdSlot';
import ConversionDiagram from '@/components/ui/ConversionDiagram';
import { EsFaq, RelatedLinks, UiLanguageNote, codeClass, tableHead, type EsFaqItem } from '../_components/EsPageParts';

const EN_URL = 'https://www.mdtool.dev/markdown-to-pdf';
const ES_URL = 'https://www.mdtool.dev/es/markdown-to-pdf';

export const metadata: Metadata = {
  title: 'Convertidor de Markdown a PDF Gratis Online',
  description: 'Convierte Markdown (MD) a PDF gratis en tu navegador: código resaltado, tablas, imágenes y diagramas Mermaid. Cuatro temas, A4 o Carta. Sin registro.',
  keywords: ['markdown a pdf', 'md a pdf', 'de md a pdf', 'convertir markdown a pdf', 'convertir md a pdf'],
  openGraph: {
    title: 'Convertidor de Markdown a PDF gratis | MDTool',
    description: 'Convierte Markdown a PDF al instante, con código resaltado, tablas y diagramas Mermaid. Gratis y sin registro.',
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
    q: '¿Puedo convertir GitHub Flavored Markdown (GFM) a PDF?',
    a: 'Sí. MDTool admite GitHub Flavored Markdown completo: tablas, listas de tareas, tachado, bloques de código con resaltado de sintaxis y enlaces automáticos.',
  },
  {
    q: '¿El PDF mantiene el resaltado de sintaxis del código?',
    a: 'Sí. Los bloques de código se resaltan con highlight.js, y el PDF se genera a partir del mismo HTML que ves en la vista previa, así que los colores no se pierden por el camino.',
  },
  {
    q: '¿Admite diagramas Mermaid?',
    a: 'Sí. Los bloques ```mermaid se renderizan como diagramas en el navegador y se incluyen en el PDF exportado.',
  },
  {
    q: '¿Qué temas y tamaños de página hay?',
    a: 'Cuatro temas: GitHub (documentación técnica), Academic (trabajos e informes), Minimal (limpio y moderno) y Dark (fondo oscuro). Puedes elegir tamaño A4 o Carta (Letter).',
  },
  {
    q: '¿Se guardan mis archivos en sus servidores?',
    a: 'No. Toda la conversión ocurre en tu navegador con JavaScript. Tu contenido nunca sale de tu dispositivo ni se envía a ningún servidor.',
  },
  {
    q: '¿Cómo convierto el README de un repositorio de GitHub a PDF?',
    a: 'Abre el README.md en GitHub, pulsa Raw y copia el contenido. Pégalo en el editor de la izquierda, elige un tema y descarga el PDF.',
  },
  {
    q: '¿Hay límite de tamaño?',
    a: 'No. Como todo se procesa en tu navegador, la velocidad depende de tu equipo y no de un límite del servidor.',
  },
];

const ROWS: [string, string][] = [
  ['Títulos y párrafos', 'Texto vectorial seleccionable y con búsqueda'],
  ['Bloques de código', 'Resaltado de sintaxis con highlight.js'],
  ['Tablas GFM', 'Tablas con bordes y encabezado'],
  ['Diagramas Mermaid (```mermaid)', 'Diagrama renderizado, igual que en la vista previa'],
  ['Imágenes', 'Incrustadas en el PDF (incluidas URLs remotas)'],
  ['Listas, citas, enlaces', 'Con el estilo del tema elegido'],
  ['Saltos de página', 'Respetados al paginar el documento'],
];

const THEMES: [string, string][] = [
  ['GitHub', 'README y documentación técnica'],
  ['Academic', 'Trabajos, informes y textos formales'],
  ['Minimal', 'Documentos generales con estilo limpio y moderno'],
  ['Dark', 'Lectura con fondo oscuro y presentaciones en pantalla'],
];

export default function MarkdownToPdfEsPage() {
  return (
    <>
      <StructuredData
        type="tool"
        inLanguage="es"
        datePublished="2026-10-01"
        dateModified="2026-10-01"
        name="Convertidor de Markdown a PDF"
        url="/es/markdown-to-pdf"
        description="Convierte Markdown a PDF en el navegador, con GitHub Flavored Markdown, código resaltado, tablas, imágenes y diagramas Mermaid."
        featureList={[
          'Conversión de Markdown a PDF',
          'Compatible con GitHub Flavored Markdown',
          'Resaltado de sintaxis en bloques de código',
          'Diagramas Mermaid renderizados',
          'Temas GitHub, Academic, Minimal y Dark',
          'Tamaño de página A4 o Carta',
          'Procesamiento en el navegador, sin subir archivos',
        ]}
      />
      <StructuredData
        type="breadcrumb"
        breadcrumbs={[
          { name: 'Inicio', url: '/' },
          { name: 'Convertidor de Markdown a PDF', url: '/es/markdown-to-pdf' },
        ]}
      />

      <main lang="es" className="min-h-screen bg-page">
        <section className="bg-gradient-to-b from-[#16314f] to-[#0f1e30] text-white">
          <div className="max-w-6xl mx-auto px-4 pt-10 pb-16">
            <h1 className="text-3xl md:text-4xl font-bold mb-3">
              Convertidor de Markdown a PDF gratis online
            </h1>
            <p className="text-base md:text-lg text-blue-100/80 max-w-2xl mb-3 leading-relaxed">
              Pega o sube tu Markdown y descarga un PDF paginado, con código resaltado, tablas y diagramas
              Mermaid. Sin registro y sin marca de agua.
            </p>
            <UiLanguageNote />
            <p className="text-xs text-blue-200/50">
              Actualizado el 1 de octubre de 2026 ·{' '}
              <a href="/markdown-to-pdf" hrefLang="en" className="underline hover:text-white">English version</a>
            </p>
          </div>
        </section>

        <section className="max-w-6xl mx-auto px-4 -mt-10 relative z-10">
          <ToolClient />
        </section>

        <section className="max-w-6xl mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row md:items-start gap-8">
            <p className="text-base text-gray-700 leading-relaxed max-w-2xl flex-1">
              <strong>Convertir Markdown a PDF</strong> es pasar un archivo .md, con sus títulos, tablas, código
              resaltado y diagramas Mermaid, a un documento PDF paginado listo para imprimir, enviar o archivar.
              MDTool genera el PDF en tu navegador a partir del mismo HTML que ves en la vista previa, así que no
              se pierde nada entre lo que ves y lo que descargas. Es gratis, sin registro y sin límite de tamaño.
            </p>
            <ConversionDiagram from="Markdown" to="PDF" />
          </div>
        </section>

        <div className="max-w-6xl mx-auto px-4">
          <AdSlot slotId="tool-below" format="horizontal" />
        </div>

        <section className="max-w-6xl mx-auto px-4 py-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Cómo convertir de MD a PDF</h2>
          <ol className="list-decimal list-inside space-y-2 text-gray-700 max-w-3xl">
            <li>Pega tu Markdown en el panel izquierdo o pulsa <strong>Upload .md</strong> para cargar un archivo</li>
            <li>Elige un tema para el PDF: GitHub, Academic, Minimal o Dark, y el tamaño de página (A4 o Carta)</li>
            <li>Revisa la vista previa, que se actualiza a la derecha en tiempo real</li>
            <li>Pulsa <strong>Download PDF (Free)</strong> para guardar el archivo</li>
          </ol>
        </section>

        <section className="max-w-6xl mx-auto px-4 py-8 border-t border-gray-100">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Qué pasa con cada elemento de Markdown</h2>
          <div className="space-y-4 text-gray-700 leading-relaxed max-w-3xl">
            <table className="w-full text-sm border border-gray-200 rounded-lg overflow-hidden my-2">
              <thead className="bg-gray-100">
                <tr>
                  <th className={tableHead}>Elemento de Markdown</th>
                  <th className={tableHead}>Resultado en el PDF</th>
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
              Muchos conversores pierden los diagramas o el color del código porque generan el PDF por un camino
              distinto al de la vista previa. Un bloque <code className={codeClass}>```mermaid</code> todavía no es
              un diagrama: es texto que hay que interpretar y dibujar como SVG. MDTool espera a que Mermaid termine
              de dibujarlo antes de crear el PDF, y el documento se construye con{' '}
              <code className={codeClass}>pdfmake</code>, un motor vectorial, así que el texto sigue siendo
              seleccionable y se puede buscar.
            </p>
          </div>
        </section>

        <section className="max-w-6xl mx-auto px-4 py-8 border-t border-gray-100">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Qué tema elegir</h2>
          <div className="max-w-3xl">
            <table className="w-full text-sm border border-gray-200 rounded-lg overflow-hidden">
              <thead className="bg-gray-100">
                <tr>
                  <th className={tableHead}>Tema</th>
                  <th className={tableHead}>Ideal para</th>
                </tr>
              </thead>
              <tbody>
                {THEMES.map(([theme, use], i) => (
                  <tr key={theme} className={`border-t border-gray-200${i % 2 === 1 ? ' bg-gray-50' : ''}`}>
                    <td className="px-3 py-2 font-medium">{theme}</td>
                    <td className="px-3 py-2">{use}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section className="max-w-6xl mx-auto px-4 pb-12">
          <EsFaq items={FAQ_ITEMS} />
        </section>

        <RelatedLinks
          links={[
            { href: '/es/markdown-to-word', label: 'Markdown a Word' },
            { href: '/es/word-to-markdown', label: 'Word a Markdown' },
            { href: '/markdown-to-pdf', label: 'Versión en inglés' },
            { href: '/blog/github-readme-to-pdf', label: 'README de GitHub a PDF (guía en inglés)' },
          ]}
        />
      </main>
    </>
  );
}
