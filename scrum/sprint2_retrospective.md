# Sprint 2 Retrospective — The Velvet Room

**Sprint Duration:** Week 3 – Week 4  
**Date of Retrospective:** End of Week 4  
**Facilitator:** Lee Wen Xin (Scrum Master)  
**Attendees:** Lee Wen Xin · Jaff Go · Ngoi Chang Zen · Lam Chuan Fong

---

## ✅ What Went Well

- **GitHub version control prevented code conflicts.** Using feature branches (`feature/admin-dashboard`, `feature/reservation-form`, `feature/room-modal`) and pull requests meant that no team member's work overwrote another's. Merges were clean throughout Sprint 2.
- **Clear separation of frontend and backend responsibilities kept the team productive.** Lee Wen Xin focused on Flask API routes and session management, while Jaff Go built the admin dashboard UI independently. Both sides progressed simultaneously without blocking each other.
- **QA testing was planned into the sprint from the start.** Acting on the Sprint 1 retrospective action, Ngoi Chang Zen began writing test cases alongside feature development rather than at the end, which allowed bugs to be caught and fixed earlier.
- **Admin dashboard UI was completed ahead of schedule.** The visual room availability grid — the most complex UI component in the sprint — was finished with time to spare, allowing additional polish on the modal components.
- **Double-booking prevention worked correctly in all test scenarios.** The SQL conflict check query was straightforward to implement and all edge cases (cancelled reservations freeing slots, same room different dates) behaved as expected.
- **Team communication via WhatsApp was effective.** Daily progress updates kept all members aligned on what was in progress and what was blocked, reducing the need for long synchronous meetings.

---

## ⚠️ What Could Be Improved

- **Story Points were not estimated precisely enough for the modal feature (US10).** The room and menu preview modals were assigned 8 story points but turned out to be more time-consuming than anticipated due to the number of menu items and suite details to wire up. Better task breakdown at sprint planning would have made this more predictable.
- **No automated tests were written during this project.** While all 12 manual test cases passed, the process of re-running tests after every change was time-consuming. Automated unit tests for the API endpoints would have made regression testing faster.
- **Admin password is stored in plaintext.** This was acceptable for a prototype but should be flagged clearly as a limitation. A production deployment would require password hashing (e.g. bcrypt).
- **The admin panel has no pagination.** As the number of reservations grows, the dashboard table would become unwieldy. Pagination or filtering by date/status was not implemented due to time constraints.

---

## 🔧 Actions for Future Projects

| Issue Identified | Recommended Action |
|------------------|--------------------|
| Story Point estimation was off for complex UI tasks | Break large UI tasks into smaller sub-tasks at planning; cap any single task at 3 story points |
| No automated testing | Integrate `pytest` for backend API testing from the start of development |
| Plaintext password storage | Use `bcrypt` or `werkzeug.security` for password hashing in any future Flask project |
| No pagination on admin table | Plan pagination as a user story in the backlog for any data-heavy admin view |

---

## 📊 Sprint 2 Metrics

| Metric | Value |
|--------|-------|
| Stories Planned | 5 |
| Stories Completed | 5 |
| Story Points Planned | 22 |
| Story Points Completed | 22 |
| Completion Rate | 100% ✅ |
| Test Cases Passed | 9 / 9 (Sprint 2) |
| Cumulative Test Cases Passed | 12 / 12 |

---

## 📊 Overall Project Retrospective

Across both sprints, the team consistently delivered all planned user stories on time. Key lessons learned that will carry into future projects:

| Sprint | Key Lesson |
|--------|-----------|
| Sprint 1 | Start QA testing earlier — don't leave it to the last day |
| Sprint 2 | Break large UI tasks into smaller sub-tasks for more accurate estimation |
| Both | Feature branching on GitHub is essential — it prevented all major merge conflicts |

---

## 💬 Team Feedback

> *"The admin grid was the hardest part to build, but seeing it work in the final demo made it worth it."* — Jaff Go

> *"Writing test cases while features were being built was much better than doing it all at the end like Sprint 1."* — Ngoi Chang Zen

> *"I think our README and documentation ended up being really solid. Glad we dedicated time to it."* — Lam Chuan Fong

> *"Using pull requests for every feature was the right call. No one's code got lost or overwritten."* — Lee Wen Xin
