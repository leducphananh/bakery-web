"use client";

import { useState } from "react";
import { CakeCard, CakeType } from "./components/CakeCard";
import { CakeFormDialog, CakeFormValues } from "./components/CakeFormDialog";
import { DeleteConfirmDialog } from "./components/DeleteConfirmDialog";
import { EmptyState } from "./components/EmptyState";
import { PageHeader } from "./components/PageHeader";

export default function AdminCakesPage() {
  const [cakes, setCakes] = useState<CakeType[]>([
    {
      id: 1,
      name: "Bánh Socola Mơ Ước",
      price: "120.000₫",
      originalPrice: "150.000₫",
      image:
        "https://images.unsplash.com/photo-1606890737304-57a1ca8a5b62?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400",
      description: "Bánh socola đậm đà với lớp kem mềm mịn",
    },
    {
      id: 2,
      name: "Bánh Dâu Tây Ngọt Ngào",
      price: "135.000₫",
      originalPrice: "170.000₫",
      image:
        "https://images.unsplash.com/photo-1602663491496-73f07481dbea?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400",
      description: "Bánh kem tươi với dâu tây tự nhiên",
    },
  ]);

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [editingCake, setEditingCake] = useState<CakeType | null>(null);
  const [deletingCakeId, setDeletingCakeId] = useState<number | null>(null);

  const handleAddNew = () => {
    setEditingCake(null);
    setIsDialogOpen(true);
  };

  const handleEdit = (cake: CakeType) => {
    setEditingCake(cake);
    setIsDialogOpen(true);
  };

  const handleDeleteClick = (id: number) => {
    setDeletingCakeId(id);
    setIsDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = () => {
    if (deletingCakeId) {
      setCakes(cakes.filter((c) => c.id !== deletingCakeId));
      setIsDeleteDialogOpen(false);
      setDeletingCakeId(null);
    }
  };

  const handleSubmit = (values: CakeFormValues) => {
    if (editingCake) {
      setCakes(
        cakes.map((c) => (c.id === editingCake.id ? { ...c, ...values } : c)),
      );
    } else {
      const newCake: CakeType = {
        id: Math.max(...cakes.map((c) => c.id), 0) + 1,
        ...values,
      };
      setCakes([...cakes, newCake]);
    }
    setIsDialogOpen(false);
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
            />
          ))}
        </div>
      )}

      <CakeFormDialog
        open={isDialogOpen}
        onOpenChange={setIsDialogOpen}
        editingCake={editingCake}
        onSubmit={handleSubmit}
      />

      <DeleteConfirmDialog
        open={isDeleteDialogOpen}
        onOpenChange={setIsDeleteDialogOpen}
        onConfirm={handleDeleteConfirm}
      />
    </main>
  );
}
