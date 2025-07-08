export async function getGoatCounterViews() {
    try {
        const res = await fetch('https://rdevz-ph.goatcounter.com/counter/.json');
        const data = await res.json();
        return parseInt(data.count, 10);
    } catch (err) {
        console.warn('[GoatCounter] Visitor count fetch failed:', err.message);
        return 0;
    }
}
