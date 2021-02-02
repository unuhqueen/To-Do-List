<template>
  <div>
    <p class="mx-auto w-1/2 md:text-5xl md:py-4 font-bold">
      <a href="/test3"> To-Do List</a>
    </p>
    <div class="grid-cols-1 md:mb-8">
      <div class="mx-auto w-1/2 text-left">
        <input
          type="text"
          v-model="todoText"
          class="md:border-2 rounded-lg md:mt-8 md:mb-4 md:p-1 w-1/4"
          @keyup.enter="addTodo"
          placeholder="할 일을 입력하세요"
        />
        <button
          class="border bg-gray-200 md:m-3 md:px-3 md:py-1 rounded-lg"
          @click="addTodo"
        >
          입력
        </button>
        <input
          type="text"
          v-model="searchText"
          class="md:border-2 rounded-lg md:mt-8 md:mb-4 md:p-1 w-1/4"
          @keyup.enter="getTodos"
          placeholder="할 일을 검색하세요"
        />
        <button
          @click="getTodos"
          class="border bg-gray-200 md:m-3 md:px-3 md:py-1 rounded-lg"
        >
          검색
        </button>
        <select
          v-model="selectedNum"
          @change="selectLimit"
          class="border rounded-lg"
          name="numberOfLists"
          id="num-list"
        >
          <option v-for="pageNum in pageNums" :key="pageNum">{{
            pageNum
          }}</option>
        </select>
      </div>

      <div>
        <table class="mx-auto w-1/2">
          <thead>
            <tr>
              <th class="md:py-2 md:border-b-4 md:border-r-4 w-1/12">순서</th>
              <th class="md:py-2 md:border-b-4  w-9/12">할 일</th>
              <th class="md:py-2 w-1/12 md:border-b-4 md:border-l-4">완료</th>
              <th class="md:py-2 w-1/12 md:border-b-4 md:border-l-4">삭제</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="todo in list" :key="todo.id">
              <td class="md:py-2 md:border-r-4">{{ todo.id }}</td>
              <td
                class="md:p-2 md:border-l-4 text-left"
                :class="{ 'line-through': todo.isChecked }"
              >
                {{ todo.text }}
              </td>
              <td class="md:py-2 md:border-l-4">
                <input
                  type="checkbox"
                  v-model="todo.isChecked"
                  @click="checkTodo(todo)"
                />
              </td>
              <td class="md:py-2 md:border-l-4">
                <button v-on:click="deleteTodo(todo.id)">&times;</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    <span
      class="md:p-2 cursor-pointer"
      v-for="i in totalPage"
      :key="i"
      @click="movePage(i)"
      >{{ i }}</span
    >
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
      searchText: "",
      selectedNum: 10,
      pageNums: [10, 20, 30],
    };
  },
  methods: {
    addTodo() {
      this.$emit("addTodo", this.todoText);
      this.todoText = "";
    },
    deleteTodo(id) {
      this.$emit("deleteTodo", id);
    },
    movePage(page) {
      this.$emit("movePage", page);
    },
    getTodos() {
      this.$emit("getTodos", this.searchText);
      this.searchText = "";
    },
    checkTodo(todo) {
      this.$emit("checkTodo", todo);
    },
    selectLimit() {
      console.log(this.selectedNum);
      this.$emit("selectLimit", this.selectedNum);
    },
    // changeCount() {
    //   this.$emit("changeCount", this.pageNum, this.count);
    // },
  },
  mounted() {},
};
</script>

<style lang="scss" scoped>
input,
button,
select:focus {
  outline: none;
}
</style>
