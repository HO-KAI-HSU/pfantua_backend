import moment from 'moment'

export default {
    dateFormat(data){
        if(!data) return null;
        return moment(data).format('YYYY/MM/DD');
    }
}