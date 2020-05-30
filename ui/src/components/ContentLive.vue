<template>
  <div class="preview" v-html="getInput()"></div>
</template>

<script>
export default {
  name: "ContentBox",
  props: {
    input: String
  },
  data() {
    return {};
  },
  methods: {
    getInput() {
      let outputValue = "";
      outputValue = this.input.replace("oembed", "iframe");
      outputValue = outputValue.replace("url", "src");
      outputValue = outputValue.replace("watch?v=", "embed/");
      outputValue = outputValue.replace("oembed", "iframe");

      return outputValue;
    }
  }
};
</script>

<style lang="scss" scoped>
.preview {
  text-align: left;
  max-width: 1200px;
}
</style>
