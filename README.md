# Label Designer

This Angular library enables users to design their own printable labels.
Visuals and the fields for the label can be defined by the users.
This was developed natural history museum specimen data in mind, but nothing prevents
it from being used for other kinds of labels also.

![editor](https://cdn.laji.fi/label-designer/screenshots/editor.png)

## Framework Support

- **Angular**: Original implementation (see [Angular usage guide](https://luomus.github.io/label-designer/additional-documentation/usage/angular-component.html))
- **Vue.js**: Vue.js wrapper available in `/vue-wrapper` directory
- **Web Components**: Custom element support (see [Custom element guide](https://luomus.github.io/label-designer/additional-documentation/usage/custom-html-element.html))
- **Standalone**: Standalone application (see [Standalone guide](https://luomus.github.io/label-designer/additional-documentation/usage/standalone-app.html))

## Demo
Running demo can be found [here](https://stackblitz.com/edit/label-designer).

## Getting started
There are several ways you can use this library:
1. [Angular library](https://luomus.github.io/label-designer/additional-documentation/usage/angular-component.html)
2. [Vue.js wrapper](./vue-wrapper/README.md) - **NEW!**
3. [Custom element](https://luomus.github.io/label-designer/additional-documentation/usage/custom-html-element.html)
4. [Standalone application](https://luomus.github.io/label-designer/additional-documentation/usage/standalone-app.html)

### Vue.js Quick Start

```bash
# Install the Vue.js wrapper
npm install @label-designer/vue-wrapper

# Or use the local wrapper
cd vue-wrapper && npm install && npm run build
```

```vue
<template>
  <LabelDesigner
    :setup="setup"
    :data="data"
    :available-fields="availableFields"
    @setup-change="handleSetupChange"
  />
</template>

<script setup>
import LabelDesigner from '@label-designer/vue-wrapper'
// Your Vue.js component code
</script>
```

See the [Vue.js wrapper documentation](./vue-wrapper/README.md) for detailed usage instructions.

# Documentation

Read the online documentation [here](https://luomus.github.io/label-designer).

## Contributing
Development is a community effort, and we encourage participation. Please read the [contribution guide](https://luomus.github.io/label-designer/additional-documentation/contributing.html) for details.

Please note that the 'label-designer' project is released with a [Contributor Code of Conduct](https://luomus.github.io/label-designer/additional-documentation/contributor-code-of-conduct.html). By contributing to this project, you agree to abide by its terms.
