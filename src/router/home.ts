import { Router } from 'express';
import { ExtraRequest } from '../app';

const router = Router();

router.get('/', (req, resp) => {
    const calc = (req as ExtraRequest).calculo;
    resp.end(`App Express - usuarios ${calc.toLocaleString()}`);
});

export default router;
