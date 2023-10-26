const methods = {
    genRandomNumber: async function (min, max)
    {
        return await Math.floor(Math.random() * (max - min + 1)) + min;
    },
};
module.exports = methods;
