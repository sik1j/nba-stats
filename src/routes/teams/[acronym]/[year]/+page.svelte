<script>
    export let data;
</script>

<h1>{data.year}</h1>

<h2>Regular Season Results</h2>
<table>
    <thead>
    <tr>
        <th>Game No.</th>
        <th>Date</th>
        <th>Start (ET)</th>
        <th>Opp</th>
        <th>Res</th>
    </tr>
    </thead>
    <tbody>
    {#each data.season_data.regularSeasonSchedule as season_data}
        <tr>
            <th>{season_data.gameNo}</th>
            <td>{season_data.date}</td>
            <td>{season_data.start}</td>
            <td><a href={season_data.boxscoreLink}>{season_data.opponent}</a></td>
            <td>{season_data.result}</td>
        </tr>
    {/each}
    </tbody>
</table>

{#if data.season_data.playoffSchedule}
    <h2>Playoff Results</h2>

    <table>
        <thead>
        <tr>
            <th>Game No.</th>
            <th>Date</th>
            <th>Start (ET)</th>
            <th>Opp</th>
            <th>Res</th>
        </tr>
        </thead>
        <tbody>
        {#each data.season_data.playoffSchedule as season_data}
            <tr>
                <th>{season_data.gameNo}</th>
                <td>{season_data.date}</td>
                <td>{season_data.start}</td>
                <td><a href={season_data.boxscoreLink}>{season_data.opponent}</a></td>
                <td>{season_data.result}</td>
            </tr>
        {/each}
        </tbody>
    </table>
{/if}