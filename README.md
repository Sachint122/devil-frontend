# devil-frontend

[![github](https://img.shields.io/badge/github-devil--frontend-black)](https://github.com/Sachint122/devil-frontend)
[![npm](https://img.shields.io/npm/v/devil-frontend.svg)](https://www.npmjs.com/package/devil-frontend)

A collection of React hooks and utility functions for frontend development.

## Installation

\\\ash
npm install devil-frontend
\\\

## Setup

### Option 1 � Global Config (Simple React Apps)

\\\js
// main.jsx or index.js � only once
import { configureApi } from 'devil-frontend';

configureApi({ baseURL: import.meta.env.VITE_API_URL });
\\\

### Option 2 � ApiProvider (Large React Apps)

\\\jsx
// main.jsx
import { ApiProvider } from 'devil-frontend';

<ApiProvider baseURL={import.meta.env.VITE_API_URL}>
  <App />
</ApiProvider>
\\\

---

## Hooks

### useApi

Make API calls without setting baseURL every time.

\\\jsx
import { useApi } from 'devil-frontend';

const { get, post, patch, put, del, setAuthToken, clearToken } = useApi();

// GET
const data = await get('/users');

// POST
const res = await post('/login', { email, password });

// Set token after login
setAuthToken(res.token);

// Clear token on logout
clearToken();
\\\

---

### useFetch

Fetch data with loading and error states.

\\\jsx
import { useFetch } from 'devil-frontend';

const { data, loading, error } = useFetch('/api/users');

if (loading) return <p>Loading...</p>;
if (error) return <p>Error!</p>;
\\\

---

### useDebounce

Delay a value update (useful for search inputs).

\\\jsx
import { useDebounce } from 'devil-frontend';

const [search, setSearch] = useState('');
const debouncedSearch = useDebounce(search, 500);

useEffect(() => {
  // API call only after 500ms of no typing
  fetchResults(debouncedSearch);
}, [debouncedSearch]);
\\\

---

### useToggle

Toggle boolean state easily.

\\\jsx
import { useToggle } from 'devil-frontend';

const [isOpen, toggle] = useToggle(false);

<button onClick={toggle}>Open/Close</button>
\\\

---

### useClickOutside

Detect click outside an element (useful for dropdowns/modals).

\\\jsx
import { useClickOutside } from 'devil-frontend';

const ref = useClickOutside(() => setIsOpen(false));

<div ref={ref}>
  <Dropdown />
</div>
\\\

---

### useInfiniteScroll

Load more data on scroll.

\\\jsx
import { useInfiniteScroll } from 'devil-frontend';

const { data, loading, hasMore } = useInfiniteScroll('/api/posts');
\\\

---

### useOptimistic

Update UI instantly before API response.

\\\jsx
import { useOptimistic } from 'devil-frontend';

const [optimisticLikes, addOptimisticLike] = useOptimistic(likes);

const handleLike = () => {
  addOptimisticLike(optimisticLikes + 1);
  await post('/like', { postId });
};
\\\

---

## Utils

\\\js
import { capitalize, capitalizeWords, formatDate, timeAgo, slugify, isEmptyObject } from 'devil-frontend';

capitalize('hello');           // Hello
capitalizeWords('hello world') // Hello World
formatDate('2024-01-01');      // Jan 1, 2024
timeAgo('2024-01-01');         // 1 year ago
slugify('Hello World');        // hello-world
isEmptyObject({});             // true
\\\

---

## Auth Flow

\\\jsx
// main.jsx � set baseURL once
configureApi({ baseURL: import.meta.env.VITE_API_URL });

// Login page � set token once
const { post, setAuthToken } = useApi();
const res = await post('/login', { email, password });
setAuthToken(res.token);

// Any other page � just use it!
const { get } = useApi();
get('/dashboard'); // token auto lagega ?

// Logout
const { clearToken } = useApi();
clearToken();
\\\

---

## License

ISC � [sachin-tiwari](https://github.com/sachin-tiwari)
