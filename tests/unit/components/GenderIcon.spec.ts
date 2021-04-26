import {mount} from '@vue/test-utils'
import GenderIcon from '../../../src/components/GenderIcon.vue'
import {Gender} from "../../../src/types/CharactersType.interface";

describe('Gender', () => {
    it('Female Icon', () => {
        const wrapper = mount(
            GenderIcon,
            {
                props: {
                    type: Gender.Female
                }
            }
        )

        expect(wrapper.findAll("[data-test-id='Female']").length).toEqual(1)
        expect(wrapper.find("[data-test-id='Female']").exists()).toBeTruthy()
    }),
        it('Male Icon', () => {
            const wrapper = mount(
                GenderIcon,
                {
                    props: {
                        type: Gender.Male
                    }
                }
            )

            expect(wrapper.findAll("[data-test-id='Male']").length).toEqual(1)
            expect(wrapper.find("[data-test-id='Male']").exists()).toBeTruthy()
        }),
        it('Genderless Icon', () => {
            const wrapper = mount(
                GenderIcon,
                {
                    props: {
                        type: Gender.Genderless
                    }
                }
            )

            expect(wrapper.findAll("[data-test-id='Genderless']").length).toEqual(1)
            expect(wrapper.find("[data-test-id='Genderless']").exists()).toBeTruthy()
        }),
        it('Gender Unknown Icon', () => {
            const wrapper = mount(
                GenderIcon,
                {
                    props: {
                        type: Gender.unknown
                    }
                }
            )

            expect(wrapper.findAll("[data-test-id='unknown']").length).toEqual(1)
            expect(wrapper.find("[data-test-id='unknown']").exists()).toBeTruthy()
        })
})
