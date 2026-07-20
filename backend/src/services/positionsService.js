const positions = [
     {
    id: 1,
    title: "Frontend Developer",
    department: "Engineering",
    location: "Remote",
    status: "Active",
  },
  {
    id: 2,
    title: "Data Analyst",
    department: "Analytics",
    location: "New York, NY",
    status: "Interviewing",
  },
  {
    id: 3,
    title: "Product Manager",
    department: "Product",
    location: "London, UK",
    status: "On Hold",
  },
  {
    id: 4,
    title: "HR Generalist",
    department: "Human Resources",
    location: "Austin, TX",
    status: "Active",
  },
  {
    id: 5,
    title: "DevOps Engineer",
    department: "Engineering",
    location: "Remote",
    status: "Closed",
  },
  {
    id: 6,
    title: "Systems Administrator",
    department: "Infrastructure",
    location: "Berlin",
    status: "Active",
  },
  {
    id: 7,
    title: "Backend Engineer",
    department: "Engineering",
    location: "Remote",
    status: "Active",
  },
  {
    id: 8,
    title: "Fullstack Developer",
    department: "Engineering",
    location: "San Francisco, CA",
    status: "Interviewing",
  },
  {
    id: 9,
    title: "QA Automation Engineer",
    department: "Quality Assurance",
    location: "Remote",
    status: "Active",
  },
  {
    id: 10,
    title: "Product Designer",
    department: "Product",
    location: "London, UK",
    status: "On Hold",
  },
  {
    id: 11,
    title: "Scrum Master",
    department: "Product",
    location: "Remote",
    status: "Active",
  },
  {
    id: 12,
    title: "Talent Acquisition Specialist",
    department: "Human Resources",
    location: "Austin, TX",
    status: "Active",
  },
  {
    id: 13,
    title: "Financial Analyst",
    department: "Finance",
    location: "New York, NY",
    status: "Interviewing",
  },
  {
    id: 14,
    title: "Security Engineer",
    department: "Infrastructure",
    location: "Remote",
    status: "Active",
  },
  {
    id: 15,
    title: "Cloud Architect",
    department: "Infrastructure",
    location: "Seattle, WA",
    status: "Closed",
  },
  {
    id: 16,
    title: "Technical Writer",
    department: "Product",
    location: "Remote",
    status: "Active",
  },
  {
    id: 17,
    title: "Data Engineer",
    department: "Analytics",
    location: "Austin, TX",
    status: "Active",
  },
  {
    id: 18,
    title: "Compensation Specialist",
    department: "Human Resources",
    location: "Remote",
    status: "On Hold",
  },
];

const getAllPositions = () => {
  return positions;
};

const createPosition = (position) => {
  const nextId =
    positions.length > 0
      ? positions[positions.length - 1].id + 1
      : 1;

  const newPosition = {
    id: nextId,
    ...position,
  };

  positions.push(newPosition);

  return newPosition;
};

const updatePosition = (id, updatedData) => {
  const index = positions.findIndex((position) => position.id === id);

  if (index === -1) {
    return null;
  }

  const updatedPosition = {
    ...positions[index],
    ...updatedData,
    id,
  };

  positions[index] = updatedPosition;

  return updatedPosition;
};

module.exports = {
  getAllPositions,
  createPosition,
  updatePosition,
};