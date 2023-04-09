import moment from "moment"


export const getArgentinaTimeZoneDate = (date: Date, format: string) => {
    const momentDate = moment(date)
    return momentDate.utcOffset(-180).format(format) // GMT-3
}