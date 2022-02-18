<template>
  <div>
    <div class="card-header">History Table</div>
    <div class="limiter">
      <div class="container-fluid">
        <div>
          <div>
            <table class="table table-striped">
              <thead>
                <tr>
                  <th>No</th>
                  <th>History</th>
                  <th>Description</th>
                  <th>By</th>
                  <th>Created At</th>
                </tr>
              </thead>
              <tbody>
                <Reusetrhistory
                  v-for="(history, index) in listHistories"
                  :key="history.id"
                  v-bind:history="history"
                  v-bind:index="index"
                >
                </Reusetrhistory>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Reusetrhistory from "../components/Reusetrhistory.vue";
export default {
  name: "Historytable",
  components: { Reusetrhistory },
  props: ["listHistories"],
};
</script>

<style></style>
