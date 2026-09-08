import { useState, useEffect, useRef } from 'react';
import { MessageCircle, X, Send, User, Bot, Loader2, History, Info } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import { Checkbox } from "@/components/ui/checkbox";
import Swal from 'sweetalert2';
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip"

const renderInline = (text) => {
    if (typeof text !== 'string') return text;

    // Regex for URLs, Emails, and Bold text
    const urlRegex = /(https?:\/\/[^\s]+)/g;
    const emailRegex = /([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9._-]+)/g;
    const boldRegex = /\*\*(.*?)\*\*/g;

    // Split by URLs first
    const parts = text.split(urlRegex);

    return parts.map((part, i) => {
        if (part.match(urlRegex)) {
            return (
                <a 
                    key={`url-${i}`} 
                    href={part} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="text-foreground underline underline-offset-2 hover:text-muted-foreground break-all transition-colors font-mono text-xs"
                >
                    {part}
                </a>
            );
        }

        const emailParts = part.split(emailRegex);
        return emailParts.map((ePart, k) => {
            if (ePart.match(emailRegex)) {
                return (
                    <a 
                        key={`email-${i}-${k}`} 
                        href={`mailto:${ePart}`}
                        className="text-foreground underline underline-offset-2 hover:text-muted-foreground break-all transition-colors font-mono text-xs"
                    >
                        {ePart}
                    </a>
                );
            }

            const boldParts = ePart.split(boldRegex);
            return boldParts.map((boldPart, j) => {
                if (j % 2 === 1) {
                    return <strong key={`bold-${i}-${k}-${j}`} className="font-bold text-foreground">{boldPart}</strong>;
                }
                return boldPart;
            });
        });
    });
};

