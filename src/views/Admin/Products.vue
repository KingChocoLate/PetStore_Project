<template>
  <div class="w-full min-h-screen bg-slate-50 flex flex-col">
    <main class="flex-1 w-full overflow-y-auto px-4 sm:px-8 pt-8 pb-10 flex flex-col gap-6">
      <!-- HERO -->
      <section class="relative overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
        <div class="absolute inset-0 bg-gradient-to-br from-emerald-50 via-white to-slate-50"></div>

        <div class="relative p-6 sm:p-7">
          <div class="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
            <div class="min-w-0">
              <div class="flex items-center gap-2 text-xs font-semibold text-slate-500">
                <span class="px-2 py-1 rounded-lg bg-white/70 border border-slate-200">Admin</span>
                <span>•</span>
                <span class="truncate">Product Management & Inventory Tracking</span>
              </div>

              <h1 class="mt-2 text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">Products</h1>
              <p class="mt-1 text-sm text-slate-600">
                Add / edit / delete products, track inventory, and export reports.
              </p>
            </div>

            <div class="flex flex-col sm:flex-row gap-2 sm:items-center">
              <button
                type="button"
                class="px-4 py-2 rounded-2xl bg-white border border-slate-200 hover:bg-slate-50 text-slate-800 text-xs font-extrabold shadow-sm transition"
                @click="exportCsv"
              >
                Export CSV
              </button>

              <button
                type="button"
                class="px-4 py-2 rounded-2xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-extrabold shadow-sm transition"
                @click="openCreate"
              >
                + Add Product
              </button>
            </div>
          </div>

          <!-- KPI -->
          <div class="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            <InfoTile label="Total products" :value="String(products.length)" hint="All SKUs" />
            <InfoTile label="Low stock" :value="String(lowStockCount)" hint="≤ reorder level" />
            <InfoTile label="Out of stock" :value="String(outOfStockCount)" hint="0 remaining" />
            <InfoTile label="Featured" :value="String(featuredCount)" hint="Homepage picks" />
          </div>
        </div>
      </section>

      <!-- CONTROLS -->
      <section class="rounded-3xl border border-slate-200 bg-white shadow-sm">
        <div class="p-4 sm:p-5 flex flex-col lg:flex-row gap-3 lg:items-center lg:justify-between">
          <div class="flex flex-col sm:flex-row gap-3 sm:items-center w-full lg:w-auto">
            <div class="relative w-full sm:w-[340px]">
              <input
                v-model="q"
                type="text"
                placeholder="Search name, SKU, category…"
                class="w-full h-11 px-4 pr-12 rounded-2xl border border-slate-200 bg-white text-sm font-semibold text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-300"
              />
              <button
                v-if="q"
                class="absolute right-2 top-1/2 -translate-y-1/2 px-2 py-1 text-xs font-black rounded-xl border border-slate-200 hover:bg-slate-50"
                @click="q=''"
                type="button"
              >
                Clear
              </button>
            </div>

            <select
              v-model="category"
              class="h-11 px-4 rounded-2xl border border-slate-200 bg-white text-sm font-extrabold text-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-300"
            >
              <option value="All">All categories</option>
              <option v-for="c in categories" :key="c" :value="c">{{ c }}</option>
            </select>

            <select
              v-model="stockFilter"
              class="h-11 px-4 rounded-2xl border border-slate-200 bg-white text-sm font-extrabold text-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-300"
            >
              <option value="All">All stock</option>
              <option value="Low">Low stock</option>
              <option value="Out">Out of stock</option>
            </select>

            <select
              v-model="statusFilter"
              class="h-11 px-4 rounded-2xl border border-slate-200 bg-white text-sm font-extrabold text-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-300"
            >
              <option value="All">All status</option>
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
            </select>
          </div>

          <div class="flex flex-col sm:flex-row gap-3 sm:items-center">
            <select
              v-model="sortBy"
              class="h-11 px-4 rounded-2xl border border-slate-200 bg-white text-sm font-extrabold text-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-300"
            >
              <option value="newest">Newest</option>
              <option value="name_asc">Name A→Z</option>
              <option value="price_desc">Price high→low</option>
              <option value="stock_asc">Stock low→high</option>
              <option value="sales_desc">Sales high→low</option>
            </select>

            <button
              type="button"
              class="h-11 px-4 rounded-2xl bg-white border border-slate-200 hover:bg-slate-50 text-slate-900 text-sm font-extrabold disabled:opacity-50 disabled:hover:bg-white"
              :disabled="selectedIds.length === 0"
              @click="bulkRestock"
              title="Add +10 stock to selected products"
            >
              Restock +10 ({{ selectedIds.length }})
            </button>

            <button
              type="button"
              class="h-11 px-4 rounded-2xl bg-white border border-rose-200 hover:bg-rose-50 text-rose-700 text-sm font-extrabold disabled:opacity-50 disabled:hover:bg-white"
              :disabled="selectedIds.length === 0"
              @click="bulkDelete"
            >
              Delete ({{ selectedIds.length }})
            </button>
          </div>
        </div>

        <!-- TABLE -->
        <div class="border-t border-slate-200 overflow-x-auto">
          <table class="min-w-[1060px] w-full">
            <thead>
              <tr class="text-left text-[11px] uppercase tracking-wide text-slate-500 font-black">
                <th class="py-3 px-4 w-[44px]">
                  <input type="checkbox" :checked="allChecked" @change="toggleAll($event)" />
                </th>
                <th class="py-3 px-4">Product</th>
                <th class="py-3 px-4">Category</th>
                <th class="py-3 px-4">Price</th>
                <th class="py-3 px-4">Inventory</th>
                <th class="py-3 px-4">Sales</th>
                <th class="py-3 px-4">Status</th>
                <th class="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>

            <tbody>
              <tr
                v-for="p in visible"
                :key="p.id"
                class="border-t border-slate-100 hover:bg-slate-50/70 transition"
              >
                <td class="py-4 px-4 align-top">
                  <input type="checkbox" :checked="selectedIds.includes(p.id)" @change="toggleOne(p.id, $event)" />
                </td>

                <td class="py-4 px-4 align-top">
                  <div class="flex items-center gap-3">
                    <img
                      :src="p.image"
                      alt=""
                      class="h-11 w-11 rounded-2xl border border-slate-200 object-cover bg-white"
                    />
                    <div class="min-w-0">
                      <div class="flex items-center gap-2">
                        <div class="font-black text-slate-900 truncate">{{ p.name }}</div>
                        <span
                          v-if="p.featured"
                          class="text-[10px] font-black px-2 py-1 rounded-xl border bg-amber-50 text-amber-800 border-amber-200"
                        >
                          Featured
                        </span>
                      </div>
                      <div class="text-xs font-bold text-slate-500">SKU: {{ p.sku }}</div>
                    </div>
                  </div>
                </td>

                <td class="py-4 px-4 align-top">
                  <span class="text-xs font-extrabold text-slate-800 px-2 py-1 rounded-xl bg-slate-100 border border-slate-200">
                    {{ p.category }}
                  </span>
                </td>

                <td class="py-4 px-4 align-top">
                  <div class="font-black text-slate-900">${{ p.price.toFixed(2) }}</div>
                  <div class="text-xs font-bold text-slate-500">Cost: ${{ p.cost.toFixed(2) }}</div>
                </td>

                <td class="py-4 px-4 align-top">
                  <div class="flex items-center gap-2">
                    <span class="text-xs font-black text-slate-800">
                      {{ p.stock }} / {{ p.totalStock }}
                    </span>

                    <span class="text-[10px] font-black px-2 py-1 rounded-xl border" :class="stockBadge(p)">
                      {{ stockLabel(p) }}
                    </span>
                  </div>

                  <div class="mt-2 h-2 w-[180px] rounded-full bg-slate-100 border border-slate-200 overflow-hidden">
                    <div class="h-full bg-slate-900" :style="{ width: stockPct(p) + '%' }"></div>
                  </div>

                  <div class="mt-2 flex items-center gap-2">
                    <button
                      class="px-2 py-1 text-xs font-black rounded-xl border border-slate-200 hover:bg-white disabled:opacity-40"
                      @click="adjustStock(p.id, -1)"
                      :disabled="p.stock <= 0"
                      title="Decrease stock"
                      type="button"
                    >
                      −
                    </button>
                    <button
                      class="px-2 py-1 text-xs font-black rounded-xl border border-slate-200 hover:bg-white"
                      @click="adjustStock(p.id, +1)"
                      title="Increase stock"
                      type="button"
                    >
                      +
                    </button>
                    <span class="text-[11px] font-semibold text-slate-500">Reorder ≤ {{ p.reorderLevel }}</span>
                  </div>
                </td>

                <td class="py-4 px-4 align-top">
                  <div class="font-black text-slate-900">{{ p.sales }}</div>
                  <div class="text-xs font-bold text-slate-500">Rating: {{ p.rating.toFixed(1) }}/5</div>
                </td>

                <td class="py-4 px-4 align-top">
                  <span
                    class="text-[10px] font-black px-3 py-1 rounded-xl border"
                    :class="p.status === 'Active'
                      ? 'bg-emerald-50 text-emerald-800 border-emerald-200'
                      : 'bg-slate-100 text-slate-700 border-slate-200'"
                  >
                    {{ p.status }}
                  </span>
                </td>

                <td class="py-4 px-4 align-top text-right">
                  <div class="flex justify-end gap-2">
                    <button
                      class="px-3 py-2 rounded-2xl bg-white border border-slate-200 hover:bg-slate-50 text-xs font-extrabold"
                      @click="toggleFeatured(p.id)"
                      :title="p.featured ? 'Remove featured' : 'Mark as featured'"
                      type="button"
                    >
                      {{ p.featured ? 'Unfeature' : 'Feature' }}
                    </button>
                    <button
                      class="px-3 py-2 rounded-2xl bg-white border border-slate-200 hover:bg-slate-50 text-xs font-extrabold"
                      @click="openEdit(p)"
                      type="button"
                    >
                      Edit
                    </button>
                    <button
                      class="px-3 py-2 rounded-2xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-extrabold"
                      @click="openView(p)"
                      type="button"
                    >
                      View
                    </button>
                    <button
                      class="px-3 py-2 rounded-2xl bg-white border border-rose-200 hover:bg-rose-50 text-rose-700 text-xs font-extrabold"
                      @click="confirmDelete(p)"
                      type="button"
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>

              <tr v-if="visible.length === 0">
                <td colspan="8" class="py-12 text-center">
                  <div class="text-slate-900 font-black">No products found</div>
                  <div class="text-sm text-slate-600 mt-1">Try adjusting filters or search keywords.</div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <!-- FOOTER -->
        <div class="p-4 sm:p-5 flex flex-col sm:flex-row gap-3 sm:items-center sm:justify-between">
          <div class="text-xs font-semibold text-slate-600">
            Showing <span class="font-black text-slate-900">{{ visible.length }}</span> of
            <span class="font-black text-slate-900">{{ filtered.length }}</span> results
          </div>

          <div class="flex items-center gap-2">
            <button
              class="px-3 py-2 rounded-2xl bg-white border border-slate-200 hover:bg-slate-50 text-xs font-extrabold disabled:opacity-50"
              @click="page = Math.max(1, page - 1)"
              :disabled="page === 1"
              type="button"
            >
              Prev
            </button>

            <div class="text-xs font-black text-slate-900 px-3">
              Page {{ page }} / {{ totalPages }}
            </div>

            <button
              class="px-3 py-2 rounded-2xl bg-white border border-slate-200 hover:bg-slate-50 text-xs font-extrabold disabled:opacity-50"
              @click="page = Math.min(totalPages, page + 1)"
              :disabled="page === totalPages"
              type="button"
            >
              Next
            </button>
          </div>
        </div>
      </section>

      <!-- TOAST -->
      <div
        v-if="toast"
        class="fixed bottom-5 right-5 z-[60] px-4 py-3 rounded-2xl bg-slate-900 text-white text-xs font-extrabold shadow-lg"
      >
        {{ toast }}
      </div>

      <!-- MODAL: Create/Edit/View -->
      <Modal v-if="modal.open" @close="closeModal">
        <template #title>
          <span v-if="modal.mode==='create'">Add Product</span>
          <span v-else-if="modal.mode==='edit'">Edit Product</span>
          <span v-else>Product Details</span>
        </template>

        <template #body>
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Field label="Name">
              <input
                v-model="form.name"
                :disabled="modal.mode==='view'"
                class="w-full h-11 px-4 rounded-2xl border border-slate-200 bg-white text-sm font-semibold text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-300 disabled:bg-slate-50"
                placeholder="e.g., Premium Dog Kibble"
              />
            </Field>

            <Field label="SKU">
              <input
                v-model="form.sku"
                :disabled="modal.mode==='view'"
                class="w-full h-11 px-4 rounded-2xl border border-slate-200 bg-white text-sm font-semibold text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-300 disabled:bg-slate-50"
                placeholder="e.g., SKU-0001"
              />
            </Field>

            <Field label="Category">
              <select
                v-model="form.category"
                :disabled="modal.mode==='view'"
                class="w-full h-11 px-4 rounded-2xl border border-slate-200 bg-white text-sm font-extrabold text-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-300 disabled:bg-slate-50"
              >
                <option v-for="c in categories" :key="c" :value="c">{{ c }}</option>
              </select>
            </Field>

            <Field label="Status">
              <select
                v-model="form.status"
                :disabled="modal.mode==='view'"
                class="w-full h-11 px-4 rounded-2xl border border-slate-200 bg-white text-sm font-extrabold text-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-300 disabled:bg-slate-50"
              >
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
              </select>
            </Field>

            <Field label="Price (USD)">
              <input
                v-model.number="form.price"
                :disabled="modal.mode==='view'"
                type="number"
                min="0"
                step="0.01"
                class="w-full h-11 px-4 rounded-2xl border border-slate-200 bg-white text-sm font-semibold text-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-300 disabled:bg-slate-50"
              />
            </Field>

            <Field label="Cost (USD)">
              <input
                v-model.number="form.cost"
                :disabled="modal.mode==='view'"
                type="number"
                min="0"
                step="0.01"
                class="w-full h-11 px-4 rounded-2xl border border-slate-200 bg-white text-sm font-semibold text-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-300 disabled:bg-slate-50"
              />
            </Field>

            <Field label="Stock">
              <input
                v-model.number="form.stock"
                :disabled="modal.mode==='view'"
                type="number"
                min="0"
                step="1"
                class="w-full h-11 px-4 rounded-2xl border border-slate-200 bg-white text-sm font-semibold text-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-300 disabled:bg-slate-50"
              />
            </Field>

            <Field label="Total Stock">
              <input
                v-model.number="form.totalStock"
                :disabled="modal.mode==='view'"
                type="number"
                min="0"
                step="1"
                class="w-full h-11 px-4 rounded-2xl border border-slate-200 bg-white text-sm font-semibold text-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-300 disabled:bg-slate-50"
              />
            </Field>

            <Field label="Reorder Level">
              <input
                v-model.number="form.reorderLevel"
                :disabled="modal.mode==='view'"
                type="number"
                min="0"
                step="1"
                class="w-full h-11 px-4 rounded-2xl border border-slate-200 bg-white text-sm font-semibold text-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-300 disabled:bg-slate-50"
              />
            </Field>

            <Field label="Featured">
              <div class="h-11 px-4 rounded-2xl border border-slate-200 bg-white flex items-center justify-between">
                <span class="text-sm font-semibold text-slate-700">
                  {{ form.featured ? 'Yes' : 'No' }}
                </span>
                <button
                  v-if="modal.mode!=='view'"
                  class="px-3 py-2 rounded-2xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-extrabold"
                  @click="form.featured = !form.featured"
                  type="button"
                >
                  Toggle
                </button>
              </div>
            </Field>

            <Field label="Image URL">
              <input
                v-model="form.image"
                :disabled="modal.mode==='view'"
                class="w-full h-11 px-4 rounded-2xl border border-slate-200 bg-white text-sm font-semibold text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-300 disabled:bg-slate-50"
                placeholder="https://..."
              />
            </Field>
          </div>

          <div v-if="modal.mode !== 'view'" class="mt-4 text-xs font-semibold">
            <p v-if="formError" class="text-rose-700 font-extrabold">{{ formError }}</p>
            <p v-else class="text-slate-600">
              Tip: Low stock badge shows when <span class="font-black text-slate-900">stock ≤ reorder level</span>.
            </p>
          </div>
        </template>

        <template #footer>
          <div class="flex gap-2 justify-end">
            <button
              class="px-4 py-2 rounded-2xl bg-white border border-slate-200 hover:bg-slate-50 text-xs font-extrabold"
              type="button"
              @click="closeModal"
            >
              Close
            </button>

            <button
              v-if="modal.mode !== 'view'"
              class="px-4 py-2 rounded-2xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-extrabold"
              type="button"
              @click="save"
            >
              Save
            </button>
          </div>
        </template>
      </Modal>

      <!-- DELETE CONFIRM -->
      <Modal v-if="deleteConfirm.open" @close="deleteConfirm.open=false">
        <template #title>Delete Product</template>
        <template #body>
          <div class="text-sm text-slate-700">
            Delete <span class="font-black text-slate-900">{{ deleteConfirm.name }}</span>? This cannot be undone.
          </div>
        </template>
        <template #footer>
          <div class="flex gap-2 justify-end">
            <button
              class="px-4 py-2 rounded-2xl bg-white border border-slate-200 hover:bg-slate-50 text-xs font-extrabold"
              type="button"
              @click="deleteConfirm.open=false"
            >
              Cancel
            </button>
            <button
              class="px-4 py-2 rounded-2xl bg-rose-600 hover:bg-rose-700 text-white text-xs font-extrabold"
              type="button"
              @click="doDelete"
            >
              Delete
            </button>
          </div>
        </template>
      </Modal>
    </main>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

