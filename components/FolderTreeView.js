import { useState, useEffect } from 'react';
import TreeView from 'react-treeview';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
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

    // Clean, neutral monochrome syntax styling (Zero RGB)
    const customThemeStyle = {
        'code[class*="language-"]': {
            color: isDarkMode ? '#e4e4e7' : '#18181b',
            background: 'transparent',
            fontFamily: 'var(--font-geist-mono), monospace',
        },
        'pre[class*="language-"]': {
            color: isDarkMode ? '#e4e4e7' : '#18181b',
            background: 'transparent',
            fontFamily: 'var(--font-geist-mono), monospace',
        },
        'comment': { color: isDarkMode ? '#71717a' : '#a1a1aa' },
        'string': { color: isDarkMode ? '#d4d4d8' : '#3f3f46' },
        'keyword': { color: isDarkMode ? '#fafafa' : '#09090b', fontWeight: '600' },
        'function': { color: isDarkMode ? '#f4f4f5' : '#27272a' },
        'number': { color: isDarkMode ? '#d4d4d8' : '#52525b' },
        'operator': { color: isDarkMode ? '#a1a1aa' : '#71717a' },
        'punctuation': { color: isDarkMode ? '#71717a' : '#a1a1aa' },
        'property': { color: isDarkMode ? '#e4e4e7' : '#18181b' },
        'boolean': { color: isDarkMode ? '#fafafa' : '#09090b', fontWeight: '600' },
        'constant': { color: isDarkMode ? '#e4e4e7' : '#27272a' },
        'class-name': { color: isDarkMode ? '#fafafa' : '#09090b', fontWeight: '600' },
    };

    return (
        <div className="flex flex-col lg:flex-row gap-4">
            {/* Tree */}
            <Card className="w-full lg:w-1/3 border border-border bg-background/50 shadow-none">
                <CardHeader className="py-2.5 px-3.5 border-b border-border bg-muted/20">
                    <CardTitle className="text-xs font-mono font-medium flex items-center gap-2 text-muted-foreground uppercase tracking-wider">
                        <Folder className="w-3.5 h-3.5 text-foreground" />
                        Directory
                    </CardTitle>
                </CardHeader>
                <CardContent className="p-3 overflow-x-auto text-xs font-mono">
                    <TreeView
                        nodeLabel={
                            <span className="inline-flex items-center gap-1.5 font-semibold text-foreground">
                                <Folder className="w-3.5 h-3.5 text-foreground" />
                                my-portfolio
                            </span>
                        }
                        defaultCollapsed={false}
                    >
                        <TreeView
                            nodeLabel={
                                <span className="inline-flex items-center gap-1.5 text-muted-foreground font-medium hover:text-foreground transition-colors">
                                    <Folder className="w-3.5 h-3.5" />
                                    components
                                </span>
                            }
                            defaultCollapsed={true}
                        >
                            <div className="pl-5 flex items-center gap-1.5 py-1 text-muted-foreground hover:text-foreground transition-colors cursor-default">
                                <FileCode className="w-3.5 h-3.5" />
                                Navbar.js
                            </div>
                            <div className="pl-5 flex items-center gap-1.5 py-1 text-muted-foreground hover:text-foreground transition-colors cursor-default">
                                <FileCode className="w-3.5 h-3.5" />
                                Footer.js
                            </div>
                        </TreeView>

                        <TreeView
                            nodeLabel={
                                <span className="inline-flex items-center gap-1.5 text-muted-foreground font-medium hover:text-foreground transition-colors">
                                    <Folder className="w-3.5 h-3.5" />
                                    data
                                </span>
                            }
                            defaultCollapsed={true}
                        >
                            <div className="pl-5 flex items-center gap-1.5 py-1 text-muted-foreground hover:text-foreground transition-colors cursor-default">
                                <FileJson className="w-3.5 h-3.5" />
                                work.json
                            </div>
                            <div className="pl-5 flex items-center gap-1.5 py-1 text-muted-foreground hover:text-foreground transition-colors cursor-default">
                                <FileJson className="w-3.5 h-3.5" />
                                skills.json
                            </div>
                        </TreeView>

                        <TreeView
                            nodeLabel={
                                <span className="inline-flex items-center gap-1.5 text-muted-foreground font-medium hover:text-foreground transition-colors">
                                    <Folder className="w-3.5 h-3.5" />
                                    pages
                                </span>
                            }
                            defaultCollapsed={false}
                        >
                            <div className="pl-5 flex items-center gap-1.5 py-1 text-foreground font-medium bg-secondary/50 rounded px-1.5 cursor-default">
                                <FileCode className="w-3.5 h-3.5" />
                                index.js
                            </div>

                            <div className="pl-5 flex items-center gap-1.5 py-1 text-muted-foreground hover:text-foreground transition-colors cursor-default">
                                <FileCode className="w-3.5 h-3.5" />
                                _app.js
                            </div>
                        </TreeView>

                        <TreeView
                            nodeLabel={
                                <span className="inline-flex items-center gap-1.5 text-muted-foreground font-medium hover:text-foreground transition-colors">
                                    <Folder className="w-3.5 h-3.5" />
                                    public
                                </span>
                            }
                            defaultCollapsed={true}
                        >
                            <div className="pl-5 flex items-center gap-1.5 py-1 text-muted-foreground/70 cursor-default">projects/</div>
                            <div className="pl-5 flex items-center gap-1.5 py-1 text-muted-foreground/70 cursor-default">images/</div>
                        </TreeView>

                        <div className="pl-5 inline-flex items-center gap-1.5 py-1 text-muted-foreground hover:text-foreground transition-colors cursor-default">
                            <Folder className="w-3.5 h-3.5" />
                            styles
                        </div>
                    </TreeView>
                </CardContent>
            </Card>

            {/* Code preview */}
            <Card className="w-full lg:w-2/3 border border-border bg-background shadow-none overflow-hidden">
                <CardHeader className="py-2.5 px-4 bg-muted/20 border-b border-border flex flex-row items-center justify-between">
                    <div className="flex items-center gap-2">
                        <div className="flex gap-1.5 mr-2">
                            <div className="w-2.5 h-2.5 rounded-full border border-border bg-muted" />
                            <div className="w-2.5 h-2.5 rounded-full border border-border bg-muted" />
                            <div className="w-2.5 h-2.5 rounded-full border border-border bg-muted" />
                        </div>
                        <Badge variant="outline" className="font-mono text-[11px] py-0 gap-1.5 text-foreground border-border bg-background">
                            <Terminal className="w-3 h-3 text-muted-foreground" />
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
                            padding: '1.25rem',
                            backgroundColor: 'transparent',
                            fontSize: '0.8rem',
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
