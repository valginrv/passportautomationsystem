function onPageLoad(callback) {
	greetUser();
	getPendingApplicationsCount();
	getVerificationApplicationsCount();
	getApprovedApplicationsCount();
	getRejectedApplicationsCount();
	callback();
}

function greetUser() {
	greetings.innerHTML = "Welcome " + window.screenName + "!";
}

function getPendingApplicationsCount() {
    var xhttp = new XMLHttpRequest();
    xhttp.open("POST", "/pas_backend/getDetails.php", true);
    xhttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xhttp.setRequestHeader('Cache-Control', 'no-cache');
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            console.log(this.responseText);
            let responseArray = JSON.parse(this.responseText);
            let result = responseArray['result'];
            if (result !== false) {
				pendingApplicationsCardText.innerHTML = result;
            }
        }
    };
	xhttp.send("role=applicant&info=pendingApplicationsCount");
}
function getPendingApplicationsCount() {
    var xhttp = new XMLHttpRequest();
    xhttp.open("POST", "/pas_backend/getDetails.php", true);
    xhttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xhttp.setRequestHeader('Cache-Control', 'no-cache');
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            console.log(this.responseText);
            let responseArray = JSON.parse(this.responseText);
            let result = responseArray['result'];
            if (result !== false) {
				pendingApplicationsCardText.innerHTML = result;
            }
        }
    };
	xhttp.send("role=applicant&info=pendingApplicationsCount");
}
function getVerificationApplicationsCount() {
    var xhttp = new XMLHttpRequest();
    xhttp.open("POST", "/pas_backend/getDetails.php", true);
    xhttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xhttp.setRequestHeader('Cache-Control', 'no-cache');
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            console.log(this.responseText);
            let responseArray = JSON.parse(this.responseText);
            let result = responseArray['result'];
            if (result !== false) {
				verificationApplicationsCardText.innerHTML = result;
            }
        }
    };
	xhttp.send("role=applicant&info=verificationApplicationsCount");
}
function getApprovedApplicationsCount() {
    var xhttp = new XMLHttpRequest();
    xhttp.open("POST", "/pas_backend/getDetails.php", true);
    xhttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xhttp.setRequestHeader('Cache-Control', 'no-cache');
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            console.log(this.responseText);
            let responseArray = JSON.parse(this.responseText);
            let result = responseArray['result'];
            if (result !== false) {
				approvedApplicationsCardText.innerHTML = result;
            }
        }
    };
	xhttp.send("role=applicant&info=approvedApplicationsCount");
}

function getRejectedApplicationsCount() {
    var xhttp = new XMLHttpRequest();
    xhttp.open("POST", "/pas_backend/getDetails.php", true);
    xhttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xhttp.setRequestHeader('Cache-Control', 'no-cache');
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            console.log(this.responseText);
            let responseArray = JSON.parse(this.responseText);
            let result = responseArray['result'];
            if (result !== false) {
				rejectedApplicationsCardText.innerHTML = result;
            }
        }
    };
	xhttp.send("role=applicant&info=rejectedApplicationsCount");
}