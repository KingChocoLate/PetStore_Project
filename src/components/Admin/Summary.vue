<template>
  <div class="p-6 rounded-[24px] bg-white border border-slate-100 shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow">
    <div class="flex items-start justify-between">
      <div>
        <p class="text-[11px] font-bold text-slate-400 uppercase tracking-wide">{{ title }}</p>
        <h3 class="mt-2 text-2xl font-black text-slate-900">{{ formatValue(total) }}</h3>
      </div>
      <div class="p-3 bg-slate-50 rounded-2xl">
        <div class="w-6 h-6 bg-emerald-500 rounded-full"></div>
      </div>
    </div>

    <div class="mt-4 flex items-center gap-2">
      <span class="text-xs font-bold px-2 py-1 rounded-lg" :class="gain >= 0 ? 'bg-emerald-50 text-emerald-700' : 'bg-red-50 text-red-700'">
        {{ gain >= 0 ? '+' : '' }}{{ gain }}%
      </span>
      <span class="text-xs font-medium text-slate-400">vs last month</span>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'Summary',
  props: {
    title: { type: String, required: true },
    total: { type: Number, default: 0 },
    gain: { type: Number, default: 0 }
  },
  methods: {
    formatValue(val: number) {
      if(this.title.toLowerCase().includes('sales')) return `$${val.toLocaleString()}`;
      return val.toLocaleString();
    }
  }
});
</script>
