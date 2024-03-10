import React from "react";

import { Stack } from "@chakra-ui/react";
import Basic from "./basic";
import Group from "./group";
import CustomRender from "./custom-render";
import WithIcon from "./with-icon";
import MultiSelect from "./multi-select";
import ReactHookForm from "./react-hook-form";
import Formik from "./formik";

export default function App() {
  return (
    <Stack
      w="500px"
      direction="column"
      pos="absolute"
      left="50%"
      transform="translateX(-50%)"
    >
      <Basic />
      <Group />
      <CustomRender />
      <WithIcon />
      <MultiSelect />
      <ReactHookForm />
      <Formik />
    </Stack>
  );
}
