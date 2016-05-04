/*
 * Js to calculate amortization data
 */


function pmt(rate, nper, pv) {
    var pvif, pmt;

    pvif = Math.pow(1 + rate, nper);
    console.log(pvif);
    pmt = rate / (pvif - 1) * -(pv * pvif);

    return pmt;
}
;

// for bi-weekly payments_per_year = 26
function computeSchedule(loan_amount, interest_rate, payments_per_year, years, payment, mainStartDate) {
//    var schedule = {};
    var schedule = [];
    var remaining = loan_amount;
    var number_of_payments = payments_per_year * years;
    // create a start date object
    mainStartDate = mainStartDate ? new Date(mainStartDate) : new Date();
    for (var i = 0; i < number_of_payments; i++) {
        var interest = remaining * (interest_rate / 100 / payments_per_year);
        var principle = (payment - interest);
        var paymentDate = (i === 0) ? new Date(mainStartDate) : new Date(addDaysInDate(mainStartDate, payments_per_year));
        principle = principle > 0 ? (principle < payment ? principle : payment) : 0;
        interest = interest > 0 ? interest : 0;
        var newRemainingAmount = remaining > 0 ? remaining - principle : 0;
        var row = [
            paymentDate,
            principle,
            interest,
            getTotalAmountPaid(principle, interest),
            newRemainingAmount,
            loanPaidTillDate(loan_amount, newRemainingAmount)
        ];
        // create a year key in schedule array. Which will store all the data for that year
//        if (typeof schedule[paymentDate.getFullYear()] == 'undefined') {
//            schedule[paymentDate.getFullYear()] = {};
//            schedule[paymentDate.getFullYear()].data = [];
//        }
//        try {
//            schedule[paymentDate.getFullYear()].data.push(row);
//        }
//        catch (err) {
//            schedule[paymentDate.getFullYear()].data = [];
//            schedule[paymentDate.getFullYear()].data.push(row);
//        }
        schedule.push(row);
        remaining -= principle;
    }
//    console.log(schedule);
    return schedule;
}

function addDaysInDate(date, payments_per_year) {
    if (payments_per_year === 26) {
        return date.setDate(date.getDate() + 14);
    } else {
        return date.setMonth(date.getMonth() + 1);
    }
}

/*
 * This function returns loan paid in percentage
 */
function loanPaidTillDate(loan_amount, newBalance) {
    return ((parseFloat(loan_amount) - parseFloat(newBalance)) / loan_amount) * 100;
}
/*
 * This function returns total amount paid in any date
 */
function getTotalAmountPaid(principle, interest) {
    return  parseFloat(principle) + parseFloat(interest); // to calculate total amount paid
}
