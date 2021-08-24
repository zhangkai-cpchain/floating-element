<template>
  <div class="hello">
    <ul>
      <li>
        <a href="#ball"  target="_blank">
          Ball
        </a>
      </li>
      <li>
        <a href="#snow" target="_blank">
          Snow
        </a>
      </li>
       <li>
        <a href="#light" target="_blank">
          Light
        </a>
      </li>
       <li>
        <a href="#text" target="_blank">
          Text
        </a>
      </li>
    </ul>

  </div>
</template>

<script>
export default {
  name: 'Home',
  data () {
    return {
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.hello {
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
h1,
h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
