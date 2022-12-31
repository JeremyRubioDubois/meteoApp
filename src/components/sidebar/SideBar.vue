<script>

export default {
    props: { userFavorites: Array },
    mounted() {
        console.log(this.userFavorites)
    }
}


</script>

<template>
    <div class="rounded-lg border-2 border-gray-100">
        <p class="w-full rounded text-center bg-gray-100 text-gray-700 p-2">Meteo App</p>
    </div>
</template>