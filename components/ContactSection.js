import { useState } from 'react';
import Swal from 'sweetalert2';

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
                    <button type="submit" disabled={loading} className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-md shadow-md transition transform hover:scale-105">
                        {loading ? 'Sending...' : 'Send Message'}
                    </button>
                </form>
            </div>
        </section>
    );
}
