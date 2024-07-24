<script>
    export let data;
</script>

<h1>{data.acronym}</h1>

<table>
    <thead>
    <tr>
        <th>Season</th>
        <th>W</th>
        <th>L</th>
        <th>Fin</th>
    </tr>
    </thead>
    <tbody>
    {#each data.season_data as season_data}
        <tr>
            <th><a href={season_data.season.link}>{season_data.season.text}</a></th>
            <td>{season_data.wins}</td>
            <td>{season_data.losses}</td>
            <td>{season_data.finish}</td>
        </tr>
    {/each}
    </tbody>
</table>