# 📝 Blog UI - Personal Blog Website

> **Project Type:** WEB (Next.js + TailwindCSS + shadcn/ui)
> **Style:** Minimalist
> **Scope:** UI-only (mock data, no backend)

---

## Overview

Xây dựng giao diện UI cho một personal blog với phong cách **minimalist**. Tập trung vào:

- Clean typography & generous whitespace
- Single-author blog (chỉ 1 tác giả)
- Responsive design (mobile-first)
- shadcn/ui components cho consistency

### Pages Required

| Page                 | Route                              | Description                                 |
| -------------------- | ---------------------------------- | ------------------------------------------- |
| **Feed**             | `/`                                | Danh sách bài viết với search functionality |
| **Post Detail**      | `/posts/[slug]`                    | Trang chi tiết bài viết                     |
| **Create/Edit Post** | `/posts/new`, `/posts/[slug]/edit` | Form tạo/chỉnh sửa bài viết                 |
| **Edit Profile**     | `/profile/edit`                    | Chỉnh sửa thông tin tác giả                 |
| **Login**            | `/login`                           | Đăng nhập (UI only)                         |

---

## Success Criteria

- [ ] Responsive trên mobile, tablet, desktop
- [ ] Dark/Light mode toggle
- [ ] Consistent design language với shadcn/ui
- [ ] Minimalist aesthetic - generous whitespace, clean typography
- [ ] Search UI hoạt động (client-side filter mock data)
- [ ] Form validation UI (visual feedback)
- [ ] Semantic HTML & accessibility basics

---

## Tech Stack

| Technology       | Version           | Rationale                                  |
| ---------------- | ----------------- | ------------------------------------------ |
| **Next.js**      | 15.x (App Router) | Modern React framework, file-based routing |
| **TailwindCSS**  | 4.x               | CSS-first configuration, fast development  |
| **shadcn/ui**    | Latest            | High-quality, accessible components        |
| **TypeScript**   | 5.x               | Type safety, better DX                     |
| **Lucide React** | Latest            | Icon set (consistent with shadcn)          |

### Font Selection (Minimalist)

| Type                | Font             | Rationale                       |
| ------------------- | ---------------- | ------------------------------- |
| **Sans**            | Inter            | Clean, readable, web-optimized  |
| **Serif** (display) | Playfair Display | Elegant headings for blog posts |

### Color Palette (Minimalist - Neutral Base)

| Role               | Light Mode    | Dark Mode     |
| ------------------ | ------------- | ------------- |
| **Background**     | `zinc-50`     | `zinc-950`    |
| **Surface**        | `white`       | `zinc-900`    |
| **Text Primary**   | `zinc-900`    | `zinc-100`    |
| **Text Secondary** | `zinc-600`    | `zinc-400`    |
| **Accent**         | `emerald-600` | `emerald-500` |
| **Border**         | `zinc-200`    | `zinc-800`    |

> 🔴 **NO purple/violet colors** (Purple Ban active)

---

## File Structure

```
blog2/
├── src/
│   ├── app/
│   │   ├── layout.tsx                # Root layout + theme provider
│   │   ├── page.tsx                  # Feed page (home)
│   │   ├── login/
│   │   │   └── page.tsx              # Login page
│   │   ├── posts/
│   │   │   ├── new/
│   │   │   │   └── page.tsx          # Create post page
│   │   │   └── [slug]/
│   │   │       ├── page.tsx          # Post detail page
│   │   │       └── edit/
│   │   │           └── page.tsx      # Edit post page
│   │   └── profile/
│   │       └── edit/
│   │           └── page.tsx          # Edit profile page
│   │
│   ├── components/
│   │   ├── ui/                       # shadcn/ui components
│   │   ├── layout/
│   │   │   ├── header.tsx            # Site header + nav
│   │   │   ├── footer.tsx            # Site footer
│   │   │   └── container.tsx         # Max-width container
│   │   ├── posts/
│   │   │   ├── post-card.tsx         # Post preview card (feed)
│   │   │   ├── post-content.tsx      # Post body renderer
│   │   │   └── post-form.tsx         # Create/Edit post form
│   │   ├── profile/
│   │   │   └── profile-form.tsx      # Edit profile form
│   │   ├── search/
│   │   │   └── search-input.tsx      # Search input component
│   │   └── auth/
│   │       └── login-form.tsx        # Login form component
│   │
│   ├── lib/
│   │   ├── utils.ts                  # Utility functions (cn, etc.)
│   │   └── mock-data.ts              # Mock data for posts, author
│   │
│   └── styles/
│       └── globals.css               # Global styles + Tailwind
│
├── public/
│   └── images/                       # Static images
│
└── package.json
```

