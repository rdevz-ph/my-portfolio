import { useState } from 'react';
import Swal from 'sweetalert2';
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Github, Linkedin, Facebook, Send, Loader2, Mail } from "lucide-react";

export default function ContactSection() {
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const form = e.target;

        setLoading(true);

        const res = await fetch('https://formspree.io/f/mqabvyeb', {
            method: 'POST',
            headers: { 'Accept': 'application/json' },
            body: new FormData(form),
        });

        setLoading(false);

        if (res.ok) {
            Swal.fire({
                icon: 'success',
                title: 'Message Sent',
                text: 'Thank you for reaching out. I will get back to you shortly.',
                confirmButtonColor: '#18181b',
                background: 'var(--card)',
                color: 'var(--foreground)'
            });
            form.reset();
        } else {
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Something went wrong. Please try again.',
                confirmButtonColor: '#27272a',
                background: 'var(--card)',
                color: 'var(--foreground)'
            });
        }
    };

    return (
        <section id="contact" className="scroll-mt-16 py-16 sm:py-24 border-t border-border bg-muted/20">
            <div className="max-w-2xl mx-auto px-4">
                <div className="text-center mb-8" data-aos="fade-up">
                    <div className="flex justify-center mb-2">
                        <div className="p-2 rounded-lg bg-secondary text-foreground">
                            <Mail className="w-5 h-5" />
                        </div>
                    </div>
                    <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground">
                        Get In Touch
                    </h2>
                    <p className="mt-2 text-sm text-muted-foreground">
                        Have a project inquiry, collaboration proposal, or technical question? Send a message directly.
                    </p>
                </div>

                <Card className="border border-border bg-card/80 shadow-xs" data-aos="fade-up" data-aos-delay="150">
                    <CardHeader className="pb-2">
                        <CardTitle className="text-base font-semibold text-foreground">
                            Direct Message
                        </CardTitle>
                        <CardDescription className="text-xs text-muted-foreground">
                            Fill in your details below and I&apos;ll respond via email.
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="p-6 pt-2">
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div className="space-y-1.5">
                                    <label className="text-xs font-mono text-muted-foreground">Name</label>
                                    <Input
                                        type="text"
                                        name="name"
                                        required
                                        placeholder="Your Name"
                                        className="h-10 text-sm border-border bg-background focus-visible:ring-ring"
                                    />
                                </div>
                                <div className="space-y-1.5">
                                    <label className="text-xs font-mono text-muted-foreground">Email</label>
                                    <Input
                                        type="email"
                                        name="email"
                                        required
                                        placeholder="name@example.com"
                                        className="h-10 text-sm border-border bg-background focus-visible:ring-ring"
                                    />
                                </div>
                            </div>
                            <div className="space-y-1.5">
                                <label className="text-xs font-mono text-muted-foreground">Message</label>
                                <Textarea
                                    name="message"
                                    required
                                    rows={4}
                                    placeholder="Write your message here..."
                                    className="min-h-[120px] text-sm border-border bg-background focus-visible:ring-ring resize-none"
                                />
                            </div>
                            <Button
                                type="submit"
                                disabled={loading}
                                className="w-full sm:w-auto h-9 px-5 text-xs font-mono font-medium gap-2 shadow-xs"
                            >
                                {loading ? (
                                    <>
                                        <Loader2 className="h-3.5 w-3.5 animate-spin" />
                                        Sending...
                                    </>
                                ) : (
                                    <>
                                        <Send className="h-3.5 w-3.5" />
                                        Send Message
                                    </>
                                )}
                            </Button>
                        </form>
                    </CardContent>
                </Card>

                {/* Social Links */}
                <div
                    className="flex flex-wrap justify-center gap-3 mt-8"
                    data-aos="fade-up"
                    data-aos-delay="200"
                >
                    {[
                        { href: "https://github.com/rdevz-ph", icon: Github, label: "GitHub" },
                        { href: "https://linkedin.com/in/romel-brosas-b547572a8", icon: Linkedin, label: "LinkedIn" },
                        { href: "https://facebook.com/rdevzph.dev", icon: Facebook, label: "Facebook" },
                    ].map((social) => (
                        <Button
                            key={social.label}
                            render={
                                <a
                                    href={social.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                />
                            }
                            variant="outline"
                            size="sm"
                            className="gap-2 font-mono text-xs text-muted-foreground hover:text-foreground border-border"
                        >
                            <social.icon className="w-3.5 h-3.5" />
                            <span>{social.label}</span>
                        </Button>
                    ))}
                </div>
            </div>
        </section>
    );
}
