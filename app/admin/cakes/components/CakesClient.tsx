"use client";

import { useState } from "react";
import { toast } from "sonner";
import {
  createCake,
  deleteCake,
  toggleCakeActive,
  updateCake,
  type CakeData,
} from "../actions";
import { CakeCard } from "./CakeCard";
import { CakeFormDialog, type CakeFormValues } from "./CakeFormDialog";
import { DeleteConfirmDialog } from "./DeleteConfirmDialog";
import { EmptyState } from "./EmptyState";
import { PageHeader } from "./PageHeader";

interface CakesClientProps {
  initialCakes: CakeData[];
}

export function CakesClient({ initialCakes }: CakesClientProps) {
  const [cakes, setCakes] = useState<CakeData[]>(initialCakes);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [editingCake, setEditingCake] = useState<CakeData | null>(null);
  const [deletingCakeId, setDeletingCakeId] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleAddNew = () => {
    setEditingCake(null);
    setIsDialogOpen(true);
  };

  const handleEdit = (cake: CakeData) => {
    setEditingCake(cake);
    setIsDialogOpen(true);
  };

  const handleDeleteClick = (id: string) => {
    setDeletingCakeId(id);
    setIsDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = async () => {
    if (deletingCakeId) {
      setIsSubmitting(true);
      try {
        const result = await deleteCake(deletingCakeId);
        if (result.success) {
          setCakes(cakes.filter((c) => c.id !== deletingCakeId));
          toast.success("Đã xóa bánh thành công!");
        } else {
          toast.error(result.error || "Có lỗi xảy ra khi xóa bánh");
        }
      } catch {
        toast.error("Có lỗi xảy ra khi xóa bánh");
      } finally {
        setIsSubmitting(false);
        setIsDeleteDialogOpen(false);
        setDeletingCakeId(null);
      }
    }
  };

  const handleSubmit = async (values: CakeFormValues) => {
    setIsSubmitting(true);
    try {
      if (editingCake) {
        const result = await updateCake(editingCake.id, values);
        if (result.success && result.cake) {
          setCakes(
            cakes.map((c) => (c.id === editingCake.id ? result.cake! : c)),
          );
          toast.success("Đã cập nhật bánh thành công!");
        } else {
          toast.error(result.error || "Có lỗi xảy ra khi cập nhật bánh");
        }
      } else {
        const result = await createCake(values);
        if (result.success && result.cake) {
          setCakes([result.cake, ...cakes]);
          toast.success("Đã thêm bánh mới thành công!");
        } else {
          toast.error(result.error || "Có lỗi xảy ra khi thêm bánh");
        }
      }
      setIsDialogOpen(false);
    } catch {
      toast.error("Có lỗi xảy ra");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleToggleActive = async (id: string, isActive: boolean) => {
    try {
      const result = await toggleCakeActive(id, isActive);
      if (result.success && result.cake) {
        setCakes(cakes.map((c) => (c.id === id ? result.cake! : c)));
        toast.success(
          isActive
            ? "Bánh đã được hiển thị trên trang chủ!"
            : "Bánh đã được ẩn khỏi trang chủ!",
        );
      } else {
        toast.error(result.error || "Có lỗi xảy ra");
      }
    } catch {
      toast.error("Có lỗi xảy ra");
    }
  };

  return (
    <main className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <PageHeader onAddNew={handleAddNew} />

      {cakes.length === 0 ? (
        <EmptyState onAddNew={handleAddNew} />
      ) : (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {cakes.map((cake) => (
            <CakeCard
              key={cake.id}
              cake={cake}
              onEdit={handleEdit}
              onDelete={handleDeleteClick}
              onToggleActive={handleToggleActive}
            />
          ))}
        </div>
      )}

      <CakeFormDialog
        open={isDialogOpen}
        onOpenChange={setIsDialogOpen}
        editingCake={editingCake}
        onSubmit={handleSubmit}
        isSubmitting={isSubmitting}
      />

      <DeleteConfirmDialog
        open={isDeleteDialogOpen}
        onOpenChange={setIsDeleteDialogOpen}
        onConfirm={handleDeleteConfirm}
        isSubmitting={isSubmitting}
      />
    </main>
  );
}
