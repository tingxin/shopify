<template>
  <div id="form-step2">
    <form class="form">
      <SfInput
        v-model="headSize"
        label="头围"
        name="headSize"
        class="form__element form__element--half"
        required
        :valid="headSizeBlur || validHeadSize(headSize)"
        error-message="Please type your head size"
        @blur="headSizeBlur = false"
      />
<!-- <div class="form__element form__element--half"/> -->
      <SfComponentSelect
        v-model="craft"
        label="工艺"
        class="
          form__element
          form__element--half
          form__element--half-even
          form__select
          sf-component-select--underlined
        "
        required
        :valid="craftBlur || validCraft(craft)"
        error-message="Please choose your craft."
        @blur="craftBlur = false"
      >
        <SfComponentSelectOption
          v-for="craftOption in countries"
          :key="craftOption"
          :value="craftOption"
        >
          {{ craftOption }}
        </SfComponentSelectOption>
      </SfComponentSelect>
      <!-- <div class="form__element form__element--half"/> -->
      <SfComponentSelect
        v-model="density"
        label="密度"
        class="
          form__element
          form__element--half
          form__select
          sf-component-select--underlined
        "
        required
        :valid="densityBlur || validDensity(density)"
        error-message="Please choose density."
        @blur="densityBlur = false"
      >
        <SfComponentSelectOption
          v-for="density in densities"
          :key="density"
          :value="density"
        >
          {{ density }}
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
import {
  SfInput,
  SfComponentSelect,
  SfButton,
  SfHeading
} from '@storefront-ui/vue';
export default {
  name: 'Default',
  components: {
    SfButton,
    SfInput,
    SfComponentSelect,
    SfHeading
  },
  data() {
    return {
      valid: false,
      submitted: false,
      headSize: '',
      headSizeBlur: true,

      state: '',
      stateBlur: true,
      craft: '',
      craftBlur: true,
      density: '',
      densityBlur: true,
      countries: [
        'T型蕾丝',
        '4*4',
        '13*4',
        '16*16'
      ],
      densities: ['150%', '180%']

    };
  },
  methods: {
    validate() {
      this.headSizeBlur = false;
      this.craftBlur = false;
      if (
        this.validHeadSize(this.headSize) &&
        this.validCraft(this.craft) &&
        this.validDensity(this.density)
      ) {
        this.valid = true;
      }
    },
    validHeadSize(headSize) {
      return headSize.length > 0;
    },
    validCraft(craft) {
      return Boolean(craft);
    },
    validDensity(density) {
      return Boolean(density);
    },
    submit() {
      this.validate();
      if (this.valid) {
        this.submitted = true;
      }
    },
    reset() {
      this.craft = '';
      this.headSize = '';
      this.density = '';
    }
  }
};
</script>
<style lang="scss" scoped>
@import "~@storefront-ui/vue/styles";
#form-step2 {
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
