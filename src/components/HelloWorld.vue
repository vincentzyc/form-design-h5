<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <span class="count">{{ count }}</span>
    <button @click="increment">Increment</button>
  </div>
</template>

<script>
export default {
  name: "HelloWorld",
  props: {
    msg: String,
  },
  data() {
    return {
      count: 0,
    };
  },
  methods: {
    increment() {
      this.count++;
    },
  },
};
</script>
