<!-- ⚠️ MOCK DATA — This file is a sample to illustrate what a transcript looks like. Replace with real content. -->

# Client Kickoff Meeting — 10 Mar 2025

**Attendees:** Jane (Product Owner), Mark (CTO), Somying (Warehouse Staff), Arthit (Warehouse Supervisor)
**Facilitator:** Lisa (Business Analyst)
**Duration:** 60 min

---

## Context

First meeting with the client team to understand the current warehouse inventory workflow and identify pain points.

---

## Transcript

**Lisa:** Thank you all for joining. Can we start by walking through how stock is tracked today?

**Arthit:** Right now we use a combination of a whiteboard near the loading dock and a shared Excel file on one PC. Somying and the other floor staff update the whiteboard during the day, and at end of shift someone types it into Excel.

**Lisa:** How many people typically update stock in a day?

**Arthit:** Three or four staff touching it during the day — maybe six users total if you count the owner checking in remotely.

**Somying:** The problem is the whiteboard gets erased by accident, or two people write at the same time and one number overwrites the other. Then at end of day the Excel doesn't match reality.

**Lisa:** What happens when the numbers are wrong?

**Somying:** We get blamed. Last month Lek got blamed for a delivery shortage, but he wasn't even the one who recorded it. There's no way to tell who wrote what.

**Mark:** From a technology side, we need something mobile-first. Staff don't sit at desks. And the owner, Prasit, wants to see stock levels from his phone without calling anyone.

**Jane:** Is there any access control today?

**Arthit:** No. Everyone has the same Excel. If someone accidentally deletes a row, we only notice when counts are off.

**Lisa:** What would the ideal workflow look like?

**Somying:** I open the phone, tap the item, enter the number — done. And if something goes wrong, the log shows who did what.

**Arthit:** Everyone has to be able to update it from a phone at the same time. No waiting for the PC.

---

## Key Takeaways

- Current process: whiteboard + shared Excel, no user identity, no audit trail
- 3–6 concurrent users expected
- Mobile-first is a hard requirement
- Accountability (who changed what) is the #1 pain point
- Owner needs remote read-only access
