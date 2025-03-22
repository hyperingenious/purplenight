import { SignUp } from "@clerk/clerk-react";
import { Center } from "@mantine/core";
import React from "react";

const NotSignedIn = () => {
  return (
    <Center h={'100vh'}>
      <SignUp />
    </Center>
  );
};

export default NotSignedIn;
