import {JSDOM} from "jsdom";
import assert from "node:assert";

// TODO: Parse, don't validate (ie. use a parser like thing to ensure the nodes being dealt with in the functions below
//  are never undefined or null
// class Validator {
//
// }

async function getDocument(url: string) {
    const res = await fetch(url);
    const html = await res.text();
    const dom = new JSDOM(html);
    return dom.window.document;
}

export async function getNbaTeamsData() {
    const doc = await getDocument('https://www.basketball-reference.com/teams/')

    const teams = doc.querySelectorAll('#div_teams_active');
    assert(teams.length == 1);

    const teamElements = teams[0].querySelector('tbody')?.querySelectorAll('a');
    assert(teamElements !== undefined);

    return Array.from(teamElements).map(elem => ({name: elem.textContent!, link: elem.getAttribute('href')!}))
}

export async function getNbaTeamDataGeneral(acronym: string) {
    const doc = await getDocument(`https://www.basketball-reference.com/teams/${acronym}/stats_basic_totals.html`)

    const table_body = doc.querySelector("#stats > tbody");
    assert(table_body !== null, `for: /teams/${acronym}/stats_basic_totals.html`);

    const data_rows = Array.from(table_body.querySelectorAll('tr')).filter(elem => elem.classList.length === 0);
    assert(data_rows.length > 0);

    return data_rows.map(elem => {
        const season_elem = elem.querySelector('[data-stat="season"]')!;
        return {
            season: {
                text: season_elem.textContent!,
                link: season_elem.querySelector('a')?.getAttribute('href')!.split('.')[0]
            },
            wins: elem.querySelector('[data-stat="wins"]')?.textContent!,
            losses: elem.querySelector('[data-stat="losses"]')?.textContent!,
            finish: elem.querySelector('[data-stat="rank_team"]')?.textContent!,
        };
    })
}

export async function getNbaTeamScheduleBySeason(acronym: string, year: string) {
    const doc = await getDocument(`https://www.basketball-reference.com/teams/${acronym}/${year}_games.html`);

    const regularSeasonTableBody = doc.querySelector("#games > tbody");
    assert(regularSeasonTableBody !== null);

    const regularSeasonRows = regularSeasonTableBody.querySelectorAll('tr:not([class])');
    assert(regularSeasonRows.length > 0);

    const regularSeasonSchedule = Array.from(regularSeasonRows).map(row => ({
        gameNo: row.querySelector('[data-stat="g"]')!.textContent!,
        date: row.querySelector('[data-stat="date_game"]')!.textContent!,
        start: row.querySelector('[data-stat="game_start_time"]')!.textContent!,
        opponent: row.querySelector('[data-stat="opp_name"]')!.textContent!,
        result: row.querySelector('[data-stat="game_result"]')!.textContent!,
        boxscoreLink: row.querySelector('[data-stat="box_score_text"] > a')!.getAttribute('href')!.split('.')[0],
    }));

    const playoffTableBody = doc.querySelector("#games_playoffs > tbody");
    if (playoffTableBody === null) {
        return {
            regularSeasonSchedule,
            playoffSchedule: null
        };
    }

    const playoffRows = playoffTableBody.querySelectorAll('tr:not([class])');
    assert(playoffRows.length > 0);

    const playoffSchedule = Array.from(playoffRows).map(row => ({
        gameNo: row.querySelector('[data-stat="g"]')!.textContent!,
        date: row.querySelector('[data-stat="date_game"]')!.textContent!,
        start: row.querySelector('[data-stat="game_start_time"]')!.textContent!,
        opponent: row.querySelector('[data-stat="opp_name"]')!.textContent!,
        result: row.querySelector('[data-stat="game_result"]')!.textContent!,
        boxscoreLink: row.querySelector('[data-stat="box_score_text"] > a')!.getAttribute('href')!.split('.')[0],
    }));

    return {
        regularSeasonSchedule,
        playoffSchedule
    };
}

export async function getBoxscore(id: string) {
    function rowData(row: Element) {
        const nameElem = row.querySelector('[data-stat="player"]')!;
        const name = {
            text: nameElem.textContent!,
            link: nameElem.querySelector('a')!.getAttribute('href')!
        };
        let other_fields;
        if (row.querySelector('[data-stat="reason"]')) {
            other_fields = {
                reason_out: row.querySelector('[data-stat="reason"]')!.textContent!,
            };
        } else {
            other_fields = {
                minutes: row.querySelector('[data-stat="mp"]')!.textContent!,
                points: row.querySelector('[data-stat="pts"]')!.textContent!,
                field_goal_percentage: row.querySelector('[data-stat="fg_pct"]')!.textContent!,
            };
        }

        return {
            name,
            ...other_fields
        }
    };

    function teamBoxScore(teamAcronym: string) {
        const teamBasicBoxscoreRows = Array.from(doc.querySelectorAll(`#box-${teamAcronym}-game-basic > tbody > tr:not([class])`)!);
        assert(teamBasicBoxscoreRows.length > 0);

        const teamBoxscore = {
            starters: teamBasicBoxscoreRows.slice(0,5).map(rowData),
            reserves: teamBasicBoxscoreRows.slice(5).map(rowData),
        };

        console.log(teamBoxscore.starters.length, teamBoxscore.reserves.length);

        return teamBoxscore;
    }

    const doc = await getDocument(`https://www.basketball-reference.com/boxscores/${id}.html`);

    const scores = doc.querySelectorAll('div.scores');
    assert(scores.length == 2);
    const awayTeamScore = scores[0].textContent!;
    const homeTeamScore = scores[1].textContent!;

    const awayTeamScoreboardAnchor = doc.querySelector("#content > div.scorebox > div:nth-child(1) > div:nth-child(1) > strong > a")!;
    const homeTeamScoreboardAnchor = doc.querySelector("#content > div.scorebox > div:nth-child(2) > div:nth-child(1) > strong > a")!;

    const homeTeamName = homeTeamScoreboardAnchor.textContent!;
    const awayTeamName = awayTeamScoreboardAnchor.textContent!;
    const homeTeamAcronym = homeTeamScoreboardAnchor.getAttribute('href')!.split('/')[2];
    const awayTeamAcronym = awayTeamScoreboardAnchor.getAttribute('href')!.split('/')[2];

    const homeTeamBoxscore = teamBoxScore(homeTeamAcronym);
    const awayTeamBoxscore = teamBoxScore(awayTeamAcronym);

    return {
        homeTeam: {
            name: homeTeamName,
            score: homeTeamScore,
            boxscore: homeTeamBoxscore
        },
        awayTeam: {
            name: awayTeamName,
            score: awayTeamScore,
            boxscore: awayTeamBoxscore
        }
    }
}