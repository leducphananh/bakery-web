"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export type CakeData = {
  id: number;
  name: string;
  description: string | null;
  price: number;
  originalPrice: number | null;
  image: string | null;
  createdAt: Date;
  updatedAt: Date;
};

export async function getCakes(): Promise<CakeData[]> {
  try {
    const cakes = await prisma.cake.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });
    return cakes;
  } catch (error) {
    console.error("Failed to fetch cakes:", error);
    throw new Error("Failed to fetch cakes");
  }
}

export async function createCake(data: {
  name: string;
  description?: string;
  price: number;
  originalPrice?: number;
  image?: string;
}) {
  try {
    const cake = await prisma.cake.create({
      data: {
        name: data.name,
        description: data.description || null,
        price: data.price,
        originalPrice: data.originalPrice || null,
        image: data.image || null,
      },
    });
    revalidatePath("/admin/cakes");
    return { success: true, cake };
  } catch (error) {
    console.error("Failed to create cake:", error);
    return { success: false, error: "Failed to create cake" };
  }
}

export async function updateCake(
  id: number,
  data: {
    name: string;
    description?: string;
    price: number;
    originalPrice?: number;
    image?: string;
  },
) {
  try {
    const cake = await prisma.cake.update({
      where: { id },
      data: {
        name: data.name,
        description: data.description || null,
        price: data.price,
        originalPrice: data.originalPrice || null,
        image: data.image || null,
      },
    });
    revalidatePath("/admin/cakes");
    return { success: true, cake };
  } catch (error) {
    console.error("Failed to update cake:", error);
    return { success: false, error: "Failed to update cake" };
  }
}

export async function deleteCake(id: number) {
  try {
    await prisma.cake.delete({
      where: { id },
    });
    revalidatePath("/admin/cakes");
    return { success: true };
  } catch (error) {
    console.error("Failed to delete cake:", error);
    return { success: false, error: "Failed to delete cake" };
  }
}
