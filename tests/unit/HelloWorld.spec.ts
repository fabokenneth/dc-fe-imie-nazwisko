import { mount } from '@vue/test-utils'
import { useI18n } from 'vue-i18n'
import HelloWorld from '../../src/components/HelloWorld.vue'

jest.mock('vue-i18n')

const mockedUseI18n = useI18n as jest.Mock

mockedUseI18n.mockImplementation(() => {
  return {
    t: jest.fn(),
  }
})

describe('HelloWorld', () => {
  it('should display header text', () => {
    const msg = 'Hello Vue 3'
    const wrapper = mount(HelloWorld, { props: { msg } })

    expect(wrapper.find('h1').text()).toEqual(msg)
  })
})
