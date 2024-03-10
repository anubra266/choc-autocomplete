import {
  Box,
  Button,
  Center,
  FormControl,
  FormHelperText,
  FormLabel,
  Heading,
} from "@chakra-ui/react";
import * as React from "react";
import {
  AutoComplete,
  AutoCompleteInput,
  AutoCompleteItem,
  AutoCompleteList,
  AutoCompleteGroup,
} from "@choc-ui/chakra-autocomplete";
import { Formik } from "formik";

const options = [
  { label: "apple", value: "one" },
  { label: "appoint", value: "two" },
  { label: "zap", value: "three" },
  { label: "cap", value: "four" },
  { label: "japan", value: "five" },
];

function FormikExample() {
  const name = "team";
  const onSubmit = data => console.log("data from form", data);

  return (
    <Box border="1px" borderRadius="1em" p={2}>
      <Heading as="h6" align="center">
        Formik
      </Heading>
      <Formik onSubmit={onSubmit} initialValues={{ team: "one"}}>
        {({ handleSubmit, handleBlur, setFieldValue, ...other }) => (
          <>
            <Button onClick={() => setFieldValue("team", "four")}>
              Change Value To four
            </Button>

            <form onSubmit={handleSubmit}>
              <FormControl>
                <FormLabel>Olympics Soccer Winner</FormLabel>
                <AutoComplete
                  onChange={val => setFieldValue("team", val)}
                  openOnFocus
                  rollNavigation
                  listAllValuesOnFocus
                  freeSolo
                  value={other.values.team}
                >
                  <AutoCompleteInput
                    variant="filled"
                    name={name}
                    onBlur={handleBlur}
                  />
                  <AutoCompleteList>
                    <AutoCompleteGroup>
                      {options.map(option => (
                        <AutoCompleteItem
                          key={`option-${option.value}`}
                          value={{
                            title: `${option.value}`,
                          }}
                          label={option.label}
                          textTransform="capitalize"
                        />
                      ))}
                    </AutoCompleteGroup>
                  </AutoCompleteList>
                </AutoComplete>
                <FormHelperText>Who do you support.</FormHelperText>
              </FormControl>
              <Center>
                <Button type="submit">Submit</Button>
              </Center>
            </form>
          </>
        )}
      </Formik>
    </Box>
  );
}

export default FormikExample;
