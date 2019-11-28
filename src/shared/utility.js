export const updateObject = (oldObject, updatedProperties) => {
    return {
        ...oldObject,
        ...updatedProperties
    };
};

export const checkValidity = (value, rules) => {
    let isValid = true;
    // if rules is undefined (there are no rules) return true - fixes error for no rules
    if (!rules) { 
        return true;
    }
    // if an input is required and it is not blank, then isValid = true
    if (rules.required) { // trim removes leading and trailing whitespace
        isValid = value.trim() !== '' && isValid;
    }
    // if an input has a min length rule, isValid is true if the input is longer or equal to the minimum required and it is already valid
    if (rules.minLength) {
        isValid = value.length >= rules.minLength && isValid;
    }
    // if an input has a max length rule, isValid is true if the input is shorter or equal to the maximum required and it is already valid
    if (rules.maxLength) {
        isValid = value.length <= rules.maxLength && isValid;
    }

    return isValid;
};