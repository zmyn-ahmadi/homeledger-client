0 - deploy the api for production build
1 - connect api

a - Add Transaction -> Expense/Income - adding one of those should ADD ENTRY to Database

b - Add Budgets -> Create a budget Modal - adding budget should ADD ENTRY to Budgets Table

c - Add Bills: - default Bills in database (cannot be deleted) but can be updated - add a new Bill -> Should ADD ENTRY to Bills Table - 'Mark Paid' should add ADD ENTRY to BillPayments Table

d - Personal Dashboard: - interacting with work days tracker -> should add ENTRY to WorkDays table -> with estimated income

e - Dashboard: - fetch relevant data from Database

f - Logout button -> logout

g - TopBar: - overview: summary of each user's dashboard - report: - analytics: graphs

    - search insights -> search user, salary ...

    - Add Income, Add Expense -> Add Transaction Modal

h - SideBar: - AI Assistant: - use local AI for now - Help - show FAQs page

0 - Settins/Profile - Edit Profile button -> should UPDATE User's Table - Account: update email, password - Notifications: coming soon... - Security: Two-Factor Auth (in the future) - Preferences: Language (in the future), Theme (in the future)

---

budgets:
a. fetch budgets - done
b. fetch expense by category that should match with category of each budgets
c. calcualte the status and percentage
D. total budget -> for(b of budgets) sum(b.LimitAmount)
E. spent so far -> sum(( part b))
F. Remaining -> total - spent so far

1 - Add Bills ->
a - fetching categories (keep it in cache)
