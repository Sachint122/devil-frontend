// index.js (ESM)
export { ApiProvider } from "./src/context/ApiProvider.js";
export {
    configureApi,
    updateToken,
    clearToken,
} from "./src/context/apiConfig.js";

// Hooks
export { useApi } from "./src/hooks/useApi.js";
export { useClickOutside } from "./src/hooks/useClickOutside.js";
export { useDebounce } from "./src/hooks/useDebounce.js";
export { useFetch } from "./src/hooks/useFetch.js";
export { useInfiniteScroll } from "./src/hooks/useInfiniteScroll.js";
export { useOptimistic } from "./src/hooks/useOptimistic.js";
export { useToggle } from "./src/hooks/useToggle.js";
export { Show } from "./src/hooks/conditionalRender.js";

// Utils
export { capitalize } from "./src/utils/capitalize.js";
export { capitalizeWords } from "./src/utils/capitalizeWords.js";
export { formatDate } from "./src/utils/formatDate.js";
export { timeAgo } from "./src/utils/timeAgo.js";
export { isEmptyObject } from "./src/utils/isEmptyObject.js";
export { slugify } from "./src/utils/slugify.js";
