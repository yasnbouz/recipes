import _isNil from 'lodash/isNil';
import _get from 'lodash/get';
import { getUserObject } from './getUserObject';
import auth0 from 'lib/auth0';

export const verifyNotABannedMutation = async (req, res) => {
    const isBannedMutaion = req.body.query.match(/deleteMany|updateMany|upsert/g);
    if (!_isNil(isBannedMutaion)) {
        throw new Error('Invalid Mutation Requested');
    }
};

export const verifyUserMatches = async (req, res) => {
    const requestedUserID: string = getUserObject(req.body.variables);
    if (!_isNil(requestedUserID)) {
        const { user } = await auth0.getSession(req);
        const actualUserID: string = _get(user, 'sub');
        if (actualUserID !== requestedUserID) {
            throw new Error('Invalid User Requested');
        }
    }
};
