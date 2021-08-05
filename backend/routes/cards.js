const router = require('express').Router();
const { celebrate } = require('celebrate');
const cardSchema = require('../schemas/cardShema');
const {
  getCards, createCard, deleteCard, likeCard,
} = require('../controllers/cards');

router.get('/', getCards);
router.post('/', celebrate(cardSchema.card), createCard);
router.delete('/:cardId', celebrate(cardSchema.id), deleteCard);
router.put('/likes/:cardId', celebrate(cardSchema.id), likeCard);
router.delete('/likes/:cardId', celebrate(cardSchema.id), likeCard);

module.exports = router;
