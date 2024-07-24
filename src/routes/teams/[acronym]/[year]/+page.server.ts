import {getNbaTeamScheduleBySeason} from "$lib/server/basketball_ref_scraper.js";


export async function load({ params}) {
    const season_data = await getNbaTeamScheduleBySeason(params.acronym, params.year);

    return {
        year: params.year,
        season_data
    }
}