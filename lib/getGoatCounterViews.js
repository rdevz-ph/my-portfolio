export async function getGoatCounterViews() {
    const GOATCOUNTER_URL = process.env.NEXT_PUBLIC_GOATCOUNTER_URL;

    if (!GOATCOUNTER_URL) {
        console.warn('[GoatCounter] Missing NEXT_PUBLIC_GOATCOUNTER_URL');
        return 0;
    }

    const MAX_RETRIES = 5;
    const INITIAL_DELAY = 1000;

    for (let attempt = 0; attempt < MAX_RETRIES; attempt++) {
        try {
            const res = await fetch(GOATCOUNTER_URL, {
                headers: {
                    Accept: 'application/json',
                },
                cache: 'no-store',
            });

            if (!res.ok) {
                throw new Error(`HTTP ${res.status}`);
            }

            const data = await res.json();

            // Support both string and number responses
            const rawCount = String(data.count ?? '0');

            // Remove spaces/formatting chars
            const parsed = Number(rawCount.replace(/[^\d]/g, ''));

            return Number.isNaN(parsed) ? 0 : parsed;
        } catch (error) {
            const errMsg =
                error instanceof Error ? error.message : String(error);

            const isLastRetry = attempt === MAX_RETRIES - 1;

            // Retry only network-related failures
            const shouldRetry =
                errMsg.includes('fetch failed') ||
                errMsg.includes('ECONNRESET') ||
                errMsg.includes('ETIMEDOUT');

            if (!isLastRetry && shouldRetry) {
                const delay = INITIAL_DELAY * 2 ** attempt;

                console.warn(
                    `[GoatCounter] Retry ${attempt + 1}/${MAX_RETRIES} in ${delay}ms`
                );

                await new Promise((resolve) => setTimeout(resolve, delay));
                continue;
            }

            console.warn('[GoatCounter] Failed:', errMsg);
            return 0;
        }
    }

    return 0;
}