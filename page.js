var requestData = {};

document.addEventListener('DOMContentLoaded', function() {
    if (document.getElementById("btnbookdates").innerHTML === "Book these Dates") {
        var rButton = document.createElement("button");
        rButton.setAttribute("id", "send-request-button");
        rButton.innerHTML = "SEND REQUESTS";
        var numberAmount = document.createElement("input");
        numberAmount.setAttribute("id", "send-request-amount");
        numberAmount.setAttribute("type", "number");
        numberAmount.placeholder = "Amount of requests";

        document.getElementById("csitecalendar").appendChild(numberAmount);
        document.getElementById("csitecalendar").appendChild(rButton);

        document.getElementById("send-request-button").addEventListener("click", messageRequests);
    }
});

function getData() {
    requestData.contractCode = document.getElementById("contractCode").getAttribute("value");
    requestData.parkId = document.getElementById("parkId").getAttribute("value");
    requestData.siteId = document.getElementById("siteId").getAttribute("value");
    requestData.camparea = document.getElementById("camparea").getAttribute("value");
    requestData.selStatus = document.getElementById("selStatus").getAttribute("value");
    requestData.matrixHasError  = document.getElementById("matrixHasError").getAttribute("value");
    requestData.dateToday  = document.getElementById("dateToday").getAttribute("value");
    requestData.currentMaximumWindow = document.getElementById("currentMaximumWindow").getAttribute("value");
    requestData.dateMinWindow = document.getElementById("dateMinWindow").getAttribute("value");
    requestData.dateMaxWindow = document.getElementById("dateMaxWindow").getAttribute("value");
    requestData.arrivaldate = document.getElementById("arrivaldate").getAttribute("value");
    var raw_date = requestData.arrivaldate.split(" ");
    var arv = new Date(raw_date[1] + " " + raw_date[2] + " " + raw_date[3]);
    requestData.arvdate = ("0" + Number(arv.getMonth() + 1)).slice(-2) + "/" + ("0" + arv.getDate()).slice(-2) + "/" + arv.getFullYear();
    requestData.lengthOfStay = document.getElementById("lengthOfStay").getAttribute("value");
    requestData.dateChosen = document.getElementById("dateChosen").getAttribute("value");
}

function messageRequests() {
    getData();
    var amt = Number(document.getElementById("send-request-amount").value);
    chrome.runtime.sendMessage({greeting:"fire", amount:amt, requestData: getFormattedRequestString()});
}

function getCookieHeaderString() {
    var s = "";
    for (var c in cookies) {
        s += c + "=" + cookies[c] + "; ";
    }
    return s;
}

function getFormattedRequestString() {
    var s = "?";
    for (var r in requestData) {
        s += r + "=" + requestData[r] + "&";
    }
    return s;
}
