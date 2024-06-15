import axios from 'axios';
import credenciaisGoogle from '../../credenciaisGoogle.js';

const bitrix24Token = credenciaisGoogle.token_bitrix24;

async function AddElapseditem(taskId = '', seconds = 0, commentText = '', userId = '', createdDate = '') {

    const metodoAddElapseditem = 'task.elapseditem.add';
    const reqAddElapseditemBody = {
        taskId: taskId,
        arFields: {
            SECONDS: seconds,
            COMMENT_TEXT: commentText,
            CREATED_DATE: createdDate,
            USER_ID: userId
        }
    };
    const reqAddElapseditemUrl = `${bitrix24Token}${metodoAddElapseditem}`;

    const reqAddElapseditem = await axios.post(reqAddElapseditemUrl, reqAddElapseditemBody)
        .catch(error_reqAddElapseditem => {
            if (error_reqAddElapseditem.hasOwnProperty('response')) {
                const error_reqAddElapseditemObject = {
                    reqAddElapseditemStatus: error_reqAddElapseditem.response.status,
                    reqAddElapseditemStatusText: error_reqAddElapseditem.response.statusText,
                    reqAddElapseditemError_description: error_reqAddElapseditem.response.data.error_description
                };
                return { error: error_reqAddElapseditemObject };
            } else {
                throw error_reqAddElapseditem;
            };
        });
    if (reqAddElapseditem.error) {
        return reqAddElapseditem;
    } else if (reqAddElapseditem.hasOwnProperty('data')) {
        return reqAddElapseditem.data;
    };
};

const elapseditemBitrix24 = {
    AddElapseditem
};

export default elapseditemBitrix24;
