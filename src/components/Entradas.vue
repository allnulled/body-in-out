<template>
  <div>
    <button class="button-type width-100-percent" type="button" v-on:click="selectedInputForm = !selectedInputForm">
      <span v-if="selectedInputForm">Cerrar</span>
      <span v-else>Nueva entrada</span>
    </button>
    <div class="padding-top-5px" v-if="selectedInputForm">
      <textarea class="textarea-type width-100-percent resize-vertical padding-5px border-1px-normal" placeholder="Aquí la nueva entrada..." v-model="inputText"></textarea>
      <div class="padding-top-5px">
        <button class="button-type width-100-percent" type="button" v-on:click="addInput">OK</button>
      </div>
    </div>
    <div v-if="root.isUpdating">
      <span class="padding-5px">
        Actualizando...
      </span>
    </div>
    <div class="padding-top-5px font-size-small" v-else>
      
      <table class="width-100-percent">
        <thead></thead>
        <tbody>
          <tbody v-for="(dayItems, dayId) in root.appDataInputs" v-bind:key="dayId">
            <tr>
              <td class="text-align-center font-size-normal" colspan="6">
                <span class="padding-top-1px border-bottom-1px-normal">{{ dayId }}</span>
              </td>
            </tr>
            <tr v-for="(momentItem, momentId) in dayItems" v-bind:key="momentId">
              <td>
                <span>{{ momentId }}</span>
              </td>
              <td class="width-100-percent">
                <span>{{ momentItem }}</span>
              </td>
              <td>
                <button class="button-type" type="button" v-on:click="editItem(dayId, momentId)">✎</button>
              </td>
              <td>
                <button class="button-type" type="button" v-on:click="deleteItem(dayId, momentId)">⨯</button>
              </td>
            </tr>
          </tbody>
        </tbody>
      </table>

    </div>
  </div>
</template>

<script>

export default {
  name: "Entradas",
  components: { },
  props: { root: Object },
  data() {
      return {
          selectedInputForm: false,
          inputText: ""
      };
  },
  methods: {
    addInput() {
      const currentDate = new Date();
      const currentMoment = `${
        currentDate.getFullYear()
      }/${
        this.root.padStart("00", currentDate.getMonth() + 1, true)
      }/${ 
        this.root.padStart("00", currentDate.getDate(), true)
      } ${
        this.root.padStart("00", currentDate.getHours(), true)
      }:${
        this.root.padStart("00", currentDate.getMinutes(), true)
      }:${
        this.root.padStart("00", currentDate.getSeconds(), true)
      }.${
        this.root.padStart("000", currentDate.getMilliseconds(), true)
      }`;
      this.root.appData.inputs[currentMoment] = this.inputText;
      this.inputText = "";
      this.selectedInputForm = false;
      this.root.saveData();
      this.root.updateView();
    },
    editItem(dayId, momentId) {
      const newText = window.prompt("Inserta el nuevo texto:");
      if(!newText) {
        return;
      }
      const id = `${dayId} ${momentId}`;
      this.root.appData.inputs[id] = newText;
      this.root.saveData();
      this.root.updateView();
    },
    deleteItem(dayId, momentId) {
      const id = `${dayId} ${momentId}`;
      const isConfirmed = window.confirm(`¿Seguro que quieres borrar el evento? [${id}: ${this.root.appData.inputs[id]}]`);
      if(!isConfirmed) {
        return;
      }
      delete this.root.appData.inputs[id];
      this.root.saveData();
      this.root.updateView();
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
