<template>
  <div id="change-password">
    <section class="section hero is-error-section">
      <div class="columns is-centered">
        <div class="column">
          <div class="card has-card-header-background has-shadow">
            <header class="card-header">
              <p class="card-header-title">Tạo account</p>
            </header>
            <div class="card-content">
              <div class="field">
                <label class="label">Mật khẩu cũ</label>
                <div class="control">
                  <input
                    class="input"
                    type="password"
                    placeholder="Mật khẩu cũ"
                    v-model="oldPassword"
                    @keydown="checkKeydown"
                  />
                </div>
              </div>

              <div class="field">
                <label class="label">Mật khẩu mới</label>
                <div class="control has-icons-right">
                  <input
                    class="input"
                    :class="passwordClass"
                    type="password"
                    placeholder="Mật khẩu mới"
                    v-model="newPassword"
                    @input="validatePassword"
                    @keydown="checkKeydown"
                  />
                  <span class="icon is-small is-right">
                    <font-awesome-icon
                      v-if="newPassword && passwordClass && isCorrectPassword"
                      icon="check"
                    />
                    <font-awesome-icon
                      v-else-if="
                        passwordClass && (!isCorrectPassword || !newPassword)
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
                <label class="label">Nhập lại mật khẩu mới</label>
                <div class="control has-icons-right">
                  <input
                    class="input"
                    :class="rePasswordClass"
                    type="password"
                    placeholder="Nhập lại mật khẩu"
                    v-model="reNewPassword"
                    @input="validateRePassword"
                    @keydown="checkKeydown"
                  />
                  <span class="icon is-small is-right">
                    <font-awesome-icon
                      v-if="
                        reNewPassword && rePasswordClass && isCorrectRePassword
                      "
                      icon="check"
                    />
                    <font-awesome-icon
                      v-else-if="
                        rePasswordClass &&
                        (!isCorrectRePassword || !reNewPassword)
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

              <div class="field is-grouped mt-3">
                <div class="control">
                  <button
                    class="button is-primary"
                    :class="{ 'is-loading': isSubmitting }"
                    :disabled="!isCorrectPassword || !isCorrectRePassword"
                    @click="changePassword"
                  >
                    <span>Xác nhận</span>
                    <span class="icon">
                      <font-awesome-icon icon="check" />
                    </span>
                  </button>
                </div>
              </div>
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
  name: "ChangePassword",
  data() {
    return {
      isCorrectPassword: null,
      isCorrectRePassword: null,
      oldPassword: null,
      newPassword: null,
      reNewPassword: null,
      isSubmitting: false,
    };
  },
  methods: {
    async changePassword() {
      if (this.newPassword != this.reNewPassword) {
        return this.$swal({
          icon: "error",
          title: "Mật khẩu mới không khớp",
          timer: 3000,
          showConfirmButton: false,
          type: "success",
        });
      }

      this.isSubmitting = true;

      let changePasswordForm = {
        username: this.$store.state.user.username,
        oldPassword: this.oldPassword,
        newPassword: this.newPassword,
      };

      api
        .changePassword(changePasswordForm)
        .then(() => {
          this.$swal({
            icon: "success",
            title: "Đổi mật khẩu thành công",
            toast: true,
            timer: 3000,
            position: "bottom-start",
            showConfirmButton: false,
            type: "success",
          });
          this.$router.push({ name: "dashboard" });
        })
        .catch((err) => {
          console.error("Change password failed ", err);
          this.$swal({
            icon: "error",
            title: "Đổi password không thành công :(",
            text: "Vui lòng kiểm tra lại mật khẩu cũ",
            timer: 3000,
            showConfirmButton: true,
            type: "error",
          });
        })
        .finally(() => {
          this.isSubmitting = false;
        });
    },
    checkKeydown(event) {
      if (event.keyCode === 13) {
        this.changePassword();
      }
    },
    validatePassword() {
      this.isCorrectPassword =
        regexConst.PASSWORD.test(String(this.newPassword)) &&
        !commonConst.WEAK_PASSWORD.includes(this.newPassword);
    },
    validateRePassword() {
      this.isCorrectRePassword = this.newPassword == this.reNewPassword;
    },
  },
  computed: {
    passwordClass: function () {
      return this.newPassword == null || this.isCorrectPassword == null
        ? ""
        : this.isCorrectPassword && this.newPassword
        ? "is-success"
        : "is-danger";
    },
    rePasswordClass: function () {
      return this.reNewPassword == null || this.isCorrectRePassword == null
        ? ""
        : this.isCorrectRePassword && this.reNewPassword
        ? "is-success"
        : "is-danger";
    },
  },
};
</script>
