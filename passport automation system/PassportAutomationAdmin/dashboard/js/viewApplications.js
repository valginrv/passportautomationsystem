function onPageLoad(callback) {
    getAllApplicationDetails();
    setTimeout(function() {
        $('#applicationsTable').DataTable();
        $(".viewApplication").on("click", function(event) {
            event.preventDefault();
            let link = event.target;
            let applicationNumber = $(link).attr("tag");
            getSpecificApplicationDetails(applicationNumber);
        });
        $(".approveButton").on("click", function(event) {
            event.preventDefault();
            let link = event.target;
            let applicationNumber = $(link).attr("tag");
            approveApplication(applicationNumber);
        });
        $(".policeVerificationButton").on("click", function(event) {
            event.preventDefault();
            let link = event.target;
            let applicationNumber = $(link).attr("tag");
            passToPoliceVerification(applicationNumber);
        });
        $(".rejectButton").on("click", function(event) {
            event.preventDefault();
            let link = event.target;
            let applicationNumber = $(link).attr("tag");
            rejectApplication(applicationNumber);
        });
        $(".deleteButton").on("click", function(event) {
            event.preventDefault();
            let link = event.target;
            let applicationNumber = $(link).attr("tag");
            deleteApplication(applicationNumber);
        });
    }, 100);
    callback();
}

function getAllApplicationDetails() {
    var xhttp = new XMLHttpRequest();
    xhttp.open("POST", "/pas_backend/getDetails.php", true);
    xhttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xhttp.setRequestHeader('Cache-Control', 'no-cache');
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            console.log(this.responseText);
            let responseArray = JSON.parse(this.responseText);
            let result = responseArray['result'];
            if (result != false) {
				
                for (i in result) {
                    let applicationNumber = result[i]['application_number'];
                    let appliedOn = result[i]['applied_on'];
                    let applicantName = result[i]['full_name'] + " " +  result[i]['surname'];
                    let applicantEmailID = result[i]['email'];
                    let applicantMobileNumber = result[i]['mobile_number'];
                    let applicationStatus = result[i]['status'].toUpperCase();
                    let approveDisplay = "";
                    let rejectDisplay = "";
                    let policeVerificationDisplay = "";
                    if (applicationStatus == "APPROVED") {
                        approveDisplay = "none";
                        rejectDisplay = "block";
                        policeVerificationDisplay = "block";
                    } else if (applicationStatus == "REJECTED") {
                        approveDisplay = "block";
                        rejectDisplay = "none";
                        policeVerificationDisplay = "block";
                    } else if (applicationStatus == "VERIFICATION") {
                        approveDisplay = "block";
                        rejectDisplay = "block";
                        policeVerificationDisplay = "none";
                    } else if (applicationStatus == "PENDING") {
                        approveDisplay = "block";
                        rejectDisplay = "block";
                        policeVerificationDisplay = "block";
                    }

                    let tableRow = `<tr>
                                    <td><a href='' class='viewApplication' tag=" ` + applicationNumber + `">` + applicationNumber + `</a></td>
                                    <td>` + appliedOn + `</td>
                                    <td>` + applicantName + `</td>
                                    <td>` + applicantEmailID + `</td>
                                    <td>` + applicantMobileNumber + `</td>
                                    <td><b>` + applicationStatus + `</b></td>
                                    <td>
                                        <!-- Small button groups (default and split) -->
                                        <div class="btn-group">
                                            <button class="btn btn-secondary btn-sm dropdown-toggle" type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                                Action
                                            </button>
                                            <div class="dropdown-menu">
                                                <a class="dropdown-item approveButton" style="display: ` + approveDisplay + `" href="f" tag="` + applicationNumber + `">Approve</a>
                                                <a class="dropdown-item policeVerificationButton" style="display: ` + policeVerificationDisplay + `" href="" tag="` + applicationNumber + `">Pass to Police Verification</a>
                                                <a class="dropdown-item rejectButton" style="display: ` + rejectDisplay + `" href="" tag="` + applicationNumber + `">Reject</a>
                                                <a class="dropdown-item deleteButton" href="" tag="` + applicationNumber + `">Delete</a>
                                            </div>
                                        </div>
                                    </td>
                                </tr>`;

                    applicationsTableData.innerHTML += tableRow;
                }
            } else {

            }
        }
    };
    xhttp.send("role=officer&info=allApplicationDetails");
}

