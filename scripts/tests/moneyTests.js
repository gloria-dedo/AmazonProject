import {formatCurrency} from "../utils/money.js"
if (formatCurrency(2095)=== "20.95"){
    console.log("Test passed");

}else {
    console.log("failed");
}

if (formatCurrency(0) === '0.00'){
    console.log("Test passed");
}else {
    console.log("failed");
}
if (formatCurrency(2000.4) === '20.00'){
    console.log("Test passed");
}else {
    console.log("failed");
}
