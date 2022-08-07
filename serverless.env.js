const dotenv = require('dotenv');

module.exports = async ({ resolveVariable }) => {
    const NODE_ENV = await resolveVariable('sls:stage');
    const envVars = dotenv.config({ path: `.env.${NODE_ENV}` }).parsed;
    Object.assign(envVars, { NODE_ENV });
    return envVars;
};
