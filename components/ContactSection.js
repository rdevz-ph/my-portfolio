import { useState } from 'react';
import Swal from 'sweetalert2';
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Github, Linkedin, Facebook, Send, Loader2 } from "lucide-react";

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
                title: 'Message Sent!',
                text: 'Thank you for reaching out. I will get back to you shortly.',
                confirmButtonColor: '#8b5cf6'
            });
            form.reset();
        } else {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Something went wrong. Please try again.',
                confirmButtonColor: '#ef4444'
            });
        }
    };

    return (
        <section id="contact" className="py-24 bg-muted/30">
            <div className="max-w-3xl mx-auto px-4">
                <div className="text-center mb-12" data-aos="fade-up">
                    <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                        Contact Me
                    </h2>
                    <div className="mt-4 mx-auto w-24 h-1 bg-primary rounded-full" />
                    <p className="mt-6 text-lg text-muted-foreground">
                        Want to work together or have a question? Feel free to reach out!
                    </p>
                </div>

                <Card className="border-muted shadow-lg" data-aos="fade-up" data-aos-delay="200">
                    <CardContent className="p-8">
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Input
                                        type="text"
                                        name="name"
                                        required
                                        placeholder="Your Name"
                                        className="h-12 border-muted-foreground/20 focus-visible:ring-primary"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Input
                                        type="email"
                                        name="email"
                                        required
                                        placeholder="Your Email"
                                        className="h-12 border-muted-foreground/20 focus-visible:ring-primary"
                                    />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <Textarea
                                    name="message"
                                    required
                                    rows={5}
                                    placeholder="Your Message"
                                    className="min-h-[150px] border-muted-foreground/20 focus-visible:ring-primary resize-none"
                                />
                            </div>
                            <Button
                                type="submit"
                                disabled={loading}
                                className="w-full sm:w-auto h-12 px-8 text-sm md:text-base font-semibold transition-all hover:scale-105 active:scale-95"
                            >
                                {loading ? (
                                    <>
                                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                        Sending...
                                    </>
                                ) : (
                                    <>
                                        <Send className="mr-2 h-4 w-4" />
                                        Send Message
                                    </>
                                )}
                            </Button>
                        </form>
                    </CardContent>
                </Card>

                {/* Social Links */}
                <div
                    className="flex flex-wrap justify-center gap-6 mt-12"
                    data-aos="fade-up"
                    data-aos-delay="300"
                >
                    {[
                        { href: "https://github.com/rdevz-ph", icon: Github, label: "GitHub" },
                        { href: "https://linkedin.com/in/romel-brosas-b547572a8", icon: Linkedin, label: "LinkedIn" },
                        { href: "https://facebook.com/rdevzph.dev", icon: Facebook, label: "Facebook" },
                    ].map((social) => (
                        <a
                            key={social.label}
                            href={social.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors group"
                        >
                            <social.icon className="w-5 h-5 group-hover:scale-110 transition-transform" />
                            <span className="font-medium">{social.label}</span>
                        </a>
                    ))}
                </div>
            </div>
        </section>
    );
}
