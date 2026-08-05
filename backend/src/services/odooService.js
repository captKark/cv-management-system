const odoo = require("../lib/odooClient");

const findPartner = async (email) => {
  const ids = await odoo.execute(
    "res.partner",
    "search",
    [
      [
        ["email", "=", email],
      ],
    ],
  );

  if (!ids.length) {
    return null;
  }

  return ids[0];
};

const createPartner = async (candidate) => {
  return odoo.execute(
    "res.partner",
    "create",
    [
      {
        name: candidate.name,
        email: candidate.email,
        phone: candidate.phone,
        company_name: candidate.company,
        customer_rank: 1,
      },
    ],
  );
};

const updatePartner = async (
  id,
  candidate,
) => {
  return odoo.execute(
    "res.partner",
    "write",
    [
      [id],
      {
        name: candidate.name,
        phone: candidate.phone,
        company_name: candidate.company,
      },
    ],
  );
};

const exportCandidate = async (
  candidate,
) => {
  const partnerId =
    await findPartner(candidate.email);

  if (partnerId) {
    await updatePartner(
      partnerId,
      candidate,
    );

    return {
      action: "updated",
      id: partnerId,
    };
  }

  const id = await createPartner(
    candidate,
  );

  return {
    action: "created",
    id,
  };
};

module.exports = {
  exportCandidate,
};