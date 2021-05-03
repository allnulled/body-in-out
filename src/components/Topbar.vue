<template>
  <div class="">
    <div class="display-table border-bottom-1px-normal padding-5px">
      <div class="display-table-row">
        <div class="display-table-cell width-1-percent">
          {{ root.currentHour }}
        </div>
        <div class="display-table-cell width-100-percent"></div>
        <div class="display-table-cell width-1-percent">
          {{ root.currentDate }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Topbar",
  props: { root: Object }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
