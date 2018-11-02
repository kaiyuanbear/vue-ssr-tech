<template>
    <section class="real-app">
        <input
            type="text"
            class="add-input"
            title='todo'
            autofocus="autofocus"
            :placeholder="placeholder"
            @keyup.enter="addTodo"
        >
        <item
            v-for="todo in filteredTodoList"
            :todo="todo"
            :key="todo.id"
            @del="deleteTodo"
        />
        <tabs
            :filter="filter"
            :todoList="todoList"
            @toggle="toggleFilter"
            @clearAllCompleted="clearAll"
        />
    </section>
</template>

<script>
    import Item from './item'
    import Tabs from './tabs'

    let id = 0

export default {
      name: 'todo',
      components: {
        Item,
        Tabs
      },
      data () {
        return {
          placeholder: '输入点什么东西吧',
          todoList: [],
          filter: 'all'
        }
      },
      computed: {
        filteredTodoList () {
          if (this.filter === 'all') {
            return this.todoList
          }
          return this.todoList.filter(item => this.filter === 'completed' ? item.completed : !item.completed)
        }
      },
      methods: {
        addTodo (ev) {
          this.todoList.unshift({
            id: id++,
            content: ev.target.value.trim(),
            completed: false
          })
          ev.target.value = ''
        },
        deleteTodo (id) {
          this.todoList.splice(this.todoList.findIndex(item => id === item.id), 1)
        },
        toggleFilter (state) {
          this.filter = state
        },
        clearAll () {
          this.todoList = this.todoList.filter(item => !item.completed)
        }
      }
    }
</script>

<style scoped lang="stylus">
    .real-app{
        width 600px
        margin 0 auto
        box-shadow 0 0 5px #666
    }
    .add-input{
        position: relative;
        margin: 0;
        width: 100%;
        font-size: 24px;
        font-family: inherit;
        font-weight: inherit;
        line-height: 1.4em;
        border: 0;
        outline: none;
        color: inherit;
        box-sizing: border-box;
        font-smoothing: antialiased;
        padding: 16px 16px 16px 60px;
        border: none;
        box-shadow: inset 0 -2px 1px rgba(0,0,0,0.03);
    }
</style>