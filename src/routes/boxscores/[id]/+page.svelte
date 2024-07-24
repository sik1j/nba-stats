<script>
    export let data;
</script>

<h1>
    <!--{data.}-->
    {data.awayTeam.name} @ {data.homeTeam.name}
</h1>
<span>{data.awayTeam.score} - {data.homeTeam.score}</span>

<h2>{data.awayTeam.name} Basic Boxscore</h2>
<table>
    <thead>
    <tr>
        <th>Name</th>
        <th>Minutes</th>
        <th>Points</th>
        <th>FG%</th>
    </tr>
    </thead>
    <tbody>
    {#each data.awayTeam.boxscore.starters as starter_row}
        <tr>
            <th>{starter_row.name}</th>
            {#if starter_row.reason_out}
                <td>{starter_row.reason_out}</td>
            {:else}
                <td>{starter_row.minutes}</td>
                <td>{starter_row.points}</td>
                <td>{starter_row.field_goal_percentage}</td>
            {/if}
        </tr>
    {/each}
    </tbody>
</table>

<h2>{data.homeTeam.name} Basic Boxscore</h2>
<table>
    <thead>
    <tr>
        <th>Name</th>
        <th>Minutes</th>
        <th>Points</th>
        <th>FG%</th>
    </tr>
    </thead>
    <tbody>
    {#each data.homeTeam.boxscore.starters as starter_row}
        <tr>
            <th>{starter_row.name}</th>
            {#if starter_row.reason_out}
                <td>{starter_row.reason_out}</td>
            {:else}
                <td>{starter_row.minutes}</td>
                <td>{starter_row.points}</td>
                <td>{starter_row.field_goal_percentage}</td>
            {/if}
        </tr>
    {/each}
    </tbody>
</table>