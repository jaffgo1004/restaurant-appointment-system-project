# 🍽️ The Velvet Room
### Private Fine Dining Reservation System

> BAI21113 Software Engineering Project · Raffles University · January 2026 Semester

A web-based reservation system for **The Velvet Room**, a private fine dining restaurant in Kuala Lumpur. The system allows customers to browse tasting menus, preview private suites, and submit reservations online — while giving staff a secure admin dashboard to manage all bookings.

---

## 👥 Team Members

| Name | Student ID | Role |
|------|------------|------|
| Lee Wen Xin | BIT_B2201F-2505004 | Lead Developer / Scrum Master |
| Jaff Go | BIT_A2201F-2501001 | Frontend Developer |
| Ngoi Chang Zen | BAI_B2009F-2601001 | QA / Tester |
| Lam Chuan Fong | BAI_B2009F-2601010 | Documentation Lead |

**Lecturer:** Azlina binti Adnan

---

## 🏛️ Private Dining Suites

| Suite | Capacity | Highlights |
|-------|----------|------------|
| Room 1 · The Crimson Suite | Up to 20 guests | Wine display, private AV system, floor-to-ceiling drapes |
| Room 2 · The Pearl Alcove | Up to 10 guests | Fresh florals, candlelit ambience, bespoke table setting |

---

## 🍴 Tasting Menus

| Menu | Price | Best For |
|------|-------|---------|
| The Executive Table | RM 388 / pax | Corporate dinners & business entertaining |
| The Anniversary Menu | RM 288 / pax | Anniversaries, proposals & date nights |
| The Family Feast | RM 218 / pax | Family gatherings & celebrations |
| The Celebration Dinner | RM 318 / pax | Birthdays & milestone celebrations |
| The Prestige Tasting | RM 688 / pax | Premium multi-course tasting experience |
| The Grand Brunch | RM 248 / pax | Weekend brunch & daytime occasions |

---

## ✨ Features

**Customer**
- Browse six tasting menus with course details and pricing
- Preview private suites with photos and amenities
- Select from 10 bookable time slots (11:00 AM – 9:00 PM)
- Submit reservations with real-time booking summary and estimated total cost
- Double-booking prevention — conflicts rejected automatically

**Admin Dashboard**
- Secure session-based login
- Visual room availability grid (Available / Booked / Maintenance) across all time slots
- View all reservations with full guest details
- Confirm or cancel reservations

---

## 🛠️ Technology Stack

| Layer | Technology | Justification |
|-------|------------|---------------|
| Backend | Python 3 + Flask | Lightweight, easy to set up, suitable for mid-sized web apps |
| Database | SQLite | File-based, zero configuration, appropriate for single-restaurant system |
| Frontend | HTML5 + Bootstrap 5 | Responsive grid, pre-built UI components, rapid development |
| Styling | Custom CSS | Bespoke luxury aesthetic using CSS variables and animations |
| JavaScript | Vanilla JS (ES6+) | No dependencies, fetch API for backend communication |
| Version Control | Git + GitHub | Team collaboration, branching, and code review |

---

## 🚀 Installation & Setup

### Prerequisites
- Python 3.x
- pip

### Steps

**1. Clone the repository**
```bash
git clone https://github.com/jaffgo1004/restaurant-appointment-system-project.git
cd restaurant-booking
```

**2. Install dependencies**
```bash
pip install flask
```

**3. Run the application**
```bash
python app.py
```

**4. Open in browser**
```
http://127.0.0.1:5000
```

> ⚠️ If the database already exists from a previous run, delete `restaurant.db` before starting to ensure seed data is applied correctly.

### Default Admin Credentials
| Username | Password |
|----------|----------|
| `admin` | `admin123` |

> ⚠️ Note: Passwords are stored in plaintext in this prototype. A production deployment should use hashed passwords (e.g. `bcrypt`).

---

## 📁 Project Structure

```
restaurant-booking/
├── app.py              # Flask application & API routes
├── database.py         # Database schema & seed data
├── restaurant.db       # SQLite database file (auto-generated)
├── templates/
│   └── index.html      # Main HTML template (Jinja2)
└── static/
    ├── css/style.css   # Custom styles & luxury UI theme
    └── js/app.js       # Frontend logic & API calls
```

---

## 🔌 API Endpoints

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | `/api/rooms` | Returns list of all rooms | No |
| GET | `/api/packages` | Returns list of all tasting menu packages | No |
| POST | `/api/reserve` | Submit a new reservation | No |
| POST | `/api/admin/login` | Admin authentication | No |
| POST | `/api/admin/logout` | Clear admin session | Yes |
| GET | `/api/admin/reservations` | Get all reservations | Yes |
| PATCH | `/api/admin/reservation/<id>` | Update reservation status | Yes |
| PATCH | `/api/admin/room/<id>` | Update room status | Yes |

