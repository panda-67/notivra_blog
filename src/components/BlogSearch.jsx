import { createSignal, createEffect } from "solid-js";

export default function BlogSearchModal() {
  const [open, setOpen] = createSignal(false);
  const [query, setQuery] = createSignal("");
  const [posts, setPosts] = createSignal([]);

  createEffect(async () => {
    const res = await fetch("/search.json");
    setPosts(await res.json());
  });

  const filtered = () => {
    const q = query().toLowerCase();
    if (!q) return [];
    return posts().filter(
      (p) =>
        p.title.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q) ||
        p.tags.join(" ").toLowerCase().includes(q)
    );
  };

  return (
    <>
      <button
        class="flex gap-2 px-3 pt-1 pb-1.5 bg-gray-200 rounded text-sm hover:bg-gray-400 hover:text-white"
        onClick={() => setOpen(true)}
        aria-label="Search"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="2.2"
          stroke="currentColor"
          class="w-5 h-5"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M21 21l-4.35-4.35m1.85-5.15a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
        <span class="hidden sm:inline">Search</span>
      </button>

      {open() && (
        <div class="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-start justify-center pt-24 z-50">
          <div class="bg-white w-full max-w-xl p-6 rounded-xl shadow-xl border border-gray-200">

            <div class="flex justify-between items-center-safe mb-4">
              <h2 class="font-semibold text-lg !mb-0">Search Articles</h2>
              <button
                class="text-sm hover:opacity-70 px-1"
                onClick={() => { setOpen(false); setQuery(""); }}
              >
                ✕
              </button>
            </div>

            <input
              type="text"
              class="w-full border border-gray-300 rounded px-3 py-2 mb-4 focus:outline-none focus:ring focus:ring-indigo-300"
              placeholder="Type to search…"
              onInput={(e) => setQuery(e.target.value)}
            />

            {filtered().length > 0 && (
              <ul class="space-y-3 max-h-80 overflow-y-auto pr-1">
                {filtered().map((post) => (
                  <li>
                    <a
                      href={`/${post.slug}`}
                      class="block p-3 border rounded hover:bg-gray-100"
                      onClick={() => setOpen(false)}
                    >
                      <div class="font-medium">{post.title}</div>
                      <div class="text-sm text-gray-500 line-clamp-2">
                        {post.description}
                      </div>
                    </a>
                  </li>
                ))}
              </ul>
            )}

            {query() && filtered().length === 0 && (
              <div class="text-sm text-gray-500">
                No results. Search sharper.
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
