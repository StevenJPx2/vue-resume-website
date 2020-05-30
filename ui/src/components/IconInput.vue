<template>
  <div>
    <i :class="iToggle"></i>
    <input
      type="text"
      :value="value"
      @input="$emit('change', $event.target.value)"
      :class="inputToggle"
      :placeholder="placeholder"
    />
    <div id="prompt" v-if="prompt.length != 0">
      <p
        v-for="(message, propertyValue) in prompt"
        :key="propertyValue"
        :class="message[0]"
      >
        {{ message[1] }}
      </p>
    </div>
  </div>
</template>

<script>
export default {
  name: "IconInput",
  model: {
    prop: "value",
    event: "change"
  },
  props: {
    placeholder: { type: String, default: "" },
    value: String,
    isWarn: { type: Boolean, default: false },
    isDanger: { type: Boolean, default: false },
    prompt: {
      type: Object,
      default: () => {}
    }
  },
  methods: {},
  data() {
    return {};
  },
  computed: {
    iToggle() {
      return this.isDanger
        ? "fas fa-times danger"
        : this.isWarn
        ? "fas fa-exclamation-triangle warn"
        : "";
    },
    inputToggle() {
      return this.isDanger ? "danger" : this.isWarn ? "warn" : "";
    }
  }
};
</script>

<style scoped lang="scss">
$warnColor: darken(#ffeeba, 35%);
$dangerColor: darken(#f5c6cb, 30%);

div {
  position: relative;
  max-width: 322px;
  margin: 0 auto;
}

i {
  position: absolute;
  right: 25px;
  top: 14px;

  &.danger {
    color: $dangerColor;
  }

  &.warn {
    color: $warnColor;
  }
}
input {
  margin: 20px auto !important;

  &.danger {
    color: darken($dangerColor, 20%);
    &:focus {
      border: 1px solid darken($dangerColor, 20%);
      box-shadow: inset 0px 0px 4px darken($dangerColor, 20%);
    }
  }

  &.warn {
    color: darken($warnColor, 20%);
    &:focus {
      border: 1px solid darken($warnColor, 10%);
      box-shadow: inset 0px 0px 4px darken($warnColor, 10%);
    }
  }
}
p {
  font-size: 13px;
  padding: 10px;
  border-radius: 5px;

  &.danger {
    border: 1px solid $dangerColor;
    background-color: lighten($dangerColor, 30%);
    color: darken($dangerColor, 30%);
  }

  &.warn {
    border: 1px solid $warnColor;
    background-color: lighten($warnColor, 30%);
    color: darken($warnColor, 30%);
  }
}
</style>
