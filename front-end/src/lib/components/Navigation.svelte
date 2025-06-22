<script lang="ts">
    export let links: { name: string; href: string }[] = [];
</script>

<nav class="bg-navigation flex flex-row items-center border-b px-6 py-2 gap-4">
    <div class="text-2xl font-semibold text-text">
        Stock Price Predictions
    </div>
    <div class="flex items-center">
        {#each links as link (link.href)}
            <a
                href = {link.href}
                class = "text-text text-lg hover:text-blue-500 dark:hover:text-blue-400 transition-colors"
            >
                {link.name} 
            </a>
        {/each}
    </div>

    <div class="ml-auto flex items-center gap-4">
      <slot name="dark-mode-button" />
    </div>
</nav>