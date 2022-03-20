<template>
  <div id="postDetail">
    <div class="field">
      <label class="label">Danh mục</label>
      <div class="control">
        <div class="select">
          <select v-model="categorySelected">
            <option :value="null">--- category ---</option>
            <option
              v-for="category in categoryList"
              :key="category.code"
              :value="category.code"
            >
              {{ category.name }}
            </option>
          </select>
        </div>
      </div>
    </div>
    <div class="field">
      <label class="label">Code</label>
      <div class="control">
        <input
          class="input"
          type="text"
          placeholder="Code"
          v-model="postCode"
        />
      </div>
    </div>
    <div class="field">
      <label class="label">Name</label>
      <div class="control">
        <input
          class="input"
          type="text"
          placeholder="Name"
          v-model="postName"
        />
      </div>
    </div>
    <div class="field">
      <label class="label">Tiêu đề</label>
      <div class="control">
        <textarea
          class="textarea"
          placeholder="Tiêu đề"
          maxlength="500"
          v-model="title"
        ></textarea>
      </div>
    </div>
    <div class="field">
      <label class="label">Mô tả</label>
      <div class="control">
        <textarea
          class="textarea"
          placeholder="Mô tả"
          v-model="description"
        ></textarea>
      </div>
    </div>
    <div class="field">
      <label class="label">Nội dung</label>
      <div class="control content">
        <ckeditor
          :editor="editor"
          v-model="editorData"
          :config="editorConfig"
        ></ckeditor>
      </div>
    </div>
    <div class="field">
      <label class="label">Link download</label>
      <div class="control">
        <div
          class="download-link"
          v-for="(link, index) in linkDownloadList"
          :key="link"
        >
          <div class="select">
            <select v-model="link.type">
              <option :value="null">--- link type ---</option>
              <option
                v-for="type in linkDownloadTypeList"
                :key="type.code"
                :value="type.code"
              >
                {{ type.name }}
              </option>
            </select>
          </div>
          <input
            class="input link-type-url"
            type="text"
            placeholder="url"
            v-model="link.url"
          />
          <div
            v-if="linkDownloadList.length > 1"
            class="url-btn icon has-text-link"
            @click="removeLinkDownload(index)"
          >
            <font-awesome-icon icon="minus-circle" size="lg" />
          </div>
          <div
            v-if="index === linkDownloadList.length - 1"
            class="url-btn icon has-text-link"
            @click="addLinkDownload"
          >
            <font-awesome-icon icon="plus-circle" size="lg" />
          </div>
        </div>
      </div>
    </div>
    <div class="field is-grouped">
      <div class="control">
        <button @click.prevent="savePost" class="button is-link">Lưu</button>
      </div>
    </div>
  </div>
</template>

<script>
import CKEditor from "@ckeditor/ckeditor5-vue";
import ClassicEditor from "@ckeditor/ckeditor5-editor-classic/src/classiceditor";
import CKFinder from "@ckeditor/ckeditor5-ckfinder/src/ckfinder";
import CKFinderUploadAdapter from "@ckeditor/ckeditor5-adapter-ckfinder/src/uploadadapter";
import Link from "@ckeditor/ckeditor5-link/src/link";
import Image from "@ckeditor/ckeditor5-image/src/image";
import ImageCaption from "@ckeditor/ckeditor5-image/src/imagecaption";
import ImageStyle from "@ckeditor/ckeditor5-image/src/imagestyle";
import ImageToolbar from "@ckeditor/ckeditor5-image/src/imagetoolbar";
import ImageUpload from "@ckeditor/ckeditor5-image/src/imageupload.js";
import Essentials from "@ckeditor/ckeditor5-essentials/src/essentials";
import Heading from "@ckeditor/ckeditor5-heading/src/heading";
import Paragraph from "@ckeditor/ckeditor5-paragraph/src/paragraph";
import Bold from "@ckeditor/ckeditor5-basic-styles/src/bold";
import Italic from "@ckeditor/ckeditor5-basic-styles/src/italic";
import List from "@ckeditor/ckeditor5-list/src/list";
import postApi from "../../services/postApi";
// import { toast } from "bulma-toast";

import regexConst from "@/constants/regexConst";

