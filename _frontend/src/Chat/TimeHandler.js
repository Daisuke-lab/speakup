export default function time_handler(props) {
    var event = new Date();
    let [cur_date, cur_time] = event.toLocaleString('en-GB', { timeZone: 'Europe/London' }).split(',')
    let [cur_day, cur_month, cur_year] = cur_date.split('/')
    let [cur_hour, cur_minute, cur_sec] = cur_time.split(':')
    
    if (props !== 'Start now') {
        const [date, time] = props.split('T')
        let [last_year, last_month, last_day] = date.split('-')
        let [last_hour, last_minute, last_sec] = time.split(':')
        let time_list = [cur_day, cur_month, cur_year, cur_hour, cur_minute, last_year, last_month, last_day, last_hour, last_minute]
        var i
        for (i = 0; i < time_list.length; i++) {
            time_list[i] = parseInt(time_list[i])
        }
        [cur_day, cur_month, cur_year, cur_hour, cur_minute, last_year, last_month, last_day, last_hour, last_minute] = time_list
        if (cur_year !== last_year) {
            if (cur_year - last_year === 1) {
                return JSON.stringify(cur_year - last_year) + 'year ago'
            } else {
                return JSON.stringify(cur_year - last_year) + 'years ago'
            }
        }
        if (cur_month !== last_month) {
            if (cur_month - last_month === 1) {
                return JSON.stringify(cur_month - last_month) + 'month ago'
            } else {
                return JSON.stringify(cur_month - last_month) + 'months ago'
            }
        }
        if (cur_day !== last_day) {
            if (cur_day - last_day === 1) {
                return JSON.stringify(cur_day - last_day) + 'day ago'
            } else {
                return JSON.stringify(cur_day - last_day) + 'days ago'
            }
        }
        if (cur_hour !== last_hour) {
            if (cur_hour - last_hour === 1) {
                return JSON.stringify(cur_hour - last_hour) + 'hour ago'
            } else {
                return JSON.stringify(cur_hour - last_hour) + 'hours ago'
            }
        }
        if (cur_minute !== last_minute) {
            if (cur_minute - last_minute === 1) {
                return JSON.stringify(cur_minute - last_minute) + 'minute ago'
            } else {
                return JSON.stringify(cur_minute - last_minute) + 'minutes ago'
            }
        } else {
            return '0 minute ago'
        }
    } else {
        return ''
    }

}


export function time_orderer(files, messages) {
    const all_contents = files.concat(messages)
    all_contents.sort(function (a, b) {
        const a_date = new Date(a.timestamp.replace(' ', 'T'))
        const b_date = new Date(b.timestamp.replace(' ', 'T'))

        return a_date - b_date;
      });
    
    return all_contents
}

