"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";

export type CakeData = {
  id: string;
  name: string;
  description: string | null;
  price: number;
  original_price: number | null;
  image_url: string | null;
  is_available: boolean;
  created_at: string;
};

export async function getCakes(): Promise<CakeData[]> {
  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from("cakes")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) throw error;
    return data || [];
  } catch (error) {
    console.error("Failed to fetch cakes:", error);
    throw new Error("Failed to fetch cakes");
  }
}

export async function getActiveCakes(): Promise<CakeData[]> {
  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from("cakes")
      .select("*")
      .eq("is_available", true)
      .order("created_at", { ascending: false });

    if (error) throw error;
    return data || [];
  } catch (error) {
    console.error("Failed to fetch active cakes:", error);
    throw new Error("Failed to fetch active cakes");
  }
}

export async function createCake(data: {
  name: string;
  description?: string;
  price: number;
  originalPrice?: number;
  image?: string;
}): Promise<{ success: boolean; cake?: CakeData; error?: string }> {
  try {
    const supabase = await createClient();
    const { data: cake, error } = await supabase
      .from("cakes")
      .insert({
        name: data.name,
        description: data.description || null,
        price: data.price,
        original_price: data.originalPrice || null,
        image_url: data.image || null,
        is_available: true,
      })
      .select()
      .single();

    if (error) throw error;
    revalidatePath("/admin/cakes");
    return { success: true, cake };
  } catch (error) {
    console.error("Failed to create cake:", error);
    return { success: false, error: "Failed to create cake" };
  }
}

export async function updateCake(
  id: string,
  data: {
    name: string;
    description?: string;
    price: number;
    originalPrice?: number;
    image?: string;
  },
): Promise<{ success: boolean; cake?: CakeData; error?: string }> {
  try {
    const supabase = await createClient();
    const { data: cake, error } = await supabase
      .from("cakes")
      .update({
        name: data.name,
        description: data.description || null,
        price: data.price,
        original_price: data.originalPrice || null,
        image_url: data.image || null,
      })
      .eq("id", id)
      .select()
      .single();

    if (error) throw error;
    revalidatePath("/admin/cakes");
    return { success: true, cake };
  } catch (error) {
    console.error("Failed to update cake:", error);
    return { success: false, error: "Failed to update cake" };
  }
}

export async function deleteCake(id: string) {
  try {
    const supabase = await createClient();
    const { error } = await supabase.from("cakes").delete().eq("id", id);

    if (error) throw error;
    revalidatePath("/admin/cakes");
    return { success: true };
  } catch (error) {
    console.error("Failed to delete cake:", error);
    return { success: false, error: "Failed to delete cake" };
  }
}

export async function toggleCakeActive(
  id: string,
  is_available: boolean,
): Promise<{ success: boolean; cake?: CakeData; error?: string }> {
  try {
    const supabase = await createClient();
    const { data: cake, error } = await supabase
      .from("cakes")
      .update({ is_available })
      .eq("id", id)
      .select()
      .single();

    if (error) throw error;
    revalidatePath("/admin/cakes");
    revalidatePath("/");
    return { success: true, cake };
  } catch (error) {
    console.error("Failed to toggle cake availability:", error);
    return { success: false, error: "Failed to toggle cake availability" };
  }
}
