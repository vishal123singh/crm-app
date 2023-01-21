const { User } = require("../MODELS/user.model");
const { Ticket } = require("../MODELS/ticket.model");
const constants = require("../UTILS/constants");

exports.createTicket = async (req, res) => {
  const { title, description, ticketPriority, status, userId } = req.body;

  try {
    const engineer = await User.find({
      $and: [
        { userType: constants.userTypes.engineer },
        { userStatus: constants.userStatus.approved },
      ],
    });

    let ticket = {
      title: title,
      description: description,
      ticketPriority: ticketPriority,
      status: status.toUpperCase(),
      reporter: userId,
      assignee: engineer[0].userId,
    };

    ticket = await Ticket.create(ticket);
    console.log(ticket);
    const user = await User.findOne({ userId: userId });

    user.ticketsCreated.push(ticket._id);
    await user.save();

    engineer[0].assignedTickets.push(ticket._id);
    await engineer[0].save();

    res.status(201).send({ msg: "ticket created", myTicket: ticket });
  } catch (error) {
    res.status(500).send({ msg: "Internal Server Error" });
  }
};

exports.updateTicket = async (req, res) => {
  try {
    const ticket = await Ticket.findOne({ _id: req.params.id });

    if (
      req.userType == constants.userTypes.admin &&
      req.userStatus == constants.userStatus.approved
    ) {
      if (req.body.assignee != ticket.assignee) {
        let engineer = await findOne({ userId: req.body.assignee });
        if (engineer) {
          ticket.assignee = req.body.assignee;
        } else {
          res.send({ msg: "No engineer has been found with the given id" });
        }
      } else {
        res.send({
          msg: "Can't assign the ticket to someone who already has it assigned to him/her",
        });
      }
    } else if (
      req.userType == constants.userTypes.engineer &&
      req.userStatus == constants.userStatus.approved
    ) {
      if (req.body.status == constants.ticketStatus.closed) {
        ticket.status = req.body.status;
      }
      if (req.body.title) {
        ticket.title = req.body.title;
      }
      if (req.body.description) {
        ticket.description = req.body.description;
      }
    } else {
      let pattern = /[1-4]/;
      if (req.body.priority.toString().match(pattern)) {
        ticket.ticketPriority = req.body.priority;
      }
      if (req.body.status == constants.ticketStatus.closed) {
        ticket.status = req.body.status;
      }
      if (req.body.title) {
        ticket.title = req.body.title;
      }
      if (req.body.description) {
        ticket.description = req.body.description;
      }
    }

    ticket.updationDate = new Date().toLocaleDateString();
    ticket.updationTime = new Date().toLocaleTimeString();

    await ticket.save();

    res.status(200).send({ msg: "Ticket got updated successfully", ticket });
  } catch (err) {
    console.log(err);
    res.status(500).send({ msg: "Internal Server Error" });
  }
};

exports.getAllTickets = async (req, res) => {
  const { status, priority } = req.query;
  const creationDate = new Date(
    req.query.creationDate.toString()
  ).toLocaleDateString();

  try {
    let tickets;
    tickets = await Ticket.find({});

    if (status) {
      tickets = tickets.filter((ticket) => {
        return ticket.status == status.toUpperCase();
      });
    }
    if (creationDate) {
      tickets = tickets.filter((ticket) => {
        return ticket.creationDate == creationDate;
      });
    }
    if (priority) {
      tickets = tickets.filter((ticket) => {
        return ticket.ticketPriority == priority;
      });
    }

    res.send(tickets);
  } catch (error) {
    console.log(error);
    res.status(500).send({ msg: "Internal server error" });
  }
};

exports.getOneTicket = async (req, res) => {};
