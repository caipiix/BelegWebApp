let urlContacts = "http://localhost:3000/contacts";
let urlUsers = "http://localhost:3000/users";

/**
 * Handle Userlogin with username/password payload - Post Req User Collection
 * @param username
 * @param password
 * @returns {Promise<null|any>}
 */
async function logInUser(username, password) {
    try {
        let response = await fetch(urlUsers + "?username=" + username + "&password=" + password, {
            method: "POST", headers: {
                "Content-Type": "application/json; charset=utf-8",
            }
        });
        return await response.json();
    } catch (err) {
        return null;
    }
}

/**
 * Handle Contact adding - Post Req contacts Collection
 * @param contact
 * @returns {Promise<null|any>}
 */
async function postContact(contact) {
    try {
        let response = await fetch(urlContacts, {
            method: "POST", headers: {
                "Content-Type": "application/json; charset=utf-8",
            }, body: JSON.stringify(contact)
        });

        let responseJSON = await response.json();
        alert("Successfully posted Contact!");
        return responseJSON;
    } catch (err) {
        alert("Something went wrong posting your contact");
        console.log(err)
        return null;
    }
}

/**
 * Handle Contact delete - Delete Req contacts collection with id param
 * @param id
 * @returns {Promise<void>}
 */
async function deleteContact(id) {
    let response = await fetch(urlContacts + "/" + id, {
        method: "DELETE"
    });
    console.log(await response.text())
    if (response.status === 204) {
        alert("Successfully deleted Contact!");
    } else {
        alert("Something went wrong deleting your contact")
    }
}

/**
 * Handle Contact update - Put Req contacts collection with contact param
 * @param contact
 * @returns {Promise<void>}
 */
async function updateContact(contact) {
    let response = await fetch(urlContacts + "/" + contact._id, {
        method: "PUT", headers: {
            "Content-Type": "application/json; charset=utf-8",
        }, body: JSON.stringify(contact)
    });
    console.log(response.status)
    if (response.status === 204) {
        alert("Successfully updated your contact!");
    } else {
        alert("Something went wrong updating your Contact")
    }
}

/**
 * Handle get single Contact Req with id param
 * @param id
 * @returns {Promise<null|any>}
 */
async function getContact(id) {
    try {
        let response = await fetch(urlContacts + "/" + id, {
            method: "GET", headers: {
                "Content-Type": "application/json; charset=utf-8",
            }
        });
        let responseJSON = await response.json();
        console.log(responseJSON);
        return responseJSON;
    } catch (err) {
        console.log(err);
        return null;
    }
}

/**
 * Handle get all Contacts
 * @returns {Promise<null|any>}
 */
async function getAllContacts() {
    try {
        let response = await fetch(urlContacts, {
            method: "GET", headers: {
                "Content-Type": "application/json; charset=utf-8",
            }
        });
        return await response.json();
    } catch (err) {
        return null;
    }
}

/**
 * Handle get all Contacs from specific User
 * @param userID
 * @returns {Promise<null|any>}
 */
async function getContactsOfUser(userID) {
    try {
        let response = await fetch(urlContacts + "?userID=" + userID, {
            method: "GET", headers: {
                "Content-Type": "application/json; charset=utf-8",
            }
        });
        return await response.json();
    } catch (err) {
        return null;
    }
}