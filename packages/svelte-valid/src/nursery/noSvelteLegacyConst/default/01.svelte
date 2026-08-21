{#each boxes as box}
    {const area = $derived(box.width * box.height)}
    <p>{area}</p>
{/each}
