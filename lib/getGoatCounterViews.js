export async function getGoatCounterViews() {
    try {
        const res = await fetch('https://rdevz-ph.goatcounter.com/counter/.json');
        const data = await res.json();

        // Remove all non-digit characters (including thin spaces, commas, etc.)
        const cleanCount = data.count.replace(/[^\d]/g, '');

        return parseInt(cleanCount, 10);
    } catch (err) {
        console.warn('[GoatCounter] Visitor count fetch failed:', err.message);
        return 0;
    }
}
