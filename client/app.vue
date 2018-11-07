<template>
    <div id="app">
        {{text}}
        <div id="cover"></div>
        <Header></Header>
        <p>{{fullName}}</p>
        <h3>{{counter}}</h3>
        <router-link to="/app/naimi">app 肥奶咪</router-link>
        <router-link to="/app/feiju">app 肥橘</router-link>
        <router-link to="/login">login</router-link>
        <!--<todo></todo>-->
        <transition name="fade">
            <router-view />
        </transition>
        <foot></foot>
        <!--<transition name="fade">-->
          <!--<router-view name="mi"/>-->
        <!--</transition>-->
    </div>

</template>

<script>
  import Header from './layout/header'
  import Foot from './layout/footer.jsx'
  import Todo from './views/todo/todo'
  import { mapState, mapGetters, mapActions, mapMutations } from 'Vuex'

  export default {
    components: {
      Header,
      Foot,
      Todo
    },
    mounted () {
      console.log(this.$store)
      this.$store.dispatch('updateCountAsync', {
        num: 5,
        time: 2000
      })
      // let i = 2
      // setInterval(() => {
      //   this.$store.commit('updateCount', i++)
      // }, 1000)
    },
    computed: {
      ...mapState({
        counter: state => state.count
      }),
      ...mapGetters(['fullName'])
      // fullName () {
      //   return this.$store.getters.fullName
      // }
    },
    data () {
      return {
        text: '我要天天吃米线！！'
      }
    },
    methods: {
      ...mapMutations(['updateCount']),
      ...mapActions(['updateCountAsync'])
    }
  }
</script>

<style scoped lang="stylus">
    #app{
        position absolute
        left 0
        right 0
        top 0
        bottom 0
    }
    #cover{
        position absolute
        left 0
        top 0
        right 0
        bottom 0
        background-color #999
        opacity .9
        z-index -1
    }
</style>
