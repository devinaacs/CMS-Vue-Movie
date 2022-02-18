<template>
  <div>
    <nav id="sidebar">
      <div class="sidebar-header">
        <h3>tvH CMS</h3>
      </div>
      <ul class="list-unstyled components">
        <p>Dashboard</p>
        <li><a href="#" v-on:click="toMovPage">Movie List</a></li>
        <li><a href="#" v-on:click="toHisPage">History</a></li>
        <li><a href="#" v-on:click="toAddPage">Add Movie</a></li>
        <li><a href="#" v-on:click="toLogOut">Log Out</a></li>
      </ul>
    </nav>
  </div>
</template>

<script>
export default {
  name: "Sidebar",
  methods: {
    toLogOut() {
      this.$emit("clickLogOut");
    },
    toMovPage() {
      this.$emit("clickMovPage");
    },
    toHisPage() {
      this.$emit("clickHisPage");
    },
    toAddPage() {
      this.$emit("clickAddPage");
    },
  },
};
</script>

<style></style>
