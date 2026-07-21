const cvs = [
  {
    id: 1,
    candidateName: "John Smith",
    positionId: 1,
    positionTitle: "Frontend Developer",
    status: "Draft",
    updatedAt: "2026-07-21",
  },
  {
    id: 2,
    candidateName: "Jane Doe",
    positionId: 2,
    positionTitle: "Backend Developer",
    status: "Submitted",
    updatedAt: "2026-07-20",
  },
];

const getAllCVs = () => {
  return cvs;
};

const createCV = (cv) => {
  const nextId = cvs.length > 0 ? Math.max(...cvs.map((cv) => cv.id)) + 1 : 1;

  const newCV = {
    id: nextId,
    ...cv,
  };

  cvs.push(newCV);

  return newCV;
};

const updateCV = (id, updatedData) => {
  const index = cvs.findIndex((cv) => cv.id === Number(id));

  if (index === -1) {
    return null;
  }

  const updatedCV = {
    ...cvs[index],
    ...updatedData,
    id,
  };

  cvs[index] = updatedCV;

  return updatedCV;
};

const deleteCVs = (ids) => {
  const initialLength = cvs.length;

  for (let i = cvs.length - 1; i >= 0; i--) {
    if (ids.includes(cvs[i].id)) {
      cvs.splice(i, 1);
    }
  }

  return initialLength - cvs.length;
};

module.exports = {
  getAllCVs,
  createCV,
  updateCV,
  deleteCVs,
};
