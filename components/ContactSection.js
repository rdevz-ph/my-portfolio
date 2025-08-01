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
            <div className="max-w-3xl mx-auto text-center px-4" data-aos="fade-up">
                <div className="text-center mb-8">
                    <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
                        Contact Me
                    </h2>
                    <div data-aos="fade-up" className="mt-2 mx-auto w-24 h-1 bg-gradient-to-r from-purple-500 via-purple-600 to-purple-500 rounded-full"></div>
                </div>

                <p className="text-gray-600 dark:text-gray-300 mb-8" data-aos="fade-up" data-aos-delay="100">
                    Want to work together or have a question? Feel free to reach out!
                </p>

                <form
                    onSubmit={handleSubmit}
                    className="bg-white dark:bg-gray-900 rounded-lg transition duration-500 shadow-sm border border-gray-200 dark:border-gray-700 p-6 space-y-6"
                    data-aos="fade-up"
                    data-aos-delay="200"
                >
                    <input
                        type="text"
                        name="name"
                        required
                        placeholder="Your Name"
                        className="w-full px-4 py-3 rounded-md border bg-white text-gray-900 border-gray-300 placeholder-gray-500 dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:placeholder-gray-400 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    />
                    <input
                        type="email"
                        name="email"
                        required
                        placeholder="Your Email"
                        className="w-full px-4 py-3 rounded-md border bg-white text-gray-900 border-gray-300 placeholder-gray-500 dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:placeholder-gray-400 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    />
                    <textarea
                        name="message"
                        required
                        rows="5"
                        placeholder="Your Message"
                        className="w-full px-4 py-3 rounded-md border bg-white text-gray-900 border-gray-300 placeholder-gray-500 dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:placeholder-gray-400 focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-vertical"
                    ></textarea>
                    <button
                        type="submit"
                        disabled={loading}
                        className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-md shadow-md transition transform hover:scale-105"
                    >
                        {loading ? 'Sending...' : 'Send Message'}
                    </button>
                </form>

                {/* Social Links */}
                <div
                    className="space-y-3 mt-10 text-left"
                    data-aos="fade-up"
                    data-aos-delay="300"
                >
                    <p className="flex items-center gap-3 justify-center">
                        <i className="fab fa-github text-gray-700 dark:text-gray-400"></i>
                        <a
                            href="https://github.com/rdevz-ph"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-500 dark:text-blue-400 hover:text-blue-600 dark:hover:text-blue-300 transition-colors"
                        >
                            GitHub
                        </a>
                    </p>
                    <p className="flex items-center gap-3 justify-center">
                        <i className="fab fa-linkedin text-gray-700 dark:text-gray-400"></i>
                        <a
                            href="https://linkedin.com/in/romel-brosas-b547572a8"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-500 dark:text-blue-400 hover:text-blue-600 dark:hover:text-blue-300 transition-colors"
                        >
                            LinkedIn
                        </a>
                    </p>
                    <p className="flex items-center gap-3 justify-center">
                        <i className="fab fa-facebook text-gray-700 dark:text-gray-400"></i>
                        <a
                            href="https://facebook.com/rdevzph.dev"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-500 dark:text-blue-400 hover:text-blue-600 dark:hover:text-blue-300 transition-colors"
                        >
                            Facebook
                        </a>
                    </p>
                </div>

            </div>
        </section>
    );

}
