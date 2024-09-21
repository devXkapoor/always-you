import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET() {
  try {
    const count = await prisma.memory.count();
    console.log(`Memory count: ${count}`);

    if (count === 0) {
      return NextResponse.json({ memory: null }, { status: 404 });
    }

    const randomIndex = Math.floor(Math.random() * count);
    console.log(`Random index: ${randomIndex}`);

    const randomMemory = await prisma.memory.findMany({
      take: 1,
      skip: randomIndex,
    });

    console.log(`Fetched memory: ${JSON.stringify(randomMemory)}`);

    return NextResponse.json({
      memory: randomMemory[0] || { text: "No memory found." },
    });
  } catch (error) {
    console.error("Error fetching memory:", error);
    return NextResponse.json(
      { error: "Failed to fetch memory" },
      { status: 500 }
    );
  }
}