export default {
  name: "admin detail",
  components: {
    ckeditor: CKEditor.component,
  },
  data() {
    return {
      editor: ClassicEditor,
      editorData: "<p>Content of the editor.</p>",
      editorConfig: {
        plugins: [
          CKFinder,
          CKFinderUploadAdapter,
          Image,
          ImageCaption,
          ImageStyle,
          ImageToolbar,
          ImageUpload,
          Essentials,
          Heading,
          Paragraph,
          Link,
          Bold,
          Italic,
          List,
        ],
        ckfinder: {
          uploadUrl: "http://localhost:8081/master/post/upload-image",
        },
        toolbar: {
          items: [
            "heading",
            "|",
            "bold",
            "italic",
            "link",
            "bulletedList",
            "numberedList",
            "|",
            "undo",
            "redo",
            "|",
            "imageUpload",
            "toggleImageCaption",
            "imageTextAlternative",
          ],
        },
      },

      postId: null,
      postCode: "",
      postName: "",
      categoryList: null,
      categorySelected: null,
      title: "",
      description: "",
      linkDownloadTypeList: null,
      linkDownloadList: [
        {
          type: null,
          url: null,
        },
      ],
    };
  },
  created() {
    this.getCategoryPulldown();
    this.getLinkDownloadTypePulldown();

    if (this.$route.query.postCode) {
      this.getPostDetail(this.$route.query.postCode);
    }
  },
  methods: {
    getPostDetail(postCode) {
      postApi
        .getPostDetail({
          postCode: postCode,
        })
        .then((res) => {
          const result = res.data;
          const post = result.post;
          const links = result.links;

          this.postId = post.id;
          this.categorySelected = post.categoryCode;
          this.postCode = post.code;
          this.postName = post.name;
          this.title = post.title;
          this.description = post.description;
          this.editorData = post.content;

          if (links.length) {
            this.linkDownloadList = [];
            links.forEach((link) => {
              this.linkDownloadList.push({
                type: link.type_code,
                url: link.url,
              });
            });
          }
        })
        .catch((err) => {
          console.error("Load post detail failed ", err);
          this.$swal({
            icon: "error",
            title: "Không load được nội dung bài post :(",
            timer: 3000,
            showConfirmButton: true,
            type: "error",
          });
        });
    },
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
    getLinkDownloadTypePulldown() {
      postApi
        .getLinkDownloadTypePulldown()
        .then((res) => {
          this.linkDownloadTypeList = res.data.linkDownloadTypeList;
        })
        .catch((err) => {
          console.error("Load link download pulldown failed ", err);
          this.$swal({
            icon: "error",
            title: "Không load được danh sách phân loại link download :(",
            timer: 3000,
            showConfirmButton: true,
            type: "error",
          });
        });
    },
    addLinkDownload() {
      this.linkDownloadList.push({
        type: null,
        url: null,
      });
    },
    removeLinkDownload(index) {
      this.linkDownloadList.splice(index, 1);
    },
    savePost() {
      // toast({
      //   message: "Hello There",
      //   type: "is-success",
      //   animate: { in: "fadeIn", out: "fadeOut" },
      //   dismissible: true,
      //   pauseOnHover: true,
      //   closeOnClick: true,
      //   duration: 1000,
      //   position: "bottom-center",
      // });

      const imgUrlList = this.editorData.match(regexConst.FIND_URL);
      const imgUrl = imgUrlList.find((img) =>
        img.includes(`https://drive.google.com/uc`)
      );

      let data = {
        id: this.postId,
        code: this.postCode,
        name: this.postName,
        categoryCode: this.categorySelected,
        title: this.title,
        description: this.description,
        content: this.editorData,
        linkDownload: this.linkDownloadList,
        imgUrl: imgUrl,
      };
      postApi
        .savePost(data)
        .then(() => {
          this.$swal({
            icon: "success",
            title: "Lưu bài viết thành công!",
            timer: 3000,
            type: "success",
          });
        })
        .catch((err) => {
          console.error("Load category pulldown failed ", err);
          this.$swal({
            icon: "error",
            title: "Không thể lưu được bài viết :(",
            showConfirmButton: true,
            type: "error",
          });
        });
    },
  },
};
</script>

<style lang="scss" src="@/assets/scss/editor.scss"></style>
