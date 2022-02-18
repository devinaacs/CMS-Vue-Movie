<template>
    <div>
        <button v-on:click.prevent="buttonClickReuse" type="submit" class="btn btn-danger btn-block" style="margin-bottom: 1rem;">
            {{ name }}
        </button>
    <div>
</template>

<script>
export default {
    name: "Reusebutton",
    props: ["name"],
    methods: {
        buttonClickReuse () {
            this.$emit("buttonClickReuse");
        },
    },
}
</script>

<style>

</style>