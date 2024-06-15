import auth from "./authGoogleCalendar.js";
import axios from 'axios';
import auxFunc from '../auxiliaryFunctions/auxFunc.js';
import credenciaisGoogle from '../../credenciaisGoogle.js'
import elapseditemBitrix24 from "../bitrix24/elapseditem.js";

async function GetCalendar() {

    const year = 2024;
    const month = 5;
    const day = 14;
    const dateTimeNow = auxFunc.TimeDateNow(year, month, day);

    console.log(auxFunc.TimeDateDayStart(year, month, day))
    console.log(auxFunc.TimeDateDayEnd(year, month, day))

    const googleCalendar = await auth.GoogleCalendar();
    //console.log(googleCalendar);

    const calendarId = credenciaisGoogle.calendar[0];

    const GetCalendar = await axios({
        method: 'get',
        url: `https://www.googleapis.com/calendar/v3/calendars/${calendarId}/events`,
        params: {
            timeMin: auxFunc.TimeDateDayStart(year, month, day),
            timeMax: auxFunc.TimeDateDayEnd(year, month, day),
            orderBy: 'startTime',
            singleEvents: 'true'
        },
        headers: {
            Authorization: `${googleCalendar.token_type} ${googleCalendar.access_token}`
        }
    }).catch(() => { return { error: '' } });

    if (GetCalendar.hasOwnProperty('data')) {
        const calendarItems = GetCalendar.data.items;
        for await (const item of calendarItems) {

            console.log('item:', item.summary);

            if (item.colorId != '2') {
                const object = {
                    eventId: item.id,
                    title: item.summary,
                    taskId: item.description,
                    dateStart: item.start.dateTime,
                    dateEnd: item.end.dateTime,
                    secondsBetweenDates: auxFunc.SecondsBetweenDates(item.start.dateTime, item.end.dateTime)
                };

                let taskId;
                let description;
                if (object.taskId == undefined) {
                    const regex = /\[(\d+)\](.+)/;
                    const result = regex.exec(object.title);

                    if (result) {
                        taskId = result[1];
                        description = result[2]
                    };
                } else {
                    taskId = object.taskId;
                    description = object.title;
                };

                if (taskId) {
                    console.log('taskId:', taskId);
                    const addelapseditemBitrix24 = await elapseditemBitrix24.AddElapseditem(taskId, object.secondsBetweenDates, description, 3155, dateTimeNow);
                    console.log('addelapseditemBitrix24.result:', addelapseditemBitrix24.result);
                    if (addelapseditemBitrix24.result) {
                        item.colorId = 2;
                        EventUpdate(item);
                    };
                };
            };
        };
    };
};
GetCalendar();

async function EventUpdate(item) {

    const googleCalendar = await auth.GoogleCalendar();
    const calendarId = credenciaisGoogle.calendar[0]

    const EventUpdate = await axios({
        method: 'put',
        url: `https://www.googleapis.com/calendar/v3/calendars/${calendarId}/events/${item.id}`,
        data: item,
        headers: {
            "Authorization": `${googleCalendar.token_type} ${googleCalendar.access_token}`
        }
    }).catch((error) => {
        console.log(error.response.data.error);
        return {
            error: ''
        }
    });

    //console.log('EventUpdate:', EventUpdate.response.request.data)
};
