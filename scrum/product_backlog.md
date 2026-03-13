# Product Backlog — The Velvet Room

**Project:** Restaurant Appointment System  
**Course:** BAI21113 Software Engineering · Raffles University · January 2026  
**Methodology:** Scrum  
**Scrum Master:** Lee Wen Xin  
**Last Updated:** March 2026

---

## Backlog Overview

| Total Stories | Completed | In Backlog | Total Story Points |
|--------------|-----------|------------|--------------------|
| 10 | 10 | 0 | 39 |

---

## User Stories

### 🟥 High Priority

| ID | User Story | Acceptance Criteria | Story Points | Assignee | Sprint | Status |
|----|-----------|---------------------|-------------|----------|--------|--------|
| US1 | As a **customer**, I want to view the private suites and tasting menus online so that I can choose a suitable option before booking. | - All suites displayed with photos, capacity, and amenities  <br> - All tasting menus displayed with price and description  <br> - Data loaded dynamically from API | 3 | Jaff Go | Sprint 1 | ✅ Done |
| US2 | As a **customer**, I want to submit a reservation with my preferred date, time slot, and number of guests so that I can secure my booking. | - Form includes name, phone, email, date, time slot, pax, room, package  <br> - Estimated total cost updates live  <br> - Success message shown on submission | 5 | Jaff Go / Lee Wen Xin | Sprint 1 | ✅ Done |
| US3 | As a **system**, I need to store reservation data, room details, and package information in a database so that records are persisted across sessions. | - SQLite database created on first run  <br> - Tables: admin, room, package, reservation  <br> - Default seed data inserted automatically | 3 | Lee Wen Xin | Sprint 1 | ✅ Done |
| US4 | As an **admin**, I want to securely log into the dashboard so that only authorised staff can manage bookings. | - Login requires correct username and password  <br> - Session maintained after login  <br> - All admin API routes return 401 if not authenticated  <br> - Logout clears the session | 3 | Lee Wen Xin | Sprint 2 | ✅ Done |
| US5 | As an **admin**, I want to view all reservations and manage room availability so that I can keep track of bookings and update their status. | - Dashboard shows all reservations with guest details  <br> - Admin can confirm or cancel any reservation  <br> - Room availability grid shows all time slots across both rooms  <br> - Admin can toggle room status (Available / Maintenance) | 5 | Lee Wen Xin / Jaff Go | Sprint 2 | ✅ Done |
| US6 | As a **system**, I must prevent double-booking on the same room, date, and time slot so that two guests are never assigned the same suite at the same time. | - Conflict check performed before inserting reservation  <br> - Error message returned if slot is already booked  <br> - Cancelled reservations do not block the slot | 3 | Lee Wen Xin | Sprint 2 | ✅ Done |

---

### 🟨 Medium Priority

| ID | User Story | Acceptance Criteria | Story Points | Assignee | Sprint | Status |
|----|-----------|---------------------|-------------|----------|--------|--------|
| US7 | As a **customer**, I want to see a live booking summary before submitting so that I can confirm my selection and estimated cost. | - Summary panel updates on every form change  <br> - Shows selected suite, package, date, time, pax, and total RM amount | 3 | Jaff Go | Sprint 1 | ✅ Done |
| US8 | As a **customer**, I want to receive clear feedback if my form submission fails so that I know what to correct. | - Toast notification shown for missing required fields  <br> - Toast notification shown if room is already booked  <br> - Specific error message displayed per scenario | 2 | Jaff Go | Sprint 1 | ✅ Done |
| US9 | As an **admin**, I want the room availability grid to update automatically after a reservation is confirmed or cancelled so that I always see accurate availability. | - Grid refreshes after any status change  <br> - Booked slots highlighted correctly per room and time | 3 | Jaff Go / Lee Wen Xin | Sprint 2 | ✅ Done |

---

### 🟩 Low Priority

| ID | User Story | Acceptance Criteria | Story Points | Assignee | Sprint | Status |
|----|-----------|---------------------|-------------|----------|--------|--------|
| US10 | As a **customer**, I want to preview suite photos and menu details in a modal popup so that I can explore options without leaving the booking form. | - Suite modal opens with photos and amenities on click  <br> - Menu modal shows full course listing and price per pax  <br> - Selecting a suite or menu from the modal updates the booking form | 8 | Jaff Go | Sprint 2 | ✅ Done |

---

## Story Point Scale

| Points | Complexity |
|--------|-----------|
| 1–2 | Simple — minor UI or config change |
| 3 | Moderate — one feature with API + frontend |
| 5 | Complex — multiple components or tricky logic |
| 8 | Large — significant UI + backend + integration |

---

## Backlog Completion Summary

| Sprint | Stories | Points | Status |
|--------|---------|--------|--------|
| Sprint 1 | US1, US2, US3, US7, US8 | 16 | ✅ Complete |
| Sprint 2 | US4, US5, US6, US9, US10 | 23 | ✅ Complete |
| **Total** | **10** | **39** | **100% ✅** |