---

## Task Breakdown

### Phase 1: Project Setup

#### Task 1.1: Initialize Next.js Project

- **Agent:** `frontend-specialist`
- **Skills:** `clean-code`, `react-best-practices`
- **Priority:** P0 (blocker)

| Attribute  | Value                               |
| ---------- | ----------------------------------- |
| **INPUT**  | Empty directory                     |
| **OUTPUT** | Next.js 15 project with TypeScript  |
| **VERIFY** | `npm run dev` starts without errors |

**Steps:**

```bash
npx -y create-next-app@latest ./ --typescript --tailwind --eslint --app --src-dir --import-alias "@/*"
```

---

#### Task 1.2: Install & Configure shadcn/ui

- **Agent:** `frontend-specialist`
- **Skills:** `tailwind-patterns`
- **Priority:** P0 (blocker)
- **Dependencies:** Task 1.1

| Attribute  | Value                                           |
| ---------- | ----------------------------------------------- |
| **INPUT**  | Next.js project                                 |
| **OUTPUT** | shadcn/ui initialized with base components      |
| **VERIFY** | Can import Button from `@/components/ui/button` |

**Steps:**

```bash
npx -y shadcn@latest init
npx -y shadcn@latest add button input label card avatar textarea
```

---

#### Task 1.3: Setup Theme & Typography

- **Agent:** `frontend-specialist`
- **Skills:** `frontend-design`, `tailwind-patterns`
- **Priority:** P1
- **Dependencies:** Task 1.2

| Attribute  | Value                                          |
| ---------- | ---------------------------------------------- |
| **INPUT**  | shadcn/ui setup                                |
| **OUTPUT** | Custom theme (fonts, colors), dark mode toggle |
| **VERIFY** | Dark/light mode toggles correctly, fonts load  |

**Components:**

- Add Inter + Playfair Display fonts
- Configure color scheme in `globals.css`
- Add theme toggle component

---

### Phase 2: Layout Components

#### Task 2.1: Create Layout Components

- **Agent:** `frontend-specialist`
- **Skills:** `frontend-design`, `react-best-practices`
- **Priority:** P0
- **Dependencies:** Task 1.3

| Attribute  | Value                                |
| ---------- | ------------------------------------ |
| **INPUT**  | Theme configured                     |
| **OUTPUT** | Header, Footer, Container components |
| **VERIFY** | Layout renders on all pages          |

**Components:**

- `header.tsx` - Logo, nav links, theme toggle
- `footer.tsx` - Copyright, social links
- `container.tsx` - Max-width wrapper

---

#### Task 2.2: Update Root Layout

- **Agent:** `frontend-specialist`
- **Priority:** P0
- **Dependencies:** Task 2.1

| Attribute  | Value                            |
| ---------- | -------------------------------- |
| **INPUT**  | Layout components                |
| **OUTPUT** | Root layout with Header/Footer   |
| **VERIFY** | All pages show consistent layout |

---

### Phase 3: Feed Page (Home)

#### Task 3.1: Create Mock Data

- **Agent:** `frontend-specialist`
- **Priority:** P1
- **Dependencies:** Task 1.1

