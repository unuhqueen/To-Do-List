<template>
  <Todolist
    :list="todos"
    @deleteTodo="deleteTodo"
    @addTodo="addTodo"
    :totalPage="totalPage"
    @movePage="movePage"
  />
</template>

<script>
import axios from "axios";
import Todolist from "../components/Todolist";

export default {
  components: { Todolist },
  mounted() {
    this.getTodos();
  },
  data() {
    return {
      todos: [],
      page: 1,
      limit: 10,
      totalPage: 0,
      totalCount: 0
    };
  },
  methods: {
    async getTodos() {
      //axios: GET, POST 등 RESTful API를 사용하기 위한 문법
      //async, await: 비동기 통신을 할 때 사용하지 않으면 페이지가 아예 로딩이 안 될 수도 있음
      //비동기 통신: 특정 조작을 했을 때만(예를 들면 클릭) 서버와 연결 되어 데이터를 보내주는 방식
      const responseData = await axios.get(
        "http://localhost:3000/todos?_sort=id&_order=desc&_page=${this.page}&_limit=${this.limit}"
      );
      this.todos = responseData.data;
      this.totalCount = responseData.headers['x-total-count'];
      const totalPage = () => {
        if (this.totalCount % this.limit != 0) {
          this.totalPage = parseInt(this.totalCount / this.limit) + 1;
        } else if (this.totalCount % this.limit === 0) {
          this.totalPage = parseInt(this.totalCount / this.limit);
        }
      };
      totalPage();
      this.todos = responseData.data;
      //this.listArray = responseData.data;
    },
    async addTodo(todoText) {
      //공백일 경우
      if (!todoText) return;

      const todoObj = {
        text: todoText,
      };
      //todoText: 입력값
      //text는 key, this.todoText는 value
      await axios.post("http://localhost:3000/todos", todoObj);
      todoText = '';
      this.getTodos();
    },
    async deleteTodo(todo) {
      await axios.delete(`http://localhost:3000/todos/${todo}`);
      if (this.totalCount % this.limit === 1) {
        this.page = this.totalPage - 1;
      }
      this.getTodos();
    },
    /*nextPage() {
      this.pageNum += 1;
    },
    prevPage() {
      this.pageNum -= 1;
    },*/
    /*async changeCount(pageNum, count) {
      const req = await axios.get(
        `http://localhost:3000/todos?_page=${pageNum}&_limit=${count}`
      );
      console.log(req.data);
      this.todos = req.data;
    },*/
    movePage(page) {
      this.page = page;
      this.getTodos();
      console.log("clicked");
    },
  },
};
</script>

<style lang="scss" scoped></style>
