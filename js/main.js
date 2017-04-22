let calculateMonthlyPayment = (principal, years, rate) => {
    let monthlyRate = 0;
    if (rate) {
        monthlyRate = rate / 100 / 12;
    }
    let monthlyPayment = principal * monthlyRate / (1 - (Math.pow(1 / (1 + monthlyRate), years * 12)));
    return {principal, years, rate, monthlyPayment, monthlyRate};
};

let calculateAmortization = (principal, years, rate) => {
    let {monthlyRate, monthlyPayment} = calculateMonthlyPayment(principal, years, rate)
    let balance = principal;                                //initialize balance to principal
    let amortization = [];                                  //initialize amortization to empty arr
    for (let y = 0; y < years; y++) {
        let interestY = 0;                                  //initialize interest pmt for year y
        let principalY = 0;                                 //initialize principal pmt for year y
        for (let m = 0; m < 12; m++) {
            let interestM = balance * monthlyRate;          //interest pmt for month m
            let principalM = monthlyPayment - interestM;    //principal pmt for month m
            interestY = interestY + interestM;
            principalY = principalY + principalM;
            balance = balance - principalM;
        }

        amortization.push({principalY, interestY, balance});//pass json to amortization array for each year
    }
    return {monthlyPayment, monthlyRate, amortization};
}

document.getElementById('calcBtn').addEventListener('click', () => {
    let principal = document.getElementById("principal").value;
    let years = document.getElementById("years").value;
    let rate = document.getElementById("rate").value;
    let {monthlyPayment, monthlyRate} = calculateMonthlyPayment(principal, years, rate);
    document.getElementById("monthlyPayment").innerHTML = monthlyPayment.toFixed(2);
    document.getElementById("monthlyRate").innerHTML = (monthlyRate * 100).toFixed(2);
});
