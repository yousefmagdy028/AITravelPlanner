import {text, timestamp, date, integer, jsonb, pgTable, varchar } from "drizzle-orm/pg-core";

export const usersTable = pgTable("users", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  name: varchar({ length: 255 }).notNull(),
  userId:varchar({length: 255}).notNull().unique(),
   role: varchar().notNull().default("user"),
  email: varchar({ length: 255 }).notNull().unique(),
});


export const destinations = pgTable("destinations", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),

  name: varchar("name", { length: 255 }).notNull(),        // اسم الوجهة
  country: varchar("country", { length: 255 }).notNull(),  // الدولة
  city: varchar("city", { length: 255 }),                  // المدينة
  description: text("description"),                        // وصف كامل
  highlights: text("highlights"),                          // ميزات/مواقع مميزة
  bestSeason: varchar("best_season", { length: 255 }),     // أفضل موسم للزيارة
  activities: text("activities"),                          // نشاطات ممكن يعملها السياح

  price: integer("price"),                                 // سعر تقريبي للشخص
  duration: varchar("duration", { length: 100 }),           // مدة الرحلة (3 أيام/أسبوع...)
  
  imageUrl: text("image"),                             // رابط الصورة
  
})


export const checkout = pgTable("checkout", {
   id: integer().primaryKey().generatedAlwaysAsIdentity(),
  firstName: text("first_name").notNull(),
  lastName: text("last_name").notNull(),
   email:text("email").notNull(),
   phone:text("phone").notNull(),
   checkInDate: date("check_in_date").notNull(),
  checkOutDate: date("check_out_date").notNull(),
  travelers: integer("num_travelers").notNull(),
  price: integer("price").notNull(),
  
});