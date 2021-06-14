const { Router } = require('express');

const Endereço = require('../models/Endereço');
const authUsuario = require('../middlewares/authUsuario');
const authAdminORUser = require('../middlewares/authAdminORUser');

const router = Router();

router.post('/create', authUsuario, async (req, res) => {
  try {
    const endereçoCriado = await Endereço.create({
      ...req.body,
      IDUsuario: req.IDUsuario,
    });

    return res.send(endereçoCriado);
  } catch (error) {
    return res.status(400).send({ error: 'Falha ao criar Endereço'});
  }
});

router.get('/showByUsuario', authUsuario, async (req, res) => {
  const IDUsuario = req.IDUsuario;
  const endereços = await Endereço.find({ IDUsuario });
  if(!endereços){
    return res.json({ message: 'Usuario sem endereços' });
  }
  return res.json(endereços);
});

router.get('/index/:IDEndereco', authAdminORUser, async (req, res) => {
  const IDEndereço = req.params.IDEndereco;
  const endereço = await Endereço.findById(IDEndereço);
  if(!endereço){
    return res.json({ message: 'Endereço não encontrado' });
  }
  return res.json(endereço);
});

router.delete('/delete/:IDEndereco', authUsuario, async (req, res) => {
  const IDEndereço = req.params.IDEndereco;
  const endereço = await Endereço.findByIdAndRemove(IDEndereço);
  if(!endereço){
    return res.json({ message: 'Endereço não encontrado' });
  }
  return res.json({ message: 'Endereço removido' });
});

router.put('/update/:IDEndereco', authUsuario, async (req, res) => {
  const IDEndereço = req.params.IDEndereco;
  const data = req.body;
  try {
    const endereço = await Endereço.findByIdAndUpdate(IDEndereço, {
      ...data,
      updated: Date.now()
    }, { new: true });
    if(!endereço){
      return res.json({ message: 'Endereço não encontrado' });
    }
    return res.json({ message: 'Endereço atualizado' });
  } catch (error) {
    return res.status(400).json({ message: 'Erro ao buscar Endereço' });
  }

});


module.exports = router;
