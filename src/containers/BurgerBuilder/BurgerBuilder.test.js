import React from 'react';
import {configure, shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

// this allows us to test the BurgerBuilder class without the connect and redux stuff
import {BurgerBuilder} from './BurgerBuilder';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';

configure({adapter: new Adapter});

describe('<BurgerBuilder />', () => {
    let wrapper;

    beforeEach(() => {
        wrapper = shallow(<BurgerBuilder onInitIngredients={() => {}} />);
    });

    it('should render <BuildControls /> when receiving ingredients', () => {
        wrapper.setProps({ingrs: {salad: 1}});
        expect(wrapper.find(BuildControls)).toHaveLength(1);
    });
});