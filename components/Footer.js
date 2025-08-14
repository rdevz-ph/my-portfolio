export default function Footer() {
    return (
        <footer className="bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700 py-6 mt-16 text-center">
            <p className="text-gray-600 dark:text-gray-400 text-sm">
                &copy; {new Date().getFullYear()} Romel Brosas. All rights reserved.
            </p>
        </footer>
    );
}