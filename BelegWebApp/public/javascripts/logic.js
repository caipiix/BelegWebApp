let userCurrentlyLoggedIn = null;
let userLoggedIn = false;
let isUserAdmin = null;

if (userLoggedIn === false) {
    document.getElementById('mainScreenDiv').classList.add("hidden");
    document.getElementById('addContactDiv').classList.add("hidden");
    document.getElementById('updateContactDiv').classList.add("hidden");
    document.getElementById('logoutScreenDiv').classList.add("hidden");
}

// add listener to Buttons

let loginButton = document.getElementById("bnt_Login");
loginButton.addEventListener("click", loginButtonClicked);

let addNewButton = document.getElementById("mainmenu_btn_addContact");
addNewButton.addEventListener("click", openAddContactScreenButtonClicked);

let listOwnContactsBtn = document.getElementById("mainmenu_btn_showMyContacts");
listOwnContactsBtn.addEventListener("click", listOwnContacts);

let listAllContactsBtn = document.getElementById("mainmenu_btn_showAllContacts");
listAllContactsBtn.addEventListener("click", listAllContacts);

let addButton = document.getElementById("btn_add_new_contact");
addButton.addEventListener("click", addButtonClicked);

let cancelNewContactButton = document.getElementById("btn_cancel_add_new_contact");
cancelNewContactButton.addEventListener("click", cancelNewContactButtonClicked);

let cancelUpdateContactButton = document.getElementById("btn_cancel_update");
cancelUpdateContactButton.addEventListener("click", cancelUpdateContactButtonClicked);

let logoutButton = document.getElementById("bnt_Logout");
logoutButton.addEventListener("click", logoutButtonClicked);

// click Events on Buttons


/**
 * Site login and move to main menu
 * @returns {Promise<void>}
 */
async function loginButtonClicked() {
    let inputUserName = document.getElementById("uname").value;
    let inputPassword = document.getElementById("psw").value;

    userCurrentlyLoggedIn = await logInUser(inputUserName, inputPassword);
    console.log(userCurrentlyLoggedIn)

    if (userCurrentlyLoggedIn != null) {
        document.getElementById("mainScreenDiv").classList.remove("hidden");
        document.getElementById("logoutScreenDiv").classList.remove("hidden");
        document.getElementById("loginScreenDiv").classList.add("hidden");

        document.getElementById("uname").value = "";
        document.getElementById("psw").value = "";


        userLoggedIn = true;
        const heading = document.getElementById("greetingHeader");
        if (userLoggedIn === true) {
            heading.textContent = 'Willkommen ' + inputUserName + " !"
        }

        if (userCurrentlyLoggedIn.role === "admin") {
            isUserAdmin = true;
        } else {
            isUserAdmin = false;
        }
        await listOwnContacts();
    } else {
        alert("Wrong Username/Password");
    }
}

/**
 * move from Main Menu to addContact Screen
 */
function openAddContactScreenButtonClicked() {
    document.getElementById("mainScreenDiv").classList.add("hidden");
    document.getElementById("addContactDiv").classList.remove("hidden");
}

/**
 * move from addContact Screen to Main Menu
 */
function cancelNewContactButtonClicked() {
    document.getElementById("mainScreenDiv").classList.remove("hidden");
    document.getElementById("addContactDiv").classList.add("hidden");
}

/**
 * move from updateContact Screen to Main Menu
 */
function cancelUpdateContactButtonClicked() {
    document.getElementById("mainScreenDiv").classList.remove("hidden");
    document.getElementById("updateContactDiv").classList.add("hidden");
}

/**
 * Set Login to false - move from any Screen to Login
 */
function logoutButtonClicked() {
    document.getElementById('mainScreenDiv').classList.add("hidden");
    document.getElementById('addContactDiv').classList.add("hidden");
    document.getElementById('updateContactDiv').classList.add("hidden");
    document.getElementById("logoutScreenDiv").classList.add("hidden");
    document.getElementById("loginScreenDiv").classList.remove("hidden");

    userLoggedIn = false;
}

/**
 * Get Contact HTML values to create contact
 * @returns {Promise<void>}
 */
