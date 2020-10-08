const router = require('express').Router();

const homeController = require('../controllers/homeController');

router.get('/', homeController.home);
router.get('/comprar/:item', homeController.comprar);
router.get('/payment/failure', homeController.payFailure);
router.get('/payment/pending', homeController.payPending);
router.get('/payment/success', homeController.paySuccess);

module.exports = router;