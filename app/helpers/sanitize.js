var sanitizeInput = function(key, val, type) {
    //sanitize numbers, ignore other types.
    //eg. '10' : 10, '' : 0, undefined|null : 0, [10,20] : [10,20]
    function sanitizeNumber(number) {
        if (!number) {
            return 0;
        }
        if (typeof number === 'object') {
            return number;
        }
        number = number.toString();
        number = number.trim();
        if (!isNaN(parseFloat(number))) {
            return parseFloat(number);
        }
        if (!number) {
            return 0;
        }
        return number;
    };

    //sanitize strings
    //eg. undefined|null => "", "10" : "10", "" : ""
    function sanitizeString(key, str) {
        if (!str) {
            return "";
        }
        if (str instanceof Date) {
            return str.toString();
        }
        if (typeof str !== 'string') {
            return str;
        }
        str = str.trim();
        //str = sanitizer.sanitize(str);
        //remove special characters for all strings excepts email and password
        /*if (['email', 'password'].indexOf(key) == -1) {
            str = str.replace(/[!@#$%^&*()_+\-=\[\]{};:"\\|<>\/?~]/g, '');
        }*/
        return str;
    };

    switch(type) {
        case 'number' :
            return sanitizeNumber(val);
        case 'string' :
            return sanitizeString(key, val)
    }
    return val;
};

module.exports = {
    sanitizeInput : sanitizeInput
}