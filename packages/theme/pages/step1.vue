<template>
  <div id="form-step1">
    <SfNotification
      :visible="Boolean(notificationVisible)"
      persistent=""
      title=""
      :message="notificationVisible"
      action=""
      type="danger"
    />

    <form class="form">
      <h3 class="form__element form__h2">
        Wig Specs
        <SfButton
          class="sf-button--pure sf-header__action info_circle——button"
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
          :headingLevel="3"
          button
          :visible="sidebarVisible"
          overlay
          persistent
          @close="sidebarClose"
        >
          <img alt="Empty bag" class="cart__image" src="WechatIMG68.jpeg" />
        </SfSidebar>
      </h3>

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
      <SfComponentSelect
        v-model="density"
        label="Hair Density "
        class="form__element form__element--half form__element--half-even form__select sf-component-select--underlined"
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
        class="form__element form__element--half form__select sf-component-select--underlined"
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
        class="form__element form__element--half form__element--half-even form__select sf-component-select--underlined"
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
        class="form__element form__element--half form__select sf-component-select--underlined"
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
        class="form__element form__element--half form__element--half-even form__select sf-component-select--underlined"
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
        class="form__element form__element--half form__select sf-component-select--underlined"
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

      <div class="form__action">
        <SfButton type="submit" @click.prevent="submit">Next</SfButton>
      </div>
    </form>
    <SfLoader
      v-if="isLoadervisible"
      class="pdc-pdp-loader"
      :loading="isLoadervisible"
    >
      <div />
    </SfLoader>
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
      sidebarVisible: false,
      notificationVisible: '',
      // 款式
      length: '16inch',
      color: 'black',
      density: '150%',
      laceMaterial: 'normalLace',
      cap: '4',
      hairLine: 'naturalHairLine',
      capSize: 'average',
      addElasticBand: 'no',
      style: 'jc',
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
      colors: [
        { color: 'black', name: 'Black' },
        { color: 'wineRed', name: 'Wine Red+¥50.00' },
        { color: 'darkPurple', name: 'Dark Purple+¥50.00' },
        { color: 'blue', name: 'Blue+¥50.00' },
        { color: 'platinumBlonde', name: 'Platinum Blonde+¥50.00' },
      ],

      densities: [
        { label: '150%', value: '150%' },
        { label: '180% +$30.00', value: '180%' },
      ],
      laceMaterials: [
        { label: 'HD Lace +$20.00', value: 'hdLace' },
        { label: 'Normal Lace', value: 'normalLace' },
      ],
      caps: [
        { label: '4 Parting Glueless Lace Front Crap', value: '4' },
        {
          label: '6 Deep Parting Glueless Lace Front Crap +$60.00 GlueLess',
          value: '6',
        },
        { label: '5 * 5 Closure Lace Cap +$40.00', value: '5' },
      ],
      hairLines: [
        { label: 'Natural Hair Line', value: 'naturalHairLine' },
        { label: 'Pre-plucked HairLine', value: 'prePluckedHairLine' },
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
      styles: [
        { label: 'JC', value: 'jc' },
        { label: 'ST', value: 'st' },
        { label: 'Body', value: 'body' },
        { label: 'Curls', value: 'curls' },
        { label: 'Yaki', value: 'yaki' },
        { label: 'Bob', value: 'bob' },
      ],
      // 轮询时间
      timer: null,
      // 是否执行轮训
      is2D: '',
      requestId: '',
      // 回显图片路径
      filePath: '',
    };
  },
  watch: {
    requestId: {
      // 查看文件上传的处理状态
      handler(newVal) {
        if (newVal !== '' && this.is2D !== 'done') {
          // 实现轮询
          this.createSetInterval();
        } else if (newVal !== '' && this.is2D === 'done') {
          this.stopSetInterval();
        }
      },
      immediate: true,
    },
  },
  methods: {
    handleSidebar() {
      this.sidebarVisible = true;
    },
    sidebarClose() {
      this.sidebarVisible = false;
    },
    async submit() {
      const params = [
        // 'jc',
        // this.color,
        // this.density,
        // this.length,
        this.style,
        this.color,
        this.length,
        this.density,
        this.laceMaterial,
        this.cap,
        this.hairLine,
        this.capSize,
        this.addElasticBand,
      ];

      const data = {
        ...this.$store.state.form,
        params,
      };
      this.$store.dispatch('addForm', data);
      this.submitted = true;
      this.isLoadervisible = true;
      // this.getNewMessage();
      // 获取远端图片
      this.notificationVisible = '';
      await this.$axios({
        method: 'POST',
        // url: '/ama/profile',
        url: '/b/default/profile',
        data: JSON.stringify(data),
      }).then(({ data }) => {
        this.requestId = data.request_id;
        this.filePath = data.file_path;
      });
    },
    // reset() {
    //   this.style = '';
    //   this.length = '';
    //   this.color = '';
    //   this.density = '';
    //   this.laceMaterial = '';
    // }
    // 开启轮询  如果存在则先销毁定时器后重新开启
    // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
    createSetInterval() {
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
      }).then(({ data }) => {
        if (data.status === 'done') {
          this.isLoadervisible = false;
          this.stopSetInterval();
          this.$router.push({
            path: '/model',
            query: {
              path: this.filePath,
            },
          });
        } else if (data.status == 'timeout') {
          this.notificationVisible = '处理超时，请重试';
          this.isLoadervisible = false; //选择配置的暂时不支持，请重新配置
          this.stopSetInterval();
        } else if (data.status == 'bad') {
          this.notificationVisible = ' 选择配置的暂时不支持，请重新配置';
          this.isLoadervisible = false;
          this.stopSetInterval();
        }
        this.is2D = data.status;
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
.pdc-pdp-loader {
  max-height: 90vh;
  // width: 100%;
  /* padding: 100px 0; */
  position: absolute;
  top: 0;
  left: 0;
  @include for-mobile {
    min-height: 154vh;
  }
  .sf-loader__overlay {
    background: rgba(0, 0, 0, 0.2);
  }
}
.info_circle——button {
  display: inline-block;
  // padding-top: var(--spacer-sm);
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
