"use client";

import { Warehouse } from "@phosphor-icons/react/dist/ssr/Warehouse";
import { LineChart } from "@/components/charts/LineChart";
import { BarList, DemoNote } from "@/components/charts/primitives";
import { inventoryTiles, months, productGroups, purchaseUnits, salesUnits, warehouses } from "@/content/demo/inventory";

const fmtK = (v: number) => `${(v / 1000).toFixed(v >= 10000 ? 0 : 1)}k`;

export function InventoryAnalytics() {
  return (
    <div className="overflow-hidden rounded-[20px] border border-line bg-mist shadow-[var(--shadow-soft)]">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-line bg-white px-4 py-3 md:px-5">
        <div className="flex items-center gap-3">
          <span aria-hidden className="grid size-8 place-items-center rounded-lg bg-navy text-white">
            <Warehouse size={17} weight="bold" />
          </span>
          <div>
            <p className="text-[0.9rem] font-semibold leading-tight text-ink">Inventory analytics</p>
            <p className="text-[0.72rem] text-muted">Stock position across warehouses, rolling 12 months</p>
          </div>
        </div>
        <DemoNote>Representative interface, demo data</DemoNote>
      </div>

      <div className="grid gap-3 p-3 md:p-5">
        <dl className="grid grid-cols-2 gap-2.5 md:grid-cols-4">
          {inventoryTiles.map((t) => (
            <div key={t.label} className="flex flex-col-reverse justify-end rounded-xl border border-line bg-white p-3.5">
              <dt className="mt-1.5 text-[0.74rem] text-muted">{t.label}</dt>
              <dd className="text-[1.15rem] font-[640] tracking-[-0.02em] text-ink">{t.value}</dd>
            </div>
          ))}
        </dl>

        <div className="grid gap-3 lg:grid-cols-2">
          <div className="rounded-xl border border-line bg-white p-4">
            <p className="text-[0.88rem] font-semibold text-ink">Stock on hand by warehouse</p>
            <p className="mb-4 text-[0.76rem] text-muted">Units</p>
            <BarList items={warehouses} format={fmtK} caption="Stock on hand by warehouse, in units" />
          </div>
          <div className="rounded-xl border border-line bg-white p-4">
            <p className="text-[0.88rem] font-semibold text-ink">Stock value by product group</p>
            <p className="mb-4 text-[0.76rem] text-muted">Thousand euros</p>
            <BarList items={productGroups} format={(v) => `€${v}K`} caption="Stock value by product group, in thousand euros" />
          </div>
        </div>

        <div className="rounded-xl border border-line bg-white p-4 md:p-5">
          <p className="text-[0.88rem] font-semibold text-ink">Sales and purchases</p>
          <p className="mb-3 text-[0.76rem] text-muted">Units per month. Purchases running ahead of sales build stock; behind, they draw it down.</p>
          <LineChart
            title="Monthly sales and purchase quantities"
            summary="Sales rise from about 22 thousand to 27 thousand units a month; purchases swing more widely around them."
            labels={months}
            series={[
              { id: "sales", label: "Sales", color: "#145fe5", values: salesUnits },
              { id: "purchases", label: "Purchases", color: "#e0930b", values: purchaseUnits },
            ]}
            format={fmtK}
            height={210}
            xTickEvery={1}
          />
        </div>
      </div>
    </div>
  );
}
