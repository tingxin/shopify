<template name="Cropper">
  <div id="cropper">
    <div class="model" v-show="model" @click="model = false">
      <div class="model-show">
        <img :src="modelSrc" alt="" />
      </div>
    </div>
    <div class="cut">
      <vue-cropper
        ref="cropper"
        :img="option.img"
        :output-size="option.size"
        :output-type="option.outputType"
        :info="true"
        :full="option.full"
        :fixed="fixed"
        :fixed-number="fixedNumber"
        :can-move="option.canMove"
        :can-move-box="option.canMoveBox"
        :fixed-box="option.fixedBox"
        :original="option.original"
        :auto-crop="option.autoCrop"
        :auto-crop-width="option.autoCropWidth"
        :auto-crop-height="option.autoCropHeight"
        :center-box="option.centerBox"
        @real-time="realTime"
        :high="option.high"
        @img-load="imgLoad"
        mode="cover"
        :max-img-size="option.max"
        @crop-moving="cropMoving"
      ></vue-cropper>
    </div>

    <div class="test-button">
      <label class="upload btn" for="uploads">upload</label>
      <input
        type="file"
        id="uploads"
        style="position: absolute; clip: rect(0 0 0 0)"
        accept="image/png, image/jpeg, image/gif, image/jpg"
        @change="uploadImg($event, 1)"
      />
      <SfButton class="color-primary sf-button btn" @click="clearCrop"
        >clear
      </SfButton>
      <SfButton class="color-primary sf-button btn" @click="refreshCrop">
        refresh
      </SfButton>
      <SfButton class="color-primary sf-button btn" @click="down('blob')">
        next
      </SfButton>
    </div>
  </div>
</template>
<script>
import { SfButton } from '@storefront-ui/vue';
import { compress, compressAccurately } from 'image-conversion';

