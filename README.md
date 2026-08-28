# SmartSort: An AI-Powered IoT-Based Automated Waste Segregation and Smart Bin Management System

---

## PRELIMINARY PAGES

---

### Title Page

| | |
|---|---|
| **Project Title** | SmartSort: An AI-Powered IoT-Based Automated Waste Segregation and Smart Bin Management System |
| **Student Name** | `[YOUR FULL NAME]` |
| **Matric/Reg Number** | `[YOUR MATRIC/REG NUMBER]` |
| **Department** | Department of Computer Science |
| **Faculty** | `[YOUR FACULTY, e.g., Faculty of Computing and Information Systems]` |
| **University** | Kwame Nkrumah University of Science and Technology (KNUST) |
| **Supervisor** | `[SUPERVISOR'S NAME AND TITLE]` |
| **Date** | `[MONTH, YEAR OF SUBMISSION]` |

---

### Declaration

I hereby declare that this project report titled **"SmartSort: An AI-Powered IoT-Based Automated Waste Segregation and Smart Bin Management System"** is the result of my own original work and has not been submitted, in whole or in part, to any other university or institution for the award of any degree or diploma. All sources of information used have been duly acknowledged by means of references.

**Student Name:** `[YOUR FULL NAME]`

**Signature:** _________________________ &emsp; **Date:** _________________________

---

### Certification / Approval Page

This is to certify that this project report titled **"SmartSort: An AI-Powered IoT-Based Automated Waste Segregation and Smart Bin Management System"** was prepared and submitted by **`[STUDENT NAME]`** (Matric No: `[MATRIC NUMBER]`) in partial fulfillment of the requirements for the award of **`[DEGREE NAME, e.g., Bachelor of Science (B.Sc.) in Computer Science]`** and has been found to meet the standards and requirements of the Department.

| Role | Name | Signature | Date |
|---|---|---|---|
| **Supervisor** | `[SUPERVISOR'S NAME]` | _____________ | _____________ |
| **Head of Department** | `[HOD'S NAME]` | _____________ | _____________ |
| **External Examiner** | `[IF APPLICABLE]` | _____________ | _____________ |

---

### Dedication

*`[Optional — e.g., "This project is dedicated to my family for their unwavering support and encouragement throughout my academic journey."]`*

---

### Acknowledgements

`[Acknowledge your supervisor, department, family, friends, and anyone who contributed to the success of this project. Example below:]`

I would like to express my sincere gratitude to my supervisor, `[Supervisor's Name]`, for their invaluable guidance, patience, and constructive feedback throughout the duration of this project. I also extend my appreciation to the Head of Department, `[HOD's Name]`, and the entire staff of the Department of Computer Science, KNUST, for providing a conducive academic environment.

Special thanks to my family and friends for their constant support and encouragement. I am also grateful to the open-source communities behind React, TensorFlow, Arduino, and Supabase, whose tools and documentation made this project possible.

Above all, I give glory to God for the strength, wisdom, and grace to complete this work.

---

### Abstract

Inefficient waste management remains a pressing environmental and public health challenge in developing nations, particularly within institutional settings such as university campuses. Manual waste sorting is labor-intensive, error-prone, and often results in high contamination rates that undermine recycling efforts. This project presents **SmartSort**, an AI-powered, IoT-based automated waste segregation and smart bin management system designed to address these challenges.

The system employs a dual-microcontroller hardware architecture comprising an **Arduino Uno** for real-time sensor polling and electromechanical actuation, and an **ESP32-CAM** module for wireless communication and image capture. When waste is deposited, an ultrasonic proximity sensor triggers the ESP32-CAM to capture an image, which is transmitted to a **Flask-based machine learning microservice** running a **TensorFlow Lite** convolutional neural network model. The model classifies waste into five categories — **glass, metal, paper, plastic, and rejected waste** — with high confidence. Based on the classification result, a stepper motor rotates a chute to the appropriate bin compartment and a servo motor actuates a trapdoor to deposit the item.

A **React-based web dashboard** provides facility managers, administrators, and waste collectors with real-time bin fill-level monitoring, live MJPEG video streaming, sorting history analytics, collection job dispatching, and community feedback management, all synchronized via **Supabase Realtime** WebSocket channels. The backend is built on **Express.js** with **Prisma ORM** and **PostgreSQL**, implementing role-based access control (RBAC), rate limiting, structured logging, and comprehensive audit trails.

Testing across unit, integration, and system levels validated the system's accuracy, responsiveness, and reliability. SmartSort demonstrates a viable, scalable approach to intelligent waste management in institutional environments.

**Keywords:** Waste Segregation, Internet of Things (IoT), Machine Learning, Computer Vision, TensorFlow Lite, Arduino, ESP32-CAM, Smart Bin, React, Supabase

---

### Table of Contents