type ProductStatus = "Active" | "Inactive";
type StockFilter = "All" | "Low" | "Out";
type SortKey = "newest" | "name_asc" | "price_desc" | "stock_asc" | "sales_desc";
type StatusFilter = "All" | ProductStatus;

interface Product {
  id: number;
  name: string;
  sku: string;
  category: string;
  price: number;
  cost: number;
  stock: number;
  totalStock: number;
  reorderLevel: number;
  rating: number;
  sales: number;
  status: ProductStatus;
  featured: boolean;
  image: string;
  createdAt: string;
}

const InfoTile = defineComponent({
  name: "InfoTile",
  props: {
    label: { type: String, required: true },
    value: { type: String, required: true },
    hint: { type: String, required: true },
  },
  template: `
    <div class="rounded-3xl border border-slate-200 bg-white/80 backdrop-blur p-4 shadow-sm">
      <div class="text-[11px] font-black uppercase tracking-wide text-slate-500">{{ label }}</div>
      <div class="mt-1 text-2xl font-black text-slate-900">{{ value }}</div>
      <div class="mt-1 text-xs font-semibold text-slate-600">{{ hint }}</div>
    </div>
  `,
});

const Field = defineComponent({
  name: "Field",
  props: { label: { type: String, required: true } },
  template: `
    <label class="block">
      <div class="text-[11px] font-black uppercase tracking-wide text-slate-500">{{ label }}</div>
      <div class="mt-2"><slot/></div>
    </label>
  `,
});

