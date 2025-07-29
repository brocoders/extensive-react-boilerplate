"use client";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import TextField from "@mui/material/TextField";
import React, { Ref, useState, useRef, useEffect } from "react";
import {
  Controller,
  ControllerProps,
  FieldPath,
  FieldValues,
} from "react-hook-form";
import { ItemProps, ListProps, Virtuoso } from "react-virtuoso";
import ListItemText from "@mui/material/ListItemText";
import Box from "@mui/material/Box";
import ClickAwayListener from "@mui/material/ClickAwayListener";

export type SelectExtendedInputProps<T extends object> = {
  label: string;
  error?: string;
  testId?: string;
  disabled?: boolean;
  options: T[];
  renderSelected: (option: T) => React.ReactNode;
  renderOption: (option: T) => React.ReactNode;
  keyExtractor: (option: T) => string;
  onEndReached?: () => void;
} & (
  | {
      isSearchable: true;
      searchLabel: string;
      searchPlaceholder: string;
      search: string;
      onSearchChange: (search: string) => void;
    }
  | {
      isSearchable?: false;
    }
);

const MUIComponents = {
  List: function MuiList({
    style,
    children,
    ref,
  }: ListProps & { ref?: Ref<HTMLDivElement> }) {
    return (
      <List
        style={{ padding: 0, ...style, margin: 0 }}
        component="div"
        ref={ref}
      >
        {children}
      </List>
    );
  },

  Item: ({ children, ...props }: ItemProps<unknown>) => {
    return (
      <ListItem component="div" {...props} style={{ margin: 0 }} disablePadding>
        {children}
      </ListItem>
    );
  },
};

function SelectExtendedInput<T extends object>(
  props: SelectExtendedInputProps<T> & {
    name: string;
    value: T | undefined | null;
    onChange: (value: T) => void;
    onBlur: () => void;
    ref?: Ref<HTMLDivElement | null>;
  }
) {
  const [isOpen, setIsOpen] = useState(false);
  const boxRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (isOpen) {
      boxRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [isOpen]);

  return (
    <ClickAwayListener onClickAway={() => setIsOpen(false)}>
      <div>
        <Box mb={0.5} ref={boxRef}>
          <TextField
            ref={props.ref}
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
            <CardContent
              sx={{
                p: 0,
                "&:last-child": {
                  pb: 0,
                },
              }}
            >
              {props.isSearchable && (
                <Box p={2}>
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
                style={{
                  height:
                    props.options.length <= 6 ? props.options.length * 48 : 320,
                }}
                data={props.options}
                endReached={props.onEndReached}
                components={MUIComponents}
                itemContent={(index, item) => (
                  <ListItemButton
                    selected={
                      props.value
                        ? props.keyExtractor(item) ===
                          props.keyExtractor(props.value)
                        : false
                    }
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
      </div>
    </ClickAwayListener>
  );
}

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
          isSearchable={props.isSearchable}
          label={props.label}
          error={fieldState.error?.message}
          disabled={props.disabled}
          testId={props.testId}
          options={props.options}
          renderSelected={props.renderSelected}
          renderOption={props.renderOption}
          keyExtractor={props.keyExtractor}
          search={props.isSearchable ? props.search : ""}
          onSearchChange={
            props.isSearchable ? props.onSearchChange : () => undefined
          }
          onEndReached={props.isSearchable ? props.onEndReached : undefined}
          searchLabel={props.isSearchable ? props.searchLabel : ""}
          searchPlaceholder={props.isSearchable ? props.searchPlaceholder : ""}
        />
      )}
    />
  );
}

export default FormSelectExtendedInput;
