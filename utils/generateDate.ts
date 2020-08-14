import formatDistanceToNow from 'date-fns/formatDistanceToNow';

export const generateDate = (date: number | Date) => {
    return formatDistanceToNow(date, { addSuffix: true });
};
