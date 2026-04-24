<!-- ⚠️ MOCK DATA — This file is a sample to illustrate what a reference document looks like. Replace with real content. -->

# Current Inventory Workflow — As-Is Process

**Source:** Captured during site visit on 12 Mar 2025
**Author:** Lisa (Business Analyst)

---

## Overview

This document describes the existing inventory tracking process at the client's warehouse, captured through observation and interviews.

## Process Flow

```
┌─────────────┐     ┌──────────────┐     ┌─────────────────┐     ┌───────────────┐
│ Delivery     │────▶│ Staff counts  │────▶│ Update           │────▶│ End-of-day    │
│ arrives      │     │ items on dock │     │ whiteboard       │     │ Excel entry   │
└─────────────┘     └──────────────┘     └─────────────────┘     └───────────────┘
                                                                          │
                                                                          ▼
                                                                  ┌───────────────┐
                                                                  │ Owner checks   │
                                                                  │ Excel (next    │
                                                                  │ day, by phone  │
                                                                  │ call)          │
                                                                  └───────────────┘
```

## Pain Points Identified

| # | Pain Point | Impact | Frequency |
|---|-----------|--------|-----------|
| 1 | Whiteboard is single point of entry — only one person can write at a time | Staff wait or overwrite each other | Daily |
| 2 | No user identity — all entries are anonymous | Cannot trace who made an error | Every entry |
| 3 | Excel is updated once per day at end of shift | Owner sees data that is 8–24 hours stale | Daily |
| 4 | Owner must phone supervisor to check stock | Wastes supervisor time, delays decisions | 2–3 times/day |
| 5 | Accidental whiteboard erasure | Data loss with no recovery | Weekly |

## Tools Currently Used

- Physical whiteboard (dock area)
- Microsoft Excel on a shared desktop PC (no individual logins)
- Phone calls between owner and supervisor
