# Sprint 2 Review — The Velvet Room

**Sprint Duration:** Week 2    
**Date of Review:** End of week 2   
**Scrum Master:** Lee Wen Xin  
**Attendees:** Lee Wen Xin · Jaff Go · Ngoi Chang Zen · Lam Chuan Fong  
**Sprint Goal:** Implement secure Admin dashboard with session authentication, room availability grid, and double-booking prevention.

---

## ✅ Completed User Stories

| ID | User Story | Story Points | Status |
|----|-----------|-------------|--------|
| US4 | As an admin, I want to securely log into the dashboard. | 3 | ✅ Done |
| US5 | As an admin, I want to view all bookings and manage room availability. | 5 | ✅ Done |
| US6 | As a system, I must prevent double-booking on the same time slot. | 3 | ✅ Done |
| US9 | As an admin, I want the room availability grid to update automatically after a status change. | 3 | ✅ Done |
| US10 | As a customer, I want to preview suite photos and menu details in a modal popup. | 8 | ✅ Done |

**Stories Completed: 5 / 5 ✅**  
**Story Points Completed: 22 / 22 ✅**

---

## 📦 Deliverables Demonstrated

### 1. Admin Session Authentication
- `POST /api/admin/login` checks credentials against the `admin` table in SQLite
- Session established on successful login using Flask `session`
- `POST /api/admin/logout` clears the session
- All admin API routes protected — returns `401 Unauthorized` if session is not active
- Login modal with error message shown on invalid credentials

### 2. Admin Dashboard — Reservations Table
- `GET /api/admin/reservations` returns all bookings with JOIN on room and package tables
- Dashboard table displays: guest name, phone, email, date, time slot, pax, suite, package, status
- Admin can **Confirm** or **Cancel** any reservation via `PATCH /api/admin/reservation/<id>`
- Status badge updates in the table immediately after action

### 3. Visual Room Availability Grid
- Grid displays both suites across all 10 time slots (11:00 AM – 9:00 PM)
- Each cell colour-coded: **Available** (green) / **Booked** (red) / **Maintenance** (grey)
- Grid fetches live data from the reservations API and updates automatically after any status change
- Admin can toggle room status (Available / Maintenance) via `PATCH /api/admin/room/<id>`

### 4. Double-Booking Prevention
- `POST /api/reserve` now runs a conflict check query before inserting:
  ```sql
  SELECT id FROM reservation 
  WHERE room_id=? AND date=? AND time_slot=? AND status != 'cancelled'
  ```
- If a conflict is found, the API returns an error and no reservation is inserted
- Frontend displays a toast notification: *"This room is already booked at that time."*
- Cancelled reservations correctly free up the slot for new bookings

### 5. Suite & Menu Preview Modals
- Clicking any suite card opens a modal with suite photos, capacity, and amenities list
- Clicking any tasting menu opens a modal with full course description and price per pax
- Selecting a suite or menu from within the modal automatically updates the reservation form
- Modals dismissible via close button or clicking outside

### 6. API Endpoints Delivered (Sprint 2)

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/admin/login` | Admin authentication |
| POST | `/api/admin/logout` | Clear admin session |
| GET | `/api/admin/reservations` | Get all reservations |
| PATCH | `/api/admin/reservation/<id>` | Update reservation status |
| PATCH | `/api/admin/room/<id>` | Update room status |

---

## 🧪 Testing Results (Sprint 2)

| ID | Test Case | Result |
|----|-----------|--------|
| TC03 | Submit duplicate booking (same room, date, time) | ✅ Pass |
| TC05 | Login with correct username and password | ✅ Pass |
| TC06 | Login with incorrect credentials | ✅ Pass |
| TC07 | Confirm a pending reservation | ✅ Pass |
| TC08 | Cancel a confirmed reservation | ✅ Pass |
| TC09 | Room grid reflects booked slots after reservation | ✅ Pass |
| TC10 | Open menu detail preview modal | ✅ Pass |
| TC11 | Open room preview modal and select suite | ✅ Pass |
| TC12 | Restart server and reload admin dashboard | ✅ Pass |

**Tests Passed: 9 / 9 ✅**  
**Cumulative Tests Passed: 12 / 12 ✅**

---

## 📊 Sprint 2 Metrics

| Metric | Value |
|--------|-------|
| Stories Planned | 5 |
| Stories Completed | 5 |
| Story Points Planned | 22 |
| Story Points Completed | 22 |
| Completion Rate | 100% ✅ |

---

## 📊 Overall Project Metrics

| Sprint | Stories | Points | Completion |
|--------|---------|--------|-----------|
| Sprint 1 | 5 | 16 | 100% ✅ |
| Sprint 2 | 5 | 22 | 100% ✅ |
| **Total** | **10** | **38** | **100% ✅** |

---

## 💬 Stakeholder Feedback

- Admin dashboard was well-received — the room availability grid was noted as particularly clear and practical.
- Double-booking prevention worked correctly in all tested scenarios.
- Suggestion noted: future version could include automated email confirmation sent to the guest upon booking confirmation.

---

## 📌 Project Completion

All 10 user stories across both sprints have been completed. The system is fully functional and ready for deployment and final presentation.

**No items carried over. Project scope delivered in full.**
