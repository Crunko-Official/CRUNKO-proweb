export function SectionHeading({
  label,
  title,
  centered = false,
}: {
  label: string;
  title: string;
  centered?: boolean;
}) {
  return (
    <div className={`mb-10 md:mb-12 ${centered ? 'text-center' : ''}`}>
      <span className="inline-block rounded-full border border-brand-green/15 bg-white/70 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-brand-green shadow-sm">
        {label}
      </span>
      <h2
        className={`mt-4 text-3xl font-bold leading-tight tracking-tight text-brand-dark md:text-4xl ${centered ? 'mx-auto max-w-2xl' : ''}`}
      >
        {title}
      </h2>
    </div>
  );
}

export function ProductCard({
  name,
  description,
  badge,
  delay,
}: {
  name: string;
  description: string;
  badge?: string;
  delay: number;
}) {
  return (
    <div
      className="card-surface interactive-lift group relative flex min-h-[320px] flex-col overflow-hidden rounded-2xl opacity-0 animate-fade-in-up"
      style={{ animationDelay: `${delay}ms`, animationFillMode: 'forwards' }}
    >
      <div className="relative flex aspect-[4/3] items-center justify-center overflow-hidden bg-gradient-to-br from-brand-mint to-brand-sage/45 p-8">
        <div className="flex h-32 w-24 items-center justify-center rounded-xl bg-gradient-to-b from-white to-brand-green-light shadow-inner transition-transform duration-500 ease-out group-hover:scale-105">
          <span className="text-center text-[10px] font-semibold uppercase tracking-widest text-brand-green/50">
            Mockup<br />Produk
          </span>
        </div>
        {badge && (
          <span className="absolute right-3 top-3 rounded-full bg-brand-green px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-white shadow-lg">
            {badge}
          </span>
        )}
      </div>
      <div className="flex flex-1 flex-col gap-2 p-5">
        <h3 className="text-lg font-bold text-brand-dark">{name}</h3>
        <p className="text-sm leading-relaxed text-brand-dark/60">{description}</p>
      </div>
    </div>
  );
}

export function MetricCard({ value, label }: { value: string; label: string }) {
  return (
    <div className="flex flex-col gap-1">
      <span className="text-3xl font-bold text-brand-green md:text-4xl">{value}</span>
      <span className="text-sm text-brand-dark/60">{label}</span>
    </div>
  );
}

export function StatBar({ label, percentage }: { label: string; percentage: number }) {
  return (
    <div className="flex flex-col gap-1.5">
      <div className="flex items-center justify-between text-sm">
        <span className="font-medium text-brand-dark">{label}</span>
        <span className="font-semibold text-brand-green">{percentage}%</span>
      </div>
      <div className="h-2.5 overflow-hidden rounded-full bg-brand-beige/60">
        <div
          className="h-full rounded-full bg-gradient-to-r from-brand-green to-brand-accent transition-all duration-1000"
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}

export function TimelineItem({
  year,
  title,
  description,
  side,
}: {
  year: string;
  title: string;
  description: string;
  side: 'left' | 'right';
}) {
  return (
    <div className="group relative flex items-start gap-8">
      <div
        className={`hidden flex-1 md:block ${side === 'right' ? 'order-1' : 'order-1 text-right'}`}
      >
        <div className="animate-fade-in-up opacity-0" style={{ animationFillMode: 'forwards' }}>
          {side === 'left' ? (
            <>
              <span className="inline-block rounded-full bg-brand-green-light px-3 py-1 text-sm font-bold text-brand-green">
                {year}
              </span>
              <h3 className="mt-2 text-xl font-bold text-brand-dark">{title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-brand-dark/60">{description}</p>
            </>
          ) : null}
        </div>
      </div>

      <div className="relative flex-shrink-0">
        <div className="relative z-10 flex h-6 w-6 items-center justify-center">
          <div className="h-3 w-3 rounded-full bg-brand-green ring-4 ring-brand-green-light transition-all duration-300 group-hover:scale-150 group-hover:ring-8" />
        </div>
        <div className="absolute left-1/2 top-6 h-full w-0.5 -translate-x-1/2 bg-gradient-to-b from-brand-beige to-brand-beige/20" />
      </div>

      <div className={`hidden flex-1 md:block ${side === 'right' ? 'order-1' : 'order-1'}`}>
        <div
          className="animate-fade-in-up opacity-0"
          style={{ animationDelay: '0.2s', animationFillMode: 'forwards' }}
        >
          {side === 'right' ? (
            <>
              <span className="inline-block rounded-full bg-brand-green-light px-3 py-1 text-sm font-bold text-brand-green">
                {year}
              </span>
              <h3 className="mt-2 text-xl font-bold text-brand-dark">{title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-brand-dark/60">{description}</p>
            </>
          ) : null}
        </div>
      </div>

      <div className="block md:hidden flex-1">
        <div className="animate-fade-in-up opacity-0 pb-8" style={{ animationFillMode: 'forwards' }}>
          <span className="inline-block rounded-full bg-brand-green-light px-3 py-1 text-sm font-bold text-brand-green">
            {year}
          </span>
          <h3 className="mt-2 text-lg font-bold text-brand-dark">{title}</h3>
          <p className="mt-1 text-sm leading-relaxed text-brand-dark/60">{description}</p>
        </div>
      </div>
    </div>
  );
}

export function SocialIcon({ label }: { label: string }) {
  return (
    <div className="interactive-lift flex h-11 w-11 cursor-pointer items-center justify-center rounded-xl border border-brand-line bg-white/80 text-xs font-bold uppercase tracking-wider text-brand-dark/50 shadow-sm hover:border-brand-green/30 hover:bg-brand-green-light hover:text-brand-green">
      {label}
    </div>
  );
}

export function FormField({ label, multiline = false }: { label: string; multiline?: boolean }) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-xs font-semibold uppercase tracking-wider text-brand-dark/60">
        {label}
      </label>
      {multiline ? (
        <textarea
          rows={4}
          className="w-full resize-none rounded-xl border border-brand-line bg-white/80 px-4 py-3 text-sm text-brand-dark outline-none transition-all duration-300 ease-out placeholder:text-brand-dark/30 focus:border-brand-green/40 focus:bg-white focus:shadow-lg focus:shadow-brand-green/5"
          placeholder={`${label.toLowerCase()} Anda...`}
        />
      ) : (
        <input
          type="text"
          className="w-full rounded-xl border border-brand-line bg-white/80 px-4 py-3 text-sm text-brand-dark outline-none transition-all duration-300 ease-out placeholder:text-brand-dark/30 focus:border-brand-green/40 focus:bg-white focus:shadow-lg focus:shadow-brand-green/5"
          placeholder={`${label.toLowerCase()} Anda`}
        />
      )}
    </div>
  );
}
