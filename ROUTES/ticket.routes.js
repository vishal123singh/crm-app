const { createTicket, updateTicket, getAllTickets } = require('../CONTROLLERS/ticket.controller');
const { verifyToken, isAdmin } = require('../MIDDLEWARES/auth.middleware');

const router = require('express').Router();

router.post('/crm/api/ticket_creation',verifyToken, createTicket);

router.post('/crm/api/ticket_status/:id', verifyToken, updateTicket);

router.get('/crm/api/tickets/all', verifyToken, getAllTickets);

module.exports = { ticketRoutes: router };