import {getNbaTeamsData} from '$lib/server/basketball_ref_scraper'

export async function load() {
    return {
        data: await getNbaTeamsData(),
    };
}
