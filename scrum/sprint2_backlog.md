# Sprint 2 Backlog — The Velvet Room

**Sprint Duration:** Week 2   
**Sprint Goal:** Implement secure Admin dashboard with session authentication, room availability grid, and double-booking prevention.  
**Scrum Master:** Lee Wen Xin  
**Team:** Lee Wen Xin · Jaff Go · Ngoi Chang Zen · Lam Chuan Fong

---

## Selected User Stories

| ID | User Story | Priority | Story Points |
|----|-----------|----------|-------------|
| US4 | As an admin, I want to securely log into the dashboard so that only authorised staff can manage bookings. | High | 3 |
| US5 | As an admin, I want to view all bookings and manage room availability so that I can keep track of reservations. | High | 5 |
| US6 | As a system, I must prevent double-booking on the same room, date, and time slot so that conflicts do not occur. | High | 3 |

**Total Story Points: 11**

---

## Task Breakdown

### US4 — Admin login session

| Task | Assignee | Estimate | Status |
|------|----------|----------|--------|
| Create `admin` table and seed default admin credentials | Lee Wen Xin | 1h | ✅ Done |
| Implement `POST /api/admin/login` and `POST /api/admin/logout` endpoints | Lee Wen Xin | 2h | ✅ Done |
| Build Admin login modal UI with error feedback | Jaff Go | 2h | ✅ Done |
| Add session guard to all admin API routes (401 if not authenticated) | Lee Wen Xin | 1h | ✅ Done |
| Write test cases TC05, TC06 for admin authentication | Ngoi Chang Zen | 1h | ✅ Done |

---

### US5 — Admin booking management grid

| Task | Assignee | Estimate | Status |
|------|----------|----------|--------|
| Implement `GET /api/admin/reservations` endpoint with JOIN query | Lee Wen Xin | 2h | ✅ Done |
| Implement `PATCH /api/admin/reservation/<id>` for status update | Lee Wen Xin | 1h | ✅ Done |
| Implement `PATCH /api/admin/room/<id>` for room status update | Lee Wen Xin | 1h | ✅ Done |
| Build visual room availability grid (Available / Booked / Maintenance) | Jaff Go | 4h | ✅ Done |
| Build reservations table with Confirm / Cancel action buttons | Jaff Go | 3h | ✅ Done |
| Write test cases TC07, TC08, TC09 for admin dashboard actions | Ngoi Chang Zen | 2h | ✅ Done |
| Document admin API endpoints and usage in README | Lam Chuan Fong | 2h | ✅ Done |

---

### US6 — Double-booking prevention

| Task | Assignee | Estimate | Status |
|------|----------|----------|--------|
| Add conflict-check SQL query in `POST /api/reserve` | Lee Wen Xin | 2h | ✅ Done |
| Return error response and display toast notification on conflict | Jaff Go | 1h | ✅ Done |
| Write test case TC03 for duplicate booking scenario | Ngoi Chang Zen | 1h | ✅ Done |

---

## Sprint 2 Summary

| Metric | Value |
|--------|-------|
| Stories Planned | 3 |
| Stories Completed | 3 |
| Story Points Planned | 11 |
| Story Points Completed | 11 |
| Completion Rate | 100% ✅ |

---

## Definition of Done (Sprint 2)

- [x] Admin can log in and log out securely using session-based authentication
- [x] Unauthorised access to admin API routes returns 401
- [x] Admin dashboard displays all reservations with full guest details
- [x] Admin can confirm or cancel any reservation
- [x] Room availability grid reflects real-time booking status across all time slots
- [x] Duplicate bookings are rejected with a clear error message
- [x] All 12 manual test cases written and passed
- [x] README updated with API documentation and testing table
