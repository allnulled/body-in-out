export default {
    loadData() {
        try {
            return JSON.parse(localStorage._BODY_IN_OUT_STORE_);
        } catch (error) {
            return { inputs: {}, outputs: {} };
        }
    },
    saveData(data) {
        localStorage._BODY_IN_OUT_STORE_ = JSON.stringify(data);
    },
}