<script lang='ts'>
    import { theme } from "../../stores/theme";

    function toggleTheme() {
        theme.update(current => current === 'light' ? 'dark' : 'light');
    }
</script>
<button on:click={toggleTheme}>
    Switch to { $theme === 'light' ? 'dark' : 'light'} Mode
</button>