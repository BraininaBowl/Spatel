<template>
    <section class="area">
    <h2>You shouldn't be here.</h2>
    <p><NuxtLink to="/">Return home</NuxtLink></p>
    </section>
</template>

<script setup>
</script>

<style lang="css" scoped>
.area {
    margin: 1rem 0;
    display: flex;
    flex-direction: column;
    gap: 1rem;
}
h2, p {
    margin: 0;
}
</style>
