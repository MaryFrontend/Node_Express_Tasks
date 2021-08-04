const express = require('express');

const buildResponse = (res, status, result) => {
    res.status(status);
    res.json(result);
};

module.exports = {  buildResponse };
