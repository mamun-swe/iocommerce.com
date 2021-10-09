// Date formate
export const dateFormate = (date) => {
    date = new Date(date)
    const cdate = date.toDateString()
    return cdate
}