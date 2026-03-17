# Sprint 1 Review — The Velvet Room

**Sprint Duration:** Week 1     
**Date of Review:** End of Week 1    
**Scrum Master:** Lee Wen Xin  
**Attendees:** Lee Wen Xin · Jaff Go · Ngoi Chang Zen · Lam Chuan Fong  
**Sprint Goal:** Set up the core customer-facing UI, SQLite database schema, and basic reservation submission API.

---

## ✅ Completed User Stories

| ID | User Story | Story Points | Status |
|----|-----------|-------------|--------|
| US1 | As a customer, I want to view the private suites and tasting menus online. | 3 | ✅ Done |
| US2 | As a customer, I want to submit a reservation with date, time, and pax. | 5 | ✅ Done |
| US3 | As a system, I need to store reservation data and room details in a database. | 3 | ✅ Done |
| US7 | As a customer, I want to see a live booking summary before submitting. | 3 | ✅ Done |
| US8 | As a customer, I want to receive clear feedback if my form submission fails. | 2 | ✅ Done |

**Stories Completed: 5 / 5 ✅**  
**Story Points Completed: 16 / 16 ✅**

---

## 📦 Deliverables Demonstrated

### 1. Fully Responsive Frontend UI
- Landing page built with HTML5 + Bootstrap 5 + custom CSS
- Suite cards display room name, capacity, and amenities
- Tasting menu section lists all 6 packages with pricing
- CSS animations applied for smooth transitions and hover effects
- Layout tested across desktop and mobile screen sizes

### 2. SQLite Database
- Database schema created with 4 tables: `admin`, `room`, `package`, `reservation`
- Default seed data inserted on first run:
  - 2 private suites (The Crimson Suite, The Pearl Alcove)
  - 6 tasting menu packages (RM 218 – RM 688 per pax)
  - 1 default admin account
- Foreign key relationships enforced between `reservation`, `room`, and `package`

### 3. Reservation Submission API
- `POST /api/reserve` endpoint implemented and functional
- Accepts: customer name, phone, email, date, time slot, pax, room ID, package ID
- Data validated on frontend before submission (empty field check)
- Success toast notification shown on valid submission
- Error toast shown when required fields are missing

### 4. Live Booking Summary Panel
- Summary panel updates in real time as customer fills in the form
- Displays selected suite, package, date, time slot, number of guests
- Calculates and displays estimated total cost (pax × price per pax)

### 5. API Endpoints Delivered
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/rooms` | Returns all room records |
| GET | `/api/packages` | Returns all package records |
| POST | `/api/reserve` | Submits a new reservation |

---

## 🧪 Testing Results (Sprint 1)

| ID | Test Case | Result |
|----|-----------|--------|
| TC01 | Submit valid reservation with all fields filled | ✅ Pass |
| TC02 | Submit with one or more required fields missing | ✅ Pass |
| TC04 | Estimated total updates correctly when pax/menu changes | ✅ Pass |

**Tests Passed: 3 / 3 ✅**

---

## 📊 Sprint 1 Metrics

| Metric | Value |
|--------|-------|
| Stories Planned | 5 |
| Stories Completed | 5 |
| Story Points Planned | 16 |
| Story Points Completed | 16 |
| Completion Rate | 100% ✅ |

---

## 💬 Stakeholder Feedback

- Customer-facing booking flow is clear and easy to navigate.
- Live cost summary panel was highlighted as a useful feature.
- Suggestion noted: add room preview modal so customers can see suite photos before selecting — planned for Sprint 2 (US10).

---

## 📌 Carry-Over & Next Sprint

No user stories carried over from Sprint 1. All planned items were completed.

**Sprint 2 focus:**
- Admin session authentication (US4)
- Admin dashboard and room availability grid (US5)
- Double-booking prevention (US6)
- Room and menu preview modals (US10)
- Dedicated QA time planned from start of sprint