---

## 🧪 Testing

Manual black-box testing across **12 test cases** covering all core system functions.

| ID | Area | Test Case | Expected Result | Status |
|----|------|-----------|-----------------|--------|
| TC01 | Reservation | Submit valid reservation with all fields filled | Reservation saved, success message shown | ✅ Pass |
| TC02 | Reservation | Submit with one or more required fields missing | Warning toast shown, submission blocked | ✅ Pass |
| TC03 | Reservation | Submit duplicate booking (same room, date, time) | Error message: "room already booked at that time" | ✅ Pass |
| TC04 | Reservation | Estimated total updates correctly when pax/menu changes | Summary panel reflects correct RM amount | ✅ Pass |
| TC05 | Admin Auth | Login with correct username and password | Admin dashboard loads successfully | ✅ Pass |
| TC06 | Admin Auth | Login with incorrect credentials | Error message: "Invalid credentials" | ✅ Pass |
| TC07 | Admin Dashboard | Confirm a pending reservation | Status updates to "Confirmed" in table | ✅ Pass |
| TC08 | Admin Dashboard | Cancel a confirmed reservation | Status updates to "Cancelled", room grid updates | ✅ Pass |
| TC09 | Admin Dashboard | Room grid reflects booked slots after reservation | Booked cell shown correctly for room and time | ✅ Pass |
| TC10 | UI | Open menu detail preview modal | Modal displays correct menu name, price, description | ✅ Pass |
| TC11 | UI | Open room preview modal and select suite | Suite selected and reflected in booking form | ✅ Pass |
| TC12 | Data Integrity | Restart server and reload admin dashboard | All previous reservations still displayed correctly | ✅ Pass |

**Result: 12 / 12 test cases passed ✅**

---

## 📅 Agile Process (Scrum)

Development was organised into **2 Scrum sprints** over 4 weeks, using a Kanban board to track progress across: **Backlog → In Progress → Review → Done**.

> 📎 Full Product Backlog, User Stories, and Sprint Board snapshots are documented in [`Scrum_Documentation.pdf`](./Scrum_Documentation.pdf).

### 🏃 Sprint Summary

| Sprint | Key Deliverables | Outcome |
|--------|-----------------|---------|
| Sprint 1 | Responsive frontend UI, SQLite DB with room & package data, basic reservation submission API | Customer-facing booking system delivered |
| Sprint 2 | Admin session authentication, availability grid dashboard, double-booking prevention, UI modals & toast notifications | System 100% complete and ready for deployment |

**Sprint completion rate: 10 / 10 user stories (100%) ✅**

---

### 🔁 Sprint Retrospectives

**Sprint 1 Retrospective**
- ✅ What went well: Fully responsive UI and database structure were completed on schedule; reservation API was functional by end of sprint.
- ⚠️ What could improve: Manual QA testing was not prioritised early enough during the sprint.
- 🔧 Action taken: Dedicated time for QA testing was planned into Sprint 2 from the start.

**Sprint 2 Retrospective**
- ✅ What went well: Using GitHub for version control prevented code conflicts; clear separation of frontend and backend tasks kept the team productive.
- ⚠️ What could improve: Should allocate more time for manual QA testing earlier in the sprint.
- 🔧 Action taken: For future projects, will implement automated unit testing alongside manual testing.

---

### 📊 Simple Metrics

| Sprint | Stories Planned | Stories Completed | Completion Rate |
|--------|----------------|-------------------|-----------------|
| Sprint 1 | 5 | 5 | 100% |
| Sprint 2 | 5 | 5 | 100% |
| **Total** | **10** | **10** | **100%** |

---

## 🤝 Collaboration

- Feature branches used for all major tasks (e.g. `feature/admin-dashboard`, `feature/reservation-form`, `feature/room-modal`)
- Pull requests submitted for code review before merging into `main`
- GitHub Issues used to track bugs and feature requests
- All four members contributed commits across different areas of the codebase
- Daily progress updates via WhatsApp group; weekly virtual sprint reviews every Friday

### Role Distribution

| Member | Primary Responsibilities |
|--------|--------------------------|
| Lee Wen Xin | Flask API routes, database design, session management, Scrum facilitation |
| Jaff Go | HTML structure, Bootstrap layout, room/menu UI components |
| Ngoi Chang Zen | Manual testing, bug reporting, test case documentation |
| Lam Chuan Fong | Project report, README, sprint documentation, retrospective notes |

---

## 📄 Documentation

Full project report: [`SE_Project_Report_Final.docx`](./SE_Project_Report_Final.docx)
