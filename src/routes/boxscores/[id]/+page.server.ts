import {getBoxscore} from "$lib/server/basketball_ref_scraper";

export async function load({params}) {
    const boxscoreData = await getBoxscore(params.id);

    return {
        ...boxscoreData,
    }
}