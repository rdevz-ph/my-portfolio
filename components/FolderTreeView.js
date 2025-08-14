import { useState, useEffect } from 'react';
import TreeView from 'react-treeview';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { FiFolder } from 'react-icons/fi';
import { SiJavascript } from 'react-icons/si';
import { VscJson } from 'react-icons/vsc';

const indexJsCode = `import fs from 'fs';
import path from 'path';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
// ...other imports...

export async function getStaticProps() {
  const workPath = path.join(process.cwd(), 'data', 'work.json');
  // ...paths and JSON parsing...
  const rawProjects = JSON.parse(fs.readFileSync(projectPath, 'utf-8'));
  const projects = rawProjects.reverse();

  return {
    props: { projects, settings, experiences, skills },
    revalidate: 60,
  };
}

export default function Home({ projects, settings, experiences, skills }) {
  return (
    <main>
      {/* Component usage */}
    </main>
  );
}`;

export default function ExplorerWithPreview() {
    const [isDarkMode, setIsDarkMode] = useState(false);

    useEffect(() => {
        // Check initial theme
        const checkTheme = () => {
            if (typeof window !== 'undefined') {
                setIsDarkMode(document.documentElement.classList.contains('dark'));
            }
        };

        checkTheme();

        // Listen for theme changes
        const observer = new MutationObserver(checkTheme);
        if (typeof window !== 'undefined') {
            observer.observe(document.documentElement, {
                attributes: true,
                attributeFilter: ['class']
            });
        }

        return () => observer.disconnect();
    }, []);

    // Custom theme style that works for both light and dark modes
    const customThemeStyle = {
        'code[class*="language-"]': {
            color: isDarkMode ? '#e5e7eb' : '#1f2937', // gray-200 for dark, gray-800 for light
            background: 'transparent',
        },
        'pre[class*="language-"]': {
            color: isDarkMode ? '#e5e7eb' : '#1f2937', // gray-200 for dark, gray-800 for light
            background: 'transparent',
        },
        'comment': { color: isDarkMode ? '#6b7280' : '#6b7280' }, // gray-500 for both
        'string': { color: isDarkMode ? '#10b981' : '#059669' }, // emerald-500/600
        'keyword': { color: '#8b5cf6' }, // purple-500 for both (matches your theme)
        'function': { color: isDarkMode ? '#3b82f6' : '#2563eb' }, // blue-500/600
        'number': { color: isDarkMode ? '#f59e0b' : '#d97706' }, // amber-500/600
        'operator': { color: isDarkMode ? '#e5e7eb' : '#1f2937' }, // gray-200/800
        'punctuation': { color: isDarkMode ? '#9ca3af' : '#6b7280' }, // gray-400/500
        'property': { color: isDarkMode ? '#06b6d4' : '#0891b2' }, // cyan-500/600
        'boolean': { color: isDarkMode ? '#f59e0b' : '#d97706' }, // amber-500/600
        'constant': { color: isDarkMode ? '#f59e0b' : '#d97706' }, // amber-500/600
        'class-name': { color: '#8b5cf6' }, // purple-500 for both (matches your theme)
    };

    return (
        <div className="flex flex-col md:flex-row gap-6 mt-6 md:mt-10">
            {/* Tree */}
            <div className="w-full md:w-1/3">
                <TreeView
                    nodeLabel={
                        <span className="inline-flex items-center gap-2 font-medium">
                            <FiFolder className="text-yellow-500" />
                            my-portfolio
                        </span>
                    }
                    defaultCollapsed={false}
                >
                    <TreeView
                        nodeLabel={
                            <span className="inline-flex items-center gap-2">
                                <FiFolder className="text-yellow-500" />
                                components
                            </span>
                        }
                        defaultCollapsed={true}
                    >
                        <div className="pl-6 flex items-center gap-2 text-yellow-500">
                            <SiJavascript className="text-sm" />
                            Navbar.js
                        </div>
                        <div className="pl-6 flex items-center gap-2 text-yellow-500">
                            <SiJavascript className="text-sm" />
                            Footer.js
                        </div>
                    </TreeView>

                    <TreeView
                        nodeLabel={
                            <span className="inline-flex items-center gap-2">
                                <FiFolder className="text-yellow-500" />
                                data
                            </span>
                        }
                        defaultCollapsed={true}
                    >
                        <div className="pl-6 flex items-center gap-2 text-green-600">
                            <VscJson className="text-sm" />
                            work.json
                        </div>
                        <div className="pl-6 flex items-center gap-2 text-green-600">
                            <VscJson className="text-sm" />
                            skills.json
                        </div>
                    </TreeView>

                    <TreeView
                        nodeLabel={
                            <span className="inline-flex items-center gap-2">
                                <FiFolder className="text-yellow-500" />
                                pages
                            </span>
                        }
                        defaultCollapsed={false}
                    >
                        <div className="pl-6 flex items-center gap-2 text-purple-500">
                            <SiJavascript className="text-sm" />
                            index.js
                        </div>

                        <div className="pl-6 flex items-center gap-2 text-yellow-500">
                            <SiJavascript className="text-sm" />
                            _app.js
                        </div>
                    </TreeView>

                    <TreeView
                        nodeLabel={
                            <span className="inline-flex items-center gap-2">
                                <FiFolder className="text-yellow-500" />
                                public
                            </span>
                        }
                        defaultCollapsed={true}
                    >
                        <div className="pl-6">projects/</div>
                        <div className="pl-6">images/</div>
                    </TreeView>

                    <div className="pl-6 inline-flex items-center gap-2">
                        <FiFolder className="text-yellow-500" />
                        styles
                    </div>
                </TreeView>
            </div>

            {/* Code preview */}
            <div className="w-full md:w-2/3">
                <div className="flex items-center gap-2 px-2 md:px-4 py-2 bg-gray-200 dark:bg-gray-800 rounded-t-md border-b border-gray-300 dark:border-gray-700 overflow-x-auto">
                    <span className="inline-flex items-center gap-1 font-mono text-xs md:text-sm font-semibold text-purple-600 dark:text-purple-400">
                        <svg className="w-4 h-4 text-purple-500" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M4 4h16v16H4z" fill="none" />
                            <path d="M4 4h16v16H4z" stroke="currentColor" strokeWidth="1" />
                        </svg>
                        pages/index.js
                    </span>
                </div>
                <div className="bg-white dark:bg-gray-800 rounded-b-md border border-t-0 border-gray-200 dark:border-gray-600 overflow-x-auto">
                    <SyntaxHighlighter
                        language="javascript"
                        style={customThemeStyle}
                        customStyle={{
                            margin: 0,
                            padding: '0.75rem',
                            backgroundColor: 'transparent',
                            borderRadius: '0 0 0.375rem 0.375rem',
                            fontSize: '0.8rem',
                            minWidth: 0,
                        }}
                        codeTagProps={{
                            style: {
                                backgroundColor: 'transparent'
                            }
                        }}
                    >
                        {indexJsCode}
                    </SyntaxHighlighter>
                </div>
            </div>
        </div>
    );
}
