<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/img/logo.png">
    <HelloWorld msg="Welcome to Your Vue.js App"/>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from "@/components/hello-world.vue";

export default {
  name: "home",
  components: {
    HelloWorld
  },
  data() {
    return {};
  },
  mounted() {
    this.$nextTick(() => {
      window.addEventListener('message', function (event) {
        if (event.origin !== "http://192.168.218.113:5000") return;
        event.source.postMessage('Received', event.origin);
        window.pageData = event.data;
        console.log(event.data);
      }, false);
    })
  }
};
</script>
