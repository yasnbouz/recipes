import moment from 'moment';

export const generateDate = (date: string) => {
    return moment(date).calendar(null, {
        sameDay: '[Today]',
        nextDay: '[Tomorrow]',
        nextWeek: 'dddd',
        lastDay: '[Yesterday]',
        lastWeek: '[Last] dddd',
        sameElse: 'D/MMMM/YYYY',
    });
};
