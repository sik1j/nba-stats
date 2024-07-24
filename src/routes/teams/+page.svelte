<script>
    export let data;
</script>

<h1>Welcome to my page</h1>
<h2>Below are all the teams that played in the 2023-2024 season</h2>

<ul>
    {#each data.data as {name, link} }
        <li><a href={link}>{name}</a></li>
    {/each}
</ul>

<style>
    ul {
        display: grid;
        grid-template-columns: repeat(5, 1fr);
        gap: 2rem;
    }
</style>