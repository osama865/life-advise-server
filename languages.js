const axios = require("axios").default;
const fs = require("fs");

const options = {
    method: 'GET',
    url: 'https://microsoft-translator-text.p.rapidapi.com/languages',
    params: { 'api-version': '3.0' },
    headers: {
        'X-RapidAPI-Key': '956152c248mshb998fd97efb63f7p1f7930jsn67bc3343263f',
        'X-RapidAPI-Host': 'microsoft-translator-text.p.rapidapi.com'
    }
};

axios.request(options).then(function (response) {
    fs.writeFileSync("./languages.json", JSON.stringify(response.data.translation))
    console.log(response.data);
}).catch(function (error) {
    console.error(error);
});