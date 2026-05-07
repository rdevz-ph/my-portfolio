import { useState, useEffect, useRef } from 'react';
import { MessageCircle, X, Send, User, Bot, Loader2 } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";

const TypingText = ({ text, onComplete }) => {
    const [displayedText, setDisplayedText] = useState('');
    const [index, setIndex] = useState(0);

    useEffect(() => {
        if (index < text.length) {
            const timeout = setTimeout(() => {
                setDisplayedText((prev) => prev + text[index]);
                setIndex((prev) => prev + 1);
            }, 15); // Adjust speed here (lower = faster)
            return () => clearTimeout(timeout);
        } else if (onComplete) {
            onComplete();
        }
    }, [index, text, onComplete]);

    return <span>{displayedText}</span>;
};

export default function AIChatBox() {
    const [isOpen, setIsOpen] = useState(false);
    const [showNotification, setShowNotification] = useState(false);
    const [input, setInput] = useState('');

    useEffect(() => {
        const timer = setTimeout(() => {
            setShowNotification(true);
        }, 1000);
        return () => clearTimeout(timer);
    }, []);
    const [messages, setMessages] = useState([
        { role: 'assistant', content: 'Hello! How can I help you today?' }
    ]);
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

        const userMessage = { role: 'user', content: input };
        setMessages(prev => [...prev, userMessage]);
        setInput('');
        setIsLoading(true);

        try {
            const apiUrl = process.env.NEXT_PUBLIC_AI_API_URL;
            if (!apiUrl) {
                throw new Error("AI API URL is not defined in environment variables.");
            }

            const response = await fetch(apiUrl, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ message: input }),
            });

            if (!response.ok) {
                throw new Error(`API responded with status: ${response.status}`);
            }

            const data = await response.json();
            if (data.response) {
                setMessages(prev => [...prev, { role: 'assistant', content: data.response }]);
            } else {
                setMessages(prev => [...prev, { role: 'assistant', content: "I received an unexpected response format from the server." }]);
            }
        } catch (error) {
            console.error('Chat Error Details:', error);
            let errorMessage = "Sorry, I'm having trouble connecting to the AI right now.";
            
            if (error.message === 'Failed to fetch') {
                errorMessage = "Connection error. This might be a CORS issue or the server is down. Please check the console for details.";
            }
            
            setMessages(prev => [...prev, { role: 'assistant', content: errorMessage }]);
        } finally {
            setIsLoading(false);
        }
    };

    const toggleChat = () => {
        setIsOpen(!isOpen);
        if (showNotification) setShowNotification(false);
    };

    return (
        <div className="fixed bottom-24 right-8 z-50 flex flex-col items-end">
            {/* Chat Window */}
            {isOpen && (
                <Card className="mb-4 w-[350px] sm:w-[400px] h-[500px] shadow-2xl flex flex-col overflow-hidden animate-in slide-in-from-bottom-5 duration-300 p-0 gap-0 border-none ring-1 ring-primary/20">
                    <CardHeader className="bg-primary text-primary-foreground p-4 flex flex-row items-center justify-between space-y-0 rounded-b-none">
                        <div className="flex items-center gap-2">
                            <Bot className="w-5 h-5" />
                            <CardTitle className="text-lg font-bold">AI Assistant</CardTitle>
                        </div>
                        <Button variant="ghost" size="icon" onClick={() => setIsOpen(false)} className="text-primary-foreground hover:bg-primary-foreground/10 h-8 w-8">
                            <X className="w-5 h-5" />
                        </Button>
                    </CardHeader>
                    
                    <CardContent className="flex-1 overflow-y-auto p-4 space-y-4" ref={scrollRef}>
                        {messages.map((msg, index) => (
                            <div key={index} className={cn("flex w-full gap-2", msg.role === 'user' ? "flex-row-reverse" : "flex-row")}>
                                <Avatar className="h-8 w-8 shrink-0">
                                    {msg.role === 'assistant' ? (
                                        <>
                                            <AvatarImage src="/images/profile.jpg" alt="AI" />
                                            <AvatarFallback><Bot className="w-4 h-4" /></AvatarFallback>
                                        </>
                                    ) : (
                                        <AvatarFallback className="bg-primary/10 text-primary"><User className="w-4 h-4" /></AvatarFallback>
                                    )}
                                </Avatar>
                                <div className={cn(
                                    "max-w-[80%] p-3 rounded-2xl text-sm",
                                    msg.role === 'user' 
                                        ? "bg-primary text-primary-foreground rounded-tr-none" 
                                        : "bg-muted text-muted-foreground rounded-tl-none border"
                                )}>
                                    {msg.role === 'assistant' ? (
                                        <TypingText 
                                            text={msg.content} 
                                            onComplete={() => {
                                                if (scrollRef.current) {
                                                    scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
                                                }
                                            }} 
                                        />
                                    ) : (
                                        msg.content
                                    )}
                                </div>
                            </div>
                        ))}
                        {isLoading && (
                            <div className="flex justify-start gap-2">
                                <Avatar className="h-8 w-8 shrink-0">
                                    <AvatarImage src="/images/profile.jpg" alt="AI" />
                                    <AvatarFallback><Bot className="w-4 h-4" /></AvatarFallback>
                                </Avatar>
                                <div className="bg-muted text-muted-foreground p-3 rounded-2xl rounded-tl-none border flex items-center gap-2">
                                    <Loader2 className="w-4 h-4 animate-spin" />
                                    <span className="text-xs">Thinking...</span>
                                </div>
                            </div>
                        )}
                    </CardContent>

                    <CardFooter className="p-4 border-t bg-muted/50">
                        <form onSubmit={handleSendMessage} className="flex w-full gap-2">
                            <Input 
                                placeholder="Type your message..." 
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                className="flex-1"
                                disabled={isLoading}
                            />
                            <Button type="submit" size="icon" disabled={isLoading || !input.trim()}>
                                <Send className="w-4 h-4" />
                            </Button>
                        </form>
                    </CardFooter>
                </Card>
            )}

            {/* Notification Bubble */}
            {showNotification && !isOpen && (
                <div className="mb-4 mr-2 bg-card border shadow-xl p-3 rounded-2xl rounded-br-none max-w-[200px] text-sm animate-bounce relative">
                    <div className="font-medium text-primary mb-1">AI Assistant</div>
                    Hello! How can I help you today?
                    <div className="absolute -bottom-2 right-4 w-4 h-4 bg-card border-r border-b rotate-45"></div>
                </div>
            )}

            {/* Floating Toggle Button */}
            <div className="relative">
                <Button
                    size="icon"
                    onClick={toggleChat}
                    className={cn(
                        "rounded-full shadow-2xl transition-all duration-300 h-14 w-14 hover:scale-110 active:scale-95",
                        isOpen ? "bg-destructive hover:bg-destructive/90" : "bg-primary hover:bg-primary/90"
                    )}
                >
                    {isOpen ? <X className="w-7 h-7" /> : <MessageCircle className="w-7 h-7" />}
                </Button>
                
                {showNotification && !isOpen && (
                    <Badge className="absolute -top-1 -right-1 h-6 w-6 flex items-center justify-center p-0 border-2 border-background animate-pulse">
                        1
                    </Badge>
                )}
            </div>
        </div>
    );
}