function getSpecificApplicationDetails(specificApplicationNumber) {
    var xhttp = new XMLHttpRequest();
    xhttp.open("POST", "/pas_backend/getDetails.php", true);
    xhttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xhttp.setRequestHeader('Cache-Control', 'no-cache');
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            console.log(this.responseText);
            let responseArray = JSON.parse(this.responseText);
            let result = responseArray['result'];
            if (result != false) {
                // fill viewApplicationModal Fields
                passportPhoto.src = "/pas_backend/uploads/" + result[0]['passport_photo'];
                fullName.value = result[0]['full_name'];
                surname.value = result[0]['surname'];
                gender.value = result[0]['gender'];
                let dob = new Date(Date.parse(result[0]['date_of_birth']));
                dateOfBirth.value = dob.getDate() + "/" + (dob.getMonth() + 1) + "/" + dob.getFullYear();
                mobileNumber.value = result[0]['mobile_number'];
                phoneNumber.value = result[0]['phone_number'];
                email.value = result[0]['email'];
                address.value = result[0]['address'];
                state.value = result[0]['state'];
                citizenship.value = result[0]['citizenship'];
                idProofNumber.value = result[0]['id_proof_number'];
                voterID.value = result[0]['voter_id'];
                idProof.src = "/pas_backend/uploads/" + result[0]['id_proof'];
                addressProof.src = "/pas_backend/uploads/" + result[0]['address_proof'];
                rpoState.value = result[0]['rpo_state'];
                rpoDistrict.value = result[0]['rpo_district'];
                rpoCentre.value = result[0]['rpo_centre'];
                passportType.value = result[0]['passport_type'];
                passportBookletPages.value = result[0]['passport_booklet_pages'];

                $("#viewApplicationModal").modal("show");
            } else {

            }
        }
    };
    xhttp.send("role=officer&info=specificApplicationDetails&application_number=" + specificApplicationNumber);
}

function approveApplication(applicationNumber) {
    var xhttp = new XMLHttpRequest();
    xhttp.open("POST", "/pas_backend/updateApplication.php", true);
    xhttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xhttp.setRequestHeader('Cache-Control', 'no-cache');
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            console.log(this.responseText);
            let responseArray = JSON.parse(this.responseText);
            let result = responseArray['result'];
            if (result == true) {
                $("#viewApplicationsBtn").click();
            } else {
                showErrorMsg("Update Error", "There was an unexpected error while updating the application. Please try again later.");
                msgButton.onclick = function() {
                    $("#viewApplicationsBtn").click();
                };
            }
        }
    };
    xhttp.send("role=officer&action=approve&application_number=" + applicationNumber);
}

function passToPoliceVerification(applicationNumber) {
    var xhttp = new XMLHttpRequest();
    xhttp.open("POST", "/pas_backend/updateApplication.php", true);
    xhttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xhttp.setRequestHeader('Cache-Control', 'no-cache');
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            console.log(this.responseText);
            let responseArray = JSON.parse(this.responseText);
            let result = responseArray['result'];
            if (result == true) {
                $("#viewApplicationsBtn").click();
            } else {
                showErrorMsg("Update Error", "There was an unexpected error while updating the application. Please try again later.");
                msgButton.onclick = function() {
                    $("#viewApplicationsBtn").click();
                };
            }
        }
    };
    xhttp.send("role=officer&action=passToPoliceVerification&application_number=" + applicationNumber);
}

function rejectApplication(applicationNumber) {
    var xhttp = new XMLHttpRequest();
    xhttp.open("POST", "/pas_backend/updateApplication.php", true);
    xhttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xhttp.setRequestHeader('Cache-Control', 'no-cache');
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            console.log(this.responseText);
            let responseArray = JSON.parse(this.responseText);
            let result = responseArray['result'];
            if (result == true) {
                $("#viewApplicationsBtn").click();
            } else {
                showErrorMsg("Update Error", "There was an unexpected error while updating the application. Please try again later.");
                msgButton.onclick = function() {
                    $("#viewApplicationsBtn").click();
                };
            }
        }
    };
    xhttp.send("role=officer&action=reject&application_number=" + applicationNumber);
}

function deleteApplication(applicationNumber) {
    var xhttp = new XMLHttpRequest();
    xhttp.open("POST", "/pas_backend/updateApplication.php", true);
    xhttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xhttp.setRequestHeader('Cache-Control', 'no-cache');
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            console.log(this.responseText);
            let responseArray = JSON.parse(this.responseText);
            let result = responseArray['result'];
            if (result == true) {
                $("#viewApplicationsBtn").click();
            } else {
                showErrorMsg("Update Error", "There was an unexpected error while updating the application. Please try again later.");
                msgButton.onclick = function() {
                    $("#viewApplicationsBtn").click();
                };
            }
        }
    };
    xhttp.send("role=officer&action=delete&application_number=" + applicationNumber);
}