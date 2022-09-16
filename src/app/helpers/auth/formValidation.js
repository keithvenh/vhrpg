export function validatePassword(password) {
    if(password.length < 8) {
        // Password is too short
        return false;
    }

    // All Validations Pass
    return true;
}

export function validateEmail(email) {
    // RegEx checking for invalid characters and ensuring @ and .
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
        // Email is Valid
        return true
     } else {
        // Email is Invalid
        return false
     }
}

export function  checkEmptyFields(form) {
    let valid = true;

    for(const field in form)  {

        const passwordFields = ["password", "currentPassword", "newPassword", "confirmNewPassword"]
        // Ignore Password Fields
        // If it includes the field, skip it. Otherwise validate
        if (!passwordFields.includes(field)) {

            // If field is blank, null or undefined break and return false
            if(!form[field]) {
                valid = false;
                break;
            }
        }
    }

    return valid
}