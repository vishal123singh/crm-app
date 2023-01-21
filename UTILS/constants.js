module.exports = {
  userTypes: {
    customer: "CUSTOMER",
    engineer: "ENGINEER",
    admin: "ADMIN",
  },
  userStatus: {
    pending: "PENDING",
    approved: "APPROVED",
    rejected: "REJECTED",
  },
  signUpFields: ["id", "name", "email", "password"],
  
  ticketStatus: {
    open: "OPEN",
    closed: "CLOSED",
    blocked: "BLOCKED",
    'in-progress':"IN-PROGRESS"
  }
};
