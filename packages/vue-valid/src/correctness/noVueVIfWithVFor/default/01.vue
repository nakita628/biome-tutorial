<ul v-if="complete">
    <TodoItem
        v-for="todo in todos"
        :todo="todo"
    />
</ul>
