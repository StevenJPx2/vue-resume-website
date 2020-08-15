export { default as Icon } from '../../components/Icon.vue'
export { default as TextBlock } from '../../components/TextBlock.vue'

export const LazyIcon = import('../../components/Icon.vue' /* webpackChunkName: "components/Icon'}" */).then(c => c.default || c)
export const LazyTextBlock = import('../../components/TextBlock.vue' /* webpackChunkName: "components/TextBlock'}" */).then(c => c.default || c)
