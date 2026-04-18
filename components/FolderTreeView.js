import { useState, useEffect } from 'react';
import TreeView from 'react-treeview';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { FiFolder } from 'react-icons/fi';
import { SiJavascript } from 'react-icons/si';
import { VscJson } from 'react-icons/vsc';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { FileCode, FileJson, Folder, Terminal } from "lucide-react";

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
        const checkTheme = () => {
            if (typeof window !== 'undefined') {
                setIsDarkMode(document.documentElement.classList.contains('dark'));
            }
        };

        checkTheme();

        const observer = new MutationObserver(checkTheme);
        if (typeof window !== 'undefined') {
            observer.observe(document.documentElement, {
                attributes: true,
                attributeFilter: ['class']
            });
        }

        return () => observer.disconnect();
    }, []);

    const customThemeStyle = {
        'code[class*="language-"]': {
            color: isDarkMode ? '#e5e7eb' : '#1f2937',
            background: 'transparent',
        },
        'pre[class*="language-"]': {
            color: isDarkMode ? '#e5e7eb' : '#1f2937',
            background: 'transparent',
        },
        'comment': { color: '#6b7280' },
        'string': { color: isDarkMode ? '#10b981' : '#059669' },
        'keyword': { color: 'hsl(var(--primary))' },
        'function': { color: isDarkMode ? '#3b82f6' : '#2563eb' },
        'number': { color: isDarkMode ? '#f59e0b' : '#d97706' },
        'operator': { color: isDarkMode ? '#e5e7eb' : '#1f2937' },
        'punctuation': { color: isDarkMode ? '#9ca3af' : '#6b7280' },
        'property': { color: isDarkMode ? '#06b6d4' : '#0891b2' },
        'boolean': { color: isDarkMode ? '#f59e0b' : '#d97706' },
        'constant': { color: isDarkMode ? '#f59e0b' : '#d97706' },
        'class-name': { color: 'hsl(var(--primary))' },
    };

    return (
        <div className="flex flex-col lg:flex-row gap-6 mt-6">
            {/* Tree */}
            <Card className="w-full lg:w-1/3 border-muted bg-muted/10">
                <CardHeader className="py-3 px-4 border-b">
                    <CardTitle className="text-sm font-bold flex items-center gap-2 text-muted-foreground uppercase tracking-wider">
                        <Folder className="w-4 h-4" />
                        Explorer
                    </CardTitle>
                </CardHeader>
                <CardContent className="p-4 overflow-x-auto">
                    <TreeView
                        nodeLabel={
                            <span className="inline-flex items-center gap-2 font-bold text-primary">
                                <Folder className="w-4 h-4 fill-primary/20" />
                                my-portfolio
                            </span>
                        }
                        defaultCollapsed={false}
                    >
                        <TreeView
                            nodeLabel={
                                <span className="inline-flex items-center gap-2 text-muted-foreground font-medium">
                                    <Folder className="w-4 h-4 fill-yellow-500/20 text-yellow-500" />
                                    components
                                </span>
                            }
                            defaultCollapsed={true}
                        >
                            <div className="pl-6 flex items-center gap-2 text-sm py-1 hover:text-primary transition-colors cursor-default">
                                <FileCode className="w-4 h-4 text-blue-400" />
                                Navbar.js
                            </div>
                            <div className="pl-6 flex items-center gap-2 text-sm py-1 hover:text-primary transition-colors cursor-default">
                                <FileCode className="w-4 h-4 text-blue-400" />
                                Footer.js
                            </div>
                        </TreeView>

                        <TreeView
                            nodeLabel={
                                <span className="inline-flex items-center gap-2 text-muted-foreground font-medium">
                                    <Folder className="w-4 h-4 fill-yellow-500/20 text-yellow-500" />
                                    data
                                </span>
                            }
                            defaultCollapsed={true}
                        >
                            <div className="pl-6 flex items-center gap-2 text-sm py-1 hover:text-primary transition-colors cursor-default">
                                <FileJson className="w-4 h-4 text-orange-400" />
                                work.json
                            </div>
                            <div className="pl-6 flex items-center gap-2 text-sm py-1 hover:text-primary transition-colors cursor-default">
                                <FileJson className="w-4 h-4 text-orange-400" />
                                skills.json
                            </div>
                        </TreeView>

                        <TreeView
                            nodeLabel={
                                <span className="inline-flex items-center gap-2 text-muted-foreground font-medium">
                                    <Folder className="w-4 h-4 fill-yellow-500/20 text-yellow-500" />
                                    pages
                                </span>
                            }
                            defaultCollapsed={false}
                        >
                            <div className="pl-6 flex items-center gap-2 text-sm py-1 text-primary font-bold bg-primary/5 rounded px-2 cursor-default">
                                <FileCode className="w-4 h-4" />
                                index.js
                            </div>

                            <div className="pl-6 flex items-center gap-2 text-sm py-1 hover:text-primary transition-colors cursor-default">
                                <FileCode className="w-4 h-4 text-blue-400" />
                                _app.js
                            </div>
                        </TreeView>

                        <TreeView
                            nodeLabel={
                                <span className="inline-flex items-center gap-2 text-muted-foreground font-medium">
                                    <Folder className="w-4 h-4 fill-yellow-500/20 text-yellow-500" />
                                    public
                                </span>
                            }
                            defaultCollapsed={true}
                        >
                            <div className="pl-6 flex items-center gap-2 text-sm py-1 cursor-default opacity-70">projects/</div>
                            <div className="pl-6 flex items-center gap-2 text-sm py-1 cursor-default opacity-70">images/</div>
                        </TreeView>

                        <div className="pl-6 inline-flex items-center gap-2 text-sm py-1 text-muted-foreground hover:text-primary transition-colors cursor-default">
                            <Folder className="w-4 h-4 fill-yellow-500/20 text-yellow-500" />
                            styles
                        </div>
                    </TreeView>
                </CardContent>
            </Card>

            {/* Code preview */}
            <Card className="w-full lg:w-2/3 border-muted bg-background shadow-xl overflow-hidden">
                <CardHeader className="py-2 px-4 bg-muted/50 border-b flex flex-row items-center justify-between">
                    <div className="flex items-center gap-2">
                        <div className="flex gap-1.5 mr-4">
                            <div className="w-3 h-3 rounded-full bg-red-500/80" />
                            <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                            <div className="w-3 h-3 rounded-full bg-green-500/80" />
                        </div>
                        <Badge variant="secondary" className="font-mono text-[10px] md:text-xs py-0 gap-1.5 text-primary">
                            <Terminal className="w-3 h-3" />
                            pages/index.js
                        </Badge>
                    </div>
                </CardHeader>
                <CardContent className="p-0 overflow-x-auto">
                    <SyntaxHighlighter
                        language="javascript"
                        style={customThemeStyle}
                        customStyle={{
                            margin: 0,
                            padding: '1.5rem',
                            backgroundColor: 'transparent',
                            fontSize: '0.85rem',
                            lineHeight: '1.6',
                            minWidth: 0,
                        }}
                    >
                        {indexJsCode}
                    </SyntaxHighlighter>
                </CardContent>
            </Card>
        </div>
    );
}
