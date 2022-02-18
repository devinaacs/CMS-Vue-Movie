<template>
  <button
    class="btn btn-danger"
    type="button"
    v-on:click.prevent="clickCancelButton"
  >
    Cancel
  </button>
</template>

<script>
export default {
  name: "Cancelbutton",
  methods: {
    clickCancelButton() {
      this.$emit("clickCancelButton");
    },
  },
};
</script>

<style></style>
