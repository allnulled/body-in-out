<template>
  <div>
    <div class="padding-5px padding-bottom-0">
      <div class="display-table width-100-percent">
        <div class="display-table-row">
          <div class="display-table-cell width-50-percent">
            <button class="button-type width-100-percent" type="button" v-on:click="root.selectPage('entradas')">Entradas</button>
          </div>
          <div class="display-table-cell width-5px"></div>
          <div class="display-table-cell width-50-percent">
            <button class="button-type width-100-percent" type="button" v-on:click="root.selectPage('salidas')">Salidas</button>
          </div>
        </div>
      </div>
    </div>
    <div class="padding-5px">
      <Entradas :root="root" v-if="root.selectedPage === 'entradas'" />
      <Salidas :root="root" v-if="root.selectedPage === 'salidas'" />
    </div>
  </div>
</template>

<script>
import Entradas from "./Entradas.vue"
import Salidas from "./Salidas.vue"

export default {
  name: "Contents",
  components: { Entradas, Salidas },
  props: { root: Object }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
