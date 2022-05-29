import { isTestEnv } from './environment';

const testPort = 3005
const developmentPort = 3001

const defaultPort = isTestEnv ? testPort : developmentPort;

export default process.env.PORT || defaultPort;
