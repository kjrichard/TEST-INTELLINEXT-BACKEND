
import { insert } from './helpers/insertDataset.helper';
import Server from './server';


async function init() {
    const server = new Server();
    server.listen();
    insert();

}


init();

