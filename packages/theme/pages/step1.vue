<template>
  <div id="form-step1">
    <div class="form__element form_title">
      <SfButton
        class="sf-button--pure info_circle——button"
        @click="handleSidebar"
      >
        <SfIcon
          icon="info_circle"
          size="lg"
          color="green-primary"
          viewBox="0 0 24 24"
          :coverage="1"
        />
      </SfButton>
      <SfSidebar
        title="WechatIMG68"
        subtitle=""
        :heading-level="3"
        button
        :visible="sidebarVisible"
        overlay
        persistent
        @close="sidebarClose"
      >
        <img alt="Empty bag" class="cart__image" src="WechatIMG68.jpeg" />
      </SfSidebar>
      <h3 class="form__h2">Wig Specs</h3>
    </div>
    <form class="form">
      <SfComponentSelect
        v-model="style"
        class="form__element form__element--half form__select sf-component-select--underlined"
        label="Hair style"
        :required="false"
        valid
        :disabled="false"
        error-message="Please select Hair style"
        value=""
        placeholder="Please select Hair style"
      >
        <SfComponentSelectOption
          v-for="item in styles"
          :key="item.value"
          :value="item.value"
        >
          {{ item.label }}
        </SfComponentSelectOption>
      </SfComponentSelect>
      <SfComponentSelect
        v-model="color"
        class="form__element form__element--half form__element--half-even form__select sf-component-select--underlined"
        label="Hair Color"
        :required="false"
        valid
        :disabled="false"
        error-message="Please select Hair Color"
        value=""
        placeholder="Please select Hair Color"
      >
        <SfComponentSelectOption
          v-for="item in colors"
          :key="item.color"
          :value="item.color"
        >
          {{ item.name }}
        </SfComponentSelectOption>
      </SfComponentSelect>
      <SfComponentSelect
        v-model="length"
        label="Hair Length"
        class="form__element form__element--half form__select sf-component-select--underlined"
        :required="false"
        valid
        :disabled="false"
        error-message="Please select Hair Length"
        placeholder="Please select Hair Length"
      >
        <SfComponentSelectOption
          v-for="length in lengths"
          :key="length.value"
          :value="length.value"
        >
          {{ length.label }}
        </SfComponentSelectOption>
      </SfComponentSelect>

      <div class="form__element form__element--half" />

      <div class="form__action">
        <SfButton type="submit" @click.prevent="submit">Next</SfButton>
      </div>
    </form>
  </div>
</template>
<script>
import('@google/model-viewer');

import {
  SfSelect,
  SfColor,
  SfButton,
  SfInput,
  SfComponentSelect,
  SfIcon,
  SfSidebar,
  SfImage,
} from '@storefront-ui/vue';

export default {
  name: 'Step1',
  components: {
    SfSelect,
    SfColor,
    SfButton,
    SfInput,
    SfComponentSelect,
    SfIcon,
    SfSidebar,
    SfImage,
  },
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  setup(props, { root }) {},
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  data() {
    return {
      valid: false,
      sidebarVisible: false,
      // 款式
      style: 'st',
      length: '16inch',
      color: 'black',
      styles: [
        { label: 'ST', value: 'st' },
        { label: 'Body +$10.00', value: 'body' },
        { label: 'Curls +$10.00', value: 'curls' },
        { label: 'Yaki +$10.00', value: 'yaki' },
        { label: 'Bob $79.00', value: 'bob' },
      ],
      lengths: [
        { label: '8 Inch', value: '8inch' },
        { label: '10 Inch', value: '10inch' },
        { label: '12 Inch', value: '12inch' },
        { label: '14 Inch', value: '14inch' },
        { label: '16 Inch', value: '16inch' },
        { label: '18 Inch +$30.00', value: '18inch' },
        { label: '20 Inch + $90.00', value: '20inch' },
        { label: '22 Inch +$130.00', value: '22inch' },
        { label: '24 Inch +$180.00', value: '24inch' },
        { label: '26 Inch +$240.00', value: '26inch' },
      ],
      lengths1: [
        { label: '8 Inch', value: '8inch' },
        { label: '10 Inch', value: '10inch' },
        { label: '12 Inch', value: '12inch' },
        { label: '14 Inch', value: '14inch' },
        { label: '16 Inch', value: '16inch' },
        { label: '18 Inch +$30.00', value: '18inch' },
        { label: '20 Inch + $90.00', value: '20inch' },
        { label: '22 Inch +$130.00', value: '22inch' },
        { label: '24 Inch +$180.00', value: '24inch' },
        { label: '26 Inch +$240.00', value: '26inch' },
      ],
      lengths2: [
        { label: '8 Inch', value: '8inch' },
        { label: '10 Inch', value: '10inch' },
        { label: '12 Inch', value: '12inch' },
        { label: '14 Inch', value: '14inch' },
      ],
      colors: [
        { color: 'black', name: 'Black' },
        { color: 'wine red ', name: 'Wine Red +¥30.00' },
        { color: 'dark purple', name: 'Dark Purple +¥30.00' },
        { color: 'blue', name: 'Blue +¥30.00' },
        { color: 'platinum blonde', name: 'Platinum Blonde +¥30.00' },
      ],
    };
  },
  watch: {
    style(newVal, oldVal) {
      if (newVal == 'bob') {
        this.lengths = this.lengths2;
        this.length = '14inch';
      } else {
        this.lengths = this.lengths1;
        this.length = '16inch';
      }
    },
  },
  methods: {
    handleSidebar() {
      return (this.sidebarVisible = true);
    },
    sidebarClose() {
      this.sidebarVisible = false;
    },
    async submit() {
      window.localStorage.setItem(
        'hairInfo',
        JSON.stringify([this.style, this.color, this.length])
      );
      this.$router.push({
        path: '/step2',
        // query: {
        //   path: this.filePath
        // }
      });
    },
  },
};
</script>

<style lang="scss" scoped>
@import '~@storefront-ui/vue/styles';
.cart__image {
  width: 100%;
}

.info_circle——button {
  display: inline-block;
}
#form-ste1 {
  box-sizing: border-box;
  padding: 0 var(--spacer-sm);
  position: relative;
  @include for-desktop {
    padding: 0 var(--spacer-sm);
    max-width: 870px;
    margin: 0 auto;
  }
}
.form_title {
  display: flex;
}
.form {
  padding: var(--spacer-sm) 0;
  @include for-mobile {
    padding: var(--spacer-sm);
  }
  &__h2 {
    padding: var(--spacer-sm) 0;
  }
  &__group {
    display: flex;
    align-items: flex-start;
  }
  &__action-button {
    &:first-child {
      margin: var(--spacer-sm) 0 0 0;
    }
    &--secondary {
      margin: var(--spacer-sm) 0 var(--spacer-sm) var(--spacer-base);
    }
  }
  &__button {
    --button-width: 100%;
  }
  @include for-desktop {
    display: flex;
    flex-wrap: wrap;
    align-items: flex-start;
    margin: 0 var(--spacer-2xl) 0 0;
    &:last-of-type {
      margin: 0 calc(var(--spacer-2xl) - var(--spacer-sm)) 0 0;
    }
    &__element {
      margin: 0 0 var(--spacer-sm) 0;
      flex: 0 0 100%;
      &--half {
        flex: 1 1 50%;
        &-even {
          padding: 0 0 0 var(--spacer-xl);
        }
      }
    }
    &__action {
      flex: 0 0 100%;
      display: flex;
    }
    &__button {
      --button-width: auto;
    }
  }
}
</style>
