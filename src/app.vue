<template>
    <div id="app">
        {{text}}
        <div id="cover"></div>
        <head></head>
        <foot></foot>
        <todo></todo>
    </div>

</template>

<script>
    import Head from './layout/header'
    import Foot from './layout/footer.jsx'
    import Todo from './views/todo/todo'

    export default {
        components: {
            Head,
            Foot,
            Todo
        },
        data() {
            return {
                text: '我要天天吃米线！！'
            }
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