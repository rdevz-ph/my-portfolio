import FolderTreeView from "@/components/FolderTreeView";

export default function CodeShowcase() {
    return (
        <div className="max-w-5xl mx-auto px-4 mb-16">
            <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
                    About This Portfolio
                </h2>
                <div data-aos="fade-up" className="mt-2 mx-auto w-24 h-1 bg-gradient-to-r from-purple-500 via-purple-600 to-purple-500 rounded-full"></div>
            </div>

            <p
                className="text-center text-gray-600 dark:text-gray-300 mb-6"
                data-aos="fade-up"
            >
                This portfolio is open source and built using <b>Next.js</b>, <b>Tailwind CSS</b>, and more.
                Here&apos;s a look into the setup:
            </p>

            <div className="text-center mb-10" data-aos="zoom-in">
                <a
                    href="https://github.com/rdevz-ph/my-portfolio"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 bg-gray-900 text-white dark:bg-white dark:text-gray-900 rounded-md shadow hover:shadow-lg transition"
                >
                    <i className="fab fa-github text-lg"></i>
                    View Source on GitHub
                </a>
            </div>

            <div
                className="bg-gray-100 dark:bg-gray-900 p-6 rounded-lg shadow-md"
                data-aos="fade-up"
            >
                <h3 className="text-xl font-semibold text-purple-600 dark:text-purple-400 mt-8 mb-4">
                    📁 Project Structure
                </h3>
                <FolderTreeView />
            </div>
        </div>
    );
}

