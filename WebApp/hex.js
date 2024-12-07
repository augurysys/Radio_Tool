function padHex(value) {
    return ('00' + value.toString(16).toUpperCase()).slice(-2);
}