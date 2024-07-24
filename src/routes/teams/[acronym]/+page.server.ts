import {getNbaTeamDataGeneral} from "$lib/server/basketball_ref_scraper.js";


export async function load({params}) {
    const season_data = await getNbaTeamDataGeneral(params.acronym);

    return {
        acronym: params.acronym,
        season_data,
    }
}