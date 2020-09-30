





export let getChinatime = (utctime) => {
    let date = typeof utctime == 'string' ? new Date(utctime) : utctime


    // if(date.getMonth()<10) date.getMonth() = `0${date.getMonth()}`
    // if(date.getDate()<10) date.getDate() = `0${date.getDate()}`
    // if(date.getHours()<10) date.getHours() = `0${date.getHours()}`
    // if(date.getMinutes()<10) date.getMinutes() = `0${date.getMinutes()}`
    // if(date.getSeconds()<10) date.getSeconds() = `0${date.getSeconds()}`

    return date.getFullYear()+'/'+(date.getMonth()+1)+'/'+date.getDate()+' '+date.getHours()+':'+date.getMinutes()+':'+date.getSeconds()
}