<template>
  <div>
    <div class="attendee" v-if="attendee">
      <div v-html="getInput()"></div>
      <textarea
        :input="response"
        :disabled="isDisabled"
        @change="response = $event.input"
        placeholder="Enter your response"
      ></textarea>
      <button @click="changeValue(0, response)">Submit</button>
    </div>

    <div v-else class="edit">
      <ckeditor
        :editor="mainEditor"
        :value="input.question"
        @input="changeValue(1, $event)"
        :config="config"
      ></ckeditor>
      <div class="disabled"><p>Attendee's response goes here</p></div>
    </div>
  </div>
</template>

<script>
import ClassicEditor from "@ckeditor/ckeditor5-editor-classic/src/classiceditor";

import Essentials from "@ckeditor/ckeditor5-essentials/src/essentials";
import UploadAdapter from "@ckeditor/ckeditor5-adapter-ckfinder/src/uploadadapter";
import SimpleUploadAdapter from "@ckeditor/ckeditor5-upload/src/adapters/simpleuploadadapter";
import Autoformat from "@ckeditor/ckeditor5-autoformat/src/autoformat";
import Bold from "@ckeditor/ckeditor5-basic-styles/src/bold";
import Italic from "@ckeditor/ckeditor5-basic-styles/src/italic";
import BlockQuote from "@ckeditor/ckeditor5-block-quote/src/blockquote";
import Heading from "@ckeditor/ckeditor5-heading/src/heading";
import Image from "@ckeditor/ckeditor5-image/src/image";
import ImageCaption from "@ckeditor/ckeditor5-image/src/imagecaption";
import ImageStyle from "@ckeditor/ckeditor5-image/src/imagestyle";
import ImageToolbar from "@ckeditor/ckeditor5-image/src/imagetoolbar";
import ImageUpload from "@ckeditor/ckeditor5-image/src/imageupload";
import Link from "@ckeditor/ckeditor5-link/src/link";
import List from "@ckeditor/ckeditor5-list/src/list";
import Paragraph from "@ckeditor/ckeditor5-paragraph/src/paragraph";
import Highlight from "@ckeditor/ckeditor5-highlight/src/highlight";
import MediaEmbed from "@ckeditor/ckeditor5-media-embed/src/mediaembed";

import Alignment from "@ckeditor/ckeditor5-alignment/src/alignment";

export default {
  name: "QRBox",

  model: { prop: "input", event: "change" },

  props: {
    attendee: { type: Boolean, default: false },
    input: Object,
    isResponse: { type: Boolean, default: false }
  },

  data() {
    return {
      isDisabled: false,
      mainEditor: ClassicEditor,
      config: {
        plugins: [
          Essentials,
          UploadAdapter,
          SimpleUploadAdapter,
          Autoformat,
          MediaEmbed,
          Highlight,
          Bold,
          Italic,
          BlockQuote,
          Heading,
          Image,
          ImageCaption,
          ImageStyle,
          ImageToolbar,
          ImageUpload,
          Link,
          List,
          Paragraph,
          Alignment
        ],
        toolbar: {
          items: [
            "heading",
            "|",
            "alignment", // <--- ADDED
            "bold",
            "italic",
            "highlight",
            "link",
            "blockQuote",
            "|",
            "bulletedList",
            "numberedList",
            "|",
            "mediaEmbed",
            "|",
            "undo",
            "redo"
          ]
        },
        image: {
          toolbar: [
            "imageStyle:full",
            "imageStyle:side",
            "|",
            "imageTextAlternative"
          ]
        },
        simpleUpload: {
          uploadUrl: "http://" + location.hostname + ":5000/upload_image"
        }
      }
    };
  },

  created() {
    if (this.input == null) {
      console.log("null");
    }
  },

  methods: {
    changeValue(type, val) {
      if (type == 0) {
        this.input.response = val;
        this.isDisabled = true;
        this.$emit("change", this.response);
      } else if (type == 1) {
        this.input.question = val;
        this.$emit("change", this.input);
      }
    },

    getInput() {
      if (!this.attendee) {
        this.input.question = this.input.question.replace("iframe", "oembed");
        this.input.question = this.input.question.replace("src", "url");
        this.input.question = this.input.question.replace("embed/", "watch?v=");
        this.input.question = this.input.question.replace("iframe", "oembed");
      } else {
        this.input.question = this.input.question.replace("oembed", "iframe");
        this.input.question = this.input.question.replace("url", "src");
        this.input.question = this.input.question.replace("watch?v=", "embed/");
        this.input.question = this.input.question.replace("oembed", "iframe");
      }

      return this.input.question;
    }
  }
};
</script>

<style lang="scss" scoped>
div {
  text-align: left;
  margin-bottom: 30px;
}

.disabled {
  margin: 0 auto;
  padding-left: 10px;
  margin-top: 10px;
  width: 80%;
  height: 100px;
  background-color: #eee;
  border: 1px solid grey;
  color: grey;
  border-radius: 5px;
}

.attendee {
  button {
    display: block;
    margin-top: 10px;
  }
}
</style>
