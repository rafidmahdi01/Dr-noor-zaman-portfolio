export interface ResearchProject {
  id: number;
  title: string;
  description?: string;
  period: string;
  role: 'Project Leader' | 'Sub-Project Leader' | 'Co-researcher';
  type: 'International' | 'National';
  grantNumber?: string;
  funding?: string;
  institution: string;
}

export const researchProjects: ResearchProject[] = [
  {
    id: 1,
    title: "SAHARA-A Semantic Disaster Management System",
    description: "Funded by KACST, Kingdom of Saudi Arabia",
    period: "2012 to 2013",
    role: "Project Leader",
    type: "International",
    grantNumber: "11-INF1814-06",
    funding: "SR 1,000,000",
    institution: "KACST, Saudi Arabia"
  },
  {
    id: 2,
    title: "Designing of Energy Efficient Routing Protocol for improving life cycle and Efficiency Enhancement of Wireless Sensor Network (WSN)",
    description: "Funded by Deanship of Scientific Research, King Faisal University",
    period: "2009 to 2010",
    role: "Project Leader",
    type: "International",
    grantNumber: "100141",
    funding: "SR 97,900",
    institution: "King Faisal University"
  },
  {
    id: 3,
    title: "Designing of energy-aware Quality of Service (QoS) based routing protocol for efficiency improvement in Wireless Sensor Network (WSN)",
    description: "Funded by Deanship of Scientific Research, King Faisal University",
    period: "2010 to 2011",
    role: "Project Leader",
    type: "International",
    grantNumber: "110099",
    funding: "SR 97,900",
    institution: "King Faisal University"
  },
  {
    id: 4,
    title: "Designing Secure Routing in Wireless Sensor Networks for Increasing Reliability and Scalability of (WSN)",
    description: "Funded by Deanship of Scientific Research, King Faisal University",
    period: "2010 to 2011",
    role: "Project Leader",
    type: "International",
    grantNumber: "110094",
    funding: "SR 96,100",
    institution: "King Faisal University"
  },
  {
    id: 5,
    title: "New Characterizations of Two-Dimensional Cellular Automata and its Applications in Image Analysis",
    description: "Funded by Deanship of Scientific Research, King Faisal University",
    period: "2010 to 2011",
    role: "Co-researcher",
    type: "International",
    grantNumber: "110141",
    funding: "SR 91,100",
    institution: "King Faisal University"
  },
  {
    id: 6,
    title: "Proposing Secured & Reliable Wireless Sensor Network (WSN) Based System for Critical Pipeline Infrastructure",
    description: "Funded by Deanship of Scientific Research, King Faisal University",
    period: "2011 to 2012",
    role: "Project Leader",
    type: "International",
    grantNumber: "120127",
    funding: "SR 119,900",
    institution: "King Faisal University"
  },
  {
    id: 7,
    title: "Development of Distance Parallel Computing Infrastructure for on-line High-Performance Computing Applications",
    description: "Funded by Deanship of Scientific Research, King Faisal University",
    period: "2011 to 2012",
    role: "Co-researcher",
    type: "International",
    grantNumber: "120141",
    funding: "SR 119,900",
    institution: "King Faisal University"
  },
  {
    id: 8,
    title: "Simulation of Crowds at Jamarat",
    description: "Funded by Deanship of Scientific Research, King Faisal University",
    period: "2012 to 2013",
    role: "Sub-Project Leader",
    type: "International",
    grantNumber: "130100",
    funding: "SR 98,400",
    institution: "King Faisal University"
  },
  {
    id: 9,
    title: "Proposing a Reliable Solution to Assist the Blind Community based on Wireless Sensor Networks and Global Positioning System",
    description: "Funded by Deanship of Scientific Research, King Faisal University",
    period: "2012 to 2013",
    role: "Sub-Project Leader",
    type: "International",
    grantNumber: "130097",
    funding: "SR 99,900",
    institution: "King Faisal University"
  },
  {
    id: 10,
    title: "Localized Text Free User Interfaces",
    description: "Funded by Deanship of Scientific Research, King Faisal University",
    period: "2013 to 2014",
    role: "Project Leader",
    type: "International",
    grantNumber: "140102",
    funding: "SR 128,200",
    institution: "King Faisal University"
  },
  {
    id: 11,
    title: "A Novel Optimization to Medical Image Enhancement for Saudi Hospitals",
    description: "Funded by Deanship of Scientific Research, King Faisal University",
    period: "2013 to 2014",
    role: "Sub-Project Leader",
    type: "International",
    grantNumber: "140141",
    funding: "SR 89,400",
    institution: "King Faisal University"
  },
  {
    id: 12,
    title: "Intelligent Cloud-Based Collaborative Multi-Modal Disease Diagnostic System",
    description: "Funded by Deanship of Scientific Research, King Faisal University",
    period: "2013 to 2014",
    role: "Project Leader",
    type: "International",
    grantNumber: "140141",
    funding: "SR 97,400",
    institution: "King Faisal University"
  },
  {
    id: 13,
    title: "An Improved Software Development Process for Small and Medium Software Development Enterprises",
    description: "Funded by Deanship of Scientific Research, King Faisal University",
    period: "2013 to 2014",
    role: "Sub-Project Leader",
    type: "International",
    grantNumber: "140151",
    funding: "SR 99,400",
    institution: "King Faisal University"
  },
  {
    id: 14,
    title: "QoS Performance Analytical Models for Wireless Sensor Networks with realistic traffic assumptions",
    description: "Funded by Deanship of Scientific Research, King Faisal University",
    period: "2014 to 2015",
    role: "Project Leader",
    type: "International",
    grantNumber: "150191",
    funding: "SR 67,400",
    institution: "King Faisal University"
  },
  {
    id: 15,
    title: "Performance Evaluation of Polling Models under Self-Similar Traffic Patterns",
    description: "Funded by Deanship of Scientific Research, King Faisal University",
    period: "2014 to 2015",
    role: "Sub-Project Leader",
    type: "International",
    grantNumber: "150217",
    funding: "SR 82,400",
    institution: "King Faisal University"
  },
  {
    id: 16,
    title: "Three Factor Smart Phone Authentication Protocol for Command & Control",
    description: "Funded by Deanship of Scientific Research, King Faisal University",
    period: "2015 to 2016",
    role: "Project Leader",
    type: "International",
    grantNumber: "1600091",
    funding: "SR 44,400",
    institution: "King Faisal University"
  },
  {
    id: 17,
    title: "Enhancing ovarian cancer identification in ovarian imaging analysis",
    description: "Funded by Deanship of Scientific Research, King Faisal University",
    period: "2015 to 2016",
    role: "Sub-Project Leader",
    type: "International",
    grantNumber: "160092",
    funding: "SR 53,400",
    institution: "King Faisal University"
  },
  {
    id: 18,
    title: "Biologically inspired Energy Harvesting in Wireless Ad Hoc Networks using Solar and ZigBee Technology",
    description: "Funded by University Internal Funding (URIF), University Technology Petronas Malaysia",
    period: "2014 to 2016",
    role: "Co-researcher",
    type: "International",
    grantNumber: "UTP/RID/-0004",
    funding: "MR 150,400",
    institution: "University Technology Petronas Malaysia"
  },
  {
    id: 19,
    title: "The Global Software Development (GSD) and Latest Software Development Trends in Gulf region",
    description: "Funded by Deanship of Scientific Research, King Faisal University",
    period: "2018 to 2019",
    role: "Sub-Project Leader",
    type: "International",
    grantNumber: "180056",
    funding: "SR 34,000",
    institution: "King Faisal University"
  },
  {
    id: 20,
    title: "Generic Consensus Model for Improving Nodes Syndicating Performance in Blockchain",
    description: "FRGS, funded by Ministry, the government of Malaysia",
    period: "2019 to 2020",
    role: "Project Leader",
    type: "National",
    grantNumber: "FRGS/1/2019/ICT01/UTP/02/1",
    funding: "RM 63,800.00",
    institution: "Ministry of Malaysia"
  },
  {
    id: 21,
    title: "Knowledge exchange on the opportunities and challenges of implementing UK-based smart city governance initiative in Malaysia",
    description: "International level project with collaboration with UK",
    period: "2019 to 2020",
    role: "Project Leader",
    type: "International",
    grantNumber: "HEPP/1/2019/SOCIT/001",
    funding: "RM 20,000",
    institution: "Taylor's University & UK"
  },
  {
    id: 22,
    title: "Environmental Monitoring in Underground Mines Using Sensor-enabled Internet of Things",
    description: "ASEAN-India Collaborative R&D scheme under ASEAN-India S&T Development Fund (AISTDF) International level project in collaboration with Malaysia, India and Vietnam",
    period: "2021 to 2022",
    role: "Co-researcher",
    type: "International",
    grantNumber: "CRD/2020/000284",
    funding: "INR 10,00000",
    institution: "ASEAN-India"
  },
  {
    id: 23,
    title: "End To End UAV guided smart inventory control using a deep learning framework for barcode localization and Decoding",
    description: "Distinguished Researcher Grant, Deanship of Research and Innovation, University of Jeddah, Saudi Arabia",
    period: "2024",
    role: "Project Leader",
    type: "International",
    grantNumber: "UJ-24-DR-3263-1",
    institution: "University of Jeddah"
  },
  {
    id: 24,
    title: "Proposing Machine Learning Model to Detect the Colon Cancer Cells",
    description: "Taylor's Internal Research Grant Scheme - Impact Lab Grant, Taylor's University, Malaysia",
    period: "2024",
    role: "Co-researcher",
    type: "National",
    grantNumber: "TIRGS-ILG/1/2023/SCS/001",
    institution: "Taylor's University"
  },
  {
    id: 25,
    title: "Real time Security, health and Privacy monitoring for Saudi Highways Using Cutting-edge Technologies",
    description: "Distinguished Researcher Program by the Deanship of Scientific Research, Al Jouf University, Saudi Arabia",
    period: "2021",
    role: "Project Leader",
    type: "International",
    grantNumber: "DSR-2021-02-0323",
    funding: "SAR 110,000.00",
    institution: "Al Jouf University"
  },
  {
    id: 26,
    title: "Logic learning machine for smart traffic system",
    description: "Distinguished Researcher Program by the Deanship of Scientific Research, Al Jouf University, Saudi Arabia",
    period: "2021",
    role: "Project Leader",
    type: "International",
    grantNumber: "DSR-2021-02-0324",
    funding: "SAR 100,000.00",
    institution: "Al Jouf University"
  },
  {
    id: 27,
    title: "Smart Traffic management system for metropolitan cities of the Kingdom using cutting-edge technologies",
    description: "Distinguished Researcher Program by the Deanship of Scientific Research, Al Jouf University, Saudi Arabia",
    period: "2021",
    role: "Project Leader",
    type: "International",
    grantNumber: "DSR-2021-02-0325",
    funding: "SAR 120,000.00",
    institution: "Al Jouf University"
  },
  {
    id: 28,
    title: "Agent-based medical health monitoring system",
    description: "Distinguished Researcher Program by the Deanship of Scientific Research, Al Jouf University, Saudi Arabia",
    period: "2021",
    role: "Project Leader",
    type: "International",
    grantNumber: "DSR-2021-02-0326",
    funding: "SAR 105,000.00",
    institution: "Al Jouf University"
  },
  {
    id: 29,
    title: "Autonomous traffic system for emergency vehicles",
    description: "Distinguished Researcher Program by the Deanship of Scientific Research, Al Jouf University, Saudi Arabia",
    period: "2021",
    role: "Project Leader",
    type: "International",
    grantNumber: "DSR-2021-02-0327",
    funding: "SAR 100,000.00",
    institution: "Al Jouf University"
  },
  {
    id: 30,
    title: "Superlative feature selection-based image classification using deep learning in medical imaging",
    description: "Distinguished Researcher Program by the Deanship of Scientific Research, Al Jouf University, Saudi Arabia",
    period: "2021",
    role: "Project Leader",
    type: "International",
    grantNumber: "DSR-2021-02-0328",
    funding: "SAR 900,000.00",
    institution: "Al Jouf University"
  },
  {
    id: 31,
    title: "A Deep Learning Framework for Cancer Risk Prediction",
    description: "Distinguished Researcher Program by the Deanship of Scientific Research, Al Jouf University, Saudi Arabia",
    period: "2021",
    role: "Project Leader",
    type: "International",
    grantNumber: "DSR-2021-02-0329",
    funding: "SAR 800,000.00",
    institution: "Al Jouf University"
  },
  {
    id: 32,
    title: "A transfer learning approach with a convolutional neural network for classification of lung disease",
    description: "Distinguished Researcher Program by the Deanship of Scientific Research, Al Jouf University, Saudi Arabia",
    period: "2021",
    role: "Project Leader",
    type: "International",
    grantNumber: "DSR-2021-02-0330",
    funding: "SAR 850,000.00",
    institution: "Al Jouf University"
  },
  {
    id: 33,
    title: "Securing Drug Distribution System from tampering using Blockchain",
    description: "Distinguished Researcher Program by the Deanship of Scientific Research, Al Jouf University, Saudi Arabia",
    period: "2021",
    role: "Project Leader",
    type: "International",
    grantNumber: "DSR-2021-02-0331",
    funding: "SAR 880,000.00",
    institution: "Al Jouf University"
  },
  {
    id: 34,
    title: "Green energy systems for smart cities using IoT",
    description: "Distinguished Researcher Program by the Deanship of Scientific Research, Al Jouf University, Saudi Arabia",
    period: "2021",
    role: "Project Leader",
    type: "International",
    grantNumber: "DSR-2021-02-0332",
    funding: "SAR 990,000.00",
    institution: "Al Jouf University"
  },
  {
    id: 35,
    title: "Contextual sentiment analysis for social media",
    description: "Distinguished Researcher Program by the Deanship of Scientific Research, Al Jouf University, Saudi Arabia",
    period: "2022",
    role: "Project Leader",
    type: "International",
    grantNumber: "DSR2022-RG-0105",
    funding: "SAR 111,000.00",
    institution: "Al Jouf University"
  },
  {
    id: 36,
    title: "Using Machine Learning to Analyze the Relationship Between Body Fat Distribution Patterns and Body Mass Index in Predicting the Likelihood of Obesity",
    description: "Ministry of National Guard – Health Affairs, with Collaboration with King Abdullah International Medical Research Centre (KAIMRC), Al Ahsa, Saudi Arabia",
    period: "2023",
    role: "Project Leader",
    type: "International",
    grantNumber: "UNRC23A/025/03",
    funding: "SAR 150,000.00",
    institution: "King Abdullah International Medical Research Centre"
  }
];