const formatResponse = (text) => {
    if (!text) return null;

    // Normalize: Add newlines before bullet points if they are missing
    // and handle both * and • characters
    const normalizedText = text.replace(/ ([*•]) /g, '\n$1 ');
    
    const lines = normalizedText.split('\n');

    return lines.map((line, i) => {
        // Detect Headers (e.g., ### Backend)
        const headerMatch = line.match(/^(#{1,6})\s+(.*)/);
        if (headerMatch) {
            const level = headerMatch[1].length;
            const content = headerMatch[2];
            // Style based on header level
            const headerClasses = cn(
                "font-bold text-foreground mt-4 mb-2 first:mt-0",
                level === 1 && "text-xl",
                level === 2 && "text-lg",
                level >= 3 && "text-base"
            );
            return (
                <div key={i} className={headerClasses}>
                    {renderInline(content)}
                </div>
            );
        }

        // Detect bullet points
        const bulletMatch = line.match(/^(\s*[*•]\s+)(.*)/) || line.match(/^(\s*[*•]\s*)$/);
        if (bulletMatch) {
            const content = bulletMatch[2] || "";
            return (
                <div key={i} className="flex gap-2 ml-2 my-1 leading-relaxed">
                    <span className="text-foreground shrink-0 mt-1">•</span>
                    <div className="flex-1">{renderInline(content)}</div>
                </div>
            );
        }

        // Regular text line
        if (line.trim() === '') {
            return <div key={i} className="h-2" />;
        }

        return (
            <div key={i} className="mb-2 last:mb-0 leading-relaxed text-muted-foreground">
                {renderInline(line)}
            </div>
        );
    });
};

const TypingText = ({ text, onComplete }) => {
    const [displayedText, setDisplayedText] = useState('');
    const [index, setIndex] = useState(0);
    const hasCompleted = useRef(false);

    useEffect(() => {
        if (index < text.length) {
            const timeout = setTimeout(() => {
                setDisplayedText((prev) => prev + text[index]);
                setIndex((prev) => prev + 1);
            }, 10); // Slightly faster for long responses
            return () => clearTimeout(timeout);
        } else if (onComplete && !hasCompleted.current) {
            hasCompleted.current = true;
            onComplete();
        }
    }, [index, text, onComplete]);

    return <div className="w-full">{formatResponse(displayedText)}</div>;
};

export default function AIChatBox() {
    const [isOpen, setIsOpen] = useState(false);
    const [showNotification, setShowNotification] = useState(false);
    const [input, setInput] = useState('');
    const [isOnline, setIsOnline] = useState(false);
    const [rememberChat, setRememberChat] = useState(true);

    const [messages, setMessages] = useState([
        { role: 'assistant', content: 'Hello! How can I help you today?', isTyped: true, timestamp: new Date().toISOString() }
    ]);

    // Load persistence settings and history
    useEffect(() => {
        const savedRemember = localStorage.getItem('ai_chat_remember');
        if (savedRemember !== null) {
            setRememberChat(savedRemember === 'true');
        }

        if (savedRemember === 'true' || savedRemember === null) {
            const savedHistory = localStorage.getItem('ai_chat_history');
            if (savedHistory) {
                try {
                    const parsed = JSON.parse(savedHistory);
                    // Ensure all historical messages are marked as typed
                    setMessages(parsed.map(msg => ({ ...msg, isTyped: true })));
                } catch (e) {
                    console.error('Failed to parse history', e);
                }
            }
        }
    }, []);

    // Save history when messages change
    useEffect(() => {
        if (rememberChat) {
            localStorage.setItem('ai_chat_history', JSON.stringify(messages));
        } else {
            localStorage.removeItem('ai_chat_history');
        }
    }, [messages, rememberChat]);

    // Save remember setting
    useEffect(() => {
        localStorage.setItem('ai_chat_remember', rememberChat);
        if (!rememberChat) {
            localStorage.removeItem('ai_chat_history');
        }
    }, [rememberChat]);

    useEffect(() => {
        const checkHealth = async () => {
            try {
                // Construct health URL from base API URL
                const apiUrl = process.env.NEXT_PUBLIC_AI_API_URL;
                if (!apiUrl) return;
                
                const healthUrl = apiUrl.replace('/api/chat', '/api/health');
                const response = await fetch(healthUrl);
                const data = await response.json();
                setIsOnline(data.status === 'online');
            } catch (error) {
                console.error('Health check failed:', error);
                setIsOnline(false);
            }
        };

        checkHealth();
        const interval = setInterval(checkHealth, 30000); // Check every 30s
        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        const timer = setTimeout(() => {
            setShowNotification(true);
        }, 1000);
        return () => clearTimeout(timer);
    }, []);

    const [isLoading, setIsLoading] = useState(false);
    const scrollRef = useRef(null);

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [messages, isOpen]);

    const handleSendMessage = async (e) => {
        e.preventDefault();
        if (!input.trim() || isLoading) return;

        const timestamp = new Date().toISOString();
        const userMessage = { role: 'user', content: input, timestamp };
        const newMessages = [...messages, userMessage];
        setMessages(newMessages);
        setInput('');
        setIsLoading(true);

        try {
            const apiUrl = process.env.NEXT_PUBLIC_AI_API_URL;
            if (!apiUrl) {
                throw new Error("AI API URL is not defined in environment variables.");
            }

            // Construct history (all messages EXCEPT the one we just sent)
            const historyContext = messages.map(msg => 
                `${msg.role === 'user' ? 'User' : 'Assistant'}: ${msg.content} (Timestamp: ${msg.timestamp})`
            ).join('\n');

            // Construct final prompt matching your sample
            const prompt = `${historyContext}\n\n[System Note: The above is a chat history. Use it for context but focus on the latest user message.]\nCurrent User Message: ${input} (Timestamp: ${timestamp})`;

            const response = await fetch(apiUrl, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ 
                    message: prompt,
                    raw_message: input
                }),
            });

            if (!response.ok) {
                throw new Error(`API responded with status: ${response.status}`);
            }

            const data = await response.json();
            const assistantTimestamp = new Date().toISOString();
            if (data.response) {
                setMessages(prev => [...prev, { 
                    role: 'assistant', 
                    content: data.response, 
                    isTyped: false, 
                    timestamp: assistantTimestamp 
                }]);
            } else {
                setMessages(prev => [...prev, { 
                    role: 'assistant', 
                    content: "I received an unexpected response format from the server.", 
                    isTyped: false, 
                    timestamp: assistantTimestamp 
                }]);
            }
        } catch (error) {
            console.error('Chat Error Details:', error);
            let errorMessage = "Sorry, I'm having trouble connecting to the AI right now.";
            
            if (error.message === 'Failed to fetch') {
                errorMessage = "Connection error. This might be a CORS issue or the server is down. Please check the console for details.";
            }
            
            setMessages(prev => [...prev, { 
                role: 'assistant', 
                content: errorMessage, 
                isTyped: false, 
                timestamp: new Date().toISOString() 
            }]);
        } finally {
            setIsLoading(false);
        }
    };

    const toggleChat = () => {
        setIsOpen(!isOpen);
        if (showNotification) setShowNotification(false);
    };

    const handleRememberToggle = async (checked) => {
        if (!checked) {
            const result = await Swal.fire({
                title: 'Clear Chat History?',
                text: "Disabling 'Remember Chat' will immediately clear your current conversation and saved history.",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: 'var(--primary)',
                cancelButtonColor: 'var(--destructive)',
                confirmButtonText: 'Yes, clear it!',
                cancelButtonText: 'No, keep it',
                background: 'var(--card)',
                color: 'var(--foreground)'
            });

            if (!result.isConfirmed) return;

            // Immediately clear history from state and storage
            setMessages([{ 
                role: 'assistant', 
                content: 'Hello! How can I help you today?', 
                isTyped: true, 
                timestamp: new Date().toISOString() 
            }]);
            localStorage.removeItem('ai_chat_history');
        }
        setRememberChat(checked);
    };

    return (
        <div className="fixed bottom-20 right-6 sm:bottom-24 sm:right-8 z-50 flex flex-col items-end">
            {/* Chat Window */}
            {isOpen && (
                <Card className="mb-3 w-[340px] sm:w-[380px] h-[480px] shadow-lg flex flex-col overflow-hidden animate-in slide-in-from-bottom-3 duration-200 p-0 gap-0 border border-border bg-background">
                    <CardHeader className="bg-muted/40 border-b border-border p-3.5 flex flex-row items-center justify-between space-y-0 rounded-none">
                        <div className="flex flex-col">
                            <div className="flex items-center gap-2">
                                <Bot className="w-4 h-4 text-foreground" />
                                <CardTitle className="text-sm font-semibold font-mono text-foreground">AI Assistant</CardTitle>
                            </div>
                            <div className="flex items-center gap-1.5 ml-6">
                                <div className={cn("w-1.5 h-1.5 rounded-full", isOnline ? "bg-foreground" : "bg-muted-foreground")} />
                                <span className="text-[10px] font-mono text-muted-foreground uppercase tracking-wider">
                                    {isOnline ? "Online" : "Offline"}
                                </span>
                            </div>
                        </div>
                        <div className="flex items-center gap-1">
                            <TooltipProvider>
                                <Tooltip>
                                   <TooltipTrigger 
                                       render={
                                           <div className="flex items-center gap-1.5 px-2 py-1 bg-secondary rounded-md mr-1 cursor-help">
                                               <Checkbox 
                                                   id="remember" 
                                                   checked={rememberChat} 
                                                   onCheckedChange={handleRememberToggle}
                                                   className="h-3 w-3"
                                               />
                                               <History className="w-3 h-3 text-muted-foreground" />
                                           </div>
                                       }
                                   />
                                   <TooltipContent side="bottom" className="max-w-[200px] text-xs">
                                        <p>Save chat history locally in your browser.</p>
                                    </TooltipContent>
                                </Tooltip>
                            </TooltipProvider>
                            <Button variant="ghost" size="icon" onClick={() => setIsOpen(false)} className="h-7 w-7 text-muted-foreground hover:text-foreground">
                                <X className="w-4 h-4" />
                            </Button>
                        </div>
                    </CardHeader>
                    
                    <CardContent className="flex-1 overflow-y-auto p-3.5 space-y-3" ref={scrollRef}>
                        {messages.map((msg, index) => (
                            <div key={index} className={cn("flex w-full gap-2", msg.role === 'user' ? "flex-row-reverse" : "flex-row")}>
                                <Avatar className="h-7 w-7 shrink-0 border border-border">
                                    {msg.role === 'assistant' ? (
                                        <>
                                            <AvatarImage src="/images/profile.jpg" alt="AI" />
                                            <AvatarFallback><Bot className="w-3.5 h-3.5" /></AvatarFallback>
                                        </>
                                    ) : (
                                        <AvatarFallback className="bg-secondary text-foreground text-xs"><User className="w-3.5 h-3.5" /></AvatarFallback>
                                    )}
                                </Avatar>
                                <div className={cn(
                                    "max-w-[82%] p-2.5 rounded-lg text-xs leading-relaxed",
                                    msg.role === 'user' 
                                        ? "bg-primary text-primary-foreground font-medium" 
                                        : "bg-muted/60 text-foreground border border-border/60"
                                )}>
                                    {msg.role === 'assistant' ? (
                                        msg.isTyped ? (
                                            <div className="w-full">{formatResponse(msg.content)}</div>
                                        ) : (
                                            <TypingText 
                                                text={msg.content} 
                                                onComplete={() => {
                                                    setMessages(prev => prev.map((m, i) => i === index ? { ...m, isTyped: true } : m));
                                                    if (scrollRef.current) {
                                                        scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
                                                    }
                                                }} 
                                            />
                                        )
                                    ) : (
                                        msg.content
                                    )}
                                    {msg.timestamp && (
                                        <div className={cn(
                                            "text-[9px] font-mono mt-1 opacity-60",
                                            msg.role === 'user' ? "text-right" : "text-left"
                                        )}>
                                            {new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                        </div>
                                    )}
                                </div>
                            </div>
                        ))}
                        {isLoading && (
                            <div className="flex justify-start gap-2">
                                <Avatar className="h-7 w-7 shrink-0 border border-border">
                                    <AvatarImage src="/images/profile.jpg" alt="AI" />
                                    <AvatarFallback><Bot className="w-3.5 h-3.5" /></AvatarFallback>
                                </Avatar>
                                <div className="bg-muted/60 text-muted-foreground p-2.5 rounded-lg border border-border flex items-center gap-2 text-xs">
                                    <Loader2 className="w-3.5 h-3.5 animate-spin text-foreground" />
                                    <span className="font-mono text-[11px]">Processing...</span>
                                </div>
                            </div>
                        )}
                    </CardContent>

                    <CardFooter className="p-3 border-t border-border bg-background">
                        <form onSubmit={handleSendMessage} className="flex w-full gap-2">
                            <Input 
                                placeholder="Ask a question..." 
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                className="flex-1 h-8 text-xs font-mono border-border bg-muted/30"
                                disabled={isLoading}
                            />
                            <Button type="submit" size="icon" className="h-8 w-8" disabled={isLoading || !input.trim()}>
                                <Send className="w-3.5 h-3.5" />
                            </Button>
                        </form>
                    </CardFooter>
                </Card>
            )}

            {/* Notification Bubble */}
            {showNotification && !isOpen && (
                <div className="mb-3 mr-1 bg-card border border-border shadow-md p-3 rounded-lg max-w-[200px] text-xs font-mono relative">
                    <div className="font-semibold text-foreground mb-0.5">AI Assistant</div>
                    <span className="text-muted-foreground">Ask anything about my experience or projects.</span>
                </div>
            )}

            {/* Floating Toggle Button */}
            <div className="relative">
                <Button
                    size="icon"
                    onClick={toggleChat}
                    className={cn(
                        "rounded-full shadow-md transition-all duration-200 h-11 w-11 border border-border",
                        isOpen ? "bg-secondary text-foreground hover:bg-muted" : "bg-primary text-primary-foreground hover:bg-primary/90"
                    )}
                >
                    {isOpen ? <X className="w-5 h-5" /> : <MessageCircle className="w-5 h-5" />}
                </Button>
                
                {showNotification && !isOpen && (
                    <span className="absolute -top-1 -right-1 h-3 w-3 rounded-full bg-foreground ring-2 ring-background" />
                )}
            </div>
        </div>
    );
}
