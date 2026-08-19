create extension if not exists "uuid-ossp";

create table if not exists profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  full_name text,
  role text not null default 'customer' check (role in ('customer','seller','admin')),
  created_at timestamptz default now()
);

create table if not exists sellers (
  id uuid primary key default uuid_generate_v4(),
  owner_id uuid not null references profiles(id) on delete cascade,
  store_name text not null,
  description text,
  approved boolean not null default false,
  commission_rate numeric(5,2) not null default 10,
  created_at timestamptz default now()
);

create table if not exists categories (
  id uuid primary key default uuid_generate_v4(),
  name text not null unique,
  slug text not null unique
);

create table if not exists products (
  id uuid primary key default uuid_generate_v4(),
  seller_id uuid not null references sellers(id) on delete cascade,
  category_id uuid references categories(id),
  name text not null,
  slug text not null,
  description text,
  price numeric(12,2) not null,
  stock integer not null default 0,
  image_url text,
  approved boolean not null default false,
  created_at timestamptz default now()
);

create table if not exists orders (
  id uuid primary key default uuid_generate_v4(),
  customer_id uuid not null references profiles(id),
  status text not null default 'pending' check (status in ('pending','paid','preparing','shipped','delivered','cancelled')),
  total numeric(12,2) not null default 0,
  shipping_address jsonb,
  created_at timestamptz default now()
);

create table if not exists order_items (
  id uuid primary key default uuid_generate_v4(),
  order_id uuid not null references orders(id) on delete cascade,
  product_id uuid not null references products(id),
  seller_id uuid not null references sellers(id),
  quantity integer not null check(quantity > 0),
  unit_price numeric(12,2) not null
);

alter table profiles enable row level security;
alter table sellers enable row level security;
alter table categories enable row level security;
alter table products enable row level security;
alter table orders enable row level security;
alter table order_items enable row level security;

create policy "categories public read" on categories for select using (true);
create policy "approved products public read" on products for select using (approved = true);
create policy "users read own profile" on profiles for select using (auth.uid() = id);
create policy "users update own profile" on profiles for update using (auth.uid() = id);
create policy "seller owners read own store" on sellers for select using (auth.uid() = owner_id);
create policy "seller owners manage own products" on products for all using (
  seller_id in (select id from sellers where owner_id = auth.uid())
);

insert into categories(name,slug) values
('Elektronik','elektronik'),('Moda','moda'),('Ev & Yaşam','ev-yasam'),
('Spor','spor'),('Kozmetik','kozmetik'),('Oyun','oyun')
on conflict do nothing;