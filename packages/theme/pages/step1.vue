<template>
  <div id="form-step1">
    <form class="form">
      <SfComponentSelect
        v-model="shape"
        label="款式"
        class="
          form__element
          form__element--half
          form__select
          sf-component-select--underlined
        "
        required
        :valid="shapeBlur || validShape(shape)"
        error-message="Please choose shape."
        @blur="shapeBlur = false"
      >
        <SfComponentSelectOption
          v-for="(shape,key) in shapes"
          :key="key"
          :value="shape.name"
        >
          {{ shape.label }}
        </SfComponentSelectOption>
      </SfComponentSelect>
      <SfComponentSelect
        v-model="length"
        label="长度"
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
      <!-- <div class="form__element form__element--half"/> -->
      <div class="product__colors ">
      <p class="product__color-label">Color:</p>
      <SfColor
        v-for="(color, i) in colors"
        :key="i"
        :aria-label="color.name"
        :color="color.color"
        :selected="color.selected"
        class="product__color"
        @click="selectColor(i)"
      />
    </div>

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
      shape: '',
      shapeBlur: true,
      length: '',
      lengthBlur: true,
      selectedColor: 'beige',
      shapes: [
        { label: '直发', name: 'zhifa' },
        { label: 'Body', name: 'body' },
        { label: '小卷', name: 'xiaojuan' },
        { label: 'Yaki', name: 'yaki' },
        { label: 'Bob头', name: 'bobe' }
      ],
      lengths: ['8', '10', '12', '14', '16', '18', '20', '22', '24', '26'],
      colors: [
        { color: '#EDCBB9', name: 'beige', selected: true },
        { color: '#ABD9D8', name: 'mint1', selected: false },
        { color: '#DB5593', name: 'pink1', selected: false },
        { color: '#ABD9D8', name: 'mint2', selected: false },
        { color: '#DB5593', name: 'pink2', selected: false }
      ]
      // isMounted: false,
      // url: '../assets/models/body_black_55_45cm.glb'
    };
  },
  methods: {
    validate() {
      this.shapeBlur = false;
      this.lengthBlur = false;
      if (
        this.validShape(this.shape) &&
        this.validLength(this.length)
      ) {
        this.valid = true;
      }
    },
    validShape(shape) {
      return Boolean(shape);
    },
    validLength(length) {
      return Boolean(length);
    },
    submit() {
      this.validate();
      if (this.valid) {
        this.submitted = true;
        this.handleNextClick();
      }
    },
    reset() {
      this.shape = '';
      this.length = '';
      this.selectedColor = 'beige';
    },

    // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
    selectColor(colorIndex) {
      this.colors.map((el, i) => {
        if (colorIndex === i) {
          el.selected = true;
          this.selectedColor = el.name;
        } else {
          el.selected = false;
        }
      });
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

.product {
  &__colors {

    @include font(
      --product-color-font,
      var(--font-weight--normal),
      var(--font-size--lg),
      1.6,
      var(--font-family--secondary)
    );
    display: flex;
    align-items: center;
  margin-bottom: var(--spacer-xl);

  }
  &__color-label {
    margin: 0 var(--spacer-lg) 0 0;
  }
  &__color {
    margin: 0 var(--spacer-2xs);
  }
}

</style>
