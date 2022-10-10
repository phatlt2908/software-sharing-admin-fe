<template>
  <div id="register">
    <section class="section hero is-error-section">
      <div class="columns is-centered">
        <div class="column">
          <div class="card has-card-header-background has-shadow">
            <header class="card-header">
              <p class="card-header-title">Tạo account</p>
            </header>
            <div class="card-content">
              <transition name="fade" mode="out-in">
                <div v-if="!isConfirmed">
                  <div class="field">
                    <label class="label">Tài khoản</label>
                    <div
                      class="control has-icons-left has-icons-right"
                      :class="{ 'is-loading': isCheckingUsername }"
                    >
                      <input
                        class="input"
                        :class="userClass"
                        type="text"
                        placeholder="Tài khoản"
                        v-model="username"
                        @change="validateUser"
                      />
                      <span class="icon is-small is-left">
                        <font-awesome-icon icon="user" />
                      </span>
                      <span class="icon is-small is-right">
                        <font-awesome-icon
                          v-if="username && userClass && isCorrectUser"
                          icon="check"
                        />
                        <font-awesome-icon
                          v-else-if="userClass && (!isCorrectUser || !username)"
                          icon="exclamation-triangle"
                        />
                      </span>
                    </div>
                    <p
                      class="help is-danger"
                      v-if="userClass && !isCorrectUser"
                    >
                      Tài khoản đã tồn tại
                    </p>
                  </div>

                  <div class="field">
                    <label class="label">Tên</label>
                    <div class="control has-icons-left has-icons-right">
                      <input
                        class="input"
                        type="text"
                        placeholder="Tên"
                        v-model="name"
                      />
                      <span class="icon is-small is-left">
                        <font-awesome-icon icon="signature" />
                      </span>
                    </div>
                  </div>

                  <div class="field">
                    <label class="label">Email</label>
                    <div
                      class="control has-icons-left has-icons-right"
                      :class="{ 'is-loading': isCheckingEmail }"
                    >
                      <input
                        class="input"
                        :class="emailClass"
                        type="email"
                        placeholder="abc@mail.xyz"
                        v-model="email"
                        @change="validateEmail"
                      />
                      <span class="icon is-small is-left">
                        <font-awesome-icon icon="envelope" />
                      </span>
                      <span class="icon is-small is-right">
                        <font-awesome-icon
                          v-if="email && emailClass && isCorrectEmail"
                          icon="check"
                        />
                        <font-awesome-icon
                          v-else-if="emailClass && (!isCorrectEmail || !email)"
                          icon="exclamation-triangle"
                        />
                      </span>
                    </div>
                    <p
                      class="help is-danger"
                      v-if="emailClass && !isCorrectEmail"
                    >
                      {{ emailMessage }}
                    </p>
                  </div>

                  <div class="field">
                    <div class="control">
                      <label class="checkbox">
                        <input type="checkbox" v-model="isTerm" />
                        Đồng ý với <a href="#">điều khoản</a>
                      </label>
                    </div>
                  </div>
                </div>

                <div v-else>
                  <div class="field">
                    <label class="label">Mật khẩu</label>
                    <div class="control has-icons-right">
                      <input
                        class="input"
                        :class="passwordClass"
                        type="password"
                        placeholder="Mật khẩu"
                        v-model="password"
                        @input="validatePassword"
                      />
                      <span class="icon is-small is-right">
                        <font-awesome-icon
                          v-if="password && passwordClass && isCorrectPassword"
                          icon="check"
                        />
                        <font-awesome-icon
                          v-else-if="
                            passwordClass && (!isCorrectPassword || !password)
                          "
                          icon="exclamation-triangle"
                        />
                      </span>
                    </div>
                    <p
                      class="help is-danger"
                      v-if="passwordClass && !isCorrectPassword"
                    >
                      Mật khẩu quá yếu!
                    </p>

                    <ul>
                      <li>Bao gồm ít nhất 6 ký tự</li>
                      <li>Bao gồm ít nhất một chữ cái (a-Z)</li>
                      <li>Bao gồm ít nhất một chữ số (0-9)</li>
                    </ul>
                  </div>
                  <div class="field">
                    <label class="label">Nhập lại mật khẩu</label>
                    <div class="control has-icons-right">
                      <input
                        class="input"
                        :class="rePasswordClass"
                        type="password"
                        placeholder="Nhập lại mật khẩu"
                        v-model="rePassword"
                        @input="validateRePassword"
                      />
                      <span class="icon is-small is-right">
                        <font-awesome-icon
                          v-if="
                            rePassword && rePasswordClass && isCorrectRePassword
                          "
                          icon="check"
                        />
                        <font-awesome-icon
                          v-else-if="
                            rePasswordClass &&
                            (!isCorrectRePassword || !rePassword)
                          "
                          icon="exclamation-triangle"
                        />
                      </span>
                    </div>
                    <p
                      class="help is-danger"
                      v-if="rePasswordClass && !isCorrectRePassword"
                    >
                      Không trùng khớp
                    </p>
                  </div>
                </div>
              </transition>

              <transition name="fade" mode="out-in">
                <div v-if="!isConfirmed" class="field is-grouped mt-3">
                  <div class="control">
                    <button
                      @click="confirm"
                      class="button is-primary"
                      :disabled="!isTerm || !username || !email"
                    >
                      <span>Tiếp tục</span>
                      <span class="icon">
                        <font-awesome-icon icon="chevron-right" />
                      </span>
                    </button>
                  </div>
                </div>
                <div v-else class="field is-grouped mt-3">
                  <div class="control">
                    <button
                      @click="submit"
                      class="button is-primary"
                      :class="{ 'is-loading': isSubmitting }"
                      :disabled="!isCorrectPassword || !isCorrectRePassword"
                    >
                      <span class="icon">
                        <font-awesome-icon icon="pencil-alt" />
                      </span>
                      <span>Đăng ký</span>
                    </button>
                  </div>
                  <div class="control">
                    <button @click="back" class="button is-link is-light">
                      <span class="icon">
                        <font-awesome-icon icon="chevron-left" />
                      </span>
                      <span>Quay lại</span>
                    </button>
                  </div>
                </div>
              </transition>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import api from "../../services/authApi";
