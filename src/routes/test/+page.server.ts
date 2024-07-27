import { test } from "$lib/server/basketball_ref_scraper"

export async function load() {
    return {
        test: await test(),
    };
}