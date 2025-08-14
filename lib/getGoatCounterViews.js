export async function getGoatCounterViews() {
    try {
        const res = await fetch('https://rdevz-ph.goatcounter.com/counter/.json');
        const data = await res.json();

        // Remove non-numeric characters (e.g. thin space, etc.)
        const numeric = data.count.replace(/[^\d]/g, '');
        const parsed = Number(numeric);

        return isNaN(parsed) ? 0 : parsed;
    } catch (err) {
        console.warn('[GoatCounter] Visitor count fetch failed:', err.message);
        return 0;
    }
}
