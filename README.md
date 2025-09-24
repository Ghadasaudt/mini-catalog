# 📚 Mini Catalog

A small Angular app that lists items (like products/books), supports search/filter/sort, shows details, and includes a create/edit form with validation.  
All data is persisted locally in `localStorage` — no backend required.

---

## 🚀 Features
- **List Page (`/`)**
  - Search items by title  
  - Sort by price or rating  
  - Filter by category  
  - Toggle **favorites** (persisted in localStorage)  

- **Details Page (`/items/:id`)**
  - Show all item fields  
  - Back navigation  

- **Create & Edit (`/items/new`, `/items/:id/edit`)**
  - Reactive Form with validation:
    - `title`: required, 3–80 chars  
    - `category`: required  
    - `price`: > 0  
    - `rating`: 0–5 (step 0.5)  
    - `description`: ≤ 500 chars  
    - `imageUrl`: optional, must be a valid image URL  

- **Persistence**
  - Loads initial data from `assets/items.json`  
  - Saves changes to `localStorage`  

- **Accessibility**
  - Proper labels, semantic HTML, keyboard focus support  

---

## 🛠️ Tech Stack
- Angular v16+ (standalone components)  
- TypeScript (strict mode)  
- Reactive Forms & Angular Router  
- Local JSON + LocalStorage  
- SCSS for styling  

---

## 📦 Setup & Run

Clone the repo and install dependencies:
```bash
git clone https://github.com/<your-username>/mini-catalog.git
cd mini-catalog
npm install
Start a local dev server:

ng serve

🧪 Testing

Run unit tests:

ng test
Project Structure
src/app/
  items/
    list/       → List page
    details/    → Item details
    form/       → Create & edit form
  models/       → Item model
  assets/       → Initial data (items.json)
