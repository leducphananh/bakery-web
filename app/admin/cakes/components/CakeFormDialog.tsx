import { ImageWithFallback } from "@/app/components/figma/ImageWithFallback";
import { Button } from "@/app/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/app/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/app/components/ui/form";
import { Input } from "@/app/components/ui/input";
import { Textarea } from "@/app/components/ui/textarea";
import { zodResolver } from "@hookform/resolvers/zod";
import { X } from "lucide-react";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { NumericFormat } from "react-number-format";
import * as z from "zod";
import { CakeType } from "./CakeCard";

const cakeFormSchema = z.object({
  name: z.string().min(1, "Tên bánh không được để trống"),
  price: z.number().min(1, "Giá bán phải lớn hơn 0"),
  originalPrice: z.number().min(1, "Giá gốc phải lớn hơn 0").optional(),
  image: z.string().url("URL hình ảnh không hợp lệ").optional(),
  description: z.string().optional(),
});

export type CakeFormValues = z.infer<typeof cakeFormSchema>;

interface CakeFormDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  editingCake: CakeType | null;
  onSubmit: (values: CakeFormValues) => void;
  isSubmitting?: boolean;
}

export function CakeFormDialog({
  open,
  onOpenChange,
  editingCake,
  onSubmit,
  isSubmitting = false,
}: CakeFormDialogProps) {
  const form = useForm<CakeFormValues>({
    resolver: zodResolver(cakeFormSchema),
    defaultValues: {
      name: "",
      price: 0,
      originalPrice: 0,
      image: "",
      description: "",
    },
  });

  useEffect(() => {
    if (editingCake) {
      form.reset({
        name: editingCake.name,
        price: editingCake.price,
        originalPrice: editingCake.originalPrice || 0,
        image: editingCake.image || "",
        description: editingCake.description || "",
      });
    } else {
      form.reset({
        name: "",
        price: 0,
        originalPrice: 0,
        image: "",
        description: "",
      });
    }
  }, [editingCake, form]);

  const handleSubmit = (values: CakeFormValues) => {
    onSubmit(values);
    form.reset();
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="rounded-3xl bg-white sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle className="text-2xl text-[#8B5A3C]">
            {editingCake ? "Chỉnh sửa bánh" : "Thêm bánh mới"}
          </DialogTitle>
          <DialogDescription className="text-gray-600">
            {editingCake
              ? "Cập nhật thông tin bánh của bạn"
              : "Điền thông tin để thêm bánh mới vào danh sách"}
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="space-y-6 py-4"
          >
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-[#8B5A3C]">
                    Tên bánh <span className="text-red-500">*</span>
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="VD: Bánh Socola Đặc Biệt"
                      className="rounded-full border-gray-200 focus:border-[#FFB5C5]"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="image"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-[#8B5A3C]">
                    URL hình ảnh <span className="text-red-500">*</span>
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="https://example.com/image.jpg"
                      className="rounded-full border-gray-200 focus:border-[#FFB5C5]"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                  {field.value && (
                    <div className="mt-3 overflow-hidden rounded-2xl border-2 border-gray-200">
                      <ImageWithFallback
                        src={field.value}
                        alt="Preview"
                        className="h-48 w-full object-cover"
                      />
                    </div>
                  )}
                </FormItem>
              )}
            />

            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="originalPrice"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-[#8B5A3C]">
                      Giá gốc <span className="text-red-500">*</span>
                    </FormLabel>
                    <FormControl>
                      <NumericFormat
                        customInput={Input}
                        placeholder="150.000₫"
                        className="rounded-full border-gray-200 focus:border-[#FFB5C5]"
                        thousandSeparator="."
                        decimalSeparator=","
                        suffix="₫"
                        allowNegative={false}
                        value={field.value}
                        onValueChange={(values) => {
                          field.onChange(values.floatValue || 0);
                        }}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="price"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-[#8B5A3C]">
                      Giá khuyến mãi <span className="text-red-500">*</span>
                    </FormLabel>
                    <FormControl>
                      <NumericFormat
                        customInput={Input}
                        placeholder="120.000₫"
                        className="rounded-full border-gray-200 focus:border-[#FFB5C5]"
                        thousandSeparator="."
                        decimalSeparator=","
                        suffix="₫"
                        allowNegative={false}
                        value={field.value}
                        onValueChange={(values) => {
                          field.onChange(values.floatValue || 0);
                        }}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-[#8B5A3C]">Mô tả ngắn</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Mô tả ngắn về món bánh..."
                      className="min-h-[100px] rounded-2xl border-gray-200 focus:border-[#FFB5C5]"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <DialogFooter className="gap-2">
              <Button
                type="button"
                variant="outline"
                onClick={() => onOpenChange(false)}
                className="rounded-full border-gray-200"
                disabled={isSubmitting}
              >
                <X className="mr-2 h-4 w-4" />
                Hủy
              </Button>
              <Button
                type="submit"
                className="rounded-full bg-[#FFB5C5] text-white hover:bg-[#FF9FB3]"
                disabled={isSubmitting}
              >
                {isSubmitting
                  ? "Đang xử lý..."
                  : editingCake
                    ? "Cập nhật"
                    : "Thêm mới"}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
