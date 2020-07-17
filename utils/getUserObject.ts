import _isArray from 'lodash/isArray';
import _isObject from 'lodash/isObject';

export const getUserObject = (currentItem) => {
    let result = null;
    if (_isArray(currentItem)) {
        for (const item of currentItem) {
            result = getUserObject(item);
            if (result) break;
        }
    } else {
        for (const prop in currentItem) {
            if (prop === 'user') return currentItem.user;
            else if (prop === 'owner') return currentItem.owner;
            if (_isArray(currentItem[prop]) || _isObject(currentItem[prop])) {
                result = getUserObject(currentItem[prop]);
                if (result) break;
            }
        }
    }

    return result;
};
