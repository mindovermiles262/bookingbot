chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
        if (request.greeting === "fire") {
            packageAndRequest(request.amount, request.requestData);
        }
    });

function packageAndRequest(amount, requestData) {
    for (var i = 0; i < amount; i++) {
        var request = new XMLHttpRequest();
        request.open("HEAD", "http://www.reserveamerica.com/switchBookingAction.do" + requestData, true);
        request.onload = requestComplete;
        request.send();
    }
}

function requestComplete() {
    if (this.responseURL.indexOf("reservationDetails") > -1) {
        alert("Frack! Check your cart!");
    }
}
