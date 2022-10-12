<template>
  <div id="postDetail">
    <h1>Nội dung bài viết</h1>
    <div class="field">
      <label class="label">Danh mục</label>
      <div class="control">
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
      </div>
    </div>
    <div class="field">
      <label class="label">Code</label>
      <div class="control">
        <input
          class="input"
          type="text"
          placeholder="Code (vd: 2016 Professional Plus Full)"
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
          placeholder="Name (vd: 2016 Professional Plus Full)"
          v-model="postName"
        />
      </div>
    </div>
    <div class="field">
      <label class="label">Tiêu đề</label>
      <div class="control">
        <textarea
          class="textarea"
          placeholder="Tiêu đề (vd: Download Visio 2016 Professional Plus Full - Hướng dẫn (Google Drive))"
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
      <label class="label">Download link</label>
      <div class="control">
        <div
          class="download-link"
          v-for="(link, index) in linkDownloadList"
          :key="link"
        >
          <div class="select">
            <select v-model="link.type">
              <option :value="null">--- Chọn loại link ---</option>
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
          <input
            class="input link-type-url"
            type="text"
            placeholder="name"
            v-model="link.name"
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
    <div class="mt-5">
      <article class="message is-primary">
        <div class="message-body">
          <h5 class="title is-5">Hướng dẫn upload và đính kèm link file</h5>
          <ol>
            <li>Tìm kiếm file cài đặt trên mạng</li>
            <li>Tải về, xóa các file không cần thiết</li>
            <li>
              Đổi tên, và nén file zip với mật khẩu là "dayne.run". Đổi tên file
              vừa nén theo dạng "[dayne.run] - {tên file}"
            </li>
            <li>
              Upload file vừa nén vào
              <a
                href="https://drive.google.com/drive/folders/1dCqSENKOEIjB7HE2EDhgAHc9_FRSK7Ke?usp=sharing"
                target="_blank"
              >
                link này
              </a>
            </li>
            <li>Share link và copy link dán vào text box bên trên</li>
          </ol>
        </div>
      </article>
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
      editorData: "<p>Nội dung bài viết</p>",
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
          uploadUrl: process.env.VUE_APP_API_UPLOAD_IMAGE_URL,
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
          name: null,
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
                name: link.name,
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
