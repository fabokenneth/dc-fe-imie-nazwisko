import {mount, VueWrapper} from '@vue/test-utils'
import LanguagePicker from '../../../src/components/LanguagePicker.vue'
import {createI18n} from "vue-i18n";
import {DOMWrapper} from "@vue/test-utils/dist/domWrapper";

describe('LanguagePicker', () => {
    it('should display the three languages properly', async () => {
        const i18n = createI18n({
            locale: "en"
        })
        const wrapper = mount(LanguagePicker, {
            global: {
                plugins: [i18n]
            }
        })

        let dropdownButton = wrapper.find("button");
        expect(dropdownButton.text()).toEqual("English")
        expect(wrapper.find("[data-test-id='dropdown-menu-items']").exists()).toBeFalsy()

        let entries = await assertLanguagesOptionDisplayed(wrapper, dropdownButton)

        await entries[1].trigger("click")
        dropdownButton = wrapper.find("button");
        expect(dropdownButton.text()).toEqual("Francais")
        expect(wrapper.find("[data-test-id='dropdown-menu-items']").exists()).toBeFalsy()

        entries = await assertLanguagesOptionDisplayed(wrapper, dropdownButton)
        await entries[2].trigger("click")

        dropdownButton = wrapper.find("button");
        expect(dropdownButton.text()).toEqual("Deutsch")
        expect(wrapper.find("[data-test-id='dropdown-menu-items']").exists()).toBeFalsy()
        await assertLanguagesOptionDisplayed(wrapper, dropdownButton)
    })

    const assertLanguagesOptionDisplayed = async (wrapper: VueWrapper<any>, dropdownButton: DOMWrapper<any>): Promise<DOMWrapper<any>[]> => {
        await dropdownButton.trigger("click");
        expect(wrapper.find("[data-test-id='dropdown-menu-items']").exists()).toBeTruthy()
        expect(wrapper.find("[data-test-id='dropdown-menu-items'] div").isVisible()).toBeTruthy()
        let entries = wrapper.findAll("[data-test-id='dropdown-menu-items'] div");
        expect(entries.length).toEqual(3);
        expect(entries[0].text()).toEqual("English")
        expect(entries[1].text()).toEqual("Francais")
        expect(entries[2].text()).toEqual("Deutsch")
        return entries
    }
})
