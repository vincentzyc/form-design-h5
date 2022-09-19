import { shallowMount } from '@vue/test-utils'
import HelloWorld from '@/components/HelloWorld.vue'

describe('HelloWorld.vue', () => {
  it('renders props.msg when passed', async () => {
    const msg = 'new message'
    const wrapper = shallowMount(HelloWorld, {
      propsData: { msg }
    })
    expect(wrapper.text()).toMatch(msg)
    expect(wrapper.html()).toContain('<span class="count">0</span>')
    expect(wrapper.text()).toContain('0')
    const button = wrapper.find('button')
    await button.trigger('click')
    expect(wrapper.text()).toContain('1')
  })
})