async function addButtonClicked() {
    let contactFirstName = document.getElementById("addFirstName").value;
    let contactLastName = document.getElementById("addLastName").value;
    let contactAddress = document.getElementById("addStreetName").value;
    let contactZIP = document.getElementById("addZipCode").value;
    let contactCity = document.getElementById("addCity").value;
    let contactCountry = document.getElementById("addCountry").value;
    let contactPhone = document.getElementById("addPhone").value;
    let contactDoB = document.getElementById("addDoB").value;
    let contactPrivacy = document.getElementById("addPrivacy").checked;
    let contactOwner = userCurrentlyLoggedIn.role;

    let contact = {
        firstname: contactFirstName,
        lastname: contactLastName,
        street: contactAddress,
        zipcode: contactZIP,
        city: contactCity,
        country: contactCountry,
        phone: contactPhone,
        dob: contactDoB,
        privacy: contactPrivacy,
        owner: contactOwner
    }

    let coords = await getCoords(contactAddress, contactCity, contactCountry, contactZIP);
    console.log(coords)

    if (coords != null) {
        contact.lon = coords.lon;
        contact.lat = coords.lat;
    } else {
        contact.lon = null;
        contact.lat = null;
    }

    console.log(contact);
    contact._id = await postContact(contact);

    if (contact._id != null) {
        await listOwnContacts();
        if (contact.lon != null && contact.lat != null) {
            createNewMarker(contact.lon, contact.lat);
        }
    } else {
        alert("Fail to add contact");
    }

    document.getElementById("addFirstName").value = "";
    document.getElementById("addLastName").value = "";
    document.getElementById("addStreetName").value = "";
    document.getElementById("addZipCode").value = "";
    document.getElementById("addCity").value = "";
    document.getElementById("addCountry").value = "";
    document.getElementById("addPhone").value = "";
    document.getElementById("addDoB").value = "";
    document.getElementById("addPrivacy").checked = true;

    document.getElementById("mainScreenDiv").classList.remove("hidden");
    document.getElementById("addContactDiv").classList.add("hidden");
}

/**
 * create contact Button in HTML sidediv - contactsID
 * @param contact
 */
function createButton(contact) {
    let btn = document.createElement("BUTTON");   // Create a <button> element
    btn.innerHTML = contact.firstname + " " + contact.lastname;                   // Insert text
    document.getElementById("contactsID").append(btn);
    btn.addEventListener("click", function () {
        contactButtonClicked(contact);
    });
}

/**
 * remove Contact Button from HTML sidediv - contactsID
 */
function clearButtons() {
    let contactListWebsite = document.getElementById("contactsID");
    contactListWebsite.innerHTML = "";
}

/**
 * Open ContactUpdate Screen and fill HTML Elements with Contact values
 * @param contact
 * @returns {Promise<void>}
 */
async function contactButtonClicked(contact) {
    console.log("ContactID:" + contact._id)
    console.log(contact)
    if (contact != null) {
        document.getElementById("updateFirstname").value = contact.firstname;
        document.getElementById("updateLastname").value = contact.lastname;
        document.getElementById("updateStreetName").value = contact.street;
        document.getElementById("updateZipCode").value = contact.zipcode;
        document.getElementById("updateCity").value = contact.city;
        document.getElementById("updateCountry").value = contact.country;
        document.getElementById("updatePhone").value = contact.phone;
        document.getElementById("updateDoB").value = contact.dob;
        document.getElementById("updatePrivacy").checked = contact.privacy;

        document.getElementById("mainScreenDiv").classList.add("hidden");
        document.getElementById("updateContactDiv").classList.remove("hidden");
    }

    let updateButton = document.getElementById("btn_update");
    updateButton.onclick = function () {
        updateButtonClicked(contact._id);
    };

    let deleteButton = document.getElementById("btn_delete");
    deleteButton.onclick = function () {
        deleteButtonClicked(contact._id);
    };
}

/**
 * Use Contact HTML values to Update Contact - check user permission - move from updateContact Screen to Main Menu
 * @param contactID
 * @returns {Promise<void>}
 */
