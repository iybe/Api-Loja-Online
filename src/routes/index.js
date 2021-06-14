const { Router } = require('express');

const CategoriaController = require('../controllers/CategoriaController');
const MarcaController = require('../controllers/MarcaController');
const ProdutoController = require('../controllers/ProdutoController');
const ImagemProdutoController = require('../controllers/ImagemProdutoController');
const UsuarioController = require('../controllers/UsuarioController');
const EndereçoController = require('../controllers/EndereçoController');
const AdminController = require('../controllers/AdminController');
const FreteController = require('../controllers/FreteController');
const EstoqueController = require('../controllers/EstoqueController');
const VendaController = require('../controllers/VendaController');

const authAdmin = require('../middlewares/authAdmin');

const routes = Router();

routes.use('/categoria', CategoriaController);
routes.use('/marca', MarcaController);
routes.use('/produto', ProdutoController);
routes.use('/imagemProduto', ImagemProdutoController);
routes.use('/usuario', UsuarioController);
routes.use('/endereco', EndereçoController);
routes.use('/admin', AdminController);
routes.use('/frete', FreteController);
routes.use('/estoque', authAdmin, EstoqueController);
routes.use('/venda', VendaController);

module.exports = routes;
