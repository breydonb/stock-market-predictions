<script lang='ts'>
    import { Logger } from "$lib/utils/Logger";
    import { theme } from "../../stores/theme"; 

    const logger = new Logger();
    function toggleTheme() {
        theme.update(current => {
            const newTheme = current === 'light' ? 'dark' : 'light';
            logger.info('Using theme: ', newTheme);
            return newTheme;
        });
    }
</script>

<button on:click={toggleTheme} class=" px-4 py-2 rounded-lg">
    Switch to { $theme === 'light' ? 'Dark' : 'Light' } Mode
</button>