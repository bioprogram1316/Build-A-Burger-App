import React from 'react';
import {configure, shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import NavigationItems from './NavigationItems';
import NavigationItem from './NavigationItem/NavigationItem';

// connects our test with enzyme
configure({adapter: new Adapter()});

// describe takes two arguments, a decription of the test and the test function
describe('<NavigationItems />', () => {
    let wrapper;

    // beforeEach gets executed before wach test
    beforeEach(() => {
        // shallow renders only the tested component and placeholders for subcomponents, not the full subcomponents
        wrapper = shallow(<NavigationItems />);
    });

    // it allows you to write one individual test
    // each test runs independent of the others
    it('should render two <NavigationItem /> elements if not authenticated', () => {
        // now we write our expectation from this test
        expect(wrapper.find(NavigationItem)).toHaveLength(2); // we want to find 2 NavigationItem subcomponents
    });

    it('should render three <NavigationItem /> elements if authenticated', () => {
        //wrapper = shallow(<NavigationItems isAuthenticated />);
        wrapper.setProps({isAuthenticated: true});
        // now we write our expectation from this test
        expect(wrapper.find(NavigationItem)).toHaveLength(3); // we want to find 3 NavigationItem subcomponents
    });

    it('should an exact logout button', () => {
        wrapper.setProps({isAuthenticated: true});
        // now we write our expectation from this test
        expect(wrapper.contains(<NavigationItem link="/logout">Log Out</NavigationItem>)).toEqual(true); // we want to find the Log Out NavigationItem subcomponent
    });
});