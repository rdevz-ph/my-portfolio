export async function getGoatCounterViews() {
    const GOATCOUNTER_URL = process.env.NEXT_PUBLIC_GOATCOUNTER_URL;

    if (!GOATCOUNTER_URL) {
        console.warn('[GoatCounter] NEXT_PUBLIC_GOATCOUNTER_URL is not defined in environment variables.');
        return 0;
    }

    const MAX_RETRIES = 5;
    const INITIAL_DELAY = 1000; // 1 second

    for (let i = 0; i < MAX_RETRIES; i++) {
        try {
            const res = await fetch(GOATCOUNTER_URL, {
                headers: {
                    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
                }
            });

            if (!res.ok) {
                throw new Error(`HTTP error! status: ${res.status}`);
            }

            const data = await res.json();

            // Remove non-numeric characters (e.g. thin space, etc.)
            const numeric = data.count.replace(/[^\d]/g, '');
            const parsed = Number(numeric);

            return isNaN(parsed) ? 0 : parsed;
        } catch (err) {
            const isLastRetry = i === MAX_RETRIES - 1;
            const isNetworkReset = err.message.includes('fetch failed') || err.message.includes('reset');

            if (isNetworkReset && !isLastRetry) {
                const delay = INITIAL_DELAY * Math.pow(2, i);
                console.warn(`[GoatCounter] Attempt ${i + 1} failed, retrying in ${delay}ms...`);
                await new Promise(resolve => setTimeout(resolve, delay));
                continue;
            }

            console.warn('[GoatCounter] Visitor count fetch failed:', err.message);
            return 0;
        }
    }
    return 0;
}
