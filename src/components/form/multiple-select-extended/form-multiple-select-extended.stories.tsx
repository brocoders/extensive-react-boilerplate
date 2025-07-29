import React, { useState } from "react";
import { Meta, StoryFn } from "@storybook/nextjs";
import { useForm, FormProvider } from "react-hook-form";
import FormMultipleSelectExtendedInput, {
  MultipleSelectExtendedInputProps,
} from "./form-multiple-select-extended";

interface Option {
  id: number;
  name: string;
}

type SearchableProps = MultipleSelectExtendedInputProps<Option> & {
  isSearchable: true;
  searchLabel: string;
  searchPlaceholder: string;
  search: string;
  onSearchChange: (search: string) => void;
};

export default {
  title: "Components/Form/MultipleSelectExtendedInput",
  component: FormMultipleSelectExtendedInput,
} as Meta;

const Template: StoryFn<
  MultipleSelectExtendedInputProps<Option> & { name: string }
> = (args) => {
  const methods = useForm({
    defaultValues: {
      sampleMultipleSelectExtended: [],
    },
  });

  return (
    <FormProvider {...methods}>
      <form>
        <FormMultipleSelectExtendedInput {...args} />
      </form>
    </FormProvider>
  );
};

const SearchableTemplate: StoryFn<SearchableProps & { name: string }> = (
  args
) => {
  const methods = useForm({
    defaultValues: {
      sampleMultipleSelectExtended: [],
    },
  });

  const [search, setSearch] = useState("");

  return (
    <FormProvider {...methods}>
      <form>
        <FormMultipleSelectExtendedInput
          {...args}
          search={search}
          onSearchChange={setSearch}
        />
      </form>
    </FormProvider>
  );
};

const options = [
  { id: 1, name: "Apple" },
  { id: 2, name: "Banana" },
  { id: 3, name: "Cherry" },
  { id: 4, name: "Date" },
  { id: 5, name: "Elderberry" },
  { id: 6, name: "Fig" },
  { id: 7, name: "Grape" },
  { id: 8, name: "Honeydew" },
  { id: 9, name: "Kiwi" },
  { id: 10, name: "Lemon" },
];

export const Default = Template.bind({});
Default.args = {
  label: "Sample Multiple Select Extended",
  name: "sampleMultipleSelectExtended",
  options,
  keyExtractor: (option: Option) => option.id.toString(),
  renderOption: (option: Option) => option.name,
  renderSelected: (options: Option[]) => options.map((o) => o.name).join(", "),
  testId: "sampleMultipleSelectExtended",
};

export const Searchable = SearchableTemplate.bind({});
Searchable.args = {
  label: "Searchable Multiple Select Extended",
  name: "sampleMultipleSelectExtended",
  options,
  keyExtractor: (option: Option) => option.id.toString(),
  renderOption: (option: Option) => option.name,
  renderSelected: (options: Option[]) => options.map((o) => o.name).join(", "),
  isSearchable: true,
  searchLabel: "Search fruits",
  searchPlaceholder: "Type to search...",
  search: "",
  onSearchChange: () => {},
  testId: "searchableMultipleSelectExtended",
};

export const Disabled = Template.bind({});
Disabled.args = {
  label: "Disabled Multiple Select Extended",
  name: "sampleMultipleSelectExtended",
  options,
  keyExtractor: (option: Option) => option.id.toString(),
  renderOption: (option: Option) => option.name,
  renderSelected: (options: Option[]) => options.map((o) => o.name).join(", "),
  disabled: true,
  testId: "disabledMultipleSelectExtended",
};
