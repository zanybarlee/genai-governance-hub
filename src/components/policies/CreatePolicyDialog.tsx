
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { ScrollArea } from "@/components/ui/scroll-area";
import { PlusCircle } from "lucide-react";
import { useForm } from "react-hook-form";
import { PolicyFormValues, PolicyTemplate } from "@/types/policy";
import { useState } from "react";

interface CreatePolicyDialogProps {
  templates: PolicyTemplate[];
  onSubmit: (data: PolicyFormValues) => void;
}

export const CreatePolicyDialog = ({ templates, onSubmit }: CreatePolicyDialogProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const form = useForm<PolicyFormValues>();

  const onTemplateSelect = (templateId: string) => {
    const template = templates.find((t) => t.id === templateId);
    if (template) {
      form.setValue("name", template.name);
      form.setValue("description", template.description);
      form.setValue("content", template.content);
    }
  };

  const handleSubmit = (data: PolicyFormValues) => {
    onSubmit(data);
    setIsOpen(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button className="flex items-center gap-2">
          <PlusCircle className="h-5 w-5" />
          Create Policy
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl max-h-[90vh]">
        <DialogHeader>
          <DialogTitle>Create New Policy</DialogTitle>
          <DialogDescription>
            Create a new policy from scratch or use a template
          </DialogDescription>
        </DialogHeader>
        <ScrollArea className="h-[calc(90vh-120px)]">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6 pr-4">
              <FormField
                control={form.control}
                name="template"
                render={({ field }) => (
                  <FormItem className="space-y-3">
                    <FormLabel>Select a Template</FormLabel>
                    <FormControl>
                      <RadioGroup
                        onValueChange={(value) => {
                          field.onChange(value);
                          onTemplateSelect(value);
                        }}
                        className="grid grid-cols-3 gap-4"
                      >
                        {templates.map((template) => (
                          <FormItem key={template.id}>
                            <FormControl>
                              <div className="relative">
                                <RadioGroupItem
                                  value={template.id}
                                  id={template.id}
                                  className="absolute right-4 top-4 h-4 w-4"
                                />
                                <label
                                  htmlFor={template.id}
                                  className="block p-4 rounded-lg border cursor-pointer hover:border-primary transition-colors"
                                >
                                  <h4 className="font-medium text-primary-900 mb-1">
                                    {template.name}
                                  </h4>
                                  <p className="text-sm text-gray-600">
                                    {template.description}
                                  </p>
                                </label>
                              </div>
                            </FormControl>
                          </FormItem>
                        ))}
                      </RadioGroup>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Policy Name</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Textarea {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="content"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Policy Content</FormLabel>
                    <FormControl>
                      <Textarea {...field} className="min-h-[200px] font-mono" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="flex justify-end gap-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setIsOpen(false)}
                >
                  Cancel
                </Button>
                <Button type="submit">Create Policy</Button>
              </div>
            </form>
          </Form>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
};
