import type { Metadata } from 'next';
import ToolClient from '../../markdown-to-word/ToolClient';
import StructuredData from '@/components/seo/StructuredData';
import AdSlot from '@/components/ads/AdSlot';
import ConversionDiagram from '@/components/ui/ConversionDiagram';
import { ZhFaq, RelatedLinks, UiLanguageNote, tableHead, type ZhFaqItem } from '../_components/ZhPageParts';

const EN_URL = 'https://www.mdtool.dev/markdown-to-word';
const ES_URL = 'https://www.mdtool.dev/es/markdown-to-word';
const ZH_URL = 'https://www.mdtool.dev/zh/markdown-to-word';

export const metadata: Metadata = {
  title: 'Markdown 转 Word（MD转DOCX）免费在线转换',
  description: '免费在线 md 转 word：把 Markdown 转成可编辑的 .docx，标题套用 Word 标题样式，保留表格、列表和代码。本地转换，免注册、不上传。',
  keywords: ['md 转 word', 'markdown 转 word', 'markdown转docx', 'md转docx', 'markdown 在线转换', 'markdown 转 word 免费'],
  openGraph: {
    title: 'Markdown 转 Word 免费在线转换：生成可编辑的 .docx',
    description: '粘贴 Markdown，一键下载真正的 .docx，可用 Microsoft Word、WPS 或 LibreOffice 打开编辑。免费，无需注册。',
    url: ZH_URL,
    locale: 'zh_CN',
    images: [{ url: '/og-image.png', width: 1200, height: 630 }],
  },
  alternates: {
    canonical: ZH_URL,
    languages: { en: EN_URL, es: ES_URL, 'zh-Hans': ZH_URL, 'x-default': EN_URL },
  },
};

const FAQ_ITEMS: ZhFaqItem[] = [
  {
    q: '转换出来的是真正可编辑的 Word 文档吗？',
    a: '是的。MDTool 生成的是标准的 .docx 文件（Office Open XML 格式），不是 PDF，也不是图片。可以直接用 Microsoft Word、WPS 或 LibreOffice Writer 打开并继续编辑。',
  },
  {
    q: '中文内容会乱码吗？用的是什么字体？',
    a: '不会乱码。.docx 文件本身采用 Unicode 编码保存文字，打开时由 Word 或 WPS 调用系统里已安装的中文字体来显示，所以中文正文、标题和表格里的中文都能正常显示。如果想换成公司规定的字体，在 Word 里修改“正文”和“标题”样式即可。',
  },
  {
    q: '生成的 .docx 能用 WPS 打开吗？',
    a: '可以。WPS 文字原生支持 .docx 格式，直接双击或在 WPS 里“打开”即可，标题样式、表格和列表都能正常编辑。',
  },
  {
    q: '支持哪些 Markdown 语法？',
    a: '支持标题（H1 到 H6）、加粗、斜体、删除线、链接、有序列表和无序列表（包括嵌套列表）、任务列表复选框（显示为 ☐ / ☑）、表格以及代码块（等宽字体）。Mermaid 图表和图片目前还不会导出到 Word。',
  },
  {
    q: '文档里有 Mermaid 图表或图片怎么办？',
    a: (
      <>
        Word 导出暂时不包含 Mermaid 图表和图片。如果文档需要这些内容，可以改用{' '}
        <a href="/markdown-to-pdf" className="text-blue-600 hover:underline">Markdown 转 PDF 工具</a>，它会先渲染
        Mermaid 图表再生成文件，中文文字也能正常显示。
      </>
    ),
    text: 'Word 导出暂时不包含 Mermaid 图表和图片。如果文档需要这些内容，可以改用 Markdown 转 PDF 工具（/markdown-to-pdf），它会先渲染 Mermaid 图表再生成文件，中文文字也能正常显示。',
  },
  {
    q: '文件会上传到服务器吗？',
    a: '不会。.docx 完全在你的浏览器里生成，内容不会离开你的电脑，适合处理内部文档或包含个人信息的材料。',
  },
  {
    q: '怎么把 Word 转回 Markdown？',
    a: (
      <>
        使用反方向的{' '}
        <a href="/word-to-markdown" className="text-blue-600 hover:underline">Word 转 Markdown 工具</a>
        ：把 .docx 拖进去，就能得到 GitHub 风格的 Markdown，可以复制或下载为 .md 文件。
      </>
    ),
    text: '使用反方向的 Word 转 Markdown 工具（/word-to-markdown）：把 .docx 拖进去，就能得到 GitHub 风格的 Markdown，可以复制或下载为 .md 文件。',
  },
  {
    q: '真的免费吗？需要注册吗？有水印吗？',
    a: '完全免费，不需要注册账号，下载的文件也没有水印。因为 .docx 是在浏览器里生成的，不占用付费服务器，所以没有按次收费的必要。',
  },
];

