alter table "public"."Diner" drop constraint "Diner_receipt_id_fkey";

alter table "public"."Dish" drop constraint "Dish_receipt_id_fkey";

alter table "public"."Receipt" drop constraint "Receipt_user_id_fkey";

alter table "public"."diner_dish" drop constraint "diner_dish_diner_id_fkey";

alter table "public"."diner_dish" drop constraint "diner_dish_dish_id_fkey";

alter table "public"."Diner" drop constraint "Diner_pkey";

alter table "public"."Dish" drop constraint "Dish_pkey";

alter table "public"."Receipt" drop constraint "Receipt_pkey";

drop index if exists "public"."Diner_pkey";

drop index if exists "public"."Dish_pkey";

drop index if exists "public"."Receipt_pkey";

drop table "public"."Diner";

drop table "public"."Dish";

drop table "public"."Receipt";

create table "public"."diner" (
    "id" bigint generated by default as identity not null,
    "created_at" timestamp with time zone default now(),
    "name" text,
    "receipt_id" uuid
);


alter table "public"."diner" enable row level security;

create table "public"."dish" (
    "id" bigint generated by default as identity not null,
    "created_at" timestamp with time zone default now(),
    "name" text,
    "price" real,
    "receipt_id" uuid
);


alter table "public"."dish" enable row level security;

create table "public"."receipt" (
    "created_at" timestamp with time zone default now(),
    "total" real,
    "tax" real,
    "tip" real,
    "subtotal" real,
    "receiptDate" timestamp with time zone,
    "paymentMethod" text,
    "notes" text,
    "user_id" uuid,
    "id" uuid not null default gen_random_uuid()
);


CREATE UNIQUE INDEX "Receipt_id_key" ON public.receipt USING btree (id);

CREATE UNIQUE INDEX "Diner_pkey" ON public.diner USING btree (id);

CREATE UNIQUE INDEX "Dish_pkey" ON public.dish USING btree (id);

CREATE UNIQUE INDEX "Receipt_pkey" ON public.receipt USING btree (id);

alter table "public"."diner" add constraint "Diner_pkey" PRIMARY KEY using index "Diner_pkey";

alter table "public"."dish" add constraint "Dish_pkey" PRIMARY KEY using index "Dish_pkey";

alter table "public"."receipt" add constraint "Receipt_pkey" PRIMARY KEY using index "Receipt_pkey";

alter table "public"."diner" add constraint "diner_receipt_id_fkey" FOREIGN KEY (receipt_id) REFERENCES receipt(id) ON DELETE SET NULL not valid;

alter table "public"."diner" validate constraint "diner_receipt_id_fkey";

alter table "public"."dish" add constraint "dish_receipt_id_fkey" FOREIGN KEY (receipt_id) REFERENCES receipt(id) ON DELETE SET NULL not valid;

alter table "public"."dish" validate constraint "dish_receipt_id_fkey";

alter table "public"."receipt" add constraint "Receipt_id_key" UNIQUE using index "Receipt_id_key";

alter table "public"."receipt" add constraint "receipt_user_id_fkey" FOREIGN KEY (user_id) REFERENCES auth.users(id) ON DELETE SET NULL not valid;

alter table "public"."receipt" validate constraint "receipt_user_id_fkey";

alter table "public"."diner_dish" add constraint "diner_dish_diner_id_fkey" FOREIGN KEY (diner_id) REFERENCES diner(id) ON DELETE CASCADE not valid;

alter table "public"."diner_dish" validate constraint "diner_dish_diner_id_fkey";

alter table "public"."diner_dish" add constraint "diner_dish_dish_id_fkey" FOREIGN KEY (dish_id) REFERENCES dish(id) ON DELETE CASCADE not valid;

alter table "public"."diner_dish" validate constraint "diner_dish_dish_id_fkey";

create policy "Enable access for authenticated users only"
on "public"."receipt"
as permissive
for all
to authenticated;



