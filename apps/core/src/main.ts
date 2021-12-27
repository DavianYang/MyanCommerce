import { bootstrap } from './app/bootstrap';
import { config } from './environments/environment';

bootstrap(config).catch(err => {
    console.log(err);
});
