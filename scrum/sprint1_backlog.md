# Sprint 1 Backlog — The Velvet Room

**Sprint Duration:** Week 1  
**Sprint Goal:** Set up the core customer-facing UI, SQLite database schema, and basic reservation submission API.  
**Scrum Master:** Lee Wen Xin  
**Team:** Lee Wen Xin · Jaff Go · Ngoi Chang Zen · Lam Chuan Fong

---

## Selected User Stories

| ID | User Story | Priority | Story Points |
|----|-----------|----------|-------------|
| US1 | As a customer, I want to view the private suites and tasting menus online so that I can choose before booking. | High | 3 |
| US2 | As a customer, I want to submit a reservation with date, time, and pax so that I can secure my preferred slot. | High | 5 |
| US3 | As a system, I need to store reservation data and room details in a database so that records are persisted. | High | 3 |

**Total Story Points: 11**

---

## Task Breakdown

### US1 — View suites and menus online

| Task | Assignee | Estimate | Status |
|------|----------|----------|--------|
| Design HTML structure for landing page and suite section | Jaff Go | 4h | ✅ Done |
| Style suite cards and tasting menu display with CSS animations | Jaff Go | 3h | ✅ Done |
| Implement `/api/rooms` and `/api/packages` GET endpoints | Lee Wen Xin | 2h | ✅ Done |
| Fetch and render rooms/packages dynamically from API | Jaff Go | 2h | ✅ Done |

---

### US2 — Submit a reservation form

| Task | Assignee | Estimate | Status |
|------|----------|----------|--------|
| Build reservation form UI (date, time slot, pax, room, package) | Jaff Go | 3h | ✅ Done |
| Implement live booking summary panel (estimated total cost) | Jaff Go | 2h | ✅ Done |
| Create `POST /api/reserve` endpoint in Flask | Lee Wen Xin | 3h | ✅ Done |
| Add frontend field validation (empty field check, toast notification) | Jaff Go | 2h | ✅ Done |
| Write test cases TC01, TC02, TC04 for reservation submission | Ngoi Chang Zen | 2h | ✅ Done |

---

### US3 — Store data in SQLite

| Task | Assignee | Estimate | Status |
|------|----------|----------|--------|
| Design and implement database schema (room, package, reservation tables) | Lee Wen Xin | 3h | ✅ Done |
| Seed default rooms and tasting menu packages into database | Lee Wen Xin | 1h | ✅ Done |
| Document database schema and setup instructions in README | Lam Chuan Fong | 2h | ✅ Done |

---

## Sprint 1 Summary

| Metric | Value |
|--------|-------|
| Stories Planned | 3 |
| Stories Completed | 3 |
| Story Points Planned | 11 |
| Story Points Completed | 11 |
| Completion Rate | 100% ✅ |

---

## Definition of Done (Sprint 1)

- [x] Customer can view all suites and tasting menus on the landing page
- [x] Customer can fill and submit the reservation form
- [x] Reservation data is saved correctly to SQLite database
- [x] API endpoints return correct JSON responses
- [x] Frontend renders data dynamically (no hardcoded content)
- [x] Basic test cases written and passed (TC01, TC02, TC04)