import regexConst from "../../constants/regexConst";
import commonConst from "../../constants/commonConst";

export default {
  name: "Register",
  data() {
    return {
      isCorrectUser: null,
      isCorrectEmail: null,
      isCorrectPassword: null,
      isCorrectRePassword: null,
      username: null,
      name: null,
      email: null,
      emailMessage: "",
      password: null,
      rePassword: null,
      isConfirmed: false,
      isTerm: false,
      isCheckingUsername: false,
      isCheckingEmail: false,
      isSubmitting: false,
    };
  },
  methods: {
    async confirm() {
      this.isConfirmed =
        this.isCorrectEmail && this.isCorrectUser && this.isTerm;
    },
    back() {
      this.isConfirmed = false;
    },
    async submit() {
      this.isSubmitting = true;

      let registerForm = {
        username: this.username,
        name: this.name,
        password: this.password,
        email: this.email,
      };

      api
        .register(registerForm)
        .then((res) => {
          console.log("Register successfully ", res);
          this.$swal({
            icon: "success",
            title: "Đăng ký thành công",
            toast: true,
            timer: 3000,
            position: "bottom-end",
            showConfirmButton: false,
            type: "success",
          });
          this.$router.push({ name: "dashboard" });
        })
        .catch((err) => {
          console.error("Register failed ", err);
          this.$swal({
            icon: "error",
            title: "Đăng ký thất bại :(",
            toast: true,
            timer: 3000,
            position: "bottom-end",
            showConfirmButton: false,
            type: "error",
          });
        })
        .finally(() => {
          this.isSubmitting = false;
        });
    },
    validateUser() {
      this.isCheckingUsername = true;
      api
        .checkUsername(String(this.username).toLowerCase())
        .then((res) => {
          let isExist = res.data.isExist;
          this.isCorrectUser = !isExist;
        })
        .catch((err) => {
          console.error(err);
          this.isCorrectUser = false;
        })
        .finally(() => {
          this.isCheckingUsername = false;
        });
    },
    validateEmail() {
      if (regexConst.EMAIL.test(String(this.email).toLowerCase())) {
        this.isCheckingEmail = true;
        api
          .checkEmail(String(this.email).toLowerCase())
          .then((res) => {
            let isExist = res.data.isExist;
            if (isExist) {
              this.isCorrectEmail = false;
              this.emailMessage = "Email đã tồn tại";
            } else {
              this.isCorrectEmail = true;
            }
          })
          .catch((err) => {
            console.error(err);
            this.isCorrectEmail = false;
            this.emailMessage = "Không thể kiểm tra email";
          })
          .finally(() => {
            this.isCheckingEmail = false;
          });
      } else {
        this.isCorrectEmail = false;
        this.emailMessage = "Email không đúng";
      }
    },
    validatePassword() {
      this.isCorrectPassword =
        regexConst.PASSWORD.test(String(this.password)) &&
        !commonConst.WEAK_PASSWORD.includes(this.password);
    },
    validateRePassword() {
      this.isCorrectRePassword = this.password == this.rePassword;
    },
  },
  computed: {
    userClass: function () {
      return this.username == null || this.isCorrectUser == null
        ? ""
        : this.isCorrectUser && this.username
        ? "is-success"
        : "is-danger";
    },
    emailClass: function () {
      return this.email == null || this.isCorrectEmail == null
        ? ""
        : this.isCorrectEmail && this.email
        ? "is-success"
        : "is-danger";
    },
    passwordClass: function () {
      return this.password == null || this.isCorrectPassword == null
        ? ""
        : this.isCorrectPassword && this.password
        ? "is-success"
        : "is-danger";
    },
    rePasswordClass: function () {
      return this.rePassword == null || this.isCorrectRePassword == null
        ? ""
        : this.isCorrectRePassword && this.rePassword
        ? "is-success"
        : "is-danger";
    },
  },
};
</script>
<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
.out-in-active {
  transition: opacity 0.5s;
}
</style>
