import _get from 'lodash/get';
import _isEqual from 'lodash/isEqual';
import _mapKeys from 'lodash/mapKeys';

export function createUpdateObj(data, newObj) {
    const updateObj = {};
    _mapKeys(newObj, (value, key) => {
        const oldValue = _get(data, `recipe.${key}`);
        if (!_isEqual(oldValue, value)) {
            updateObj[key] = value;
        }
    });
    5;
    return updateObj;
}
