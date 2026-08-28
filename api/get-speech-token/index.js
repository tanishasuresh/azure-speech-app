const axios = require('axios');

module.exports = async function (context, req) {
    const key = process.env.SPEECH_KEY;
    const region = process.env.SPEECH_REGION;

    try {
        const response = await axios.post(
            `https://${region}.api.cognitive.microsoft.com/sts/v1.0/issueToken`,
            null,
            {
                headers: {
                    'Ocp-Apim-Subscription-Key': key,
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            }
        );
        
        context.res = {
            status: 200,
            body: { token: response.data, region: region }
        };
    } catch (err) {
        context.res = {
            status: 500,
            body: "Could not fetch speech token."
        };
    }
};