| Attribute  | Value                                      |
| ---------- | ------------------------------------------ |
| **INPUT**  | -                                          |
| **OUTPUT** | `mock-data.ts` with posts[], author object |
| **VERIFY** | Can import and use mock data               |

**Data Structure:**

```typescript
interface Post {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  coverImage?: string;
  publishedAt: string;
  tags: string[];
}

interface Author {
  name: string;
  avatar: string;
  bio: string;
  email: string;
}
```

---

#### Task 3.2: Create Post Card Component

- **Agent:** `frontend-specialist`
- **Skills:** `frontend-design`
- **Priority:** P1
- **Dependencies:** Task 3.1

| Attribute  | Value                                     |
| ---------- | ----------------------------------------- |
| **INPUT**  | Mock data structure                       |
| **OUTPUT** | `post-card.tsx` - minimalist post preview |
| **VERIFY** | Renders post title, excerpt, date, tags   |

**Design Notes:**

- Clean, minimal card with generous padding
- Hover effect (subtle lift or border change)
- Tag chips with muted colors
- Relative date formatting

---

#### Task 3.3: Create Search Input Component

- **Agent:** `frontend-specialist`
- **Priority:** P1
- **Dependencies:** Task 1.2

| Attribute  | Value                               |
| ---------- | ----------------------------------- |
| **INPUT**  | shadcn Input component              |
| **OUTPUT** | `search-input.tsx` with search icon |
| **VERIFY** | Input accepts text, has search icon |

---

#### Task 3.4: Build Feed Page

- **Agent:** `frontend-specialist`
- **Priority:** P0
- **Dependencies:** Task 3.2, Task 3.3

| Attribute  | Value                                         |
| ---------- | --------------------------------------------- |
| **INPUT**  | PostCard, SearchInput, mock data              |
| **OUTPUT** | Feed page with search filter                  |
| **VERIFY** | Shows all posts, search filters by title/tags |

**Features:**

- Hero section with author intro
- Search bar
- Post list (grid or vertical stack)
- Client-side filtering

---

### Phase 4: Post Detail Page

#### Task 4.1: Create Post Content Component

- **Agent:** `frontend-specialist`
- **Skills:** `frontend-design`
- **Priority:** P1
- **Dependencies:** Task 3.1

| Attribute  | Value                                       |
| ---------- | ------------------------------------------- |
| **INPUT**  | Post content string                         |
| **OUTPUT** | `post-content.tsx` - styled article content |
| **VERIFY** | Renders content with typography styles      |

**Design Notes:**

- Prose styling (large text, comfortable line height)
- Max-width for readability (~65 characters)
- Styled headings, code blocks, blockquotes

---

#### Task 4.2: Build Post Detail Page

- **Agent:** `frontend-specialist`
- **Priority:** P0
- **Dependencies:** Task 4.1

| Attribute  | Value                                      |
| ---------- | ------------------------------------------ |
| **INPUT**  | PostContent component, mock data           |
| **OUTPUT** | `/posts/[slug]/page.tsx`                   |
| **VERIFY** | Shows post with title, date, tags, content |

**Layout:**

- Cover image (if exists)
- Title + meta (date, reading time, tags)
- Article content
- Author card at bottom
- Back to feed link

---

### Phase 5: Post Editor

#### Task 5.1: Create Post Form Component

- **Agent:** `frontend-specialist`
- **Skills:** `frontend-design`
- **Priority:** P1
- **Dependencies:** Task 1.2

| Attribute  | Value                                            |
| ---------- | ------------------------------------------------ |
| **INPUT**  | shadcn form components                           |
| **OUTPUT** | `post-form.tsx` - create/edit post form          |
| **VERIFY** | Form displays with all fields, validation states |

**Fields:**

- Title (required)
- Slug (auto-generated from title)
- Excerpt (textarea)
- Cover image URL
- Content (large textarea)
- Tags (comma-separated or chips)
- Publish toggle

---

#### Task 5.2: Build Create Post Page

