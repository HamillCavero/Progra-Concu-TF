export default {
  props: ["files", "active", "mode", "refresh", "theme"],

  data() {
    return {
      editor: null,
      echo: true,
    };
  },

    template: `
    <main class="w-100 overflow-hidden">

        <section id="editor">
            <textarea id="code"></textarea>
        </section>
    </main>
    `,

  mounted() {
    const textarea = document.querySelector("#code");

    this.editor = CodeMirror.fromTextArea(textarea, {
      // mode: "text/x-jssrc",
      lineWrapping: true,
      // mode: "javascript",
      mode: "text/x-c++src",
      theme: this.theme,
      tabSize: 2,
      lineNumbers: true,
      indentWithTabs: true,
    });

    this.editor.on("change", (e) => {
      this.$emit("cursor", this.editor.getCursor());
      if (this.echo) {
        this.$emit("edit", this.editor.getValue());
      }
      this.echo = true;
    });
  },

  methods: {
    openFile(index) {
      this.$emit("openFile", index);
    },
  },

  watch: {
    active() {
      let cursorPosition = this.editor.getCursor();
      this.editor.setValue(this.files[this.active].content);
      this.editor.setCursor(cursorPosition);
    },
    mode() {
      this.editor.setOption("mode", this.mode);
    },
    files() {
      this.echo = false;
      let cursorPosition = this.editor.getCursor();
      this.editor.setValue(this.files[this.active].content);
      this.editor.setCursor(cursorPosition);
    },
    refresh() {
      this.editor.refresh();
      this.editor.focus();
    },
    theme() {
      this.editor.setOption("theme", this.theme);
    },
  },
};
