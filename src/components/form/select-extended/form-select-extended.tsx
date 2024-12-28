"use client";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import TextField from "@mui/material/TextField";
import React, {
  ForwardedRef,
  forwardRef,
  useState,
  useRef,
  useEffect,
} from "react";
import {
  Controller,
  ControllerProps,
  FieldPath,
  FieldValues,
} from "react-hook-form";
import { ItemProps, ListProps, Virtuoso } from "react-virtuoso";
import ListItemText from "@mui/material/ListItemText";
import Box from "@mui/material/Box";

type SelectExtendedInputProps<T extends object> = {
  label: string;
  error?: string;
  testId?: string;
  disabled?: boolean;
  options: T[];
  renderOption: (option: T) => React.ReactNode;
  onEndReached?: () => void;
  searchable?: boolean;
  searchLabel: string;
  searchPlaceholder: string;
  search?: string;
  onSearchChange?: (search: string) => void;
};

const MUIComponents = {
  List: forwardRef<HTMLDivElement, ListProps>(function MuiList(
    { style, children },
    listRef
  ) {
    return (
      <List
        style={{ padding: 0, ...style, margin: 0 }}
        component="div"
        ref={listRef}
      >
        {children}
      </List>
    );
  }),

  Item: ({ children, ...props }: ItemProps<unknown>) => {
    return (
      <ListItem component="div" {...props} style={{ margin: 0 }} disablePadding>
        {children}
      </ListItem>
    );
  },
};

function SelectExtendedInputRaw<T extends object>(
  props: SelectExtendedInputProps<T> & {
    name: string;
    value: T | undefined | null;
    onChange: (value: T) => void;
    onBlur: () => void;
  },
  ref?: ForwardedRef<HTMLDivElement | null>
) {
  const [isOpen, setIsOpen] = useState(false);
  const boxRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (isOpen) {
      boxRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [isOpen]);

  return (
    <>
      <Box mb={0.5} ref={boxRef}>
        <TextField
          ref={ref}
          name={props.name}
          value={props.value ? props.renderOption(props.value) : ""}
          onBlur={props.onBlur}
          label={props.label}
          variant="outlined"
          onClick={() => {
            if (props.disabled) return;

            setIsOpen((prev) => !prev);
          }}
          fullWidth
          error={!!props.error}
          data-testid={props.testId}
          helperText={props.error}
          disabled={props.disabled}
          slotProps={{
            input: {
              readOnly: true,
            },
            formHelperText: {
              ["data-testid" as string]: `${props.testId}-error`,
            },
          }}
        />
      </Box>

      {isOpen && (
        <Card>
          <CardContent>
            {props.searchable && (
              <Box mb={0.5}>
                <TextField
                  placeholder={props.searchPlaceholder}
                  value={props.search}
                  onChange={(e) => props.onSearchChange?.(e.target.value)}
                  label={props.searchLabel}
                  variant="outlined"
                  autoFocus
                  fullWidth
                  data-testid={`${props.testId}-search`}
                />
              </Box>
            )}

            <Virtuoso
              style={{ height: "400px" }}
              data={props.options}
              endReached={props.onEndReached}
              components={MUIComponents}
              itemContent={(index, item) => (
                <ListItemButton
                  onClick={() => {
                    props.onChange(item);
                    setIsOpen(false);
                  }}
                >
                  {item ? (
                    <ListItemText primary={props.renderOption(item)} />
                  ) : (
                    <></>
                  )}
                </ListItemButton>
              )}
            />
          </CardContent>
        </Card>
      )}
    </>
  );
}

const SelectExtendedInput = forwardRef(SelectExtendedInputRaw) as never as <
  T extends object,
>(
  props: SelectExtendedInputProps<T> & {
    name: string;
    value: T | undefined | null;
    onChange: (value: T) => void;
    onBlur: () => void;
  } & { ref?: ForwardedRef<HTMLDivElement | null> }
) => ReturnType<typeof SelectExtendedInputRaw>;

function FormSelectExtendedInput<
  TFieldValues extends FieldValues = FieldValues,
  T extends object = object,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>(
  props: Pick<ControllerProps<TFieldValues, TName>, "name" | "defaultValue"> &
    SelectExtendedInputProps<T>
) {
  return (
    <Controller
      name={props.name}
      defaultValue={props.defaultValue}
      render={({ field, fieldState }) => (
        <SelectExtendedInput<T>
          {...field}
          searchable={props.searchable}
          label={props.label}
          error={fieldState.error?.message}
          disabled={props.disabled}
          testId={props.testId}
          options={props.options}
          renderOption={props.renderOption}
          search={props.search}
          onSearchChange={props.onSearchChange}
          onEndReached={props.onEndReached}
          searchLabel={props.searchLabel}
          searchPlaceholder={props.searchPlaceholder}
        />
      )}
    />
  );
}

export default FormSelectExtendedInput;
