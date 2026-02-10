import { db } from "./connection.js";
import { users, habits, entries, tags, habitTags } from "./schema.js";
import { resolve } from "node:path";
import { pathToFileURL } from "node:url";

const seed = async () => {
  console.log("🌱 Starting database seed");

  try {
    console.log("Clearing existing database...");
    await db.delete(entries);
    await db.delete(habitTags);
    await db.delete(tags);
    await db.delete(habits);
    await db.delete(users);
    console.log("Database cleared.");

    console.log("Creating demo user...");
    const [demoUser] = await db
      .insert(users)
      .values({
        email: "demo@example.com",
        username: "demo",
        password: "demo-password-change-me",
        firstname: "Demo",
        lastname: "User",
      })
      .returning();

    console.log("Demo user created.");

    const [healthTag] = await db
      .insert(tags)
      .values({
        name: "Health",
        color: "#FF5733",
      })
      .returning();

    const [exerciseHabit] = await db
      .insert(habits)
      .values({
        userId: demoUser.id,
        name: "Daily Exercise",
        description: "30 minutes of exercise",
        frequency: "daily",
        targetCount: 1,
      })
      .returning();

    await db.insert(habitTags).values({
      habitId: exerciseHabit.id,
      tagId: healthTag.id,
    });

    console.log("Adding habit entries...");

    const today = new Date();
    today.setHours(12, 0, 0, 0);

    for (let i = 0; i < 7; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() - i);

      await db.insert(entries).values({
        habitId: exerciseHabit.id,
        completeDate: date,
      });
    }

    console.log("Database seeding completed successfully.");
    console.log("🌱 Seed finished");
    console.log(`Email: ${demoUser.email}`);
    console.log(`Username: ${demoUser.username}`);
    console.log(`Password: demo-password-change-me`);
  } catch (e) {
    console.error("Seeding failed:", e);
    process.exit(1);
  }
};

if (import.meta.url === pathToFileURL(resolve(process.argv[1])).href) {
  seed().then(() => process.exit(0));
}

export default seed;