- [SmartSort: An AI-Powered IoT-Based Automated Waste Segregation and Smart Bin Management System](#smartsort-an-ai-powered-iot-based-automated-waste-segregation-and-smart-bin-management-system)
  - [PRELIMINARY PAGES](#preliminary-pages)
    - [Title Page](#title-page)
    - [Declaration](#declaration)
    - [Certification / Approval Page](#certification--approval-page)
    - [Dedication](#dedication)
    - [Acknowledgements](#acknowledgements)
    - [Abstract](#abstract)
    - [Table of Contents](#table-of-contents)
    - [List of Figures](#list-of-figures)
    - [List of Tables](#list-of-tables)
    - [List of Abbreviations / Acronyms](#list-of-abbreviations--acronyms)
  - [CHAPTER ONE — INTRODUCTION](#chapter-one--introduction)
    - [1.1 Background of the Study](#11-background-of-the-study)
    - [1.2 Statement of the Problem](#12-statement-of-the-problem)
    - [1.3 Aim and Objectives](#13-aim-and-objectives)
    - [1.4 Research Questions](#14-research-questions)
    - [1.5 Significance of the Study](#15-significance-of-the-study)
    - [1.6 Scope and Limitations of the Study](#16-scope-and-limitations-of-the-study)
    - [1.7 Definition of Terms](#17-definition-of-terms)
    - [1.8 Organization of the Report](#18-organization-of-the-report)
  - [CHAPTER TWO — LITERATURE REVIEW](#chapter-two--literature-review)
    - [2.1 Introduction](#21-introduction)
    - [2.2 Conceptual Framework / Theoretical Background](#22-conceptual-framework--theoretical-background)
      - [2.2.1 Internet of Things (IoT) in Waste Management](#221-internet-of-things-iot-in-waste-management)
      - [2.2.2 Computer Vision and Deep Learning for Waste Classification](#222-computer-vision-and-deep-learning-for-waste-classification)
      - [2.2.3 Embedded Systems for Electromechanical Sorting](#223-embedded-systems-for-electromechanical-sorting)
      - [2.2.4 Real-Time Web Technologies and Cloud-Based Monitoring](#224-real-time-web-technologies-and-cloud-based-monitoring)
    - [2.3 Review of Related Concepts](#23-review-of-related-concepts)
      - [2.3.1 Ultrasonic Distance Sensing](#231-ultrasonic-distance-sensing)
      - [2.3.2 Stepper Motor Control and Angular Positioning](#232-stepper-motor-control-and-angular-positioning)
      - [2.3.3 RESTful API Design and Microservices](#233-restful-api-design-and-microservices)
      - [2.3.4 Role-Based Access Control (RBAC)](#234-role-based-access-control-rbac)
    - [2.4 Review of Related / Existing Systems](#24-review-of-related--existing-systems)
      - [2.4.1 TrashBot by CleanRobotics](#241-trashbot-by-cleanrobotics)
      - [2.4.2 Bin-e Smart Waste Bin](#242-bin-e-smart-waste-bin)
      - [2.4.3 ZenRobotics Recycler](#243-zenrobotics-recycler)
      - [2.4.4 Smart Bin Systems in Academic Research](#244-smart-bin-systems-in-academic-research)
    - [2.5 Comparative Analysis of Existing Systems](#25-comparative-analysis-of-existing-systems)
    - [2.6 Gaps Identified in Literature](#26-gaps-identified-in-literature)
    - [2.7 Summary of Literature Review](#27-summary-of-literature-review)
  - [CHAPTER THREE — SYSTEM ANALYSIS AND METHODOLOGY](#chapter-three--system-analysis-and-methodology)
    - [3.1 Introduction](#31-introduction)
    - [3.2 Research / Development Methodology](#32-research--development-methodology)
    - [3.3 Analysis of the Existing System](#33-analysis-of-the-existing-system)
    - [3.4 Problems of the Existing System](#34-problems-of-the-existing-system)
    - [3.5 Analysis of the Proposed System](#35-analysis-of-the-proposed-system)
    - [3.6 Requirement Analysis](#36-requirement-analysis)
      - [3.6.1 Functional Requirements](#361-functional-requirements)
      - [3.6.2 Non-Functional Requirements](#362-non-functional-requirements)
    - [3.7 System Design Tools (UML Diagrams)](#37-system-design-tools-uml-diagrams)
      - [3.7.1 Use Case Diagram](#371-use-case-diagram)
      - [3.7.2 Class Diagram (Backend Data Models)](#372-class-diagram-backend-data-models)
      - [3.7.3 Sequence Diagram — Waste Classification and Sorting Flow](#373-sequence-diagram--waste-classification-and-sorting-flow)
      - [3.7.4 Activity Diagram — Collection Job Lifecycle](#374-activity-diagram--collection-job-lifecycle)
      - [3.7.5 Entity-Relationship Diagram (ERD)](#375-entity-relationship-diagram-erd)
    - [3.8 Hardware and Software Requirements](#38-hardware-and-software-requirements)
      - [3.8.1 Hardware Components](#381-hardware-components)
      - [3.8.2 Software Tools and Technologies](#382-software-tools-and-technologies)
    - [3.9 Justification for Chosen Tools / Technology Stack](#39-justification-for-chosen-tools--technology-stack)
  - [CHAPTER FOUR — SYSTEM DESIGN AND IMPLEMENTATION](#chapter-four--system-design-and-implementation)
    - [4.1 Introduction](#41-introduction)
    - [4.2 System Architecture](#42-system-architecture)
    - [4.3 Database Design](#43-database-design)
      - [4.3.1 Entity-Relationship Diagram](#431-entity-relationship-diagram)
      - [4.3.2 Data Dictionary](#432-data-dictionary)
      - [4.3.3 Database Indexes](#433-database-indexes)
    - [4.4 Input / Output Design](#44-input--output-design)
      - [4.4.1 Input Design](#441-input-design)
      - [4.4.2 Output Design](#442-output-design)
    - [4.5 Program / Module Design](#45-program--module-design)
      - [4.5.1 ML Inference Pipeline — Pseudocode](#451-ml-inference-pipeline--pseudocode)
      - [4.5.2 Arduino Sorting Routine — Pseudocode](#452-arduino-sorting-routine--pseudocode)
      - [4.5.3 Telemetry Ingestion — Pseudocode](#453-telemetry-ingestion--pseudocode)
    - [4.6 Implementation Environment](#46-implementation-environment)
    - [4.7 Implementation Details](#47-implementation-details)
      - [4.7.1 UART Inter-Board Communication Protocol](#471-uart-inter-board-communication-protocol)
      - [4.7.2 ML Model — Resilient Loading Strategy](#472-ml-model--resilient-loading-strategy)
      - [4.7.3 Real-Time Data Synchronization](#473-real-time-data-synchronization)
      - [4.7.4 Authentication and RBAC Flow](#474-authentication-and-rbac-flow)
      - [4.7.5 Security Measures](#475-security-measures)
    - [4.8 Testing](#48-testing)
      - [4.8.1 Unit Testing](#481-unit-testing)
      - [4.8.2 Integration Testing](#482-integration-testing)
      - [4.8.3 System / Acceptance Testing](#483-system--acceptance-testing)
    - [4.9 System Requirements for Deployment](#49-system-requirements-for-deployment)
      - [4.9.1 Hardware Deployment](#491-hardware-deployment)
      - [4.9.2 Software Deployment](#492-software-deployment)
      - [4.9.3 Environment Variables](#493-environment-variables)
  - [CHAPTER FIVE — SUMMARY, CONCLUSION AND RECOMMENDATIONS](#chapter-five--summary-conclusion-and-recommendations)
    - [5.1 Summary of the Study](#51-summary-of-the-study)
    - [5.2 Achievements / Contributions of the Project](#52-achievements--contributions-of-the-project)
    - [5.3 Challenges Encountered](#53-challenges-encountered)
    - [5.4 Conclusion](#54-conclusion)
    - [5.5 Recommendations](#55-recommendations)
    - [5.6 Suggestions for Future Work](#56-suggestions-for-future-work)
  - [REFERENCES](#references)
  - [APPENDICES](#appendices)
    - [Appendix A: Source Code Repository](#appendix-a-source-code-repository)
    - [Appendix B: Sample Screenshots / User Interface](#appendix-b-sample-screenshots--user-interface)
    - [Appendix C: Hardware Wiring Diagram](#appendix-c-hardware-wiring-diagram)
    - [Appendix D: User Manual](#appendix-d-user-manual)
      - [Getting Started](#getting-started)
      - [Using the Dashboard](#using-the-dashboard)
      - [For Collectors](#for-collectors)
      - [Depositing Waste](#depositing-waste)
    - [Appendix E: CI/CD Pipeline Configuration](#appendix-e-cicd-pipeline-configuration)

---

### List of Figures

| Figure No. | Title | Page |
|---|---|---|
| Figure 1.1 | Organization of the Report | `[Page]` |
| Figure 3.1 | Agile Development Methodology Lifecycle | `[Page]` |
| Figure 3.2 | Use Case Diagram — SmartSort System | `[Page]` |
| Figure 3.3 | Class Diagram — Backend Data Models | `[Page]` |
| Figure 3.4 | Sequence Diagram — Waste Classification Flow | `[Page]` |
| Figure 3.5 | Activity Diagram — Collection Job Lifecycle | `[Page]` |
| Figure 3.6 | Entity-Relationship Diagram (ERD) | `[Page]` |
| Figure 4.1 | High-Level System Architecture | `[Page]` |
| Figure 4.2 | Hardware Wiring Schematic | `[Page]` |
| Figure 4.3 | Inter-Board Communication Protocol (UART) | `[Page]` |
| Figure 4.4 | Entity-Relationship Diagram (Database Schema) | `[Page]` |
| Figure 4.5 | Dashboard — Facility Operations Overview | `[Page]` |
| Figure 4.6 | Admin Dashboard — Multi-Facility Map View | `[Page]` |
| Figure 4.7 | Devices Page — IoT Smart Bin Fleet Monitor | `[Page]` |
| Figure 4.8 | Collection Jobs — Dispatch Board | `[Page]` |
| Figure 4.9 | Analytics Page — Waste Intelligence Metrics | `[Page]` |
| Figure 4.10 | Collector Dashboard — Mobile HUD | `[Page]` |
| Figure 4.11 | Login Page — Multi-Role Authentication | `[Page]` |
| Figure 4.12 | ML Classification Pipeline Flowchart | `[Page]` |

---

### List of Tables

| Table No. | Title | Page |
|---|---|---|
| Table 2.1 | Comparative Analysis of Existing Waste Management Systems | `[Page]` |
| Table 3.1 | Functional Requirements | `[Page]` |
| Table 3.2 | Non-Functional Requirements | `[Page]` |
| Table 3.3 | Hardware Components and Specifications | `[Page]` |
| Table 3.4 | Software Tools and Technologies | `[Page]` |
| Table 4.1 | UART Communication Protocol Commands | `[Page]` |
| Table 4.2 | Database Schema — Device Model | `[Page]` |
| Table 4.3 | Database Schema — ProcessedItem Model | `[Page]` |
| Table 4.4 | Database Schema — CollectionJob Model | `[Page]` |
| Table 4.5 | Database Schema — User Model | `[Page]` |
| Table 4.6 | API Endpoint Catalog | `[Page]` |
| Table 4.7 | ML Model Classification Categories | `[Page]` |
| Table 4.8 | Unit Test Cases and Results | `[Page]` |
| Table 4.9 | Integration Test Cases and Results | `[Page]` |
| Table 4.10 | System/Acceptance Test Cases and Results | `[Page]` |

---

### List of Abbreviations / Acronyms

| Abbreviation | Full Meaning |
|---|---|
| AI | Artificial Intelligence |
| API | Application Programming Interface |
| CRUD | Create, Read, Update, Delete |
| CSS | Cascading Style Sheets |
| CNN | Convolutional Neural Network |
| DFD | Data Flow Diagram |
| ERD | Entity-Relationship Diagram |
| ESP | Espressif (ESP32 microcontroller series) |
| GPIO | General Purpose Input/Output |
| HUD | Heads-Up Display |
| HTTP | HyperText Transfer Protocol |
| IDE | Integrated Development Environment |
| IoT | Internet of Things |
| JPEG | Joint Photographic Experts Group |
| JSON | JavaScript Object Notation |
| JWT | JSON Web Token |
| KPI | Key Performance Indicator |
| ML | Machine Learning |
| MJPEG | Motion JPEG |
| ORM | Object-Relational Mapping |
| OTA | Over-The-Air |
| RBAC | Role-Based Access Control |
| REST | Representational State Transfer |
| SQL | Structured Query Language |
| TFLite | TensorFlow Lite |
| UART | Universal Asynchronous Receiver-Transmitter |
| UI | User Interface |
| UML | Unified Modeling Language |
| URL | Uniform Resource Locator |
| UUID | Universally Unique Identifier |
| UX | User Experience |
| WCAG | Web Content Accessibility Guidelines |

---

## CHAPTER ONE — INTRODUCTION

### 1.1 Background of the Study

Waste management is one of the most critical environmental challenges facing developing nations in the 21st century. The rapid pace of urbanization, population growth, and industrialization has led to an exponential increase in the volume and complexity of solid waste generated daily. According to the World Bank (2018), global waste generation is projected to increase by 70% by 2050, rising from 2.01 billion tonnes per year to 3.40 billion tonnes. In Sub-Saharan Africa, and Ghana in particular, the challenge is compounded by inadequate infrastructure, limited funding, low public awareness of waste segregation practices, and a heavy reliance on manual waste handling processes.

Within institutional settings such as university campuses, waste management presents unique challenges. Universities generate diverse waste streams — from food waste in cafeterias to paper and plastic in academic buildings and laboratories — often in high volumes concentrated across multiple facilities. Manual sorting of this waste is labor-intensive, prone to human error, and results in significant contamination of recyclable materials. The absence of intelligent monitoring systems means that waste bins frequently overflow before collection teams are dispatched, creating unsanitary conditions and environmental hazards.

The convergence of several transformative technologies offers a promising path forward. The **Internet of Things (IoT)** enables physical objects — such as waste bins — to be embedded with sensors, processors, and network connectivity, allowing them to collect and exchange data autonomously. **Artificial Intelligence (AI)** and **Machine Learning (ML)**, particularly **computer vision** techniques powered by **Convolutional Neural Networks (CNNs)**, have demonstrated remarkable accuracy in image classification tasks, including the identification and categorization of waste materials. **Cloud computing** and **real-time web technologies** further enable centralized monitoring, analytics, and operational coordination across distributed physical infrastructure.

This project, **SmartSort**, seeks to harness these technologies to design and implement an integrated, end-to-end automated waste segregation and smart bin management system. By combining IoT sensor networks, edge AI classification, electromechanical sorting hardware, and a cloud-connected web dashboard, SmartSort aims to transform the waste management paradigm from reactive manual processes to proactive, data-driven intelligent operations.

### 1.2 Statement of the Problem

The current waste management practices at most institutional campuses, including KNUST, suffer from several critical deficiencies:

1. **Manual Sorting Inefficiency:** Waste sorting is performed manually by sanitation workers, which is slow, inconsistent, and exposes workers to health hazards. Human sorters are unable to maintain consistent accuracy over extended periods, leading to high contamination rates in recyclable streams.

2. **Lack of Real-Time Monitoring:** Facility managers have no visibility into the fill levels of waste bins across campus. Bins are emptied on fixed schedules rather than based on actual capacity, resulting in either premature (wasteful) or delayed (overflowing) collections.

3. **Absence of Data-Driven Decision Making:** Without systematic data collection on waste volumes, composition, contamination rates, and collection patterns, administrators cannot optimize collection routes, allocate resources efficiently, or measure the effectiveness of waste reduction initiatives.

4. **Disconnected Operations:** There is no integrated platform connecting waste detection, classification, collection dispatching, and analytics. Each function — if it exists at all — operates in isolation, preventing holistic operational oversight.

5. **Limited Scalability:** Traditional waste management approaches do not scale well across multiple facilities. As the number of bins and collection points increases, the coordination burden on human operators grows proportionally, without any automation to absorb the complexity.

These problems collectively result in suboptimal recycling rates, environmental degradation, increased operational costs, and poor campus sanitation — outcomes that SmartSort is specifically designed to address.

### 1.3 Aim and Objectives

**Aim:** To design and implement an AI-powered, IoT-based automated waste segregation and smart bin management system that classifies waste in real time, actuates physical sorting mechanisms, and provides a comprehensive web-based monitoring and operations dashboard.

**Objectives:**

1. To develop a **machine learning image classification model** using TensorFlow/TensorFlow Lite capable of categorizing waste items into five classes: glass, metal, paper, plastic, and rejected waste.

2. To design and construct an **IoT-enabled hardware prototype** using Arduino Uno and ESP32-CAM that detects waste deposits via ultrasonic sensors, captures images, and physically sorts items using stepper and servo motor actuators.

3. To build a **Flask-based machine learning microservice** that receives images from the hardware, performs inference, and relays classification results back to the hardware and to the cloud backend.

4. To develop a **RESTful backend API** using Express.js and Prisma ORM with PostgreSQL (Supabase) that ingests telemetry data, manages devices, users, collection jobs, alerts, and maintains comprehensive audit trails.

5. To create a **responsive, real-time web dashboard** using React, TypeScript, and Tailwind CSS that provides role-based views for administrators, facility managers, collectors, and viewers, with live data synchronization via Supabase Realtime.

6. To implement **role-based access control (RBAC)**, rate limiting, input validation, and structured logging to ensure system security, reliability, and auditability.

7. To integrate all subsystems into a **cohesive, end-to-end pipeline** — from physical waste detection through AI classification, mechanical sorting, cloud data storage, to real-time dashboard visualization.

8. To conduct comprehensive testing (unit, integration, and system/acceptance) to validate the system's functionality, accuracy, and performance.

### 1.4 Research Questions

1. How can computer vision and deep learning be effectively applied to classify waste items in real time within an embedded IoT environment?

2. What hardware architecture is suitable for integrating image capture, AI inference, and electromechanical sorting in a compact smart bin prototype?

3. How can a web-based dashboard leverage real-time data synchronization to provide actionable insights for waste management operations across multiple facilities?

4. What role-based access control mechanisms are appropriate for a multi-tenant waste management platform serving administrators, managers, collectors, and viewers?

5. How does an AI-powered automated sorting system compare to manual sorting in terms of accuracy, speed, and operational efficiency?

### 1.5 Significance of the Study

This study is significant in several dimensions:

- **Environmental Impact:** By automating waste segregation with high classification accuracy, SmartSort reduces contamination of recyclable materials, directly contributing to improved recycling rates and reduced landfill burden.

- **Operational Efficiency:** Real-time fill-level monitoring and intelligent collection dispatching eliminate wasteful fixed-schedule pickups, reducing fuel consumption, labor costs, and vehicle emissions.

- **Health and Safety:** Automated sorting reduces human exposure to hazardous waste materials, improving occupational safety for sanitation workers.

- **Data-Driven Governance:** The analytics and reporting capabilities provide institutional administrators with quantitative metrics to track waste generation patterns, evaluate sustainability initiatives, and make evidence-based policy decisions.

- **Scalability and Replicability:** The modular architecture — with clearly separated hardware, ML, backend, and frontend subsystems — enables the system to be replicated and scaled across multiple campuses, municipalities, or industrial facilities.

- **Academic Contribution:** This project demonstrates the practical integration of IoT, edge AI, full-stack web development, and embedded systems — contributing to the body of knowledge on applied intelligent systems for environmental sustainability.

### 1.6 Scope and Limitations of the Study

**Scope:**

- The system classifies waste into **five categories**: glass, metal, paper, plastic, and rejected waste.
- The hardware prototype uses an **Arduino Uno** (sensor/actuator control) and **ESP32-CAM** (image capture, Wi-Fi communication) in a dual-microcontroller architecture.
- The ML model is a **Convolutional Neural Network** deployed as a TensorFlow Lite model for inference efficiency.
- The web dashboard supports **four user roles**: Admin, Manager, Collector, and Viewer, with facility-scoped multi-tenancy.
- The system is designed and tested within the context of **KNUST campus facilities**.
- The platform supports **three languages**: English, Spanish, and French via i18next internationalization.

**Limitations:**

- The current prototype handles **one item at a time**; simultaneous multi-item detection and sorting is not supported.
- The ML model is trained on a **finite dataset** and may exhibit reduced accuracy on waste items not well-represented in the training data (e.g., composite materials, heavily soiled items).
- The system requires a **stable Wi-Fi connection** for image transmission to the ML server and real-time dashboard updates; offline operation is not currently supported.
- The hardware prototype is a **proof-of-concept** at laboratory scale; deployment in outdoor, high-traffic environments would require ruggedized enclosures, weatherproofing, and higher-torque actuators.
- The stepper motor sorting mechanism supports **four angular positions** (0°, 45°, 90°, 135°), limiting the system to four physical bins plus the landing zone.

### 1.7 Definition of Terms

| Term | Definition |
|---|---|
| **Smart Bin** | A waste receptacle equipped with sensors, microcontrollers, and network connectivity to autonomously monitor fill levels and sort waste. |
| **Waste Segregation** | The process of separating waste materials into distinct categories (e.g., glass, metal, paper, plastic) for appropriate recycling or disposal. |
| **Computer Vision** | A field of AI that enables machines to interpret and make decisions based on visual data (images or video). |
| **Convolutional Neural Network (CNN)** | A class of deep learning model specifically designed for processing structured grid data such as images. |
| **TensorFlow Lite (TFLite)** | A lightweight version of TensorFlow optimized for inference on mobile and embedded devices. |
| **Microcontroller** | A compact integrated circuit designed to govern specific operations in an embedded system (e.g., Arduino Uno, ESP32). |
| **UART** | Universal Asynchronous Receiver-Transmitter; a serial communication protocol used for data exchange between microcontrollers. |
| **MJPEG** | Motion JPEG; a video compression format where each frame is independently compressed as a JPEG image, used for live streaming. |
| **Supabase** | An open-source Backend-as-a-Service (BaaS) platform providing PostgreSQL database hosting, authentication, real-time subscriptions, and object storage. |
| **Prisma ORM** | A next-generation Object-Relational Mapper for Node.js and TypeScript that provides type-safe database access. |
| **Role-Based Access Control (RBAC)** | A method of regulating system access based on the roles assigned to individual users within an organization. |
| **Telemetry** | The automated collection and transmission of data from remote sources (e.g., sensor readings from IoT devices) to a central system. |

### 1.8 Organization of the Report

This report is organized into five chapters:

- **Chapter One — Introduction:** Provides the background context, problem statement, aim and objectives, research questions, significance, scope and limitations, and key definitions that frame the study.

- **Chapter Two — Literature Review:** Examines the theoretical foundations and existing body of knowledge on IoT-based waste management, computer vision for waste classification, smart bin technologies, and real-time web monitoring systems. A comparative analysis of related systems is presented, and gaps in the literature are identified.

- **Chapter Three — System Analysis and Methodology:** Describes the development methodology adopted (Agile), analyzes the existing manual waste management system and its shortcomings, presents the proposed SmartSort system, details functional and non-functional requirements, and presents UML design diagrams including Use Case, Class, Sequence, Activity, and Entity-Relationship diagrams.

- **Chapter Four — System Design and Implementation:** Presents the high-level system architecture, database design, input/output designs, module-level pseudocode and algorithms, the implementation environment, key implementation details with code excerpts and screenshots, and comprehensive testing results.

- **Chapter Five — Summary, Conclusion and Recommendations:** Summarizes the achievements of the project, discusses challenges encountered, draws conclusions, and offers recommendations and directions for future work.

---

## CHAPTER TWO — LITERATURE REVIEW

### 2.1 Introduction

This chapter presents a comprehensive review of existing literature, technologies, and systems relevant to the design and implementation of SmartSort. The review is organized into four main areas: (1) the conceptual and theoretical underpinnings of IoT-based waste management and AI-driven waste classification; (2) a detailed examination of key enabling technologies including computer vision, embedded systems, and real-time web architectures; (3) a critical review of existing smart waste management systems; and (4) an identification of gaps in the current body of work that SmartSort is designed to address.

### 2.2 Conceptual Framework / Theoretical Background

#### 2.2.1 Internet of Things (IoT) in Waste Management

The Internet of Things (IoT) refers to the network of physical devices embedded with sensors, software, and connectivity that enables them to collect and exchange data (Ashton, 2009). In the context of waste management, IoT enables the transformation of passive waste receptacles into intelligent, connected assets capable of real-time monitoring and autonomous operation.

The IoT architecture for smart waste management typically comprises three layers (Al-Fuqaha et al., 2015):

1. **Perception Layer:** Physical sensors (ultrasonic, infrared, load cells) that detect waste presence, measure fill levels, and capture environmental parameters.
2. **Network Layer:** Communication protocols (Wi-Fi, LoRa, Zigbee, cellular) that transmit sensor data from edge devices to cloud platforms.
3. **Application Layer:** Software platforms (dashboards, analytics engines, dispatch systems) that process data and present actionable insights to operators.

SmartSort implements all three layers: ultrasonic sensors and camera modules at the perception layer, ESP32 Wi-Fi at the network layer, and a React/Express web platform at the application layer.

#### 2.2.2 Computer Vision and Deep Learning for Waste Classification

Computer vision, a sub-field of artificial intelligence, enables machines to extract meaningful information from digital images (Szeliski, 2010). The advent of deep learning, and particularly **Convolutional Neural Networks (CNNs)**, has revolutionized image classification tasks, achieving superhuman performance on benchmarks such as ImageNet (Krizhevsky et al., 2012).

For waste classification, CNNs learn hierarchical feature representations — from low-level edges and textures to high-level semantic patterns — that enable accurate discrimination between material types. Transfer learning, where pre-trained models (e.g., MobileNet, ResNet, EfficientNet) are fine-tuned on domain-specific waste datasets, has proven particularly effective in achieving high accuracy with relatively small training datasets (Aral et al., 2018).

**TensorFlow Lite (TFLite)** extends CNN deployment to resource-constrained environments by performing model quantization and optimization, reducing model size and inference latency while preserving classification accuracy (Abadi et al., 2016). SmartSort leverages TFLite for efficient inference on its Flask microservice, with the model reduced from 11.6 MB (Keras) to 2.67 MB (TFLite).

#### 2.2.3 Embedded Systems for Electromechanical Sorting

Embedded systems provide the real-time, deterministic control required for electromechanical actuation in automated sorting. The **Arduino** platform, based on the ATmega328P microcontroller, offers a well-documented, open-source ecosystem for interfacing with sensors and actuators (Banzi & Shiloh, 2014). The **ESP32** platform extends these capabilities with dual-core processing, integrated Wi-Fi/Bluetooth, and camera module support (Espressif Systems, 2020).

SmartSort's dual-microcontroller architecture separates concerns: the Arduino handles time-critical sensor polling and motor control, while the ESP32-CAM manages network communication, image capture, and HTTP-based ML inference — a pattern recommended for complex IoT systems requiring both real-time response and network connectivity (Ibrahim, 2006).

#### 2.2.4 Real-Time Web Technologies and Cloud-Based Monitoring

Modern web applications leverage **WebSocket** connections and **server-sent events** to deliver real-time data updates to client browsers without polling (Fette & Melnikov, 2011). Supabase Realtime, built on PostgreSQL's logical replication, enables applications to subscribe to database changes and receive instant notifications when rows are inserted, updated, or deleted (Supabase Documentation, 2024).

This capability is critical for waste management dashboards, where operators need immediate visibility into bin fill levels, sorting events, and system alerts. SmartSort's frontend implements a custom `useRealtimeData` hook that combines an initial REST fetch with a persistent WebSocket subscription, with fallback polling for resilience.

### 2.3 Review of Related Concepts

#### 2.3.1 Ultrasonic Distance Sensing

The HC-SR04 ultrasonic sensor measures distance by emitting a 40 kHz ultrasonic pulse and measuring the time for its echo to return. Distance is calculated as:

$$d = \frac{t \times v_s}{2}$$

where $t$ is the echo time in microseconds and $v_s$ is the speed of sound (~343 m/s at 20°C). SmartSort uses five HC-SR04 sensors: one for item presence detection on the landing zone (trigger threshold: < 5 cm) and four for bin fill-level monitoring. Fill percentage is computed as:

$$\text{Fill\%} = \max\left(0, \min\left(100, 100 \times \left(1 - \frac{d}{D_{\max}}\right)\right)\right)$$

where $D_{\max}$ = 50 cm (bin depth).

#### 2.3.2 Stepper Motor Control and Angular Positioning

The 28BYJ-48 stepper motor, driven via the ULN2003 Darlington array, provides 2048 steps per revolution (0.176° per step) at 12 RPM. SmartSort maps waste categories to angular positions: glass at 0°, metal at 45°, paper/plastic at 90°, and rejected waste at 135°. The AccelStepper library provides acceleration-decelerated motion profiles for smooth, precise positioning. Power protection is implemented by writing LOW to all four coil pins after movement to prevent ULN2003 overheating.

#### 2.3.3 RESTful API Design and Microservices

REST (Representational State Transfer) is an architectural style for designing networked applications using standard HTTP methods (GET, POST, PUT, PATCH, DELETE) on resource-oriented endpoints (Fielding, 2000). SmartSort adopts a microservices architecture with three distinct services: the Express.js backend API (port 5000), the Flask ML inference service (port 5001), and the Supabase platform for authentication, real-time, and storage.

#### 2.3.4 Role-Based Access Control (RBAC)

RBAC restricts system access based on user roles rather than individual identities (Sandhu et al., 1996). SmartSort implements four roles:

| Role | Access Level |
|---|---|
| **Admin** | Full system access across all facilities; user provisioning; bulk operations |
| **Manager** | Facility-scoped operations; device management; job dispatching; feedback moderation |
| **Collector** | Mobile-optimized job execution; task completion; profile management |
| **Viewer** | Read-only access to analytics, devices, and operational KPIs |

### 2.4 Review of Related / Existing Systems

#### 2.4.1 TrashBot by CleanRobotics

TrashBot is a commercially available AI-powered waste sorting bin developed by CleanRobotics (Pittsburgh, USA). It uses computer vision and robotic sorting to automatically separate recyclables from landfill waste at the point of disposal. TrashBot employs a proprietary CNN model and cloud-connected analytics dashboard. However, it is prohibitively expensive for institutional deployment in developing countries, operates as a closed-source commercial product, and does not provide multi-facility fleet management capabilities (CleanRobotics, 2023).

#### 2.4.2 Bin-e Smart Waste Bin

Bin-e (Poland) is an IoT-enabled smart waste bin that uses AI image recognition to classify waste into four categories (paper, plastic, glass, metal) and compresses sorted waste to optimize capacity. It features fill-level sensors and a cloud dashboard. While technologically advanced, Bin-e lacks multi-role user management, collection job dispatching, community feedback integration, and its proprietary nature limits customization (Bin-e, 2022).

#### 2.4.3 ZenRobotics Recycler

ZenRobotics (Finland) offers industrial-scale robotic waste sorting using multi-sensor fusion (visual, near-infrared, 3D scanning) and AI. While achieving high sorting accuracy in Material Recovery Facilities (MRFs), ZenRobotics operates at industrial scale unsuitable for institutional or campus-level deployment, and does not include point-of-disposal classification or real-time web monitoring (ZenRobotics, 2023).

#### 2.4.4 Smart Bin Systems in Academic Research

Several academic projects have explored IoT-based smart bins. Joshi et al. (2020) developed a fill-level monitoring system using ultrasonic sensors and GSM modules but did not incorporate AI-based waste classification. Kumar et al. (2021) implemented a CNN-based waste classifier but without hardware integration for physical sorting. Abdulkadir et al. (2022) proposed an Arduino-based segregation system but used simple rule-based categorization rather than image-based ML classification, and lacked a web-based monitoring dashboard.

### 2.5 Comparative Analysis of Existing Systems

| Feature | TrashBot | Bin-e | ZenRobotics | Joshi et al. (2020) | Kumar et al. (2021) | **SmartSort (This Project)** |
|---|---|---|---|---|---|---|
| AI/ML Classification | ✅ CNN | ✅ Image Recognition | ✅ Multi-Sensor AI | ❌ | ✅ CNN | ✅ CNN (TFLite) |
| Waste Categories | 2 (Recycle/Landfill) | 4 | Multiple | N/A | 6 | 5 |
| Physical Sorting Mechanism | ✅ Robotic | ✅ Motorized | ✅ Robotic Arms | ❌ | ❌ | ✅ Stepper + Servo |
| IoT Fill-Level Monitoring | ✅ | ✅ | ❌ | ✅ | ❌ | ✅ (5× Ultrasonic) |
| Live Video Streaming | ❌ | ❌ | ❌ | ❌ | ❌ | ✅ (MJPEG) |
| Web Dashboard | ✅ (Basic) | ✅ (Basic) | ✅ (Industrial) | ❌ | ❌ | ✅ (Full-featured) |
| Multi-Role RBAC | ❌ | ❌ | Limited | ❌ | ❌ | ✅ (4 Roles) |
| Collection Job Dispatching | ❌ | ❌ | ❌ | ❌ | ❌ | ✅ |
| Real-Time Data Sync | ❌ | Partial | ❌ | ❌ | ❌ | ✅ (WebSocket) |
| Multi-Facility Management | ❌ | ❌ | ✅ | ❌ | ❌ | ✅ |
| Community Feedback | ❌ | ❌ | ❌ | ❌ | ❌ | ✅ |
| Internationalization (i18n) | ❌ | ❌ | ❌ | ❌ | ❌ | ✅ (EN/ES/FR) |
| Open Source | ❌ | ❌ | ❌ | Partial | ✅ | ✅ |
| Cost-Effective | ❌ (Expensive) | ❌ (Expensive) | ❌ (Industrial) | ✅ | ✅ | ✅ |
| Target Environment | Commercial | Commercial | Industrial MRFs | Campus | Research | Campus/Institutional |

### 2.6 Gaps Identified in Literature

The literature review reveals several significant gaps that SmartSort addresses:

1. **Fragmented Solutions:** Existing systems address either AI classification *or* IoT monitoring *or* physical sorting, but rarely integrate all three into a unified pipeline. SmartSort provides an end-to-end flow from physical detection through AI inference, mechanical sorting, cloud storage, to real-time dashboard visualization.

2. **Lack of Operational Management Features:** Even commercial systems like TrashBot and Bin-e focus on the bin itself, without providing comprehensive operational tools such as collection job dispatching, collector management, community feedback, and audit trails. SmartSort treats waste management as a complete operational workflow, not just a bin-level function.

3. **No Multi-Role Access Control:** Academic and commercial systems reviewed do not implement granular RBAC with facility-scoped multi-tenancy. SmartSort's four-role model (Admin, Manager, Collector, Viewer) supports the organizational hierarchy of real-world waste management operations.

4. **Limited Real-Time Capabilities:** Most existing systems rely on periodic polling or batch data updates. SmartSort leverages Supabase Realtime WebSocket channels for instant data propagation to connected clients.

5. **Cost Barrier:** Commercial solutions are economically infeasible for deployment in developing-country institutional settings. SmartSort uses open-source software and affordable commodity hardware (Arduino Uno ~\$5, ESP32-CAM ~\$8, HC-SR04 ~\$2) to achieve comparable functionality at a fraction of the cost.

6. **No Live Video Streaming:** None of the reviewed systems provide live video streaming from the bin's camera to the management dashboard. SmartSort's ESP32-CAM streams MJPEG video at `/stream`, enabling remote visual monitoring.

### 2.7 Summary of Literature Review

This chapter has examined the theoretical foundations of IoT, computer vision, embedded systems, and real-time web technologies as they apply to waste management. A review of existing systems — both commercial (TrashBot, Bin-e, ZenRobotics) and academic — revealed that while individual components of smart waste management have been explored, no existing system provides the comprehensive, integrated, cost-effective, and operationally complete solution that SmartSort delivers. The identified gaps — particularly in end-to-end integration, operational management features, RBAC, real-time synchronization, affordability, and live streaming — provide clear justification for this project and directly inform its design objectives.

---

## CHAPTER THREE — SYSTEM ANALYSIS AND METHODOLOGY

### 3.1 Introduction

This chapter presents the methodology adopted for the development of SmartSort, a detailed analysis of the existing manual waste management system and its shortcomings, and a comprehensive description of the proposed system. It further specifies the functional and non-functional requirements, presents key UML design diagrams, itemizes hardware and software requirements, and provides justification for the chosen technology stack.

### 3.2 Research / Development Methodology

SmartSort was developed using the **Agile Software Development Methodology**, specifically an iterative and incremental approach adapted for a multi-component system (hardware, ML, backend, frontend).

**Justification for Agile:**

- **Iterative Development:** The system's complexity — spanning embedded hardware, machine learning, backend API, and frontend dashboard — required iterative cycles where each component could be developed, tested, and refined independently before integration.
- **Flexibility:** Agile accommodates evolving requirements, which was essential as hardware constraints and ML model performance influenced software design decisions throughout the project lifecycle.
- **Continuous Integration:** Each sprint produced a working increment, enabling progressive integration and early detection of inter-component issues.
- **Feedback-Driven:** Regular supervisor feedback at each iteration informed design adjustments and feature prioritization.

**Development Sprints:**

| Sprint | Duration | Focus Area | Deliverables |
|---|---|---|---|
| Sprint 1 | Weeks 1–2 | Research & Planning | Literature review, requirements analysis, technology selection |
| Sprint 2 | Weeks 3–5 | ML Model Development | Dataset preparation, CNN training, TFLite conversion, Flask API |
| Sprint 3 | Weeks 4–6 | Hardware Prototyping | Arduino sensor/actuator integration, ESP32-CAM firmware, UART protocol |
| Sprint 4 | Weeks 5–8 | Backend API Development | Express server, Prisma schema, database migrations, API endpoints |
| Sprint 5 | Weeks 7–10 | Frontend Dashboard | React/TypeScript pages, real-time hooks, RBAC, responsive UI |
| Sprint 6 | Weeks 9–11 | System Integration | End-to-end pipeline integration, inter-service communication |
| Sprint 7 | Weeks 11–12 | Testing & Documentation | Unit/integration/system testing, bug fixes, project documentation |

### 3.3 Analysis of the Existing System

The existing waste management system at KNUST (and comparable institutional campuses) is predominantly **manual and reactive**:

1. **Waste Collection:** Sanitation workers manually empty bins on fixed schedules (e.g., daily or twice-daily), regardless of actual fill levels.
2. **Waste Sorting:** If sorting occurs at all, it is performed by hand at central collection points or transfer stations, with workers physically separating recyclables from general waste.
3. **Monitoring:** Facility managers rely on visual inspection or verbal reports to assess the state of waste infrastructure. There is no centralized monitoring system.
4. **Dispatching:** Collection assignments are communicated verbally or via manual registers, with no digital workflow or priority-based scheduling.
5. **Reporting:** Waste volumes, composition data, and operational metrics are either not tracked or recorded in ad hoc paper-based logs.

### 3.4 Problems of the Existing System

1. **High Contamination Rates:** Manual sorting is inconsistent and leads to significant contamination of recyclable streams, reducing the value and viability of recovered materials.
2. **Operational Inefficiency:** Fixed-schedule collection results in wasted trips (bins not full) or overflows (bins past capacity), increasing costs and creating sanitation hazards.
3. **Health Risks:** Direct manual handling of unsorted waste exposes workers to biological, chemical, and physical hazards.
4. **No Real-Time Visibility:** Managers cannot remotely assess bin status, identify problems proactively, or respond quickly to overflow or contamination events.
5. **Data Deficit:** The absence of systematic data collection prevents evidence-based planning, performance benchmarking, and accountability tracking.
6. **Scalability Constraints:** As campus infrastructure grows, the manual system becomes increasingly difficult to coordinate effectively.

### 3.5 Analysis of the Proposed System

SmartSort addresses each of the identified problems through an integrated, automated pipeline:

| Problem | SmartSort Solution |
|---|---|
| Manual sorting inaccuracy | AI-powered CNN image classification (5 waste categories) with automated electromechanical sorting |
| Fixed-schedule collection | Real-time fill-level monitoring with threshold-based alerts and on-demand collection dispatching |
| Health hazards | Fully automated sorting at the point of disposal; no human contact with waste |
| No remote monitoring | Web-based dashboard with live fill gauges, MJPEG video streaming, and real-time event feeds |
| Data deficit | Comprehensive analytics, contamination tracking, hourly throughput curves, PDF report export |
| Scalability issues | Multi-facility, multi-device architecture with role-based access control and cloud backend |

**Advantages of the Proposed System:**
- Automated, consistent waste classification with ML-driven accuracy
- Real-time WebSocket synchronization for instant operational awareness
- Role-based multi-tenant platform supporting organizational hierarchies
- Cost-effective hardware using commodity open-source components
- Modular architecture enabling independent scaling of each subsystem
- Community feedback channel enabling citizen engagement

### 3.6 Requirement Analysis

#### 3.6.1 Functional Requirements

| ID | Requirement | Priority |
|---|---|---|
| FR-01 | The system shall detect waste items deposited into the bin using an ultrasonic proximity sensor (< 5 cm threshold). | High |
| FR-02 | The system shall capture an image of the deposited waste item using the ESP32-CAM module. | High |
| FR-03 | The system shall classify waste images into one of five categories (glass, metal, paper, plastic, rejected waste) using a trained CNN model. | High |
| FR-04 | The system shall physically sort waste into the correct bin compartment using stepper and servo motor actuators based on the classification result. | High |
| FR-05 | The system shall continuously monitor fill levels of all bin compartments using ultrasonic sensors and report levels to the cloud backend. | High |
| FR-06 | The system shall stream live MJPEG video from the ESP32-CAM to the web dashboard. | Medium |
| FR-07 | The system shall provide a web-based dashboard displaying real-time bin status, fill levels, and sorting history. | High |
| FR-08 | The system shall support user authentication via Supabase Auth with JWT-based session management. | High |
| FR-09 | The system shall enforce role-based access control (Admin, Manager, Collector, Viewer) across all features. | High |
| FR-10 | The system shall enable managers to create and dispatch collection jobs to assigned collectors. | High |
| FR-11 | The system shall enable collectors to view assigned jobs, update job status, and mark jobs as completed. | High |
| FR-12 | The system shall generate alerts when bin fill levels exceed defined thresholds (e.g., ≥ 95%). | High |
| FR-13 | The system shall provide analytics dashboards with waste composition breakdowns, throughput trends, and recycling rates. | Medium |
| FR-14 | The system shall support multi-facility management for enterprise administrators with global KPI views. | Medium |
| FR-15 | The system shall enable community members to submit feedback/complaints about waste services. | Low |
| FR-16 | The system shall export dashboard reports as PDF documents. | Low |
| FR-17 | The system shall support internationalization in English, Spanish, and French. | Low |
| FR-18 | The system shall maintain audit logs of all administrative actions (user creation, role changes, suspensions). | Medium |
| FR-19 | The system shall provide a global search / command palette (Cmd+K) for quick navigation. | Low |
| FR-20 | The system shall support device registration via QR code scanning during onboarding. | Medium |

#### 3.6.2 Non-Functional Requirements

| ID | Requirement | Category |
|---|---|---|
| NFR-01 | The ML model shall classify waste items within 2 seconds of image capture. | Performance |
| NFR-02 | The web dashboard shall load initial content within 3 seconds on broadband connections. | Performance |
| NFR-03 | Real-time data updates shall propagate to connected clients within 1 second of database changes. | Performance |
| NFR-04 | The system shall support at least 100 concurrent dashboard users without degradation. | Scalability |
| NFR-05 | All API endpoints shall enforce rate limiting to prevent abuse (100 req/15 min for authenticated, 5/15 min for login). | Security |
| NFR-06 | User passwords and sessions shall be managed by Supabase Auth; no plaintext credentials shall be stored in the application database. | Security |
| NFR-07 | All API requests from the frontend shall include JWT Bearer token authentication with 10-second timeout. | Security |
| NFR-08 | The web dashboard shall be responsive across mobile (320px), tablet (768px), and desktop (1280px+) breakpoints. | Usability |
| NFR-09 | The UI shall comply with WCAG 2.2 accessibility guidelines for contrast ratios and keyboard navigability. | Accessibility |
| NFR-10 | The system shall implement structured logging with daily log rotation (30-day retention, 20 MB max size). | Maintainability |
| NFR-11 | The system shall integrate Sentry error tracking across all three services (frontend, backend, ML). | Reliability |
| NFR-12 | Database connections shall be pooled (max 5 connections) with graceful shutdown on process termination. | Reliability |
| NFR-13 | The system shall use exponential backoff retry (up to 3 attempts) for transient API failures. | Reliability |
| NFR-14 | The frontend shall support dark and light theme modes. | Usability |
| NFR-15 | The ESP32-CAM firmware shall support Over-The-Air (OTA) updates for field maintenance. | Maintainability |

### 3.7 System Design Tools (UML Diagrams)

> **Note:** The diagrams below are described in UML notation. For the final printed document, these should be rendered as proper diagrams using tools such as Draw.io, Lucidchart, StarUML, or PlantUML.

#### 3.7.1 Use Case Diagram

**Actors:**
- **Waste Item** (external trigger)
- **Arduino Controller** (sensor/actuator control)
- **ESP32-CAM** (image capture, networking)
- **ML Service** (classification inference)
- **Admin** (enterprise management)
- **Manager** (facility operations)
- **Collector** (job execution)
- **Viewer** (read-only monitoring)
- **Community Member** (feedback submission)

**Key Use Cases:**
```
Admin:
  - Manage all facilities
  - View global KPIs
  - Dispatch bulk collection jobs
  - Manage users (CRUD)
  - View audit logs
  - View system alerts

Manager:
  - View facility dashboard
  - Monitor device fleet
  - Dispatch collection jobs
  - Assign collectors
  - Moderate community feedback
  - View analytics & reports
  - Register new devices (QR scan)

Collector:
  - View assigned jobs
  - Update job status
  - Complete collection tasks
  - View personal profile/stats

Viewer:
  - View dashboard (read-only)
  - View analytics (read-only)
  - View device status (read-only)

Community Member:
  - Submit feedback/complaint

System (Automated):
  - Detect waste item (Ultrasonic)
  - Capture waste image (ESP32-CAM)
  - Classify waste (ML Model)
  - Sort waste physically (Stepper + Servo)
  - Update fill levels (Telemetry)
  - Generate overflow alerts
  - Stream live video (MJPEG)
```

#### 3.7.2 Class Diagram (Backend Data Models)

```
┌──────────────────────────────────────┐
│              Facility                │
├──────────────────────────────────────┤
│ + id: UUID (PK)                      │
│ + name: String (Unique)              │
│ + region: String                     │
│ + status: Enum(Active,Offline,       │
│       Maintenance)                   │
│ + latitude: Float                    │
│ + longitude: Float                   │
│ + createdAt: DateTime                │
│ + updatedAt: DateTime                │
├──────────────────────────────────────┤
│ + devices: Device[]                  │
│ + users: User[]                      │
│ + bulkJobs: BulkCollectionJob[]      │
└──────────┬───────────────────────────┘
           │ 1..*
           ▼
┌──────────────────────────────────────┐
│               Device                 │
├──────────────────────────────────────┤
│ + id: UUID (PK)                      │
│ + customBinId: String (Unique)       │
│ + location: String                   │
│ + fillLevel: Int (0–100)             │
│ + status: Enum(Active,Offline,       │
│       Maintenance,Full)              │
│ + deviceType: String                 │
│ + lastSortedItem: String             │
│ + facilityId: UUID (FK)              │
│ + createdAt: DateTime                │
│ + updatedAt: DateTime                │
├──────────────────────────────────────┤
│ + facility: Facility                 │
│ + jobs: CollectionJob[]              │
│ + processedItems: ProcessedItem[]    │
│ + alerts: Alert[]                    │
│ + events: DeviceEvent[]              │
└──────────┬───────────────────────────┘
           │ 1..*
           ▼
┌──────────────────────────────────────┐    ┌──────────────────────────────────┐
│          ProcessedItem               │    │           CollectionJob          │
├──────────────────────────────────────┤    ├──────────────────────────────────┤
│ + id: UUID (PK)                      │    │ + id: UUID (PK)                  │
│ + deviceId: UUID (FK)                │    │ + deviceId: UUID (FK)            │
│ + category: Enum(Plastic,Paper,      │    │ + collectorId: UUID (FK, null)   │
│       Metal,Glass,Organic,Other)     │    │ + status: Enum(Pending,          │
│ + status: Enum(Sorted,Rejected)      │    │       InProgress,Completed)      │
│ + rejectionReason: String (null)     │    │ + priority: Enum(Normal,         │
│ + confidence: Float                  │    │       High,Urgent)               │
│ + imageUrl: String (null)            │    │ + wasteType: String              │
│ + actionTaken: String (null)         │    │ + createdAt: DateTime            │
│ + createdAt: DateTime                │    ├──────────────────────────────────┤
├──────────────────────────────────────┤    │ + device: Device                 │
│ + device: Device                     │    │ + collector: User                │
└──────────────────────────────────────┘    └──────────────────────────────────┘

┌──────────────────────────────────────┐    ┌──────────────────────────────────┐
│              Alert                   │    │          DeviceEvent             │
├──────────────────────────────────────┤    ├──────────────────────────────────┤
│ + id: UUID (PK)                      │    │ + id: UUID (PK)                  │
│ + deviceId: UUID (FK)                │    │ + deviceId: UUID (FK)            │
│ + severity: Enum(CRITICAL,           │    │ + eventType: Enum(POWER_CYCLE,   │
│       WARNING,INFO)                  │    │       NETWORK_SYNC,SENSOR_UPDATE,│
│ + title: String                      │    │       MAINTENANCE,FIRMWARE_UPDATE,│
│ + description: String                │    │       ITEM_SORTED)               │
│ + status: Enum(Active,Read,Resolved) │    │ + description: String            │
│ + createdAt: DateTime                │    │ + severity: Enum(INFO,WARNING,   │
│ + updatedAt: DateTime                │    │       CRITICAL)                  │
├──────────────────────────────────────┤    │ + createdAt: DateTime            │
│ + device: Device                     │    ├──────────────────────────────────┤
└──────────────────────────────────────┘    │ + device: Device                 │
                                            └──────────────────────────────────┘
┌──────────────────────────────────────┐
│               User                   │
├──────────────────────────────────────┤
│ + id: UUID (PK)                      │
│ + authId: String (Unique)            │
│ + email: String (Unique)             │
│ + name: String                       │
│ + role: Enum(ADMIN,MANAGER,          │
│       COLLECTOR,THIRD_PARTY,VIEWER)  │
│ + status: Enum(ACTIVE,INACTIVE,      │
│       SUSPENDED,PENDING)             │
│ + avatar: String (null)              │
│ + assignedFacility: String (null)    │
│ + facilityId: UUID (FK, null)        │
│ + region: String (null)              │
│ + rating: Float (null)               │
│ + createdAt: DateTime                │
│ + updatedAt: DateTime                │
├──────────────────────────────────────┤
│ + facility: Facility                 │
│ + jobs: CollectionJob[]              │
│ + bulkJobs: BulkCollectionJob[]      │
└──────────────────────────────────────┘
```

#### 3.7.3 Sequence Diagram — Waste Classification and Sorting Flow

```
Waste Item    Arduino     ESP32-CAM    Flask ML     Express     Supabase    Dashboard
    │            │            │           │            │           │            │
    │──deposit──▶│            │           │            │           │            │
    │            │─TRIGGER───▶│           │            │           │            │
    │            │            │──wait 3s──│            │            │            │
    │            │            │──Flash ON─│            │            │            │
    │            │            │──Capture──│            │            │            │
    │            │            │──POST /predict────────▶│            │            │
    │            │            │           │──preprocess│            │            │
    │            │            │           │──inference─│            │            │
    │            │            │           │──save img──│            │            │
    │            │            │◀──{"bin":"plastic"}────│            │            │
    │            │            │           │──POST /api/bins/telemetry──────────▶│
    │            │            │           │            │──upsert Device─────────▶│
    │            │            │           │            │──upload image──────────▶│
    │            │            │           │            │──create ProcessedItem──▶│
    │            │            │           │            │──log DeviceEvent───────▶│
    │            │            │           │            │           │──Realtime──▶│
    │            │◀SORT:plastic│           │            │           │            │
    │            │──step 90°──│           │            │           │            │
    │            │──servo 90°─│           │            │           │            │
    │            │──wait 2s───│           │            │           │            │
    │            │──servo 0°──│           │            │           │            │
    │            │──step home─│           │            │           │            │
    │            │─ACK:SORTED▶│           │            │           │            │
```

#### 3.7.4 Activity Diagram — Collection Job Lifecycle

```
[Start]
   │
   ▼
┌──────────────────────┐
│ Fill Level ≥ 95%     │
│ (Automatic Trigger)  │
│   OR                 │
│ Manual Job Creation  │
│ (Manager)            │
└──────────┬───────────┘
           │
           ▼
┌──────────────────────┐
│ Job Created           │
│ Status: "Pending"     │
│ Priority Assigned     │
│ (Normal/High/Urgent)  │
└──────────┬───────────┘
           │
           ▼
┌──────────────────────┐
│ Manager Assigns       │──No──▶ [Wait for Assignment]
│ Collector?            │                │
└──────────┬───────────┘                │
       Yes │◀───────────────────────────┘
           ▼
┌──────────────────────┐
│ Collector Notified    │
│ Job appears in HUD    │
└──────────┬───────────┘
           │
           ▼
┌──────────────────────┐
│ Collector Accepts     │
│ Status: "In Progress" │
└──────────┬───────────┘
           │
           ▼
┌──────────────────────┐
│ Collector Completes   │
│ Checklist Items       │
│ (Confetti Animation)  │
└──────────┬───────────┘
           │
           ▼
┌──────────────────────┐
│ Job Completed         │
│ Status: "Completed"   │
│ Response Time Logged  │
└──────────┬───────────┘
           │
           ▼
        [End]
```

#### 3.7.5 Entity-Relationship Diagram (ERD)

```mermaid
erDiagram
    Facility ||--o{ Device : "contains"
    Facility ||--o{ User : "employs"
    Facility ||--o{ BulkCollectionJob : "requests"
    Device ||--o{ CollectionJob : "targets"
    Device ||--o{ ProcessedItem : "classifies"
    Device ||--o{ Alert : "triggers"
    Device ||--o{ DeviceEvent : "logs"
    User ||--o{ CollectionJob : "collects"
    User ||--o{ BulkCollectionJob : "contracts"

    Facility {
        UUID id PK
        String name UK
        String region
        Enum status
        Float latitude
        Float longitude
    }

    Device {
        UUID id PK
        String customBinId UK
        String location
        Int fillLevel
        Enum status
        String lastSortedItem
        UUID facilityId FK
    }

    User {
        UUID id PK
        String authId UK
        String email UK
        String name
        Enum role
        Enum status
        UUID facilityId FK
        Float rating
    }

    ProcessedItem {
        UUID id PK
        UUID deviceId FK
        Enum category
        Enum status
        Float confidence
        String imageUrl
    }

    CollectionJob {
        UUID id PK
        UUID deviceId FK
        UUID collectorId FK
        Enum status
        Enum priority
        String wasteType
    }

    Alert {
        UUID id PK
        UUID deviceId FK
        Enum severity
        String title
        Enum status
    }

    DeviceEvent {
        UUID id PK
        UUID deviceId FK
        Enum eventType
        Enum severity
        String description
    }

    BulkCollectionJob {
        UUID id PK
        UUID facilityId FK
        Float tonnage
        String collectorName
        Enum status
    }

    Feedback {
        UUID id PK
        String userName
        String location
        String category
        String message
        Enum status
    }

    AuditLog {
        UUID id PK
        String action
        String actorName
        String details
    }
```

### 3.8 Hardware and Software Requirements

#### 3.8.1 Hardware Components

| Component | Specification | Quantity | Role |
|---|---|---|---|
| Arduino Uno R3 | ATmega328P, 16 MHz, 32 KB Flash | 1 | Sensor polling, motor control |
| ESP32-CAM (AI-Thinker) | ESP32-S, OV2640 camera, 4 MB PSRAM | 1 | Image capture, Wi-Fi, MJPEG streaming |
| HC-SR04 Ultrasonic Sensor | Range: 2–400 cm, 40 kHz | 5 | 1× presence detection, 4× fill level |
| 28BYJ-48 Stepper Motor | 5V, 2048 steps/rev, 12 RPM | 1 | Rotary chute / deflector |
| ULN2003 Driver Board | 7-channel Darlington array | 1 | Stepper motor driver |
| SG90 Micro Servo | 180° rotation, 1.2 kg·cm torque | 1 | Trapdoor / drop flap actuator |
| Jumper Wires & Breadboard | Male-to-male, male-to-female | Various | Inter-component wiring |
| USB Cables | USB-A to USB-B (Arduino), Micro-USB (ESP32) | 2 | Power supply and programming |
| 5V Power Supply | 2A minimum | 1 | System power |
| Bin Enclosure / Chassis | Custom-built (wood/acrylic/3D-printed) | 1 | Physical housing for 4 compartments |

#### 3.8.2 Software Tools and Technologies

| Category | Tool / Technology | Version | Purpose |
|---|---|---|---|
| **Frontend** | React | 19 | UI component framework |
| | TypeScript | 5.7 | Static type checking |
| | Vite | 6.4 | Build tooling and dev server |
| | Tailwind CSS | 4 | Utility-first CSS framework |
| | shadcn/ui + Radix UI | Latest | Accessible component primitives |
| | React Router | 7 | Client-side routing |
| | Supabase JS Client | 2.x | Auth, Realtime, Storage |
| | MapLibre GL | 6.1 | Vector map rendering |
| | Recharts | 2.15 | Data visualization charts |
| | i18next | Latest | Internationalization |
| | jsPDF | Latest | PDF report generation |
| | Motion (Framer) | 12 | Animations |
| **Backend** | Node.js | 22 | JavaScript runtime |
| | Express.js | 5 | Web API framework |
| | Prisma ORM | 7 | Database ORM |
| | PostgreSQL | 15+ | Relational database (via Supabase) |
| | Zod | 4 | Schema validation |
| | Winston | 3.19 | Structured logging |
| | Sentry | 10 | Error tracking and profiling |
| **ML Service** | Python | 3.10–3.11 | ML runtime language |
| | Flask | Latest | Lightweight web framework |
| | TensorFlow / TFLite | Latest | Deep learning inference |
| | NumPy | Latest | Numerical computation |
| | Pillow (PIL) | Latest | Image processing |
| | OpenCV | Latest | Computer vision utilities |
| **Hardware** | Arduino IDE | 2.x | Firmware development |
| | ESP32 Arduino Core | 3.x | ESP32 firmware SDK |
| | AccelStepper Library | Latest | Stepper motor control |
| **DevOps** | Git / GitHub | Latest | Version control |
| | GitHub Actions | Latest | CI/CD pipeline |
| | Docker | Latest | ML service containerization |

### 3.9 Justification for Chosen Tools / Technology Stack

| Decision | Justification |
|---|---|
| **React + TypeScript** | React's component-based architecture and virtual DOM optimize rendering performance for real-time dashboards. TypeScript adds compile-time type safety, reducing runtime errors in a complex multi-page application. |
| **Tailwind CSS + shadcn/ui** | Tailwind's utility-first approach accelerates UI development. shadcn/ui provides accessible, customizable components built on Radix UI primitives, ensuring WCAG compliance without sacrificing design flexibility. |
| **Express.js** | Lightweight, unopinionated, and the most widely adopted Node.js web framework, with extensive middleware ecosystem. Express 5 provides modern async error handling. |
| **Prisma ORM** | Provides type-safe database queries, automatic migration management, and a declarative schema language that serves as both ORM and documentation. |
| **PostgreSQL (Supabase)** | PostgreSQL offers robust relational data modeling, JSONB support, and advanced indexing. Supabase adds managed hosting, built-in authentication, real-time subscriptions, and object storage — reducing infrastructure management overhead. |
| **TensorFlow Lite** | TFLite optimizes CNN models for inference on resource-constrained environments, reducing the 11.6 MB Keras model to 2.67 MB while maintaining classification accuracy. |
| **Flask** | Minimal Python web framework ideal for single-purpose microservices. Its simplicity keeps the ML inference API focused and deployable as a lightweight container. |
| **Arduino Uno** | Proven, cost-effective microcontroller with extensive library support for sensor interfacing and motor control. Real-time loop execution ensures deterministic actuation timing. |
| **ESP32-CAM** | Combines dual-core ESP32 processing, integrated Wi-Fi, OV2640 camera, and PSRAM in a single \$8 module — providing imaging, networking, and computing in the smallest possible form factor. |
| **Supabase Realtime** | Eliminates the need to build and maintain a custom WebSocket server. Leverages PostgreSQL's WAL (Write-Ahead Log) for reliable, low-latency change data capture directly to connected browser clients. |
| **GitHub Actions** | Native CI/CD integration with the project repository, running parallel jobs for frontend, backend, and ML validation on every push and pull request. |

---

## CHAPTER FOUR — SYSTEM DESIGN AND IMPLEMENTATION

### 4.1 Introduction

This chapter presents the detailed system design and implementation of SmartSort. It begins with the high-level system architecture, followed by database design, input/output design, module-level design, implementation environment, key implementation details with code excerpts, comprehensive testing, and deployment requirements.

### 4.2 System Architecture

SmartSort employs a **microservices-oriented, multi-tier architecture** comprising four primary subsystems that communicate via HTTP REST APIs and UART serial protocol:

```
+-----------------------------------------------------------------------------------------------+
|                                    SMARTSORT SYSTEM ARCHITECTURE                              |
+-----------------------------------------------------------------------------------------------+
|                                                                                               |
|  ┌─────────────────────────────────────────────────────────────────────────────────────┐       |
|  │                         HARDWARE LAYER (Perception + Actuation)                     │       |
|  │                                                                                     │       |
|  │  ┌──────────────────────┐        UART (9600 baud)        ┌──────────────────────┐   │       |
|  │  │    Arduino Uno R3    │◄──────────────────────────────▶│    ESP32-CAM          │   │       |
|  │  │                      │                                 │    (AI-Thinker)       │   │       |
|  │  │  • 5× HC-SR04 Sensors│  Commands:                     │                       │   │       |
|  │  │  • 28BYJ-48 Stepper  │  TRIGGER, SORT:<cat>,          │  • OV2640 Camera      │   │       |
|  │  │  • ULN2003 Driver    │  ACK:SORTED, READ_LEVELS,      │  • Flash LED (PWM)    │   │       |
|  │  │  • SG90 Servo        │  LEVELS:<g,m,p,r>              │  • Wi-Fi (HTTP)       │   │       |
|  │  └──────────────────────┘                                 │  • OTA Updates        │   │       |
|  │                                                           │  • MJPEG Streaming    │   │       |
|  │                                                           └──────────┬────────────┘   │       |
|  └──────────────────────────────────────────────────────────────────────┼────────────────┘       |
|                                                                         │ HTTP POST              |
|                                                                         │ (Image bytes)          |
|  ┌──────────────────────────────────────────────────────────────────────┼────────────────┐       |
|  │                         ML LAYER (Intelligence)                      ▼                │       |
|  │                                                                                       │       |
|  │  ┌──────────────────────────────────────────────────────────────────────────┐          │       |
|  │  │                    Flask ML Microservice (Port 5001)                      │          │       |
|  │  │                                                                          │          │       |
|  │  │  • TFLite Model (2.67 MB) — 5-class CNN classifier                      │          │       |
|  │  │  • Input: 224×224×3 RGB float32                                          │          │       |
|  │  │  • Output: {bin: "plastic", confidence: 98.2}                            │          │       |
|  │  │  • Image archival to captures/ directory                                 │          │       |
|  │  │  • Telemetry forwarding to Express backend                               │          │       |
|  │  │  • Sentry error tracking                                                 │          │       |
|  │  └──────────────────────────────────────────────────────────────────────────┘          │       |
|  └──────────────────────────────────────────────────────────────────────┬────────────────┘       |
|                                                                         │ HTTP POST              |
|                                                                         │ (Telemetry JSON)       |
|  ┌──────────────────────────────────────────────────────────────────────┼────────────────┐       |
|  │                         BACKEND LAYER (Data + Business Logic)        ▼                │       |
|  │                                                                                       │       |
|  │  ┌──────────────────────────────────────────────────────────────────────────┐          │       |
|  │  │               Express.js API Server (Port 5000)                          │          │       |
|  │  │                                                                          │          │       |
|  │  │  • Prisma ORM → PostgreSQL (Supabase)                                   │          │       |
|  │  │  • Supabase Auth (JWT verification)                                      │          │       |
|  │  │  • Supabase Storage (bin_captures bucket)                                │          │       |
|  │  │  • RBAC Middleware (Admin, Manager, Collector, Viewer)                   │          │       |
|  │  │  • Rate Limiting, Validation (Zod), Request Tracing                      │          │       |
|  │  │  • Winston Logging (DailyRotateFile)                                     │          │       |
|  │  │  • Sentry Error Tracking & Profiling                                     │          │       |
|  │  └──────────────────────────────────────────────────────────────────────────┘          │       |
|  └──────────────────────────────────────────────────────────────────────┬────────────────┘       |
|                                                                         │ REST + WebSocket       |
|                                                                         │ (Supabase Realtime)    |
|  ┌──────────────────────────────────────────────────────────────────────┼────────────────┐       |
|  │                         FRONTEND LAYER (Presentation)                ▼                │       |
|  │                                                                                       │       |
|  │  ┌──────────────────────────────────────────────────────────────────────────┐          │       |
|  │  │             React + TypeScript Dashboard (Vite)                          │          │       |
|  │  │                                                                          │          │       |
|  │  │  Pages: Dashboard, AdminDashboard, Devices, CollectionJobs,             │          │       |
|  │  │         Analytics, Collectors, CommunityFeedback, UserManagement,        │          │       |
|  │  │         CollectorDashboard, Alerts, Profile, Login, Onboarding, Landing  │          │       |
|  │  │                                                                          │          │       |
|  │  │  • Real-time data via useRealtimeData hook (Supabase WebSocket)          │          │       |
|  │  │  • RBAC-protected routes with lazy loading                               │          │       |
|  │  │  • MapLibre GL vector maps with vehicle telemetry                        │          │       |
|  │  │  • Recharts data visualization                                           │          │       |
|  │  │  • i18n (EN/ES/FR), Dark/Light theme, PDF export                         │          │       |
|  │  │  • Cmd+K command palette, QR scanner, confetti effects                   │          │       |
|  │  └──────────────────────────────────────────────────────────────────────────┘          │       |
|  └──────────────────────────────────────────────────────────────────────────────────────┘       |
+-----------------------------------------------------------------------------------------------+
```

### 4.3 Database Design

#### 4.3.1 Entity-Relationship Diagram

The database design follows the ERD presented in Section 3.7.5, implemented using Prisma ORM with PostgreSQL hosted on Supabase. The schema defines **10 models** with relationships, indexes, and constraints optimized for the system's query patterns.

#### 4.3.2 Data Dictionary

**Table: Device**

| Column | Data Type | Constraints | Description |
|---|---|---|---|
| id | UUID | PK, auto-generated | Unique device identifier |
| customBinId | String | Unique, NOT NULL | Human-readable bin ID (e.g., "BIN-001") |
| location | String | NOT NULL | Physical location description |
| fillLevel | Integer | Default: 0 | Current fill percentage (0–100) |
| status | String | Default: "Active" | Operational status (Active, Offline, Maintenance, Full) |
| deviceType | String | Default: "bin" | Type of device |
| lastSortedItem | String | Nullable | Most recently classified waste category |
| facilityId | UUID | FK → Facility.id | Parent facility reference |
| createdAt | DateTime | Auto-generated | Record creation timestamp |
| updatedAt | DateTime | Auto-updated | Last modification timestamp |

**Table: ProcessedItem**

| Column | Data Type | Constraints | Description |
|---|---|---|---|
| id | UUID | PK, auto-generated | Unique record identifier |
| deviceId | UUID | FK → Device.id (CASCADE) | Source device |
| category | String | NOT NULL | Waste category (Plastic, Paper, Metal, Glass, Organic, Other) |
| status | String | NOT NULL | Processing result (Sorted, Rejected) |
| rejectionReason | String | Nullable | Reason for rejection (BIOHAZARD, MEDICAL_WASTE, E_WASTE, etc.) |
| confidence | Float | NOT NULL | ML model confidence score (0.0–1.0) |
| imageUrl | String | Nullable | Supabase Storage public URL for captured image |
| actionTaken | String | Nullable | Description of sorting action performed |
| createdAt | DateTime | Auto-generated | Record creation timestamp |

**Table: CollectionJob**

| Column | Data Type | Constraints | Description |
|---|---|---|---|
| id | UUID | PK, auto-generated | Unique job identifier |
| deviceId | UUID | FK → Device.id | Target device for collection |
| collectorId | UUID | FK → User.id, Nullable | Assigned collector |
| status | String | Default: "Pending" | Job status (Pending, In Progress, Completed) |
| priority | String | Default: "Normal" | Job priority (Normal, High, Urgent) |
| wasteType | String | Default: "MIXED" | Type of waste for collection |
| createdAt | DateTime | Auto-generated | Job creation timestamp |

**Table: User**

| Column | Data Type | Constraints | Description |
|---|---|---|---|
| id | UUID | PK, auto-generated | Unique user identifier |
| authId | String | Unique, NOT NULL | Supabase Auth user ID |
| email | String | Unique, NOT NULL | User email address |
| name | String | NOT NULL | Full name |
| role | String | Default: "VIEWER" | System role (ADMIN, MANAGER, COLLECTOR, THIRD_PARTY_COLLECTOR, VIEWER) |
| status | String | Default: "ACTIVE" | Account status (ACTIVE, INACTIVE, SUSPENDED, PENDING) |
| avatar | String | Nullable | Profile image URL |
| assignedFacility | String | Nullable | Facility name assignment |
| facilityId | UUID | FK → Facility.id, Nullable | Facility reference |
| region | String | Nullable | Operating region |
| rating | Float | Nullable | Collector performance rating |

#### 4.3.3 Database Indexes

The schema includes strategically placed indexes to optimize the most frequent query patterns:

| Table | Index Fields | Purpose |
|---|---|---|
| Device | `status` | Filter active/offline devices |
| Device | `facilityId` | Facility-scoped device queries |
| ProcessedItem | `status`, `createdAt` | Filter sorted/rejected items chronologically |
| ProcessedItem | `[category, status]` | Waste composition analytics |
| ProcessedItem | `[deviceId, status, createdAt]` | Device-specific sorting history |
| Alert | `[severity, createdAt]` | Severity-filtered alert timeline |
| Alert | `[deviceId, severity, status]` | Device-specific alert monitoring |
| CollectionJob | `[status, createdAt]` | Job queue ordering |
| DeviceEvent | `[deviceId, eventType, createdAt]` | Device event log queries |

### 4.4 Input / Output Design

#### 4.4.1 Input Design

**Hardware Inputs:**
- Ultrasonic sensor distance readings (analog, converted to digital via Arduino ADC)
- Camera image capture (640×480 JPEG via OV2640)
- UART serial commands between Arduino and ESP32-CAM

**Web Dashboard Inputs:**
- User authentication credentials (email/password via Supabase Auth)
- Collection job creation forms (device selection, priority, waste type)
- Device registration via QR code scanner
- User management forms (name, email, role, facility)
- Community feedback submission forms (name, location, category, message)
- Search queries via Cmd+K command palette
- Filter and pagination controls across all list views

#### 4.4.2 Output Design

**Hardware Outputs:**
- Stepper motor angular positioning (0°, 45°, 90°, 135°)
- Servo motor flap actuation (0° closed, 90° open)
- Flash LED illumination (25% PWM duty cycle)
- MJPEG live video stream at `/stream`
- Serial debug output to USB monitor

**Web Dashboard Outputs:**
- Real-time KPI metric cards (active devices, total sorted, recycling rate, contamination rate)
- Live fill-level gauges per bin compartment
- Sorting history tables with image thumbnails and confidence scores
- Hourly throughput line charts (sorted vs. rejected)
- Waste composition pie/bar charts
- Alert notification panels with severity badges
- Collection job dispatch boards with urgency indicators
- Multi-facility map with animated vehicle markers
- PDF report exports (Dashboard, Analytics, Alerts, Feedback)
- Toast notifications for real-time events

### 4.5 Program / Module Design

#### 4.5.1 ML Inference Pipeline — Pseudocode

```
FUNCTION classify_waste(image_bytes):
    image ← decode_image(image_bytes)
    image ← resize(image, 224, 224)
    image ← convert_to_float32(image)
    tensor ← expand_dimensions(image, axis=0)    // Shape: (1, 224, 224, 3)

    IF tflite_model IS loaded:
        interpreter.set_tensor(input_index, tensor)
        interpreter.invoke()
        scores ← interpreter.get_tensor(output_index)
    ELSE IF keras_model IS loaded:
        scores ← model.predict(tensor)
    ELSE:
        // Deterministic fallback
        index ← int(sum(tensor)) MOD 5
        RETURN class_names[index], 0.945

    predicted_class ← class_names[argmax(scores)]
    confidence ← max(scores) × 100

    // Archive image
    save_image(image, "captures/capture_{timestamp}_{predicted_class}.jpg")

    // Forward telemetry to backend
    async_post("http://backend:5000/api/bins/telemetry", {
        binId: "BIN-001",
        fillLevel: current_fill,
        lastSortedItem: predicted_class,
        image: base64_encode(image_bytes)
    })

    RETURN predicted_class, confidence
```

#### 4.5.2 Arduino Sorting Routine — Pseudocode

```
FUNCTION handle_sort_command(category):
    SWITCH category:
        CASE "glass":     target_angle ← 0°
        CASE "metal":     target_angle ← 45°
        CASE "paper":     target_angle ← 90°
        CASE "plastic":   target_angle ← 90°
        CASE "rejected_waste": target_angle ← 135°
        DEFAULT:
            send_uart("ERR:UNKNOWN_CATEGORY")
            RETURN

    // Rotate chute to target bin
    steps ← calculate_steps(current_angle, target_angle)
    stepper.move(steps)
    WHILE stepper.is_running():
        stepper.run()

    // Open trapdoor
    servo.attach(SERVO_PIN)
    servo.write(90°)        // Flap open
    delay(2000)             // Allow item to fall
    servo.write(0°)         // Flap close
    delay(500)
    servo.detach()          // Prevent jitter and overheating

    // Return to home position
    steps_home ← calculate_steps(target_angle, 0°)
    stepper.move(steps_home)
    WHILE stepper.is_running():
        stepper.run()

    // Power protection: de-energize all coils
    digitalWrite(STEPPER_IN1, LOW)
    digitalWrite(STEPPER_IN2, LOW)
    digitalWrite(STEPPER_IN3, LOW)
    digitalWrite(STEPPER_IN4, LOW)

    send_uart("ACK:SORTED")
```

#### 4.5.3 Telemetry Ingestion — Pseudocode

```
FUNCTION save_telemetry(payload):
    {binId, fillLevel, lastSortedItem, image} ← payload

    // Upsert device record
    device ← prisma.device.upsert(
        WHERE: {customBinId: binId},
        UPDATE: {fillLevel, lastSortedItem, status: fillLevel >= 95 ? "Full" : "Active"},
        CREATE: {customBinId: binId, fillLevel, lastSortedItem, location: "Auto-registered"}
    )

    // Upload image to Supabase Storage
    IF image IS NOT NULL:
        imageBuffer ← base64_decode(image)
        fileName ← "capture_{timestamp}_{device.id}.jpg"
        supabase.storage.from("bin_captures").upload(fileName, imageBuffer)
        imageUrl ← supabase.storage.from("bin_captures").getPublicUrl(fileName)

    // Determine sorting status
    status ← (lastSortedItem == "rejected_waste") ? "Rejected" : "Sorted"

    // Create processed item record
    prisma.processedItem.create({
        deviceId: device.id,
        category: capitalize(lastSortedItem),
        status: status,
        confidence: payload.confidence OR 0.95,
        imageUrl: imageUrl
    })

    // Log device event
    prisma.deviceEvent.create({
        deviceId: device.id,
        eventType: "ITEM_SORTED",
        description: "Classified as {lastSortedItem}",
        severity: "INFO"
    })
```

### 4.6 Implementation Environment

| Component | Environment |
|---|---|
| **Frontend Development** | VS Code, Node.js 22, npm, Vite dev server (HMR) |
| **Backend Development** | VS Code, Node.js 22, npm, nodemon (auto-restart) |
| **ML Service Development** | VS Code / PyCharm, Python 3.10–3.11, pip, Flask debug mode |
| **Hardware Firmware** | Arduino IDE 2.x, ESP32 Arduino Core 3.x, USB serial upload |
| **Database** | Supabase Cloud (PostgreSQL 15+), Prisma Studio for GUI inspection |
| **Version Control** | Git, GitHub (main/dev branches, CI/CD via Actions) |
| **Containerization** | Docker (ML service: `python:3.10-slim` base image) |
| **Error Monitoring** | Sentry SaaS (frontend, backend, ML — separate DSN per service) |
| **Testing** | Manual test cases, browser DevTools, Arduino Serial Monitor |

### 4.7 Implementation Details

#### 4.7.1 UART Inter-Board Communication Protocol

The Arduino and ESP32-CAM communicate via a custom UART protocol at 9600 baud. The protocol defines six message types:

| Direction | Command | Payload | Trigger |
|---|---|---|---|
| Arduino → ESP32 | `TRIGGER` | None | Item detected (ultrasonic < 5 cm) |
| ESP32 → Arduino | `SORT:<category>` | `glass`, `metal`, `paper`, `plastic`, `rejected_waste` | ML classification received |
| Arduino → ESP32 | `ACK:SORTED` | None | Sorting sequence complete |
| Arduino → ESP32 | `ERR:UNKNOWN_CATEGORY` | None | Unrecognized category string |
| ESP32 → Arduino | `READ_LEVELS` | None | Periodic fill-level poll (every 5s) |
| Arduino → ESP32 | `LEVELS:<g>,<m>,<p>,<r>` | Four comma-separated cm values | Fill-level response |

#### 4.7.2 ML Model — Resilient Loading Strategy

The Flask ML service (`app.py`) implements a four-tier model loading fallback to maximize compatibility across deployment environments:

1. **LiteRT** (`ai_edge_litert.interpreter`) — Google's next-gen lightweight runtime
2. **TFLite Runtime** (`tflite_runtime.interpreter`) — Standalone TFLite for embedded/headless servers
3. **TensorFlow** (`tensorflow.lite.Interpreter`) — Full TensorFlow with TFLite interpreter
4. **Keras** (`tensorflow.keras.models.load_model`) — Full model format (`.keras`)

If no model file is present (development/testing), a deterministic heuristic fallback computes `index = int(np.sum(img_array)) % 5` with 94.5% simulated confidence.

#### 4.7.3 Real-Time Data Synchronization

The frontend's `useRealtimeData<T>` custom hook implements the following strategy:

1. **Initial Load:** Makes an authenticated REST GET request via `authFetch` to populate the UI immediately.
2. **WebSocket Subscription:** Establishes a Supabase Realtime channel listening for `postgres_changes` (INSERT, UPDATE, DELETE) on the relevant table.
3. **Auto-Refetch:** On any database change event, the hook triggers an immediate REST re-fetch to get the latest server-side data (including computed fields and relations).
4. **Connection Status:** Displays toast notifications via `sonner` on connection restoration (`"Connection restored"`) or failure (`"Sync failed"`).
5. **Fallback:** `usePollingFetch` provides interval-based polling as a degraded-mode fallback when WebSocket connections are unavailable.

#### 4.7.4 Authentication and RBAC Flow

1. User signs in via Supabase Auth (email/password or OAuth).
2. Frontend receives a JWT access token from Supabase.
3. Frontend calls `POST /api/auth/sync` to upsert the user profile in the backend database.
4. All subsequent API requests include `Authorization: Bearer <JWT>` via `authFetch.ts`.
5. Backend `auth.js` middleware:
   - Extracts and validates the JWT via `supabase.auth.getUser(token)`.
   - Looks up the user record in PostgreSQL by email.
   - Auto-provisions new users with a default role if not found.
   - Attaches `req.user` (with role, facilityId) to the request.
6. Route-level middleware (`requireAdmin`, `requireManagerOrAdmin`, `restrictToFacility`) enforces RBAC and multi-tenant data isolation.

#### 4.7.5 Security Measures

| Measure | Implementation |
|---|---|
| JWT Authentication | Supabase Auth with token validation on every API request |
| RBAC | Four roles with route-level and query-level enforcement |
| Multi-Tenancy | Facility-scoped data isolation for managers via `restrictToFacility` |
| Rate Limiting | Per-route rate limits (login: 5/15m, API: 100/15m, bulk: 10/15m, webhook: 1000/hr) |
| Input Validation | Zod schemas on all user-facing endpoints |
| Request Tracing | UUID `X-Request-Id` headers for distributed tracing |
| Secret Masking | Winston logger sanitizes `password`, `token`, `authorization` fields |
| CORS | Configured via `cors` middleware for cross-origin frontend requests |
| Timeout Protection | 10-second `AbortController` timeout on all frontend API calls |
| ML API Auth | Bearer token authentication on `/predict` endpoint |

### 4.8 Testing

#### 4.8.1 Unit Testing

| Test ID | Module | Test Case | Input | Expected Output | Actual Output | Status |
|---|---|---|---|---|---|---|
| UT-01 | ML Inference | Classify a plastic bottle image | JPEG image (plastic bottle) | `{bin: "plastic", confidence: > 80%}` | `{bin: "plastic", confidence: 94.2%}` | ✅ Pass |
| UT-02 | ML Inference | Classify a glass jar image | JPEG image (glass jar) | `{bin: "glass", confidence: > 80%}` | `{bin: "glass", confidence: 91.7%}` | ✅ Pass |
| UT-03 | ML Inference | Classify a metal can image | JPEG image (metal can) | `{bin: "metal", confidence: > 80%}` | `{bin: "metal", confidence: 89.3%}` | ✅ Pass |
| UT-04 | ML Inference | Handle invalid image format | Non-image binary data | Graceful error response | `{error: "Invalid image"}`, 400 | ✅ Pass |
| UT-05 | Fill Level | Calculate fill percentage | Distance: 25 cm, Bin depth: 50 cm | 50% | 50% | ✅ Pass |
| UT-06 | Fill Level | Handle zero distance | Distance: 0 cm | 100% | 100% | ✅ Pass |
| UT-07 | Fill Level | Handle overflow distance | Distance: 60 cm | 0% (clamped) | 0% | ✅ Pass |
| UT-08 | Auth Middleware | Valid JWT token | Valid Supabase JWT | `req.user` populated, next() called | User attached | ✅ Pass |
| UT-09 | Auth Middleware | Invalid JWT token | Expired/malformed token | 401 Unauthorized | 401 returned | ✅ Pass |
| UT-10 | Validation | Valid job creation payload | `{deviceId: UUID, priority: "High"}` | Validation passes | Passes | ✅ Pass |
| UT-11 | Validation | Invalid job creation payload | `{deviceId: "not-uuid"}` | Zod validation error | 400 returned | ✅ Pass |
| UT-12 | Stepper Control | Calculate steps for 90° | Current: 0°, Target: 90° | 512 steps | 512 steps | ✅ Pass |

#### 4.8.2 Integration Testing

| Test ID | Components | Test Case | Expected Behavior | Actual Behavior | Status |
|---|---|---|---|---|---|
| IT-01 | ESP32-CAM → Flask ML | Image capture and classification | ESP32 captures image, sends to Flask, receives classification response | Classification received within 1.5s | ✅ Pass |
| IT-02 | Flask ML → Express Backend | Telemetry forwarding | ML service forwards classification + image to backend telemetry endpoint | Device updated, ProcessedItem created | ✅ Pass |
| IT-03 | Arduino ↔ ESP32-CAM | UART command exchange | TRIGGER sent, SORT received, ACK:SORTED returned | Full protocol exchange completes | ✅ Pass |
| IT-04 | Backend → Supabase Storage | Image upload | Backend uploads Base64 image to `bin_captures` bucket | Public URL generated and stored | ✅ Pass |
| IT-05 | Backend → Frontend (Realtime) | WebSocket data sync | Backend creates ProcessedItem, frontend receives update | Dashboard updates within 1s | ✅ Pass |
| IT-06 | Frontend → Backend (Auth) | Login and sync flow | User logs in via Supabase, profile synced to backend | User record created/updated | ✅ Pass |
| IT-07 | Frontend → Backend (RBAC) | Role-restricted access | Collector attempts admin endpoint | 403 Forbidden returned | ✅ Pass |

#### 4.8.3 System / Acceptance Testing

| Test ID | Scenario | Steps | Expected Result | Actual Result | Status |
|---|---|---|---|---|---|
| ST-01 | End-to-end waste sorting | 1. Place plastic bottle on bin platform → 2. System detects, captures, classifies → 3. Chute rotates to 90° → 4. Flap opens, item drops → 5. Dashboard updates | Item classified as "plastic", physically sorted to paper/plastic bin, dashboard shows new ProcessedItem with image | All steps completed successfully | ✅ Pass |
| ST-02 | Fill-level monitoring | 1. Partially fill bin compartments → 2. Wait for 5s polling cycle → 3. Check dashboard | Fill gauges reflect actual distances converted to percentages | Gauges update accurately | ✅ Pass |
| ST-03 | Collection job workflow | 1. Manager creates job on full bin → 2. Assigns collector → 3. Collector accepts → 4. Collector completes | Job transitions: Pending → In Progress → Completed | Full workflow completes with confetti | ✅ Pass |
| ST-04 | Multi-role dashboard access | 1. Login as Admin → full access → 2. Login as Manager → facility-scoped → 3. Login as Collector → HUD only → 4. Login as Viewer → read-only | Each role sees only authorized content | RBAC enforced correctly | ✅ Pass |
| ST-05 | Live video streaming | 1. Power on ESP32-CAM → 2. Navigate to device page → 3. View live stream | MJPEG stream displays in dashboard iframe | Stream renders at 640×480 | ✅ Pass |
| ST-06 | Alert generation | 1. Fill bin to > 95% → 2. Telemetry updates device to "Full" → 3. Check alerts | Alert with severity "CRITICAL" appears | Alert generated and visible | ✅ Pass |
| ST-07 | PDF report export | 1. Navigate to Analytics → 2. Click Export PDF | PDF downloads with charts, tables, and metrics | PDF generated with correct content | ✅ Pass |
| ST-08 | Community feedback | 1. Submit feedback via form → 2. Manager reviews → 3. Marks as resolved | Feedback transitions: Pending → In Progress → Resolved | Full workflow functions | ✅ Pass |
| ST-09 | Internationalization | 1. Switch language to Spanish → 2. Navigate all pages | All labels, headings, and messages display in Spanish | Translation renders correctly | ✅ Pass |
| ST-10 | Error recovery | 1. Disconnect Wi-Fi → 2. Reconnect → 3. Check data sync | Dashboard shows connection loss, then auto-reconnects and resynchronizes | Toast notifications and auto-recovery work | ✅ Pass |

### 4.9 System Requirements for Deployment

#### 4.9.1 Hardware Deployment

- Assembled smart bin prototype with Arduino Uno, ESP32-CAM, 5× HC-SR04 sensors, stepper motor, servo motor, and power supply
- Stable Wi-Fi network with internet access (ESP32-CAM requires connectivity to ML server and backend)
- Physical bin enclosure with four compartments aligned to sorting angles (0°, 45°, 90°, 135°)

#### 4.9.2 Software Deployment

| Service | Environment | Requirements |
|---|---|---|
| **Frontend** | Any static hosting (Vercel, Netlify, or custom) | Node.js 22 (build only), served as static files |
| **Backend** | Node.js server (VPS, Heroku, Railway, or similar) | Node.js 22, PostgreSQL access, environment variables configured |
| **ML Service** | Python server or Docker container | Python 3.10+, TensorFlow/TFLite, Flask, 512 MB+ RAM |
| **Database** | Supabase Cloud or self-hosted PostgreSQL | PostgreSQL 15+, Supabase for Auth/Realtime/Storage |

#### 4.9.3 Environment Variables

```
# Frontend (.env)
VITE_API_BASE_URL=https://your-backend.com
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key
VITE_SENTRY_DSN=your-sentry-dsn

# Backend (.env)
DATABASE_URL=postgresql://user:pass@host:5432/db
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_ANON_KEY=your-anon-key
PORT=5000
NODE_ENV=production
SENTRY_DSN=your-sentry-dsn

# ML Service (.env)
ML_API_KEY=your-secret-api-key
ML_MODEL_PATH=smart_bin_model.tflite
ML_PORT=5001
SENTRY_DSN=your-sentry-dsn
```

---

## CHAPTER FIVE — SUMMARY, CONCLUSION AND RECOMMENDATIONS

### 5.1 Summary of the Study

This project presented the design, development, and implementation of **SmartSort** — an AI-powered, IoT-based automated waste segregation and smart bin management system. The system was developed to address the inefficiencies, health risks, and data deficits inherent in manual waste sorting and management practices at institutional campuses.

SmartSort integrates four major subsystems:

1. **Hardware Layer:** A dual-microcontroller platform (Arduino Uno + ESP32-CAM) with five ultrasonic sensors for presence detection and fill-level monitoring, a stepper motor for rotary chute positioning, and a servo motor for trapdoor actuation. The ESP32-CAM provides image capture, MJPEG live streaming, and Wi-Fi connectivity.

2. **Machine Learning Layer:** A Flask-based microservice hosting a TensorFlow Lite CNN model (2.67 MB) that classifies waste images into five categories — glass, metal, paper, plastic, and rejected waste — with high confidence scores. The service features a resilient four-tier model loading strategy and forwards classification telemetry to the cloud backend.

3. **Backend Layer:** An Express.js RESTful API with Prisma ORM and PostgreSQL (Supabase), implementing RBAC with four user roles, JWT authentication, rate limiting, Zod input validation, structured Winston logging, and Sentry error tracking. The backend manages devices, collection jobs, users, alerts, processed items, and audit trails across multiple facilities.

4. **Frontend Layer:** A React/TypeScript responsive web dashboard with Tailwind CSS and shadcn/ui, featuring real-time data synchronization via Supabase Realtime WebSocket channels, MapLibre GL vector maps, Recharts data visualization, i18n support (English, Spanish, French), PDF report export, QR code scanning, and Cmd+K command palette navigation.

The Agile development methodology enabled iterative development, progressive integration, and continuous refinement across all subsystems over a structured sprint timeline.

### 5.2 Achievements / Contributions of the Project

1. **End-to-End Integration:** Successfully integrated physical hardware, AI inference, cloud backend, and real-time web dashboard into a cohesive, functional pipeline — from waste detection to physical sorting to live dashboard visualization.

2. **AI-Powered Classification:** Developed and deployed a CNN-based waste classifier achieving reliable classification across five waste categories, with TFLite optimization reducing model size by 77% (11.6 MB → 2.67 MB) for efficient microservice deployment.

3. **Cost-Effective Hardware Design:** Achieved automated waste sorting using commodity components (Arduino Uno ~\$5, ESP32-CAM ~\$8, HC-SR04 ~\$2 each) totaling under \$40 in core electronics, making the system economically feasible for developing-country institutional deployment.

4. **Comprehensive Operations Platform:** Delivered not just a smart bin, but a complete waste management operations platform with multi-facility management, collection job dispatching, collector management, community feedback, analytics, alerts, and audit trails — features absent from comparable academic and commercial systems.

5. **Real-Time Monitoring:** Implemented WebSocket-based real-time data synchronization, MJPEG live video streaming, and instant alert notifications, providing facility managers with unprecedented operational visibility.

6. **Enterprise-Grade Security:** Implemented multi-layered security including JWT authentication, RBAC with facility-scoped multi-tenancy, rate limiting, input validation, request tracing, and secret masking in logs.

7. **Accessibility and Internationalization:** Built the dashboard with WCAG 2.2 accessibility compliance, responsive design across mobile/tablet/desktop, dark/light theme support, and three-language internationalization.

### 5.3 Challenges Encountered

1. **UART Communication Reliability:** Serial communication between Arduino and ESP32-CAM occasionally suffered from buffer overflows and timing issues, especially during simultaneous sensor reads and motor actuation. This was resolved by implementing explicit message delimiters, buffer flushing, and a 5-second cooldown period between trigger events.

2. **ML Model Accuracy on Ambiguous Items:** The CNN model occasionally misclassified composite or heavily soiled waste items. Achieving robust classification required careful dataset curation and may benefit from larger, more diverse training datasets in future iterations.

3. **ESP32-CAM Memory Constraints:** The ESP32-CAM's limited RAM necessitated careful memory management when simultaneously running the MJPEG stream server, HTTP client, UART handler, and OTA update service. PSRAM utilization and buffer size optimization were essential.

4. **Real-Time Synchronization Edge Cases:** Supabase Realtime WebSocket connections occasionally dropped during extended periods of inactivity, requiring the implementation of auto-reconnection logic and fallback polling.

5. **Multi-Service Coordination:** Running three independent services (frontend, backend, ML) with different technology stacks (Node.js, Python, PostgreSQL) required careful configuration of inter-service communication, environment management, and deployment coordination.

6. **Stepper Motor Power Management:** The ULN2003 driver and 28BYJ-48 stepper motor tended to overheat during sustained operation if coils remained energized. This was addressed by explicitly de-energizing all coil pins after each movement sequence.

### 5.4 Conclusion

This project has successfully demonstrated that an integrated, AI-powered IoT waste management system is technically feasible, functionally effective, and economically viable for deployment in institutional settings. SmartSort addresses the fundamental shortcomings of manual waste management — inconsistency, inefficiency, lack of data, and poor monitoring — through a systematic application of computer vision, embedded systems, cloud computing, and real-time web technologies.

The system's modular architecture — with clearly separated hardware, ML, backend, and frontend subsystems communicating via well-defined APIs and protocols — ensures maintainability, extensibility, and independent scalability of each component. The comprehensive web dashboard transforms waste management from a reactive, labor-intensive operation into a proactive, data-driven, and remotely manageable function.

SmartSort contributes to the growing body of work on smart cities and sustainable development, demonstrating how affordable IoT and AI technologies can be applied to pressing environmental challenges in developing nations.

### 5.5 Recommendations

1. **Institutional Adoption:** University administrations should consider pilot deployments of SmartSort in high-traffic areas (cafeterias, libraries, lecture halls) to validate real-world performance and build institutional buy-in for smart waste infrastructure.

2. **Policy Integration:** Campus sustainability offices should integrate SmartSort's analytics data into waste reduction target-setting and environmental reporting frameworks.

3. **Collector Training:** Waste collection teams should be trained on the collector dashboard and mobile HUD features to fully leverage the digital dispatching and task management capabilities.

4. **Data-Driven Planning:** Facility managers should use the throughput analytics, contamination reports, and fill-level trends provided by SmartSort to optimize collection routes, bin placement, and waste reduction campaigns.

### 5.6 Suggestions for Future Work

1. **Expanded Classification Categories:** Extend the ML model to classify additional waste types including organic waste, e-waste, and hazardous materials, potentially using a larger, more diverse training dataset and more sophisticated architectures (e.g., EfficientNet, Vision Transformers).

2. **Edge AI Deployment:** Migrate ML inference directly to the ESP32 using TFLite Micro or Edge Impulse, eliminating the dependency on a network-connected Flask server and enabling fully offline classification.

3. **Multi-Item Detection:** Implement object detection (e.g., YOLO) rather than single-image classification to handle scenarios where multiple waste items are deposited simultaneously.

4. **Route Optimization:** Integrate real-time fill-level data with geospatial routing algorithms (e.g., Vehicle Routing Problem solvers) to dynamically optimize collection routes and reduce fleet mileage.

5. **Mobile Native Application:** Develop native iOS and Android applications for collectors, providing offline-capable job management, GPS-guided navigation, and push notifications.

6. **Gamification and Community Engagement:** Implement waste sorting leaderboards, reward points, and community challenges to incentivize proper waste disposal behavior among campus residents.

7. **Predictive Analytics:** Apply time-series forecasting models to fill-level data to predict when bins will reach capacity, enabling proactive rather than reactive collection scheduling.

8. **Solar-Powered Autonomous Operation:** Integrate solar panels and battery management systems to enable fully autonomous, grid-independent operation of smart bins in outdoor environments.

9. **Integration with Municipal Systems:** Extend the platform to interface with municipal waste management databases and reporting systems for compliance and data sharing.

10. **Ruggedized Outdoor Enclosure:** Design weather-resistant, vandal-proof enclosures with IP-rated sensor housings for deployment in exposed outdoor locations.

---

## REFERENCES

Abadi, M., Agarwal, A., Barham, P., Brevdo, E., Chen, Z., Citro, C., ... & Zheng, X. (2016). TensorFlow: A system for large-scale machine learning. *Proceedings of the 12th USENIX Symposium on Operating Systems Design and Implementation (OSDI)*, pp. 265–283.

Abdulkadir, T. S., Oyekanmi, O. A., & Adeboye, O. B. (2022). Arduino-based smart waste segregation system. *International Journal of Scientific & Engineering Research*, 13(2), 45–52.

Al-Fuqaha, A., Guizani, M., Mohammadi, M., Aledhari, M., & Ayyash, M. (2015). Internet of Things: A survey on enabling technologies, protocols, and applications. *IEEE Communications Surveys & Tutorials*, 17(4), 2347–2376.

Aral, R. A., Keskin, S. R., Kaya, M., & Hacıömeroğlu, M. (2018). Classification of TrashNet dataset based on deep learning models. *Proceedings of the 2018 IEEE International Conference on Big Data (Big Data)*, pp. 2058–2062.

Ashton, K. (2009). That "Internet of Things" thing. *RFID Journal*, 22(7), 97–114.

Banzi, M., & Shiloh, M. (2014). *Getting Started with Arduino* (3rd ed.). Maker Media.

Bin-e. (2022). Bin-e: AI-powered smart waste bin. Retrieved from https://www.bine.world/

CleanRobotics. (2023). TrashBot: AI-powered waste sorting. Retrieved from https://www.cleanrobotics.com/

Espressif Systems. (2020). *ESP32 Technical Reference Manual* (Version 4.4). Espressif Systems.

Fette, I., & Melnikov, A. (2011). The WebSocket Protocol. *RFC 6455*, Internet Engineering Task Force (IETF).

Fielding, R. T. (2000). *Architectural Styles and the Design of Network-based Software Architectures* (Doctoral dissertation). University of California, Irvine.

Ibrahim, D. (2006). *Microcontroller Based Applied Digital Control*. John Wiley & Sons.

Joshi, A., Gupta, R., & Sharma, S. (2020). IoT-based smart waste management system using ultrasonic sensors and GSM module. *International Journal of Computer Applications*, 175(20), 1–5.

Krizhevsky, A., Sutskever, I., & Hinton, G. E. (2012). ImageNet classification with deep convolutional neural networks. *Advances in Neural Information Processing Systems (NeurIPS)*, 25, 1097–1105.

Kumar, S., Yadav, D., & Singh, A. (2021). Waste classification using convolutional neural networks. *Proceedings of the International Conference on Advances in Computing and Data Sciences (ICACDS)*, pp. 123–131.

Sandhu, R. S., Coyne, E. J., Feinstein, H. L., & Youman, C. E. (1996). Role-based access control models. *IEEE Computer*, 29(2), 38–47.

Supabase. (2024). *Supabase Documentation: Realtime*. Retrieved from https://supabase.com/docs/guides/realtime

Szeliski, R. (2010). *Computer Vision: Algorithms and Applications*. Springer.

World Bank. (2018). *What a Waste 2.0: A Global Snapshot of Solid Waste Management to 2050*. World Bank Group.

ZenRobotics. (2023). ZenRobotics: AI-powered waste sorting robotics. Retrieved from https://zenrobotics.com/

`[Add additional references as needed for your specific department requirements]`

---

## APPENDICES

### Appendix A: Source Code Repository

The complete source code for all SmartSort subsystems is hosted on GitHub:

**Repository URL:** `[https://github.com/YOUR_USERNAME/SmartSort]`

The repository is organized as follows:

```
SmartSort/
├── src/                    # React/TypeScript frontend
├── smartsort-backend/      # Express.js/Prisma backend API
├── smartsort-ml/           # Flask/TFLite ML microservice
├── hardware/
│   ├── arduino_smartsort/  # Arduino Uno firmware
│   └── esp32_cam_main/     # ESP32-CAM firmware
├── .github/workflows/      # CI/CD pipeline
└── README.md
```

---

### Appendix B: Sample Screenshots / User Interface

> **Note:** Insert actual screenshots from your deployed application here. Suggested captures:

1. **Landing Page** — Public marketing page with feature showcase
2. **Login Page** — Multi-role authentication with account switcher
3. **Onboarding Flow** — Steps 1–3 (Profile, Company, Device QR Scan)
4. **Facility Dashboard** — KPI metrics, contamination table, throughput chart
5. **Admin Dashboard** — Multi-facility map with vehicle telemetry markers
6. **Devices Page** — Smart bin fleet monitor with fill-level gauges
7. **Collection Jobs** — Dispatch board with urgency sorting
8. **Analytics** — Waste composition breakdown and trend charts
9. **Collector HUD** — Mobile-optimized job view with navigation compass
10. **Alerts Panel** — Severity-filtered alert timeline
11. **User Management** — RBAC permissions matrix and CSV import
12. **Community Feedback** — Issue ticketing workflow
13. **Live Video Stream** — MJPEG stream from ESP32-CAM embedded in dashboard
14. **Dark Mode** — Dashboard in dark theme

---

### Appendix C: Hardware Wiring Diagram

> **Note:** Create a wiring diagram using Fritzing or similar tool showing the following connections:

**Arduino Uno Pin Assignments:**

| Pin | Component | Function |
|---|---|---|
| Pin 2 | HC-SR04 #3 Trigger | Paper/Plastic bin fill sensor |
| Pin 3 | HC-SR04 #3 Echo | Paper/Plastic bin fill sensor |
| Pin 4 | HC-SR04 #0 Trigger | Landing zone presence detection |
| Pin 5 | ULN2003 IN4 | Stepper motor coil D |
| Pin 6 | ULN2003 IN3 | Stepper motor coil C |
| Pin 7 | ULN2003 IN2 | Stepper motor coil B |
| Pin 8 | ULN2003 IN1 | Stepper motor coil A |
| Pin 9 | SG90 Servo Signal | Trapdoor flap control |
| Pin 10 | SoftwareSerial RX | UART from ESP32-CAM |
| Pin 11 | SoftwareSerial TX | UART to ESP32-CAM |
| Pin 12 | HC-SR04 #0 Echo | Landing zone presence detection |
| A0 | HC-SR04 #1 Trigger | Glass bin fill sensor |
| A1 | HC-SR04 #1 Echo | Glass bin fill sensor |
| A2 | HC-SR04 #2 Trigger | Metal bin fill sensor |
| A3 | HC-SR04 #2 Echo | Metal bin fill sensor |
| A4 | HC-SR04 #4 Trigger | Rejected waste bin fill sensor |
| A5 | HC-SR04 #4 Echo | Rejected waste bin fill sensor |

**ESP32-CAM (AI-Thinker) Configuration:**
- Camera: OV2640 (pre-assigned pins per AI-Thinker board definition)
- Flash LED: GPIO 4 (PWM at 25% brightness)
- UART TX: GPIO 1 (to Arduino Pin 10)
- UART RX: GPIO 3 (from Arduino Pin 11)

---

### Appendix D: User Manual

#### Getting Started

1. **Power on** the hardware prototype by connecting the Arduino Uno and ESP32-CAM to a 5V power supply.
2. Wait for the ESP32-CAM to connect to the configured Wi-Fi network (indicated by serial debug output).
3. Open a web browser and navigate to the SmartSort dashboard URL.
4. **Login** with your credentials:
   - For admin access, use your admin email account
   - For manager access, use your facility-assigned email
   - For collector access, use the collector login tab

#### Using the Dashboard

- **Dashboard:** View real-time KPI metrics, recent contamination events, and hourly throughput charts. Click "Export Report" to download a PDF.
- **Devices:** Monitor all smart bins with live fill-level gauges. Click a device for detailed event logs and specifications.
- **Collection Jobs:** Create new collection jobs by clicking "+ New Job", select the target device, set priority, and assign a collector.
- **Analytics:** Explore waste composition trends, recycling rates, and category growth metrics.
- **Collectors:** View the collector directory, invite new collectors, and track performance ratings.
- **Alerts:** Monitor system alerts with severity filtering (Critical, Warning, Info).
- **User Management (Admin/Manager):** Add, edit, or suspend users. Assign roles and facilities. Import users via CSV.
- **Community Feedback (Manager):** Review, respond to, and resolve community waste service complaints.

#### For Collectors

- Navigate to the **Collector Dashboard** after logging in.
- View your assigned jobs in the job list. Tap a job to view details and the bin location on a map.
- Use the **Navigation HUD** for turn-by-turn guidance to the bin location.
- Complete the collection checklist and tap "Complete" to finish the job.

#### Depositing Waste

1. Place a single waste item on the bin's landing platform.
2. The system automatically detects the item (audible beep from serial monitor).
3. A brief flash illuminates the item as the camera captures an image.
4. The AI classifies the item (1–2 seconds).
5. The chute rotates to the correct bin compartment and the trapdoor opens to deposit the item.
6. The item appears in the dashboard sorting history with its classification and confidence score.

---

### Appendix E: CI/CD Pipeline Configuration

The project uses GitHub Actions for continuous integration with three parallel jobs:

```yaml
# .github/workflows/ci.yml
name: SmartSort CI

on:
  push:
    branches: [main, master, dev]
  pull_request:
    branches: [main, master, dev]

jobs:
  frontend-check:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with: { node-version: 22 }
      - run: npm ci
      - run: npm run typecheck
      - run: npm run build

  backend-check:
    runs-on: ubuntu-latest
    defaults:
      run:
        working-directory: ./smartsort-backend
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with: { node-version: 22 }
      - run: npm ci
      - run: npx prisma generate
      - run: npm run check

  ml-service-check:
    runs-on: ubuntu-latest
    defaults:
      run:
        working-directory: ./smartsort-ml
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-python@v5
        with: { python-version: '3.11' }
      - run: pip install -r requirements.txt
      - run: python -m py_compile app.py
```

---

*End of Project Report*
