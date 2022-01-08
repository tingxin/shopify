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
          :key="length.label"
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
    <div v-if="isLoadervisible" class="pdc-pdp">
      <SfLoader class="pdc-pdp-loader" :loading="isLoadervisible">
        <div class="desc">
          <!-- please have a cup of coffee,it will be done in one or wait minutes -->
        </div>
      </SfLoader>
    </div>
  </div>
</template>
<script>
import('@google/model-viewer');

import {
  SfButton,
  SfComponentSelect,
  SfIcon,
  SfSidebar,
  SfLoader,
} from '@storefront-ui/vue';

export default {
  name: 'Step1',
  components: {
    SfButton,
    SfComponentSelect,
    SfIcon,
    SfSidebar,
    SfLoader,
  },
  setup(props, { root }) {},
  data() {
    return {
      valid: false,
      sidebarVisible: false,
      // 款式
      style: 'st',
      length: '16',
      color: 'black',
      styles: [
        { label: 'ST', value: 'st' },
        { label: 'Body', value: 'body' },
        { label: 'Curls', value: 'curls' },
        { label: 'Yaki', value: 'yaki' },
        { label: 'Bob', value: 'bob' },
      ],
      lengths: [
        { label: '8 Inch', value: '8' },
        { label: '10 Inch', value: '10' },
        { label: '12 Inch', value: '12' },
        { label: '14 Inch', value: '14' },
        { label: '16 Inch', value: '16' },
        { label: '18 Inch ', value: '18' },
        { label: '20 Inch ', value: '20' },
        { label: '22 Inch ', value: '22' },
        { label: '24 Inch ', value: '24' },
        { label: '26 Inch', value: '26' },
      ],
      colors: [
        { color: 'black', name: 'Black' },
        { color: 'winered', name: 'Wine Red'},
        { color: 'darkpurple', name: 'Dark Purple' },
        { color: 'blue', name: 'Blue' },
        { color: 'platinumblonde', name: 'Platinum Blonde' },
      ],
      isLoadervisible: false,
    };
  },
  methods: {
    handleSidebar() {
      return (this.sidebarVisible = true);
    },
    sidebarClose() {
      this.sidebarVisible = false;
    },
    // 无论那个款式，0-14 -> 10, 16-22->18, 24-26->26
    getInch(val){
      if(['8','10','12','14'].includes(val)){

        return '10inch'
      }else if(['16','18','20','22'].includes(val)){

        return '18inch'
      }else{

        return '26inch'
      }
    },
    async submit() {
      const info = JSON.parse(window.localStorage.getItem('info'));
      const newInch = this.getInch(this.length)
      const params = [this.style, this.color, newInch];
      const newData = {
        name: info.name,
        params,
        data: info.data,
      };

      this.submitted = true;
      this.isLoadervisible = true;
      // 获取远端图片
      this.notificationVisible = '';
      await this.$axios({
        method: 'POST',
        // url: '/ama/profile',
        url: '/b/default/profile',
        data: JSON.stringify(newData),
      })
        .then(({ data }) => {
          this.isLoadervisible = false;
          window.localStorage.setItem('filePath', data.file_path);
          window.localStorage.setItem('request_id', data.request_id);
          this.$router.push({
            path: '/step2',
          });
        })
        .catch((e) => {
          this.notificationVisible = 'Internal Server Error';
          this.isLoadervisible = false;
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
.pdc-pdp {
  min-height: 100vh;
  width: 100%;
  position: absolute;
  top: 0;
  right: 0;
  z-index: 99999;
  margin-left: -25%;
  background: rgba(94, 91, 91, 0.2);
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  @include for-mobile {
    min-height: 165vh;
  }
  .pdc-pdp-loader {
    width: 100%;
    .sf-loader__overlay {
      background: rgba(0, 0, 0, 0.5);
    }
  }
  .pdc-pdp-desc {
    color: red;
    margin: var(--spacer-2xl);
    @include for-mobile {
      margin: var(--spacer-2xl) var(--spacer-base);
    }
  }
}
</style>
