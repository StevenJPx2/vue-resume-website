<script setup lang="ts">
import technologies, {
  type TechnologyKeys,
} from "~/repos/collections/technologies";
const props = defineProps<{ stack: TechnologyKeys[] }>();
const experienceTechnologies = props.stack.map((key) => technologies[key]);
</script>

<template>
  <div class="flex flex-wrap gap-[3vw] md:gap-[0.7vw] px-[8vw] md:px-[2vw]">
    <nuxt-link
      class="px-3 py-2 rounded-md flex items-center gap-2 bg-base-color text-accent text-[8vw] md:text-[2vw] transition ease-out-quad hover:scale-105 group relative isolate"
      v-for="tech in experienceTechnologies"
      v-tooltip="tech.name"
      :key="tech.id"
      :to="!!tech.link ? 'https://' + tech.link : '#'"
      target="blank"
      :external="true"
    >
      <div
        class="absolute inset-0 z-[-1] rounded-md opacity-25 transition ease-out-quad group-hover:opacity-70"
        :style="{
          backgroundColor:
            !tech.color || ['#000', '#000000'].includes(tech.color)
              ? '#555'
              : tech.color,
        }"
      />
      <icon
        v-if="tech.icon_name"
        :name="tech.icon_name"
        class="[&>path]:fill-current"
      />
      <small v-else class="w-max">
        {{ tech.name }}
      </small>
    </nuxt-link>
  </div>
</template>
