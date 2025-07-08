import { useState } from 'react';

export default function ContactSection() {
    const [status, setStatus] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const form = e.target;

        setStatus('Sending...');

        const res = await fetch('https://formspree.io/f/mqabvyeb', {
            method: 'POST',
            headers: { 'Accept': 'application/json' },
            body: new FormData(form),
        });

        if (res.ok) {
            setStatus('Message sent successfully!');
            form.reset();
        } else {
            setStatus('Failed to send. Try again.');
        }
    };

    return (
        <section id="contact" className="py-16 bg-gray-100 dark:bg-gray-900">
            <div className="max-w-3xl mx-auto text-center px-4">
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">Contact Me</h2>
                <p className="text-gray-600 dark:text-gray-300 mb-8">
                    Want to work together or have a question? Feel free to reach out!
                </p>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <input type="text" name="name" required placeholder="Your Name" className="w-full px-4 py-3 rounded-md border dark:bg-gray-800 dark:border-gray-700 dark:text-white" />
                    <input type="email" name="email" required placeholder="Your Email" className="w-full px-4 py-3 rounded-md border dark:bg-gray-800 dark:border-gray-700 dark:text-white" />
                    <textarea name="message" required rows="5" placeholder="Your Message" className="w-full px-4 py-3 rounded-md border dark:bg-gray-800 dark:border-gray-700 dark:text-white"></textarea>
                    <button type="submit" className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-md shadow-md transition transform hover:scale-105">
                        Send Message
                    </button>
                </form>

                {status && <p className="mt-4 text-purple-600 dark:text-purple-400">{status}</p>}
            </div>
        </section>
    );
}
