<template>
  <div id="form-step1">
    <form class="form">
      <div @click="$store.commit('add')">你好啊 点我变大大{{$store.state.count}}</div>
      <SfComponentSelect
        v-model="style"
        label="款式(style)"
        class="
          form__element
          form__element--half
          form__select
          sf-component-select--underlined
        "
        required
        :valid="styleBlur || validStyle(style)"
        error-message="Please choose style."
        @blur="styleBlur = false"
      >
        <SfComponentSelectOption
          v-for="(style,key) in styles"
          :key="key"
          :value="style.name"
        >
          {{ style.label }}
        </SfComponentSelectOption>
      </SfComponentSelect>
      <SfComponentSelect
        v-model="length"
        label="长度(length)"
        class="
          form__element
          form__element--half
          form__element--half-even
          form__select
          sf-component-select--underlined
        "
        required
        :valid="lengthBlur || validLength(length)"
        error-message="Please choose length."
        @blur="lengthBlur = false"
      >
        <SfComponentSelectOption
          v-for="length in lengths"
          :key="length"
          :value="length"
        >
          {{ length }}
        </SfComponentSelectOption>
      </SfComponentSelect>
      <SfComponentSelect
        v-model="color"
        label="颜色(Color)"
        class="
          form__element
          form__element--half
          form__select
          sf-component-select--underlined
        "
        required
        :valid="colorBlur || validColor(color)"
        error-message="Please choose color."
        @blur="colorBlur = false"
      >
        <SfComponentSelectOption
          v-for="item in colors"
          :key="item.color"
          :value="item.color"
        >
          {{ item.name }}
        </SfComponentSelectOption>
      </SfComponentSelect>
      <div class="form__element form__element--half"/>

      <div class="form__action">
        <SfButton type="submit" @click.prevent="submit">Next</SfButton>
        <SfButton
          class="
            sf-button--text
            form__action-button form__action-button--secondary
          "
          @click="reset"
          >Reset</SfButton
        >
      </div>
    </form>
  </div>
</template>
<script>
import('@google/model-viewer');

import { SfSelect, SfColor, SfButton, SfInput,
  SfComponentSelect,
  SfHeading} from '@storefront-ui/vue';

export default {
  name: 'Step1',
  components: {
    SfSelect,
    SfColor,
    SfButton,
    SfInput,
    SfComponentSelect,
    SfHeading
  },
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  setup(props, {root}) {
    const handleNextClick = () => {
      return root.$router.push('/step2');
    };
    return {
      handleNextClick
    };
  },
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  data() {
    return {
      valid: false,
      submitted: false,
      // 款式
      style: '',
      styleBlur: true,
      length: '',
      lengthBlur: true,
      color: '',
      colorBlur: true,
      styles: [
        { label: 'St', name: 'st' },
        { label: 'Body', name: 'body' },
        { label: 'Curls', name: 'curls' },
        { label: 'Yaki', name: 'yaki' },
        { label: 'Bob', name: 'bob' }
      ],
      lengths: ['8', '10', '12', '14', '16', '18', '20', '22', '24', '26'],
      colors: [
        { color: 'black', name: 'Black', selected: true },
        { color: 'wineRed', name: 'wine Red', selected: false },
        { color: 'darkPurple', name: 'Dark Purple', selected: false },
        { color: 'blue', name: 'Blue', selected: false },
        { color: 'platinumBlonde', name: 'Platinum Blonde', selected: false }
      ]
      // isMounted: false,
      // url: '../assets/models/body_black_55_45cm.glb'
    };
  },
  methods: {
    validate() {
      this.styleBlur = false;
      this.lengthBlur = false;
      this.colorBlur = false;
      if (
        this.validStyle(this.style) &&
        this.validLength(this.length) &&
        this.validColor(this.color)
      ) {
        this.valid = true;
      }
    },
    validStyle(style) {
      return Boolean(style);
    },
    validLength(length) {
      return Boolean(length);
    },
    validColor(color) {
      return Boolean(color);
    },
    submit() {
      this.validate();
      if (this.valid) {
        const params = {
          ...this.$store.state.form,
          style: this.style,
          length: this.length,
          color: this.color
        };
        this.$store.dispatch('addForm', params);
        this.submitted = true;
        this.handleNextClick();

      }
    },
    reset() {
      this.style = '';
      this.length = '';
      this.color = '';
    }

  }
};
</script>

<style lang="scss" scoped>
@import "~@storefront-ui/vue/styles";
#form-ste1 {
  box-sizing: border-box;
  padding: 0 var(--spacer-sm);
  @include for-desktop {
    padding: 0 var(--spacer-sm);
    max-width: 870px;
    margin: 0 auto;
  }
}
.form {
  padding: var(--spacer-sm) 0;
  @include for-mobile {
    padding: var(--spacer-sm);
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
