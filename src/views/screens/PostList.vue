<template>
  <div id="postList">
    <h1>Danh sách bài viết</h1>
    <div class="content">
      <div class="select">
        <select v-model="categorySelected">
          <option :value="null">--- Chọn danh mục ---</option>
          <option
            v-for="category in categoryList"
            :key="category.code"
            :value="category.code"
          >
            {{ category.name }}
          </option>
        </select>
      </div>
      <table class="table is-striped">
        <thead>
          <tr>
            <th>STT</th>
            <th>Danh mục</th>
            <th>Tên bài viết</th>
            <th>Tiêu đề</th>
            <th>Ngày tạo</th>
            <th>Ngày chỉnh sửa</th>
            <th>Lượt xem</th>
            <th>Lượt tải</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(post, index) in postList" :key="post.postCode">
            <th>{{ index + 1 }}</th>
            <td>{{ post.categoryName }}</td>
            <td>
              <router-link
                :to="{ name: 'postDetail', query: { postCode: post.postCode } }"
              >
                {{ post.postName }}
              </router-link>
            </td>
            <td>{{ post.title }}</td>
            <td>
              {{ formatDate(post.createdDate) }}
            </td>
            <td>
              {{ formatDate(post.updatedDate) }}
            </td>
            <td>{{ post.readNum }}</td>
            <td>{{ post.downloadNum }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import postApi from "../../services/postApi";

export default {
  name: "Post list",
  data() {
    return {
      categoryList: [],
      categorySelected: null,
      postList: [],
    };
  },
  created() {
    this.getCategoryPulldown();
    this.getPostList();
  },
  methods: {
    getCategoryPulldown() {
      postApi
        .getCategoryPulldown()
        .then((res) => {
          this.categoryList = res.data.categoryList;
        })
        .catch((err) => {
          console.error("Load category pulldown failed ", err);
          this.$swal({
            icon: "error",
            title: "Không load được danh sách category :(",
            timer: 3000,
            showConfirmButton: true,
            type: "error",
          });
        });
    },
    getPostList() {
      postApi
        .getPostList({
          categoryCode: this.categorySelected,
        })
        .then((res) => {
          this.postList = res.data;
        })
        .catch((err) => {
          console.error("Load post list failed ", err);
          this.$swal({
            icon: "error",
            title: "Không load được danh sách bài viết :(",
            timer: 3000,
            showConfirmButton: true,
            type: "error",
          });
        });
    },
    formatDate(date) {
      return new Date(date).toISOString().split("T")[0];
    },
  },
  watch: {
    categorySelected() {
      this.getPostList();
    }
  }
};
</script>
