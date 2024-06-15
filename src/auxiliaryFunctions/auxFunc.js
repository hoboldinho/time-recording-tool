function RemoveEmptyValues(Object) {
    const newObject = {};
    for (const key in Object) {
        if (Object[key] !== undefined && Object[key] !== null && Object[key] !== '') {
            if (typeof Object[key] === 'object' && !Array.isArray(Object[key])) {
                newObject[key] = RemoveEmptyValues(Object[key]);
            } else if (Array.isArray(Object[key])) {
                newObject[key] = Object[key].map(item => {
                    if (typeof item === 'object' && !Array.isArray(item)) {
                        return RemoveEmptyValues(item);
                    }
                    return item;
                });
            } else {
                newObject[key] = Object[key];
            }
        }
    };
    return newObject;
};
function AddCnpjMask(cnpj) {
    const cnpjOnlyNumbers = cnpj.replace(/\D/g, '');
    const cnpjWithMask = cnpjOnlyNumbers.replace(/^(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})$/, '$1.$2.$3/$4-$5');
    return cnpjWithMask;
};
function AddCpfMask(cpf) {
    const cpfOnlyNumbers = cpf.replace(/\D/g, '');
    const cpfWithMask = cpfOnlyNumbers.replace(/^(\d{3})(\d{3})(\d{3})(\d{2})$/, '$1.$2.$3-$4');
    return cpfWithMask;
};
function CleanPhoneNumber(phone) {
    try {
        const cleanPhoneNumber = phone.replace(/[\(\)\s-]/g, '');
        return cleanPhoneNumber;
    } catch (error) {
        return phone;
    };
};
function TimeDateNow(year, month, day) {
    const date = new Date();
    date.setHours(date.getHours() + 6);
    const yearDate = date.getFullYear();
    const monthDate = (month + 1).toString().padStart(2, '0');
    const dayDate = day.toString().padStart(2, '0');
    const hourDate = date.getHours().toString().padStart(2, '0');
    const minuteDate = date.getMinutes().toString().padStart(2, '0');
    const secondDate = date.getSeconds().toString().padStart(2, '0');

    const timeDateNow = `${year}-${monthDate}-${dayDate} ${hourDate}:${minuteDate}:${secondDate}`;

    return timeDateNow;
};
function TimeDateDayStart(year, month, day) {
    const date = new Date(year, month, day);

    date.setHours(date.getHours());
    const yearDate = date.getFullYear();
    const monthDate = (date.getMonth() + 1).toString().padStart(2, '0');
    const dayDate = date.getDate().toString().padStart(2, '0');

    const timeDateDayStart = `${yearDate}-${monthDate}-${dayDate}T00:00:00-03:00`;

    return timeDateDayStart;
};
function TimeDateDayEnd(year, month, day) {
    const date = new Date(year, month, day);

    date.setHours(date.getHours());
    const yearDate = date.getFullYear();
    const monthDate = (date.getMonth() + 1).toString().padStart(2, '0');
    const dayDate = date.getDate().toString().padStart(2, '0');

    const timeDateDayEnd = `${yearDate}-${monthDate}-${dayDate}T23:59:59-03:00`;

    return timeDateDayEnd;
};
function SecondsBetweenDates(startDate, endDate) {
    const start = new Date(startDate);
    const end = new Date(endDate);

    const diffrenceInSeconds = (end - start) / 1000;

    return diffrenceInSeconds;
}

const auxFunc = {
    RemoveEmptyValues,
    AddCnpjMask,
    AddCpfMask,
    CleanPhoneNumber,
    TimeDateNow,
    TimeDateDayStart,
    TimeDateDayEnd,
    SecondsBetweenDates
};

export default auxFunc;