const ROWS: [string, string][] = [
  ['标题（# 到 ######）', '✅ Word 内置标题样式（标题 1 至标题 6）'],
  ['加粗、斜体、删除线', '✅ 原生字符格式'],
  ['链接', '✅ 可点击的超链接'],
  ['有序 / 无序列表（含嵌套）', '✅ Word 原生编号和项目符号列表'],
  ['任务列表 - [ ] / - [x]', '✅ 复选框符号 ☐ / ☑'],
  ['表格', '✅ 可编辑的 Word 表格'],
  ['代码块', '✅ 等宽字体段落'],
  ['Mermaid 图表、图片', '❌ 暂不支持（请用 Markdown 转 PDF）'],
];

export default function MarkdownToWordZhPage() {
  return (
    <>
      <StructuredData
        type="tool"
        inLanguage="zh-Hans"
        datePublished="2026-10-01"
        dateModified="2026-10-01"
        name="Markdown 转 Word 在线转换器"
        url="/zh/markdown-to-word"
        description="在浏览器里把 Markdown 转换为真正可编辑的 Word .docx 文件，标题套用 Word 标题样式，保留表格、列表和代码块。免费，无需注册，文件不上传。"
        featureList={[
          'Markdown 转可编辑的 .docx 文件',
          '标题套用 Word 内置标题样式',
          '保留表格、列表、任务列表和代码块',
          '可用 Microsoft Word、WPS 和 LibreOffice 打开',
          '浏览器本地转换，文件不上传',
        ]}
      />
      <StructuredData
        type="breadcrumb"
        breadcrumbs={[
          { name: '首页', url: '/' },
          { name: 'Markdown 转 Word 在线转换器', url: '/zh/markdown-to-word' },
        ]}
      />

      <main lang="zh-Hans" className="min-h-screen bg-page">
        <section className="bg-gradient-to-b from-[#16314f] to-[#0f1e30] text-white">
          <div className="max-w-6xl mx-auto px-4 pt-10 pb-16">
            <h1 className="text-3xl md:text-4xl font-bold mb-3">
              Markdown 转 Word 在线转换器（md 转 docx，免费）
            </h1>
            <p className="text-base md:text-lg text-blue-100/80 max-w-2xl mb-3 leading-relaxed">
              把 Markdown 转成真正可编辑的 .docx，用 Word、WPS 或 LibreOffice 都能直接打开。
              免费、无需注册、没有水印。
            </p>
            <UiLanguageNote />
            <p className="text-xs text-blue-200/50">
              更新于 2026 年 10 月 1 日 ·{' '}
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
              <strong>md 转 word</strong> 就是把 Markdown 语法转换成可编辑的 .docx 文件：<code>#</code> 变成 Word
              的“标题 1”样式，列表变成原生列表，表格变成 Word 表格。MDTool 在浏览器本地完成转换，文件不上传，
              生成的 .docx 可以直接用 Word、WPS 或 LibreOffice 打开，免费且无需注册。
            </p>
            <ConversionDiagram from="Markdown" to="Word (.docx)" />
          </div>
        </section>

        <div className="max-w-6xl mx-auto px-4">
          <AdSlot slotId="tool-below" format="horizontal" />
        </div>

        <section className="max-w-6xl mx-auto px-4 py-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">怎么在线把 Markdown 转成 Word？</h2>
          <p className="text-gray-700 leading-relaxed max-w-3xl mb-4">
            一共四步，不用注册：粘贴内容、确认预览、下载 .docx，然后打开编辑。
          </p>
          <ol className="list-decimal list-inside space-y-2 text-gray-700 max-w-3xl">
            <li>把 Markdown 粘贴到左侧编辑区，或点击 <strong>Upload .md</strong> 上传 .md 文件</li>
            <li>在右侧查看仿 Word 效果的预览，边输入边更新</li>
            <li>点击 <strong>Download Word (Free)</strong> 下载 .docx 文件，不收费、无水印</li>
            <li>用 Microsoft Word、WPS 或 LibreOffice Writer 打开，继续编辑</li>
          </ol>
        </section>

        <section className="max-w-6xl mx-auto px-4 py-8 border-t border-gray-100">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">转换后哪些格式能保留？</h2>
          <div className="space-y-4 text-gray-700 leading-relaxed max-w-3xl">
            <p>
              MDTool 使用{' '}
              <a href="https://docx.js.org/" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">docx</a>{' '}
              库，把 Markdown 的结构映射成 Office Open XML 里的原生元素，而不是用普通文字去“模仿”格式。
              标题不是加粗放大的普通段落，而是 Word 内置的“标题 1”“标题 2”等样式，所以打开后导航窗格和自动目录都能直接使用。
            </p>
            <table className="w-full text-sm border border-gray-200 rounded-lg overflow-hidden my-2">
              <thead className="bg-gray-100">
                <tr>
                  <th className={tableHead}>Markdown 元素</th>
                  <th className={tableHead}>Word 中的结果</th>
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
              如果文档里有 Mermaid 图表或图片，建议改用{' '}
              <a href="/markdown-to-pdf" className="text-blue-600 hover:underline">Markdown 转 PDF 工具</a>，
              它会先渲染图表再生成 PDF，中文也能正常显示。合同、报告、方案、会议纪要这类以标题、正文和表格为主的文档，
              用 Word 导出就足够了。
            </p>
          </div>
        </section>

        <section className="max-w-6xl mx-auto px-4 py-8 border-t border-gray-100">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">为什么不直接复制粘贴？</h2>
          <p className="text-gray-700 leading-relaxed max-w-3xl">
            把 Typora 或 VS Code 里的内容直接粘贴进 Word，标题要么变成带 <code>#</code> 号的普通文字，要么只是字号变大的段落，
            导航窗格和“引用 &gt; 目录”都识别不了，表格也常常需要重新排版。用转换器生成的 .docx，标题就是 Word
            的标题样式，表格就是 Word 表格，打开后可以直接插入目录、统一修改样式，省去手动整理的时间。
            更详细的操作说明见{' '}
            <a href="/blog/markdown-zhuan-word" className="text-blue-600 hover:underline">Markdown 转 Word 教程</a>。
          </p>
        </section>

        <section className="max-w-6xl mx-auto px-4 pb-12">
          <ZhFaq items={FAQ_ITEMS} />
        </section>
        <RelatedLinks
          links={[
            { href: '/word-to-markdown', label: 'Word 转 Markdown（英文界面）' },
            { href: '/markdown-to-pdf', label: 'Markdown 转 PDF（英文界面）' },
            { href: '/blog/markdown-zhuan-word', label: 'Markdown 转 Word 教程' },
            { href: '/markdown-to-word', label: '英文版' },
          ]}
        />
      </main>
    </>
  );
}
