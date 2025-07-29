import React, { useState } from "react";
import { Meta, StoryFn } from "@storybook/nextjs";
import { useForm, FormProvider } from "react-hook-form";
import FormSelectExtendedInput, {
  SelectExtendedInputProps,
} from "./form-select-extended";

interface Option {
  id: number;
  name: string;
}

type SearchableProps = SelectExtendedInputProps<Option> & {
  isSearchable: true;
  searchLabel: string;
  searchPlaceholder: string;
  search: string;
  onSearchChange: (search: string) => void;
};

export default {
  title: "Components/Form/SelectExtendedInput",
  component: FormSelectExtendedInput,
} as Meta;

const Template: StoryFn<SelectExtendedInputProps<Option> & { name: string }> = (
  args
) => {
  const methods = useForm({
    defaultValues: {
      sampleSelectExtended: null,
    },
  });

  return (
    <FormProvider {...methods}>
      <form>
        <FormSelectExtendedInput {...args} />
      </form>
    </FormProvider>
  );
};

const SearchableTemplate: StoryFn<SearchableProps & { name: string }> = (
  args
) => {
  const methods = useForm({
    defaultValues: {
      sampleSelectExtended: null,
    },
  });

  const [search, setSearch] = useState("");

  return (
    <FormProvider {...methods}>
      <form>
        <FormSelectExtendedInput
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
];

export const Default = Template.bind({});
Default.args = {
  label: "Sample Select Extended",
  name: "sampleSelectExtended",
  options,
  keyExtractor: (option: Option) => option.id.toString(),
  renderOption: (option: Option) => option.name,
  renderSelected: (option: Option) => option.name,
  testId: "sampleSelectExtended",
};

export const Searchable = SearchableTemplate.bind({});
Searchable.args = {
  label: "Searchable Select Extended",
  name: "sampleSelectExtended",
  options,
  keyExtractor: (option: Option) => option.id.toString(),
  renderOption: (option: Option) => option.name,
  renderSelected: (option: Option) => option.name,
  isSearchable: true,
  searchLabel: "Search fruits",
  searchPlaceholder: "Type to search...",
  search: "",
  onSearchChange: () => {},
  testId: "searchableSelectExtended",
};

export const Disabled = Template.bind({});
Disabled.args = {
  label: "Disabled Select Extended",
  name: "sampleSelectExtended",
  options,
  keyExtractor: (option: Option) => option.id.toString(),
  renderOption: (option: Option) => option.name,
  renderSelected: (option: Option) => option.name,
  disabled: true,
  testId: "disabledSelectExtended",
};
