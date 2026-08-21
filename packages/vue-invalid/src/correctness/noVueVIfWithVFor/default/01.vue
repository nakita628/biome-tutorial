<TodoItem
    v-if="complete"
    v-for="todo in todos"
    :todo="todo"
/>
