import jwt from 'jsonwebtoken';
import axios from 'axios';
import credenciaisGoogle from '../../credenciaisGoogle.js';

async function GoogleCalendar() {
    const payloadObj = {
        iss: credenciaisGoogle.client_email,
        scope: "https://www.googleapis.com/auth/calendar",
        aud: "https://oauth2.googleapis.com/token",
        exp: '',
        iat: ''
    };
    const privateKey = credenciaisGoogle.private_key;
    const dataHoje = new Date();
    const dataHojeSegundo = Math.ceil(dataHoje.getTime() / 1000);
    const dataMaisHora = dataHoje.setHours(dataHoje.getHours() + 1);
    const dataMaisHoraSegundo = Math.ceil(dataMaisHora / 1000);
    
    payloadObj.exp = dataMaisHoraSegundo;
    payloadObj.iat = dataHojeSegundo;

    const payloadJson = JSON.stringify(payloadObj);
    const tokenJwt = jwt.sign(payloadJson, privateKey, { algorithm: 'RS256' });

    const reqTokenGoogleCalendar = await axios({
        method: 'post',
        url: payloadObj.aud,
        params: {
            grant_type: 'urn:ietf:params:oauth:grant-type:jwt-bearer',
            assertion: tokenJwt
        }
    });
    return reqTokenGoogleCalendar.data;
}

const auth = {
    GoogleCalendar
}

export default auth;