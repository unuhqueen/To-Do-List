<template>
  <div>
    <p class="mx-auto w-1/2 md:text-5xl md:py-4 font-bold">To-Do List</p>
    <div class="grid-cols-1">
      <div class="mx-auto w-1/2 text-left">
        <input
          type="text"
          v-model="todoText"
          class="md:border-2 rounded-lg md:mt-8 md:mb-4 md:p-1 w-1/3"
          @keyup.enter="addTodo"
          placeholder="할 일을 입력하세요"
        />
        <button
          v-on:click="addTodo"
          class="border bg-gray-200 md:m-3 md:px-3 md:py-1 rounded-lg"
        >
          입력
        </button>
        <!--<select
          @change="changeCount"
          v-model="count"
          class="border rounded-lg"
          name="numberOfLists"
          id="num-list"
        >
          <option value="10">10</option>
          <option value="20">20</option>
          <option value="30">30</option>
        </select>-->
      </div>

      <div>
        <table class="mx-auto w-1/2">
          <thead>
            <tr>
              <th class="md:py-2 md:border-b-4 md:border-r-4 w-1/12">순서</th>
              <th class="md:py-2 md:border-b-4  w-10/12">할 일</th>
              <th class="md:py-2 w-1/12 md:border-b-4 md:border-l-4"></th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="todo in list" :key="todo.id">
              <td class="md:py-2 md:border-r-4">{{ todo.id }}</td>
              <td class="md:p-2 md:border-l-4 text-left">{{ todo.text }}</td>
              <td class="md:py-2 md:border-l-4">
                <button v-on:click="deleteTodo(todo.id)">&times;</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <span v-for="i in totalPage" :key="i" @click="movePage(i)">{{ i }}</span>
    </div>
  </div>
</template>

<script>
export default {
  //부모에서 온 데이터를 받는 것
  props: {
    list: {
      type: Array,
      default: () => [],
    },
    totalPage: {
      type: Number,
      default: 0,
    },
  },
  data() {
    return {
      todoText: "",
      done: false,
    };
  },
  methods: {
    addTodo() {
      this.$emit("addTodo", this.todoText, this.done);
    },
    deleteTodo(id) {
      this.$emit("deleteTodo", id);
    },
    // changeCount() {
    //   this.$emit("changeCount", this.pageNum, this.count);
    // },
  },
  mounted() {},
};
</script>

<style lang="scss" scoped></style>
