'use client';

import {
  DndContext,
  type DragEndEvent,
  KeyboardSensor,
  PointerSensor,
  closestCenter,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import {
  SortableContext,
  arrayMove,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
// import { Combobox } from '#shadcn/combobox';
import { GripVertical, Plus, Trash2 } from 'lucide-react';
import { useState } from 'react';
import { type ControllerRenderProps, type FieldValues, useForm } from 'react-hook-form';
import { Button } from '#shadcn/button';
import { Checkbox } from '#shadcn/checkbox';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '#shadcn/form';
import { Input } from '#shadcn/input';
import { RadioGroup, RadioGroupItem } from '#shadcn/radio-group';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '#shadcn/select';
import { Switch } from '#shadcn/switch';
import { Textarea } from '#shadcn/textarea';
import { DatePicker } from '../date-picker';

export interface IFormItem {
  id: string;
  type:
    | 'text'
    | 'number'
    | 'email'
    | 'checkbox'
    | 'date'
    | 'daterange'
    | 'radio'
    | 'select'
    | 'switch'
    | 'textarea'
    | 'combobox';
  label: string;
  placeholder?: string;
  options?: string[];
}

const SortableItem = ({
  id,
  item,
  onRemove,
  onEdit,
}: {
  id: string;
  item: IFormItem;
  onRemove: (id: string) => void;
  onEdit: (id: string, field: keyof IFormItem, value: string | string[]) => void;
}) => {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div ref={setNodeRef} style={style} className="mb-2 flex items-center space-x-2 rounded border p-2">
      <GripVertical className="cursor-move" {...attributes} {...listeners} />
      <Input value={item.label} onChange={e => onEdit(id, 'label', e.target.value)} placeholder="Label" />
      <Select onValueChange={value => onEdit(id, 'type', value)}>
        <SelectTrigger>
          <SelectValue placeholder="Select type" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="text">Text</SelectItem>
          <SelectItem value="number">Number</SelectItem>
          <SelectItem value="email">Email</SelectItem>
          <SelectItem value="checkbox">Checkbox</SelectItem>
          <SelectItem value="date">Date</SelectItem>
          <SelectItem value="radio">Radio</SelectItem>
          <SelectItem value="select">Select</SelectItem>
          <SelectItem value="switch">Switch</SelectItem>
          <SelectItem value="textarea">Textarea</SelectItem>
          <SelectItem value="combobox">Combobox</SelectItem>
        </SelectContent>
      </Select>
      {['text', 'number', 'email', 'textarea'].includes(item.type) && (
        <Input
          value={item.placeholder}
          onChange={e => onEdit(id, 'placeholder', e.target.value)}
          placeholder="Placeholder"
        />
      )}
      {['radio', 'select', 'combobox'].includes(item.type) && (
        <Input
          value={item.options?.join(', ')}
          onChange={e =>
            onEdit(
              id,
              'options',
              e.target.value.split(',').map(s => s.trim())
            )
          }
          placeholder="Options (comma-separated)"
        />
      )}
      <Trash2 className="cursor-pointer" onClick={() => onRemove(id)} />
    </div>
  );
};

export const DynamicForm = () => {
  const [items, setItems] = useState<IFormItem[]>([]);
  const [previewMode, setPreviewMode] = useState(false);
  const [loading] = useState(false);
  const [error] = useState<string | null>(null);

  // useEffect(() => {
  //   // Load saved form structure when component mounts
  //   loadFormStructure();
  // }, []);

  // const loadFormStructure = async () => {
  //   setLoading(true);
  //   setError(null);
  //   try {
  //     const response = await fetch('/api/get-form');
  //     if (response.ok) {
  //       const formStructure = await response.json();
  //       setItems(formStructure);
  //       setPreviewMode(true);
  //     } else {
  //       throw new Error('Failed to load form structure');
  //     }
  //   } catch (error) {
  //     setError('Error loading form structure. Please try again.');
  //     console.error('Error loading form structure:', error);
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  const form = useForm();

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (active.id !== over?.id) {
      setItems(items => {
        const oldIndex = items.findIndex(item => item.id === active.id);
        const newIndex = items.findIndex(item => item.id === over?.id);

        return arrayMove(items, oldIndex, newIndex);
      });
    }
  };

  const addItem = () => {
    const newItem: IFormItem = {
      id: Date.now().toString(),
      type: 'text',
      label: 'New Field',
      placeholder: 'Enter value',
    };
    setItems([...items, newItem]);
  };

  const removeItem = (id: string) => {
    setItems(items.filter(item => item.id !== id));
  };

  const editItem = (id: string, field: keyof IFormItem, value: string | string[]) => {
    setItems(items.map(item => (item.id === id ? { ...item, [field]: value } : item)));
  };

  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  const onSubmit = async (data: any) => {
    // console.log(data);
    // Here you would typically send the form data to your API
    try {
      const response = await fetch('/api/save-form', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ formStructure: items, formData: data }),
      });
      if (response.ok) {
        console.info('Form saved successfully');
      } else {
        console.error('Failed to save form');
      }
    } catch (error) {
      console.error('Error saving form:', error);
    }
  };

  const generateForm = async () => {
    try {
      const response = await fetch('/api/get-form');
      if (response.ok) {
        const formStructure = await response.json();
        setItems(formStructure);
        setPreviewMode(true);
      } else {
        console.error('Failed to get form structure');
      }
    } catch (error) {
      console.error('Error getting form structure:', error);
    }
  };

  const renderFormControl = (item: IFormItem, field: ControllerRenderProps<FieldValues, string>) => {
    switch (item.type) {
      case 'text':
      case 'number':
      case 'email':
        return <Input type={item.type} placeholder={item.placeholder} />;
      case 'checkbox':
        return <Checkbox />;
      case 'date':
        return <DatePicker value={field.value} onChange={date => field.onChange(date)} />;
      case 'daterange':
        return <DatePicker isRange value={field.value} onChange={dateRange => field.onChange(dateRange)} />;
      case 'radio':
        return (
          <RadioGroup>
            {item.options?.map((option, index) => (
              <div key={option} className="flex items-center space-x-2">
                <RadioGroupItem value={option} id={`${item.id}-${index}`} />
                <label htmlFor={`${item.id}-${index}`}>{option}</label>
              </div>
            ))}
          </RadioGroup>
        );
      case 'select':
        return (
          <Select>
            <SelectTrigger>
              <SelectValue placeholder="Select an option" />
            </SelectTrigger>
            <SelectContent>
              {item.options?.map(option => (
                <SelectItem key={option} value={option}>
                  {option}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        );
      case 'switch':
        return <Switch />;
      case 'textarea':
        return <Textarea placeholder={item.placeholder} />;
      // case 'combobox':
      //   return <Combobox options={item.options || []} />;
      default:
        return null;
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  return (
    <div>
      {!previewMode && (
        <>
          <Button onClick={addItem} className="mb-4">
            <Plus className="mr-2" /> Add Field
          </Button>
          <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
            <SortableContext items={items} strategy={verticalListSortingStrategy}>
              {items.map(item => (
                <SortableItem key={item.id} id={item.id} item={item} onRemove={removeItem} onEdit={editItem} />
              ))}
            </SortableContext>
          </DndContext>
          <Button onClick={generateForm} className="mt-4">
            Generate Form
          </Button>
        </>
      )}

      {previewMode && (
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            {items.map(item => (
              <FormField
                key={item.id}
                control={form.control}
                name={item.id}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{item.label}</FormLabel>
                    <FormControl>{renderFormControl(item, field)}</FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            ))}
            <Button type="submit" disabled={loading}>
              {loading ? 'Submitting...' : 'Submit'}
            </Button>
          </form>
        </Form>
      )}

      <div className="mt-4">
        <Button onClick={() => setPreviewMode(!previewMode)} disabled={loading}>
          {previewMode ? 'Edit Form' : 'Preview Form'}
        </Button>
      </div>
    </div>
  );
};
