import _isNil from 'lodash/isNil';

export const verifyNotABannedMutation = async (req, res) => {
    const isBannedMutaion = req.body.query.match(/deleteMany|updateMany|upsert/g);
    if (!_isNil(isBannedMutaion)) {
        throw new Error('Invalid Mutation Requested');
    }
};