const Modal = defineComponent({
  name: "Modal",
  emits: ["close"],
  template: `
    <div class="fixed inset-0 z-[70] flex items-center justify-center px-4">
      <div class="absolute inset-0 bg-black/30" @click="$emit('close')"></div>
      <div class="relative w-full max-w-2xl rounded-3xl border border-slate-200 bg-white shadow-xl">
        <div class="p-5 border-b border-slate-200 flex items-start justify-between gap-4">
          <div class="text-lg font-black text-slate-900"><slot name="title"/></div>
          <button class="px-3 py-2 rounded-2xl border border-slate-200 hover:bg-slate-50 text-xs font-extrabold" @click="$emit('close')">
            Close
          </button>
        </div>
        <div class="p-5"><slot name="body"/></div>
        <div class="p-5 border-t border-slate-200"><slot name="footer"/></div>
      </div>
    </div>
  `,
});

export default defineComponent({
  name: "Products",
  components: { InfoTile, Field, Modal },

  // ✅ FIX: receive the global navbar search text from AdminLayout
  props: {
    globalSearch: { type: String, default: "" },
  },

  data() {
    const categories = ["Cat Food", "Dog Food", "Accessories", "Toys", "Health"];
    const img = (seed: number) => `https://picsum.photos/seed/admin-product-${seed}/160/160`;

    const products: Product[] = Array.from({ length: 16 }).map((_, i) => ({
      id: i + 1,
      name: i % 4 === 0 ? "Royal Canin Kitten" : i % 4 === 1 ? "Premium Dog Kibble" : i % 4 === 2 ? "Cat Toy Wand" : "Vitamin Chews",
      sku: `SKU-${String(i + 1).padStart(4, "0")}`,
      category: categories[i % categories.length],
      price: 12.5 + i * 2.35,
      cost: 7.0 + i * 1.5,
      stock: i % 6 === 0 ? 0 : 5 + (i * 3) % 40,
      totalStock: 60,
      reorderLevel: 10,
      rating: 3.9 + ((i % 5) * 0.2),
      sales: 40 + i * 13,
      status: i % 7 === 0 ? "Inactive" : "Active",
      featured: i % 8 === 0,
      image: img(i + 1),
      createdAt: new Date(Date.now() - i * 86400000 * 2).toISOString(),
    }));

    return {
      products,
      categories,

      // filters
      q: "" as string,
      category: "All" as string,
      stockFilter: "All" as StockFilter,
      statusFilter: "All" as StatusFilter,
      sortBy: "newest" as SortKey,

      // paging
      page: 1,
      pageSize: 8,

      // selection
      selectedIds: [] as number[],

      // ui
      toast: "" as string,
      formError: "" as string,

      modal: {
        open: false,
        mode: "create" as "create" | "edit" | "view",
        activeId: null as number | null,
      },

      form: {
        name: "",
        sku: "",
        category: categories[0],
        price: 0,
        cost: 0,
        stock: 0,
        totalStock: 60,
        reorderLevel: 10,
        status: "Active" as ProductStatus,
        featured: false,
        image: "https://picsum.photos/seed/new-admin-product/160/160",
      },

      deleteConfirm: {
        open: false,
        id: null as number | null,
        name: "",
      },
    };
  },

  computed: {
    lowStockCount(): number {
      return this.products.filter((p) => p.stock > 0 && p.stock <= p.reorderLevel).length;
    },
    outOfStockCount(): number {
      return this.products.filter((p) => p.stock === 0).length;
    },
    featuredCount(): number {
      return this.products.filter((p) => p.featured).length;
    },

    filtered(): Product[] {
      const q = this.q.trim().toLowerCase();

      let list = this.products.filter((p) => {
        const hit =
          !q ||
          p.name.toLowerCase().includes(q) ||
          p.sku.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q);

        const catOk = this.category === "All" || p.category === this.category;

        const stockOk =
          this.stockFilter === "All" ||
          (this.stockFilter === "Out" && p.stock === 0) ||
          (this.stockFilter === "Low" && p.stock > 0 && p.stock <= p.reorderLevel);

        const statusOk = this.statusFilter === "All" || p.status === this.statusFilter;

        return hit && catOk && stockOk && statusOk;
      });

      if (this.sortBy === "newest") list = list.slice().sort((a, b) => (a.createdAt < b.createdAt ? 1 : -1));
      if (this.sortBy === "name_asc") list = list.slice().sort((a, b) => a.name.localeCompare(b.name));
      if (this.sortBy === "price_desc") list = list.slice().sort((a, b) => b.price - a.price);
      if (this.sortBy === "stock_asc") list = list.slice().sort((a, b) => a.stock - b.stock);
      if (this.sortBy === "sales_desc") list = list.slice().sort((a, b) => b.sales - a.sales);

      return list;
    },

    totalPages(): number {
      return Math.max(1, Math.ceil(this.filtered.length / this.pageSize));
    },

    visible(): Product[] {
      const start = (this.page - 1) * this.pageSize;
      return this.filtered.slice(start, start + this.pageSize);
    },

    allChecked(): boolean {
      if (this.visible.length === 0) return false;
      return this.visible.every((p) => this.selectedIds.includes(p.id));
    },
  },

  watch: {
    // ✅ FIX: update local search when navbar search changes
    globalSearch(newVal: string) {
      this.q = (newVal || "").toString();
    },

    q() { this.page = 1; },
    category() { this.page = 1; },
    stockFilter() { this.page = 1; },
    statusFilter() { this.page = 1; },
    sortBy() { this.page = 1; },
    filtered() { this.page = Math.min(this.page, this.totalPages); },
  },

  methods: {
    toastMsg(msg: string) {
      this.toast = msg;
      window.clearTimeout((this as any)._t);
      (this as any)._t = window.setTimeout(() => (this.toast = ""), 1400);
    },

    stockPct(p: Product): number {
      const denom = Math.max(1, p.totalStock);
      return Math.max(0, Math.min(100, Math.round((p.stock / denom) * 100)));
    },
    stockLabel(p: Product): string {
      if (p.stock === 0) return "Out";
      if (p.stock <= p.reorderLevel) return "Low";
      return "OK";
    },
    stockBadge(p: Product): string {
      if (p.stock === 0) return "bg-rose-50 text-rose-800 border-rose-200";
      if (p.stock <= p.reorderLevel) return "bg-amber-50 text-amber-800 border-amber-200";
      return "bg-emerald-50 text-emerald-800 border-emerald-200";
    },

    adjustStock(id: number, delta: number) {
      this.products = this.products.map((p) =>
        p.id === id ? { ...p, stock: Math.max(0, p.stock + delta) } : p
      );
      this.toastMsg("Stock updated ✅");
    },

    toggleFeatured(id: number) {
      this.products = this.products.map((p) => (p.id === id ? { ...p, featured: !p.featured } : p));
      this.toastMsg("Updated featured ✅");
    },

    toggleOne(id: number, e: Event) {
      const checked = (e.target as HTMLInputElement).checked;
      if (checked) {
        if (!this.selectedIds.includes(id)) this.selectedIds.push(id);
      } else {
        this.selectedIds = this.selectedIds.filter((x) => x !== id);
      }
    },

    toggleAll(e: Event) {
      const checked = (e.target as HTMLInputElement).checked;
      const ids = this.visible.map((p) => p.id);
      if (checked) this.selectedIds = Array.from(new Set([...this.selectedIds, ...ids]));
      else this.selectedIds = this.selectedIds.filter((id) => !ids.includes(id));
    },

    bulkRestock() {
      if (this.selectedIds.length === 0) return;
      this.products = this.products.map((p) =>
        this.selectedIds.includes(p.id)
          ? { ...p, stock: p.stock + 10, totalStock: Math.max(p.totalStock, p.stock + 10) }
          : p
      );
      this.toastMsg("Restocked selected ✅");
    },

    bulkDelete() {
      if (this.selectedIds.length === 0) return;
      const n = this.selectedIds.length;
      this.products = this.products.filter((p) => !this.selectedIds.includes(p.id));
      this.selectedIds = [];
      this.toastMsg(`Deleted ${n} product(s) ✅`);
    },

    openCreate() {
      this.formError = "";
      this.modal.open = true;
      this.modal.mode = "create";
      this.modal.activeId = null;
      this.form = {
        name: "",
        sku: "",
        category: this.categories[0],
        price: 0,
        cost: 0,
        stock: 0,
        totalStock: 60,
        reorderLevel: 10,
        status: "Active",
        featured: false,
        image: "https://picsum.photos/seed/new-admin-product/160/160",
      };
    },

    openEdit(p: Product) {
      this.formError = "";
      this.modal.open = true;
      this.modal.mode = "edit";
      this.modal.activeId = p.id;
      this.form = {
        name: p.name,
        sku: p.sku,
        category: p.category,
        price: p.price,
        cost: p.cost,
        stock: p.stock,
        totalStock: p.totalStock,
        reorderLevel: p.reorderLevel,
        status: p.status,
        featured: p.featured,
        image: p.image,
      };
    },

    openView(p: Product) {
      this.formError = "";
      this.modal.open = true;
      this.modal.mode = "view";
      this.modal.activeId = p.id;
      this.form = {
        name: p.name,
        sku: p.sku,
        category: p.category,
        price: p.price,
        cost: p.cost,
        stock: p.stock,
        totalStock: p.totalStock,
        reorderLevel: p.reorderLevel,
        status: p.status,
        featured: p.featured,
        image: p.image,
      };
    },

    closeModal() {
      this.modal.open = false;
    },

    validate(): string {
      const name = this.form.name.trim();
      const sku = this.form.sku.trim().toUpperCase();
      if (!name) return "Name is required.";
      if (!sku) return "SKU is required.";

      const exists = this.products.some((p) => p.sku.toUpperCase() === sku && p.id !== this.modal.activeId);
      if (exists) return "SKU must be unique.";

      if ((Number(this.form.price) || 0) < 0) return "Price cannot be negative.";
      if ((Number(this.form.cost) || 0) < 0) return "Cost cannot be negative.";
      if ((Number(this.form.price) || 0) < (Number(this.form.cost) || 0)) return "Price should not be lower than cost.";

      return "";
    },

    save() {
      const err = this.validate();
      this.formError = err;
      if (err) return;

      const sku = this.form.sku.trim().toUpperCase();

      if (this.modal.mode === "create") {
        const nextId = Math.max(0, ...this.products.map((p) => p.id)) + 1;
        this.products.unshift({
          id: nextId,
          name: this.form.name.trim(),
          sku,
          category: this.form.category,
          price: Number(this.form.price) || 0,
          cost: Number(this.form.cost) || 0,
          stock: Math.max(0, Number(this.form.stock) || 0),
          totalStock: Math.max(0, Number(this.form.totalStock) || 0),
          reorderLevel: Math.max(0, Number(this.form.reorderLevel) || 0),
          rating: 4.2,
          sales: 0,
          status: this.form.status,
          featured: this.form.featured,
          image: this.form.image || "https://picsum.photos/seed/fallback-admin-product/160/160",
          createdAt: new Date().toISOString(),
        });
        this.toastMsg("Product created ✅");
      }

      if (this.modal.mode === "edit" && this.modal.activeId != null) {
        const id = this.modal.activeId;
        this.products = this.products.map((p) =>
          p.id === id
            ? {
                ...p,
                name: this.form.name.trim(),
                sku,
                category: this.form.category,
                price: Number(this.form.price) || 0,
                cost: Number(this.form.cost) || 0,
                stock: Math.max(0, Number(this.form.stock) || 0),
                totalStock: Math.max(0, Number(this.form.totalStock) || 0),
                reorderLevel: Math.max(0, Number(this.form.reorderLevel) || 0),
                status: this.form.status,
                featured: this.form.featured,
                image: this.form.image || p.image,
              }
            : p
        );
        this.toastMsg("Product updated ✅");
      }

      this.modal.open = false;
    },

    confirmDelete(p: Product) {
      this.deleteConfirm.open = true;
      this.deleteConfirm.id = p.id;
      this.deleteConfirm.name = p.name;
    },

    doDelete() {
      const id = this.deleteConfirm.id;
      if (id == null) return;
      this.products = this.products.filter((p) => p.id !== id);
      this.selectedIds = this.selectedIds.filter((x) => x !== id);
      this.deleteConfirm.open = false;
      this.toastMsg("Product deleted ✅");
    },

    exportCsv() {
      const rows = this.filtered.map((p) => ({
        id: p.id,
        name: p.name,
        sku: p.sku,
        category: p.category,
        price: p.price,
        cost: p.cost,
        stock: p.stock,
        totalStock: p.totalStock,
        reorderLevel: p.reorderLevel,
        sales: p.sales,
        status: p.status,
        featured: p.featured ? "Yes" : "No",
      }));

      if (rows.length === 0) {
        this.toastMsg("Nothing to export.");
        return;
      }

      const header = Object.keys(rows[0]).join(",");
      const body = rows
        .map((r) => Object.values(r).map((v) => `"${String(v).replaceAll('"', '""')}"`).join(","))
        .join("\n");

      const csv = header + "\n" + body;
      const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "products_report.csv";
      a.click();
      URL.revokeObjectURL(url);

      this.toastMsg("CSV exported ✅");
    },
  },
});
</script>