async function updateButtonClicked(contactID) {
    let contactData = await getContact(contactID);

    let contactToUpdate = {
        _id: contactID,
        firstname: document.getElementById("updateFirstname").value,
        lastname: document.getElementById("updateLastname").value,
        street: document.getElementById("updateStreetName").value,
        zipcode: document.getElementById("updateZipCode").value,
        city: document.getElementById("updateCity").value,
        country: document.getElementById("updateCountry").value,
        phone: document.getElementById("updatePhone").value,
        dob: document.getElementById("updateDoB").value,
        privacy: document.getElementById("updatePrivacy").checked,
        owner: contactData.owner
    };


    if (isUserAdmin || !isUserAdmin && contactData.owner === userCurrentlyLoggedIn.role) {
        let coords = await getCoords(contactToUpdate.street, contactToUpdate.city, contactToUpdate.country, contactToUpdate.zipcode);
        if (coords != null) {
            contactToUpdate.lon = coords.lon;
            contactToUpdate.lat = coords.lat;
        }
        await updateContact(contactToUpdate)
    } else {
        alert("Insufficient Permission");
    }
    document.getElementById("mainScreenDiv").classList.remove("hidden");
    document.getElementById("updateContactDiv").classList.add("hidden");
    await listOwnContacts();
}

/**
 * delete User with @contactID - check user permission - move from updateContact Screen to Main Menu
 * @param contactID
 * @returns {Promise<void>}
 */
async function deleteButtonClicked(contactID) {
    let contactToUpdate = await getContact(contactID);
    if (isUserAdmin || !isUserAdmin && contactToUpdate.owner.toLowerCase() === userCurrentlyLoggedIn.role) {
        await deleteContact(contactID);
    } else {
        alert("Insufficient Permission")
    }
    document.getElementById("mainScreenDiv").classList.remove("hidden");
    document.getElementById("updateContactDiv").classList.add("hidden");
    await listOwnContacts();
}

/**
 * get ContactList of all Users if Admin or all Contacts with Public param
 * and Create sideDiv ContactButton and ContactMarker
 * @returns {Promise<void>}
 */
async function listAllContacts() {
    clearMarkers();
    clearButtons();
    let contactList = await getAllContacts();
    console.log(contactList)
    if (isUserAdmin) {
        contactList.forEach(function (contact) {
            createButton(contact);
            if (contact.lon != null && contact.lat != null) {
                createNewMarker(contact.lon, contact.lat);
            }
        });
    } else {
        contactList.forEach(function (contact) {
            if (contact.owner.toLowerCase() === userCurrentlyLoggedIn.role || !contact.privacy) {
                createButton(contact);
                if (contact.lon != null && contact.lat != null) {
                    createNewMarker(contact.lon, contact.lat);
                }
            }
        });
    }
}

/**
 * get ContactList of active User and Create sideDiv ContactButton and ContactMarker
 * @returns {Promise<void>}
 */
async function listOwnContacts() {
    clearMarkers();
    clearButtons();
    let userContactList = await getContactsOfUser(userCurrentlyLoggedIn.role);
    console.log(userContactList);
    userContactList.forEach(function (contact) {
        createButton(contact);
        if (contact.lon != null && contact.lat != null) {
            createNewMarker(contact.lon, contact.lat);
        }
    });
}

/**
 * get lat and long from user Address
 * @param contactAddress
 * @param contactCity
 * @param contactCountry
 * @param contactZIP
 * @returns {Promise<null|{lon: (*|null|string), lat: (*|null|string)}>}
 */
async function getCoords(contactAddress, contactCity, contactCountry, contactZIP) {
    let url = "https://nominatim.openstreetmap.org/search?street=" + contactAddress + "&city=" + contactCity + "&country=" + contactCountry + "&postalcode=" + contactZIP + "&format=json";
    url = url.split(' ').join('+');
    console.log(url);
    try {
        let response = await fetch(url, {
            method: "GET", headers: {
                "Content-Type": "application/json; charset=utf-8",
            }
        });
        let responseJSON = await response.json();
        if (responseJSON !== undefined) {
            let latitude = responseJSON[0].lat;
            let longitude = responseJSON[0].lon;

            return {lon: longitude, lat: latitude};
        } else {
            alert("Address doesn't exist!");
            return null;
        }
    } catch (err) {
        console.log(err)
    }
}