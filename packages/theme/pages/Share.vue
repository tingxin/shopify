<template>
  <div>
    <div v-if="isDom" id="test" ref="bill">
      <div class="model">
        <model-viewer
          id="model"
          autoplay
          camera-controls
          field-of-view="45deg"
          interaction-prompt="none"
          ar
          ar-modes="webxr scene-viewer quick-look"
          class="model-img"
        />
      </div>
      <div class="btns">
        <SfButton class="color-primary sf-button btn" @click="htmlToCanvas">
          Share
        </SfButton>
        <div class="tilltop">分享前请选取合适的角度</div>
      </div>
    </div>
    <div v-else class="canvas-bill">
      <img :src="canvasImageUrl" alt="" />
    </div>
  </div>
</template>
<script>
// import('@google/model-viewer');
import { SfButton } from '@storefront-ui/vue';
import html2canvas from 'html2canvas';
export default {
  components: { SfButton },
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  setup(props, { root }) {
    const filePath = root.$route.query.path;
    // console.log('00', filePath);
    /** **
     * add 3d model-viewer src
     **/
    const getModleFile = () => {
      document.getElementById('model').src = filePath;
    };
    return {
      filePath,
      getModleFile
    };
  },
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  data() {
    return {
      isDom: true,
      canvasImageUrl: ''
    };
  },
  mounted() {
    import('@google/model-viewer');
    this.getModleFile();
  },
  methods: {
    /**
     * 将页面指定节点内容转为图片
     * 1.拿到想要转换为图片的内容节点DOM；
     * 2.转换，拿到转换后的canvas
     * 3.转换为图片
     */
    htmlToCanvas() {
      // console.log('bill', this.$refs.bill);
      html2canvas(this.$refs.bill).then((canvas) => {
        const imageUrl = canvas.toDataURL('image/png');
        this.canvasImageUrl = imageUrl;
        this.isDom = false;
      });
    }
  }
};
</script>

<style lang="scss" scoped>
#test {
  box-sizing: border-box;
  padding: 0 var(--spacer-sm);
  margin: var(--spacer-sm) auto;

  @include for-desktop {
    max-width: 1240px;
    padding: 0;
    display: flex;
  }
  .model {
    width: 300px;
    height: 300px;
    border: 1px solid #ccc;
    border-radius: 4px;
    &-img {
      width: 100%;
      height: 100%;
    }
  }
  .btns {
    display: flex;
    flex-direction: column;
    @include for-desktop {
      justify-content: center;
    }
    .btn {
      width: 150px;
      margin: var(--spacer-sm) 0 0;
      height: 43px;

      @include for-desktop {
        margin-left: var(--spacer-xl);
      }
    }
    .tilltop {
      @include for-desktop {
        margin: var(--spacer-sm) var(--spacer-xl);
      }
      color: red;
    }
  }
}
.canvas-bill {
  @include for-desktop {
    width: 500px;
    height: 500px;
  }
  margin: var(--spacer-sm) auto;
  width: 100%;
  height: 300px;
  img {
    width: 100%;
    height: 100%;
  }
}
</style>
