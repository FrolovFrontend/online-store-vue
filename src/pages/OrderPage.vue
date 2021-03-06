<template>
  <main class="content container">
    <div class="content__top">
      <ul class="breadcrumbs">
        <li class="breadcrumbs__item">
          <router-link class="breadcrumbs__link" :to="{name: 'main'}">Каталог</router-link>
        </li>
        <li class="breadcrumbs__item">
          <router-link class="breadcrumbs__link" :to="{name: 'cart'}">Корзина</router-link>
        </li>
        <li class="breadcrumbs__item">
          <a class="breadcrumbs__link">Оформление заказа</a>
        </li>
      </ul>

      <h1 class="content__title">Корзина</h1>
      <span class="content__info">{{ products.length }} {{ declOfProduct }}</span>
    </div>

    <section class="cart">
      <form class="cart__form form" action="#" method="POST" @submit.prevent="order">
        <div class="cart__field">
          <div class="cart__data">
            <base-form-text
              v-model="formData.name"
              :error="formError.name"
              title="ФИО"
              placeholder="Введите ваше полное имя"
              name="name"
            />

            <base-form-text
              v-model="formData.address"
              :error="formError.address"
              title="Адрес доставки"
              placeholder="Введите ваше полное имя"
              name="address"
            />

            <base-form-text
              v-model="formData.phone"
              :error="formError.phone"
              title="Телефон"
              placeholder="Введите ваш телефон"
              type="tel"
            />

            <base-form-text
              v-model="formData.email"
              :error="formError.email"
              title="E-mail"
              placeholder="Введите ваш E-mail"
              type="email"
            />

            <base-form-textarea
              v-model="formData.comment"
              :error="formError.comment"
              title="Комментарий к заказу"
              placeholder="Ваши пожелания"
            />
          </div>

          <div class="cart__options">
            <h3 class="cart__title">Доставка</h3>
            <ul class="cart__options options">
              <li class="options__item">
                <label class="options__label">
                  <input
                    class="options__radio sr-only"
                    type="radio"
                    name="delivery"
                    value="0"
                    checked
                  />
                  <span class="options__value">
                    Самовывоз
                    <b>бесплатно</b>
                  </span>
                </label>
              </li>
              <li class="options__item">
                <label class="options__label">
                  <input class="options__radio sr-only" type="radio" name="delivery" value="500" />
                  <span class="options__value">
                    Курьером
                    <b>500 ₽</b>
                  </span>
                </label>
              </li>
            </ul>

            <h3 class="cart__title">Оплата</h3>
            <ul class="cart__options options">
              <li class="options__item">
                <label class="options__label">
                  <input class="options__radio sr-only" type="radio" name="pay" value="card" />
                  <span class="options__value">Картой при получении</span>
                </label>
              </li>
              <li class="options__item">
                <label class="options__label">
                  <input class="options__radio sr-only" type="radio" name="pay" value="cash" />
                  <span class="options__value">Наличными при получении</span>
                </label>
              </li>
            </ul>
          </div>
        </div>

        <div class="cart__block">
          <ul class="cart__orders">
            <li class="cart__order" v-for="product in products" :key="product.product.id">
              <h3>
                {{ product.product.title }}
                <span
                  v-if="product.amount > 1"
                >({{ product.amount | numberFormat }} шт.)</span>
              </h3>
              <b>{{(product.product.price * product.amount) | numberFormat}} ₽</b>
              <span>Артикул: {{ product.product.id }}</span>
            </li>
          </ul>

          <div class="cart__total">
            <p>
              Доставка:
              <b>500 ₽</b>
            </p>
            <p>
              Итого:
              <b>{{ products.length }}</b>
              {{ declOfProduct }} на сумму
              <b>{{ totalPrice | numberFormat }} ₽</b>
            </p>
          </div>

          <button class="cart__button button button--primery" type="submit">{{ buttonText }}</button>
        </div>

        <div class="cart__error form__error-block" v-if="formErrorMessage">
          <h4>Заявка не отправлена!</h4>
          <p>{{ formErrorMessage }}</p>
        </div>
      </form>
    </section>
  </main>
</template>

<script>
import BaseFormText from "@/components/BaseFormText.vue";
import BaseFormTextarea from "@/components/BaseFormTextarea.vue";
import axios from "axios";
import { API_BASE_URL } from "@/config";
import { mapGetters } from "vuex";
import { DECLENSIONS_PRODUCT } from "@/helpers/constans";
import declOfNumber from "@/helpers/declOfNumber";
import numberFormat from "@/helpers/filters/numberFormat";

export default {
  components: { BaseFormText, BaseFormTextarea },
  data() {
    return {
      formData: {
        // свойства объекта создаются автоматически
        // при заполнении каждого конкретного поля
        // у которого есть v-model="formData.свойство"
      },
      formError: {
        // аналогично для свойств v-if
      },
      formErrorMessage: "",

      orderSending: false,
    };
  },
  filters: { numberFormat },
  computed: {
    ...mapGetters({
      products: "cartDetailProducts",
      totalPrice: "cartTotalPrice",
    }),
    declOfProduct() {
      const quantity = this.products.length;

      return declOfNumber(quantity, DECLENSIONS_PRODUCT);
    },
    buttonText() {
      return this.orderSending ? "Оформление" : "Оформить заказ";
    },
  },
  methods: {
    order() {
      this.formError = {};
      this.formErrorMessage = "";
      this.orderSending = true;

      clearTimeout(this.orderTimer);
      this.orderTimer = setTimeout(() => {
        axios
          .post(
            API_BASE_URL + "/api/orders",
            {
              ...this.formData,
            },
            {
              params: {
                userAccessKey: this.$store.state.userAccessKey,
              },
            }
          )
          .then((response) => {
            this.$store.commit("resetCart");
            this.$store.commit("updateOrderInfo", response.data);
            this.$router.push({
              name: "orderInfo",
              params: { id: response.data.id },
            });
          })
          .catch((error) => {
            this.formErrorMessage = error.response.data.error.message;
            this.formError = error.response.data.error.request || {};
          })
          .then(() => {
            this.orderSending = false;
          });
      }, 500);
    },
  },
};
</script>