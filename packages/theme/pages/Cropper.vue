<template name="Cropper">
  <div>
    <div id="cropper">
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
          :high="option.high"
          mode="cover"
          :max-img-size="option.max"
          @real-time="realTime"
          @img-load="imgLoad"
          @crop-moving="cropMoving"
        ></vue-cropper>
      </div>
      <div
        :style="{
          width: previews.w + 'px',
          height: previews.h + 'px',
          overflow: 'hidden',
          margin: '30px',
        }"
      >
        <div :style="previews.div">
          <!-- <img :src="previews.url" :style="previews.img" /> -->
          <img :style="previews.img" src="mark.jpeg" alt="" />
        </div>
      </div>
    </div>
    <div class="cropper-desc">
      Please upload a frontal face photo that matches the contour of the
      reference image we provide
    </div>
    <div class="test-button">
      <label class="upload btn" for="uploads">UPLOAD</label>
      <input
        id="uploads"
        type="file"
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
  components: { SfButton },
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
          img: 'mark.jpeg',
        },
      ],
      option: {
        img: 'mark.jpeg',
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
        autoCropWidth: 480,
        autoCropHeight: 640,
        centerBox: false,
        high: true,
        max: 99999,
      },
      show: true,
      fixed: true,
      fixedNumber: [3, 4],
    };
  },

  methods: {
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
            data.type === 'image/jpeg' || data.type === 'image/png';
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
              with: 480,
              height: 640,
            }).then((res) => {
              this.$refs.cropper.getCropData((res) => {
                this.downImg = res;
                const newData = res.split('base64,')[1];
                const info = {
                  name: this.option.name,
                  data: newData,
                };
                window.localStorage.setItem('info', JSON.stringify(info));
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
      // console.log(msg);
    },
    // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
    cropMoving(data) {
      // console.log(data, "截图框当前坐标");
    },
  },
};
</script>
<style lang="scss" scoped>
#cropper {
  box-sizing: border-box;
  @include for-desktop {
    display: flex;
    justify-content: center;
    max-width: 1272px;
    padding: 0 var(--spacer-sm);
    margin: 0 auto;
  }
  .cut {
    margin: 30px auto;
    width: 100%;
    height: 20rem;
    @include for-desktop {
      margin: 30px 0;
      width: 420px;
      height: 480px;
    }
  }
}
.test-button {
  display: flex;
  flex-wrap: wrap;
  @include for-desktop {
    width: 100%;
    justify-content: center;
  }
}
.img-mark {
  width: 100%;
  height: 100%;
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
.cropper-desc {
  margin: var(--spacer-sm) var(--spacer-sm);
  font-size: 2rem;
  color: red;
  @include for-desktop {
    margin: var(--spacer-sm) 0;
    font-size: 18px;
    text-align: center;
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
</style>
