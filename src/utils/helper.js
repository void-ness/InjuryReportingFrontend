export function getFinalDateTime(date) {
    const inputDate = new Date(date);
    let result = "";

    result += `${inputDate.getFullYear()}-${inputDate.getMonth() + 1}-${inputDate.getDate()} `
    result += `${inputDate.getHours() > 12 ? inputDate.getHours() - 12 : inputDate.getHours()}:${inputDate.getMinutes()} `;
    result += inputDate.getHours() >= 12 ? 'PM' : 'AM';

    return result;
}

export const InputTimeMask =
    [
        {
            length: [1, 2],
            options: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12',],
            regexp: /^1[0-2]$|^[0-9]$/,
            placeholder: 'hh',
        },
        { fixed: ':' },
        {
            length: 2,
            options: ['00', '10', '20', '30', '40', '50'],
            regexp: /^[0-5][0-9]$/,
            placeholder: 'mm',
        },
        { fixed: ' ' },
        {
            length: 2,
            options: ['AM', 'PM'],
            regexp: /^[ap]m$|^[AP]M$|^[aApP]$/,
            placeholder: 'am/pm',
        }
    ]

function computeDate(date) {
    const inputDate = new Date(date);
    let result = "";
    result += `${inputDate.getFullYear()}-${inputDate.getMonth() + 1}-${inputDate.getDate()}`;
    return result;
}

export const getQueryVariables = (formState) => {
    const queryVariables = {};
    let injuryDateTime = "";
    let reportDateTime = "";

    if (formState.name) {
        queryVariables['name'] = formState.name;
    }

    if (formState.createdAt) {
        reportDateTime += computeDate(formState.createdAt);
    }

    if (formState.reportTime) {
        reportDateTime += " " + formState.reportTime;
    }

    if (formState.injuryDate) {
        injuryDateTime += computeDate(formState.injuryDate);
    }

    if (formState.injuryTime) {
        injuryDateTime += " " + formState.injuryTime;
    }

    if (reportDateTime) {
        queryVariables['createdAt'] = new Date(reportDateTime);
    }

    if (injuryDateTime) {
        queryVariables['injuryDate'] = new Date(injuryDateTime);
    }

    return queryVariables
}