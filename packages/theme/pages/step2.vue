<template>
  <div id="form-step2">
    <h3 class="form__h2">Wig Specs</h3>
    <form class="form">
      <SfComponentSelect
        v-model="density"
        label="Hair Density "
        class="form__element form__element--half form__select sf-component-select--underlined"
        :required="false"
        valid
        :disabled="false"
        error-message="Please select Hair Density "
        placeholder="Please select Hair Density "
      >
        <SfComponentSelectOption
          v-for="density in densities"
          :key="density.value"
          :value="density.value"
        >
          {{ density.label }}
        </SfComponentSelectOption>
      </SfComponentSelect>
      <SfComponentSelect
        v-model="laceMaterial"
        label="Lace Material"
        class="form__element form__element--half form__element--half-even form__select sf-component-select--underlined"
        :required="false"
        valid
        :disabled="false"
        error-message="Please select Lace material."
        placeholder="Please select Lace material."
      >
        <SfComponentSelectOption
          v-for="item in laceMaterials"
          :key="item.value"
          :value="item.value"
        >
          {{ item.label }}
        </SfComponentSelectOption>
      </SfComponentSelect>

      <SfComponentSelect
        v-model="cap"
        label="Cap Construction "
        class="form__element form__element--half form__select sf-component-select--underlined"
        :required="false"
        valid
        :disabled="false"
        error-message="Please select Cap Construction "
        placeholder="Please select Cap Construction "
      >
        <SfComponentSelectOption
          v-for="item in caps"
          :key="item.value"
          :value="item.value"
        >
          {{ item.label }}
        </SfComponentSelectOption>
      </SfComponentSelect>

      <SfComponentSelect
        v-model="hairLine"
        label="Hair Line"
        class="form__element form__element--half form__element--half-even form__select sf-component-select--underlined"
        :required="false"
        valid
        :disabled="false"
        error-message="Please select HairLine"
        placeholder="Please select HairLine"
      >
        <SfComponentSelectOption
          v-for="(item, key) in hairLines"
          :key="key"
          :value="item.value"
        >
          {{ item.label }}
        </SfComponentSelectOption>
      </SfComponentSelect>

      <SfComponentSelect
        v-model="capSize"
        label="Cap Size "
        class="form__element form__element--half form__select sf-component-select--underlined"
        :required="false"
        valid
        :disabled="false"
        error-message="Please select Cap Size "
        placeholder="Please select Cap Size "
      >
        <SfComponentSelectOption
          v-for="item in capSizes"
          :key="item.value"
          :value="item.value"
        >
          {{ item.label }}
        </SfComponentSelectOption>
      </SfComponentSelect>
      <SfComponentSelect
        v-model="addElasticBand"
        label="Add Elastic Bands"
        class="form__element form__element--half form__element--half-even form__select sf-component-select--underlined"
        :required="false"
        valid
        :disabled="false"
        error-message="Please select Add Elastic Bands"
        placeholder="Please select Add Elastic Bands"
      >
        <SfComponentSelectOption
          v-for="(item, key) in addElasticBands"
          :key="key"
          :value="item.value"
        >
          {{ item.label }}
        </SfComponentSelectOption>
      </SfComponentSelect>

      <div class="form__element form__element--half" />
      <SfNotification
        :visible="Boolean(notificationVisible)"
        persistent=""
        title=""
        :message="notificationVisible"
        action=""
        type="danger"
      />
      <div class="form__action">
        <SfButton type="submit" @click.prevent="submit">Next</SfButton>
      </div>
    </form>
    <div class="pdc-pdp" v-if="isLoadervisible">
      <SfLoader class="pdc-pdp-loader" :loading="isLoadervisible">
        <div class="desc">
          please have a cup of coffee,it will be done in one or wait minutes
        </div>
      </SfLoader>
      <div class="pdc-pdp-desc">
        please have a cup of coffee,it will be done in one or wait minutes
      </div>
    </div>
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
  SfHeading,
  SfLoader,
  SfNotification,
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
    SfHeading,
    SfLoader,
    SfNotification,
    SfIcon,
    SfSidebar,
    SfImage,
  },
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  setup(props, { root }) {
    const handleNextClick = () => {
      return root.$router.push({
        path: '/model',
        query: {
          path: this.filePath,
        },
      });
    };
    return {
      handleNextClick,
    };
  },
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  data() {
    return {
      isLoadervisible: false,
      valid: false,
      submitted: false,
      notificationVisible: '',
      density: '150%',
      laceMaterial: 'normal lace',
      cap: '4 parting glueless lace front crap',
      hairLine: 'natural hair line',
      capSize: 'average',
      addElasticBand: 'no',
      densities: [
        { label: '150%', value: '150%' },
        { label: '180% +$30.00', value: '180%' },
      ],
      laceMaterials: [
        { label: 'HD Lace +$20.00', value: 'hd lace' },
        { label: 'Normal Lace', value: 'normal lace' },
      ],
      caps: [
        {
          label: '4 Parting Glueless Lace Front Crap',
          value: '4 parting glueless lace front crap',
        },
        {
          label: '6 Deep Parting Glueless Lace Front Crap +$60.00',
          value: '6 deep parting glueless lace front crap',
        },
        {
          label: 'Glueless 5*5 Closure Lace Cap +$40.00',
          value: 'glueless 5*5 closure lace cap',
        },
        { label: '13*4 Lace Cap +$60.00', value: '13*4 lace cap' },
        { label: '13*4*1 Lace Cap +$60.00', value: '13*4*1 lace cap' },
        { label: '13*6 Lace Cap +$60.00', value: '13*6 lace cap' },
      ],
      hairLines: [
        { label: 'Natural Hair Line', value: 'natural hair line' },
        { label: 'Pre-plucked HairLine', value: 'pre-plucked hair line' },
      ],
      capSizes: [
        { label: 'Average', value: 'average' },
        { label: 'Petite', value: 'petite' },
        { label: 'Large', value: 'large' },
        { label: 'Custom +$30.00', value: 'custom' },
      ],
      addElasticBands: [
        { label: 'Yes', value: 'yes' },
        { label: 'No', value: 'no' },
      ],
      // 轮询时间
      timer: null,
      // 是否执行轮训
      is2D: '',
      requestId: '',
      // 回显图片路径
      filePath: '',
      // 请求模型id
      requestId: '',
    };
  },
  watch: {
    requestId: {
      // 查看文件上传的处理状态
      handler(newVal) {
        if (newVal !== '' && this.is2D !== 'done') {
          // 实现轮询
          // this.createSetInterval();
        } else if (newVal !== '' && this.is2D === 'done') {
          this.stopSetInterval();
        }
      },
      immediate: true,
    },
  },
  methods: {
    // 开启轮询  如果存在则先销毁定时器后重新开启
    // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
    submit() {
      this.createSetInterval();
    },
    createSetInterval() {
      this.isLoadervisible = true;
      this.stopSetInterval();
      this.timer = setInterval(() => {
        this.getNewMessage();
      }, 5000);
    },
    // 关闭轮询
    // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
    stopSetInterval() {
      if (this.timer) {
        clearInterval(this.timer);
        this.timer = null;
      }
    },
    // 请求是否有新消息
    // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
    async getNewMessage() {
      await this.$axios({
        method: 'GET',
        // url: '/ama/status',
        url: '/b/default/status',
        headers: {
          'x-jizhan-request-id': this.requestId,
        },
      })
        .then(({ data }) => {
          if (data.status === 'done') {
            this.isLoadervisible = false;
            this.stopSetInterval();
            this.$router.push({
              path: '/model',
              query: {
                filePath: this.filePath,
              },
            });
          } else if (data.status === 'timeout') {
            this.notificationVisible = '处理超时，请重试';
            this.isLoadervisible = false; // 选择配置的暂时不支持，请重新配置
            this.stopSetInterval();
          } else if (data.status === 'bad') {
            this.notificationVisible = ' 选择配置的暂时不支持，请重新配置';
            this.isLoadervisible = false;
            this.stopSetInterval();
            setTimeout(() => {
              this.$router.push({
                path: '/step1',
              });
            }, 800);
          }
          this.is2D = data.status;
        })
        .catch((e) => {
          this.$router.push({
            path: '/step1',
          });
          this.notificationVisible = 'Internal Server Error';
          this.isLoadervisible = false;
          this.stopSetInterval();
        });
    },
  },
  mounted() {
    this.stopSetInterval();
    this.filePath = window.localStorage.getItem('filePath');
    this.requestId = window.localStorage.getItem('request_id');
  },
};
</script>
<style lang="scss" scoped>
@import '~@storefront-ui/vue/styles';
.cart__image {
  width: 100%;
}
.pdc-pdp {
  min-height: 93vh;
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
  .sf-loader {
    position: absolute;
    top: 0;
    left: 0;
    z-index: 1;
    .sf-loader__overlay {
      background: rgba(255, 255, 255, 0.9);
    }
  }
}
</style>
