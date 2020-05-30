<template>
  <div>
    <div v-if="componentName == 'QRBox'">
      <div @click="updateClass($event.target)" class="dropdown">
        Responses ({{ modifyingData(userData)[0].length }})
      </div>
      <div class="dropdown-body">
        <div class="dropdown-heading">
          Responded ({{ modifyingData(userData)[0].length }})
        </div>
        <div
          v-for="(slideDet, index) in modifyingData(userData)[0]"
          :key="index"
        >
          <div @click="updateClass($event.target)" class="dropdown">
            {{ slideDet.name }}
          </div>
          <div v-html="slideDet.slide" class="dropdown-body"></div>
        </div>
        <div class="dropdown-heading">
          Unresponded ({{ modifyingData(userData)[1].length }})
        </div>
        <div
          v-for="(slideDet, index) in modifyingData(userData)[1]"
          :key="index + modifyingData(userData)[0].length"
        >
          <div class="dropdown-item">
            {{ slideDet.name }}
          </div>
        </div>
      </div>
    </div>
    <div v-else-if="componentName == 'PollBox'">
      Total Responses ({{ modifyingData(userData).answered }}/{{
        modifyingData(userData).total
      }})
      <div
        class="progress"
        v-for="(key, index) in modifyingData(userData).responses"
        :key="index"
      >
        <progress :value="key" :max="modifyingData(userData).total">{{
          key
        }}</progress>
        <p class="info">
          {{ ((key / modifyingData(userData).total) * 100).toFixed(0) }}% ({{
            key
          }})
        </p>
      </div>
    </div>
    <div v-else-if="componentName == 'MatchBox'">
      Total Responses ({{ modifyingData(userData).answered }}/{{
        modifyingData(userData).total
      }})
      <div class="progress">
        <p class="header">
          All Right Answers
        </p>
        <progress
          :value="modifyingData(userData).allRightAnswers"
          :max="modifyingData(userData).total"
          >{{ modifyingData(userData).allRightAnswers }}</progress
        >
        <p class="info">
          {{
            (
              (modifyingData(userData).allRightAnswers /
                modifyingData(userData).total) *
              100
            ).toFixed(0)
          }}% ({{ modifyingData(userData).allRightAnswers }})
        </p>
      </div>
      <div
        class="progress"
        v-for="(key, index) in modifyingData(userData).responses"
        :key="index"
      >
        <p class="header">Match group {{ index + 1 }}</p>
        <progress :value="key" :max="modifyingData(userData).total">{{
          key
        }}</progress>
        <p class="info">
          {{ ((key / modifyingData(userData).total) * 100).toFixed(0) }}% ({{
            key
          }})
        </p>
      </div>
    </div>
    <div v-else-if="componentName == 'FillBox'">
      Total Responses ({{ modifyingData(userData).answered }}/{{
        modifyingData(userData).total
      }})
      <div class="progress">
        <p class="header">
          All Right Answers
        </p>
        <progress
          :value="modifyingData(userData).allRightAnswers"
          :max="modifyingData(userData).total"
          >{{ modifyingData(userData).allRightAnswers }}</progress
        >
        <p class="info">
          {{
            (
              (modifyingData(userData).allRightAnswers /
                modifyingData(userData).total) *
              100
            ).toFixed(0)
          }}% ({{ modifyingData(userData).allRightAnswers }})
        </p>
      </div>
      <div
        class="progress"
        v-for="(key, index) in modifyingData(userData).responses"
        :key="index"
      >
        <p class="header">Blank {{ index + 1 }}</p>
        <progress :value="key" :max="modifyingData(userData).total">{{
          key
        }}</progress>
        <p class="info">
          {{ ((key / modifyingData(userData).total) * 100).toFixed(0) }}% ({{
            key
          }})
        </p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "BoxAnalytics",

  props: {
    componentName: String,
    userData: Array
  },

  data() {
    return {};
  },

  mounted() {},

  updated() {},

  computed: {},

  watch: {},

  methods: {
    modifyingData(userData) {
      if (this.componentName == "QRBox") {
        let modifiedData = [[], []];
        userData.forEach(val => {
          if (val.slide == null) {
            modifiedData[1].push(val);
          } else {
            val.slide = val.slide.replace("\n", "<br />");
            modifiedData[0].push(val);
          }
        });
        return modifiedData;
      } else if (this.componentName == "PollBox") {
        let modifiedData = { responses: [], total: 0, answered: 0 };
        let maxVal = 0;
        userData.forEach(val => {
          if (val.slide != null) {
            maxVal = val.slide.length > maxVal ? val.slide.length : maxVal;
          }
        });
        modifiedData.responses = Array(maxVal).fill(0);
        userData.forEach(val => {
          if (val.slide != null) {
            if (val.slide.includes(true)) {
              modifiedData.responses[val.slide.indexOf(true)] += 1;
            }
            modifiedData.answered += 1;
          }
          modifiedData.total += 1;
        });
        return modifiedData;
      } else if (this.componentName == "MatchBox") {
        let modifiedData = {
          allRightAnswers: 0,
          responses: [],
          total: 0,
          answered: 0
        };
        let maxVal = 0;
        userData.forEach(val => {
          if (val.slide != null) {
            maxVal = val.slide.length > maxVal ? val.slide.length : maxVal;
          }
        });
        modifiedData.responses = Array(maxVal).fill(0);
        userData.forEach(val => {
          // eslint-disable-next-line no-unused-vars
          var correctAnswers = 0;
          if (val.slide != null) {
            val.slide.forEach((slideItem, index) => {
              modifiedData.responses[index] += slideItem ? 1 : 0;
              correctAnswers += slideItem ? 1 : 0;
            });
            modifiedData.allRightAnswers +=
              correctAnswers == val.slide.length ? 1 : 0;
            modifiedData.answered += 1;
          }
          modifiedData.total += 1;
        });
        return modifiedData;
      } else if (this.componentName == "FillBox") {
        let modifiedData = {
          allRightAnswers: 0,
          responses: [],
          total: 0,
          answered: 0
        };
        let maxVal = 0;
        userData.forEach(val => {
          if (val.slide != null) {
            maxVal = val.slide.length > maxVal ? val.slide.length : maxVal;
          }
        });
        modifiedData.responses = Array(maxVal).fill(0);
        userData.forEach(val => {
          // eslint-disable-next-line no-unused-vars
          var correctAnswers = 0;
          if (val.slide != null) {
            val.slide.forEach((slideItem, index) => {
              modifiedData.responses[index] += slideItem ? 1 : 0;
              correctAnswers += slideItem ? 1 : 0;
            });
            modifiedData.allRightAnswers +=
              correctAnswers == val.slide.length ? 1 : 0;
            modifiedData.answered += 1;
          }
          modifiedData.total += 1;
        });
        return modifiedData;
      }
    },
    modifyData() {
      var modifiedData = [[], []];
      if (this.componentName == "QRBox") {
        this.userData.forEach(val => {
          if (val.slide == null) {
            modifiedData[1].push(val);
          } else {
            val.slide = val.slide.replace("\n", "<br />");
            modifiedData[0].push(val);
          }
        });
      } else if (this.componentName == "PollBox") {
        modifiedData = { responses: [], total: 0, answered: 0 };
        var maxVal = 0;
        this.userData.forEach(val => {
          if (val.slide != null) {
            maxVal = val.slide.length > maxVal ? val.slide.length : maxVal;
          }
        });
        modifiedData.responses = Array(maxVal).fill(0);
        this.userData.forEach(val => {
          if (val.slide != null) {
            if (val.slide.includes(true)) {
              modifiedData.responses[val.slide.indexOf(true)] += 1;
            }
            modifiedData.answered += 1;
          }
          modifiedData.total += 1;
        });
      } else if (this.componentName == "MatchBox") {
        modifiedData = {
          allRightAnswers: 0,
          responses: [],
          total: 0,
          answered: 0
        };
        maxVal = 0;
        this.userData.forEach(val => {
          if (val.slide != null) {
            maxVal = val.slide.length > maxVal ? val.slide.length : maxVal;
          }
        });
        modifiedData.responses = Array(maxVal).fill(0);
        this.userData.forEach(val => {
          // eslint-disable-next-line no-unused-vars
          var correctAnswers = 0;
          if (val.slide != null) {
            val.slide.forEach((slideItem, index) => {
              modifiedData.responses[index] += slideItem ? 1 : 0;
              correctAnswers += slideItem ? 1 : 0;
            });
            modifiedData.allRightAnswers +=
              correctAnswers == val.slide.length ? 1 : 0;
            modifiedData.answered += 1;
          }
          modifiedData.total += 1;
        });
      } else if (this.componentName == "FillBox") {
        modifiedData = {
          allRightAnswers: 0,
          responses: [],
          total: 0,
          answered: 0
        };
        maxVal = 0;
        this.userData.forEach(val => {
          if (val.slide != null) {
            maxVal = val.slide.length > maxVal ? val.slide.length : maxVal;
          }
        });
        modifiedData.responses = Array(maxVal).fill(0);
        this.userData.forEach(val => {
          // eslint-disable-next-line no-unused-vars
          var correctAnswers = 0;
          if (val.slide != null) {
            val.slide.forEach((slideItem, index) => {
              modifiedData.responses[index] += slideItem ? 1 : 0;
              correctAnswers += slideItem ? 1 : 0;
            });
            modifiedData.allRightAnswers +=
              correctAnswers == val.slide.length ? 1 : 0;
            modifiedData.answered += 1;
          }
          modifiedData.total += 1;
        });
      }
      return modifiedData;
    },

    updateClass(target) {
      if (target.className.includes(" active")) {
        target.className = target.className.replace(" active", "");
      } else {
        target.className += " active";
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.dropdown {
  padding: 10px 20px;
  border: 1px solid #ddd;
  border-radius: 5px;
  margin: 10px 30px 0px 30px;
  position: relative;
  transition: 0.2s all ease-in-out;
  cursor: pointer;

  &::after {
    font-family: "Font Awesome 5 Free";
    font-weight: 900;
    content: "\f054";
    position: absolute;
    right: 20px;
    transition: 0.2s all ease-in-out;
  }

  &:hover {
    background-color: #ddd;
  }

  &:active,
  &.active {
    border-bottom-left-radius: 0px;
    border-bottom-right-radius: 0px;
    background-color: darken(#ddd, 20%);
    border-color: darken(#ddd, 20%);

    &::after {
      transform: rotate(90deg);
    }
  }

  &:active + .dropdown-body,
  &.active + .dropdown-body {
    border: 1px solid #ddd;
    border-top-width: 0px;
    max-height: 500px;
    border-bottom-left-radius: 0px;
    border-bottom-right-radius: 0px;

    .dropdown-body {
      border-width: 0px;
      border-bottom: 1px solid lighten(#ddd, 10%);
    }
  }
}

.dropdown-body {
  max-height: 0;
  margin: 0px 30px;
  overflow-y: auto;
  transition: 0.2s all ease-in-out;
  border: 0px solid #ddd;

  .dropdown,
  .dropdown-item,
  .dropdown-heading {
    border: 0px solid #ddd;
    border-radius: 0px;
    padding: 10px 20px;
    margin: 0px;
    position: relative;
    transition: 0.2s all ease-in-out;
    border-bottom: 1px solid lighten(#ddd, 10%);
  }

  .dropdown-body {
    margin: 0;
  }

  .dropdown:active + .dropdown-body,
  .dropdown.active + .dropdown-body {
    padding-bottom: 30px;
  }

  .dropdown-heading {
    font-weight: 800;
    background-color: #ddd;
  }

  .dropdown.active {
    background-color: darken(#ddd, 10%);
  }
}

.progress {
  margin: 15px 20px;
  position: relative;
  text-align: center;

  progress[value] {
    height: 40px;
    width: 100%;
    border-radius: 5px;
    border: none;

    &::-moz-progress-bar {
      border-radius: 5px;
      background-color: #89cff0;
      appearance: none;
    }
    &::-webkit-progress-bar {
      border-radius: 5px;
      background-color: #ddd;
      appearance: none;
    }
    &::-webkit-progress-value {
      border-radius: 5px;
      background-color: #89cff0;
      appearance: none;
    }
  }

  p.header {
    text-align: left;
    margin-top: 0;
    margin-bottom: 5px;
    text-transform: uppercase;
    font-size: 13px;
    font-weight: bold;
  }

  p.info {
    font-weight: bold;

    position: absolute;
    bottom: -4px;
    margin-left: 20px;
  }
}
</style>
