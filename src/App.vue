<template>
  <div id="app">
    <Topbar :root="this" />
    <Contents :root="this" />
  </div>
</template>

<script>
import Topbar from "./components/Topbar.vue"
import Contents from "./components/Contents.vue"
import store from "./assets/js/store.js"

export default {
  name: "App",
  components: {
    Topbar,
    Contents
  },
  mounted() {
    this.currentTime = new Date();
    setInterval(() => {
      this.currentTime = new Date();
    }, 1000 * 60);
    this.appData = store.loadData();
  },
  data() {
    return {
      currentTime: undefined,
      currentDate: undefined,
      currentHour: undefined,
      selectedPage: "none",
      appData: {},
      appDataInputs: {},
      appDataOutputs: {},
      isUpdating: false,
    }
  },
  watch: {
    currentTime(newValue) {
      this.currentDate = `${
          this.padStart("00", newValue.getDate(), true)
        }/${
          this.padStart("00", newValue.getMonth() + 1, true)
        }/${ 
          newValue.getFullYear()
        }`;
      this.currentHour = `${
          this.padStart("00", newValue.getHours(), true)
        }:${
          this.padStart("00", newValue.getMinutes(), true)
        }`;
    },
    appData(newValue) {
      this.updateData(newValue);
    }
  },
  methods: {
    padStart(pad, str, padLeft) {
      if (typeof str === 'undefined') 
        return pad;
      if (padLeft) {
        return (pad + str).slice(-pad.length);
      } else {
        return (str + pad).substring(0, pad.length);
      }
    },
    selectPage(page) {
      this.selectedPage = page;
    },
    saveData() {
      store.saveData(this.appData);
    },
    updateView() {
      this.isUpdating = true;
      this.appData = store.loadData();
      setTimeout(() => {
        this.isUpdating = false;
      }, 50);
    },
    updateData(v = false) {
      /////// inputs //////
      const appData = v ? v : this.appData;
      const dataInputs = {};
      const currentInputKeys = Object.keys(appData.inputs).sort().reverse();
      for(let indexInput = 0; indexInput < currentInputKeys.length; indexInput++) {
        const currentInputKey = currentInputKeys[indexInput];
        const [inputDay, inputSecond] = currentInputKey.split(" ");
        const inputText = appData.inputs[currentInputKey];
        if(!(inputDay in dataInputs)) {
          dataInputs[inputDay] = {};
        }
        dataInputs[inputDay][inputSecond] = inputText;
      }
      /////// outputs //////
      const dataOutputs = {};
      const currentOutputKeys = Object.keys(appData.outputs).sort().reverse();
      for(let indexOutput = 0; indexOutput < currentOutputKeys.length; indexOutput++) {
        const currentOutputKey = currentOutputKeys[indexOutput];
        const [outputDay, outputSecond] = currentOutputKey.split(" ");
        const outputText = appData.outputs[currentOutputKey];
        if(!(outputDay in dataOutputs)) {
          dataOutputs[outputDay] = {};
        }
        dataOutputs[outputDay][outputSecond] = outputText;
      }
      /////////////////////
      this.appDataInputs = dataInputs;
      this.appDataOutputs = dataOutputs;
    }
  }
}
</script>

<style>

#app {}
html, body, input, textarea, button { padding: 0; margin: 0; font-family: Roboto; }
* { box-sizing: border-box }
@font-face { font-family: Roboto; src: url("./assets/fonts/Roboto/Roboto-Regular.ttf") }

.button-type {
  border: 1px solid #888;
  padding: 5px;
  cursor: pointer;
}
.button-type:hover {
  background-color: #CCC;
  color: black;
}
.font-size-small { font-size: 12px; }
.font-size-normal { font-size: 16px; }

.display-table { display: table }
.display-table-row { display: table-row }
.display-table-cell { display: table-cell }
.width-100-percent { width: 100% }
.width-50-percent { width: 50% }
.width-5px { min-width: 5px; max-width: 5px }
.width-1-percent { width: 1% }
.border-1px-normal { border: 1px solid #333 }
.border-bottom-1px-normal { border-bottom: 1px solid #333 }
.border-top-1px-normal { border-top: 1px solid #333 }
.border-left-1px-normal { border-left: 1px solid #333 }
.border-right-1px-normal { border-right: 1px solid #333 }
.margin-0 { margin: 0px }
.margin-5px { margin: 5px }
.padding-0 { padding: 0px }
.padding-5px { padding: 5px }

.padding-top-0 { padding-top: 0px }
.padding-bottom-0 { padding-bottom: 0px }
.padding-left-0 { padding-left: 0px }
.padding-right-0 { padding-right: 0px }

.padding-top-5px { padding-top: 5px }
.padding-bottom-5px { padding-bottom: 5px }
.padding-left-5px { padding-left: 5px }
.padding-right-5px { padding-right: 5px }

.resize-vertical { resize: vertical }

.text-align-center { text-align: center }

</style>