- **Agent:** `frontend-specialist`
- **Priority:** P1
- **Dependencies:** Task 5.1

| Attribute  | Value                                |
| ---------- | ------------------------------------ |
| **INPUT**  | PostForm component                   |
| **OUTPUT** | `/posts/new/page.tsx`                |
| **VERIFY** | Empty form renders, validation works |

---

#### Task 5.3: Build Edit Post Page

- **Agent:** `frontend-specialist`
- **Priority:** P1
- **Dependencies:** Task 5.1

| Attribute  | Value                                  |
| ---------- | -------------------------------------- |
| **INPUT**  | PostForm component, mock data          |
| **OUTPUT** | `/posts/[slug]/edit/page.tsx`          |
| **VERIFY** | Form pre-fills with existing post data |

---

### Phase 6: Profile & Auth

#### Task 6.1: Create Profile Form Component

- **Agent:** `frontend-specialist`
- **Priority:** P2
- **Dependencies:** Task 1.2

| Attribute  | Value                                         |
| ---------- | --------------------------------------------- |
| **INPUT**  | shadcn form components                        |
| **OUTPUT** | `profile-form.tsx`                            |
| **VERIFY** | Form displays avatar, name, bio, email fields |

**Fields:**

- Avatar (URL input or placeholder)
- Name
- Email
- Bio (textarea)
- Social links (optional)

---

#### Task 6.2: Build Edit Profile Page

- **Agent:** `frontend-specialist`
- **Priority:** P2
- **Dependencies:** Task 6.1

| Attribute  | Value                           |
| ---------- | ------------------------------- |
| **INPUT**  | ProfileForm, mock author data   |
| **OUTPUT** | `/profile/edit/page.tsx`        |
| **VERIFY** | Form pre-fills with author data |

---

#### Task 6.3: Create Login Form Component

- **Agent:** `frontend-specialist`
- **Priority:** P2
- **Dependencies:** Task 1.2

| Attribute  | Value                                    |
| ---------- | ---------------------------------------- |
| **INPUT**  | shadcn form components                   |
| **OUTPUT** | `login-form.tsx`                         |
| **VERIFY** | Email/password fields with submit button |

---

#### Task 6.4: Build Login Page

- **Agent:** `frontend-specialist`
- **Priority:** P2
- **Dependencies:** Task 6.3

| Attribute  | Value                       |
| ---------- | --------------------------- |
| **INPUT**  | LoginForm component         |
| **OUTPUT** | `/login/page.tsx`           |
| **VERIFY** | Centered login form renders |

---

## Phase X: Verification

### Checklist

- [ ] **Lint & Type Check**

  ```bash
  npm run lint && npx tsc --noEmit
  ```

- [ ] **Build Success**

  ```bash
  npm run build
  ```

- [ ] **Visual Review**
  - [ ] All pages render correctly
  - [ ] Dark/light mode works
  - [ ] Responsive on mobile/tablet/desktop
  - [ ] No purple/violet colors used
  - [ ] Minimalist aesthetic achieved

- [ ] **Accessibility**
  - [ ] Semantic HTML (headings, labels)
  - [ ] Focus states visible
  - [ ] Color contrast acceptable

- [ ] **UX Audit**
  ```bash
  python .agent/skills/frontend-design/scripts/ux_audit.py .
  ```

---

## Risk Assessment

| Risk                       | Likelihood | Mitigation                |
| -------------------------- | ---------- | ------------------------- |
| shadcn/ui version mismatch | Low        | Use `npx shadcn@latest`   |
| Tailwind v4 config issues  | Medium     | Follow CSS-first patterns |
| Font loading issues        | Low        | Use `next/font`           |

---

## Notes

- **UI Only:** Không có logic backend, authentication, hoặc database
- **Mock Data:** Tất cả data được lưu trong `mock-data.ts`
- **Future-ready:** Cấu trúc files dễ dàng tích hợp backend sau này
