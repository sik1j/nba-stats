<script>
    export let data;
</script>

<h1>
    <!--{data.}-->
    {data.awayTeam.name} @ {data.homeTeam.name}
</h1>
<span>{data.awayTeam.score} - {data.homeTeam.score}</span>

{#each [data.awayTeam, data.homeTeam] as team}
    <h2>{team.name} Basic Boxscore</h2>
    <table>
        <thead>
        <tr>
            <th>Starters</th>
            <th>Minutes</th>
            <th>Points</th>
            <th>FG%</th>
        </tr>
        </thead>
        <tbody>
        {#each team.boxscore.starters as row}
            <tr>
                <th><a href={row.name.link}>{row.name.text}</a></th>
                {#if row.reason_out}
                    <td>{row.reason_out}</td>
                {:else}
                    <td>{row.minutes}</td>
                    <td>{row.points}</td>
                    <td>{row.field_goal_percentage}</td>
                {/if}
            </tr>
        {/each}
        <tr>
            <th>Reserve</th>
            <th>Minutes</th>
            <th>Points</th>
            <th>FG%</th>
        </tr>
        <tbody>
        {#each team.boxscore.reserves as row}
            <tr>
                <th><a href={row.name.link}>{row.name.text}</a></th>
                {#if row.reason_out}
                    <td>{row.reason_out}</td>
                {:else}
                    <td>{row.minutes}</td>
                    <td>{row.points}</td>
                    <td>{row.field_goal_percentage}</td>
                {/if}
            </tr>
        {/each}
        </tbody>
    </table>
{/each}