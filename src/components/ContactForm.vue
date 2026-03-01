<template>
  <Form
    @submit="submitContact"
    :validation-schema="contactFormSchema"
    :initial-values="contact"
  >
    <div class="form-group">
      <label>Tên</label>
      <Field name="name" type="text" class="form-control" />
      <ErrorMessage name="name" class="error-feedback" />
    </div>

    <div class="form-group">
      <label>E-mail</label>
      <Field name="email" type="email" class="form-control" />
      <ErrorMessage name="email" class="error-feedback" />
    </div>

    <div class="form-group">
      <label>Địa chỉ</label>
      <Field name="address" type="text" class="form-control" />
      <ErrorMessage name="address" class="error-feedback" />
    </div>

    <div class="form-group">
      <label>Điện thoại</label>
      <Field name="phone" type="tel" class="form-control" />
      <ErrorMessage name="phone" class="error-feedback" />
    </div>

    <div class="form-group form-check">
      <Field name="favorite" type="checkbox" class="form-check-input" />
      <label class="form-check-label">
        <strong>Liên hệ yêu thích</strong>
      </label>
    </div>

    <div class="form-group mt-3">
      <button type="submit" class="btn btn-primary">Lưu</button>

      <button
        v-if="contact._id"
        type="button"
        class="ml-2 btn btn-danger"
        @click="$emit('delete:contact', contact._id)"
      >
        Xóa
      </button>

      <button type="button" class="ml-2 btn btn-secondary" @click="Cancel">
        Thoát
      </button>
    </div>
  </Form>
</template>

<script>
import * as yup from "yup";
import { Form, Field, ErrorMessage } from "vee-validate";
export default {
  components: {
    Form,
    Field,
    ErrorMessage,
  },
  emits: ["submit:contact", "delete:contact"],
  props: {
    contact: { type: Object, required: true },
  },
  data() {
    const contactFormSchema = yup.object().shape({
      name: yup
        .string()
        .required("Tên phải có giá trị.")
        .min(2, "Tên phải ít nhất 2 ký tự.")
        .max(50, "Tên có nhiều nhất 50 ký tự."),
      email: yup
        .string()
        .email("E-mail không đúng.")
        .max(50, "E-mail tối đa 50 ký tự."),
      address: yup.string().max(100, "Địa chỉ tối đa 100 ký tự."),
      phone: yup
        .string()
        .matches(
          /((09|03|07|08|05)+([0-9]{8})\b)/g,
          "Số điện thoại không hợp lệ.",
        ),
    });
    return {
      // Chúng ta sẽ không muốn hiệu chỉnh props, nên tạo biến cục bộ
      // contactLocal để liên kết với các input trên form
      //   contactLocal: this.contact,
      contactFormSchema,
    };
  },
  methods: {
    submitContact(values) {
      console.log("VALUES:", values); // kiểm tra

      this.$emit("submit:contact", values);
    },
    deleteContact() {
      this.$emit("delete:contact", this.contactLocal.id);
    },
    Cancel() {
      const reply = window.confirm(
        "You have unsaved changes! Do you want to leave?",
      );
      if (!reply) {
        // stay on the page if
        // user clicks 'Cancel'
        return false;
      } else this.$router.push({ name: "contactbook" });
    },
  },
};
</script>
<style scoped>
@import "@/assets/form.css";
</style>
