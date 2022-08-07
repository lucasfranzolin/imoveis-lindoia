const dotenv = require('dotenv');

module.exports = async ({ resolveVariable }) => {
    const stage = await resolveVariable('sls:stage');
    const NODE_ENV = stage.endsWith('dev') ? 'development' : 'production';
    const envVars = dotenv.config({ path: `.env.${NODE_ENV}` }).parsed;
    Object.assign(envVars, { NODE_ENV });
    return envVars;
};
