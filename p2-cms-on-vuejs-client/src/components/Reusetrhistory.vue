<template>
  <tr>
    <td>{{ index + 1 }}</td>
    <td>{{ history.name }}</td>
    <td>{{ history.description }}</td>
    <td>{{ history.updatedBy }}</td>
    <td>{{ history.createdAt }}</td>
  </tr>
</template>

<script>
export default {
  name: "Reusetrhistory",
  props: ["history", "index"],
};
</script>

<style></style>