export default {
  name: 'Cropper',
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  setup(props, { root }) {
    const handleNextClick = () => {
      return root.$router.push('/step1');
    };
    return {
      handleNextClick,
    };
  },
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  data() {
    return {
      model: false,
      modelSrc: '',
      crap: false,
      previews: {},
      lists: [
        {
          img: 'https://avatars2.githubusercontent.com/u/15681693?s=460&v=4',
        },
      ],
      option: {
        img: 'https://avatars2.githubusercontent.com/u/15681693?s=460&v=4',
        size: 1,
        full: false,
        outputType: 'png',
        name: 'demo.png',
        canMove: true,
        fixedBox: false,
        original: false,
        canMoveBox: true,
        autoCrop: true,
        // 只有自动截图开启 宽度高度才生效
        autoCropWidth: 400,
        autoCropHeight: 300,
        centerBox: false,
        high: true,
        max: 99999,
      },
      show: true,
      fixed: true,
      fixedNumber: [3, 4],
      // 回显图片路径
      path: '',
      // //是否回显
      // isShow:false
    };
  },
  components: { SfButton },

  methods: {
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

    // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
    clearCrop() {
      // clear
      this.$refs.cropper.clearCrop();
    },
    // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
    refreshCrop() {
      // clear
      this.$refs.cropper.refresh();
    },
    // 实时预览函数
    // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
    realTime(data) {
      this.previews = data;
    },

    // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
    down(type) {
      event.preventDefault();
      // 输出;
      if (type === 'blob') {
        this.$refs.cropper.getCropBlob((data) => {
          const isJpgOrPng =
            data.type == 'image/jpeg' || data.type == 'image/png';
          const isLt2M = data.size / 1024 / 1024 < 2;
          if (!isJpgOrPng) {
            // this.$message.error('上传头像图片只能是 JPG 或 PNG 格式!');
            return false;
          }
          if (!isLt2M) {
            // this.$message.error('上传头像图片大小不能超过 2MB!');
            return false;
          }
          return new Promise((resolve) => {
            compressAccurately(data, {
              with: 640,
              height: 480,
            }).then((res) => {
              this.$refs.cropper.getCropData((res) => {
                this.downImg = res;
                const newData = res.split('base64,')[1];
                const info = {
                  name: this.option.name,
                  data: newData,
                };
                this.$store.dispatch('addForm', info);
                this.handleNextClick();
              });
              resolve(res);
            });
          });
          // this.downImg = window.URL.createObjectURL(data);
        });
      } else {
        this.$refs.cropper.getCropData((data) => {
          this.downImg = data;
          const newData = data.split('base64,')[1];
          const info = {
            name: this.option.name,
            data: newData,
          };
          this.$store.dispatch('addForm', info);
          this.handleNextClick();
        });
      }
    },

    // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
    uploadImg(e, num) {
      // 上传图片
      // this.option.img
      const file = e.target.files[0];
      if (!/\.(gif|jpg|jpeg|png|bmp|GIF|JPG|PNG)$/.test(e.target.value)) {
        return false;
      }
      const reader = new FileReader();
      reader.onload = (e) => {
        let data;
        if (typeof e.target.result === 'object') {
          // 把Array Buffer转化为blob 如果是base64不需要
          const blob = new Blob([e.target.result]);
          data = window.URL.createObjectURL(blob);
          // const file = new File([blob], '');
        } else {
          data = e.target.result;
        }
        if (num === 1) {
          this.option.img = data;
          this.option.name = file.name;
          this.option.outputType = file.name.split('/')[1];
        } else if (num === 2) {
          this.example2.img = data;
        }
      };
      // 转化为base64
      // reader.readAsDataURL(file)
      // 转化为blob
      reader.readAsArrayBuffer(file);
    },
    // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
    imgLoad(msg) {
      console.log(msg);
    },
    // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
    cropMoving(data) {
      console.log(data, '截图框当前坐标');
    },
  },
};
</script>
<style lang="scss" scoped>
#cropper {
  box-sizing: border-box;
  @include for-desktop {
    max-width: 1272px;
    padding: 0 var(--spacer-sm);
    margin: 0 auto;
    // display: flex;
  }
  .cut {
    margin: 30px auto;
    width: 100%;
    height: 20rem;
    @include for-desktop {
      width: 500px;
      height: 500px;
    }
  }

  .model {
    position: fixed;
    z-index: 10;
    width: 100vw;
    height: 100vh;
    overflow: auto;
    top: 0;
    left: 0;
    background: rgba(0, 0, 0, 0.8);
  }

  .model-show {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100vw;
    height: 100vh;
  }

  .model img {
    display: block;
    margin: auto;
    max-width: 80%;
    user-select: none;
    background-position: 0px 0px, 10px 10px;
    background-size: 20px 20px;
    background-image: linear-gradient(
        45deg,
        #eee 25%,
        transparent 25%,
        transparent 75%,
        #eee 75%,
        #eee 100%
      ),
      linear-gradient(
        45deg,
        #eee 25%,
        white 25%,
        white 75%,
        #eee 75%,
        #eee 100%
      );
  }
  .test-button {
    display: flex;
    flex-wrap: wrap;
    @include for-desktop {
      width: 100%;
      justify-content: center;
    }
  }
  .upload {
    background: var(--c-primary);

    color: var(--c-light-variant);
    font: var(
      --button-font,
      var(--button-font-weight, var(--font-weight--semibold))
        var(--button-font-size, var(--font-size--base)) /
        var(--button-font-line-height, 1.2)
        var(--button-font-family, var(--font-family--secondary))
    );
    line-height: 2.7rem;
    text-align: center;
    @include for-desktop {
      line-height: 43px;
      margin: 0 var(--spacer-sm) var(--spacer-sm);
      padding: var(--button-padding, 0 var(--spacer-base));
    }
  }
  .btn {
    width: var(--spacer-2sm);
    margin: 0 var(--spacer-sm) var(--spacer-sm);
    height: 43px;

    @include for-mobile {
      flex: 0 0 40%;
      height: 2.7rem;
    }
  }
}
</style>
