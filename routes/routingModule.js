const router = require('express').Router();

const homeController = require('../controllers/homeController');

router.get('/', homeController.home);
router.get('/comprar/:item', homeController.comprar);

module.exports = router;