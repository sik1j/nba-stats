<script>
    export let data;
</script>


<table>
    <thead>
    <tr>
        {#each data.test.header as text}
            <th>{text}</th>
        {/each}
    </tr>
    </thead>
    <tbody>
    {#each data.test.body as row}
        <tr>
            {#each row as text}
                <td>{text}</td>
            {/each}
        </tr>
    {/each}
    </tbody>
</table>